;(function () {
	document.addEventListener('DOMContentLoaded',function () {
		//生成productlist结构
		$.ajaxSetup({
			url:"data/json.json",
			dataType:"json",
			success:function (res) {
				$.each(res, function(idx,item) {
					if (idx == 'home_page') {
						var $productList =  $(".productlist");
						$.each($(this),function (idxs,items) {
							var $div = $('<div></div>')
							$("<div></div>").addClass('proimg').append($("<a></a>").attr({href:"#"}).append($('<img />').attr({src:items.src}))).appendTo($div);
							$("<div></div>").addClass('item-title').append($("<span></span>").html(items.name)).append($("<br />")).append($("<span></span>").html("价格：")).append($("<span></span>").html("￥"+items.integral)).appendTo($div);
							$div.appendTo($productList);
						});
					}
				});
			}
		});
		$.ajax();
		var $backTop =$(".backTop")
		$backTop.on('singleTap',function () {
			$("html body").animate({scrollTop:0});
		});
		
		//滚动事件
		$(window).on('scroll',function () {
			//滚动条滚动到某个值时回到顶部按钮出现
			if ($(document).scrollTop() > $(window).innerHeight()) {
				$backTop.show();
			}else{
				$backTop.hide();
			}
			//懒加载
			if ($(document).height()-$(document).scrollTop()-$(window).innerHeight() < 130) {
				$.ajax();
			}
		});
	});
})();
