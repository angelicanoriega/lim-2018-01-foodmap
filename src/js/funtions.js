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

    const img = document.createElement('img');
    img.setAttribute('src',url);
    img.setAttribute('style','width:50%');
    img.setAttribute('class','img');
    img.setAttribute('alt',name+" <br>  dirección: "+direccion);
    img.setAttribute('onclick',"onClick(this)");
    directionHtml.appendChild(img);  
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
 //funciones del mapa
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
     navigator.geolocation.getCurrentPosition(showPosition,showError);

 };
 var map;
 var infowindow;

 function initMap()
 {
 // Creamos un mapa con las coordenadas actuales
   navigator.geolocation.getCurrentPosition(function(pos) {

   lat = pos.coords.latitude;
   lon = pos.coords.longitude;

   var myLatlng = new google.maps.LatLng(lat, lon);

   var mapOptions = {
     center: myLatlng,
     zoom: 14,
     mapTypeId: google.maps.MapTypeId.SATELLITE
   };

   map = new google.maps.Map(mapa,  mapOptions);

   // Creamos el infowindow
   infowindow = new google.maps.InfoWindow();

   // Especificamos la localización, el radio y el tipo de lugares que queremos obtener
   var request = {
     location: myLatlng,
     radius: 5000,
     types: ['restaurant']
   };

   // Creamos el servicio PlaceService y enviamos la petición.
   var service = new google.maps.places.PlacesService(map);

   service.nearbySearch(request, function(results, status) {
     if (status === google.maps.places.PlacesServiceStatus.OK) {
       for (var i = 0; i < results.length; i++) {
         crearMarcador(results[i]);
       }
     }
   });
 });
}

 function crearMarcador(place)
 {
   // Creamos un marcador
   var marker = new google.maps.Marker({
     map: map,
     position: place.geometry.location
   });

 // Asignamos el evento click del marcador
   google.maps.event.addListener(marker, 'click', function() {
     infowindow.setContent(place.name);
     infowindow.open(map, this);
   });
   }