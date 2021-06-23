const somethingWIllHappen = () => {
    return new Promise((resolve, reject) => {
        if(true){
            resolve('Hey!')
        } else {
            reject('Whooops!')
        }
    }) 
}

somethingWIllHappen()
    .then(response => console.log(response))
    .catch(error => console.error(error))

const somethingWIllHappen2 = () => {
    return new Promise((resolve, reject) => {
        if(true){
            setTimeout(() => {
                resolve('True')
            },2000)
        } else {
            const error  = new Error('Whooops!')
            reject(error)
        }
    })
}

somethingWIllHappen2()
    .then(response => console.log(response))
    .then(() => console.log('Hola'))
    .catch(error => console.error(error))

Promise.all([somethingWIllHappen(), somethingWIllHappen2()])
    .then(response => {
        console.log('Array of results', response)
    })
    .catch(error => {
        console.error(error)
    })