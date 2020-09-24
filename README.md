# Nettbureau Interview Task

## Running the project

### 1. Install dependencies
```
yarn install
```

### 2. Running the backend
For the backend to run you will need a gmail account to send e-mails. The gmail account needs to have "less secure apps" enabled.
To configure the backend you have to add an `.env` file in the backend/ folder with the following content.

````.env
GMAIL_USERNAME=? //example: ola.nordmann@gmail.com
GMAIL_PASSWORD=?
````

The backend runs on port `8081`, so make sure you don't have anything else running at that port. 
First build the backend by running `yarn build:backend` from root, then run `yarn start:backend`, also
from root.  

### 3. Running the frontend

It's important that you have run `yarn build:backend` before you run the Frontend. When you are building
the backend, you are also building the files that the frontend and backend have in common. 
````
yarn start:frontend
````
You can find the application at port 8080, when the application is done building.  
