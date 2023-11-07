# Revolutionizing Healthcare with iHealthHist

![Alt text](https://raw.githubusercontent.com/cenentury0941/i-health-hist-okta/main/splash.png)

## Introduction
In recent years, the medical sector has faced numerous challenges, highlighting the urgent need for a major overhaul. This transformation is particularly critical in the face of global epidemics, resource shortages, and the rise of resistant bacteria and viruses. The integration and streamlining of healthcare services beyond conventional boundaries are essential to ensure seamless access to crucial healthcare information for prompt diagnosis and disease prevention.

## iHealthHist: A Vision for Better Healthcare
In pursuit of a brighter tomorrow, we present **iHealthHist**, an integrated platform designed to store and share healthcare information securely and seamlessly.

## Empowering Doctors and Patients
iHealthHist empowers both doctors and patients by enabling the storage of vital medical information, including historical blood test data, pathology reports, consultation records, and more. This centralized storage ensures that healthcare providers have access to an individual's complete medical history, facilitating accurate and prompt diagnoses.

## Beyond Medical Records: A Holistic Approach
In addition to medical records, patients can also upload lifestyle activities like eating habits and exercise routines using fitness applications and hardware. This additional data aids healthcare practitioners in understanding the patient's current health condition and tailoring personalized suggestions for optimal health maintenance.

## Data Security and Patient Control
iHealthHist prioritizes data security, granting patients control over their information. Patients can manage access to their medical records, enhancing privacy and reducing the risk of misuse, especially when transitioning to a new healthcare provider.

## Assisting Healthcare Practitioners
To aid healthcare practitioners in navigating vast amounts of information, iHealthHist incorporates an assistive bot. This bot helps pinpoint relevant documents, easing the workload on practitioners and enabling quicker and more informed decisions.

## AI Functionality
To aid healthcare practitioners in navigating vast amounts of information, iHealthHist incorporates an assistive bot. This bot helps pinpoint relevant documents, easing the workload on practitioners and enabling quicker and more informed decisions.

The AI assistant is powered by OpenAI API and can provide concise descriptions of the patient's available data based on the prompts provided by the healthcare professional freeing up time spent by professionals in trying to find relevant information or summations of the patients' history.

## Okta Authentication
Since our application handles a lot of sensitive healthcare related data, security and access control prove to be vital requirements. 

That is where Okta comes in. We've implemented Okta as our customer identity solution to authenticate, authorize and secure access to our application. Using Okta, we were able to implement a secure means for our users to log in using Open ID Connect on OAuth 2 and authenticate their identities. Since our application is a primarily client side application with cloud based storage, the provisioning of authentication services from Okta proved to be fundamental in shoring up our application's security without the need to deploy our own servers. This was made possible by the support of Single Page Applications by Okta.


## How we built it
![Alt text](https://raw.githubusercontent.com/cenentury0941/i-health-hist-okta/main/Diag1.png)
- The application is a Single Page Application built using ReactJS and deployed on GithubPages. 
- The AI aspect of the application is powered by OpenAI GPT 3.5 and is used to provide the AI chatbot functionality in the doctor portal. 
- Okta Authentication was implemented using the Okta React SDK, an npm library which provides React SPAs to access the functionalities provided by Okta Identity Services such as auth, user provisioning, Group Management, etc.


## Future Prospects: Enhancing System Functionality
The iHealthHist team is actively developing Optical Character Recognition (OCR) capabilities using the OpenText Content Capture Service. This addition will further improve documentation, streamline document storage and retrieval, and undoubtedly enhance the overall system's functionality.


--------------------------------------------


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
