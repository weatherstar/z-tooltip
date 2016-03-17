#ZTooltip

A simple tooltip made by pure javascript,working on most browsers includes IE6.

无任何依赖，兼容绝大部分浏览器包括IE6，很适合简单的活动页使用。tooltip显示时会自动调整出现位置以保证自身始终处于浏览器视口范围内。

##Introduction

[Demo](http://weatherstar.me/ZTooltip/)

Screenshot

![image](http://7xls2e.com1.z0.glb.clouddn.com/ztooltip-demo1.png)

![image](http://7xls2e.com1.z0.glb.clouddn.com/ztooltip-demo2.png)

![image](http://7xls2e.com1.z0.glb.clouddn.com/ztooltip-demo3.png)



##Install

```
$ npm install ztooltip
```

##Usage

###HTML

```HTML
<link rel="stylesheet" href="ZTooltip.min.css">
<!-- ... -->
<a data-popuptip="show" data-content="This is a button!">Hover</a>
<a data-popuptip="show" data-triggle="click" data-content="You catch me！">Click</a>
<!-- ... -->
<script src="ZTooltip.min.js"></script>
```

###JS

```JS
ZTooltip({
	width: 200,			// Optional tooltip width, default 200px
	height: 100,		// Optional tooltip height, default auto
	boxOffsetX: 70,		// Optional tooltip offsetX, default 20px
	boxOffsetY: 7,		// Optional tooltip offsetY, default 5px
	arrowSize: 10		// Optional size of tooltip's arrow, default 10px
	trigger: 'click'	// Optional trigger method, default hover
});
```

#### Work with module bundler

```js
var ZTooltip = require('ZTooltip');
ZTooltip({...});
```



### Attribute

You need add `data-tooltip="show"` to the element which you want to trigger tooltip.The Attribute `data-content=xxx` provides words in the tooltip.You can also set `data-trigger="click/hover"` to add another way to trigger tooltip of the element.

你需要给触发tooltip的元素添加 `data-tooltip="show"` 属性, `data-content="xxx"` 里添加tooltip里显示的文字。可以通过 `data-trigger="click/hover"` 为元素添加另外的触发方式。

## LICENSE

MIT © [zhiyul](http://github.com/zhiyul)