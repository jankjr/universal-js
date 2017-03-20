# universal react app

This is an example of an universal react app. To get started, run

    npm install

This will download dependencies and node modules.

`npm start` will start the server/client in development mode.

`react-native run-ios` and `react-native run-android` starts development server for the native platforms. 


## Code Structure

The code is arranged as follows:

The main entrypoints for the apps are located in the top level

  1. index.andorid.js - The main entry point for android apps
  2. index.ios.js - The main entry point for ios apps
  3. index.web.js - The main entry point for web clients

The '/src' for is then arranged as follows:

  1. src/client/ - Code mostly used for rendering the client
  2. src/server/ - Code mostly used by the server

The '/client' has the following structure

  1. Toplvel Html.js, Native.js, Web.js main driver components running the view code.
  2. /routes - The different set of views of your applications
  3. /component - Reusable and 'mostly' dump pieces of code that can be used anywhere

The '/server' directory contains the express server definition.


### Extensions for larger apps

In larger codebases more cross concern code will be introduced, and as such there will be a need for more shared code.

This code could be things like a data/schema layer, which both the client and server needs. General shared code utilities. And more advanced configuration. All of these I suggest be located on the topmost directory where they make sense. If code is shared between client and server, the code should probably be located on the top level.

## Tests - General tips

Tests should also be introduced, and looks different depending on the component being tested.

  - Utility code that performs or transforms data should be executed as unit tests.

  - e2e tests could be setup and ready prior to running the ui code to minimize the exposure to selenium.

  - Integration tests should activate the server directly through the api, and compared to e2e/unit tests should be the main focus.