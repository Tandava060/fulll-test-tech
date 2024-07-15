# Backend - Vehicle fleet parking management

## Steps implementation
- Implementation of step one is available on branch step-1 at [here](https://github.com/Tandava060/fulll-test-tech/tree/step-1/Backend).
- Implementation of step two and three is available on main.


## Requirements 
 you will need a computer with Node, Typescript, Yarn and Cucumber installed.


# Step 1

git checkout step-1 (Go to branch step-1)

## Install
 You have to run `yarn install` to get all the dependencies

## Running the tests
`yarn run test`


# Step 2

git checkout main (Go to branch main)

## Install
 You have to run `yarn install` to get all the dependencies

## Build the project:
`yarn run build`

## The CLI accepts the following commands:
You can use ./fleet or ./fleet.bat depending on your environment
```shell
./fleet create <userId>
./fleet register-vehicle <fleetId> <vehiclePlateNumber>
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> lat lng [alt]
```

## Running the tests
`yarn run test`


# Step 3
### For code quality, you can use some tools : which one and why (in a few words) ?
For code quality in this project, I used eslint and prettier
- esLint: Provides static code analysis, catching type-related errors and enforcing best practices.
- prettier: Formats code to maintain consistency across the project.

### you can consider to setup a ci/cd process : describe the necessary actions in a few words
I usually use github actions or azure devops for CI/CD operations. In this project the following steps would be:
- Trigger on push to main branch (usually develop)
- Set up Node.js environment
- Install dependencies
- Run tests
- Run linting
- Build the project
- deploy to server
- setup paths on server to configure commands globally


