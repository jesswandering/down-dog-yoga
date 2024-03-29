# `Down Dog Yoga App`
Down Dog Yoga is a simple way to make yoga a part of your daily routine.  The poses are broken down into categories to help you choose which area you would like to address. Each category offers a quick and convenient list of yoga poses, Sanskrit name, description of how to get into the pose and benefits to improve your flexibility, maintain your natural range of motion, strength, and balance.  

It's never too late to start yoga, so just get Down Dog.

## TECHNOLOGIES USED: 
* Node.js
* Express
* EJS
* JavaScript
* Bootstrap
* Postgress
* Sequelize
* HTML
* CSS

## ACCESSING THE WEBSITE ONLINE
Visit: 

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

## API 
https://yoga-api-nzy4.onrender.com/v1

## SREENSHOTS
![Homepage](public/images/homepage.png)
![Categories Page](public/images/categories.png)
![Pose Page](public/images/pose.png)
![Search Page](public/images/search.png)

## UNSOLVED PROBLEMS/FUTURE GOALS
1. Improve UI/UX
2. Add a timer of how long to hold each pose
3. Add videos of how to get into each pose
4. Include a Favorites page
