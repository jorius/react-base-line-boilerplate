# react-base-line-boilerplate

### Content

1. [Prerequisites](#prerequisites)
2. [Architecture](#architecture)
3. [How to run locally](#how-to-run-locally)
4. [Switch between mock services and real services](#switch-between-mock-services-and-real-services)
5. [React.Lazy, React.Suspense and error boundary implementation](#react.lazy,-react.suspense-and-error-boundary-implementation)

## Prerequisites

1. [Git](https://git-scm.com/)
2. [Node](https://nodejs.org/en/)
3. [VS Code](https://code.visualstudio.com/)

## Architecture

| Folder         | Description  	                                                                                                    |
|---	         |---	                                                                                                                |
| .vscode  	     | Visual studio code workspace settings.  	                                                                            |
| src/assets  	 | Web app assets, such as images, fonts, pure css stylesheets, icons, etc.   	                                        |
| src/components | Common components and controls that could be being used anywhere in the application or in the project itself.  	    |
| src/config  	 | Routes services, inner app routes, environments settings, unit test config, etc.   	                                |
| src/core  	 | Main startup of the application, compatibility, mock services, routes building, url mapping, etc.                    |
| src/pages  	 | Main pages of the application, such as: login page, settings page, home page, etc.  	                                |
| src/resources  | Language support text files.   	                                                                                    |
| src/redux  	 | Redux store, action creators, reducers, services and everything related with the flow data of the application.  	    |
| src/styles  	 | Main styles, css stylesheets files, custom theme, color palette, etc.  	                                            |
| src/test  	 | Unit test coverage of the components, redux and util functions etc.  	                                            |

## How to run locally

Once you already clone this repo just go the root folder and run:

```bash
# Install needed packages
> npm install
# Run local server
> npm run start
# Happy hacking!
```

## Switch between mock services and real services

Open the `globals.json` file located in `src/config/settings` and toggle the property `isEnabled` in `serviceMocker` object:

```json
"serviceMocker": {
    "delayResponse": 300,
    "isEnabled": true,
    "loginEmail": "admin@reactjs.com",
    "loginPassword": "MTIzNDU2",
    "passwordRecoveryCode": "MTIzNDU2"
}
```

## React.Lazy, React.Suspense and error boundary implementation

To check these implementations go to `src/pages/master-page` and review the following files:

| File                     | Implementation                    |
|-                         |-                                  |
| component-mapper.js      | React.Lazy                        |
| routes.js                | React.Suspense and error boundary |
| error-boundary.js        | Error boundary                    |
