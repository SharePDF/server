function urlToFileName(url){

    let array = url.split('/')
    return array[array.length-1]
}

module.exports = urlToFileName
