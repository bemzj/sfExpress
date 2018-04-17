//分享
function sharing(){
	$('#share').remove();
	var html = "";
	html += '<div id="share" class="popw"><div class="share1"><img src="img/share1.png" /></div>';
	html += '<div class="share2 animated  bounceIn"><img src="img/share2.png" /></div><div class="share3">';
	html += '<img src="img/share3.png" /></div></div>';
	$('body').append(html);
	$('#share').one('touchstart',function(){
		$(this).remove();
	});
}
//没有机会求分享
function noChange(id,content,title){
	$('#nochange').remove();
	var html = "";
	html += '<div id="nochange" class="popw"><div class="nochange1 ">';
	html += '<img src="img/nochage1.png" class="animated bounceIn" /></div>';
	html += '<div class="nochange3 animated bounceInDown"><img src="img/nochage3.png" />';
	html += '<div class="noContent">';
	if(id==1)
	{
		html += '<p class="title">'+title+'</p>';
	}else{
		
	}
	html += '<p class="content">'+content+'</p></div></div>';
	html += '<div class="nochange2 animated slideInLeft"><img src="img/nochage2.png" /></div>';
	if(id==1)
	{
		html += '<a href="###" class="invite"><img src="img/nochage4.png" class=" animated fadeInUp"/></a>';
	}else{
		html += '<a href="###" class="nowInvite"><img src="img/nochage5.png" class=" animated fadeInUp"/></a>';	
	}			
	html += '</div>';
	$('body').append(html);
	if(id==1)
	{
		$('.invite').on('touchstart',function(){
			$('#nochange').remove();
			sharing();
		});
	}else{
		$('.nowInvite').on('touchstart',function(){
			$('#nochange').remove();
			sharing();
		});
	}
			
}
//显示排行版
function showList(){
	$('#sort').remove();
	var html = "";
	html += '<div id="sort"><div class="rank"><img src="img/sort9.png" /><div class="rankBox animated bounceInDown">';
	html += '<div><img src="img/sort7.png" /></div></div><div class="rankMan  animated slideInRight">';
	html += '<img src="img/sort8.png" /></div></div><div class="sortBack"><img src="img/sort10.png" /><div class="sortList">';
	html += '</div></div><a href="##" class="backHome  animated fadeInUp"><img src="img/sort6.png" /></a></div>';
	$('body').append(html);
	$.get('http://192.168.0.102/e/public/index.php/api/gamerApi/getRankingList',function(data){
		
		var data = JSON.parse(data);
		
		var inHmtl = "";
		inHmtl += '<div class="sortChild">';
		inHmtl += '<img src="img/sort0.png" />';
		inHmtl += '<span>'+data.curUser.ranking+'</span>';
		inHmtl += '<div class="head"><div class="headIn">'+data.curUser.open_face;
		inHmtl += '</div><div class="name"><p>'+data.curUser.open_name+'</p></div>';
		inHmtl += '</div><div class="money"><p>15321</p></div></div>';
		$('.sortList').append(inHmtl);
		var elseList = data.allUser;
		console.log(elseList);
		for(var i=0;i<elseList.length;i++)
		{
			inHmtl = "";
			if(elseList[i].ranking<5)
			{
				inHmtl += '<div class="sortChild sortc"><img src="img/sort'+elseList[i].ranking+'.png" />';
			}else{
				inHmtl += '<div class="sortChild sortc"><img src="img/sort5.png" />';
			}
			
			inHmtl += '<span>'+elseList[i].ranking+'</span><div class="head"><div class="headIn">';
			inHmtl += elseList[i].open_face+'</div><div class="name"><p>'+elseList[i].open_name+'</p>';
			inHmtl += '</div></div><div class="money">';
			if(parseInt(elseList[i].max_gold)>99999)
			{
				inHmtl += '<p style="font-size:0.26rem">'+elseList[i].max_gold+'</p>';
			}else{
				inHmtl += '<p>'+elseList[i].max_gold+'</p>';
			}
			inHmtl += '</div></div>';
			$('.sortList').append(inHmtl);
		}
	})
}
showRule();
//显示游戏规则
function showRule(){
	$('#rule').remove();
	var html = '';
	html += '<div id="rule"><div class="rule1 animated bounceInDown"><img src="img/rule1.png" /></div>';
	html += '<div class="rule2  animated rotateIn"><img src="img/rule2.png" /></div>';
	html += '<div class="rule3  animated bounceIn"><img src="img/rule3.png" /></div>';
	html += '<div class="rule4  animated slideInLeft"><img src="img/nochage2.png" /></div>';
	html += '<a href="###" class="rule5 "><img src="img/rule4.png" class=" animated fadeInUp" /></a>';
	html += '<div class="circle1"><img src="img/circle1.png" /></div>';
	html += '<div class="circle2"><img src="img/circle2.png" /></div>';
	html += '<div class="circle3"><img src="img/circle3.png" /></div>';
	$('body').append(html);
}
$(function(){
	
})
