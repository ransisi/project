
	var dom=document.getElementById('clock');
	var cxt=dom.getContext('2d');
	//获取canvas的width和height
	//var width=dom.width;
	var width=cxt.canvas.width;
	var height=cxt.canvas.height;
	var r=width/2;
	var rem=width/200;
function drawBackground(){
	cxt.save();
	//重新定义画布上的（0,0)坐标
	cxt.translate(r,r);
	
	cxt.beginPath();
	cxt.lineWidth=10*rem;
	//注意圆的中心坐标为（0，0）,false为顺时针
	cxt.arc(0,0,r-cxt.lineWidth/2,0,2*Math.PI,false);
	//cxt.fill()：是填充圆，cxt.stroke():是绘制圆
	cxt.stroke();
	
	//让fillText（）的文本进行居中
	cxt.textAlign='center';//水平居中
	cxt.textBaseline='middle';//垂直居中
	cxt.font=20*rem+'px  Arial';
	
	//设置数字
	var d=[3,4,5,6,7,8,9,10,11,12,1,2];
	//对d进行循环遍历也可以用forEach（）方法，d.forEach(function(number,i){}),其中的number是数组对象，i是数组序列
	for(var i=0;i<d.length;i++){
		//弧度=弧长/半径
		var rad=2*Math.PI/12*i;
		var x=Math.cos(rad)*(r-30*rem);
	    var y=Math.sin(rad)*(r-30*rem);
	    //fillText（）方法在画布上绘制填色的文本，x:绘制文本的 x 坐标位置（相对于画布）
		cxt.fillText(d[i],x,y);
	}
	
	//设置点
	for(var i=0;i<60;i++){
		
		var rad=2*Math.PI/60*i;
		var x=Math.cos(rad)*(r-18*rem);
	    var y=Math.sin(rad)*(r-18*rem);
	    cxt.beginPath();
	    if(i % 5 === 0){
	    	cxt.fillStyle='#000';
	    	cxt.arc(x,y,2*rem,0,2*Math.PI,false)
	    }else {
	    	cxt.fillStyle='#ccc';
	    	cxt.arc(x,y,2*rem,0,2*Math.PI,false)
	    }
		
		cxt.fill();
	}
	}
	
	function drawHour(hour,minute){
		//保存当前环境的状态，Canvas 状态是以堆(stack)的方式保存的，每一次调用 save 方法，当前的状态就会被推入堆中保存起来，
		//每一次调用 restore 方法，上一个保存的状态就从堆中弹出，所有设定都恢复。
		cxt.save()
		cxt.beginPath();
		var rad=2*Math.PI/12*hour;
		var mad=2*Math.PI/12/60*minute;
		//rotate旋转当前绘图
		cxt.rotate(rad+mad);
		cxt.lineWidth=6*rem;
		
		//lineCap设置线条结束端点样式，即两端的样式
		cxt.lineCap='round';
		cxt.moveTo(0,10);
		cxt.lineTo(0,-r/2);
		//设置设置或返回用于笔触的颜色、渐变或模式，fillStyle用于设置填充绘画的颜色
		cxt.strokeStyle='#000';
		cxt.stroke();
		
		//返回之前保存过的路径状态和属性
		cxt.restore();
		
	}
	function drawMinute(minute){
		cxt.save();
		cxt.beginPath();
		var rad=2*Math.PI/60*minute;
		cxt.rotate(rad);
		//lineCap设置线条结束两端的样式，
		cxt.lineCap='round';
		cxt.lineWidth=4*rem;
		cxt.moveTo(0,10);
		cxt.lineTo(0,-r+20*rem);
		//stroke（）是绘制当前画布，fill（）是填充当前画布
		cxt.stroke();
		cxt.restore();
	}
	function drawsecond(second){
		cxt.save();
		cxt.beginPath();	
		var rad=2*Math.PI/60*second;
		cxt.rotate(rad);
		cxt.fillStyle='red';
		//画一个矩形，然后填充它
		cxt.moveTo(-2*rem,20*rem);
		cxt.lineTo(2*rem,20*rem);
		cxt.lineTo(1,-r+18*rem);
		cxt.lineTo(-1,-r+18*rem);
		cxt.fill();
		cxt.restore();
	}
	function drawdot(){
		cxt.beginPath();
		cxt.fillStyle='#fff';
		cxt.arc(0,0,3*rem,0,2*Math.PI,false);
		cxt.fill();
		
	}

 function draw(){
 	//clearRect方法清除给定矩形内的指定像素，x，y要清除的矩形左上角的坐标，width为要清除的矩形的宽度
 	cxt.clearRect(0,0,width,height);
 	drawBackground();
	drawdot();
 	var now=new Date();
 	var hour=now.getHours();
 	var minute=now.getMinutes();
 	var second=now.getSeconds();
 	drawHour(hour,minute);
	drawMinute(minute);
	drawsecond(second);
	drawdot();
	cxt.restore();
 }
 draw();
 var timer=setInterval(draw,1000);


