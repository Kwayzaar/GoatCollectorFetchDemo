let addGoat = false;

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-goat-btn");
  const goatFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addGoat = !addGoat;
    if (addGoat) {
      goatFormContainer.style.display = "block";
    } else {
      goatFormContainer.style.display = "none";
    }
  });
  
});