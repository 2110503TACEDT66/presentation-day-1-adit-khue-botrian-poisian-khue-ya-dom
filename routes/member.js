const express=require('express');
const {getMembers,getMember, addMember, updateMember,deleteMember}=require('../controllers/member');
const router =express.Router ({mergeParams:true});
const {protect,authorize} = require('../middleware/auth');
router.route('/')
    .get(protect,authorize('admin','user'),getMembers)
    .post(protect,authorize('admin'),addMember);
router.route('/:id')
    .get(protect,authorize('admin','user'),getMember)
    .put(protect,authorize('admin'),updateMember)
    .delete(protect,authorize('admin'),deleteMember);

module.exports=router;