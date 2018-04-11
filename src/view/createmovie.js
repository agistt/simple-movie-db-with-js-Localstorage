
pl.view.createMovie = {
  setupUserInterface: function () {
    var saveButton = document.forms['Movie'].save;
    Movie.loadAll();
    // event handler for the save/submit button
    saveButton.addEventListener("click", 
        pl.view.createMovie.handleSaveButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Movie.saveAll(); 
    });
  },
  // save user input data
  handleSaveButtonClickEvent: function () {
    var formEl = document.forms['Movie'];
    var slots = { title: formEl.title.value, 
        rate: formEl.rate.value, 
        review: formEl.review.value};
    Movie.create( slots);
    formEl.reset();

  }
};