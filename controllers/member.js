const Restaurant = require('../models/Restaurant');
const Member = require('../models/Member');


exports.getMembers=async (req, res,next)=>{
let query;
//General users can see only their members! 
try {
if(req.user.role !== 'admin'){
query=Member.find({user:req.user.id}).populate({
    path:'restaurant',
    select:'name open_time close_time address tel'
})
}else{ //If you are an admin, you can see all!
if (req.params.restaurantId) {
console.log(req.params.restaurantId);
query = Member.find({ restaurant:req.params.restaurantId }).populate({
    path:"restaurant",
    select: "name open_time close_time address tel",
})
} else 
    query = Member.find().populate({
        path:'restaurant',
        select:'name open_time close_time address tel'
    })
}

const members= await query;

res.status(200).json({
    success:true,
count: members.length,
 data: members
});

} catch (error) {
console.log(error);
return res.status(500).json({success: false, message:
"Cannot find Member"});
}
}

//@desc Get one members 
//@route GET /api/v1/members/::id
//@access Public
exports.getMember=async (req,res,next)=>{
try{
    const member = await Member.findById(req.params.id).populate({
        path:'restaurant',
        select:'name open_time close_time address tel'
    });
    // console.log(member.user);
    // console.log(req.user.id);
    if(member.user !== req.user.id && req.user.role !== 'admin'){
        return res.status(403).json({success : false ,message : `User id ${req.user.id} is not authorized to access this member`});
    }
    if (!member) {
        return res.status(404).json({success:false,message:`No membership with the id of ${req.params.id}`});
    }

    res.status(200).json({success:true,data:member});

} catch(err) {
    console.log(err.stack);
    return res.status(500).json({success:false,message:'Cannot find Membership'})
}
}

//@desc Add one members 
//@route Post /api/v1/members/::id
//@access Private
exports.addMember=async (req, res,next)=>{
    try{
        req.body.restaurant=req.params.restaurantId;
        const restaurant=await Restaurant.findById(req.params.restaurantId);

        if(!restaurant) {
            return res.status(404).json({success:false,message:`No restaurant with the id of ${req.params.id}`});   
        }
        console.log(req.body);

        // req.body.user=req.user.id;

        const member = await Member.create(req.body);
        res.status(200).json({success:true,data:member});

    } catch(err) {
        console.log(err.stack);
        return res.status(500).json({success:false,message:'Cannot create member'});
    }
} 

//@desc Update members 
//@route PUT /api/v1/members/::id
//@access Private
exports.updateMember=async (req, res,next)=>{
    try{
        let member= await Member.findById(req.params.id);

        if(!member) {
            return res.status(404).json({success:false,message:`No membership with id ${req.params.id}`})
        }

        member = await Member.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.status(200).json({success:true,data:member});
    } catch(err) {
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot update Member"});
    }
}

//@desc delete members 
//@route DELETE /api/v1/members/::id
//@access Private
exports.deleteMember=async (req, res,next)=>{
    try {
        const member = await Member.findById(req.params.id);

        if (!member){
            return res.status(404).json({success:false,message:`No member with id ${req.params.id}`});
        }


        await member.deleteOne();

        res.status(200).json({success:true,data:{}});
    } catch (err) {
        console.log(err.stack);
        return res.status(500).json({success:false,message:"Cannot Delete Member"});
    }
}