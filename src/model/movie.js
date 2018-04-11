
function Movie( slots) {
  this.title = slots.title;
  this.rate = slots.rate;
  this.review = slots.review;
};
Movie.instances = {};
// Convert row to object
Movie.convertRow2Obj = function (movieRow) {
  var movie = new Movie( movieRow);
  return movie;
};
// Load the movie table from Local Storage
Movie.loadAll = function () {
  var key="", keys=[], moviesString="", movies={}, i=0;  
  try {
    if (localStorage.getItem("movies")) {
      moviesString = localStorage.getItem("movies");
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (moviesString) {
    movies = JSON.parse( moviesString);
    keys = Object.keys( movies);
    console.log( keys.length +" movies loaded.");
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      Movie.instances[key] = Movie.convertRow2Obj( movies[key]);
    }
  }
};
//  Save all movie objects to Local Storage
Movie.saveAll = function () {
  var moviesString="", error=false,
      nmrOfmovies = Object.keys( Movie.instances).length;  
  try {
    moviesString = JSON.stringify( Movie.instances);
    localStorage.setItem("movies", moviesString);
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfmovies + " movies saved.");
};
//  Create a new movie
Movie.create = function (slots) {
  var movie = new Movie( slots);
  Movie.instances[slots.title] = movie;
  console.log("movie " + slots.title + " created!");
};
//  Update an existing movie
Movie.update = function (slots) {
  var movie = Movie.instances[slots.title];
  var review = parseInt( slots.review);
  if (movie.rate !== slots.rate) { movie.rate = slots.rate;}
  if (movie.review !== slots.review) { movie.review = slots.review;}
  console.log("movie " + slots.title + " modified!");
};
//  Delete a movie from storage
Movie.destroy = function (title) {
  if (Movie.instances[title]) {
    console.log("movie " + title + " deleted");
    delete Movie.instances[title];
  } else {
    console.log("There is no movie with title " + title + " in the database!");
  }
};
//  Clear data
Movie.clearData = function () {
  if (confirm("Do you really want to delete all movie data?")) {
    Movie.instances = {};
    localStorage.setItem("movies", "{}");
    location.reload();
  }
};

