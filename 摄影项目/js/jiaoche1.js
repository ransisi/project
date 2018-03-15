window.onload=function(){
		
	function getelem(elem){
		var method=elem.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
		return document[method](elem.substring(1,elem.length));
	}
	//自动加载人像ul里的内容
	var item=getelem('.item')[0].innerHTML;
	var add_data=data;
	function add(ini,num){
		var _html=[];
		for(var i=ini;i<num;i++){
			var _photo=item.replace(/{{image}}/,add_data[i].img)
										 .replace(/{{title}}/,add_data[i].title)
										 .replace(/{{desc}}/,add_data[i].desc)
										 .replace(/{{span1}}/,add_data[i].span1)
										 .replace(/{{span2}}/,add_data[i].span2);
			_html.push(_photo);
		}
		getelem('.item')[0].innerHTML=_html.join('');//join()方法用于把数组中的所有放入一个字符串，并以指定字符分隔
	}
	add(0,7);
		
		
	//鼠标滑过改变ul里的内容
	var tab_a=getelem('.tab-a');
	
	for(var i=0;i<tab_a.length;i++){
		
		tab_a[i].onmouseover=function(){
			//鼠标滑过的时候改变getelem('.item')[0]的内容
			this.style.backgroundColor='#ADADAD';
			switch(this){
				case tab_a[0]:
				add(0,7);
				break;
				case tab_a[1]:
				add(7,14);
				break;
				case tab_a[2]:
				add(14,21);
				break;
				case tab_a[3]:
				add(21,28);
				break;
			}
		}
		tab_a[i].onmouseout=function(){
			this.style.backgroundColor='white';
		}
	}
}

