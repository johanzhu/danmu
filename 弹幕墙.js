$(document).ready(function(){
/*引入野狗、用本地存储内容进行渲染*/
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
		if(videoSecond < 10){
			videoSecond = '0'+videoSecond;
		}
		var VTime = videoMinute+':'+videoSecond;
		
		
/*创建历史弹幕记录（本地存储）*/
		localStorage.danmu = '<div class="history"><div class="time">'+VTime+'</div><div class="content">'+ text +'</div><div class="date">'+month+"-"+day+' '+hour+':'+minute+'</div></div>';
		$('.bullet').append(localStorage.getItem('danmu'));
		localStorage.danmu = $('.bullet').html();
		/*创建视频中的弹幕*/
		var randomTop = RandomNum(20,170);
		var instantBullet = '<div class="floatBullet" style="top:'+randomTop+'px'+'">'+text+'</div>';
		
		$(instantBullet).appendTo($('.border'));
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
/*定义清屏按钮，点击后清除所有的本地存储*/
	$('.clean').click(function(){
		$('.history').html('');
		window.localStorage.clear();
	});
	
/*获取弹幕发送时间数组与弹幕内容数组（取自存储记录）*/
    var delayTimeArr = [];
    var contentArr = [];
    var historyTime = $('.bullet').find('.time');
	var nodeContent = $('.bullet').find('.content');
	for(var i = 0;i < historyTime.length;i++){
			 var timeArr = historyTime[i].innerHTML;
			 var contentText = nodeContent[i].innerHTML;
			 var tenMinute = parseInt(timeArr.charAt(0));
			 var oneMinute = parseInt(timeArr.charAt(1));
			 var tenSecond = parseInt(timeArr.charAt(3));
			 var oneSecond = parseInt(timeArr.charAt(4));
			 var delayTime = ((tenMinute * 10 + oneMinute) * 60 +(tenSecond * 10 + oneSecond))*1000;
			 delayTimeArr.push(delayTime);
			 contentArr.push(contentText);
	    }
	/*把两个数组结果打印出来看是否出错*/
	     console.log(delayTimeArr);
	     console.log(contentArr);
         var randomTop = RandomNum(20,90);
/*给播放加监听事件，当开始播放后执行下面事件 = 根据存储的历史弹幕来发射屏幕上的弹幕*/     
	$('video')[0].addEventListener('play',function(){
		for(var i = 0;i < delayTimeArr.length;i++){
	    	//(由于要传递num所以这个就废弃了)var  floatHistory = '<div class="floatBullet" style="top:'+randomTop+'px'+'">'+contentArr[i]+'</div>';
	    	//console.log(floatHistory);（下面创建闭包函数以读取for循环内的数值
	    	/*延迟发射弹幕，延迟时间与弹幕内容读取自本地存储，也久是上述数组取的内容*/
	    	(function(num){
	    	setTimeout(function(){
	    		$('<div class="floatBullet" style="top:'+randomTop+'px'+'">'+contentArr[num]+'</div>').appendTo($('.border'));
	    	},delayTimeArr[i]);
	        })(i);//闭包函数结束	
	    	
		}//for循环结束   
	});
	

	
			        
/*取范围内的数字（用于弹幕的随机高度）*/
function RandomNum(Min,Max){
var Range = Max - Min;
var Rand = Math.random();   
var num = Min + Math.round(Rand * Range);
return num;
}
});/*JS结束*/
