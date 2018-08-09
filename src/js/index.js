const w3_open=()=> {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
}
const w3_close=()=> {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
}

const name =document.getElementById("name");
const image =document.getElementById("image");
const direction =document.getElementById("direction");
const select =document.getElementById("Ubication");
const selectFilterUbication =document.getElementById("Filter-Ubication");
const btnRegister =document.getElementById("Registrar-Restaurante");
const galeryRestaurant =document.getElementById("galery-retaurant");
const mapa =document.getElementById("maps");


//evento de registro de datos del restaurante
btnRegister.addEventListener('click',()=>{
    register(name.value,image.value,direction.value,select.value)
})
//evento que muestra unicamente los restaurantes por distrito
selectFilterUbication.addEventListener("click",()=>{
    galeryRestaurant.innerHTML="";
    console.log(selectFilterUbication.value);
    seeEspecifidData(selectFilterUbication.value) 
})

window.onload=()=>{
    seeAllData(); 
    initMap();
} 
