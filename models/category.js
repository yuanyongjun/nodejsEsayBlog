/**
 * Created by yuanyongjun on 2017/11/9.
 */

var mongoose=require('mongoose');
var categoriesSchema=require('../schemas/categories');

module.exports=mongoose.model('Category',categoriesSchema);