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
    $(".modal-dialog-bg").css("display", "block");
    $(".modal-wrapper").css("display", "flex");
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
obj.addEventListener('touchstart', 'click', function(event) {
    $(".comment-publish-warp").css("display", "none");
    $(".nav-items").css("display", "block");
}, false);

function releaseReply(_this) {
    console.log(_this);
    var re = $(_this).attr("data-name");
    alert(re);
}

//status 0 普通用户 1 楼主
function reply(obj,user,status) {
    console.log(obj);
    console.log(user);
    var re = $(obj).closest(".wrapper-re-content").find(".reply-content-warp");
    //var re = $(re1).(".reply-content-warp");
    var isHide = $(re).css("display") == 'block' ? 'none' : 'block';
    $(re).css("display",isHide);
    
    if(status != 0){
        $(re).find(".reply-content").html('');
        return;
    }
    $(re).find(".reply-content").html("回复 "+user+" :");
    console.log(re.html());
}