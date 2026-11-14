# Buea Vendor Safety Questionnaire

A responsive, browser-based research questionnaire about accident and health risks among informal vendors of petroleum products in Buea Municipality, Cameroon. The instrument was prepared for a master's research project at the University of Douala for the 2026/2027 academic year.

## Survey sections

The questionnaire is organized into seven parts:

1. Screening and background information
2. Working conditions and potential hazard exposure
3. Accident experience
4. Self-reported health concerns
5. Safety knowledge, training, and protective practices
6. Safety practices and emergency preparedness
7. Regulation, support, and prevention

## Features

- Responsive layout for phones, tablets, laptops, and desktop screens
- Step-by-step navigation with a progress indicator
- Single-choice, multiple-choice, text, and matrix questions
- Answers are retained while moving between sections
- Completed responses can be downloaded as a paginated PDF and emailed to the researcher
- If automatic delivery is not configured, the survey offers device sharing for the PDF and a pre-addressed email draft; the respondent confirms the recipient and sends it
- Optional Google Apps Script delivery can email the PDF automatically using the researcher's Google account

## Run locally

Open `index.html` in a current web browser. PDF downloads work locally. Phone sharing requires a secure HTTPS page and a browser that supports sharing files; GitHub Pages serves the site over HTTPS. On a phone, choose Mail or Gmail from the share menu, confirm the To field is `mubahremy@gmail.com`, and send. If file sharing is unavailable, the survey provides a pre-addressed email draft and the respondent attaches the downloaded PDF. Automatic email delivery requires the optional Google Apps Script setup below; system font fallbacks are provided if Google Fonts cannot load.

## Publish with GitHub Pages

1. Optionally follow the [automatic email delivery setup](#set-up-automatic-email-delivery) before publishing. Without it, respondents can use the email-draft fallback.
2. Upload `index.html` and this `README.md` to the root of a GitHub repository.
3. In the repository, open **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose the `main` branch and `/(root)` folder, then save.
6. Open the published HTTPS URL shown in the Pages settings and test the survey and PDF download/email. On a phone, complete a test response and choose Mail or Gmail from the share menu; confirm the researcher address before sending.

Because the entry file is named `index.html`, GitHub Pages will serve it at the repository's root URL.

## Set up automatic email delivery

The website is static, so it cannot safely send email by itself. For automatic delivery, the Google Apps Script in `google-apps-script.js` sends the PDF through the Google account that deploys it, without a separate email provider or exposed API key. This setup is optional: without it, the survey tries the device's file-sharing feature where supported and provides a pre-addressed email draft as a fallback. On phones, file sharing requires HTTPS (provided by GitHub Pages) and a browser that supports sharing files. The respondent must choose an email app, confirm the recipient, and send the message; if using the draft, they must attach the downloaded PDF. Browsers do not allow a website to attach a local download to an email draft automatically. The public web app is limited to 50 emails per UTC day and accepts PDFs up to 8 MB. Because the web app must be publicly accessible to survey respondents, the daily limit is an abuse safeguard, not authentication; protect the deployment URL and monitor the account's activity.

1. Confirm that emailing completed questionnaire PDFs is allowed by the approved research data-management and ethics procedures. Respondents are informed on the completion screen before they click to send.
2. Sign in to the Google account that should send the email. Create a new project at [script.google.com](https://script.google.com/).
3. Replace the starter code in the Apps Script editor with the contents of `google-apps-script.js`, then save the project.
4. Choose **Deploy > New deployment**, select the gear icon and **Web app**, then set:
   - **Execute as:** Me
   - **Who has access:** Anyone
5. Click **Deploy**, review the requested permission to send email, and authorize it. Copy the web app URL ending in `/exec`.
6. Set `EMAIL_ENDPOINT` near the top of the `<script>` in `index.html` to that `/exec` URL, then publish the updated `index.html` to GitHub Pages.
7. Test the complete flow with a non-sensitive test response. Confirm that the PDF downloads and arrives in the researcher's inbox. The Google account that deployed the script is the sending account; its Apps Script and email quotas apply.

To update the email service after editing the script, create a new version under **Deploy > Manage deployments > Edit** and deploy that version. Do not share the deployment URL unnecessarily. The endpoint sends only to the fixed researcher address, deduplicates retries for a request, and stops after the daily limit; because it is public, someone who obtains the URL could still use up that limit.

## Response handling and privacy

Answers are kept in the respondent's browser while the survey is open and are not stored by GitHub Pages. When the respondent clicks the final button, the PDF is downloaded locally. If automatic delivery is configured, it is also submitted to Google Apps Script, which emails it to the researcher through the deploying Google account. Otherwise, the browser may offer to share the PDF with an email app, or the respondent can use the pre-addressed email draft and attach the downloaded PDF. Google processes PDFs submitted through Apps Script; review its data practices and ensure any transfer complies with the study's approved procedures. Downloaded and emailed PDFs may contain sensitive health and accident information; handle them according to the approved data-management and privacy procedures. Do not upload completed response PDFs or service credentials to a public repository.

The questionnaire does not establish that work exposure caused reported symptoms and is not a medical assessment. Participation, consent, eligibility, and any requirements for respondents under 18 should follow the researcher's approved ethics protocol and supervisor guidance.
