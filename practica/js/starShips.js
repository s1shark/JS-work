document.addEventListener('DOMContentLoaded',()=>{
    arrow_left.style.display = 'none'
    getStarShips(1)
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
    getStarShips(1)
})
button_2.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getStarShips(2)
})
button_3.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'inline-block'
    getStarShips(3)
})
button_4.addEventListener('click',()=>{
    arrow_left.style.display = 'inline-block'
    arrow_right.style.display = 'none'
    getStarShips(4)
})

function getStarShips(page){
    let xml = new XMLHttpRequest()
    let url = `https://swapi.dev/api/starships/?page=${page}`
    xml.open('GET',url)
    xml.responseType = 'json'
    xml.send()
    xml.onload = () => {
        showAllStarShips(xml.response.results)
    }
}

function showAllStarShips(data){
    let content = document.querySelector('.content')
    content.innerHTML = ''
    data.forEach(element => {
        let str = `<div class="card mb-3">
       <h3 class="card-header">${element.name}</h3>  
       <img id="error_img" src="https://starwars-visualguide.com/assets/img/starships/${element.url.match(/\/([0-9]*)\/$/)[1]}.jpg" class="d-block user-select-none"></svg>
       </div>` 
       content.insertAdjacentHTML('beforeend',str)
    });
    showStarShips(data)
}

function showStarShips(data){
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
    const{name,model,manufacturer,cost_in_credits,length,max_atmosphering_speed} = data
    title.textContent = name
    li[0].textContent = model
    li[1].textContent = manufacturer
    li[2].textContent = cost_in_credits
    li[3].textContent = length
    li[4].textContent = max_atmosphering_speed
    img.src = url
}


function ErrorImg(str,fallbackImageUrl){
    str.addEventListener('error',()=>{
        str.url = fallbackImageUrl
    });
}

 
const fallbackUrl = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
ErrorImg(fallbackUrl)