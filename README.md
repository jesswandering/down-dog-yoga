# `Down Dog Yoga App`
Down Dog Yoga is a simple way to make yoga a part of your daily routine.  The poses are broken down into categories to help you choose which area you would like to address. Each category offers a quick and convenient list of yoga poses, Sanskrit name, description and benefits to improve your flexibility, maintain your natural range of motion, strength, and balance.  It's never too late to start yoga, so just get Down Dog.

## TECHNOLOGIES USED: 
* Node.js
* Express
* EJS
* JavaScript
* Bootstrap
* Postgress
* Sequelize


## HOW TO USE
* Create an account
* Search for yoga poses by a category you would like to address: hip openers, arm balances, backbends, etc. or you may search by for a pose by it's name or difficulty level.
* If you would like to save a pose or category of poses you can click the "Add to Favorites" button on the pose or category page.

## HOW TO INSTALL
Requires ```Node.js```, ```Postgres```, and ```Sequelize```
1. ```Fork``` and ```clone``` this repository to your local machine.
2. Create a ```.env``` file and add the following:

```SECRET_SESSION=yoga_app```

3. Run ```npm install``` to install dependencies.
4. Run ```npm run dev``` to start the server.
5. Open ```http://localhost:3000``` in a web browser to access this app.

## HOW IT WORKS
Down Dog Yoga uses an API to get information on yoga poses, the Sanskrit name, a description of the pose and benefits of each pose.

Users can add and remove poses or categories they are working on to a favorites page for quick access to poses they are working up to.

## API CALLS



https://yoga-api-nzy4.onrender.com/v1

