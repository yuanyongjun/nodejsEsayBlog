/**
 * Created by yuanyongjun on 2017/11/9.
 */

var mongoose = require('mongoose');

//定义分类表结构
module.exports = new mongoose.Schema({
    //分类名称
    name: String
});