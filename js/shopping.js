;(function () {
	document.addEventListener('DOMContentLoaded',function(){
		var total;
		var ouit = 0;
		var $classify = $('.classify');
		var $navmorelist = $('.navmorelist');
		// 	/****************勾选*********************/
	 	var $gouxuan = $('.gouxuan');
	 	var $quanxuan = $('.quanxuan');
	 	//点击头部分类显示隐藏
		$classify.on('singleTap',function () {
			$navmorelist.toggle();
		});
	 	
		/*购物车*/
		var $list_Ul = $('.list_Ul');
		var datalist = localStorage.getItem('goodlist');
		datalist = datalist ? JSON.parse(datalist) : [];
			//遍历
		$.each(datalist, function(idx,ele) {
			var $li = $('<li></li>').addClass('list_Li');
			var $div = $('<div></div>').addClass('list_box');
			var $div1 = $('<div></div>').addClass('list_box1');
			var $div2 = $('<div></div>').addClass('list_box2');
			var $div3 = $('<div></div>').addClass('list_box3');
			
			var $span1 = $('<span></span>').addClass("iconfont icon-yuan gouxuan");
			
			var $span2 = $('<img/>').attr("src",ele.src).addClass('myImg');
			var $span3 = $('<span></span>').html(ele.title).addClass('list_box2_name');
			var $span4 = $('<span></span>').html("&yen"+ele.price).addClass('list_box2_prices');
			
			var $span5 = $('<span></span>').addClass('iconfont icon-jianhao jian');
			var $span6 = $('<span></span>').addClass('quantity').html(ele.num);
			var $span7 = $('<span></span>').addClass('iconfont iconfont icon-jiahao jia');
			var $span8 = $('<span></span>').addClass('iconfont iconfont icon-lajixiang shan_chu');
			
			//添加到小的div1
			$span1.appendTo($div1);
			
			//添加到div2
			$span2.appendTo($div2);
			$span3.appendTo($div2);
			$span4.appendTo($div2);
			
			//添加到div3
			$span5.appendTo($div3);
			$span6.appendTo($div3);
			$span7.appendTo($div3);
			$span8.appendTo($div3);
			
			//添加到大的div
			$div1.appendTo($div);
			$div2.appendTo($div)
			$div3.appendTo($div)
			
			//添加到li
			$div.appendTo($li);
			//添加到ul
			$li.appendTo($list_Ul);
	
			//商品加减
			var $total_prices = $('.total_prices');
			$span7.on('tap',function(){
	
				$span6.html(parseInt($span6.html())+1);			
				$span7.css("background-color","#595959");
				total = parseInt($span6.html());
				
				datalist[idx].num = parseInt($span6.html());
				localStorage.setItem("goodlist",JSON.stringify(datalist));
				ouits();
			});
			
			$span5.on('tap',function(){
				
				if ($span6.html()<=1) {
					$span6.html()==1;
					$span5.css("background-color","#FFFFFF");
				}else{
					$span5.css("background-color","#595959");
					$span7.css("background-color","#FFFFFF");
					$span6.html(parseInt($span6.html())-1);
					total = parseInt($span6.html());	
				}
				
				
				datalist[idx].num = parseInt($span6.html());
				localStorage.setItem("goodlist",JSON.stringify(datalist));
				ouits();
				
			});
		    
		    $span1.on("tap",function () {
		    	if ($(this).is('.icon-yuan')) {
					$(this).removeClass('icon-yuan');
					$(this).addClass('icon-right');
					
	   			}else{
	   				$(this).addClass('icon-yuan');
	   				$(this).removeClass('icon-right');
	   				$quanxuan.addClass('icon-yuan');
	   				$quanxuan.removeClass('icon-right');
	   			};
			    ouits();
		    });
		    
		    $span8.on('tap',function () {
		    	datalist.splice(idx,1);
		    	localStorage.setItem("goodlist",JSON.stringify(datalist));
		    	$li.remove();
		    });
		    
		});	
		
		
		
		
			// 	/****************勾选*********************/
			var $total_prices = $('.total_prices');
		 	var $gouxuan = $('.gouxuan');
		 	var $quanxuan = $('.quanxuan');
			function ouits () {
				
			
			 	ouit = 0;
			 	var j = true;
			 	$.each($gouxuan,function(idx,ele){
					if ($(this).is('.icon-right')) {
						ouit += datalist[idx].price*datalist[idx].num;
						$total_prices.html("("+(ouit)+")");
						j = false;
						
						var $affirm = $('#affirm');
					    $affirm.on('tap',function(){
								$(this).attr({href:"indent.html"});
					    });
					}
				});
				if (j) {
					$total_prices.html("");
				}
			}
						
		 	//全选	
		 	$quanxuan.on('tap',function(){
				
		 		if ($quanxuan.is('.icon-yuan')) {
		 			$(this).removeClass('icon-yuan');
		 			$(this).addClass('icon-right');
					
		 			 $.each($gouxuan,function(idx,ele){
		 			 	$(this).removeClass('icon-yuan');
		 				$(this).addClass('icon-right');	
		 			 });
		 			 ouits();
		 		}else{
		 			$(this).addClass('icon-yuan');
		 			$(this).removeClass('icon-right');
					
		   			 $.each($gouxuan,function(idx,ele){
		   			 	$gouxuan.addClass('icon-yuan');
		   				$gouxuan.removeClass('icon-right');
		   			 });
		   			 ouits();
		   		}
		 		
		   });
		    	
	});
})();
