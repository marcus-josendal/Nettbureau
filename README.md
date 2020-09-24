# Nettbureau Interview Task

## Running the project

### 1. Install dependencies
```
yarn install
```

### 2. Running the backend
You'll need a gmail account to send e-mails. The gmail account needs to have "less secure apps" enabled.
To configure the backend to use the correct account, add an `.env` file in the backend/ folder with the following content.

````.env
GMAIL_USERNAME=? //example: ola.nordmann@gmail.com
GMAIL_PASSWORD=?
````

Now you can build and run the backend by running `yarn start:backend` from the root folder.

### 3. Running the frontend
````
yarn start:frontend
````
When the application is done building you can find your application at port 8080. 
