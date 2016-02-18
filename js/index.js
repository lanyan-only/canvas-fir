window.onload=function(){
	var canvas=document.querySelector("#canvas");
	var ctx=canvas.getContext("2d");
	var canvas00=document.querySelector("#canvas00");
	var ctx00=canvas00.getContext("2d");
	
    ctx00.strokeStyle="#030a56";
    var row=15;
	var y0=20.5;var x0=20.5;
    for(i=0;i<row;i++){
        //heng
        var heng=ctx00.createLinearGradient(0,0,600,0);
        heng.addColorStop(0,'red');
        heng.addColorStop(0.5,'green');
        ctx00.strokeStyle=heng;
    	ctx00.beginPath();
    	ctx00.moveTo(20,y0);
    	ctx00.lineTo(580,y0);
    	y0+=40;
        ctx00.stroke();

	    //shu
	    var heng=ctx00.createLinearGradient(0,0,0,600);
        heng.addColorStop(0,'yellow');
        heng.addColorStop(0.5,'blue');
        ctx00.strokeStyle=heng;
    	ctx00.beginPath();
		ctx00.moveTo(x0,20);
		ctx00.lineTo(x0,580);
		x0+=40;
		ctx00.stroke();
    }
	
    //固定小黑点
	ctx00.beginPath();
	ctx00.arc(300.5,300.5,5,0,Math.PI*2);
	ctx00.fill();

	var z0=[140.5,460.5];
	for (var i = 0; i < z0.length; i++) {
		for (var j = 0; j < z0.length; j++) {
			    var heng=ctx00.createLinearGradient(300,300,305,305);
			    heng.addColorStop(0,'blue');
			    heng.addColorStop(0.3,'yellowgreen');
			    ctx00.fillStyle=heng;
			    ctx00.beginPath();
				ctx00.arc(z0[i],z0[j],5,0,Math.PI*2);
				ctx00.fill();
		}
		
	}

// 渐变线条
/*var lingrad=ctx.createLinearGradient(20,300,580,300);
lingrad.addColorStop(0,'red');
lingrad.addColorStop(0.2,'orange');
lingrad.addColorStop(0.4,'yellow');
lingrad.addColorStop(0.6,'green');
lingrad.addColorStop(0.8,'blue');
lingrad.addColorStop(1,'purple');

ctx.lineWidth=6;
ctx.lineCap="round";
ctx.strokeStyle=lingrad;
ctx.beginPath();
ctx.moveTo(20,300);
ctx.lineTo(580,300);
ctx.stroke();

ctx.fillStyle=lingrad;
ctx.fillRect(0,0,600,200);*/



var luozi=function(x,y,color){
	var zx=40*x+20.5;
	var zy=40*y+20.5;
	var black=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
	   black.addColorStop(0.1,'#444');
	   black.addColorStop(1,'black');
      

	var white=ctx.createRadialGradient(zx,zy,1,zx,zy,18);
	white.addColorStop(0.1,'#fff');
	white.addColorStop(1,'#ddd');


    /*ctx.fillStyle=color?black:white;*/
     if(color==true){
         ctx.fillStyle=black;
     }else{
     	ctx.fillStyle=white;
     }
	ctx.beginPath();
	ctx.arc(zx,zy,18,0,Math.PI*2);
	ctx.fill();

}
/*luozi(3,3,true);
luozi(4,3,false);
luozi(7,7,true);*/


var qizi={}
var kaiguan=true;
canvas.onclick=function(e){

	var x=Math.round((e.offsetX-20.5)/40);
	var y=Math.round((e.offsetY-20.5)/40)
    if(qizi[x+'-'+y]){return};

	luozi(x,y,kaiguan);
	 qizi[x+'-'+y]=kaiguan?'black':'white';
	kaiguan=!kaiguan;

   localStorage.data=JSON.stringify(qizi);
}


/*var  qizi={};
var kaiguan=true;
canvas.onclick=function(e){
   var x=Math.round((e.offsetX-20.5)/40);
   var y=Math.round((e.offsetY-20.5)/40);
   if(qizi[x+'-'+y]){return};
   if(kaiguan){
   	luozi(x,y,true);
   	kaiguan=false;
   }else{
   	luozi(x,y,false);
   	kaiguan=true;
   }
   qizi[x+'-'+y]=kaiguan?'black':'white';
   localStorage.data=JSON.stringify(qizi);
   
}*/


if(localStorage.data){
	qizi=JSON.parse(localStorage.data);
	for (var i in qizi){
		var x=i.split('-')[0];
		var y=i.split('-')[1];
		luozi(x,y,(qizi[i]=="black")?true:false);
	}
}
canvas.ondblclick=function(e){
	e.stopPropagation();
}
document.ondblclick=function(){
	localStorage.clear();
	location.reload();

}
button.onclick=function(){
	localStorage.clear();
	
}






}