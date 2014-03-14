/**
 * Created with JetBrains PhpStorm.
 * Author: zhiyul
 * Date: 14-3-13
 * Time: 上午10:46
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var defaults = {
        'width' : 300,
        'height' : 100,
        'arrowOffset' : 20,
        'boxOffsetX' : 20,
        'boxOffsetY' : 5
    };
    var common = {
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
        })()
    };
    var my = document.getElementById('my');
    common.bind(my,'click',showTips,'c-showT');
    function showTips(){
        var self = this;
        var targetSize = computeEleSize(my);
        targetPosition = getElePosInView(self);
        var box = document.getElementsByClassName('tipBox')[0];
        var boxPosition = testBoxPosition(box,targetPosition);

        var tL = getEleLeft(my);
        var tT = getEleTop(my); 
        console.log(tL+' '+tT);
        var boxSize =  computeEleSize(box);
        var boxNeedSize = {
                'needWidth' : boxSize.width - (targetSize.width - parseInt(defaults.boxOffsetX)),
                'needHeight' : boxSize.height + parseInt(defaults.boxOffsetY)
            };
        
        var boxLeft = 0,boxTop = 0;
                console.log(boxPosition);
                console.log(boxSize);

        switch(parseInt(boxPosition)){
            case 0:
                boxLeft = tL + defaults.boxOffsetX;
                boxTop = tT - defaults.boxOffsetY - boxSize.height;
                break;
            case 1:
                boxLeft = tL - boxNeedSize.needWidth;
                boxTop = tT - defaults.boxOffsetY - boxSize.height;
                break;
            case 2:
                boxLeft = tL + defaults.boxOffsetX;
                boxTop = tT + defaults.boxOffsetY + boxSize.height
                break;
            case 3:
                boxLeft = tL - boxNeedSize.needWidth;
                boxTop = tT + defaults.boxOffsetY + boxSize.height
                break;

        }
        box.style.cssText = "position:absolute;top:"+boxTop+"px;left:"+boxLeft+"px;";
        
    }
    function makeBox(){

    }
    function computeEleSize(el){
        return {
            'width' : el.offsetWidth,
            'height' : el.offsetHeight
        };
    }
    function testBoxPosition(el,tp){
        var boxSize = computeEleSize(el);
            boxNeedSize = {
                'needWidth' : boxSize.width - parseInt(defaults.boxOffsetX),
                'needHeight' : boxSize.height + parseInt(defaults.boxOffsetY)
            },
            arr = [
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
            if(boxNeedSize.needWidth<=arr[i].realW && boxNeedSize.needHeight<=arr[i].realH){
                return i;
            }
        }
        return 0;
    }
    function getElePosInView(el){
        var scroll = getDocScroll(el),
            eleTop = getEleTop(el)- scroll.scrollTop,
            eleLeft = getEleLeft(el) - scroll.scrollLeft,
            eleSize = computeEleSize(el);
            viewSize = getViewport();
        return {
            'top' : eleTop,
            'left' : eleLeft,
            'right' : viewSize.viewWidth - eleSize.width - eleLeft,
            'bottom': viewSize.viewHeight - eleSize.height - eleTop
        };
    }
    function getViewport()
        {
            var w = (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth;
            var h = (window.innerHeight) ? window.innerHeight : (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.offsetHeight;
            return {'viewWidth':w,'viewHeight':h};
        };
    // function getViewport(){
    //     if(document.compatMode == 'BackCompat'){
    //         return {
    //             'viewWidth' : Math.max(document.body.clientWidth,document.body.scrollWidth),
    //             'viewHeight' : Math.max(document.body.clientHeight,document.body.scrollHeight)
    //         };
    //     }
    //     else{
    //         return {
    //             'viewWidth' : Math.max(document.documentElement.clientWidth,document.documentElement.scrollWidth),
    //             'viewHeight' : Math.max(document.documentElement.clientHeight,document.documentElement.scrollHeight)
    //         };
    //     }
    // }
    function getDocScroll(){
        return {
            'scrollTop' : document.body.scrollTop+document.documentElement.scrollTop,
            'scrollLeft' : document.body.scrollLeft+document.documentElement.scrollLeft
        };
    }
    function getEleLeft(el){
        var actulaLeft = el.offsetLeft;
        var parent = el.offsetParent;
        while(parent!=null){
            actulaLeft = actulaLeft + parent.offsetLeft;
            parent = parent.offsetParent;
        }
        return actulaLeft;
    }
    function getEleTop(el){
        var actulaTop = el.offsetTop
        var parent = el.offsetParent;
        while(parent!=null){
            actulaTop = actulaTop + parent.offsetTop;
            parent = parent.offsetParent;
        }
        return actulaTop;
    }
})();
