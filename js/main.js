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

//首页
function homepage(res){
	imgList = res;
	gameStart();
}
//开始游戏
function gameStart(){
	brickLayer = null;
	perLayer = null;
	backLayer.die();
	backLayer.removeAllChild();
	//设置首页背景
	var bitmap = getBitmap(imgList['shouye_bg']);
	backLayer.addChild(bitmap);
	//砖头层
 	brickLayer = new LSprite();
	backLayer.addChild(brickLayer);
	brickLayer.removeAllChild();
	
	//人物层
	perLayer = new LSprite();
	backLayer.addChild(perLayer);
	perLayer.removeAllChild();
	//初始数据
	var startX = 240; //砖头开始位置横坐标
	var startY = 760; //砖头开始位置纵坐标
	var startNumber = 20; //砖头数量
	var winLeft = 65; //可视区域左边距离
	var winRight = 560; //可视区域右边距离
	var delayTime = 0; //延迟时间
	var score = 1;//得分
	var people;//人
	var brickArray = [];//砖块数组
	var startI = 0;
	positionX = startX;
	positionY = startY;
	var grade = 0;//等级
	var difficult ;//难度数组
	player = null; // 人
	myTimer = null; //循环时间
	$.get('json/difficulty.json',function(data){
		difficult = data.diff;
		
		//每次增加砖头+砖头往下掉		
	    myTimer = new LTimer(difficult[grade][1], 0);
	    grade++;
	    myTimer.addEventListener(LTimerEvent.TIMER, function(){
	    	if(player.index-startI<=3)
		    {
		    	setBrick(winLeft,winRight,brickLayer,score,delayTime,brickArray);
		    	brickArray[startI].fall(0.5,500);
		    	LTweenLite.to(brickLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
				LTweenLite.to(perLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
	    		startI++;
	    		if(grade<5)
	    		{
	    			if(startI>difficult[grade][0])
		    		{
		    			myTimer.delay = difficult[grade][1];
		    			grade++;
		    		}
	    		}
	    		
	    		
	    	}
	    });
	    myTimer.start();
	    //设置人+砖头
		set(startNumber,winLeft,winRight,brickLayer,perLayer,score,delayTime,brickArray);
		//开启点击事件
		player.status = true;
		console.log(player);
		//左点击事件
	    var leftClick = new LSprite();
	    backLayer.addChild(leftClick);
	    leftClick.graphics.drawRect(0,'#000000',[0,0,LGlobal.width/2,LGlobal.height],false,'#000000');
	    leftClick.addEventListener(LMouseEvent.MOUSE_DOWN,function(){
	    	if(player.status==true)
	    	{
	    		player.index++;
	    		player.y -= 35;
		    	player.x -=  48;
		    	player.setLeft();
		    	//判断是否在砖块上面
				if(player.hitTestObject(brickArray[player.index]))
	    		{
					sum += brickArray[player.index].score;
	    		}else{
	    			player.fall(0.5,500);
	    			alert(sum);
	    		}
		    	if(player.index-startI>3)
		    	{
		    		setBrick(winLeft,winRight,brickLayer,score,delayTime,brickArray);
		    		brickArray[startI].fall(0.5,500);
		    		LTweenLite.to(brickLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
					LTweenLite.to(perLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
	    			startI++;
	    			if(grade<5)
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
		    	player.y -= 50;
		    	player.x += 34;
				player.setRight();
		    	//判断是否在砖块上面
		    	if(player.hitTestObject(brickArray[player.index]))
	    		{
	    			sum += brickArray[player.index].score;
	    		}else{
	    			player.fall(0.5,400);
	    		}    	
		    	if(player.index-startI>3)
		    	{
		    		setBrick(winLeft,winRight,brickLayer,score,delayTime,brickArray);
		    		brickArray[startI].fall(0.5,500);
		    		LTweenLite.to(brickLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
					LTweenLite.to(perLayer,0.1,{y:brickLayer.y+brickArray[startI].increment});
	    			startI++;
	    			if(grade<5)
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
	});   
}
//设置砖头
function setBrick(controlLeft,controlRight,Lspite,score,delay,brickArray){
	//砖头相对变量
	var brWidth = 34;
	var brHeight = 50;
	var blWidth = 48;
	var blHeight = 35;
	//随机分数
	score = randomScore(5,5);
	n = brickArray.length;
	if(positionX + brWidth > controlRight) {
		positionX -= blWidth;
		positionY -= blHeight;
		brickArray[n - 1].increment = blHeight;
	} else if(positionX - blWidth < controlLeft) {
		positionX += brWidth;
		positionY -= brHeight;
		brickArray[n - 1].increment = brHeight;
	} else {
		var rd = Math.random();
		if(rd > 0.5) {
			positionX += brWidth;
			positionY -= brHeight;
			brickArray[n - 1].increment = brHeight;
		} else {
			positionX -= blWidth;
			positionY -= blHeight;
			increment = blHeight;
			brickArray[n - 1].increment = blHeight;
		}
	}
	brickArray[n] = new brick(positionX, positionY, score, delay,0,n);
	Lspite.addChild(brickArray[n]);
}
//设置初始的数据
function set(n,controlLeft,controlRight,Lspite,pLayer,score,delay,brickArray){
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
	var brWidth = 34;
	var brHeight = 50;
	var blWidth =  48;
	var blHeight = 35;
	var renOffsetX = -2;
	var renOffsetY =61;	
	for(var i = 0; i < n; i++) {
		score = randomScore(5,5);
		if(i == 0) {
			brickArray[i] = new brick(positionX, positionY,score,delay,0,i);		
			player = new person(positionX-renOffsetX, positionY-renOffsetY,0)
			Lspite.addChild(brickArray[i]);
			pLayer.addChild(player);
		} else {
			if(positionX + brWidth > controlRight) {
				positionX -= blWidth;
				positionY -= blHeight;
				brickArray[i-1].increment = blHeight;
			} else if(positionX - blWidth < controlLeft) {
				positionX += brWidth;
				positionY -= brHeight;
				brickArray[i-1].increment = brHeight;
			} else {
				var rd = Math.random();
				if(rd > 0.5) {
					positionX += brWidth;
					positionY -= brHeight;
					brickArray[i-1].increment = brHeight;
				} else {
					positionX -= blWidth;
					positionY -= blHeight;
					increment = blHeight;
					brickArray[i-1].increment = blHeight;	
				}
			}	
			brickArray[i] = new brick(positionX, positionY,score,delay,0,i);
			Lspite.addChild(brickArray[i]);
		}
	}
	
}
