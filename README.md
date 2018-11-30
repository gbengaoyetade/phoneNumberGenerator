### Phone Number Generator

[![Build Status](https://travis-ci.org/gbengaPS/phoneNumberGenerator.svg?branch=develop)](https://travis-ci.org/gbengaPS/phoneNumberGenerator) [![Test Coverage](https://api.codeclimate.com/v1/badges/6c6a19c5990ccb647396/test_coverage)](https://codeclimate.com/github/gbengaPS/phoneNumberGenerator/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/6c6a19c5990ccb647396/maintainability)](https://codeclimate.com/github/gbengaPS/phoneNumberGenerator/maintainability)

Phone number generator is an application that simulates generating unique 10 digits phone numbers

## Getting Started

Clone the repository

```
$ git clone git@github.com:gbengaPS/phoneNumberGenerator.git
```

Change directory into the project

```
$ cd phoneNumberGenerator
```

Then install packages

```
$ yarn install
```
Create an empty `database.txt` file

Start application

```
$ yarn start
```

### Endpoints

Though you get to interact with the frontend, the application implements two endpoints

| Endpoint                 | HTTP Method | Description                                                                                |
| ------------------------ | ----------- | ------------------------------------------------------------------------------------------ |
| /api/v1/numbers          | GET         | Returns all numbers and a statistics containing `min`, `max` and `total` numbers available |
| /api/v1/numbers/generate | POST        | Generates numbers equal to `count` parameter supplied to it.                               |

### Prerequisites

This application was built with Node js so you'll need to install it on your machine to run the application. It also uses `yarn` as the package manager, `npm` will work fine too.

- [Node Js](https://nodejs.org/en/download/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Running the tests

Tests for this application were built using the `jest` test framework
To run tests

```
$ yarn test
```

To see test coverage

```
$ yarn test:cover
```

## Features

- You can generate numbers up to 10000 at a time
- Numbers generated are always 10 digits and unique
- You get to see numbers sorted in ascending order
- Total phone numbers generated gets sent back every time a new set of numbers gets generated
- You get to see the stats of the minimum and maximum number

## Product Limitation

- This application was not built with a database management system
- You cannot delete numbers generated from the user interface or via endpoint
- There is no authentication or authorization built in

## Want to Contribute?

- Fork the repository
- Make your contributions
- Ensure your codes follow the [AirBnB Javascript Styles Guide](https://www.gitbook.com/book/duk/airbnb-javascript-guidelines/details)
- Create Pull request against the `develop` branch.

## Author

- [Gbenga Oyetade](https://twitter.com/gbenga_ps)

## Acknowledgments

- Andela Fellowship (https://andela.com/)

## License

[MIT License](./LICENSE)
