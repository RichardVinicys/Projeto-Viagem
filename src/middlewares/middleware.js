exports.msgMiddleware = (req, res, next) =>{
    res.locals.success = req.flash('success')
    res.locals.errors = req.flash('errors')
    res.locals.user = req.session.user;
    next()
}

exports.loginRequire = (req, res, next) =>{
    if(!req.session.user){
        return res.render('logado')
    }
    next()
}

exports.checkCsrfError = (err, req, res ,next) =>{
    if(err) {
        return res.render('404')
    }
    next();
}

exports.csrfMiddleware = (req, res, next) =>{
    res.locals.csrfToken = req.csrfToken();
    next();
}