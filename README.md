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
- Completed responses are generated as a paginated PDF in the browser
- Respondents can choose an app from their device's share panel to send the PDF; unsupported browsers download it instead

## Run locally

Open `index.html` through a local web server. The page uses system fonts and has no external runtime dependencies. File sharing is available only in browsers that support sharing files and when served over HTTPS or from `localhost`; opening the page directly as a `file://` URL may disable sharing.

## Publish with GitHub Pages

The questionnaire is a static site; it requires no PHP, database, build process, or server configuration.

1. Upload `index.html` and this `README.md` to the root of a GitHub repository.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose the `main` branch and `/(root)` folder, then save.
5. Open the published HTTPS URL shown in the Pages settings and test the questionnaire, PDF generation, and sharing on a supported device.

Because the entry file is named `index.html`, GitHub Pages will serve it at the repository's root URL.

## Response handling and privacy

Answers remain in the respondent's browser and are not uploaded or emailed by the site. The final button opens the device's share panel when the browser supports sharing PDF files; the respondent chooses whether and how to share. Otherwise, the PDF is downloaded so the respondent can attach it in an app of their choice. Confirm any sharing is allowed by the study's approved data-management and ethics procedures.

The questionnaire does not establish that work exposure caused reported symptoms and is not a medical assessment. Participation, consent, eligibility, and any requirements for respondents under 18 should follow the researcher's approved ethics protocol and supervisor guidance.
