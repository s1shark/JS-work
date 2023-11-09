document.addEventListener('DOMContentLoaded',()=>{
    getFilms(1)
})

function getFilms(page){
    let xml = new XMLHttpRequest()
    let url = `https://swapi.dev/api/films/?page=${page}`
    xml.open('GET',url)
    xml.responseType = 'json'
    xml.send()
    xml.onload = () => {
        showAllFilms(xml.response.results)
    }
}

function showAllFilms(data){
    let content = document.querySelector('.content')
    content.innerHTML = ''
    data.forEach(element => {
        let str = `<div class="card mb-3">
       <h3 class="card-header">${element.title}</h3>  
       <img src="https://starwars-visualguide.com/assets/img/films/${element.url.match(/\/([0-6]*)\/$/)[1]}.jpg" class="d-block user-select-none"></svg>
       </div>` 
       content.insertAdjacentHTML('beforeend',str)
    });
    showFilms(data)
}

function showFilms(data){
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
    let name = document.querySelector('.details .card-title')
    const{title,episode_id,director,producer,release_date} = data
    name.textContent = title
    li[0].textContent = episode_id
    li[1].textContent = director
    li[2].textContent = producer
    li[3].textContent = release_date
    img.src = url
}