# SmartBrain

<div align="center">
    <h2>Face Detection project </h1>
        <h4>
            Built with <a href="https://create-react-app.dev/">Create-React-App</a> &
            Hosted by <a href="https://www.heroku.com/platform">Heroku</a> 
        </h4>
</div>

<!-- Live Demo Link -->
<div align="center">
<a href="https://face-recognition-brain-ef77df87c18e.herokuapp.com/" target='_blank'>
    click here for a live demo
</a>
<p>

</p>
</div>


<h3 align='center'>Technologies & Tool:</h3>
<br/>

<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=js,react,nodejs,postgres,postman,git,heroku,github,html" />
  </a>
</p>

</br>
Face-recognition-brain is a full-stack web app for detecting faces in images using AI, providing an intuitive interface built with React that connects to a Node/Express backend. 
The front end allows users to seamlessly submit images and view facial recognition results, with bounding boxes highlighting detected faces via integration with the Clarifai API.
The app simply coordinates the client, server, database, and API, registering users with encrypted passwords, processing submissions, and tracking metrics. 
The tech stack demonstrates the use of React, Node, PostgreSQL, and external APIs, with face recognition happening rapidly through optimized calls to Clarifai's computer vision models. 

### :camera: A demo of the Web App
<p align="center">
<img src="face demo.png" ">
</p>

## :key: Features
As a user, you can:

- Login/Log out or set up a New Account(Register)
- Submit an image URL to analyze
- See the total count of images analyzed for their account
- Have their password securely hashed and stored on the registration
- See analysis results almost instantly after submitting an image

## :hammer: Project Structure

The app consists of:

- A React frontend created with Create React App
- React Router for routing between pages
- Navigation bar component for switching routes
- Home page to display image analysis info
- Login and Register pages for authentication
- Integration with Clarifai API for image analysis
- Node/Express backend hosted on Heroku
- PostgreSQL database for user accounts
- Bcrypt for password hashing
- Knex.js for database integration
- API routes on the backend for image URL processing
- Service worker for offline capability
- Particle.js for background animations

Key technical pieces:

- React with React Router for routing
- React hooks for state and effects
- Clarifai API integration for image analysis
- Node & Express backend API
- PostgreSQL database
- Bcrypt password hashing
- Knex.js for database access
- API calls between frontend and backend
- Service worker for offline support
- Particle.js for animations
