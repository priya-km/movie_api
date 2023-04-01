<h1>MyFlix App</h1>
 
## Project Brief
<p >To build the server-side component of a “movies” web application. The web application will provide users with access to information about different movies, directors, and genres. Users will be able to sign up, update their  personal information, and create a list of their favorite movies. </p>

## Developer Notes
<p>The front end of this project is currently being built. As of the 3/23 commit the backend and server-side has been built and successfully tested with Postman. The database has been imported to MongoDB Atlas and the app has been deployed on Render.</p>
 
## Links
 [Live View](https://myflixapp.onrender.com/ "Live View")
    <br>
## API Endpoints
 <li>POST - Allow new users to register - /users</li>
 <li>POST - Allow users to login - /login</li>
 <li>PUT - Allow users to update their information - /users/:username</li>
 <li>GET - Get all movie information - /movies</li>
 <li>GET - Get information about one movie - /movies/:Title</li>
 <li>GET - Get information about one genre - /movies/genre/:genreName</li>
 <li>GET - Get information about a director by name - /movies/directors/:directorName</li>
 <li>POST - Allow users to add a movie to their favorites - :Username/:MovieID</li>
 <li>DELETE - Allow users to remove a movie from their favorites - :Username/:MovieID</li>
 <li>DELETE - Allow users to deregister - /users/:Username</li>
 
## Built With
  
  <li>Javascript</li>
  <li>Node.js</li>
  <li>Express</li>
  <li>MongoDB</li>
  <li>React</li>
 
  ## Features
  <br>
  <p>Please see documentation.html for proper request end points and formats</p>
  <li>Users can sign up and login to their accounts</li>
  <li>Users who do not have an account/are not token authenticated cannot access information</li>
  <li>Authenticated users can access information as well as update their own user info, add/remove movies from their favorites, and delete their account.</li>
 <br>
 
## Author
<h3>**Priya Maharban**<h3>

[GitHub Profile](https://github.com/priya-km "Priya-Maharban")
  <br><br>
[Email](mailto:priyakmaharban@gmail.com?subject=Hi% "Hi!")
  <br><br>
[Portfolio Website](https://priya-km.github.io/portfolio "Welcome")
  <br><br>

  
 </div>

  
