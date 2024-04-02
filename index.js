//event listeners
document.querySelector('#animal-form').addEventListener('submit', handleSubmit)
function handleSubmit(e){
    e.preventDefault()
    const name = document.getElementById("label1").value
    const imageUrl =  document.getElementById("label2").value
    const description = document.getElementById("label3").value
    let animalObj = {
        name,
        imageUrl,
        description,
        donation: 0
    }
    renderOneAnimal(animalObj)
    adoptOneAnimal(animalObj)
}

//DOM manipulation
function renderOneAnimal(animal){
    // build animal
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
    <img src=${animal.imageUrl} alt="img">
    <div class="content">
    <h4>${animal.name}</h4>
    <p>
    KSHS <span class="donation-count">${animal.donation}</span> Donated
    </p>
    <p>${animal.description}</p>
    
        <button class="other" id="donate">Donate Ksh 1000</button>
        <button class="other" id="delete">Set Free</button>

    </div>`
   //add animal card to 
    document.querySelector('#animal-list').appendChild(card)
    //update donations
    card.querySelector('#donate').addEventListener('click', ()=>{
        animal.donation += 1000
        card.querySelector('span').textContent = animal.donation
        updateDonations(animal)
    })
    //delete card
    card.querySelector('#delete').addEventListener('click', ()=>{
        card.innerHTML = ''
        deleteCard(animal)
    })

}

//fetch APIs
function getAllAnimals(){
    fetch('http://localhost:3000/animalData')
    .then(res=>res.json())
    .then(animalData =>animalData.forEach(animal => renderOneAnimal(animal)))
}
function adoptOneAnimal(animalObj){
    fetch('http://localhost:3000/animalData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    }).then(res=>res.json())
    .then(animal=>console.log(animal))
}
//update donations
function updateDonations(animalObj){
    fetch(`http://localhost:3000/animalData/${animalObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    }).then(res=>res.json())
    .then(animal=>console.log(animal))
}
//set the animal free
function deleteCard(animalObj){
    fetch(`http://localhost:3000/animalData/${animalObj.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    }).then(res=>res.json())
    .then(animal=>console.log(animal))
}

//initial render
//get data and load or render our animals to the Dom

function initialize(){
    getAllAnimals()
}
initialize()
