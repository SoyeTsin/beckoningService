//服务器及页面响应部分
//引入http模块
var http = require('http'),
//创建一个服务器
    server = http.createServer(function (req, res) {
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('hello world!');
        res.end();
    });
//监听80端口
server.listen(9221);
console.log('server started');

var beckoning = 21563;
var xindongArr = [];
for (var i = 0; i < 30; i++) {
    xindongArr.push(10000 - Math.ceil(Math.random() * 8000));
}
var pinglun = [];
//socket部分
io = require('socket.io').listen(server);
var inter = setInterval(function () {
    for (var i = 0; i < 10; i++) {
        var num = Math.round(Math.random() * 1000000);
        var initNum = num % 10000;
        setTimeout(function () {
            beckoning++;
            io.sockets.emit('beckoning', beckoning);
        }, initNum);
    }
}, 5000);
io.on('connection', function (socket) {
    socket.on('foo', function (data) {
        beckoning++;
        //console.log(beckoning);
        io.sockets.emit('beckoning', beckoning);
        socket.emit('initPingluns', pinglun);
        io.sockets.emit('xindongArr', xindongArr);

    })
    socket.on('setGiftMsg', function (msg) {
        io.sockets.emit('emitGiftMsg', msg);
    });
    socket.on('gangtiexia', function (msg) {
        io.sockets.emit('emitRionManGiftMsg', msg);
    });
    socket.on('setPinglun', function (msg) {
        var msgs = '';
        msgs = msg;
        var time = CurentTime();
        msgs.time = time;
        pinglun.unshift({uuid: msg.uuid, userName: msg.userName, time: time, msg: msg.msg});
        if (pinglun.length > 1000) {
            pinglun.shift();
        }
        io.sockets.emit('getPingluns', msgs);
    })
    socket.on('xindong', function (e) {
        //将消息输出到控制台
        //console.log(beckoning);
        xindongArr[e]++;
        io.sockets.emit('xindong', xindongArr, e);
    });
    socket.on('fanxianlingjiang', function (nick, msg) {
        //将消息输出到控制台
        //console.log(beckoning);
        io.sockets.emit('fanxian_lingjiang', nick, msg);
    });
});
function CurentTime() {
    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
    var hh = now.getHours();            //时
    var mm = now.getMinutes();          //分
    var ss = now.getSeconds();           //miao
    var clock = year + "年";
    if (month < 10)
        clock += "0";
    clock += month + "月";
    if (day < 10)
        clock += "0";
    clock += day + "日 ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10)clock += '0';
    clock += ss
    return (clock);
}