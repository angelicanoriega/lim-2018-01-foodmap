//registro de restaurantes
const register=(nameRestaurant,imagenUrl,direccionRestaurante,distritoElegido)=>{
    const data={
        nombre:nameRestaurant,
        url:imagenUrl,
        direccion:direccionRestaurante,
        distrito:distritoElegido
    }
    console.log(nameRestaurant);
    console.log(distritoElegido);
if(nameRestaurant===""){
    alert("Agrega un Nombre al restaurante")
} 
if(imagenUrl===""){
    alert("Agrega una url")
}  
 if(direccionRestaurante===""){
    alert("Agrega una Dirección al restaurante")
}    
if(nameRestaurant && distritoElegido && imagenUrl &&direccionRestaurante != ""){
firebase.database().ref(`${distritoElegido}/${nameRestaurant}`).set(data);
firebase.database().ref(`all-restaurant/${nameRestaurant}`).set(data);    
}    
    console.log(data);
}
//Funcion para la aparicion del modal
const onClick=(element,direction)=>{
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    const modalNameText = document.getElementById("modal-name");
    modalNameText.innerHTML = element.alt;    
}
//Funcion que pinta la galeria de imagenes sobre los restaurantes
const paintData=(direccion,name,url,directionHtml)=>{
    const div=document.createElement('div');
    const img = document.createElement('img');
    const p = document.createElement("p");
    p.setAttribute('class',' w3-text-black');
    const text = document.createTextNode(name);
    p.appendChild(text); 
    img.setAttribute('src',url);
    img.setAttribute('style','width:50%');
    img.setAttribute('class','img');
    img.setAttribute('alt',name+" <br>  dirección: "+direccion);
    img.setAttribute('onclick',"onClick(this)");
    div.appendChild(img); 
    div.appendChild(p);  
    directionHtml.appendChild(div);  
}
//funcion que llama todos los datos
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
 //funcion que llama todos los datos por distrito especifico
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
/*//funciones del mapa
 const finMe=(directionHtml)=>{
     console.log(directionHtml);
     
     if(navigator.geolocation){
        directionHtml.innerHTML="<p>tu navegador soporta Geolocalización</p>";
     }
     else{
        directionHtml.innerHTML="<p>tu navegador no soporta Geolocalización</p>";
     }
     //determinando la ubicaion del usuario por longitud y latitud
     const showPosition=(position)=> {
         const latitud=position.coords.latitude;
         const longitud=position.coords.longitude;
         directionHtml.innerHTML=`<p>Latitud :${latitud}<br>Longitud :${longitud}</p>`;
         
     }
     const showError=()=>{
        directionHtml.innerHTML=`<p>No se pudo obtener la ubicación</p>`
     }
     navigator.geolocation.getCurrentPosition=(showPosition,showError)=>{};

 };*/
 //variables para almacenar
 let map;
 let infowindow;
//pintando el mapa
 const initMap=()=>
 {
 // Creamos un mapa con las coordenadas actuales
   navigator.geolocation.getCurrentPosition((position)=> {

    const latitud=position.coords.latitude;
    const longitud=position.coords.longitude;

   const myUbication = new google.maps.LatLng(latitud, longitud);
   //La propiedad del center especifica dónde centrar el mapa (usando las coordenadas de latitud y longitud)
   //mapTypeId: google.maps.MapTypeId.(hybrid=>>es un tipo de mapa ejm:roadmap,satellite,hybrid,terrain)le dice de que forma quiere mostrar el mapa
   const locationInstructions = {
     center: myUbication,
     zoom: 14,
     mapTypeId: google.maps.MapTypeId.hybrid
   };
   //new google.maps.Map(direccion html donde se va a pintar el mapa, coordenadas del mapa minimo debe tener lt , ln y zoom );
   map = new google.maps.Map(mapa, locationInstructions);

   // Creamos el infowindow
   //google.maps.InfoWindow(); especifica los parámetros iniciales para mostrar la ventana de información.(que se muestra en el mapa)
   infowindow = new google.maps.InfoWindow();

   // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
   const request = {
     location: myUbication,
     radius: 5000,
     types: ['restaurant']
   };

   // Creamos el servicio PlaceService y enviamos la petición.
   const service = new google.maps.places.PlacesService(map);

   service.nearbySearch(request, (results, status)=> {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
    
       for (let i = 0; i < results.length; i++) {
         crearMarcador(results[i]);
       }
     }
   });
 });
}
// creando los marcadores
 const crearMarcador=(place)=>
 {
   // Creamos un marcador
   const markerUbication = new google.maps.Marker({
     map: map,
     position: place.geometry.location
   });

 // Asignamos el evento click del marcador
   google.maps.event.addListener(markerUbication, 'click', ()=> {
     infowindow.setContent(place.name);
     infowindow.open(map, this);
   });
   }