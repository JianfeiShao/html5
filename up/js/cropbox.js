/**
 * Created by ezgoing on 14/9/2014.
 */

"use strict";
(
    function(factory) {
        // alert(2);

        if (typeof define === 'function' && define.amd) {
            define(['jquery'], factory);
        } else {
            console.log('预先加载JQuery');
            factory(jQuery);
        }
    }
    (
        function($) {
            // alert(3);
            var cropbox = function(options, el) {
                console.log('传参，对象本身');
                console.log(options);
                console.log($(options.imageBox));
                
                var el = el || $(options.imageBox),
                    obj = {
                        state: {},
                        ratio: 1,
                        options: options,
                        imageBox: el,
                        thumbBox: el.find(options.thumbBox),//查找文档里面某个元素
                        spinner: el.find(options.spinner),
                        image: new Image(),
                        getDataURL: function() {
                            console.log('点击截图');
                            var width = this.thumbBox.width(),
                                height = this.thumbBox.height(),
                                canvas = document.createElement("canvas"),
                                dim = el.css('background-position').split(' '),
                                size = el.css('background-size').split(' '),
                                dx = parseInt(dim[0]) - el.width() / 2 + width / 2,
                                dy = parseInt(dim[1]) - el.height() / 2 + height / 2,
                                dw = parseInt(size[0]),
                                dh = parseInt(size[1]),
                                sh = parseInt(this.image.height),
                                sw = parseInt(this.image.width);
                            
                            canvas.width = width;
                            canvas.height = height;
                            var context = canvas.getContext("2d");
                            context.drawImage(this.image, 0, 0, sw, sh, dx, dy, dw, dh);
                            var imageData = canvas.toDataURL('image/png');
                            return imageData;
                        },
                        getBlob: function() {
                            var imageData = this.getDataURL();
                            var b64 = imageData.replace('data:image/png;base64,', '');
                            var binary = atob(b64);
                            var array = [];
                            for (var i = 0; i < binary.length; i++) {
                                array.push(binary.charCodeAt(i));
                            }
                            return new Blob([new Uint8Array(array)], {
                                type: 'image/png'
                            });
                        },
                        zoomIn: function() {
                            this.ratio *= 1.1;
                            setBackground();
                        },
                        zoomOut: function() {
                            this.ratio *= 0.9;
                            setBackground();
                        }
                    },
                    setBackgroundInit = function(){
                        /*

                            100*1.1=显示


                        */
                        console.log('进来了');
                        var w;
                        var h;
                        while(true){
                            if(w <= 200){
                                break;
                                
                            }
                            obj.zoomOut();
                            console.log(obj.image.width+':'+obj.ratio);
                            w = parseInt(obj.image.width) * obj.ratio;
                            h = parseInt(obj.image.height) * obj.ratio;
                            console.log('-----');
                        };
                        //var w = 200 / obj.ratio;//parseInt(obj.image.width) * obj.ratio;
                        //var h = 200 / obj.ratio;//parseInt(obj.image.height) * obj.ratio;
                        /*200宽度*/
                        var pw = (el.width() - w) / 2;
                        var ph = (el.height() - h) / 2;
                        el.css({
                            'background-image': 'url(' + obj.image.src + ')',
                            'background-size': w + 'px ' + h + 'px',
                            'background-position': pw + 'px ' + ph + 'px',/*居中效果？*/
                            'background-repeat': 'no-repeat'
                        });
                    },
                    setBackground = function() {//背景图片控制
                        var w = parseInt(obj.image.width) * obj.ratio;
                        var h = parseInt(obj.image.height) * obj.ratio;

                        var pw = (el.width() - w) / 2;
                        var ph = (el.height() - h) / 2;
                        console.log(obj.image.width);
                        console.log(obj.ratio);
                        console.log(w);
                        console.log(pw);
                        el.css({
                            'background-image': 'url(' + obj.image.src + ')',
                            'background-size': w + 'px ' + h + 'px',
                            'background-position': pw + 'px ' + ph + 'px',/*居中效果？*/
                            'background-repeat': 'no-repeat'
                        });
                    },
                    imgMouseDown = function(e) {

                        e.stopImmediatePropagation();

                        obj.state.dragable = true;
                        obj.state.mouseX = e.clientX;
                        obj.state.mouseY = e.clientY;
                        console.log('按下'+e.clientX+':'+e.clientY);
                    },
                    imgMouseMove = function(e) {
                        e.stopImmediatePropagation();

                        if (obj.state.dragable) {
                            var x = e.clientX - obj.state.mouseX;
                            var y = e.clientY - obj.state.mouseY;

                            var bg = el.css('background-position').split(' ');

                            var bgX = x + parseInt(bg[0]);
                            var bgY = y + parseInt(bg[1]);

                            el.css('background-position', bgX + 'px ' + bgY + 'px');

                            obj.state.mouseX = e.clientX;
                            obj.state.mouseY = e.clientY;
                            console.log('移动'+e.clientX+':'+e.clientY);
                        }
                    },
                    imgMouseUp = function(e) {
                        e.stopImmediatePropagation();
                        obj.state.dragable = false;
                        console.log('弹起');
                    },
                    zoomImage = function(e) {
                        e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ? obj.ratio *= 1.1 : obj.ratio *= 0.9;
                        setBackground();
                        console.log('缩小图片');
                    }
                    obj.spinner.show();
                    obj.image.onload = function() {
                        obj.spinner.hide();
                        // setBackground();
                        setBackgroundInit();
                        el.bind('mousedown', imgMouseDown);
                        el.bind('mousemove', imgMouseMove);
                        $(window).bind('mouseup', imgMouseUp);
                        el.bind('mousewheel DOMMouseScroll', zoomImage);
                    };

                    obj.image.src = options.imgSrc;
                    el.on('remove', function() {
                        console.log('移除');
                        $(window).unbind('mouseup', imgMouseUp)
                    });
                    console.log(obj);
                    
                    return obj;
            };

            jQuery.fn.cropbox = function(options) {
                // alert('扩展jQuery方法');
                return new cropbox(options, this);
            };
        }
    )
);
