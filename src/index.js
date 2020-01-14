let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyList = document.querySelector("#toy-collection")
  const newToyForm = document.querySelector(".add-toy-form")
  
  fetch(`../db.json`)
    .then(response => response.json())
    .then(toys => {
      // console.log(toys["toys"])
      toys["toys"].map(toy => {
        addToyCard(toy.name, toy.image, toy.likes)
      })
    })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

  newToyForm.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(event.target.childNodes[3].value)
    // fetch(`http://localhost:3000/toys`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type":"application/json",
    //     "Accept":"application/json"
    //   },
    //   body: JSON.stringify({
    //     name: event.target.childNodes[3].value,
    //     image: event.target.childNodes[7].value,
    //     likes: 0
    //   })
    // })
    addToyCard(event.target.childNodes[3].value, event.target.childNodes[7].value, 0)
  })

  function addToyCard(toyName, toyImage, toyLikes){
    const cardDiv = document.createElement("div")
    const toyH2 = document.createElement("h2")
    const toyImg = document.createElement("img")
    const toyP = document.createElement("p")
    const toyButton = document.createElement("button")

    cardDiv.classList.add("card")
    toyImg.classList.add("toy-avatar")
    toyButton.classList.add("like-btn")

    
    toyH2.textContent = toyName
    toyImg.src = toyImage
    toyP.textContent = `${toyLikes} Likes`
    toyButton.textContent = "Like <3"
    
    toyButton.addEventListener("click", (event) => {
      toyLikes += 1
      toyP.textContent = `${toyLikes} Likes`
    })

    cardDiv.append(toyH2, toyImg, toyP, toyButton)
    toyList.appendChild(cardDiv)

  }
})
