//图片路径
var url = "";
//图片集
var imgList;
var positionX; //砖头实时位置x
var positionY; //砖头实时位置y
var brickLayer;
var player;
var perLayer;
var myTimer;

var load0;
var loadLayer;
var loadBar;
//加载页面的图片
var loadImg = [
	{path:url+'img/back.jpg',type:'img',name:'back'},
	{path:url+'img/load0.png',type:'img',name:'load0'},	
	{path:url+'img/load1.png',type:'img',name:'load1'},	
	{path:url+'img/circle3.png',type:'img',name:'circle3'},	
	{path:url+'img/circle4.png',type:'img',name:'circle4'},	
	{path:url+'img/circle5.png',type:'img',name:'circle5'},	
	{path:url+'img/circle6.png',type:'img',name:'circle6'},	
];
//图片
var imgAll = [
	{path:url+'img/back.jpg',type:'img',name:'back'},
	{path:url+'img/gameBack.jpg',type:'img',name:'gameBack'},
	{path:url+'img/brick.png',type:'img',name:'brick'},
	{path:url+'img/brick1.png',type:'img',name:'brick1'},
	{path:url+'img/ren.png',type:'img',name:'ren'},
	{path:url+'img/music.png',type:'img',name:'music'},	//音乐
	{path:url+'img/share1.png',type:'img',name:'share1'},//分享
	{path:url+'img/share2.png',type:'img',name:'share2'},
	{path:url+'img/share3.png',type:'img',name:'share3'},
	{path:url+'img/circle1.png',type:'img',name:'circle1'},	//圆圈
	{path:url+'img/circle2.png',type:'img',name:'circle2'},	
	{path:url+'img/circle3.png',type:'img',name:'circle3'},	
	{path:url+'img/circle4.png',type:'img',name:'circle4'},	
	{path:url+'img/circle5.png',type:'img',name:'circle5'},	
	{path:url+'img/circle6.png',type:'img',name:'circle6'},	
	{path:url+'img/circle7.png',type:'img',name:'circle7'},	
	{path:url+'img/nochage1.png',type:'img',name:'nochage1'},	//没有机会
	{path:url+'img/nochage2.png',type:'img',name:'nochage2'},	
	{path:url+'img/nochage3.png',type:'img',name:'nochage3'},	
	{path:url+'img/nochage4.png',type:'img',name:'nochage4'},	
	{path:url+'img/nochage5.png',type:'img',name:'nochage5'},	
	{path:url+'img/rule1.png',type:'img',name:'rule1'},	//规则
	{path:url+'img/rule2.png',type:'img',name:'rule2'},	
	{path:url+'img/rule3.png',type:'img',name:'rule3'},	
	{path:url+'img/rule4.png',type:'img',name:'rule4'},	
	{path:url+'img/sort0.png',type:'img',name:'sort0'},
	{path:url+'img/sort1.png',type:'img',name:'sort1'},
	{path:url+'img/sort2.png',type:'img',name:'sort2'},
	{path:url+'img/sort3.png',type:'img',name:'sort3'},
	{path:url+'img/sort4.png',type:'img',name:'sort4'},
	{path:url+'img/sort5.png',type:'img',name:'sort5'},
	{path:url+'img/sort6.png',type:'img',name:'sort6'},
	{path:url+'img/sort7.png',type:'img',name:'sort7'},
	{path:url+'img/sort8.png',type:'img',name:'sort8'},
	{path:url+'img/sort9.png',type:'img',name:'sort9'},
	{path:url+'img/sort10.png',type:'img',name:'sort10'},
	{path:url+'img/home1.png',type:'img',name:'home1'},
	{path:url+'img/home2.png',type:'img',name:'home2'},
	{path:url+'img/home3.png',type:'img',name:'home3'},
	{path:url+'img/home4.png',type:'img',name:'home4'},
	{path:url+'img/home5.png',type:'img',name:'home5'},
	{path:url+'img/result1.png',type:'img',name:'result1'},
	{path:url+'img/result2.png',type:'img',name:'result2'},
	{path:url+'img/result3.png',type:'img',name:'result3'},
	{path:url+'img/result4.png',type:'img',name:'result4'},
	{path:url+'img/result5.png',type:'img',name:'result5'},
	{path:url+'img/resc1.png',type:'img',name:'resc1'},
	{path:url+'img/resc2.png',type:'img',name:'resc2'},
	{path:url+'img/resc3.png',type:'img',name:'resc3'},
	{path:url+'img/resc0.png',type:'img',name:'resc0'},
	{path:url+'img/scoreBack.png',type:'img',name:'scoreBack'},
	{path:url+'img/scores.png',type:'img',name:'scores'},
	{path:url+'img/ren1.png',type:'img',name:'ren1'},
	{path:url+'img/rhand.png',type:'img',name:'rhand'},
	{path:url+'img/lhand.png',type:'img',name:'lhand'},
];
//游戏初始化
LInit(1000 / 40, "fengE", 750, 1206, main);
//游戏入口主函数
function main() {
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT; //设置全屏变量
	LGlobal.screen(LStage.FULL_SCREEN); //设置全面适应
	backLayer = new LSprite(); //创建背景层
	addChild(backLayer); //添加背景层到游戏环境中
	LLoadManage.load(loadImg, "", loadImging);
}
//加载页面
function loadImging(res){
	//加载页面
	loadLayer = new　LSprite();
	backLayer.addChild(loadLayer);
	loadLayer.addChild(getBitmap(res['back']));
	var load1 = getBitmap(res['load1']);
	load1.x = rCenterWidth(load1);
	load1.y = 606;
	loadLayer.addChild(load1);
	load0 = getBitmap(res['load0']);
	
	load0.x = 113;
	load0.y = 606-load0.getHeight();
	loadLayer.addChild(load0);
	var circle3 = getBitmap(res['circle3']);
	circle3.x = 548;
	circle3.y = 685;
	loadLayer.addChild(circle3);
	bigAndSmall(circle3,2,2,1.0,0.2,0,true);
	var circle4 = getBitmap(res['circle4']);
	circle4.x = 219;
	circle4.y = 429;
	loadLayer.addChild(circle4);
	bigAndSmall(circle4,2,2,1.5,0.1,0,true);
	var circle5 = getBitmap(res['circle5']);
	circle5.x = 148;
	circle5.y = 668;
	loadLayer.addChild(circle5);
	LTweenLite.to(circle5,1.5,{rotate:360,loop:true,onComplete:function(){
		circle5.rotate = 0;
	}});
	var circle6 = getBitmap(res['circle6']);
	circle6.x = 412;
	circle6.y = 360;
	loadLayer.addChild(circle6);
	LTweenLite.to(circle6,2.0,{rotate:-360,loop:true,onComplete:function(){
		circle6.rotate = 0;
	}});
	var circle7 = getBitmap(res['circle6']);
	circle7.x = 350;
	circle7.y = 748;
	loadLayer.addChild(circle7);
	LTweenLite.to(circle7,3,{rotate:-360,loop:true,onComplete:function(){
		circle7.rotate = 0;
	}});
	
	loadBar = new LSprite();
	loadBar.graphics.drawRoundRect(0, "#000000", [157, 609, 0, 22, 11], true, "#ffa60d");
	loadLayer.addChild(loadBar);
	LLoadManage.load(imgAll,loadinging, startGame);
}
//加载函数
function loadinging(per){
	var n = parseInt(per);
	load0.x = 113+ n/100*340;
	loadBar.graphics.clear();
	loadBar.graphics.drawRoundRect(0, "#000000", [157, 609, 437*n/100, 22, 11], true, "#ffa60d");
}
