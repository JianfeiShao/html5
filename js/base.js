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
