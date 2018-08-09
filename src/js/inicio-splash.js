const onload = 
    //La propiedad window.location.href devuelve la URL de la página actual.
setTimeout(() => {window.location.href = "restaurant.html";} ,2000)
                  //(lo que va a hacer)^................. ^(despues de que tiempo)
//El método setTimeout () llama a una función o evalúa una expresión después de un número específico de milisegundos.
window.onload = onload;