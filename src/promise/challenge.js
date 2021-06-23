// const fetchData = require('../utils/fetchData')
// const API = 'https://rickandmortyapi.com/api/character/'

// fetchData(API)
//     .then(data => {
//         console.log(data.info.count)
//         return fetchData(`${API}${data.results[0].id}`)
//     })
//     .then(data => {
//         console.log(data.name)
//         return fetchData(data.origin.url)
//     })
//     .then(data => {
//          console.log(data.dimension)
//     })
//     .catch(error => console.error(error))

const https = require("https");
const API_BASE = 'https://rickandmortyapi.com/api/';

const APIRequest = (url) => {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            res.setEncoding('utf8');
            if(res.statusCode === 200) {
                let body = '';
                res.on('data', (data) => {
                    body += data;
                });
                res.on('end', () => { 
                    resolve(JSON.parse(body));
                });
            } else reject(new Error(`REQUEST ERROR ON ${url}. Status ${res.statusCode}`));
        });
    });
}

APIRequest(API_BASE + 'character/')
    .then((response) => {
        console.log(response.info.count)
        return APIRequest(API_BASE + 'character/' + response.results[0].id);
    })
    .then((response) => {
        console.log(response.name)
        return APIRequest(response.origin.url);
    })
    .then((response) => {
        console.log(response.dimension)
    })
    .catch((error) => console.error(error));