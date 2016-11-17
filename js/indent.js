;(function () {
	document.addEventListener('DOMContentLoaded',function(){
	
		//1.初始化页面
		var $orders = $('div#orders');			//取得订单内容框
		var $eA = $('#menu').find('a');			//取得a标签数组
		Delbtn();							
		
		
		var $classify = $('.classify');
		var $navmorelist = $('.navmorelist');
		$classify.on('singleTap',function () {
			$navmorelist.toggle();
		});
		
		//遍历每个a标签
		$eA.each(function(index){
			
			var $self = $(this);
			//为每个a标签绑定点击事件
			$self.on("singleTap",function(event){
				event.preventDefault();						//阻止a标签默认行为[a标签href属性要写'#'号，不然不起作用]
				//1.)点击获得高亮并设置标题
				$self.addClass('active').siblings().removeClass('active');
				$('div.title').text( $self.text()+'订单');
				//2.)向服务器请求数据
				aJax();
			});
		});
			
		
		//3.封装$ajax请求函数
		function aJax(){
			
			$.ajax({
				type:"get",
				url:"/data/orders-c.json",
				dataType:"",
				success:function(res){
					//1)遍历请求回来的数据
					$(res).each(function(){
						var $self = this;
						console.log(this);
						var $goodsCl = $('.goods').first().clone();
						$goodsCl.removeClass('g-curr');
						//设置店铺
						$goodsCl.find('span.s-dp').text($self.store);
						//设置交易状态
						$goodsCl.find('span.s-gt').text($self.trade);
						//设置图片路径
						$goodsCl.find('img.g-img').attr({src:$self.imgurl});
						//设置商品信息
						$goodsCl.find('span.s-tle').text($self.title);
						//设置商品价格
						$goodsCl.find('span.e-jg').text($self.rmb);
						//设置商品数量
						$goodsCl.find('span.e-sl').text($self.shul);
						//设置商品件数
						$goodsCl.find('span.s-sl').text($self.shul);
						//3).设置商品总价格
						//计算商品总价格
						var sum = parseInt($self.shul)*parseInt($self.rmb);
						$goodsCl.find('b.b-rmb').text(sum);
						//将订单追加到页面
						$goodsCl.appendTo($orders);
					});
					//2)为每个删除按钮绑定点击事件
					Delbtn();
				}
			});
		}
		
		//2.封装删除按钮函数
		function Delbtn(){
		//'删除订单'按钮
			var $btnDel= $('div.btn-menu').find('.btnDel');			//取得所有删除按钮
			$btnDel.each(function(){
				//为每个按钮绑定点击事件
				$(this).on("singleTap",function(){
					//点击之后删除订单
					$(this).parents('.goods').remove();
				});
			});
		}	
	});
})();
