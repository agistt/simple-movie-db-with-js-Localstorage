
pl.view.updateMovie = {
  setupUserInterface: function () {
    var formEl = document.forms['Movie'],
        saveButton = formEl.save,
        selectMovieEl = formEl.selectMovie;
    var key="", keys=[], movie=null, optionEl=null, i=0;
    Movie.loadAll();
    // selection list with movies
    keys = Object.keys( Movie.instances);
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      movie = Movie.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = movie.title;
      optionEl.value = movie.title;
      selectMovieEl.add( optionEl, null);
    }
      selectMovieEl.addEventListener("change", function () {
          var movie=null, key = selectMovieEl.value;
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
    saveButton.addEventListener("click", 
        pl.view.updateMovie.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Movie.saveAll(); 
    });
  },
  // save data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Movie'];
    var slots = { title: formEl.title.value, 
          rate: formEl.rate.value, 
          review: formEl.review.value
        };
    Movie.update( slots);
    formEl.reset();
  }
};