exports.msgMiddleware = (req, res, next) =>{
    res.locals.success = req.flash('success')
    res.locals.errors = req.flash('errors')
    res.locals.user = req.session.user;
    next()
}

exports.loginRequire = (req, res, next) =>{
    if(!req.session.user){
        return res.send('vai pra onde negao')
    }
    next()
}