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
      // Adding an event listener onto my goat form to perform a POST request
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

// This is the GET fetch we are used to. In a fetch, if no second argument is given, it inherently assumes you are performing a GET request.
function fetchGoats(){
  fetch(URL)
  .then(res=> res.json())
  .then(data => data.forEach(goat => renderGoat(goat)))
}


function postGoat(goatData) {

  // example simple conditional for setting name to a default if none is entered
  // if (goatData.name.value.length < 1) {
  //   let name = "unknown"
  // } else {
  //   let name = goatData.name.value
  // }
  // This is the same function but in a ternary
  // let name 
  // goatData.name.value.length < 1 ? name = "unknown" : name = goatData.name.value


  // Package the object that you are planning to post, making sure it's Key names match the attributes you have set up in your back end
  goat = {
    "name": name,
    "image": goatData.image.value,
    "likes": 0
  }

  // The options object is required for any fetch that isn't a GET request, but it can be named whatever you'd like
  options = {
    // You have to declare what type of data interaction this is, POST, PATCH, DELETE, etc
    method: 'POST',
    // Headers are used to declare information about this object. For now we focus on data type it is (content-type) and what the front end will accept in response (accept)
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    // The body is the ACTUAL DATA you want sent in this fetch. It needs to be JSON.stringified to be sent through a fetch for efficiency
    body: JSON.stringify(goat)
  }

  console.log(options)

  // This is our new, clean POST fetch all together.
  fetch(URL, options)
    .then(res => res.json())
    .then((returnedGoat) => {
      renderGoat(returnedGoat)
    })

    // This is the same POST fetch, but with the objects deconstructed into one flow of code. This is syntactically identical to lines 71-75 above
// fetch(URL, {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: "application/json"
//   },
//   body: JSON.stringify({
//     "name": name,
//     "image": goatData.image.value,
//     "likes": 0
//      })
//   })
//.then(res => res.json())
//.then((returnedGoat) => {
//  renderGoat(returnedGoat)
// })
}



// For a PATCH or DELETE you need to target the model you are effecting
function feed(e) {
  e.preventDefault()
  let newCount = parseInt(e.target.previousElementSibling.innerText) + 1

  // We create an object that matches the attributes on the backend, with our newly updated values
  // You also ONLY need to send in the attributes that are actually getting updated, any attribute you don't want to change you can leave out of this object
  updatedGoat = {
    "likes": newCount
  }

  // The options looks almost identical to a POST, except the method has changed
  options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"

    },
    body: JSON.stringify(updatedGoat)
  }

  console.log(options)

  // The only difference between the fetch is where we fetch it to. Since we are targeting a single model, we MUST pass a unique identifier to target that model
  // A model ID is one of the easiest unique attributes to target, so we pass that in to find that one specific model and update it
  fetch((URL + e.target.id), options)
    .then(res => res.json())
    .then((returnedUpdatedGoat => {
      console.log(returnedUpdatedGoat, "updated goat")
      e.target.previousElementSibling.innerText = `${returnedUpdatedGoat.likes} feedings already!`;
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
