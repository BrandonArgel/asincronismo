// Primero instalamos la dependencia de XMLHttpRequest con el comando $npm install xmlhttprequest --save

// Instanciamos la dependencia de XMLHttpRequest para poder utilizarla después
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const API = 'https://rickandmortyapi.com/api/character/'

// Creamos la función que que hará la petición y le pasamos como parámetros la URL y el callback
function fetchData(url_api, callback){

    // Referenciamos el objeto para poder llamarlo más fácil
    let xhttp = new XMLHttpRequest();

    // Le pasamos un llamado "Open" a nuestra referencia en donde le pasaremos por parámetro:
    // 1.- El método, en este caso como haremos una petición utilizaremos GET https://developer.mozilla.org/es/docs/Web/HTTP/Methods
    // 2.- La URL a donde pediremos los datos
    // 3.- Le decimos que esta llamada será asíncrona
    xhttp.open('GET', url_api, true);

    // Cuando ocurra un cambio se ejecutará la siguiente función
    xhttp.onreadystatechange = function (event){

        // Existen 5 estados de una solicitud (request):
        // 0.- Solicitud no inicializada.
        // 1.- Se establece la conexión con el servidor.
        // 2.- Solicitud recibida.
        // 3.- Procesando la solicitud.
        // 4.- Solicitud terminada y respuesta lista
        // Entonces comprobamos si la solicitud se realizó correctamente
        if(xhttp.readyState === 4){

            // Si la solicitud se realizó correctamente comprobamos que el servidor nos regresó un OK y que todo salió bien también de su lado.
            // https://developer.mozilla.org/es/docs/Web/HTTP/Status
            if(xhttp.status === 200){

                // Regresamos nuestro callback con dos parámetros:
                // 1.- Error
                // 2.- Resultado
                // Y transformamos el string a formato JSON
                callback(null, JSON.parse(xhttp.responseText));

                // Sino creamos lo que pasa cuando ocurre un error
            } else{
                const error = new Error('Error ' + url_api);
                return callback(error, null)
            }
        }
    }

    // Envio de la solicitud
    xhttp.send();
}

fetchData(API, function(error1, data1){
    if(error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function(error2, data2){
        if(error2) return console.error(error2)
        fetchData(data2.origin.url, function(error3, data3){
            if(error3) return console.error(error3)
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension)
        })
    })
})