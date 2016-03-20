var canvas00=document.querySelector('#canvas00');

//关于矩形
 ctx00=canvas00.getContext('2d');//相当于画笔

 ctx00.save();
 ctx00.fillStyle='rgb(255,0,0)';
 ctx00.fillRect(150,150,100,100);

 ctx00.fillStyle='rgba(0,255,0,0.4)';
 ctx00.fillRect(200,200,100,100);

 ctx00.strokeStyle="rgb(255,0,0)";
 ctx00.strokeRect(9.5,9.5,100,200);

 ctx00.clearRect(200,200,50,50);

 ctx00.clearRect(0,0,400,400);

//关于线条
ctx00.beginPath();
ctx00.moveTo(200,200);//移到哪
ctx00.lineTo(400,200);
ctx00.lineTo(300,400);
ctx00.stroke();
ctx00.clearRect(0,0,400,400);

//圆
ctx00.beginPath();
ctx00.arc(200,200,100,0,Math.PI*2);
ctx00.moveTo(270,200);
ctx00.arc(200,200,70,0,Math.PI);
ctx00.moveTo(170,160);
ctx00.arc(160,160,10,0,Math.PI*2);
ctx00.moveTo(250,160);
ctx00.arc(240,160,10,0,Math.PI*2);
ctx00.moveTo(162,160);
ctx00.arc(160,160,2,0,Math.PI*2);
ctx00.moveTo(242,160);
ctx00.arc(240,160,2,0,Math.PI*2);
ctx00.stroke();
ctx00.clearRect(0,0,400,400);

// 贝萨尔曲线
ctx00.beginPath();

ctx00.moveTo(201,150);
ctx00.bezierCurveTo(188, 152, 292 , 118 , 305 , 126 );
ctx00.bezierCurveTo(337, 147 , 315 , 232 , 297 , 257 );
ctx00.bezierCurveTo(288 , 269 , 200 , 341 , 186 , 347);
ctx00.bezierCurveTo(172, 353, 88, 280 , 80 , 268 );
ctx00.bezierCurveTo(58, 235 , 46 , 127 , 103, 115 );
ctx00.stroke();
ctx00.clearRect(0,0,400,400);

  // 画布和程序结合

  //阴影添加
  ctx00.shadowOffsetX=2;
  ctx00.shadowOffsetY=2;
  ctx00.shadowBlur=2;
  ctx00.shadowColor="rgba(0,0,0,0.8)";
  for (var i = 0; i < 40; i++) {
  	ctx00.beginPath();
  	var xinx=(Math.random()*1000);
  	var xiny=(Math.random()*1000);
  	var radius=(Math.random()*100+20);
  	ctx00.arc(xinx,xiny,radius,0,Math.PI*2);
  	ctx00.fillStyle='rgba('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+' ,'+Math.floor(Math.random()*255)+',0.6 )';
    ctx00.fill();
  };
  ctx00.clearRect(0,0,1000,1000);
ctx00.clearRect(0,0,1000,1000);


ctx00.restore();
ctx00.clearRect(0,0,1000,1000);


//ctx.save()    ctx.restore()
//ctx.translate()   ctx.rotate();
ctx00.clearRect(0,0,600,600);
ctx00.save();//保存
ctx00.beginPath();
ctx00.translate(300,300);
ctx00.arc(0,0,34,0,Math.PI*2);
for (var i = 0; i < 12; i++) {
  ctx00.rotate(Math.PI/6);
  ctx00.moveTo(80,0);
  ctx00.arc(60,0,20,0,Math.PI*2);
};

ctx00.stroke();
ctx00.restore();//恢复画布状态

ctx00.beginPath();
ctx00.moveTo(100,100);
ctx00.lineTo(100,500);
ctx00.moveTo(100,100);
ctx00.lineTo(500,100);

ctx00.stroke();

ctx00.save();
ctx00.rotate(Math.PI/6);
ctx00.fillRect(100,100,30,30);
ctx00.fillRect(200,200,30,30);
ctx00.stroke();
ctx00.restore();



ctx00.clearRect(0,0,1000,1000);



var x;
var i=0;
setInterval(function(){

      x=Math.PI/30*i;
      i++;
      drawClock();
},1000);

var drawClock=function(){
  ctx00.clearRect(0,0,300,300);
  // var d=new Date();
  //  var sec=d.getSeconds();
  // var min=d.getMinutes();
  // var hou=d.getHours();
   //画表盘
   ctx00.save();
   ctx00.strokeStyle="#000";
   ctx00.lineWidth=6;
   ctx00.translate(150,150);

   ctx00.save();
   ctx00.beginPath();
   ctx00.arc(0,0,100,0,Math.PI*2);
   ctx00.stroke();
   ctx00.restore();

  //画刻度

  ctx00.lineCap="round";
  for (var i = 1; i < 61; i++) {
    ctx00.rotate(Math.PI/30);
    ctx00.strokeStyle="#000";
    ctx00.beginPath();
    if(i%5==0){
      ctx00.lineWidth=6;
      ctx00.moveTo(79,0);
    }else{
      ctx00.lineWidth=4;
      ctx00.moveTo(88,0);
    }
    ctx00.lineTo(93,0);
    ctx00.stroke();
  };

  //画时针
  ctx00.save();
   
 
  /*ctx00.rotate( hou*(Math.PI/6) + (Math.PI/360)*min + (Math.PI/21600)*sec );*/
  // ctx00.rotate((360*((min*60+sec+hou*3600)/(12*3600)))/180*Math.PI);
  ctx00.beginPath();
  ctx00.lineWidth=9;
  ctx00.lineCap="round";
  ctx00.moveTo(0,10);
  ctx00.lineTo(0,-32);
  ctx00.stroke();
  ctx00.restore();

  //画分针
  ctx00.save();
 
  /*ctx00.rotate( (Math.PI/30)*min + (Math.PI/1800)*sec );*/
  // ctx00.rotate((360*((min*60+sec)/3600))/180*Math.PI);
  ctx00.beginPath();
  ctx00.lineWidth=6;
  ctx00.strokeStyle="green";
  ctx00.moveTo(0,20);
  ctx00.lineTo(0,-52);
  ctx00.stroke();
  ctx00.restore();

    //画秒针
    ctx00.save();
  
    ctx00.rotate(x);
    ctx00.beginPath();
    ctx00.lineWidth=3;
    ctx00.strokeStyle="red";
    ctx00.moveTo(0,20);
    ctx00.lineTo(0,-62);
    ctx00.moveTo(5,-67);
    ctx00.arc(0,-67,5,0,Math.PI*2);
    ctx00.moveTo(0,-72); 
    ctx00.lineTo(0,-77);

    ctx00.stroke();
    ctx00.restore();

      //画小圆点
      ctx00.beginPath();
      ctx00.fillStyle="red";
      ctx00.moveTo(-4,4);
      ctx00.arc(0,0,4,0,Math.PI*2);
      ctx00.fill()




    ctx00.restore();
    requestAnimationFrame(drawClock);

  }

  /*requestAnimationFrame(callback)*/
requestAnimationFrame(drawClock);
//这种动画方式 当前窗口处于未激活状态时，动画帧数会明显降低

//保存一张图片

/*document.onclick=function(){
  location.href=(canvas.toDataURL().replace("data:image/png","data:stream/octet"));
}*/


//保存一张全png格式图片
/*var link = document.createElement('a');
link.innerHTML = 'download image';

link.addEventListener('click', function(ev) {
    link.href = canvas.toDataURL();
    link.download = "mypainting.png";
}, false);

document.body.appendChild(link);*/