const translate = require('@vitalets/google-translate-api');


function detectLanguage(req,res,next){

    let content = req.body.text
    content = content.slice(content.length-200)
    console.log(content)
    translate(content, {to: 'id'}).then(res => {
    let languageFrom = res.from.language.iso
    

    if (content){
        req.body.language = languageFrom
        next()
    }
    else{
        next()
    }
    
}).catch(err=>{
    next({status:400,message:"failed to translate"})
});

}
// console.log(translateToIna())
module.exports = detectLanguage
