
var key = 'ef894f97';
var btnSearch= document.querySelector('#search')


var userInputTitle= document.querySelector('#title')
var userInputDate= document.querySelector('#date')
var userSelectType= document.querySelector('#type')
var message =document.querySelector('#message')
 var select;
 var type;
 var id;
 
var cardWrapper = document.querySelector('#card-wrapper')
userSelectType.addEventListener('change', function(){
   
     select = true;
      type = this.value
     console.log(userSelectType.children)
     console.log(select)
})

btnSearch.addEventListener('click', function(){
    let urlSearch;
    
    cardWrapper.innerHTML='';
  let title = userInputTitle.value
  var  year = userInputDate.value;
if(userInputDate.value.length > 0 && !select){
    console.log('ca marches')
   
urlSearch = `http://www.omdbapi.com/?s=${title}&y=${year}&type=movie&apikey=${key}`;
}else if(select && userInputDate.value.length === 0){
    console.log(type)
    urlSearch = `http://www.omdbapi.com/?s=${title}&type=${type}&apikey=${key}`;
}else if(select &&userInputDate.value.length > 0){
    console.log(year)
    urlSearch = `http://www.omdbapi.com/?s=${title}&y=${year}&type=${type}&apikey=${key}`;
}else{
    urlSearch = `http://www.omdbapi.com/?s=${title}&type=movie&apikey=${key}`;
}



   callMovie(urlSearch)
   
   
   
  
})

function callMovie(url){
    var xhr = new XMLHttpRequest();
    


xhr.onreadystatechange = ()=>{

if(xhr.readyState === 4){

  var response = JSON.parse(xhr.responseText)
  var movies = response.Search
  
  console.log(movies)
     movies.forEach(movie => {
         
let card = `<div id='${movie.imdbID}' class="card cards " style="width: 18rem;">
<img src="${movie.Poster}" class="card-img-top" alt="...">
<div class="card-body">
  <h5 class="card-title">${movie.Title}</h5>
  <p class="card-text">Année de sortie ${movie.Year}</p>
  
</div>
</div>`

cardWrapper.innerHTML += card;
clickOnCard()

     });
}


}

xhr.open('GET', url)
xhr.send()

}
 
function clickOnCard(){
    
    var cards = document.querySelectorAll('.cards')
 
cards.forEach( card => {
    card.addEventListener('click', function(e){
         
     id = card.id;
     
        callTitleRequest(id)
       
    })
    
})


}

var cardSelected= document.querySelector('#card-selected');

function callTitleRequest(i){
    cardSelected.innerHTML='';
    let xhr2 = new XMLHttpRequest()
    
var urlTitle = `http://www.omdbapi.com/?i=${i}&apikey=${key}&`

    xhr2.onreadystatechange = ()=>{
if(xhr2.readyState === 4){
      var response2 =  JSON.parse(xhr2.responseText)
      var title = response2.Title;
      var director=response2.Director;
      var year = response2.Year;
 let newCard =`
 <div class='row'>
 <div class="col-md-4">
 <img src="${response2.Poster}" class="card-img-top" alt="..." style='width:150px; height:auto;'>
 </div>
 <div class="col-md-8">
 <div class="card-body">
 <h5 class="card-title">${title}</h5>
 <p>Realisateur :${director} </p>
 <p>Acteur : ${response2.Actors} </p>
 <p class="card-text">${response2.Plot}</p>
 <button type="button" id='add'class=" btn btn-dark">Ajouter</button>
</div>
 </div>
           
            </div>
 
 `;
 cardSelected.innerHTML=newCard;
 addClick(title,year,director)
    console.log(xhr2.responseText)
}
    }

    xhr2.open('GET', urlTitle)
    xhr2.send()
}

var films = []
var tBody = document.querySelector('#tbody')

function makeTab(){
    tBody.innerHTML='';  
    console.log(films)
    films.forEach( film =>{
       
        let ligneOfTab = ` <tr>
        <td>${film.name}</td>
        <td>${film.year}</td>
        <td>${film.author}</td>
        <td><button type="button" class="btn-close btn-close-white" aria-label="Close"></button></td>
        </tr>`
          tBody.innerHTML+= ligneOfTab; 
        })
}







  function addClick(t,y,d){
    var btnsAdd = document.querySelector('#add')
    btnsAdd.addEventListener('click',function(){
        console.log('ca marche')
          let newFilm = {name:t,year:y,author:d}    
       
films.push(newFilm)

makeTab()
    }) 
  }
