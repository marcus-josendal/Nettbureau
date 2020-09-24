# Nettbureau Interview Task

## Running the project

### 1. Install dependencies
```
yarn install
```

### 2. Running the backend
For the backend to run you will need a gmail account to send e-mails. The gmail account needs to have "less secure apps" enabled.
To configure the backend to use your account you have to add an `.env` file in the backend/ folder with the following content.

````.env
GMAIL_USERNAME=? //example: ola.nordmann@gmail.com
GMAIL_PASSWORD=?
````

The backend runs on port `8081`, so make sure you dont have anything else running at that port. 
Now you can build and run the backend by running `yarn start:backend` from the root folder.

### 3. Running the frontend
````
yarn start:frontend
````
You can find the application at port 8080, when the application is done building.  
