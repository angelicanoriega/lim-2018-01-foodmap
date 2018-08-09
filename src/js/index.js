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
let galeryRestaurant =document.getElementById("galery-retaurant");
const on =document.getElementById("onload");


const register=(nameRestaurant,imagenUrl,direccionRestaurante,distritoElegido)=>{
    const data={
        nombre:nameRestaurant,
        url:imagenUrl,
        direccion:direccionRestaurante,
        distrito:distritoElegido
    }
    console.log(data);
    
firebase.database().ref(`${distritoElegido}/${nameRestaurant}`).set(data);
firebase.database().ref(`all-restaurant/${nameRestaurant}`).set(data);
}

btnRegister.addEventListener('click',()=>{
    register(name.value,image.value,direction.value,select.value)
})
const onClick=(element,direction)=>{
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    const modalNameText = document.getElementById("modal-name");
    modalNameText.innerHTML = element.alt;    

}
const paintData=(direccion,name,url,directionHtml)=>{

    const img = document.createElement('img');
    img.setAttribute('src',url);
    img.setAttribute('style','width:100%');
    img.setAttribute('class','img');
    img.setAttribute('alt',name+" <br>  dirección: "+direccion);
    img.setAttribute('onclick',"onClick(this)");
    directionHtml.appendChild(img);
    
}
const seeAllData=()=>{
   const ref= firebase.database().ref("all-restaurant");
    ref.on("child_added", snap => {
        const direction=snap.val().direccion;
        const name=snap.val().nombre;
        const imgUrl=snap.val().url;
        console.log(snap.val());
        paintData(direction,name,imgUrl,galeryRestaurant);
    })
    
}
const seeEspecifidData=(distrito)=>{
    const ref= firebase.database().ref(distrito);
    ref.on("child_added", snap => {
        const direction=snap.val().direccion;
        const name=snap.val().nombre;
        const imgUrl=snap.val().url;
        console.log(snap.val());
        paintData(direction,name,imgUrl,galeryRestaurant);
    })

}
selectFilterUbication.addEventListener("click",()=>{
    galeryRestaurant.innerHTML="";
    console.log(selectFilterUbication.value);
    seeEspecifidData(selectFilterUbication.value)
    
})


window.onload=()=>{
    seeAllData(); 

} 
