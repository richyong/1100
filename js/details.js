;(function () {
	document.addEventListener('DOMContentLoaded',function () {
		
		var slide = document.querySelector('.swiper-wrapper')
		var carImg = slide.querySelectorAll('img');
		var $classify = $('.classify');
		var $navmorelist = $('.navmorelist');
		var $goodId = localStorage.getItem("id");
		var $itemTitle = $(".item-title");
		var $joinCart = $(".joinCart");
		var $itemCount = $(".item-count");
		
		//图片高度与宽度一样
		$(carImg).each(function (idx,item) {
			item.style.height = item.width + "px";
		});
		//点击头部分类显示隐藏
		$classify.on('singleTap',function () {
			$navmorelist.toggle();
		});
		
		//生成商品信息
		$.ajax({
			url:"../data/list.json",
			dataType:"json",
			success:function (res) {
				$.each(res,function (idx,item) {
					if ($goodId == item.id) {
						$("<span></span>").html(item.title).appendTo($itemTitle);
						$("<span></span>").html(item.price).appendTo($itemTitle);
						
						var goodlist = localStorage.getItem('goodlist');
						goodlist = goodlist ? JSON.parse(goodlist) : [];
						
						var num = 0;
						//加入购物车
						$joinCart.on("tap",function () {
							var goods = {};
							var j = true
							for (var i=0; i<goodlist.length;i++) {//遍历数组
								if (goodlist[i].id == item.id) {//如果有同样的商品时只改变数量
									goodlist[i].num = parseInt(goodlist[i].num) + 1;
									j = false;
									break;
								}
							}
							if (j) {//没有相同的商品时添加
								goods.id = item.id;
								goods.src = item.src;
								goods.price = item.price;
								goods.title = item.title;
								goods.num = 1;
								goodlist.push(goods);
							}
							//存入本地
							localStorage.setItem("goodlist",JSON.stringify(goodlist));
						});
						for (var i=0; i<goodlist.length;i++) {
							num += parseInt(goodlist[i].num);
						}
						//详情页展示购物车商品数量
						$itemCount.html(num);
					}
				});
			}
		});
		
		//评论
		$.ajax({
			url:"../data/json.json",
			dataType:"json",
			success:function (res) {
				$.each(res,function (idxs,items) {
					if (idxs == 'comment') {
						var $review = $(".review");
						var $ul = $("<ul></ul>");
						$.each($(this),function (i,ele) {
							var $li = $("<li></li>");
							var $divTop = $("<div></div>").addClass('review-top');
							var $divBottom = $("<div></div>").addClass('review-bottom');
							$("<img />").attr({src:ele.img}).appendTo($divTop);
							$("<span></span>").html(ele.name).appendTo($divTop);
							$("<time></time>").html(ele.time).appendTo($divTop);
							$("<i></i>").addClass("iconfont icon-wujiaoxing").appendTo($divBottom);
							$("<i></i>").addClass("iconfont icon-wujiaoxing").appendTo($divBottom);
							$("<i></i>").addClass("iconfont icon-wujiaoxing").appendTo($divBottom);
							$("<i></i>").addClass("iconfont icon-wujiaoxing").appendTo($divBottom);
							$("<i></i>").addClass("iconfont icon-wujiaoxing").appendTo($divBottom);
							$("<span></span>").html(ele.comment).appendTo($divBottom);
							$("<span></span>").html("购买日期：").appendTo($divBottom);
							$("<time></time>").html(ele.buyTime).appendTo($divBottom);
							
							$divTop.appendTo($li);
							$divBottom.appendTo($li);
							$li.appendTo($ul);
						});
						$ul.appendTo($review);
					}
				});
			}
		});
		
	});
})();
