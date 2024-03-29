const form= document.getElementById("film-form");
const titleElement=document.querySelector("#title");
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");
const cardbody=document.querySelectorAll(".card-body")[1];

const clear=document.getElementById("clear-films")

//UI Objesini başlagma

const ui=new UI();

//storage objesi üret
const storage=new Storage();
//tüm eventleri yükleme 

addEventListeners();

function addEventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    })
    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){
    const title=titleElement.value;
    const director=directorElement.value;
    const url=urlElement.value;

    if(title=== "" || director=== "" || url=== ""){
        //hata
        ui.displayMessages("Tüm Alanları Doldurunuz...","danger")

    }
    else{
        //yeni film
        const newFilm=new Film(title,director,url);
        ui.addFilmToUI(newFilm);//arayüzefilm ekleme
        storage.addFilmToStorage(newFilm);

        ui.displayMessages("Film Başarıyla Eklendi...","success");




    }


    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}
function deleteFilm(e){
     if(e.target.id === "delete-film"){
         ui.deleteFilmFromUI(e.target);
         storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);


        ui.displayMessages("Silme İşlemİ Başarılı...","success");

     }
}

function clearAllFilms(){
    if(confirm("Emin Misiniz ?")){
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
    ui.displayMessages("Tüm Filmleri Sildiniz...","danger");
    
    }
}