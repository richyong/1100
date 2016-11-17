;(function () {
	document.addEventListener('DOMContentLoaded',function(){
		
		var $classify = $('.classify');
		var $navmorelist = $('.navmorelist');
		
		//点击头部分类显示隐藏
		$classify.on('singleTap',function () {
			$navmorelist.toggle();
		});
		
		var arr = [];
		//1.验证昵称
		$('input.eName').blur(function(){
			var value = $(this).val();		//取得用户输入值
			var Reg = /^(\w|[\u4e00-\u9fa5]){4,12}$/;	//定义昵称正则对象
			
			if( Reg.test(value) == false ){
				//显示错误提示信息
				$("div.error").text("！昵称填写格式错误");
				//保存验证结果
				arr[0] = 0;
			}else{
				$("div.error").text("");
				arr[0]=1;
			}
		});
		//2.验证手机号
		$('input.ephone').blur(function(){
			var value = $(this).val();		//取得用户输入值
			var Reg = /^[1][3-9]\d{9}$/;	//定义昵称正则对象
			
			if( Reg.test(value) == false ){
				//显示错误提示信息
				$("div.error").text("！手机号格式错误");
				//保存验证结果
				arr[1] = 0;
			}else{
				$("div.error").text("");
				arr[1]=1;
			}
		});
		
		//3.点击提交按钮
		$('.btn').on('singleTap',function(event){
			 
			if( arr.length==0||arr[0]==0||arr[1]==0){
				event.preventDefault();
				$("div.error").text("！填写错误，请检查");
			}
			else if(arr[0]==1&&arr[1]==1){
				$("div.error").text("");
				//跳转
				window.location.href = "personal.html";
			}
			
		});
	});
})();
