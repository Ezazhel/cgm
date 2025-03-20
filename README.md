# What can you find in this app
This app use Angular 19, signal / observable / guard and urlParams communication between components.

# Structure

This app is divided in two feature folders : commits | repositories
Each feature contains : its model | guard | route | page
  ### Model
    Interface used by the application
  ### Guard
    Used to allow access on a page
  ### Route
    Entry points of a feature
  ### Page
    A page is a component used as an access point by the application.
    A page folder contain its children component, no need to create a shared component folder in the feature if those components won't be used by an other page

## How to use this app
In order to use this app you will need to create an environment.local.ts in the environments folder.

This environment.local.ts must follow Environment interface. You must provide a Github Key to use the github api.

Here is more information on how to create a key : https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token


### Improvement
This app could be improve by re-using components between feature (we re-use stylesheet but we could have component||directive instead)

We could add a state instead of passing queryParams from /repos to /commits

We could also implement a loading skeleton and a better default state on page when the user hasn't search anything

**But this is was out of the scope**
