var ArrayProto = Array.prototype;
var body = document.body;
var html = document.documentElement;

// Find
// slector 可能的值   字符串:id,class,tag
// parent 可能是selector,也可能是element
// https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
// If you use getElementById().you must use document to the root element.

(function() {
    'use strict'



})()
function $(selector,parent) {
    if(typeof selector !== 'string') { return null }
    else { selector = selector.trim() };
    // 如果selector不是字符串,返回

    if(!parent || selector.charAt(0) === '#') {
        parent = document;
    }
    if (typeof parent === 'string') {
        parent = $(parent)
    }
    switch (selector.charAt(0)) {
        case '#':
            return parent.getElementById(selector.substr(1));
            break;
        case '.':
            return parent.getElementsByClassName(selector.substr(1))[0];
            break;
        default:
            return parent.getElementsByTagName(selector)[0];
    }
}

// querySelectorAll,getElementsByClassName,getElementsByTagName
function $$(selector,parent) {
    if(parent) {
        parent = $(parent);
    }else {
        parent = document;
    }

    if(typeof selector !== 'string') { return null } else { selector == selector.trim()};

    switch (selector.charAt(0)) {
        case '#': return parent.querySelectorAll(selector); break;
        case '.': return parent.querySelectorAll(selector); break;
        default: return parent.getElementsByTagName(selector);
    }
}



function checkSelector(selector,parent) {
    if(typeof selector !== 'string') {
        throw new Error('selector must be string!');
    }else {
        selector = selector.trim();
    }

    if(typeof parent === 'undefined') {
        parent = document;
    }else if(typeof parent === 'string') {
        parent = $(parent);
    }else if (parent.nodeType === 1) {
        parent = parent;
    }else {
        throw new Error('if parent,parent must be element node or string!')
    }

    return {selector:selector,parent:parent}
}

function query(selector,parent) {

    var returned = checkSelector(selector,parent);
    var selector = returned.selector;
    var parent = returned.parent;

    return parent.querySelector(selector)

}


function queryAll(selector,parent) {
    var returned = checkSelector(selector,parent);
    selector = returned.selector;
    parent = returned.parent;
    return parent.querySelectorAll(selector)
}


// 取得全部是元素节点,不含文本节点
function create(tag){
    if(typeof tag !== 'string') {
        throw new Error('tagName must be string!');
    }else {
        return document.createElement(tag)
    }
}

function next(element) {
    return element.nextElementSibling;
}

function prev(element) {
    return element.previousElementSibing;
}

function childCount(element) {
    return element.childElementCount;
}

function firstChild(element) {
    return element.firstElementChild;
}
function lastChild(element) {
    return element.lastElementChild;
}

function covertToElement(selector) {
    if(typeof selector === 'string') {
        return $(selector);
    }else {
        return selector;
    }
}

function parent(selector){
    selector = covertToElement(selector);
    return selector.parentNode;
}


function insertBefore(element,target) {
    if(parent(target)) {
        return  parent(target).insertBefore(element,target);
    }
}

function insertAfter(element,target) {
    if(parent(target)) {
        return parent(target).insertBefore(element,next(target));
    }
}

function appendEnd(element,parent) {
    return parent.appendChild(element);
}

function appendStart(element,parent) {
    return insertBefore(element,firstChild(parent));
}

function replace(element,target) {
    return parent(target).replaceChild(element,target)
}

function remove(element) {
    return parent(element).removeChild(element);
}


// 类数组, NodeList,HTMLCollection,arguments
function toArray(list) {
    if(list instanceof HTMLCollection || list instanceof NodeList || list instanceof arguments) {
        return ArrayProto.slice.call(list,0)
    }
}

// style
function addClass(nameOfClass,selector) {
    element = covertToElement(selector)

    if(typeof nameOfClass !== 'string') {
        throw new Error('className must be string!');
    }else {
        nameOfClass = nameOfClass.trim();
        if(nameOfClass.indexOf(' ') > 0) {
            // 存在空格
            var arr = nameOfClass.split(' ');
            for(var i = 0; i < arr.length; i++) {
                element.className += (element.className ? ' ' : '') + arr[i];
            }
        }else {
            element.className += (element.className ? ' ' : '') + nameOfClass;
        }
    }
}

function removeClass(nameOfClass,selector) {
    element = covertToElement(selector);

    if(typeof nameOfClass !== 'string') {
        throw new Error('className must be string!');
    }else {
        nameOfClass = nameOfClass.trim();
        if(nameOfClass.indexOf(' ') > 0) {
            // 有空格,移除多个class
            var arr = nameOfClass.split(' ');
            for(var i = 0; i < arr.length; i++) {
                var regex = new RegExp('\\b' + arr[i] + '\\b')
                if(regex.test(element.className)) {
                    var start = element.className.indexOf(arr[i]);
                    element.className = element.className.substring(0,start) + element.className.substring(start+arr[i].length)
                }
            }
        }else {
            var regex = new RegExp('\\b' + nameOfClass + '\\b')
            if(regex.test(element.className)) {
                var start = element.className.indexOf(nameOfClass);
                    element.className = element.className.substring(0,start) + element.className.substring(start+nameOfClass.length)
            }
        }
    }
}

function toggleClass(nameOfClass,selector) {
    element = covertToElement(selector);
    var regex = new RegExp('\\b' + nameOfClass + '\\b')
    regex.test(element.className) ? removeClass(nameOfClass,element): addClass(nameOfClass,element);
}

function hasClass(nameOfClass,selector) {
    var element = covertToElement(selector);
    var regex = new RegExp('\\b' + nameOfClass + '\\b')
    return regex.test(element.className) ? true : false;
}

