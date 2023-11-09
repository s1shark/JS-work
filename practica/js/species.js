document.addEventListener('DOMContentLoaded',()=>{
    arrow_left.style.display = 'none'
    getSpecies(1)
})

let arrow_left = document.querySelector('#arrow_left')
let button_1 = document.getElementById("one")
let button_2 = document.getElementById("two")
let button_3 = document.getElementById("three") 
let button_4 = document.getElementById("four")  
let arrow_right = document.querySelector('#arrow_right')

button_1.addEventListener('click',()=>{
    arrow_left.style.display = 'none'
    arrow_right.style.display = 'inline-block'
    getSpecies(1)
})
button_2.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getSpecies(2)
})
button_3.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getSpecies(3)
})
button_4.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'none'
    getSpecies(4)
})

function getSpecies(page){
    let xml = new XMLHttpRequest()
    let url = `https://swapi.dev/api/species/?page=${page}`
    xml.open('GET',url)
    xml.responseType = 'json'
    xml.send()
    xml.onload = () => {
        showAllSpecies(xml.response.results)
    }
}

function showAllSpecies(data){
    let content = document.querySelector('.content')
    content.innerHTML = ''
    data.forEach(element => {
        let str = `<div class="card mb-3">
       <h3 class="card-header">${element.name}</h3>  
       <img src="https://starwars-visualguide.com/assets/img/species/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg" class="d-block user-select-none"></svg>
       </div>` 
        content.insertAdjacentHTML('beforeend',str)
    });
    showSpecies(data)
}

function showSpecies(data){
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
    const{name,classification,designation,average_height,skin_colors,hair_colors} = data
    title.textContent = name
    li[0].textContent = classification
    li[1].textContent = designation
    li[2].textContent = average_height
    li[3].textContent = skin_colors
    li[4].textContent = hair_colors
    img.src = url
}


