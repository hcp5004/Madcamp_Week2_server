/*jslint devel: true */ 
/* eslint-disable no-console */ 
/*eslint no-undef: "error"*/ 
/*eslint-env node*/
//IP주소가 변화하면 안드로이드 앱 내에 있는 url 주소도 바꿔주어야 정상 동작하기시작함!


var express = require('express');
var http = require('http');
var bodyParser= require('body-parser');
var app = express();
var paramId
var mongoose = require('mongoose') // mongoose define

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));


// [CONFIGURE SERVER PORT]
var port = process.env.PORT || 8080;

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/test');

var Contact = require('./models/contact'); // contact model define
var contactrouter = require('./router/contactmain')(app, Contact, db); // router define

var Photo = require('./models/photo');
var photorouter = require('./router/photomain')(app, Photo);

// var contact = new Contact({
//     name: "NodeJS Tutorial",
//     number: "velopert"
// });
// contact.save(function(err, contact){
//     if(err) return console.error(err);
//     // console.dir(contact);
//     db.collection('student').insert(contact)
// });

// var Client = require('mongodb').MongoClient;

// app.set('port',process.env.PORT || 8080);
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// //첫 번째 미들웨어
// app.use(function(req, res, next) {

//     console.log('첫 번째 미들웨어 호출 됨');
//     var approve ={'approve_id':'NO','approve_pw':'NO'};

//     var paramId = req.body.id;
//     console.log('id : '+paramId);
//     //아이디 일치여부 flag json 데이터입니다.
//     if(paramId == 'test01') approve.approve_id = 'OK';
//     res.send(approve);

//     Client.connect('mongodb://localhost:27017/test', function(error, db){
//     if(error) {
//         console.log(error);
//     } else {
//         var michael = {name: paramId, Number: '01066815004'};
//         // 2. student 컬렉션의 insert( ) 함수에 입력
//         var database = db.db('test')
        
//         database.collection('student').insert(michael);

//         db.close();
//     }
//     });

// });




// var server = http.createServer(app).listen(app.get('port'),function(){
//    console.log("익스프레스로 웹 서버를 실행함 : "+ app.get('port')); 
// });


