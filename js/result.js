//游戏结果
function getResult(total){
	LTweenLite.pauseAll();	
	backLayer.removeAllChild();
	backLayer.die();
	//首页层
	var rLayer = new LSprite();
	backLayer.addChild(rLayer);
	rLayer.addChild(getBitmap(imgList['back']));
	//首页层
	var nochage1 = getBitmap(imgList['nochage1']);
	nochage1.x = 242;
	nochage1.y = 104;
	rLayer.addChild(nochage1);
	bigAndSmall(nochage1,2,2,1.5,0.02,0,true);
	
	var nochage2 = getBitmap(imgList['nochage3']);
	nochage2.x = 90;
	nochage2.y = 394;
	rLayer.addChild(nochage2);
	var transParams = {
		type: LTransition.Fly,
		startPoint: 2,
		duration: 1,
		direction: LTransition.IN,
		easing: Strong.easeOut
	};
	LTransitionManager.start(nochage2, transParams);
	
	var nochage3 = getBitmap(imgList['nochage2']);
	nochage3.x = 21;
	nochage3.y = 609;
	rLayer.addChild(nochage3);
	var transParams1 = {
		type: LTransition.Fly,
		startPoint: 4,
		duration: 1,
		direction: LTransition.IN,
		easing: Strong.easeOut
	};
	LTransitionManager.start(nochage3, transParams1);
	
	
	var result2 = getButton(imgList['result2']);
	result2.x = rCenterWidth(result2);
	result2.y = 813;
	rLayer.addChild(result2);
	setTimeout(function(){
		bigAndSmall(result2,2,2,1.5,0.02,0,true);
	},750);
	
	var result3 = getButton(imgList['result3']);
	result3.x = rCenterWidth(result3);
	result3.y = 940;
	rLayer.addChild(result3);
	bigAndSmall(result3,2,2,1.5,0.02,0,true);
	result3.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
		window.location.href = 'http://www.baidu.com';
	});
	
	var result4 = getButton(imgList['result4']);
	result4.x = rCenterWidth(result4);
	result4.y = 1076;
	rLayer.addChild(result4);
	result4.addEventListener(LMouseEvent.MOUSE_DOWN,showList);
	
	var circle1 = getBitmap(imgList['circle1']);
	circle1.x = 250;
	circle1.y = 85;
	rLayer.addChild(circle1);
	LTweenLite.to(circle1,3.0,{rotate:-360,loop:true,onComplete:function(){
		circle1.rotate = 0;
	}});
	
	var circle2 = getBitmap(imgList['circle2']);
	circle2.x = 610;
	circle2.y = 176;
	rLayer.addChild(circle2);
	bigAndSmall(circle2,2,2,1.5,0.2,0,true);
	
	var circle3 = getBitmap(imgList['circle3']);
	circle3.x = 103;
	circle3.y = 277;
	rLayer.addChild(circle3);
	bigAndSmall(circle3,2,2,1.0,0.2,0,true);
	
	var circle4 = getBitmap(imgList['circle4']);
	circle4.x = 197;
	circle4.y = 226;
	rLayer.addChild(circle4);
	bigAndSmall(circle4,2,2,2,0.2,0,true);
	
	var circle5 = getBitmap(imgList['circle5']);
	circle5.x = 549;
	circle5.y = 253;
	rLayer.addChild(circle5);
	LTweenLite.to(circle5,1.5,{rotate:360,loop:true,onComplete:function(){
		circle5.rotate = 0;
	}});
	
	var circle6 = getBitmap(imgList['circle6']);
	circle6.x = 596;
	circle6.y = 346;
	rLayer.addChild(circle6);
	LTweenLite.to(circle6,2.0,{rotate:-360,loop:true,onComplete:function(){
		circle6.rotate = 0;
	}});
	
	var circle7 = getBitmap(imgList['circle7']);
	circle7.x = 176;
	circle7.y = 351;
	rLayer.addChild(circle7);
	LTweenLite.to(circle7,2.5,{rotate:360,loop:true,onComplete:function(){
		circle7.rotate = 0;
	}});
	
	if( parseInt(total)>=0)
	{
		var nb = parseInt(Math.random()*3);
		var textLayer = new LSprite();
		rLayer.addChild(textLayer);
		textLayer.alpha = 0;
		LTweenLite.to(textLayer,0.5,{alpha:1,delay:0.5});
		var txt = getBitmap(imgList['resc'+(nb+1)]);
		textLayer.addChild(txt);
		var moneys = getBitmap(imgList['result1']);	
		moneys.y = 60;
		textLayer.addChild(moneys);
		var num = new setText(0,0,52,total,'#ffba00',true);
		num.y = 62;
		textLayer.addChild(num);
		moneys.x = (txt.getWidth()-moneys.getWidth()-num.getWidth()-24)/2;
		num.x = moneys.x+moneys.getWidth()+24;
		textLayer.x = rCenterWidth(textLayer);
		textLayer.y = 490;
	}else{
		var textLayer = new LSprite();
		rLayer.addChild(textLayer);	
		textLayer.alpha = 0;
		LTweenLite.to(textLayer,0.5,{alpha:1,delay:0.5});
		var txt = getBitmap(imgList['resc0']);
		textLayer.addChild(txt);
		textLayer.x = rCenterWidth(textLayer);
		textLayer.y = 540;
	}
	
}