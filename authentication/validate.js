
//Validate based on name from payload
var validateDemo = function(req,res,next){

    if (req.user.name != "DEMO") return res.sendStatus(401);
    next();
}

var validateGroupOne = function(req,res,next){

    if (req.user.name != "GROUP_1") return res.sendStatus(401);
    next();
}

var validateGroupTwo = function(req,res,next){

    if (req.user.name != "GROUP_2") return res.sendStatus(401);
    next();
}

var validateGroupThree = function(req,res,next){

    if (req.user.name != "GROUP_3") return res.sendStatus(401);
    next();
}

module.exports = {
    validateDemo: validateDemo,
    validateGroupOne: validateGroupOne,
    validateGroupTwo: validateGroupTwo,
    validateGroupThree: validateGroupThree
}