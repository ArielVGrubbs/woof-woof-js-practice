document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/pups')
    .then(resource => resource.json())
    .then((data) => {
        goodDogFilterButton(data)
        data.forEach(myFunc)
        function myFunc(value){
          addDogToDogBar(value)
        }
      })
});

function goodDogFilterButton(dogs){
    const goodDogFilterBtn = document.querySelector('#good-dog-filter')
    goodDogFilterBtn.innerText = "Filter good dogs: OFF"
    goodDogFilterBtn.addEventListener('click', function(event){
        if (goodDogFilterBtn.innerText == "Filter good dogs: OFF") {
            goodDogFilterBtn.innerText = "Filter good dogs: ON"
            fetch('http://localhost:3000/pups')
            .then(resource => resource.json())
            .then(function(data) {
                data = data.filter(dog => dog.isGoodDog === true)
                let dogBar = document.querySelector('#dog-bar')
                removeAllChildNodes(dogBar)
                data.forEach(myFunc)
                function myFunc(value){
                    addDogToDogBar(value)
                }
                // debugger
                return data
            })
        } else {
            goodDogFilterBtn.innerText = "Filter good dogs: OFF"
            fetch('http://localhost:3000/pups')
            .then(resource => resource.json())
            .then(function(data) {
                // data = data.filter(dog => dog.isGoodDog === true)
                let dogBar = document.querySelector('#dog-bar')
                removeAllChildNodes(dogBar)
                data.forEach(myFunc)
                function myFunc(value){
                    addDogToDogBar(value)
                }
                // debugger
                return data
            })
        }
        return dogs
    })
}

function addDogToDogBar(dog) {
    const spanStyler = document.createElement('span')
    const dogNameItem = document.createElement('p')
    dogNameItem.innerText = dog.name
    // dogNameItem.dataset.dogId = dog.id
    const dogList = document.querySelector('#dog-bar')
    spanStyler.appendChild(dogNameItem)
    dogList.appendChild(spanStyler)

    dogNameItem.addEventListener('click', function(event) {
        showDogInfo(dog)
    })
    // debugger
}

function showDogInfo(dog) {
    const dogInfoPanel = document.querySelector('#dog-info')
    removeAllChildNodes(dogInfoPanel)

    const dogPic = document.createElement('img')
    dogPic.src = dog.image
    
    const dogName = document.createElement('h3')
    dogName.innerText = dog.name

    const goodDogButton = document.createElement('button')
    goodDogButtonToggler()
    function goodDogButtonToggler(){
        if (dog.isGoodDog === true){
            goodDogButton.innerText = "Good Dog!"
        } else {
            goodDogButton.innerText = "Bad Dog"
        }
    }

    goodDogButton.addEventListener('click', function(event){
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "isGoodDog": !dog.isGoodDog
            })
        })
        dog.isGoodDog = !dog.isGoodDog
        goodDogButtonToggler()
    })

    dogInfoPanel.appendChild(dogPic)
    dogInfoPanel.appendChild(dogName)
    dogInfoPanel.appendChild(goodDogButton)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
