/*---------------------mi.html-----------------------------*/
/*点击编辑*/
$(".info-empty-wrap").click(function() {
    $(".info-empty-wrap").css("display", "none");
    $(".info-edit-wrap").css("display", "block");
});

/*点击保存*/
$(".btn-blue").click(function() {
    var val = $(".form-text-input").val();
    $(".employment").html(val);
    $(".info-edit-wrap").css("display", "none");
    $(".info-wrap").css("display", "block");
});
/*点击修改*/
$(".edit-msg").click(function() {
    $(".info-edit-wrap").css("display", "block");
    $(".info-wrap").css("display", "none");
    $(".info-wrap").css("display", "none");
});

/*-----------------index.html---------------------*/
/*弹出*/
$(".add-blacklist").click(function() {
    $(".modal-dialog-bg").css("display", "block");//背景层
    $(".modal-wrapper").css("display", "flex");//居中容器，使里面的div居中，display:flex
    $(".modal-dialog").css("display","block");
});
/*关闭按钮,取消*/
$(".modal-dialog-title-close,.form-command-cancel").click(function() {
    $(".modal-dialog-bg").css("display", "none");
    $(".modal-wrapper").css("display", "none");
});
/*发布*/
$(".form-command-btn").click(function() {
    var name = $("input[name='name']").val();
    var tel = $("input[name='tel']").val();
    var card = $("input[name='card']").val();
    var address = $("input[name='address']").val();
    /*非空即真*/
    if (!name.trim()) {
        alert('用户');
        return;
    };
    if (!tel.trim()) {
        alert('电话');
        return;
    }
    if (!card.trim()) {
        alert('身份证');
        return;
    }
    if (!address.trim()) {
        alert('房屋地址');
        return;
    }
    $.ajax({
        url: 'xxx',
        type: 'POST',
        data: 'name=' + name + '&tel=' + tel + '&card=' + card + '&address=' + address,
        success: function(data) {
            alert(data);
        },
        error: function() {
            alert('失败');
        }
    })
});

/*----------------------landlordInfo.html----------------------*/
$(".nav-items-p").click(function() {
    $(".nav-items").css("display", "none");
    $(".comment-publish-warp").css("display", "block");
});
$(".a-comment-publish-theme").click(function() {
    var re = $.ajax({
        url: 'xxxx',
        type: 'post',
        success: function() {
            alert('提交完成');
            $(".nav-items").css("display", "block");
            $(".comment-publish-warp").css("display", "none");
        },
        error: function() {
            return 'error';

        }
    });
    console.warn(re);
    alert(re);
});

$(".comment-publish").focus(function() {
    var content = $(".comment-publish").html();
    if (!content.indexOf('也来说两句')) {
        $(".comment-publish").html("").css("color", "#000");
    }
});

$(".comment-publish").blur(function() {
    $(".comment-publish-warp").css("display", "none");
    $(".nav-items").css("display", "block");
});

/*触屏事件*/
var obj = document.getElementById('wrapper');
if (obj != null) {
    obj.addEventListener('touchstart', function(event) {
        $(".comment-publish-warp").css("display", "none");
        $(".nav-items").css("display", "block");
    }, false);
}

function releaseReply(_this) {
    console.log(_this);
    var re = $(_this).attr("data-name");
    alert(re);
}

//status 0 普通用户 1 楼主
function reply(obj, user, status) {
    // console.log(obj);
    // console.log(user);
    var re = $(obj).closest(".wrapper-re-content").find(".reply-content-warp");
    //var re = $(re1).(".reply-content-warp");
    var isHide = $(re).css("display") == 'block' ? 'none' : 'block';
    $(re).css("display", isHide);

    if (status != 0) {
        $(re).find(".reply-content").html('').focus();
        return;
    }
    var objEven = $(re).find(".reply-content").html("回复 " + user + " :");

    // console.log(re.html());
}
/**--------------------管理房屋  操作------------------------**/
// 显示添加框
$(".house-show-but").click(function() {
    $(".house-content").css("display", "block");
    $(".house-show-but").css("display", "none");
    // var text = $(".house-add-text").val();
    // alert(text);
});
$(".house-content-but").click(function() {
    alert('提交数据');
});
$(".house-content-close").click(function() {
    $(".house-content").css("display", "none");
    $(".house-show-but").css("display", "block");
});

