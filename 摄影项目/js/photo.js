$(function(){
		$(window).scroll(function(){
		//导航条
		/*if($(window).scrollTop()>=30){
			$(".nav").addClass("nav1");
		}else{
			$(".nav").removeClass("nav1")
		}*/
		
		//一键到顶
		var gotop=$('#gotop');
		var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
		var clientheight=document.documentElement.clientHeight||document.body.clientHeight;
		if(scrolltop>clientheight){
			gotop.css('opacity','1');
		}else{
			gotop.css('opacity','0');
		}
			var timer=null;
		gotop.click(function(){
			timer=setInterval(function(){
			var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
			var speed=Math.floor(-scrolltop/10);
			document.documentElement.scrollTop+=speed;
			if(scrolltop==0){
				clearInterval(timer);
				
			}else{
				return;
			}
			},30)		
		})
		})
		
		$('#sousuo-input').keyup(function(){
			var searchText=$('#sousuo-input').val();
			$.ajax({
			type:'get',
			crossDomain:true,
			url:"http://api.bing.com/qsonhs.aspx?type=cb&q="+searchText,
			dataType:'jsonp', //预期服务器返回的数据类型，
			jsonp:'cb',
   			async:true,
			success:function(data){
			    var date=data.AS.Results[0].Suggests;
                var html='';
       			for (var i = 0; i<date.length; i++) {
          		html+= '<li>'+date[i].Txt+'</li>';
      		 }
      			$('.sousuo-list').html(html);
       			$('.sousuo-list').show().css({'display':'block',
       			'position':'absolute',
       			"top":$('.sousuo').offset().top+parseInt($('.sousuo').outerHeight())-5+'px',
       			'left':$('.sousuo').offset().left+'px',
       			'width':$('.sousuo').width(),
       			
       			});
       			$('.sousuo-list').delegate('li','click',function(){
       				var li=$(this).text();
       				window.location.href='http://cn.bing.com/search?q='+li;
       			})
       			
			   }
			})
	})
		$('.d').mouseout(function(){
			$('.sousuo-list').hide();
		})
		$('.sousuo-list').mouseover(function(){
			$('.sousuo-list').show();
		})
		$('.sousuo-list').mouseout(function(){
			$('.sousuo-list').hide();
		})
		
		/*鼠标移过去时导航条的变化*/
		var navulli=$('.navul li');
		for(var i=0;i<navulli.length;i++){
			navulli[i].onmouseover=function(){
				this.style.backgroundColor='white';
				$(this).find('a').css('color','black');
			}
			navulli[i].onmouseout=function(){
				this.style.backgroundColor='black';
				$(this).find('a').css('color','white');
			}
		}
		
		
		
		
		
		

})


			
window.onload=function(){
		var idd=function(id){
			return document.getElementById(id);
		};
		var container=idd('container');
		var list=idd('list');
		var buttons=idd('buttons').getElementsByTagName('span');
		var prev=idd('prev');
		var next=idd('next');
		var timer;
		var index=1;	
		var animated=false;//存一个状态，表示刚开始动画没有在运行中
		//buttons效果
		function showbtn(){
			for(var i=0;i<buttons.length;i++){
				if(buttons[i].className=='on'){
					buttons[i].className='';
					break;
				}
			}
			buttons[index-1].className='on';
		}
		//author效果
		
		function animate(offset){
			//动画正在运行中
			animated=true;
			var newleft=parseInt(list.style.left)+offset;//parseInt()可解析一个字符串并返回一个整数		
			function go(){
				var time=400;//如果offset(即图片的大小)换数字，这里的除可能不是整数，需要注意
				var interval=10;
				speed=offset/(time/interval);//下面需注意
				if((speed<0&&parseInt(list.style.left)>newleft||(speed>0&&parseInt(list.style.left)<newleft))){
				list.style.left=parseInt(list.style.left)+speed+'px';
				setTimeout(go,10);
				}else{
					if(newleft >-800){
					list.style.left=-4000+'px';
				}
				if(newleft<-4000){
					list.style.left=-800+'px';
				}
				animated=false;
				}
			}
			go();			
		};
		function autoplay(){
			timer=setInterval(function(){
				next.onclick();
			},2000)
		};
		function stop(){
			clearInterval(timer);
		};
		next.onclick=function(){
			if(index==5){
				index =1;
			}else{
				index+=1;
			}
			showbtn();
			if(animated==false){
				animate(-800);
			}
			
		};
		prev.onclick=function(){
			if(index>1){
				index -=1;
			}else{
				index=5;
			}
			showbtn();
			if(!animated){
				animate(800);	
			}
		};	
		for(var i=0;i<buttons.length;i++){
			buttons[i].onclick=function(){
				if(this.className=='on'){
				return;
			}//当点击的是第一个的时候没有必要执行后续动作，return
				var myindex=parseInt(this.getAttribute('index'));
				var offset=-800*(myindex-index);
				if(!animated){
					animate(offset);
				}				
				index=myindex;
				showbtn();
			}
			
		}
		container.onmouseover=stop;
		container.onmouseout=autoplay;
		autoplay();	
		
/*******摄影发展史*****************************************************************************************************/
	var TulLi=document.getElementById('Tul').getElementsByTagName('li');
	var Timgdiv=document.getElementById('Timg').getElementsByClassName('timgpart');
	for(var i=0;i<TulLi.length;i++){
		TulLi[i].onmouseover=function(){
			this.style.cssText="background:white;color:black;";
			Timgdiv[this.title].style.cssText='opacity:1;z-index:6;';
			 var  Timgdivv= Timgdiv[this.title];
			 var picname=Timgdivv.getElementsByClassName('picname')[0];	 
			  picname.style.height=0;
		      function change(){		 	
			 	if(parseInt(picname.style.height)<50){
			 		picname.style.height=parseInt(picname.style.height)+5+'px';
			 		setTimeout(change,20);
			 	}else{
			 		picname.style.height='50px';
			 	}
			 }
			 change();
			
		}
		
		TulLi[i].onmouseout=function(){
			this.style.cssText='none';
			 Timgdiv[this.title].style.cssText='opacity:1;z-index:4;';
			 /*var  Timgdivv= Timgdiv[this.title];
			 var picname=Timgdivv.getElementsByClassName('picname')[0];
			 picname.style.height=0;*/
		}

	}
	
	/*******器材、达人、风格标签共同代码部分*********************************************************************************************/
	var btn_ul=document.getElementsByClassName('one-intro');
	function move_left(num,btn_ull){
	var btn_li=btn_ull.children;//只包括元素节点，在IE下包括注释，而childNodes包括文本、元素和属性节点，
	var photo_main=document.getElementsByClassName('two-ul')[num];
	for(var i=0;i<btn_li.length;i++){
		btn_li[i].onmouseover=function(){
			this.style.color='#ff5151';
			if(this==btn_li[0]){				
				photo_main.style.left=0;
			}else{
				photo_main.style.left='-930px';
			}
		}
		btn_li[i].onmouseout=function(event){
			this.style.cssText='border:1px dashed red';
		}
	}
	}
	move_left(0,btn_ul[0]);
	move_left(1,btn_ul[1]);
	move_left(2,btn_ul[2]);
	/*******达人代码部分*********************************************************************************************/
	$('.wrap').each(function(i){/*遍历每一个li*/	
	$('#li'+i).bind("mouseenter mouseleave", function(e) { 
	var w = $(this).width(); 
	var h = $(this).height(); 
	var x = (e.pageX - $(this).offset().left - (w / 2)) * (w > h ? (h / w) : 1); 
	var y = (e.pageY - $(this).offset().top - (h / 2)) * (h > w ? (w / h) : 1); 
	var direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4; 
	var eventType = e.type; 
	var dirName = new Array('上方','右侧','下方','左侧'); 
	if(e.type == 'mouseenter'){ 
		switch(dirName[direction]){
			case dirName[0]:
				$('#demo'+i).attr('class','demo enter-top');			
				break;
			case dirName[1]:
				$('#demo'+i).attr('class','demo enter-right');			
				break;
			case dirName[2]:
				$('#demo'+i).attr('class','demo enter-bottom');			
				break;
			case dirName[3]:
				$('#demo'+i).attr('class','demo enter-left');			
				break;
				
		}
	}else{ 
		switch(dirName[direction]){
				case dirName[0]:
					$('#demo'+i).addClass(' outer-top');
					setTimeout(function(){
						$('#demo'+i).attr('class','demo outer-top');						
					},300)
					break;
				case dirName[1]:
					$('#demo'+i).addClass(' outer-right');
					setTimeout(function(){
						$('#demo'+i).attr('class','demo outer-right');
					},300)
					break;
				case dirName[2]:
					$('#demo'+i).addClass(' outer-bottom');
					setTimeout(function(){
						$('#demo'+i).attr('class','demo outer-bottom');
					},300)
					break;
				case dirName[3]:
					$('#demo'+i).addClass(' outer-left');
					setTimeout(function(){
						$('#demo'+i).attr('class','demo outer-left');
					},300)
					break;
					
			}
	} 
	}); 
	})
	/*******风格标签、器材代码*********************************************************************************************/
	function scale(main,main_ch){
		$('.wrap').each(function(i){
		$(main+i).bind('mouseover mouseout',function(e){
			if(e.type=='mouseover'){
				$(main_ch+i).addClass('model1');
				$(this).find('img').css('-webkit-transform','scale(1.2)')
			}else{
				$(main_ch+i).removeClass('model1');
				$(this).find('img').css('-webkit-transform','scale(1)')
			}
		})
	})
	}
	scale('#mode','#model')
	scale('#label','#labell')

	}
	