function innerText(selector, text) {
    var element = covertToElement(selector);
    return typeof element.textContent == 'string' ? element.textContent : element.innerText;
}

function style() {

}
// console

function print(stuff) {
    console.log(stuff);
}

// 取得对整个页面的offset


function pageOffset(selector){
    var element = covertToElement(selector)
    var getLeft = function(element) {
        var temp = element.offsetLeft;
        var currentElement = element.offsetParent;
        while(currentElement !== null){
            temp += currentElement.offsetLeft;
            currentElement = currentElement.offsetParent;
        }
        return temp;
    }
    var getTop = function(element) {
        var temp = element.offsetTop;
        var currentElement = element.offsetParent;
        while(currentElement !== null){
            temp += currentElement.offsetTop;
            currentElement = currentElement.offsetParent;
        }
        return temp;
    }
    return {
        top: getTop(element),
        left: getLeft(element)
    }
}


function size(){

}



function addStyle(rules, selector) {
    var element = covertToElement(selector);

    if(typeof rules === 'object') {
        for (var r in rules) {
            element.style[r] = rules[r];
        }
    }else if (typeof rules === 'string') {
        rules = rules.trim();
        if(rules.charAt(rules.length - 1 ) == ';') {
            rules = rules.substring(0,rules.length-1)
        }
        var arr = rules.split(';');
        for(var i = 0; i < arr.length; i++) {
            element.style.setProperty(arr[i].split(':')[0],arr[i].split(':')[1]);
        }
    }else {
        throw new Errow("css rules must be object or string");
    }
}

function removeStyle(rules, selector) {
    var element = covertToElement(selector);
    if ("string" != typeof rules) {
        throw new Error("rules must be String!");
    }

    rules = rules.trim();

    if(rules.indexOf(':') === -1) {
        //多个属性
        var arr = rules.split(' ');
        for(var i = 0; i < arr.length; i++) {
            var regex = new RegExp("\\b" + arr[i] + "\\b");
            if(regex.test(element.style.cssText)) {
                element.style.removeProperty(arr[i]);
            }else {
                throw new Error('the rules '+ arr[i]+ ' to be removed is not existed')
            }
        }
    }else {
        // 如果是cssText 字符串,配合toggleStyle
        var arr = rules.split(';');
        arr = arr.map(function(item,index){
            return item.split(':');
        })
        for(var i = 0; i < arr.length; i++) {
            var regex = new RegExp("\\b" + arr[i][0] + "\\b");
            if(regex.test(element.style.cssText)) {
                element.style.removeProperty(arr[i][0]);
            }else {
                throw new Error('the rules '+ arr[i][0]+ ' to be removed is not existed')
            }
        }
    }

}

function toggleStyle(rules,selector) {
    var element = covertToElement(selector);
    if ("string" != typeof rules) {
        throw new Error("rules must be String!");
    }else {
        rules = rules.trim();
        if(rules.charAt(rules.length - 1 ) == ';') {
            rules = rules.substring(0,rules.length-1)
        }
        var arr = rules.split(';');
        var regex = new RegExp("\\b" + arr[0].split(':')[0] + "\\b");
        if(regex.test(element.style.cssText)) {
            removeStyle(rules,element);
            return;
        }else {
            addStyle(rules,element);
            return;
        }
    }
}


function computed(selector,pseudo) {
    // not fit for width,height because padding,margin
    var element = covertToElement(selector),
        computedStyle = null;

        if(typeof pseudo === 'undefined') {
            pseudo = null;
        }

        if(window.getComputedStyle) {
            computedStyle = window.getComputedStyle(element,pseudo);
        }else if (element.currentStyle) {
            // 兼容IE
            computedStyle = element.currentStyle;
        }

        return computedStyle;
}

function getStyle(rules, selector) {
    var element = covertToElement(selector);
    return element.style[rules]
}


function show(selector) {
    var element = covertToElement(selector);
    removeStyle('display',element);
}

function hide(selector) {
    var element = covertToElement(selector);
    addStyle({display:'none'},element);
}

function toggle(selector){
    var element = covertToElement(selector);
    if(element.style.display) {
        element.style.display==='none'?show(element):hide(element);
    }else {
        hide(element);
    }
}

function print(any) {
    console.log(any)
}

// size
// scrollbar will cut the computed width
// that means it not a part of padding or margin, it just cut some place for itself
function size(selector,scroll) {
    var element = covertToElement(selector);
    if(scroll) {

    }else {

    }


}

// var scroller = body and html

/*
pageX
pageY
pageX
scrollY
scrollX
screenX
screenY
clientWidth
clientHeight
innerWidth
innerHeight
scrollWidth
scrollHeight
scrollTop
scrollLeft
offsetWidth
offsetHeight
offsetTop
offsetLeft
*/



    var U = {
        on: null,
        off: null,
        init: function()
        {
            if(typeof window.addEventListener === 'function')
            {
                this.on = function(element,type,handler)
                {
                    element.addEventListener(type,handler);
                }
                this.off = function(element,type,handler){
                    element.removeEventListener(type,handler);
                }
            }else if (typeof window.attachEvent === 'function')
            {
                this.on = function(element,type,handler)
                {
                    element.attachEvent('on'+type,handler);
                }
                this.off = function(element,type,handler) {
                    element.detachEvent('on'+type,handler);
                }
            }else {
                this.on = function(element,type,handler)
                {
                    element['on'+type] = handler;
                }
                this.off = function(element,type,handler)
                {
                    element['on'+type] = null;
                }
            }
            return this;
        },
        getKey: function(event){
            if(typeof event.keyCode === 'number') {
                return event.keyCode;
            }else {
                return event.charCode;
            }
        }
    }.init()


function serialize(form) {
    var parts = [];

}
