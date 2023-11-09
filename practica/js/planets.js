document.addEventListener('DOMContentLoaded',()=>{
    arrow_left.style.display = 'none'
    button_6.style.display = 'none'
    getPlanets(1)
})

let arrow_left = document.querySelector('#arrow_left')
let button_1 = document.getElementById("one")
let button_2 = document.getElementById("two")
let button_3 = document.getElementById("three") 
let button_4 = document.getElementById("four")  
let button_5 = document.getElementById("five") 
let button_6 = document.getElementById("six")
let arrow_right = document.querySelector('#arrow_right')

button_1.addEventListener('click',()=>{
    arrow_left.style.display = 'none'
    arrow_right.style.display = 'inline-block'
    getPlanets(1)
})
button_2.addEventListener('click',()=>{
    button_1.style.display = 'inline-block'
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPlanets(2)
})
button_3.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPlanets(3)
})
button_4.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    button_1.style.display = 'none'
    button_6.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPlanets(4)
})
button_5.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    button_1.style.display = 'none'
    button_6.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getPlanets(5)
})
button_6.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    button_1.style.display = 'none'
    button_6.style.display = 'inline-block'
    arrow_right.style.display = 'none'
    getPlanets(6)
})

function getPlanets(page){
    let xml = new XMLHttpRequest()
    let url = `https://swapi.dev/api/planets/?page=${page}`
    xml.open('GET',url)
    xml.responseType = 'json'
    xml.send()
    xml.onload = () => {
        showAllPlanets(xml.response.results)
    }
}

function showAllPlanets(data){
    let content = document.querySelector('.content')
    content.innerHTML = ''
    data.forEach(element => {
        let str = `<div class="card mb-3">
       <h3 class="card-header">${element.name}</h3>  
       <img src="https://starwars-visualguide.com/assets/img/planets/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg" class="d-block user-select-none"></svg>
       </div>` 
        content.insertAdjacentHTML('beforeend',str)
    });
    showPlanets(data)
}

function showPlanets(data){
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
    const{name,rotation_period,orbital_period,diameter,climate,gravity} = data
    title.textContent = name
    li[0].textContent = rotation_period
    li[1].textContent = orbital_period
    li[2].textContent = diameter
    li[3].textContent = climate
    li[4].textContent = gravity
    img.src = url
}