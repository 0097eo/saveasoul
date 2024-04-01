//DOM manipulation
function renderOneAnimal(animal){
    // build animal
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
    <img src="${animal.imageUrl} alt="img">
    <div class="content">
    <h4>${animal.name}</h4>
    <p>
    $<span class="donation-count">${animal.donation}</span> Donated
    </p>
    <p>${animal.description}</p>
    </div>`
   //add animal card to 
    document.querySelector('#animal-list').appendChild(card)
}
//initial render
//get data and load or render our animals to the Dom

function initialize(){
    animalData.forEach(animal => renderOneAnimal(animal))
}
initialize()
