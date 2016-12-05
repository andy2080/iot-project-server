
//Validate based on name from payload
var validateDemo = function(req,res,next){

    if (req.user.name != "DEMO") return res.status(401).json({status: 'No authorization'});
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

var validateGroupNine = function(req,res,next){

    if (req.user.name != "GROUP_9") return res.sendStatus(401);
    next();
}

var validateGroupFourteen = function(req,res,next){

    if (req.user.name != "GROUP_14") return res.sendStatus(401);
    next();
}

var validateGroupEighteen = function(req,res,next){

    if (req.user.name != "GROUP_18") return res.sendStatus(401);
    next();
}

module.exports = {
    validateDemo: validateDemo,
    validateGroupOne: validateGroupOne,
    validateGroupTwo: validateGroupTwo,
    validateGroupThree: validateGroupThree,
    validateGroupNine: validateGroupNine,
    validateGroupFourteen: validateGroupFourteen,
    validateGroupEighteen: validateGroupEighteen
}