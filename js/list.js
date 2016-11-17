;(function(){
	document.addEventListener('DOMContentLoaded',function(){
		$.ajaxSetup({
			url:"../data/list.json",
			dataType:'json',
			success:function(res){
//				循环3次
				for (var i=0;i<3;i++) {
					var $details = $('.details');
					var $box = $('#box')
					var $div = $('<div/>');			
					var $ul = $('<ul/>');
					$('<p/>').html("热门品牌").appendTo($div);					
					$.each(res, function(index,item){ 				
						 var $li=$('<li/>');
						 var $i = $('<i/>');
						 var $span = $('<span/>');				
						 $('<a/>').attr({href:item.url}).html('<img src="'+item.src+'"/>').appendTo($i);
						 $('<a/>').attr({href:item.url}).html(item.brand).appendTo($span);
						 $i.appendTo($li);
						 $span.appendTo($li);
						 $li.appendTo($ul);
						$li.on('tap',function(){
							localStorage.setItem("id",JSON.stringify(item.id));
						})						 
					})			
					$ul.appendTo($div);
					$div.appendTo($box);
				}										
			}			
		});
		$.ajax();
		// 懒加载效果
		// 给window绑定scroll事件，当差不多滚动到底部是加载更多内容
		var i=0;
		$(window).on('scroll',function(){
			// 获取滚动条滚动过的距离
			var scrollTop = $(window).scrollTop();
			console.log(scrollTop)
			// 当差不多滚动到底部是加载更多内容
			if(scrollTop >= $(document).height() - $(window).height() - 300){
				i++;
				if (i<4) {
					$.ajax();
				}			
			}		
		});
//		左侧nav的切换效果
		var $nav = $('#content').find('li');
		var $details = $('#box');
		$nav.on('click',function(){
			$details.fadeOut();
			setInterval(function(){
				$details.fadeIn();
			},500)
		});	
		var $classify = $('.classify');
		var $navmorelist = $('.navmorelist');
		//点击头部分类显示隐藏
		$classify.on('singleTap',function () {
			$navmorelist.toggle();
		});
	});
})();
