/**
 * Created by yuanyongjun on 2017/11/9.
 */

var mongoose = require('mongoose');

//定义内容表结构
module.exports = new mongoose.Schema({
    //分类
    //关联字段
    category: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用，另外一张表
        ref: 'Category'
    },

    //标题
    title: String,

    //用户
    //关联字段
    user: {
        //类型
        type: mongoose.Schema.Types.ObjectId,
        //引用，另外一张表
        ref: 'User'
    },

    //添加时间
    addTime: {
        type: Date,
        default: new Date()
    },

    //阅读量
    views: {
        type: Number,
        default: 0
    },

    //简介
    description: {
        type: String,
        default: ''
    },

    //内容
    content: {
        type: String,
        default: ''
    },

    //评论
    comments:{
        type:Array,
        default:[]
    }
});