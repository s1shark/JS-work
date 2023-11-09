document.addEventListener('DOMContentLoaded',()=>{
    arrow_left.style.display = 'none'
    button_6.style.display = 'none'
    button_7.style.display = 'none'
    button_8.style.display = 'none'
    button_9.style.display = 'none'
    getPersons(1)
})

let arrow_left = document.querySelector('#arrow_left')
let button_1 = document.getElementById("one")
let button_2 = document.getElementById("two")
let button_3 = document.getElementById("three") 
let button_4 = document.getElementById("four")  
let button_5 = document.getElementById("five") 
let button_6 = document.getElementById("six")
let button_7 = document.getElementById("seven")
let button_8 = document.getElementById("eight")
let button_9 = document.getElementById("nine")
let arrow_right = document.querySelector('#arrow_right')

button_1.addEventListener('click',()=>{
    arrow_left.style.display = 'none'
    arrow_right.style.display = 'inline-block'
    getPersons(1)
})
button_2.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPersons(2)
})
button_3.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPersons(3)
})
button_4.addEventListener('click',()=>{
    button_1.style.display = 'none'
    button_6.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPersons(4)
})
button_5.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    button_1.style.display = 'none'
    button_2.style.display = 'none'
    button_6.style.display = 'inline-block'
    button_7.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPersons(5)
})
button_6.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    button_1.style.display = 'none'
    button_2.style.display = 'none'
    button_3.style.display = 'none'
    button_6.style.display = 'inline-block'
    button_7.style.display = 'inline-block'
    button_8.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPersons(6)
})
button_7.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    button_1.style.display = 'none'
    button_2.style.display = 'none'
    button_3.style.display = 'none'
    button_4.style.display = 'none'
    button_6.style.display = 'inline-block'
    button_7.style.display = 'inline-block'
    button_8.style.display = 'inline-block'
    button_9.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPersons(7)
})
button_8.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    button_1.style.display = 'none'
    button_2.style.display = 'none'
    button_3.style.display = 'none'
    button_4.style.display = 'none'
    button_6.style.display = 'inline-block'
    button_7.style.display = 'inline-block'
    button_8.style.display = 'inline-block'
    button_9.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPersons(8)
})
button_9.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'none'
    button_1.style.display = 'none'
    button_2.style.display = 'none'
    button_3.style.display = 'none'
    button_4.style.display = 'none'
    button_6.style.display = 'inline-block'
    button_7.style.display = 'inline-block'
    button_8.style.display = 'inline-block'
    button_9.style.display = 'inline-block'
    getPersons(9)
})

function getPersons(page){
    let xml = new XMLHttpRequest()
    let url = `https://swapi.dev/api/people/?page=${page}`
    xml.open('GET',url)
    xml.responseType = 'json'
    xml.send()
    xml.onload = () => {
        showAllPerson(xml.response.results)
    }
}

function showAllPerson(data){
    let content = document.querySelector('.content')
    content.innerHTML = ''
    data.forEach(element => {
        let str = `<div class="card mb-3">
       <h3 class="card-header">${element.name}</h3>  
       <img src="https://starwars-visualguide.com/assets/img/characters/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg" class="d-block user-select-none"></svg>
       </div>` 
        content.insertAdjacentHTML('beforeend',str)
    });
    showPerson(data)
}

function showPerson(data){
    let blocks = document.querySelectorAll('.content div.card')
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].addEventListener('click',()=>{
            showDetails(data[i],blocks[i].children[1].src)
            document.querySelector('.details').classList.add('show')
        });
    }
    document.querySelector('.border-info').addEventListener('click',()=>{
        document.querySelector('.details').classList.remove('show')
    })
}
function showDetails(data, url){
    let img = document.querySelector('.details .card-header img')
    let li = document.querySelectorAll('.details .info')
    let title = document.querySelector('.details .card-title')
    const{name,birth_year,eye_color,hair_color,height,mass} = data
    title.textContent = name
    li[0].textContent = birth_year
    li[1].textContent = eye_color
    li[2].textContent = hair_color
    li[3].textContent = height
    li[4].textContent = mass
    img.src = url
}
