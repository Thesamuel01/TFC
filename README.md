# Trybe Football Club

This is a project developed at Trybe's Back-End Module.

Trybe Football Club is a full stack application to access information about the Brazilian football championship. It were developed using a node server and Sequelize ORM to manipulate a MySQL database.

***React frontend and all config files except for the backend/frontend dockerfile were provided by Trybe, the application backend was developed from scratch.***

# Summary
- [Trybe Football Club](#trybe-football-club)
- [Summary](#summary)
- [Context](#context)
- [Technologies and Tools](#technologies-and-tools)
- [Notes](#notes)
- [Git and Commits](#git-github-and-commit-history)
- [Lint](#lint)
- [Installing and running the app](#installing-and-running-the-app)
- [Documentation](#api-documentation)

# Context
In the application you can do:
- Log in to the System.
- View team matches.
- Create and update a match only when you are logged in.
- View teams leaderboard.

# Technologies and Tools
This project used the following technologies and tools:
  * __Node__ | [Javascript Runtime Environment](https://reactjs.org/docs/thinking-in-react.html)
  * __Express__ | [Web Framework for NodeJS](https://redux-toolkit.js.org/introduction/getting-started)
  * __Sequelize__ | [Object–relational Mapping](https://sequelize.org/docs/v6/getting-started/) 
  * __BcryptJS__ | [Password Hashing](https://github.com/dcodeIO/bcrypt.js)
  * __JWT__ | [JSON Web Token](https://jwt.io/introduction)
  * __Mocha__ | [JS Test Framework](https://mui.com/pt/material-ui/getting-started/overview/) 
  * __Sinon__ | [Test Spies, Stubs and Mocks](https://sinonjs.org/releases/v14/) 
  * __Chai__ | [Asserts](https://www.chaijs.com/api/)

# Notes
### Git, GitHub and Commit History
- This project used the [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/) with some types from [Angular convention](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Lint
- The project was developed following the Clean Code standards specified by [Trybe's Lint](https://github.com/betrybe/eslint-config-trybe).


# Installing and running the app
_To run this project properly, docker-compose version should be at `1.29` or higher and node version should be at `16.14.0 LTS` or higher._


### Login
Data to log into frontend app </br>
``admin``
```
email: admin@admin.com
password: secret_admin
```
``user``
```
email: user@user.com
password: secret_user
```

### Download the app
```
git clone git@github.com:Thesamuel01/TFC.git
```

## Running with docker

### Enter into project directory
```
cd TFC
```

### Build docker containers and their network.
```
npm run compose:up
```

### Access application front-end
```
http://localhost:3000
```

### Stop application
```
npm run compose:down
```


## Running without docker
\* __To run this app without docker you need a running MYSQL server.__

### Enter into project directory
```
cd TFC
```

### Install all dependencies
```
npm install
```

### Go to backend directory
```
cd app/backend
```

### Set environment variables
Set your environment variables in .env.example file according to your development environment and then change its name to .env
```
JWT_SECRET=
APP_PORT=
DB_USER=
DB_PASS=
DB_HOST= 
DB_PORT=
```

### Start node server
```
npm start
```

### In the project root directory go to frontend directory
```
cd app/frontend
```

### Start frontend app
```
npm start
```


# API Documentation
# 🚧 In progress... 🚧
