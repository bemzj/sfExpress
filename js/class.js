//砖头类
function brick(x,y,score,delayTime,increment,index,names){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;//横坐标
	self.y = y;//纵坐标
	self.index = index;
	self.score = score;
	self.increment = increment;
	//图片
	self.bitmap = getBitmap(imgList[names]);
	self.addChild(self.bitmap);
	//延迟的时间
	self.delay = delayTime;
}
brick.prototype.fall=function(time,y){
	var self = this;
	if(self.index == player.index)
	{
		LTweenLite.to(player,time,{y:player.y+y,onComplete:function(){
			getResult(scc.childList[1].childList["0"].text);
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
//	var list = LGlobal.divideCoordinate(130,85,1,2);
//  var data = new LBitmapData(imgList['ren'],0,0,75,85);
//  self.bitmap = new LAnimation(self,data,list);  
	self.shape = new LSprite();
	self.shape.graphics.drawRect(0,"#ff0000",[0,110,80,10],"#ff0000",false);
	self.shape.alpha = 0;
	self.addChild(self.shape);
    self.bitmap = getBitmap(imgList['ren']);
	self.addChild(self.bitmap);
	self.bitmap1 = getBitmap(imgList['ren1']);
	self.bitmap1.visible = false;
	self.addChild(self.bitmap1);
}
person.prototype.fall = function(time,increment){
	var self = this;
	self.status = false;
	myTimer.destroy();
	LTweenLite.to(self,time,{y:self.y+increment,onComplete:function(){
		self.remove();	
		getResult(scc.childList[1].childList["0"].text);
	}});
}
person.prototype.removeBmp = function(){
	var self = this;
	if(self.bmp)
	{
		self.bmp.remove();
	}
}
person.prototype.show = function(text){
	var self = this;
	self.bmp  =  new mark(0,-30,text);
	
	self.bmp.x = (self.bitmap.getWidth() - self.bmp.getWidth())/2;
	self.addChild(self.bmp);
}
function mark(x,y,s){
	base(this,LSprite,[]);
	var self = this;
	self.x = x;//横坐标
	self.y = y;//纵坐标
	self.bitmap = getBitmap(imgList['scores']);
	self.bitmap.scaleX = 0.6;
	self.bitmap.scaleY = 0.6;
	self.addChild(self.bitmap);
	self.num = new setText(50,6,24,s,'#ff9600',true,true);
	self.addChild(self.num);
	LTweenLite.to(self,0.5,{y:y-40,onComplete:function(){
		self.remove(); 
	}});
}
