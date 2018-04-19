$(function() {
	//删除不良信息
	$('.delete1').prevAll().remove();
	$('.delete2').nextAll().remove();
	music();
});
function music(){
	//音乐
	var music = 0;
	var musicOpen = true;
	var musicTween = setInterval(function() {
		music += 2;
		$('#music').css('transform', "rotate(" + music + "deg)");
		if(music == 360) {
			music = 0;
		}
	}, 10);
	$('#music').on('touchstart', function() {
		if(musicOpen == true) {
			musicOpen = false;
			clearInterval(musicTween);
			$('#bg')[0].pause();
		} else {
			musicOpen = true;
			musicTween = setInterval(function() {
				music += 2;
				$('#music').css('transform', "rotate(" + music + "deg)");
				if(music == 360) {
					music = 0;
				}
			}, 10);
			$('#bg')[0].play();
		}
	});
}
var maxNum = 15;
var minNum = 5;
var scc;
function startGame(res){
	imgList = res;
	$.get('http://192.168.0.102/e/public/index.php/api/ruleApi/getGoldMinMax',function(data){
		var data = JSON.parse(data);
		maxNum = data.max_value;
		minNum = data.min_value;
	});
	homepage();
	
	
}
//首页
function homepage(){
	LTweenLite.pauseAll();	
	backLayer.removeAllChild();
	backLayer.die();
	//首页层
	var rLayer = new LSprite();
	backLayer.addChild(rLayer);
	rLayer.addChild(getBitmap(imgList['back']));
	//首页层
	var nochage1 = getBitmap(imgList['home1']);
	nochage1.x = 78;
	nochage1.y = 77;
	rLayer.addChild(nochage1);
	bigAndSmall(nochage1,2,2,1.5,0.02,0,true);
	
	var nochage2 = getBitmap(imgList['home2']);
	nochage2.x = 74;
	nochage2.y = 735;
	rLayer.addChild(nochage2);
	var transParams = {
		type: LTransition.Fly,
		startPoint: 5,
		duration: 1,
		direction: LTransition.IN,
		easing: Strong.easeOut
	};
	LTransitionManager.start(nochage2, transParams);
	
	var result2 = getButton(imgList['home3']);
	result2.x = rCenterWidth(result2);
	result2.y = 902;
	rLayer.addChild(result2);
	bigAndSmall(result2,2,2,1.5,0.02,0,true);
	result2.addEventListener(LMouseEvent.MOUSE_DOWN,gameStart);
	
	var result3 = getButton(imgList['home4']);
	result3.x = 83;
	result3.y = 1070;
	rLayer.addChild(result3);
	bigAndSmall(result3,2,2,1.5,0.02,0,true);
	result3.addEventListener(LMouseEvent.MOUSE_DOWN,showRule);
	
	var result4 = getButton(imgList['home5']);
	result4.x = 398;
	result4.y = 1070;
	rLayer.addChild(result4);
	result4.addEventListener(LMouseEvent.MOUSE_DOWN,showList);
	
	var circle1 = getBitmap(imgList['circle1']);
	circle1.x = 85;
	circle1.y = 160;
	rLayer.addChild(circle1);
	LTweenLite.to(circle1,3.0,{rotate:-360,loop:true,onComplete:function(){
		circle1.rotate = 0;
	}});
	
	var circle2 = getBitmap(imgList['circle2']);
	circle2.x = 603;
	circle2.y = 74;
	rLayer.addChild(circle2);
	bigAndSmall(circle2,2,2,1.5,0.2,0,true);
	
	var circle3 = getBitmap(imgList['circle3']);
	circle3.x = 645;
	circle3.y = 650;
	rLayer.addChild(circle3);
	bigAndSmall(circle3,2,2,1.0,0.2,0,true);
	
	var circle4 = getBitmap(imgList['circle4']);
	circle4.x = 80;
	circle4.y = 365;
	rLayer.addChild(circle4);
	bigAndSmall(circle4,2,2,2,0.2,0,true);
	
	var circle5 = getBitmap(imgList['circle5']);
	circle5.x = 570;
	circle5.y = 195;
	rLayer.addChild(circle5);
	LTweenLite.to(circle5,1.5,{rotate:360,loop:true,onComplete:function(){
		circle5.rotate = 0;
	}});
	
	var circle6 = getBitmap(imgList['circle6']);
	circle6.x = 627;
	circle6.y = 294;
	rLayer.addChild(circle6);
	LTweenLite.to(circle6,2.0,{rotate:-360,loop:true,onComplete:function(){
		circle6.rotate = 0;
	}});
	
	var circle7 = getBitmap(imgList['circle7']);
	circle7.x = 62;
	circle7.y = 680;
	rLayer.addChild(circle7);
	LTweenLite.to(circle7,2.5,{rotate:360,loop:true,onComplete:function(){
		circle7.rotate = 0;
	}});
}
//开始游戏
function gameStart(){
	brickLayer = null;
	perLayer = null;
	backLayer.die();
	backLayer.removeAllChild();
	//设置首页背景
	var bitmap = getBitmap(imgList['gameBack']);
	backLayer.addChild(bitmap);
	//砖头层
 	brickLayer = new LSprite();
	backLayer.addChild(brickLayer);
	brickLayer.removeAllChild();
	LTweenLite.pauseAll();
	//人物层
	perLayer = new LSprite();
	backLayer.addChild(perLayer);
	perLayer.removeAllChild();
	//分数
	scoreLayer = new LSprite();
	backLayer.addChild(scoreLayer);
	scc = new scoreBacks(410,30,0);
	backLayer.addChild(scc);
	//初始数据
	var startX = 240; //砖头开始位置横坐标
	var startY = 1110; //砖头开始位置纵坐标
	var startNumber = 20; //砖头数量
	var winLeft = 65; //可视区域左边距离
	var winRight = 560; //可视区域右边距离
	var delayTime = 0; //延迟时间
	var score = 1;//得分
	var people;//人
	var brickArray = [];//砖块数组
	var brickArr = [];//非转
	var startI = 0;
	positionX = startX;
	positionY = startY;
	var grade = 0;//等级
	var gradelabal = 5;
	var difficult ;//难度数组
	var addScore = ["五星能量站","百人企业"];
	var renScore = ["一星能量站","企业不足30人"];
	player = null; // 人
	myTimer = null; //循环时间
	
	
	$.get('json/difficulty.json',function(data){
		difficult = data.diff;
	   //每次增加砖头+砖头往下掉		
	    myTimer = new LTimer(difficult[grade][1], 0);
	    grade++;
	    myTimer.addEventListener(LTimerEvent.TIMER,function(){
	    	
	    	if(player.index-startI<=3)
		    {
		    	setBrick(winLeft,winRight,brickLayer,score,delayTime,brickArray,brickArr);
		    	brickArr[startI].fall(0.5,500);
		    	brickArray[startI].fall(0.5,500);
		    	LTweenLite.to(brickLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
				LTweenLite.to(perLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
	    		startI++;
	    		if(grade<gradelabal)
	    		{
	    			if(startI>difficult[grade][0])
		    		{
		    			myTimer.delay = difficult[grade][1];
		    			grade++;
		    		}
	    		}
	    		
	    		
	    	}
	    });
	    

	   	
	    //设置人+砖头
		set(startNumber,winLeft,winRight,brickLayer,perLayer,score,delayTime,brickArray,brickArr);
		
		//左点击事件
	    var leftClick = new LSprite();
	    backLayer.addChild(leftClick);
	    leftClick.graphics.drawRect(0,'#000000',[0,0,LGlobal.width/2,LGlobal.height],false,'#000000');
	    leftClick.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
	    	
	    	if(player.status==true)
	    	{
	    		player.index++;
	    		player.y -= 62;
		    	player.x -= 50;
		    	player.bitmap1.visible =  false;
		    	player.bitmap.visible = true;
		    	if(Math.random()>0.5)
		    	{
		    		var rnd = 1;
		    	}else{
		    		var rnd = 0;
		    	}
				//判断是否在砖块上面
		    	if(player.shape.hitTestObject(brickArray[player.index]))
		    	{
		    		scc.childList[1].childList["0"].text += parseInt(brickArray[player.index].score);
		    		player.removeBmp();
		    		player.show(addScore[rnd]+' +'+parseInt(brickArray[player.index].score));
		    	}
		    	else if(player.shape.hitTestObject(brickArr[player.index])&&brickArr[player.index].visible!=false)
	    		{
	    			scc.childList[1].childList["0"].text += parseInt(brickArr[player.index].score);
	    			player.removeBmp();
	    			player.show(renScore[rnd]+' -'+parseInt(brickArr[player.index].score));
	    		}else{
	    			player.fall(0.5,400);
	    		} 
		    	if(player.index-startI>3)
		    	{
		    		setBrick(winLeft,winRight,brickLayer,score,delayTime,brickArray,brickArr);
		
		    		brickArr[startI].fall(0.5,500);
		    		brickArray[startI].fall(0.5,500);
		    		LTweenLite.to(brickLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
					LTweenLite.to(perLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
	    			startI++;
	    			if(grade<gradelabal)
		    		{
		    			if(startI>difficult[grade][0])
			    		{
			    			myTimer.delay = difficult[grade][1];
			    			grade++;
			    		}
		    		}
		    	}
	    	}
	    	
	    });
	    //右点击事件
	    var rightClick = new LSprite();
	    backLayer.addChild(rightClick);
	    rightClick.graphics.drawRect(0,'#000000',[LGlobal.width/2,0,LGlobal.width/2,LGlobal.height],false,'#000000');
	    rightClick.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
	    	if(player.status==true)
	    	{
		    	player.index++;
		    	player.y -= 62;
		    	player.x += 50;
		    	player.bitmap1.visible = true;
		    	player.bitmap.visible = false;
		    	if(Math.random()>0.5)
		    	{
		    		var rnd = 1;
		    	}else{
		    		var rnd = 0;
		    	}
		    	//判断是否在砖块上面
		    	if(player.shape.hitTestObject(brickArray[player.index]))
		    	{
		    		
		    		scc.childList[1].childList["0"].text += parseInt(brickArray[player.index].score);
		    		player.removeBmp();
		    		player.show(addScore[rnd]+' +'+parseInt(brickArray[player.index].score));
		    	}
		    	else if(player.shape.hitTestObject(brickArr[player.index])&&brickArr[player.index].visible!=false)
	    		{
	    			scc.childList[1].childList["0"].text += parseInt(brickArr[player.index].score);
	    			player.removeBmp();
	    			player.show(renScore[rnd]+' -'+parseInt(brickArr[player.index].score));
	    		}else{
	    			player.fall(0.5,400);
	    		}    	
		    	if(player.index-startI>3)
		    	{
		    		setBrick(winLeft,winRight,brickLayer,score,delayTime,brickArray,brickArr);
		    		brickArr[startI].fall(0.5,500);
		    		brickArray[startI].fall(0.5,500);
		    		LTweenLite.to(brickLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
					LTweenLite.to(perLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
	    			startI++;
	    			if(grade<gradelabal)
		    		{
		    			if(startI>difficult[grade][0])
			    		{
			    			myTimer.delay = difficult[grade][1];
			    			grade++;
			    		}
		    		}
		    	}
		    }
	    });
	    //提示
		var tip = new LSprite();
		tip.graphics.drawRect(0, "#000000", [0, 0, LGlobal.width, LGlobal.height], true, "rgba(0,0,0,0.5)");
		tip.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
			tip.removeEventListener(LMouseEvent.MOUSE_DOWN);
			
			player.status = true;
			myTimer.start();
			tip.remove();
		});
		backLayer.addChild(tip);
		var lhand = getBitmap(imgList['lhand']);
		lhand.y = 970;
		lhand.x = 78;
		tip.addChild(lhand);
		LTweenLite.to(lhand,0.7,{x:48,y:1000,loop:true}).to(lhand,0.7,{x:58,y:970});
		
		var rhand = getBitmap(imgList['rhand']);
		rhand.y = 970;
		rhand.x = 493;
		tip.addChild(rhand);
		LTweenLite.to(rhand,0.7,{x:523,y:1000,loop:true}).to(rhand,0.7,{x:493,y:970});
	});   
}
//设置砖头
function setBrick(controlLeft,controlRight,Lspite,score,delay,brickArray,arr){
	//砖头相对变量
	var brWidth = 50;
	var brHeight = 62;
	var blWidth = 50;
	var blHeight = 62;
	var px;
	var py;
	var pr = 0.7;
	var rdom = Math.random();
	px = positionX;
	py = positionY;
	//随机分数
	n = brickArray.length;
	if(positionX + brWidth > controlRight) {
		positionX -= blWidth;
		positionY -= blHeight;
		brickArray[n - 1].increment = blHeight;
		if(rdom > pr) {
			px += brWidth;
			py -= brHeight;
		}
	} else if(positionX - blWidth < controlLeft) {
		positionX += brWidth;
		positionY -= brHeight;
		brickArray[n - 1].increment = brHeight;
		if(rdom > pr) {
			px -= blWidth;
			py -= blHeight;
		}
	} else {
		var rd = Math.random();
		if(rd > 0.5) {
			positionX += brWidth;
			positionY -= brHeight;
			brickArray[n - 1].increment = brHeight;
			if(rdom > pr) {
				px -= blWidth;
				py -= blHeight;
			}
		} else {
			positionX -= blWidth;
			positionY -= blHeight;
			if(rdom > pr) {
				px += brWidth;
				py -= brHeight;
			}
			brickArray[n - 1].increment = blHeight;
		}
	}
	var bscore = 1+parseInt(Math.random()*(maxNum-1));
	brickArray[n] = new brick(positionX, positionY, bscore, delay,0,n,'brick');
	Lspite.addChild(brickArray[n]);
	if(rdom > pr) {
		var bscore = -1+parseInt(Math.random()*(minNum+1));
		arr[n] = new brick(px, py, bscore, delay, 0, n, 'brick1');
		arr[n].increment = brHeight;
		Lspite.addChild(arr[n]);
	} else {
		arr[n] = new brick(px, py, score, delay, 0, n, 'brick1');
		arr[n].increment = brHeight;
		arr[n].visible = false;
		Lspite.addChild(arr[n]);
	}
}
//设置初始的数据
function set(n,controlLeft,controlRight,Lspite,pLayer,score,delay,brickArray,arr){
	/*
	 * n为初始化时层数
	 * controlLeft为层数的距离最左边的距离
	 * controlRight为层数的距离最右边的距离
	 * Lspite为砖头层
	 * pLayer为人物层
	 * score为得分
	 * delay为延迟时间
	 * brickArray为砖头数组
	 * people为人物
	 */
	
	//砖头相对变量
	var brWidth = 50;
	var brHeight = 62;
	var blWidth = 50;
	var blHeight = 62;
	var renOffsetX = -10;
	var renOffsetY =90;
	var px;
	var py;
	var pr = 0.7;
	for(var i = 0; i < n; i++) {
		var rdom = Math.random();
		px = positionX;
		py = positionY;
		if(i == 0) {
			brickArray[i] = new brick(positionX, positionY,score,delay,0,i,'brick');		
			player = new person(positionX-renOffsetX, positionY-renOffsetY,0)
			Lspite.addChild(brickArray[i]);
			pLayer.addChild(player);
			arr[i] = new brick(px, py,score,delay,0,i,'brick1');
			arr[i].increment = blHeight;
			Lspite.addChild(arr[i]);
			arr[i].visible = false;
		} else {
			if(positionX + brWidth > controlRight) {
				positionX -= blWidth;
				positionY -= blHeight;
				brickArray[i-1].increment = blHeight;
				if(rdom>pr)
				{
					px += brWidth;
					py -= brHeight;
				}
			} else if(positionX - blWidth < controlLeft) {
				positionX += brWidth;
				positionY -= brHeight;
				brickArray[i-1].increment = brHeight;
				if(rdom > pr) {
					px -= blWidth;
					py -= blHeight;
				}
			} else {
				var rd = Math.random();
				if(rd > 0.5) {
					positionX += brWidth;
					positionY -= brHeight;
					brickArray[i-1].increment = brHeight;
					if(rdom>pr)
					{
						px -= blWidth;
						py -= blHeight;
					}
				} else {
					positionX -= blWidth;
					positionY -= blHeight;
					if(rdom>pr)
					{
						px += brWidth;
						py -= brHeight;
					}
					brickArray[i-1].increment = blHeight;	
				}
			}	
			var bscore = 1+parseInt(Math.random()*(maxNum-1));
			brickArray[i] = new brick(positionX, positionY,score,delay,0,i,'brick');
			Lspite.addChild(brickArray[i]);
			if(rdom>pr)
			{
				var bscore = -1+parseInt(Math.random()*(minNum+1));
				arr[i] = new brick(px, py,score,delay,0,i,'brick1');
				arr[i].increment = blHeight;
				Lspite.addChild(arr[i]);
			}else{
				arr[i] = new brick(px, py,score,delay,0,i,'brick1');
				arr[i].increment = blHeight;
				Lspite.addChild(arr[i]);
				arr[i].visible = false;
			}
		}
	}
}

function scoreBacks(x,y,score){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;//横坐标
	self.y = y;//纵坐标
	//图片
	self.bitmap = getBitmap(imgList['scoreBack']);
	self.addChild(self.bitmap);
	self.txt = new setText(210,54,32,score,'#ecb908',true);
	self.addChild(self.txt);
}
