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
		/*定义本地存储来存储弹幕的DOM*/
		localStorage.danmu = '<div class="history"><div class="time">10:48</div><div class="content">'+ text +'</div><div class="date">'+month+"-"+day+' '+hour+':'+minute+'</div></div>';
		$('.bullet').append(localStorage.getItem('danmu'));
		localStorage.danmu = $('.bullet').html();
		$('.text').val("");
	});
	/*给input框添加回车事件，按回车等于点击！*/
	$(".text").keypress(function(event){
		/*键盘按下时，判断是否是回车，若是则触发发射的点击事件*/
		if(event.keyCode == "13"){
			$('.shoot').trigger('click');
		}
	});
	
	
	
	
	
});