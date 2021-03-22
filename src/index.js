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


// This is just a render. Y'all can dig through this at your leisure.
function renderGoat(goat){
  let h2 = document.createElement('h2')
  h2.innerText = goat.name

  let img = document.createElement('img')
  img.setAttribute('src', goat.image)
  img.setAttribute('class', 'goat-avatar')

  let p = document.createElement('p')
  p.innerText = `${goat.feedings} feedings already!`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'feeding-btn')
  btn.setAttribute('id', goat.id)
  btn.innerText = "Feed"
  btn.addEventListener('click', (e) => {
    feed(e)
  })

  let divCard = document.createElement('div')

  let deleteBtn = document.createElement('button')
  deleteBtn.setAttribute('class', 'delete-btn')
  deleteBtn.setAttribute('id', goat.id)
  deleteBtn.innerText = "Remove from collection"
  deleteBtn.addEventListener('click', (walnuts)=>{
    deleteGoat(walnuts, divCard)
  })
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn, deleteBtn)
  goatCollection.append(divCard)
}
