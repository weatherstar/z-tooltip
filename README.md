ZTooltip
=========

自适应位置的弹出提示框

提示框默认出现顺序优先级：右上 -> 左上 -> 右下 -> 左下

一个例子：http://zhiyul.github.io/ZToolTip/

##init
	需要引入jPopuptip.js和jPopuptip.css文件

	<link rel="stylesheet" type="text/css" href="jPopuptip.css">
	<script type="text/javascript" src="jPopuptip.js"></script>

	<a class="btn" data-popuptip="show" data-content="这是个按钮!">more</a>
    <a class="btn" data-popuptip="show" data-triggle="click" data-content="你看到我了！">
		点击就能看到我
	</a>

	为需要弹出框的元素添加 data-popuptip="show"
	通过设置 data-triggle="click" 可为元素添加触独立触发方式
	通过设置 data-content="hello",为弹出框添加内容

    var p = new jPopuptip({
		width : 'auto',		//弹出框宽度，默认为auto
		height : 'auto',	//弹出框高度，默认为auto
        'boxOffsetX' : 20,	//弹出框偏移目标呢元素左/右边界距离，默认为20px
        'boxOffsetY' : 5,	//弹出框偏移目标呢元素上/下边界距离，默认为20px
        'arrowSize' : 10,	//弹出框偏箭头大小，默认10px
        'triggle' : 'hover'	//触发弹出框事件，默认为hover，可设置为click
	});

