module.exports = function (req,res,next){
    if(req.session.flash){
        res.locals.flash = req.session.flash;
        req.session.flash = undefined;
    }
    res.flash = function(type, contenu){
       
      
        if( req.session.flash == undefined){
            req.session.flash = [];
           
        }
        req.session.flash = [type, contenu]
        res.locals.flash = req.session.flash;
        //console.log( res.locals.flash)
    }
    next()
}