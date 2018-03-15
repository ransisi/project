window.onload=function(){
	waterfall('main','box');
	var dataI={"data":[{"src":"49.jpg"},{"src":"50.jpg"},{"src":"51.jpg"},{"src":"52.jpg"},{"src":"53.jpg"},{"src":"54.jpg"},{"src":"55.jpg"},{"src":"56.jpg"},{"src":"57.jpg"},{"src":"58.jpg"},{"src":"59.jpg"},
	{"src":"60.jpg"},{"src":"61.jpg"},{"src":"62.jpg"},{"src":"63.jpg"},{"src":"64.jpg"},{"src":"65.jpg"},{"src":"66.jpg"},{"src":"67.jpg"},{"src":"68.jpg"},{"src":"68.jpg"},{"src":"69.jpg"},{"src":"70.jpg"},
	{"src":"71.jpg"},{"src":"72.jpg"},{"src":"73.jpg"},{"src":"74.jpg"},{"src":"75.jpg"},{"src":"76.jpg"},{"src":"77.jpg"},{"src":"78.jpg"}]};
	/*window.onscroll=function(){*/
		//如果checkscroll返回true，执行
		/*if(checkscroll()){*/
		var oparent=document.getElementById('main');
		for(var i=0;i<dataI.data.length;i++){
		var obox=document.createElement('div');
		obox.className='box';
		var opic=document.createElement('div');
		opic.className='pic';
		obox.appendChild(opic);
		oparent.appendChild(obox);
		var oimg=document.createElement('img')
		oimg.src='img/waterfall/'+dataI.data[i].src;
		opic.appendChild(oimg);	
		setTimeout(function (){waterfall('main','box')},110);//for循环比waterfall（）快,注意一个时间间隔	
	}	
}

	//获取className,传入父元素和classname得到父元素下所有等于指定classname的元素
	function getclass(parent,clsname){
		var boxarr=[];
		var oelements=parent.getElementsByTagName('*');
		for(var i=0;i<oelements.length;i++){
			if(oelements[i].className==clsname){
				boxarr.push(oelements[i]);
			};	
		}
		return boxarr;
	}
	//
	function waterfall(parent,box){
		var oparent=document.getElementById(parent);
		var oboxs=getclass(oparent,box);
		//计算整个页面显示的列数，main的宽（没有设置的时候就是页面的宽）/box的宽,offsetWidth是一个元素里的内容+自己的内边距+自己的边框
		var oboxw=oboxs[0].offsetWidth;
		//除出来的数字可能不是整数，所以使用Math.floor()方法向下取整
		var cols=Math.floor(parseInt((document.documentElement.clientWidth||document.body.clientWidth)/oboxw));
		oparent.style.cssText="width:"+cols*oboxw+"px;margin:0 auto;";
		var harr=[];//存放每一列高度的数组
		for(var i=0;i<oboxs.length;i++){
			if(i<cols){
				harr.push(oboxs[i].offsetHeight);
			}else{
				//数组没有Math.min()方法，apply(在哪个环境对象中执行，传入的参数)
				var minh=Math.min.apply(null,harr);
				//需要获取到minh的索引，以此取得该img的left
				var index=getminhindex(harr,minh);
				oboxs[i].style.position='absolute';
				oboxs[i].style.top=minh+'px';
				oboxs[i].style.left=oboxs[index].offsetLeft+'px';
				harr[index]+=oboxs[i].offsetHeight;
			}
		}
	}
function getminhindex(harr,minh){
	for(var i in harr){
		if(harr[i]==minh){
			return i;
		}
	}
}

//检测是否具备了滚动条加载数据的条件
function checkscroll(){
	var oparent=document.getElementById('main');
	var oboxs=getclass(oparent,'box');
	var lastoboxsh=oboxs[oboxs.length-1].offsetTop+Math.floor(oboxs[oboxs.length-1].offsetWidth/2);
	var scrolltop=document.body.scrollTop||document.documentElement.scrollTop;
	var clienth=document.body.clientHeight||document.documentElement.clientHeight;
	return (lastoboxsh<(scrolltop+clienth))?true:false;//如果HTML页面的最后一个box到main的顶部距离加上本身宽的一半小于
	//页面卷起来的距离和页面可视区域的宽
}
