
 pl.view.listMovies = {
  setupUserInterface: function () {
    var tableBodyEl = document.querySelector("table#movies>tbody");
    var keys=[], key="", row={}, i=0;
    Movie.loadAll();
    keys = Object.keys( Movie.instances);
    // for each movie, create a table row with a cell for each attribute
    if(keys.length == 0 ){
         alert("There is no movie in your list :( \n");
    }
    else {
     for (i=0; i < keys.length; i++) {
      key = keys[i];
      row = tableBodyEl.insertRow();
      row.insertCell(-1).textContent = Movie.instances[key].title;      
      row.insertCell(-1).textContent = Movie.instances[key].rate;  
      row.insertCell(-1).textContent = Movie.instances[key].review;
    }
   }
  }
};  