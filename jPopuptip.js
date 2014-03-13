/**
 * Created with JetBrains PhpStorm.
 * User: yufan33
 * Date: 14-3-13
 * Time: 上午10:46
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var defaults = {
        'width' : '300px',
        'height' : '100px',
        'arrowOffset' : '20px',
        'boxOffsetX' : '20px',
        'boxOffsetY' : '5px'
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
        targetPosition = getElePosInView(self);
        var box = document.getElementsByClassName('tipBox')[0];
        var boxPosition = testBoxPosition(box,targetPosition);
        
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
    function getViewport(){
        if(document.compatMode == 'BackCompat'){
            return {
                'viewWidth' : Math.max(document.body.clientWidth,document.body.scrollWidth),
                'viewHeight' : Math.max(document.body.clientHeight,document.body.scrollHeight)
            };
        }
        else{
            return {
                'viewWidth' : Math.max(document.documentElement.clientWidth,document.documentElement.scrollWidth),
                'viewHeight' : Math.max(document.documentElement.clientHeight,document.documentElement.scrollHeight)
            };
        }
    }
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
