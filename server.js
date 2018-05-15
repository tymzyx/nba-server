/**
 * Created by SL on 18/5/14.
 */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

let config = require('./config/config');

let router = require('./app/routes/index');

let app = express();

app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
		res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
		res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
		res.header("X-Powered-By", '3.2.1');
		if (req.method === 'OPTIONS') {
	  		res.send(200);
		} else {
	    	next();
		}
});

// =======================
// 配置 =========
// =======================
let port = process.env.PORT || 3322; // 设置启动端口
mongoose.connect(config.database); // 连接数据库

// body-parser解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用morgan将请求日志打印到控制台
app.use(morgan('dev'));

router.router(app);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
