/**
 * Created by yuanyongjun on 2017/11/9.
 */

var mongoose=require('mongoose');
var usersSchema=require('../schemas/users');

module.exports=mongoose.model('User',usersSchema);