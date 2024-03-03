const Restaurant = require('../models/Restaurant');

//@desc Get all Restaurants
//@route GET /api/v1/Restaurants 
//@access Public
exports.getRestaurants = async(req,res,next) =>{
    let query;

    //Copy req.query
    const reqQuery= {...req.query};
    //Fields to exclude
    const removeFields=['select','sort','page','limit'];
    //Loop over remove fields and delete them from reqQuery 
    removeFields.forEach (param=>delete reqQuery[param]);
    console.log(reqQuery); 
    //create query string
    let queryStr = JSON.stringify(req.query);
    //create operators ($gt,$gte,etc)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    //finding resource
    query = Restaurant.find(JSON.parse(queryStr)).populate('reservations');

    //Select Fields 
    if (req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query=query.select(fields);
    }
    //Sort
    if (req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ');
        query=query.sort(sortBy);
    }else{
        query=query.sort('name');
    }

    //Pagination
    const page = parseInt(req.query.page,10)|| 1; 
    const limit = parseInt(req.query.limit,10)||25;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    const total = await Restaurant.countDocuments();
    query = query.skip(startIndex).limit(limit);

    try{
        // Executing query
       const restaurant = await query;
        //Pagination result
        const pagination = {};

        if(endIndex<total){
            pagination.next = {page:page+1, limit}
        }
        if(startIndex>0){
            pagination.prev={page:page-1,limit}
        }

        res.status(200).json({success:true, count:restaurant.length, pagination, data:restaurant});
    } catch(err){
        console.log(err);
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
        console.log(err);
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

