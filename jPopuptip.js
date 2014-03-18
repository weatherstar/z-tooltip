/**
 * Created with JetBrains PhpStorm.
 * Author: zhiyul
 * Date: 14-3-13
 * Time: 上午10:46
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var defaults = {
        'width' : 'auto',
        'height' : 'auto',
        'arrowOffset' : 20,
        'boxOffsetX' : 20,
        'boxOffsetY' : 5,
        'arrowSize' : 14,
        'triggle' : 'hover'
    };
    var common = {
        options:{},
        extend : function(from,to){
            var i, obj = {};
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
        hasClass:function(ele,value){
            return el.className.match(/(?:^|\s)MyClass(?!\S)/);
        }
    };

    var Tipbox = function(opt){
        if(!(this instanceof Tipbox)){
            return new Tipbox(opt);
        }
         common.options = common.extend(defaults,opt);
         this.init();
    };

    Tipbox.fn = Tipbox.prototype;
    Tipbox.fn.init = function(){
        common.bind(this,'click',showTips,'c-showT');
    }

    function showTips(e){
        var e = e||window.event,
            e = e.target||e.srcElement;
        var eleInfo = {
            'tL' : getEleLeft(e),                            //目标元素与文档左边距离
            'tT' : getEleTop(e),                             //目标元素与文档上边距离
            'eleSize' : computeEleSize(e)                    //目标元素尺寸
        },
            targetPosition = getElePosInView(self,eleInfo),     //目标元素在视口中的相对位置
            box = makeTipBox();

            document.body.appendChild(box);

        var opt = common.options;
            boxSize =  computeEleSize(box), //提示框尺寸
            boxNeedSize = {
                'needWidth' : boxSize.width - (eleInfo.eleSize.width - parseInt(opt.boxOffsetX)),
                'needHeight' : boxSize.height + parseInt(opt.boxOffsetY)+opt.arrowSize
            },                                                  
                                                                //提示框需要占用的位置尺寸
            boxPosition = testBoxPosition(box,targetPosition,boxNeedSize),  //获取提示框位置
            boxLLeft = eleInfo.tL + opt.boxOffsetX,
            boxRLeft = eleInfo.tL - boxNeedSize.needWidth,
            boxTTop = eleInfo.tT - opt.boxOffsetY - boxSize.height-opt.arrowSize,
            boxBTop = eleInfo.tT + opt.boxOffsetY + eleInfo.eleSize.height+opt.arrowSize,
            boxLeft = 0,
            boxTop = 0;
        switch(parseInt(boxPosition)){
            case 0:                           //右上
                boxLeft = boxLLeft;
                boxTop = boxTTop;
                box.className += ' m-tipboxT m-tipboxR';
                break;
            case 1:                           //左上
                boxLeft = boxRLeft;
                boxTop = boxTTop;
                box.className += ' m-tipboxT m-tipboxL';
                break;
            case 2:                           //右下
                boxLeft = boxLLeft;
                boxTop = boxBTop;
                box.className += ' m-tipboxB m-tipboxR';
                break;
            case 3:                           //左下
                boxLeft = boxRLeft;
                boxTop = boxBTop;
                box.className += ' m-tipboxB m-tipboxL';
                break;

        }
        box.style.cssText = "position:absolute;top:"+boxTop+"px;left:"+boxLeft+"px;";       
        e.tipBox = box;
    }
    function makeTipBox(){
        var tipBox = [];
        for(var i = 0;i < 3;i++){
            tipBox[i] = makeNewEle('div');
        }
        tipBox[0].className = 'm-tipbox';
        tipBox[1].className = 'u-arrow u-arrowB';
        tipBox[2].className = 'u-arrow u-arrowT';
        tipBox[0].appendChild(tipBox[1]);
        tipBox[0].appendChild(tipBox[2]);
        return tipBox[0];
    }
    //获取元素尺寸
    function makeNewEle(ele){
        return document.createElement(ele);
    }
    function computeEleSize(el){
        return {
            'width' : el.offsetWidth,
            'height' : el.offsetHeight
        };
    }
    //判断提示框应出现的位置
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
    function getViewport()
        {
            var w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
            var h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
            return {'viewWidth':w,'viewHeight':h};
        };
    //获取文档滚动高度与宽度
    function getDocScroll(){
        return {
            'scrollTop' : document.body.scrollTop+document.documentElement.scrollTop,
            'scrollLeft' : document.body.scrollLeft+document.documentElement.scrollLeft
        };
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

    window.Tipbox = Tipbox;
})();
