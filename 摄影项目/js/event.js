//enevtuil对象,所以方法之间用逗号分隔
var eventuil={
	addHandler:function(element,type,handler){//添加事件句柄
		if(element.addEventListene){
			element.addEventListener(type,handler,false);//false表示在冒泡阶段进行
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler)
		}else{
			element["on"+type]=handler;
		}
	},
	removeHandler:function(element,type,handler){
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent(type,handler);
		}else{
			element["on"+type]=null;
		}
	},
	getEvent:function(event){
		return event? event:window.event;//window.event是针对IE来说的
	},
	getTarget:function(){
		return event.target||event.srcElement//不懂
	},
	preventDefault:function(event){
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=false;
		}
	},
	stopPropagation:function(event){//阻止事件冒泡
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble=true;
		}
	}
}
