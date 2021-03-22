let addGoat = false;
const goatURL = "http://localhost:3000/goats/";
const goatCollection = document.getElementById('goat-collection')

document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.querySelector("#new-goat-btn");
  const goatFormContainer = document.querySelector(".container");
  const goatForm = document.querySelector(".add-goat-form")
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addGoat = !addGoat;
    if (addGoat) {
      goatFormContainer.style.display = "block";
    } else {
      goatFormContainer.style.display = "none";
    }
  });

  goatForm.addEventListener("submit", (event)=> {
    event.preventDefault()
    const newGoat = {
      "name": event.target.name.value,
      "image": event.target.image.value,
      "feedings": 0
    }
    postGoat(newGoat)
  })
  fetchGoats()
});

function postGoat(goat) { //creating function to send data back to api (POST)
  const options = {
    method:"POST",
    headers: {
      "Content-Type":'application/json',
      "Accept": "application/json"
    }, 
    body: JSON.stringify(goat)
  }
  // console.log(options)

  fetch(goatURL, options)  
}

function fetchGoats() { //creating a fetch function
  fetch(goatURL) //fetching data from API
  .then(response => response.json()) //parsing the data fetched
  .then(goatArray=>goatArray.forEach(goat=>renderGoat(goat)))
}

function feed(event, pTag) {

  let newFeedings = parseInt(pTag.innerText) + 1 

  let feedingObject = {
    "feedings":newFeedings
  }
  const options = {
    method:"PATCH",
    headers: {
      "Content-Type":'application/json',
      "Accept": "application/json"
    }, 
    body: JSON.stringify({"feedings": newFeedings})
  }   
  // console.log(event.target.id)
  fetch(goatUrl + goatId, options) 
  .then(response => response.json())
  // .then(updatedGoat) => console.log(updated.goat)
}

function deletGoat(event, divCard){
  let goatID = event.target.id

  let options ={
    method: "DELETE"
  }

  fetch(goatUrl + goatId, options)
  divCard.remove()

}
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
    feed(e, p)
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

