//@desc Get all Restaurants
//@route GET /api/v1/Restaurants 

const Restaurant = require("../models/restaurant");

//@access Public
exports.getRestaurants = async(req,res,next) =>{
    // res.status(200).json({success:true, msg:'Show all Restaurants'});
    try{
        const restaurants = await Restaurant.find() ;
        res.status(200).json({success:true, count:restaurants.length , data:restaurants});
    } catch(err){
        res.status(200).json({success:false}) ;
    }
};

//@desc Get single Restaurant
//@route GET /api/v1/Restaurants/:id
//@access Public
exports.getRestaurant = async(req,res,next) => {
    // res.status(200).json({success:true, msg:`Show all Restaurants ${req.params.id}`});
    try{
        const restaurant = await Restaurant.findById(req.params.id);
 
        if (!restaurant) {
            return res.status (400).json({success:false});
        }
        res.status(200).json({success:true, data:restaurant}) ;
    } catch (err){
        res.status(400).json({success:false}) ;
    } 
};

//@desc Create new Restaurant
//@route POST /api/v1/Restaurants 
//@access Private
exports.createRestaurant = async(req,res,next) => {
    // res.status(200).json({success:true, msg:'Create new Restaurants'});
    try{const restaurant = await Restaurant.create(req.body) ;
        console.log(req.body);
        res.status(201).json({
            success:true ,
            data: restaurant
        });
    } catch(err){
        console.log(err);
        res.status(400).json({success:false});
    }
};

//@desc Update Restaurant
//@route PUT /api/v1/Restaurants/:id
//@access Private
exports.updateRestaurant = async(req,res,next) => {
    // res.status(200).json({success:true, msg:`Update Restaurant ${req.params.id}`});
    try{
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true
        }) ;
        if (!restaurant) {
            return res.status(400).json({success:false});
        }
        res.status(200).json({success:true, data:restaurant});
    }catch(err){
        res.status(400).json({success:false}) ;
    }
};

//@desc Delete Restaurant
//@route DELETE /api/v1/Restaurants/:id 
//@access Private
exports.deleteRestaurant = async(req,res,next) => {
    // res.status(200).json({success:true, msg:`Delete Restaurant ${req.params.id}`});
    try{
        const restaurant = await Restaurant.findById(req.params.id) ;

        if (!restaurant) {
            return res.status(400).json({success:false, message: `Bootcamp not found with id of ${req.params.id}`});
        }
        await restaurant.deleteOne();
        res.status(200).json({success:true, data:{}});
    }catch(err){
        res.status(400).json({success:false}) ;
    }
};

