;(function(){
	document.addEventListener('DOMContentLoaded',function(){
		
		var $classify = $('.classify');
		var $navmorelist = $('.navmorelist');
		//点击头部分类显示隐藏
		$classify.on('tap',function () {
			console.log("i")
			$navmorelist.toggle();
		});
		//获取到数据的最外围
		var $content = $("#content");
		//创建一个ul；
		var $ul = $('<ul/>');
		$.ajaxSetup({
			url:"../data/json.json",
			dataType:'json',
			success:function(res){		
				$.each(res,function(index,item){
					if (index=='coffers') {
						$.each($(this), function(index,item) {    
							for (var i=0;i<25;i++) {
								var $li= $('<li/>');
								$('<span/>').html(item.income).appendTo($li);
								$('<span/>').html(item.surplus).appendTo($li);
								$('<span/>').html(item.remark).appendTo($li);
								$('<span/>').html(item.time).appendTo($li);
								$li.appendTo($ul);
							}												
						});
					}
				})
				$ul.appendTo($content);					
			}
		});
		$.ajax();
		var i=0
		$(window).on('scroll',function(){
			var scrollTop = $(window).scrollTop();
			if (scrollTop>=$(document).height()-$(window).height()-300) {
				i++;
				if (i<3) {
					$.ajax();
				}
				
			}
		});
	});
})();
