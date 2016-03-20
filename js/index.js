window.onload=function(){
	var canvas=document.querySelector("#canvas");
	var ctx=canvas.getContext("2d");


    var row=15;//棋盘大小
    var qizi={};//所有的落子数据
    var kaiguan=localStorage.x?false:true;
    var huaqipan=function(){
    	    ctx.clearRect(0,0,600,600);
	    	ctx.strokeStyle="#030a56";
	    	var y0=20.5;var x0=20.5;
	    	for(i=0;i<row;i++){
	        //heng
	        var heng=ctx.createLinearGradient(0,0,600,0);
	        heng.addColorStop(0,'red');
	        heng.addColorStop(0.5,'green');
	        ctx.strokeStyle=heng;
	        ctx.beginPath();
	        ctx.moveTo(20,y0);
	        ctx.lineTo(580,y0);
	        y0+=40;
	        ctx.stroke();

		    //shu
		    var heng=ctx.createLinearGradient(0,0,0,600);
		    heng.addColorStop(0,'yellow');
		    heng.addColorStop(0.5,'blue');
		    ctx.strokeStyle=heng;
		    ctx.beginPath();
		    ctx.moveTo(x0,20);
		    ctx.lineTo(x0,580);
		    x0+=40;
		    ctx.stroke();
		    }

		    //固定小黑点
		    ctx.beginPath();
		    ctx.arc(300.5,300.5,5,0,Math.PI*2);
		    ctx.fill();

			var z0=[140.5,460.5];//棋盘星点位置数据
			for (var i = 0; i < z0.length; i++) {
				for (var j = 0; j < z0.length; j++) {
					var heng=ctx.createLinearGradient(300,300,305,305);
					heng.addColorStop(0,'blue');
					heng.addColorStop(0.3,'yellowgreen');
					ctx.fillStyle=heng;
					ctx.beginPath();
					ctx.arc(z0[i],z0[j],5,0,Math.PI*2);
					ctx.fill();
				}
				
			}

    }
    huaqipan();

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

/*
  x  num  x轴
  y  num  y轴
  */

  var luozi2=function(x,y,color){
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
var qiziimg=document.querySelector("#sucai");

var luozi=function(x,y,color){
	var zx=40*x+5.5;
	var zy=40*y+5.5;
	if(color){
		ctx.drawImage(qiziimg,2,2,56,56,zx,zy,36,36);
	}else{
		ctx.drawImage(qiziimg,84,2,56,56,zx,zy,36,36);
	}
	
}

canvas.onclick=function(e){
	var x=Math.round((e.offsetX-20.5)/40);
	var y=Math.round((e.offsetY-20.5)/40)
	if(qizi[x+'-'+y]){return};

	luozi(x,y,kaiguan);
	qizi[x+'-'+y]=kaiguan?'black':'white';
     if(kaiguan){
     	if(panduan(x,y,'black')){
     		alert("heiqiying");
     		if(confirm('shifouzailaiyiju')){
     			localStorage.clear();
     			qizi={};
                huaqipan();
                kaiguan=true;
                return;
     		}
     		else{
     			canvas.onclick=null;
     		}
     	}
     }else{
     		if(panduan(x,y,'white')){
     			alert("baiqiying");
     			if(confirm('shifouzailaiyiju')){
     				localStorage.clear();
     				qizi={};
     	           huaqipan();
     	           kaiguan=true;
     	           return;
     			}else{
     				canvas.onclick=null;
     			}
     		}
     }

	kaiguan=!kaiguan;

	localStorage.data=JSON.stringify(qizi);
	if(!kaiguan){
		localStorage.x=1;
	}else{
		localStorage.removeItem("x");
	}
}

var xy2id=function(x,y){
	return x+'-'+y;
}
var panduan=function(x,y,color){
	//color :  'heizi '   'baizi'  tx,tx游标 ;
	var shuju=filter(color);
	var tx,ty,hang=1;shu=1;zuoxie=1;youxie=1;
	tx=x;ty=y;while(shuju[xy2id(tx-1,ty)]){tx--;hang++;};
	tx=x;ty=y;while(shuju[xy2id(tx+1,ty)]){
		tx++;
		hang++;
	};
	if(hang>=5){
		return true;
	}
	tx=x;ty=y;while(shuju[xy2id(tx,ty-1)]){
		ty--;
		shu++;
	};
	tx=x;ty=y;while(shuju[xy2id(tx,ty+1)]){
		ty++;
		shu++;
	};
	if(shu>=5){
		return true;
	}

	tx=x;ty=y;while(shuju[xy2id(tx+1,ty-1)]){
		tx++;
		ty--;
		zuoxie++;
	};
	tx=x;ty=y;while(shuju[xy2id(tx-1,ty+1)]){
		tx--;
		ty++;
		zuoxie++;
	};
	if(zuoxie>=5){
		return true;
	}
	tx=x;ty=y;while(shuju[xy2id(tx-1,ty-1)]){
		tx--;
		ty--;
		youxie++;
	};
	tx=x;ty=y;while(shuju[xy2id(tx+1,ty+1)]){
		tx++;
		ty++;
		youxie++;
	};
	if(youxie>=5){
		return true;
	}
	
}
filter=function(color){
	var r={};
	for (var i in qizi){
	    if(qizi[i]==color){
	    	r[i]=qizi[i];
	    }
	}
    return r;
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
/*如果本地存储中有棋盘数据，读取这些数据并绘制到页面中*/

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
	location.reload();
}

//悔棋
button00.onclick=function(){
	data=JSON.parse(localStorage.data);
	if(JSON.stringify(data)==0){
		button00.onclick=null;
		return;
	}
	var xyqizi=[];
	var colorqizi=[];
	for(var i in data){
		xyqizi.push(i);
		colorqizi.push(data[i]);
	}
	xyqizi.pop();
	colorqizi.pop();
	for (var i = 0; i < colorqizi.length; i++) {
		var x=xyqizi[i].split("_")[0];
		var y=xyqizi[i].split("_")[1];
		luozi(x,y,(colorqizi[i]=="black")?true:false);
		if((colorqizi[i]=="black")?true:false){
			localStorage.x=1;
		}else{
			localStorage.removeItem("x");
		}
	}
	data={};
	for (var i = 0; i < xyqizi.length; i++) {
		var x=xyqizi[i].split("_")[0];
		var y=xyqizi[i].split("_")[1];
		data[x+"_"+y]=colorqizi[i];
		if((colorqizi[i]=="black")?true:false){
			localStorage.x=1;
		}else{
			localStorage.removeItem("x");
		}
	}
	localStorage.data=JSON.stringify(data);
	location.reload();

}

var bgimg=document.querySelector(".bg-img");
var num=0;
function move(){
	num--;
	if(num==-19860){num=0;}
	bgimg.style.left=num+"px";
}

setInterval(move,20);



}