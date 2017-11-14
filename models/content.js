/**
 * Created by yuanyongjun on 2017/11/9.
 */

var mongoose=require('mongoose');
var contentsSchema=require('../schemas/contents');

module.exports=mongoose.model('Content',contentsSchema);