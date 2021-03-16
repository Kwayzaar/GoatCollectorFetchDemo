let addGoat = false;
const URL = 'http://localhost:3000/goats/'
const goatCollection = document.querySelector('#goat-collection')
const goatForm = document.querySelector('.container')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-goat-btn");
  const goatFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addGoat = !addGoat;
    if (addGoat) {
      goatFormContainer.style.display = "block";
      goatForm.addEventListener('submit', event=>{
        event.preventDefault()
        postGoat(event.target)
        event.target.reset()
      })
    } else {
      goatFormContainer.style.display = "none";
    }
  });
  
  fetchGoats()
});

function fetchGoats(){
  fetch(URL)
  .then(res=> res.json())
  .then(data => data.forEach(goat => renderGoat(goat)))
}


function postGoat(goatData) {

  if (goatData.name.value.length < 1) {
    let name = "unknown"
  } else {
    let name = goatData.name.value
  }

  let name 
  goatData.name.value.length < 1 ? name = "unknown" : name = goatData.name.value

  newGoat = {
    "name": name,
    "image": goatData.image.value,
    "likes": 0,
    "ridiculous": true
  }

  https://dev.to/danedawson/fetch-in-javascript-pt-ii-revenge-of-the-options-3775
  
  options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(newGoat)
  }

  console.log(options)

  fetch(URL, options)
    .then(res => res.json())
    .then((returnedGoat) => {
      renderGoat(returnedGoat)
    })
}

function feed(e) {
  e.preventDefault()
  let newCount = parseInt(e.target.previousElementSibling.innerText) + 1

  updatedGoat = {
    "likes": newCount
  }

  options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify(updatedGoat)
  }

  console.log(options)

  fetch((URL + e.target.id), options)
    .then(res => res.json())
    .then((returnedUpdatedGoat => {
      console.log(returnedUpdatedGoat, "updated goat")
      e.target.previousElementSibling.innerText = `${returnedUpdatedGoat.likes} feedings already!`;
      // console.log(returnedUpdatedGoat)
    }))
}

function deleteGoat(e, divCard) {

  options = {
    method: "DELETE"
  }

  console.log(options)

  fetch((URL + e.target.id), options)
    .then(res => res.json())
    .then((deletedGoat => {
      console.log(deletedGoat)
      divCard.remove()
    }))
}

function renderGoat(goat){
  let h2 = document.createElement('h2')
  h2.innerText = goat.name

  let img = document.createElement('img')
  img.setAttribute('src', goat.image)
  img.setAttribute('class', 'goat-avatar')

  let p = document.createElement('p')
  p.innerText = `${goat.likes} feedings already!`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
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
