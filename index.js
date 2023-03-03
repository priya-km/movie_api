const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  fs = require('fs'),
  path = require('path');

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: "Priya",
    favoriteMovies: []
  },
  {
    id: 2,
    name: "Rosie",
    favoriteMovies: ["Moana"]
  },
]

let movies = [
  {
    "Title": "Black Panther: Wakanda Forever",
    "Description": "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death. As the Wakandans strive to embrace their next chapter, the heroes must band together with Nakia and Everett Ross to forge a new path for their beloved kingdom.",
    "Genre": {
      "Name": "Action", 
      // ^^ is why in the code we put Genre.Name, to get the specific name
      "Description":"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
    },
    "Director": {
      "Name": "Ryan Coogler",
      "Bio": "Ryan Kyle Coogler is an American filmmaker. He is a recipient of four NAACP Image Awards, four Black Reel Awards, a Golden Globe Award nomination and two Academy Award nominations.",
      "Birth": 1986
    },
    "ImageURL": "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRCvIhZR4edzgDw19jT5khG2pfDmRtLx3cj53reAtgWoUjCrcLQNDTp7NUrUcj5bK_RgX6JZn4s-qUeT9U",
    "Featured":true
  },
  {
    "Title": "Moana",
    "Description": "An adventurous teenager sails out on a daring mission to save her people. During her journey, Moana meets the once-mighty demigod Maui, who guides her in her quest to become a master way-finder. Together they sail across the open ocean on an action-packed voyage, encountering enormous monsters and impossible odds. Along the way, Moana fulfills the ancient quest of her ancestors and discovers the one thing she always sought: her own identity.",
    "Genre": {
      "Name": "Animation",
      "Description":"Animation is a method by which still figures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.",
    },
    "Directors": {
      "Name": "Ron Clements",
      "Bio": "Ronald Francis Clements (born April 25, 1953) is an American animator, film director, screenwriter, and film producer. He often collaborates with fellow director John Musker and is best known for writing and directing the Disney films The Great Mouse Detective (1986), The Little Mermaid (1989), Aladdin (1992), Hercules (1997), Treasure Planet (2002), The Princess and the Frog (2009), and Moana (2016).",
      "Birth": 1953
    },
    "ImageURL": "https://static.wikia.nocookie.net/disney/images/0/00/Ron_Clements.jpg/revision/latest?cb=20190113231838",
    "SecondDirector": {
      "Name": "John Musker",
      "Bio": "John Edward Musker (born November 8, 1953) is an American animator, film director, screenwriter, and film producer. He often collaborates with fellow director Ron Clements and is best known for writing and directing the Disney films The Great Mouse Detective (1986), The Little Mermaid (1989), Aladdin (1992), Hercules (1997), Treasure Planet (2002), The Princess and the Frog (2009), and Moana (2016).",
      "Birth": 1953
    },
    "ImageURL": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/John_Musker_01.jpg/1024px-John_Musker_01.jpg",
    "Featured":false
  },
  {
    "Title": "Ant-Man And The Wasp - Quantumania",
    "Description": "Ant-Man and the Wasp find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that pushes them beyond the limits of what they thought was possible.",
    "Genre": {
      "Name": "Action",
      "Description":"Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats.",
    },
    "Director": {
      "Name": "Peyton Reed",
      "Bio": "Peyton Tucker Reed is an American television and film director. He directed the comedy films Bring It On, Down with Love, The Break-Up, and Yes Man, as well as the superhero film Ant-Man and its sequels.",
      "Birth":1964
    },
    "ImageURL": "https://www.hollywoodreporter.com/wp-content/uploads/2015/10/ap_935263600928.jpg?w=3000",
    "Featured":true
  },

]

// Top 10 Movies
let topMovies = [
  {
    title: 'Ant-Man And The Wasp - Quantumania',
    director: 'Peyton Reed'
  },
  {
    title: 'Knock At The Cabin',
    director: 'M. Night Shyamalan'
  },
  {
    title: 'All That Breathes',
    director: 'Shaunak Sen'
    },
   {
    title: 'Your Place Or Mine',
    director: 'Aline Brosh McKenna'
    },
    {
    title: 'Magic Mike\'s Last Dance',
    author: 'Steven Soderbergh'
    },
     {
    title: 'Plane',
    author: 'Jean-François Richet'
    },
       {
    title: 'M3gan',
    author: 'Gerard Johnstone'
    },
    {
    title: 'You People',
    author: 'Kenya Barris'
    },
    {
    title: 'Puss In Boots: The Last Wish',
    author: 'Joel Crawford'
    },
    {
    title: 'The Banshees Of Inisherin',
    author: 'Martin McDonagh'
    }    
];

// CREATE

app.post('/users', (req, res) => {
  const newUser = req.body;
  // We can only use the above code because of bodyParser
  if (newUser.name) {
    // newUser is an object so we can assign is a property (code below)
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
    // 201 = something (user) was created.
  } else {
    res.status(400).send('User needs name')
    // Bad request error ^
  }
})

// UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  
  let user = users.find(user => user.id == id);

  if(user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('User not found')
  }
})

// CREATE - Allow users to add a movie to their list of favorites
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find(user => user.id == id);

  if(user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('User not found')
  }
})

// DELETE - Allow users to remove a movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
  
  let user = users.find(user => user.id == id);

  if(user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle)
    // Don't want the movies in the array to match the one user is trying to remove, hence !== 
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send('User not found')
  }
})

// DELETE - Allow users to de-register
app.delete('/users/:id/', (req, res) => {
  const { id } = req.params;
  
  let user = users.find(user => user.id == id);

  if(user) {
    users = users.filter(user => user.id != id);
    // Don't want the movies in the array to match the one user is trying to remove, hence !== 
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send('User not found')
  }
})

// READ - Get list of all movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})

// Find movie by title
app.get('/movies/:title', (req, res) => {
  // Older way of writing this line, newer syntax below - const title = req.params.title;
  const { title } = req.params;
  const movie = movies.find(movie => movie.Title === title);
  
  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("Cannot find movie.")
  } 
})


// Find movie by genre
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre;
  
  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("Genre does not exist.")
  } 
})

// Find data about director by name
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.Director.Name === directorName).Director;
  
  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("No such director.")
  } 
})

app.use(express.static('public'));
app.use(morgan('common'));
// ^^ having morgan log to documentation.html


// GET requests
// homepage
app.get('/', (req, res) => {
  console.log('Welcome to myFlix');
  res.send('Welcome to myFlix!');
});

 /* // Top movies page
app.get('/movies', (req, res) => {                  
  console.log('Top movies request');
  res.json(topMovies);
}); */

// Morgan middleware error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error');
});

// Port 8080 listen request
app.listen(8080, () => {
  console.log('Your app is listening to port 8080.');
});