const RESEARCHER_EMAIL = 'mubahremy@gmail.com';
const MAX_PDF_BYTES = 8 * 1024 * 1024;
const MAX_EMAILS_PER_DAY = 50;
const DAILY_STATE_KEY = 'surveyEmailDailyState';

function doGet() {
  return HtmlService.createHtmlOutput('Buea questionnaire email service is ready.');
}

function doPost(event) {
  const requestId = String(event?.parameter?.requestId || '');
  if (!/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(requestId)) {
    return resultPage(requestId, false);
  }

  const encodedPdf = String(event?.parameter?.pdfBase64 || '');
  if (!encodedPdf || encodedPdf.length > Math.ceil(MAX_PDF_BYTES * 4 / 3) + 4) {
    return resultPage(requestId, false);
  }

  let pdfBytes;
  try {
    pdfBytes = Utilities.base64Decode(encodedPdf);
  } catch (error) {
    console.error(`Invalid PDF encoding: ${error.message}`);
    return resultPage(requestId, false);
  }

  if (pdfBytes.length < 5 || pdfBytes.length > MAX_PDF_BYTES ||
      String.fromCharCode(...pdfBytes.slice(0, 5)) !== '%PDF-') {
    return resultPage(requestId, false);
  }

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return resultPage(requestId, false);

  let sent = false;
  try {
    const properties = PropertiesService.getScriptProperties();
    const today = Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyy-MM-dd');
    let dailyState = JSON.parse(properties.getProperty(DAILY_STATE_KEY) || '{}');
    if (dailyState.date !== today) dailyState = { date: today, count: 0, requestIds: [] };

    if (dailyState.requestIds.includes(requestId)) {
      sent = true;
    } else if (dailyState.count >= MAX_EMAILS_PER_DAY) {
      console.warn('Daily questionnaire email limit reached.');
    } else {
      const filename = `buea-vendor-safety-survey-${today}.pdf`;
      MailApp.sendEmail({
        to: RESEARCHER_EMAIL,
        subject: 'Completed Buea Vendor Safety Questionnaire',
        body: 'A completed questionnaire response PDF is attached.',
        attachments: [Utilities.newBlob(pdfBytes, 'application/pdf', filename)]
      });
      dailyState.count += 1;
      dailyState.requestIds.push(requestId);
      properties.setProperty(DAILY_STATE_KEY, JSON.stringify(dailyState));
      sent = true;
    }
  } catch (error) {
    console.error(`Questionnaire email failed: ${error.message}`);
  } finally {
    lock.releaseLock();
  }

  return resultPage(requestId, sent);
}

function resultPage(requestId, sent) {
  const message = JSON.stringify({
    type: 'survey-email-result',
    requestId,
    ok: sent
  });
  return HtmlService.createHtmlOutput(
    `<!doctype html><meta charset="utf-8"><script>window.parent.postMessage(${message}, '*');</script>`
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
