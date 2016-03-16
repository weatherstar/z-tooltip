(function(){
    var defaults = {
        'width' : 200,
        'height' : 'auto',
        'boxOffsetX' : 20,
        'boxOffsetY' : 5,
        'arrowSize' : 10,
        'trigger' : 'hover'
    };
    var common = {
        options:{},
        extend : function(from,to){
            var i, obj = {};
            if(!to){
                return from;
            }
            for(i in from){
                obj[i] = to[i] ? to[i] : from[i];
            }
            return obj;
        },
        bind : (function(){
            if(window.addEventListener){
                return function(el,type,fn,identifier){
                        el.bindFn = el.bindFn || {};
                        el.bindFn[identifier] = {
                            eventType : type,
                            eventFn : fn
                        }
                    el.addEventListener(type,fn,false);
                };
            }else if (window.attachEvent){
                return function(el,type,fn,identifier){
                    el.bindFn = el.bindFn || {};
                    el.bindFn[identifier] = {
                        eventType : type,
                        eventFn : fn
                    };
                    el.attachEvent('on' + type,fn,false);
                };
            }
        })(),
        hasClass : function (element,className) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            return element.className.match(reg);
        },
        addClass:function(ele,className){
            var classArr = className.split(' ');
            for(var i = 0,len = classArr.length;i < len;i++){
                if(!common.hasClass(ele,classArr[i])){
                    ele.className += ' '+classArr[i];
                }
            }
        },
        removeClass:function(ele,className){
            if(ele.classList){
                ele.classList.remove(className);
            }
            else{
                var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
                ele.className.replace(reg,'');
            }
        },
        getEleByAttr:function(attribute, attributeValue){
            var elementArray = new Array();
        var matchedArray = new Array();
        if (document.all)
        {
            elementArray = document.all;
        }
        else
        {
            elementArray = document.getElementsByTagName("*");
        }
        for (var i = 0; i < elementArray.length; i++)
        {
            if (attribute == "class")
            {
              var pattern = new RegExp("(^| )" +
                   attributeValue + "( |$)");
              if (pattern.test(elementArray[i].className))
              {
                matchedArray[matchedArray.length] = elementArray[i];
            }
        }
        else if (attribute == "for")
        {
        if (elementArray[i].getAttribute("htmlFor") || elementArray[i].getAttribute("for"))
        {
            if (elementArray[i].htmlFor == attributeValue)
            {
                matchedArray[matchedArray.length] = elementArray[i];
             }
           }
        }
        else if (elementArray[i].getAttribute(attribute) == attributeValue)
        {
            matchedArray[matchedArray.length] = elementArray[i];
        }
             }
        return matchedArray;
        }
    };

    var ZTooltip = function(opt){
        if(!(this instanceof ZTooltip)){
            return new ZTooltip(opt);
        }
         common.options = common.extend(defaults,opt);
         this.init();
    };
    ZTooltip.fn = ZTooltip.prototype;

    ZTooltip.fn.init = function(){
        var allTarget = common.getEleByAttr('data-tooltip','show');
        for(var i = 0,len = allTarget.length;i < len;i++){
            var trigger = allTarget[i].getAttribute('data-trigger');
            if(trigger){
                if(trigger =='click'){
                    common.bind(allTarget[i],'click',clickShow,'clickshow');
                }
                else if(trigger =='hover'){
                    bindHover(allTarget[i]);
                }
            }
            else if(common.options.trigger == 'click'){
                common.bind(allTarget[i],'click',clickShow,'clickshow');
            }else{
                bindHover(allTarget[i]);
            }
        }
    }

    function bindHover(ele){
        common.bind(ele,'mouseover',hoverShow,'hoverShow');
        common.bind(ele,'mouseout',hoverHide,'hoverHide');
    }

    function clickShow(e){
        var e = e||window.event,
            e = e.target||e.srcElement;
            setBox(e);
    }

    function hoverShow(e){
        var e = e||window.event,
            e = e.target||e.srcElement;
            setBox(e);
    }

    function hoverHide(){
        document.getElementById('ZTooltip').style.display = 'none';
    }
    //设置弹出框的位置
    function setBox(e){
        var ZTooltip = document.getElementById('ZTooltip'),
            content = e.getAttribute('data-content'),
            boxCurrentPos;
            if(!content){
                content='';
            }     
        if(!ZTooltip){
            var box = makeTipBox();
            document.body.appendChild(box);
            setContent(box,content);
            boxCurrentPos = getBoxCurrentPosition(e,box);
            setBoxPosition(box,boxCurrentPos.boxTop,boxCurrentPos.boxLeft);
        }
        else{
            if(ZTooltip.style.display == 'none'){
                if(e!==ZTooltip.targetEle){
                    setContent(ZTooltip,content);
                }
                ZTooltip.style.display = 'block';           
                boxCurrentPos = getBoxCurrentPosition(e,ZTooltip);
                setBoxPosition(ZTooltip,boxCurrentPos.boxTop,boxCurrentPos.boxLeft)  
            }
            else{
                if(e!==ZTooltip.targetEle){
                    setContent(ZTooltip,content);
                    boxCurrentPos = getBoxCurrentPosition(e,ZTooltip);                    
                    setBoxPosition(ZTooltip,boxCurrentPos.boxTop,boxCurrentPos.boxLeft);
                }
                else{
                    ZTooltip.style.display = 'none';
                }               
            }
        }
    }

    function makeTipBox(){
            var tipBox = [];
            for(var i = 0;i < 4;i++){
                tipBox[i] = makeNewEle('div');
            }
            tipBox[0].id = 'ZTooltip';
            tipBox[0].style.display = "block";
            tipBox[0].className = 'm-tipbox';
            tipBox[1].className = 'container';
            tipBox[2].className = 'u-arrow u-arrowB';
            tipBox[3].className = 'u-arrow u-arrowT';
            tipBox[0].appendChild(tipBox[1]);
            tipBox[0].appendChild(tipBox[2]);
            tipBox[0].appendChild(tipBox[3]);
            return tipBox[0];
        }

    function setContent(box,content){
        var div = box.getElementsByTagName('div');
        for(var i = 0,len=div.length;i < len;i++){

            if(common.hasClass(div[i],'container')){
                div[i].innerHTML = content;
                return;
            }
        };
    }

    function setBoxPosition(box,top,left){
        box.style.position="absolute";
        box.style.top=top+'px';
        box.style.left=left+'px';      
    }

    function getBoxCurrentPosition(e,box){
        var eleInfo = {
                'tL' : getEleLeft(e),                            //目标元素与文档左边距离
                'tT' : getEleTop(e),                             //目标元素与文档上边距离
                'eleSize' : computeEleSize(e)                    //目标元素尺寸
            },
            targetPosition = getElePosInView(self,eleInfo);      //目标元素在视口中的相对位置          

            var opt = common.options;
            if(opt.width != 'auto'){box.style.width = opt.width+'px';}
            if(opt.height != 'auto'){box.style.height = opt.height+'px';}

            var boxSize = computeEleSize(box),
                boxNeedSize = {
                    'needWidth' : boxSize.width - (eleInfo.eleSize.width - parseInt(opt.boxOffsetX)),
                    'needHeight' : boxSize.height + parseInt(opt.boxOffsetY)+opt.arrowSize
                },                                                                                                                      //提示框需要占用的位置尺寸
                boxPosition = testBoxPosition(box,targetPosition,boxNeedSize),  //获取提示框位置
                boxLLeft = eleInfo.tL + opt.boxOffsetX,
                boxRLeft = eleInfo.tL - boxNeedSize.needWidth,
                boxTTop = eleInfo.tT - opt.boxOffsetY - boxSize.height-opt.arrowSize,
                boxBTop = eleInfo.tT + opt.boxOffsetY + eleInfo.eleSize.height+opt.arrowSize,
                boxLeft = 0,
                boxTop = 0;
                box.targetEle = e;
            switch(parseInt(boxPosition)){
                case 0:                           //右上
                    boxLeft = boxLLeft;
                    boxTop = boxTTop;
                    box.className = 'm-tipboxT m-tipboxR';
                    break;
                case 1:                           //左上
                    boxLeft = boxRLeft;
                    boxTop = boxTTop;
                    box.className = 'm-tipboxT m-tipboxL';
                    break;
                case 2:                           //右下
                    boxLeft = boxLLeft;
                    boxTop = boxBTop;
                    box.className = 'm-tipboxB m-tipboxR';
                    break;
                case 3:                           //左下
                    boxLeft = boxRLeft;
                    boxTop = boxBTop;
                    box.className = 'm-tipboxB m-tipboxL';
                    break;

            }
            var boxCurrentPos = {
                'boxTop':boxTop,
                'boxLeft':boxLeft
            };
            return boxCurrentPos;
    }
    
    function makeNewEle(ele){
        return document.createElement(ele);
    }

    function computeEleSize(el){
        return {
            'width' : el.offsetWidth,
            'height' : el.offsetHeight
        };
    }
    //检测四个位置哪里最合适放置弹出框
    function testBoxPosition(el,tp,bns){
        var arr = [
                {
                    'realW':tp.right,
                    'realH':tp.top
                },
                {
                    'realW':tp.left,
                    'realH':tp.top
                },
                {
                    'realW':tp.right,
                    'realH':tp.bottom
                },
                {
                    'realW':tp.left,
                    'realH':tp.bottom
                }
            ];
        for(var i = 0;i < 4;i++){
            if(bns.needWidth<=arr[i].realW && bns.needHeight<=arr[i].realH){
                return i;
            }
        }
        return 0;
    }
    //获取目标元素在浏览器视口中的相对位置
    function getElePosInView(el,eleInfo){
        var scroll = getDocScroll(el),
            eleTop = eleInfo.tT- scroll.scrollTop,
            eleLeft = eleInfo.tL - scroll.scrollLeft,         
            viewSize = getViewport();
            return {
                'top' : eleTop,
                'left' : eleLeft,
                'right' : viewSize.viewWidth - eleInfo.eleSize.width - eleLeft,
                'bottom': viewSize.viewHeight - eleInfo.eleSize.height - eleTop
        };
    }
    //获取浏览器视口大小
    function getViewport() {
        var w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
        var h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
        return {'viewWidth':w,'viewHeight':h};
    }
    //获取文档滚动高度与宽度
    function getDocScroll(){
        if(document.compatMode == 'BackCompat'){
            return {
            'scrollTop' : document.body.scrollTop,
            'scrollLeft' : document.body.scrollLeft
            };
        }
        else{
            return {
            'scrollTop' : document.body.scrollTop+document.documentElement.scrollTop,
            'scrollLeft' : document.body.scrollLeft+document.documentElement.scrollLeft
            };           
        }
    }
    //获取元素与文档左边距离
    function getEleLeft(el){
        var actulaLeft = el.offsetLeft;
        var parent = el.offsetParent;
        while(parent!=null){
            actulaLeft = actulaLeft + parent.offsetLeft;
            parent = parent.offsetParent;
        }
        return actulaLeft;
    }
    //获取元素与文档上边距离
    function getEleTop(el){
        var actulaTop = el.offsetTop
        var parent = el.offsetParent;
        while(parent!=null){
            actulaTop = actulaTop + parent.offsetTop;
            parent = parent.offsetParent;
        }
        return actulaTop;
    }
    window.ZTooltip = ZTooltip;
})();
