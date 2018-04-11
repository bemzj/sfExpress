//砖头类
function brick(x,y,score,delayTime,increment,index){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;//横坐标
	self.y = y;//纵坐标
	self.index = index;
	self.increment = increment;
	//图片
	self.bitmap = getBitmap(imgList['brick']);
	self.addChild(self.bitmap);
	//延迟的时间
	self.delay = delayTime;
}
brick.prototype.fall=function(time,y){
	var self = this;
	if(self.index == player.index)
	{
		console.log(1);
		LTweenLite.to(player,time,{y:player.y+y,onComplete:function(){
//			gameStart();
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
	var list = LGlobal.divideCoordinate(130,85,1,2);
    var data = new LBitmapData(imgList['ren'],0,0,75,85);
    self.bitmap = new LAnimation(self,data,list);
	//图片
	self.addChild(self.bitmap);
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
