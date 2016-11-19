
var validateGroupOne = function(req,res,next){
    if (req.user.admin) return res.sendStatus(401);
    next();
}

module.exports = {
    validateGroupOne: validateGroupOne
}