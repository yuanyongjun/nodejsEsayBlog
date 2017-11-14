/**
 * Created by yuanyongjun on 2017/11/9.
 * 应用程序的启动入口
 */

//加载exporess模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser，用于处理post提交过来的数据
var bodyParser = require('body-parser');
//加载cookies模块
var Cookies = require('cookies');
//创建app应用
var app = express();

var User=require('./models/user');



//定义当前应用使用的模板引擎
app.engine('html', swig.renderFile);
//设置模板文件存放的目录
app.set('views', __dirname + '/views');
//注册所使用的模板引擎
app.set('view engine', 'html');

//todo 上线取消
//在开发中取消模板缓存
swig.setDefaults({cache: false});

//bodyParser设置
app.use(bodyParser.urlencoded({extended: true}));

//cookies设置
app.use(function(req,res,next){
    req.cookies=new Cookies(req,res);

    //解析用户登陆的cookies信息
    req.userInfo={};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo=JSON.parse(req.cookies.get('userInfo'));

            //获取当前用户的类型，是否是管理员
            User.findById(req.userInfo._id).then(function(userInfo){
                req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
                next();
            });
        }catch(e){
            next();
        }
    }else{
        next();
    }

});

/*
 * 首页*/
/*app.get('/',function(req,res,next){
 //res.send('<h1>欢迎来到我的博客</h1>');

 //读取views下的制定文件，解析并返回给客户端
 //第一个参数：表示模板的文件，相对于views目录下
 //第二个参数：传递给模板使用的数据
 res.render('index.html');
 });*/

/*app.get('/main.css',function(req,res,next){
 res.setHeader('content-type','text/css');
 res.send('body{background-color:red}');
 });*/

//设置静态文件托管
//当用户访问的url以/public开始，那么直接返回对应的__dirname/public目录下的文件
app.use('/public', express.static(__dirname + '/public'));

/*
 * 根据不同功能划分模块*/
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

//连接数据库
mongoose.connect('mongodb://localhost:27018/blog', function (err) {
    if (err) {
        console.log('数据库连接失败！');
    } else {
        console.log('数据库连接成功！');
        //监听http请求
        app.listen(8081);
    }
});








