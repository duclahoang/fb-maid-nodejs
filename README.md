#fb-maid-nodejs
## Introduce Project
Project name: fb-maid-nodejs
Description: This is the chatbot I made for facebook messenger. I call it "Maid"
Language used: Nodejs
Module used: dotenv, g-i-s (google image search), google (google search web), facebook-chat-api (interact with facebook messenger), simsimi (auto-reply - for fun)
## Requirement
install nodejs and npm if you don't have them
(you can google how to install)
Change your FaceBook Security to 1 step, because I use facebook-chat-api and this module simulates a browser, then logins to your account and works. So, if you turn on 2 step security, it won't pass the second step (your phone) and it won't work! 
I use 3rd party modules not my module, so don't worry ! Your account will be safe.
## Usage
step 1: Download Project
step 2: Extract Project
step 3: Open Command Prompt and navigate to Project Folder
step 4: get the free trial key (simsimi) and put the key to .env
step 5:
I use [dotenv](https://www.npmjs.com/package/dotenv) for storing my configuration, so in the 4th step, you must make your own .env
In the Command Prompt, type:
```
touch .env
notepad .env
```
Then, copy the text below, replace account, password with your account and password, I will guide you to get the key for simsimi later 
```
EMAIL="account"
PASSWORD="password"
KEY="977fdce0-c8f7-4b4a-b0bc-a61858b92489"
```
step 6:In Command Prompt, type:
```
npm install
node index.js
```
## Functions
## Screenshots
