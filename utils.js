var ArrayProto = Array.prototype;
var body = document.body;
var html = document.documentElement;

// Find
// slector 可能的值   字符串:id,class,tag
// parent 可能是selector,也可能是element
// https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
// If you use getElementById().you must use document to the root element.

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









function addStyle(rule, selector) {
    var element = covertToElement(selector);
    if ("object" == typeof rule)
        for (var r in rule) {
            element.style[r] = rule[r];
        }
    else {
        if ("string" != typeof rule) {
            throw new Errow("css rules must be object or string");
        }else {
            element.style.cssText += (element.style.cssText ? ";" : "") + rule;
        }
    }
}

function removeStyle(rule, selector) {
    var element = covertToElement(selector);
    if ("string" != typeof rule) {
        throw new Error("rules must be String!");
    }
    var regex = new RegExp("\\b" + rule + "\\b");
    if(regex.test(element.style.cssText)) {

    }
}

function toggleStyle() {}

function getStyle(rule, selector) {
    var element = covertToElement(selector);
    return element.style[rule]
}

function css() {}

function attr() {}

function removeAttr(e, t) {}

function print(any) {
    console.log(any)
}
