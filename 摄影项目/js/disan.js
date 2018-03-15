window.onload=function(){
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
	
}
