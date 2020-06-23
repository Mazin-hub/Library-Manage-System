
var bookName;
var books;

/**
 *  7. 共享部分
 */
$(function () {
    // 获取用户借阅数据（无误数据要隐藏表格）、图书数据（无数据要隐藏语句）
    // 借阅数据需要做判断，判断状态，3种：延期、归还、超时归还，只有延期能点击
    //
})
// 点击书名显示书信息
function detial(obj) {
    bookName = $(obj).html();
    console.log($(obj).parent().parent().parent().parent().prop("id"));
    var id = $(obj).parent().parent().parent().parent().prop("id");
    if(id === "borrow-table"){
        $("button[data-target='#confirm-borrow']").prop("class","hide");
    }else{
        $("button[data-target='#confirm-borrow']").prop("class","btn btn-success")
    }
    // for (var i = 0; i < books.data.length; i++) {
    //     if(bookName === books.data[i].bookName){
    //         //利用这个obj（书名）先对#detial添加内容
    //         $("#detial-book").html(bookName);
    //         break;
    //     }
    // }
}

//翻下一页
function next() {

}

//翻上一页
function previous() {

}


/**
 *  1. 图书检索
 */
//提交表单,查询书
$(function () {

});
// 搜索
function search() {
    var name = $("#bookName").val();
    var author = $("#bookAuthor").val();
    var genre = $("#genre").val();
    var publish = $("#publish").val();
    $.ajax({
        url:"",
        data:{},
        type:"post",
        success:function (data) {
            console.log(data);
            books = data;
            // $(".search-hide").prop("class","search-hide");
        },
        dataType:"json",
        error:function () {
            console.log("测试");
            $(".search-hide").prop("class","search-hide");
        }
    })
}
// 确认借阅
function confirm_borrow() {
    alert("已提交申请，等待审核");
    $(".confirm-close").click();
    $(".detial-close").click();
}

/**
 *  2. 我的借阅
 */
// 延期归还
function delay() {
    alert("提交成功，请等待审核！");
    $(".delay-close").click();
    // ajax提交信息
}

/**
 *  3. 管理
 */
function lock() {
    console.log($(".luser").val());
    console.log($(".lword").val());
    if($(".luser").val() === "mzp520" && $(".lword").val() === "mzp520"){
        $(".lock").prop("class","lock hide");
        $(".manage-row").prop("class","manage-row row");
    }
}
function manage_first_lock() {
    console.log($(".flock").val());
    if($(".flock").val() === "1"){
        $(".first-lock").prop("class","first-lock text-align hide");
        $(".lock").prop("class","lock");
    }
}
/**
 *  4. 我的图书
 */
// 点击分享上传新书籍
function upload() {
    alert("已提交信息，请等待管理员审核。请在工作日上班时间段至图书馆当面提供书籍，感谢您的分享！");
    $(".upload-close").click();
    MyBook();
}
// 我曾经上传的书籍
function MyBook() {
    // 取消表格隐藏
    $("#upload-table").prop("class","juli");
    // 隐藏语句
    $("#NoBook").prop("class","text-align font juli hide");
    // 写入信息
}
// 书籍主人请求撤回自己的书
function back() {

}

/**
 *  5. 联系管理员
 */
function submit_contact(obj) {
    // 利用obj获取textarea的内容
    console.log($(obj).parent().children(":eq(0)").val());
    alert("已发送至管理员");
    $(obj).parent().children(":eq(0)").val("");
    // 传信息到后台
}

/**
 *  6. 登录
 */
function login() {
    window.open("./login.html");
}






