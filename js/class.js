//砖头类
function brick(x,y,score,delayTime,increment,index){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;//横坐标
	self.y = y;//纵坐标
	self.index = index;//标示
	self.score = score;//分数
	self.increment = increment;//增量
	//图片
	self.bitmap = getBitmap(imgList['brick']);
	self.addChild(self.bitmap);
	//延迟的时间
	self.delay = delayTime;
}
brick.prototype.fall=function(time,y){
	var self = this;
	//判断人是否在掉下的砖块上面
	if(self.index == player.index)
	{
		LTweenLite.to(player,time,{y:player.y+y,onComplete:function(){

		}});
		player.status = false;
		myTimer.destroy();

	}
	
	LTweenLite.to(self,time,{y:self.y+y,delay:self.delay,onComplete:function(){
		self.remove();
	}});
}

//ren
function person(x,y,index,status)
{
	base(this,LSprite,[]);
	var self = this;
	self.x = x;//横坐标
	self.y = y;//纵坐标
	self.index = index;//位置
	self.status = status;//是否开启点击
    var data = new LBitmapData(imgList['ren'],0,0,65,85);
    self.bitmapleft = new LBitmap(data);
    self.addChild(self.bitmapleft);
    var data1 = new LBitmapData(imgList['ren'],0,85,65,85);
    self.bitmapRight = new LBitmap(data1);
    self.addChild(self.bitmapRight);
    self.bitmapRight.visible = false;
}
person.prototype.fall = function(time,increment){
	var self = this;
	self.status = false;
	LTweenLite.to(self,time,{y:self.y+increment,onComplete:function(){
		self.remove();
		myTimer.destroy();
//		gameStart();
	}});
}
person.prototype.setLeft = function(){
	var self = this;
	self.bitmapleft.visible = true;
	self.bitmapRight.visible = false;
}
person.prototype.setRight = function(){
	var self = this;
	self.bitmapleft.visible = false;
	self.bitmapRight.visible = true;
}