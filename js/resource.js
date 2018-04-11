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
//加载页面的图片
var loadImg = [
	{path:url+'img/shouye_bg.png',type:'img',name:'shouye_bg'},	
];
//图片
var imgAll = [
	{path:url+'img/shouye_bg.png',type:'img',name:'shouye_bg'},
	{path:url+'img/brick.png',type:'img',name:'brick'},
	{path:url+'img/ren.png',type:'img',name:'ren'},
];
//游戏初始化
LInit(1000 / 40, "fengE", 640, 1040, main);
//游戏入口主函数
function main() {
	LGlobal.stageScale = LStageScaleMode.EXACT_FIT; //设置全屏变量
	LGlobal.screen(LStage.FULL_SCREEN); //设置全面适应
	backLayer = new LSprite(); //创建背景层
	addChild(backLayer); //添加背景层到游戏环境中
	LLoadManage.load(loadImg, "", loadImging);
}
//加载页面
function loadImging(){
	LLoadManage.load(imgAll, "", homepage);
}


