const users = document.querySelector('.users');
const userInput = document.querySelector('.user-input input');
let cache = [];

async function getUser(){
    let usersDetails = await fetch('https://randomuser.me/api?results=100');
    let response = await usersDetails.json();
    users.innerHTML = '';
    for(let i=0; i<(response.results?response.results.length:0); i++){
        let user1 = document.createElement('li');
        let divPhoto = document.createElement('div');
        divPhoto.classList.add('photo');
        let image = document.createElement('img');
        image.src = response.results[i].picture.thumbnail;
        divPhoto.append(image)

        let divDetails = document.createElement('div')
        divDetails.classList.add('details')
        let divName = document.createElement('div')
        divName.classList.add('name')
        divName.innerText = `${response.results[i].name.first} ${response.results[i].name.last}`
        let divLocation = document.createElement('div')
        divLocation.classList.add('location')
        divLocation.innerText = `${response.results[i].location.city}, ${response.results[i].location.country}`
        divDetails.append(divName);
        divDetails.append(divLocation);

        user1.append(divPhoto);
        user1.append(divDetails)

        let line = document.createElement('hr')
        let space = document.createElement('br')
        users.append(user1);
        users.append(space)
        users.append(line)
        
    }

}
getUser()

function filter(event){
    let inputVal = userInput.value + event;
    let result = document.querySelectorAll(".users li");
    result.forEach(li => {
        if(!li.querySelector('.name').innerText.toLowerCase().includes(inputVal.toLowerCase()) && 
            !li.querySelector('.location').innerText.toLowerCase().includes(inputVal.toLowerCase())
        ){
            cache.push(li)
            cache.push(li.nextElementSibling)
            cache.push(li.nextElementSibling.nextElementSibling)
            if(li.nextElementSibling) li.nextElementSibling.remove();
            if(li.nextElementSibling) li.nextElementSibling.remove();
            li.remove()
        } 
    })
}
function filterRevert(event) {
    if(event == 'Backspace'){
        if(userInput.value.length < 2 ){
            cache.forEach(a =>{
                users.append(a)
            })
        }else{
            cache.forEach((user, index) => {
                if(user.innerText.toLowerCase().includes(userInput.value.toLowerCase())){
                    users.append(user)
                    users.append(cache[index+1])
                    users.append(cache[index+2])
                }
            })
        }
    }
}
userInput.addEventListener('keypress', event => filter(event.key));
userInput.addEventListener('keydown', event => filterRevert(event.key));