/*---------------------------个人主页------------------------------*/
// 个人介绍
$(".introduce-self").click(function() {
    $(".introduce-self-wran").css("display", "block");
    $(".profile-bottom").css("display", "none");
});
$(".handle-sub,.handle-close").click(function() {
    $(".introduce-self-wran").css("display", "none");
    $(".profile-bottom").css("display", "block");
    $(".introduce-show").css("display", "block");
});
// 修改 简介
$(".mi-modification-introduce").click(function() {
    // alert('修改');
    $(".introduce-show").css("display", "none");
    $(".introduce-self-wran").css("display", "block");
    $(".profile-bottom").css("display", "none");
});
// 修改 头像
$(".profile-img-text").click(function() {
    $(".modal-dialog-bg").css("display", "block");
    $(".modal-wrapper").css("display", "flex");
    $(".modal-dialog").css("display", "none");
});
// 关闭头像框
$(".mi-close").click(function() {
    $(".modal-dialog-bg").css("display", "none");
    $(".modal-wrapper").css("display", "none");
    $(".modal-dialog").css("display", "none");
});
/*上传头像*/
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
                        thumbBox: el.find(options.thumbBox), //查找文档里面某个元素
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
                    setBackgroundInit = function() {
                        /*

                            100*1.1=显示


                        */
                        console.log('进来了');
                        var w;
                        var h;
                        while (true) {
                            if (w <= 200) {
                                break;

                            }
                            obj.zoomOut();
                            console.log(obj.image.width + ':' + obj.ratio);
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
                            'background-position': pw + 'px ' + ph + 'px',
                            /*居中效果？*/
                            'background-repeat': 'no-repeat'
                        });
                    },
                    setBackground = function() { //背景图片控制
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
                            'background-position': pw + 'px ' + ph + 'px',
                            /*居中效果？*/
                            'background-repeat': 'no-repeat'
                        });
                    },
                    imgMouseDown = function(e) {

                        e.stopImmediatePropagation();

                        obj.state.dragable = true;
                        obj.state.mouseX = e.clientX;
                        obj.state.mouseY = e.clientY;
                        console.log('按下' + e.clientX + ':' + e.clientY);
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
                            console.log('移动' + e.clientX + ':' + e.clientY);
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
/*------------------------------login.html-------------------------------*/
/*登录*/
/*输入框X号样式*/
$("#userName").focus(function() {
    $("#userNameLabel").addClass("userName_label_focus");
});
/*账号图片颜色切换*/
$("#userName").blur(function() {
    $("#userNameLabel").removeClass("userName_label_focus");
    buttonChangeColor();
});
$("#userName").keyup(function() {
    buttonChangeColor();
    if ($("#userName").val().length > 0) {
        $(".clear_username").css("display", "block");
        return;
    };
    $(".clear_username").css("display", "none");
})

$("#password").focus(function() {
    $("#passwordLabel").addClass("password_label_focus");
});
/*密码图片颜色切换*/
$("#password").blur(function() {
    $("#passwordLabel").removeClass("password_label_focus");
    buttonChangeColor();
});
$("#password").keyup(function() {
        buttonChangeColor();
        if ($("#password").val().length > 0) {
            $(".clear_pass").css("display", "block");
            return;
        };
        $(".clear_pass").css("display", "none");
    })
    /*X清除功能*/
$(".clear_username").click(function() {
    $("#userName").val("");
    buttonChangeColor();
});
$(".clear_pass").click(function() {
    $("#password").val("");
    buttonChangeColor();
});
/*切换*/
$(".js-signup").click(function() {
    $(".view-signin").css("display", "none");
    $(".view-signup").css("display", "block");
});
$(".js-signin").click(function() {
    $(".view-signin").css("display", "block");
    $(".view-signup").css("display", "none");
});
/*按钮可用状态*/
function buttonChangeColor() {
    var userval = $("#userName").val();
    var passval = $("#password").val();
    if (userval != "" && passval != "") {
        $(".button_submit").css("background-color", "#1D80CF");
    } else {
        $(".button_submit").css("background-color", "#CCC");
    }
}

/*注册*/
$("#r_name,#r_account,#r_password").keyup(function() {
    var rname = $("#r_name").val();
    var raccount = $("#r_account").val();
    var rpassword = $("#r_password").val();

    if (rname != "" && raccount != "" && rpassword != "") {
        $(".sign-button").css("background-color", "#1D80CF");
    } else {
        $(".sign-button").css("background-color", "#CCC");
    }
});
/*改变复选框*/
function changeCheckColor(_this) {
    if (!$(_this).prop("checked")) {
        $(".checkbox_member_pass label").css("background", "#FFFFFF");
        return;
    };
    $(".checkbox_member_pass .label_check").css("background", "#2BD52B");
}
/*登录层带入按钮*/
$(".guide-in-up").click(function(){
    $(".modal-dialog-bg").css("display", "block");
    $(".modal-wrapper").css("display", "flex");
    $(".modal-dialog").css("display","none");
    $(".login").css("display","block");
});
/*弹出层登录关闭按钮*/
$(".login-head").click(function(){
    $(".modal-dialog-bg").css("display", "none");
    $(".modal-wrapper").css("display", "none");
    $(".login").css("display","none");
});