# Booking appp Demo

This React project implements a responsive web app that simulates a property booking application.

Since there is no back-end, all data is persisted in session storage, as if it was a database.

# Screenshots

## Desktop

<img width="600" alt="image" src="https://github.com/fneiva2006/booking-app-demo/assets/21023652/0ad25696-ef20-488e-b441-4b8be7dab3ef">
<img width="600" alt="image" src="https://github.com/fneiva2006/booking-app-demo/assets/21023652/24f976e4-1542-4fe2-af44-8b617f67e2e3">


## Mobile

<img width="180" alt="image" src="https://github.com/fneiva2006/booking-app-demo/assets/21023652/db5fdcdf-5a3c-4901-9f66-f3d3eebc2cb6">
<img width="180" alt="image" src="https://github.com/fneiva2006/booking-app-demo/assets/21023652/11233962-a8ee-41e1-a423-f763fa112ff1">


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
