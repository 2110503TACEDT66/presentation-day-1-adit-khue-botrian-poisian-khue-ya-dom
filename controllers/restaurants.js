//@desc Get all Restaurants
//@route GET /api/v1/Restaurants 
//@access Public
exports.getRestaurants = (req,res,next) =>{
    res.status(200).json({success:true, msg:'Show all Restaurants'});
};

//@desc Get single Restaurant
//@route GET /api/v1/Restaurants/:id
//@access Public
exports.getRestaurant = (req,res,next) => {
    res.status(200).json({success:true, msg:`Show all Restaurants ${req.params.id}`});
};

//@desc Create new Restaurant
//@route POST /api/v1/Restaurants 
//@access Private
exports.createRestaurant = (req,res,next) => {
    res.status(200).json({success:true, msg:'Create new Restaurants'});
};

//@desc Update Restaurant
//@route PUT /api/v1/Restaurants/:id
//@access Private
exports.updateRestaurant = (req,res,next) => {
    res.status(200).json({success:true, msg:`Update Restaurant ${req.params.id}`});
};

//@desc Delete Restaurant
//@route DELETE /api/v1/Restaurants/:id 
//@access Private
exports.deleteRestaurant = (req,res,next) => {
    res.status(200).json({success:true, msg:`Delete Restaurant ${req.params.id}`});
};

