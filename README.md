# Booking appp Demo

This React project implements a responsive web app that simulates a property booking application.

Since there is no back-end, all data is persisted in session storage, as if it was a database.

# How to run

```sh
yarn install
yarn dev
```

# Implementation details

### Data storage & fetching

Data is managed by combination of React Context and Browser Session Storage, which is abstracted to the application by the usage of `ApiClient`.

The idea was to simulate a real case, where the application would use an API client to fetch data from servers.

### Data Validation

The way the app was designed there is no need to validate if the date range submited is not being used already. We can assume the server that will receive
the POST/PUT request will execute that validation too. Considering the user won't be hacking the system there is no need to perform front-end validation
for that case.

However, input validation for required fields are executed with the purpose of making clear to the user what fields should be filled. This is done by a combination
of `react-hook-form` and `zod`.

### Available properties filtering

In the property list view, a filter can be applied to display only those properties that have availability within the range provided.
