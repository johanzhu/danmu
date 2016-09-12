$(document).ready(function(){
	/*引入野狗*/
	var ref =  new Wilddog("https://johandanmu.wilddogio.com/");
    $('.bullet').append(localStorage.getItem('danmu'));
	/*给发射！添加点击事件 */
	$(".shoot").click(function(){
		/*点击后把数据提交给野狗*/
		var text = $(".text").val();
		ref.child('danmu').push(text);
		var value 
		/*获取发送日期*/
		var date = new Date();
		var month = date.getMonth();
		if(month < 10){
			month = '0'+month;
		}
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		/*获取视频播放时间*/
		var videoTime = $('video')[0].currentTime;
		var videoMinute = Math.floor(videoTime/60);
		if(videoMinute < 10){
			videoMinute = '0'+videoMinute;
		}
		var videoSecond = Math.floor(videoTime % 60);
		if(videoSecond){
			videoSecond = '0'+videoSecond;
		}
		var VTime = videoMinute+':'+videoSecond;
		/*定义本地存储来存储弹幕的DOM*/
		localStorage.danmu = '<div class="history"><div class="time">'+VTime+'</div><div class="content">'+ text +'</div><div class="date">'+month+"-"+day+' '+hour+':'+minute+'</div></div>';
		$('.bullet').append(localStorage.getItem('danmu'));
		localStorage.danmu = $('.bullet').html();
		/*创建视频中的弹幕*/
		var randomTop = RandomNum(20,170);
		console.log(randomTop);
		$('<div class="floatBullet" style="top:'+randomTop+'px'+'">'+text+'</div>').appendTo($('.border'));
		/*清空输入框*/
		$('.text').val("");
	});
	/*给input框添加回车事件，按回车等于点击！*/
	$(".text").keypress(function(event){
		/*键盘按下时，判断是否是回车，若是则触发发射的点击事件*/
		if(event.keyCode == "13"){
			$('.shoot').trigger('click');
		}
	});
	/*定义清除*/
	$('.clean').click(function(){
		$('.history').html('');
		window.localStorage.clear();
	});
	/*待不全功能：历史弹幕，按日期显示弹幕，过长弹幕hover出现提示框*/
	
	
	/*取范围内的数字（用于弹幕的随机高度）*/
function RandomNum(Min,Max){
var Range = Max - Min;
var Rand = Math.random();   
var num = Min + Math.round(Rand * Range);
return num;
}
});/*JS结束*/