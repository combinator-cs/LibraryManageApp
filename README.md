## Library Management App

### Local Setup:
#### Backend:
  1. Add MYSQL Database URI
  2. Send POST request to BASE_URL + "/create" to create required tables (will create only if not created before)
  3. run main function in __init__.py to start app
#### Frontend:
  1. Add Back-end **IP:Port** in src/Utils/Constants.js file as **BASE_URL** String
  2. Run following commands in Terminal at Project directory to start the app:
~~~
> npm install
> npm start
~~~~
