
pl.view.deleteMovie = {
  setupUserInterface: function () {
    var formEl = document.forms['Movie'],
        deleteButton = formEl.delete,
        selectEl = formEl.selectMovie;
    var key="", keys=[], movie=null, optionEl=null, i=0;
    Movie.loadAll();
    keys = Object.keys( Movie.instances);
    //selection list with movies
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      movie = Movie.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = movie.title;
      optionEl.value = movie.title;
      selectEl.add( optionEl, null);
    }
    selectEl.addEventListener("change", function () {
        var movie=null, key = selectEl.value;
        if (key) {
          movie = Movie.instances[key];
          formEl.title.value = movie.title;
          formEl.rate.value = movie.rate;
          formEl.review.value = movie.review;
        } else {
          formEl.title.value = "";
          formEl.rate.value = "";
          formEl.review.value = "";
        }
    });
  
    deleteButton.addEventListener("click", 
        pl.view.deleteMovie.handleDeleteButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Movie.saveAll(); 
    });
  },
  // Event handler for deleting a movie
  handleDeleteButtonClickEvent: function () {
    var selectEl = document.forms['Movie'].selectMovie;
    var title = selectEl.value;
    if (title) {
      Movie.destroy( title);
      selectEl.remove( selectEl.selectedIndex);
    }
  }
};