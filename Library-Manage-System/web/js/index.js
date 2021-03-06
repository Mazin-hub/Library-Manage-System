
var searchBooks,
    borrowBooks,
    myBooks,
    manageBooks,
    reqBorrow,
    reqReturn,
    reqDelay,
    reqUpload;

/**
 *  7. 共享部分
 */
$(function () {
    /*
       获取用户借阅数据（无误数据要隐藏表格）、图书数据（无数据要隐藏语句）
       借阅数据需要做判断，判断状态，3种：延期、归还、超时归还，只有延期能点击
    */
    // 1. 借阅
    borrow();
    // 2. 我的图书
    Mybooks();

});

// 点击书名显示书信息
function detial(obj) {
    console.log($(obj).parent().parent().parent().parent().prop("id"));
    console.log($(obj).parent().parent().children(":eq(0)").html());
    console.log($(obj).parent().parent().children(":eq(1)").children(":eq(0)").html());
    var id = $(obj).parent().parent().parent().parent().prop("id"),    // 根据table的id判断是哪个页面
        index = $(obj).parent().parent().children(":eq(0)").html() - 1,   // 表格的序号和数据下标有关系
        tag = $($(".tag:nth-child(n)"))[index].innerText,       // 借阅状态
        bookName = $(obj).parent().parent().children(":eq(1)").children(":eq(0)").html(),   // 查看详情的书名
        detials = new Array(),               //  借阅面板
        confirms = new Array(),              //  确认借阅面板
        tempBooks;                          // detial(obj) 方法用于两个界面，而modal用的数据不同，作为中间变量赋值
    // 判断是哪个页面调用detial()
    if(id === "search-table"){
        // 搜索界面
        tempBooks = searchBooks;
        // 根据 status 的状态量判断当前书籍是否被借
        if(searchBooks.data[index].status === "1"){
            $("button[data-target='#confirm-borrow']").prop("class","btn btn-success");
        }else if(searchBooks.data[index].status === "0"){
            $("button[data-target='#confirm-borrow']").prop("class","hide");
        }
    }else if(id === "borrow-table"){
        // 借阅界面
        tempBooks = borrowBooks;
        // 借阅页面 显示 “已归还”则可以借阅 ；
        if(tag === "已归还"){
            $("button[data-target='#confirm-borrow']").prop("class","btn btn-success");
        }else{
            $("button[data-target='#confirm-borrow']").prop("class","hide");
        }
    }
    // 借阅面板的赋值
    detials.push(tempBooks.data[index].bookName);
    detials.push(tempBooks.data[index].author);
    detials.push(tempBooks.data[index].genre);
    detials.push(tempBooks.data[index].publish);
    detials.push(tempBooks.data[index].provider);
    detials.push(tempBooks.data[index].total);
    detials.push(tempBooks.data[index].now);
    // 确认借阅面板的赋值
    var date = new Date(),
        borrowDate =  date.getFullYear() + "-" + (date.getMonth()+1) + "-" +date.getDate(),
        returnDate = date.getFullYear() + "-" + (date.getMonth()+2) + "-" +date.getDate();
    confirms.push(tempBooks.data[index].bookName);
    confirms.push(tempBooks.data[index].author);
    confirms.push(tempBooks.data[index].genre);
    confirms.push(tempBooks.data[index].provider);
    confirms.push(borrowDate);
    confirms.push(returnDate);

    // 对两个modal都进行相应赋值 ,
    for (var j = 0; j < 7; j++) {
        $($(".detial span[class='value']:nth-child(n)")[j]).html(detials[j]);
        $($(".confirm span[class='value']:nth-child(n)")[j]).html(confirms[j]);   // 越界的都是undefined，结果上没问题
    }
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
// 1.1   搜索
function search() {
    var bookName = $("#bookName").val(),
        author = $("#author").val(),
        genre = $("#genre").val(),
        publish = $("#publish").val();
    console.log(bookName);
    console.log(author);
    console.log(genre);
    console.log(publish);
    $.ajax({
        url:"./SearchServlet",
        data:{"bookName":bookName,"author":author,"genre":genre,"publish":publish},
        type:"post",
        success:function (data) {
            console.log(data);
            searchBooks = data;
            $(".search-hide").prop("class","search-hide");  // 取消class=hide
            // 这里需要多加个 tbody
            $("#search-table").html("<tbody><tr>\n" +
                "<th class=\"text-align\">序号</th>\n" +
                "<th class=\"text-align\">书名</th>\n" +
                "<th class=\"text-align\">作者</th>\n" +
                "<th class=\"text-align\">类别</th>\n" +
                "<th class=\"text-align\">出版日期</th>\n" +
                "</tr>");
            for (var i = 0; i < searchBooks.data.length; i++) {
                $("#search-table").append(
                    "<tr>" +
                    "<td>"+(i+1)+"</td>" +
                    "<td><a data-toggle=\"modal\" data-target=\"#detial\" onclick=detial(this)>"+searchBooks.data[i].bookName+"</a></td>\n" +
                    "<td>"+searchBooks.data[i].author+"</td>\n" +
                    "<td>"+searchBooks.data[i].genre+"</td>\n" +
                    "<td>"+searchBooks.data[i].publish+"</td>\n" +
                    "</tr>"
                );
            }
        },
        dataType:"json",
        error:function () {
            console.log("搜索ajax失败");
        }
    });
}

// 1.2   确认借阅
function confirm_borrow() {
    console.log("已提交申请，等待审核");
    var bookName = $(".confirm span[class='value']:nth-child(n)")[0].innerText,
        borrowDate = $(".confirm span[class='value']:nth-child(n)")[4].innerText,
        returnDate = $(".confirm span[class='value']:nth-child(n)")[5].innerText;
    console.log(bookName);
    console.log(borrowDate);
    console.log(returnDate);
    // 插入 borrow ，设置 status 为 borrow 、request 为 0
    $.ajax({
        url:"./confirmBorrowServlet",
        type:"post",
        data:{"bookName":bookName,"borrowDate":borrowDate,"returnDate":returnDate},
        success:function (data) {
            console.log(data.message);
            if(data.message === "申请借阅失败"){
                alert("申请借阅失败");
            }else{
                // 插入,这里是重新更新“我的借阅”界面
                borrow();
            }
        },
        dataType:"json",
        error:function () {
            console.log("ajax提交借阅申请失败");
        }
    });
    $(".confirm-close").click();
    $(".detial-close").click();
}

/**
 *  2. 我的借阅
 */
// 2.1  确定延期归还（按钮提交至管理员）
function delay() {
    var tempDate,
        bookName,
        provider;
    // alert("提交成功，请等待审核！");
    tempDate = $("#delay-date").val();
    console.log(tempDate);
    bookName = $(".delay span[class='value']")[0].innerText;
    provider = $(".delay span[class='value']")[3].innerText;
    console.log(bookName);
    console.log(provider);
    // 插入 borrow ，找到对应记录 设置 request 为 1
    $.ajax({
        url:"./borrowDelayServlet",
        data:{"bookName":bookName,"provider":provider,"newReturnDate":tempDate},
        type:"post",
        success:function (data) {
            borrow();
            console.log(data.message);
        },
        dataType:"json"
    });
    $(".delay-close").click();
}

// 2.2  确定归还（按钮提交至管理员）
function reback(){
    var bookName = $(".delay span[class='value']")[0].innerText,
        provider = $(".delay span[class='value']")[3].innerText;
    // 根据书名、提供人，去borrow找到对应记录，设置wstatus 为 return
    console.log(bookName);
    console.log(provider);
    $.ajax({
        url:"./borrowReturnServlet",
        type:"post",
        data:{"bookName":bookName,"provider":provider},
        success:function (data) {
            borrow();
            console.log(data.message);
        },
        dataType:"json",
        error:function () {
            console.log("归还失败");
        }
    });
    $(".delay-close").click();
}

// 2.3  为 modal 添加数据
function delay_return(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());  // 下标
    var index = $(obj).parent().parent().children(":eq(0)").html() - 1,
        delays = new Array();
    delays.push(borrowBooks.data[index].bookName);
    delays.push(borrowBooks.data[index].author);
    delays.push(borrowBooks.data[index].genre);
    delays.push(borrowBooks.data[index].provider);
    delays.push(borrowBooks.data[index].returnDate);
    for (var i = 0; i < 5; i++) {
        $($(".delay span[class='value']:nth-child(n)")[i]).html(delays[i]);
    }
}

//2.4 为 “我的借阅”页面添加表格信息
function borrow() {
    $.ajax({
        url:"./borrowTableServlet",
        data:{},
        type:"post",
        success:function (data) {
            console.log(data);
            borrowBooks = data;
            $("#borrow-table").html("<tbody><tr>\n" +
                "<th class=\"text-align\">序号</th>\n" +
                "<th class=\"text-align\">书名</th>\n" +
                "<th class=\"text-align\">作者</th>\n" +
                "<th class=\"text-align\">类别</th>\n" +
                "<th class=\"text-align\">借阅日期</th>\n" +
                "<th class=\"text-align\">归还日期</th>\n" +
                "<th class=\"text-align\">状态</th>\n" +
                "</tr>");
            if(borrowBooks.data.length > 0){
                // 如果该用户现在借了书，那么不隐藏表格
                $("#borrow-table").prop("class","table table-bordered table-hover text-align");
                var status = [];   // 登记 状态
                for (var i = 0; i < borrowBooks.data.length; i++) {
                    switch (borrowBooks.data[i].wstatus) {
                        case "-1": status.push({"status":"超时"}); break;
                        case "0" : status.push({"status":"已归还"}); break;
                        case "1" : status.push({"status":"延期归还 or 现在归还"});break;
                        case "borrow" : status.push({"status":"借阅审核中"});break;
                        case "fail" : status.push({"status":"无法继续延期"});break;
                        case "return": status.push({"status":"归还审核中"});break;
                    }
                    if(borrowBooks.data[i].request !== "0"){
                        status[i].status = "延期审核中";
                    }
                    if(status[i].status !== "延期归还 or 现在归还"){
                        $("#borrow-table").append(
                            "<tr>\n" +
                            "<td>"+(i+1)+"</td>\n" +
                            "<td><a data-toggle=\"modal\" data-target=\"#detial\" onclick=detial(this)>"+borrowBooks.data[i].bookName+"</a></td>\n" +
                            "<td>"+borrowBooks.data[i].author+"</td>\n" +
                            "<td>"+borrowBooks.data[i].genre+"</td>\n" +
                            "<td>"+borrowBooks.data[i].borrowDate+"</td>\n" +
                            "<td>"+borrowBooks.data[i].returnDate+"</td>\n" +
                            "<td class='tag'>"+status[i].status+"</td>\n" +
                            "</tr>"
                        );
                    }else{
                        $("#borrow-table").append(
                            "<tr>\n" +
                            "<td>"+(i+1)+"</td>\n" +
                            "<td><a data-toggle=\"modal\" data-target=\"#detial\" onclick=detial(this)>"+borrowBooks.data[i].bookName+"</a></td>\n" +
                            "<td>"+borrowBooks.data[i].author+"</td>\n" +
                            "<td>"+borrowBooks.data[i].genre+"</td>\n" +
                            "<td>"+borrowBooks.data[i].borrowDate+"</td>\n" +
                            "<td>"+borrowBooks.data[i].returnDate+"</td>\n" +
                            "<td><a class='tag' data-toggle=\"modal\" data-target=\"#delay-return\" onclick=delay_return(this)>"+status[i].status+"</a></td>\n" +
                            "</tr>"
                        );
                    }
                }
            }
        },
        dataType:"json",
        error:function () {
            console.log("我的借阅ajax失败");
        }
    });
}

/**
 *  3. 管理
 */
// 3.1  页面第一层锁
function manage_first_lock() {
    console.log($(".flock").val());
    if($(".flock").val() === "1"){
        $(".first-lock").prop("class","first-lock text-align hide");
        $(".lock").prop("class","lock");
    }
}

// 3.2  页面第二层锁
function lock() {
    console.log($(".luser").val());
    console.log($(".lword").val());
    var user = $(".luser").val(),
        password = $(".lword").val();
    // 管理员帐号密码去数据库查询
    $.ajax({
        url:"./ManageAdminServlet",
        data:{"user":user,"password":password},
        type:"post",
        success:function (data) {
            console.log(data.message);
            if(data.data === "1"){
                 $(".lock").prop("class","lock hide");
                 $(".manage-row").prop("class","manage-row row");
                 manage_books();
             }
        },
        dataType:"json"
    });
}

// 3.3  请求图书馆中 book 的书,status 不为 -1 的都行
function manage_books() {
    $.ajax({
        url:"./ManageBooksServlet",
        data:{},
        type:"post",
        success:function (data) {
            console.log(data);
            manageBooks = data;
            show_manage_books();
        },
        dataType:"json",
        error:function () {
           console.log("ajax请求书籍失败");
        }
    });
}

// 3.4  添加、展示表格数据
function show_manage_books() {
    $("#manage-table").html(
        "<tobdy><tr>\n" +
        "<th class=\"text-align\">书号</th>\n" +
        "<th class=\"text-align\">书名</th>\n" +
        "<th class=\"text-align\">作者</th>\n" +
        "<th class=\"text-align\">类别</th>\n" +
        "<th class=\"text-align\">出版日期</th>\n" +
        "<th class=\"text-align\">上传日期</th>\n" +
        "<th class=\"text-align\">提供人</th>\n" +
        "<th class=\"text-align\">状态量</th>\n" +
        "<th class=\"text-align\">修改信息</th>\n" +
        "<th class=\"text-align\">删除数据</th>\n" +
        "</tr>"
    );
    for (var i = 0; i < manageBooks.data.length; i++) {
        $("#manage-table").append(
            "<tr>\n" +
            "<td>"+manageBooks.data[i].bookId+"</td>\n" +
            "<td>"+manageBooks.data[i].bookName+"</td>\n" +
            "<td>"+manageBooks.data[i].author+"</td>\n" +
            "<td>"+manageBooks.data[i].genre+"</td>\n" +
            "<td>"+manageBooks.data[i].publish+"</td>\n" +
            "<td>"+manageBooks.data[i].uploadDate+"</td>\n" +
            "<td>"+manageBooks.data[i].provider+"</td>\n" +
            "<td>"+manageBooks.data[i].status+"</td>\n" +
            "<td><a class='btn btn-info mana-op' data-toggle=\"modal\" data-target=\"#modify\" onclick=modify(this)>修改</a></td>\n" +
            "<td><button class=\"btn btn-danger mana-op\" onclick=del(this)>删除</button></td>\n" +
            "</tr>"
        );
    }
}
// 3.4.1 为modal添加数据
function modify(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());  // 定位表格
    var bookId = $(obj).parent().parent().children(":eq(0)").html(),
        bookName = $(obj).parent().parent().children(":eq(1)").html(),
        author = $(obj).parent().parent().children(":eq(2)").html(),
        genre = $(obj).parent().parent().children(":eq(3)").html(),
        publish = $(obj).parent().parent().children(":eq(4)").html(),
        uploadDate = $(obj).parent().parent().children(":eq(5)").html(),
        provider = $(obj).parent().parent().children(":eq(6)").html(),
        status = $(obj).parent().parent().children(":eq(7)").html();

    $(".bookId").html(bookId);
    $(".bookName").val(bookName);
    $(".author").val(author);
    $(".genre").val(genre);
    $(".uploadDate").val(uploadDate);
    $(".publish").val(publish);
    $(".provider").html(provider);
    $(".status").html(status);
}
// 3.4.3 确认修改
function confirmModify() {
    var MbookName = $(".bookName").val(),
        Mauthor = $(".author").val(),
        Mgenre = $(".genre").val(),
        MuploadDate = $(".uploadDate").val(),
        Mpublish = $(".publish").val(),
        bookId =  $(".bookId").html();
    console.log(MbookName);
    console.log(Mauthor);
    console.log(Mgenre);
    console.log(MuploadDate);
    console.log(Mpublish);
    console.log(bookId);
    var flag = confirm("确认修改吗？");
    if(flag){
        $.ajax({
            url:"./ManageModifyServlet",
            data:{"MbookName":MbookName,"Mauthor":Mauthor,"Mgenre":Mgenre,"MuploadDate":MuploadDate,"Mpublish":Mpublish,"bookId":bookId},
            type:"post",
            success:function (data) {
                console.log(data.message);
                manage_books();
            },
            dataType:"json",
            error:function () {
                console.log("ajax修改失败");
            }
        });
        $(".modify-close").click();
    }
}
// 3.4.2 删除记录
function del(obj) {
    var bookId = $(obj).parent().parent().children(":eq(0)").html();
    console.log(bookId);
    var flag = confirm("确认删除吗?");
    if(flag){
        $.ajax({
            url:"./ManageDeleteServlet",
            data:{"bookId":bookId},
            type:"post",
            success:function (data) {
                console.log(data.message);
            },
            dataType:"json",
            error:function () {
                console.log("ajax删除失败");
            }
        });
    }
}

// 3.5  请求借阅处理页面展示, borrow表 里 status 为 borrow 的记录
function req_borrow() {
    $.ajax({
        url:"./ManageDealBorrowServlet",
        type:"post",
        success:function (data) {
            console.log(data);
            reqBorrow = data;
            $("#req-borrow").html("<tobdy><tr>\n" +
                "<th class=\"text-align\">书号</th>\n" +
                "<th class=\"text-align\">书名</th>\n" +
                "<th class=\"text-align\">作者</th>\n" +
                "<th class=\"text-align\">提供人</th>\n" +
                "<th class=\"text-align\">借阅人</th>\n" +
                "<th class=\"text-align\">借阅日期</th>\n" +
                "<th class=\"text-align\">归还日期</th>\n" +
                "<th class=\"text-align\">通过请求</th>\n" +
                "<th class=\"text-align\">驳回请求</th>\n" +
                "</tr>");
            if(reqBorrow.data !== null){
                for (var i = 0; i < reqBorrow.data.length; i++) {
                    $("#req-borrow").append(
                        "<tr>\n" +
                        "<td>"+reqBorrow.data[i].bookId+"</td>\n" +
                        "<td>"+reqBorrow.data[i].bookName+"</td>\n" +
                        "<td>"+reqBorrow.data[i].author+"</td>\n" +
                        "<td>"+reqBorrow.data[i].provider+"</td>\n" +
                        "<td>"+reqBorrow.data[i].userName+"</td>\n" +
                        "<td>"+reqBorrow.data[i].borrowDate+"</td>\n" +
                        "<td>"+reqBorrow.data[i].returnDate+"</td>\n" +
                        "<td><button class=\"btn btn-info mana-op\" onclick=pass_borrow(this)>通过</button></td>\n" +
                        "<td><button class=\"btn btn-danger mana-op\" onclick=reject_borrow(this)>驳回</button></td>\n" +
                        "</tr>"
                    );
                }
            }
        },
        dataType:"json",
        error:function () {
            console.log("请求借阅处理失败");
        }
    })
}
// 3.5.1  通过借阅请求, 将borrow表对应记录的wstatus由 borrow 改为 1
function pass_borrow(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());
    console.log($(obj).parent().parent().children(":eq(4)").html());
    var bookId = $(obj).parent().parent().children(":eq(0)").html(),
        userName = $(obj).parent().parent().children(":eq(4)").html();
    var flag = confirm("是否通过请求？");
    if(flag){
        $.ajax({
            url:"./ManagePassBorrowServlet",
            type:"post",
            data:{"bookId":bookId,"userName":userName},
            success:function (data) {
                console.log(data);
                req_borrow();
            },
            dataType:"json",
            error:function () {
                console.log("ajax请求通过借阅失败")
            }
        });
    }
}
// 3.5.2  驳回借阅请求，删除对应borrow表的记录
function reject_borrow(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());
    console.log($(obj).parent().parent().children(":eq(4)").html());
    var bookId = $(obj).parent().parent().children(":eq(0)").html(),
        userName = $(obj).parent().parent().children(":eq(4)").html();
    var flag = confirm("确认驳回吗?");
    if(flag){
        $.ajax({
            url:"./ManageRejectBorrowServlet",
            type:"post",
            data:{"bookId":bookId,"userName":userName},
            success:function (data) {
                console.log(data.message);
                req_borrow();
            },
            dataType:"json"
        })
    }
}

// 3.6  请求归还处理页面展示  borrow表 里 status 为 return 的记录
function req_return() {
    $.ajax({
        url:"./ManageDealReturnServlet",
        type:"post",
        success:function (data) {
            console.log(data);
            reqReturn = data;
            $("#req-return").html("<tobdy><tr>\n" +
                "<th class=\"text-align\">书号</th>\n" +
                "<th class=\"text-align\">书名</th>\n" +
                "<th class=\"text-align\">作者</th>\n" +
                "<th class=\"text-align\">提供人</th>\n" +
                "<th class=\"text-align\">借阅人</th>\n" +
                "<th class=\"text-align\">借阅日期</th>\n" +
                "<th class=\"text-align\">归还日期</th>\n" +
                "<th class=\"text-align\">处理</th>\n" +
                "</tr>");
            if(reqReturn.data !== null){
                for (var i = 0; i < reqReturn.data.length; i++) {
                    $("#req-return").append(
                        "<tr>\n" +
                        "<td>"+reqReturn.data[i].bookId+"</td>\n" +
                        "<td>"+reqReturn.data[i].bookName+"</td>\n" +
                        "<td>"+reqReturn.data[i].author+"</td>\n" +
                        "<td>"+reqReturn.data[i].provider+"</td>\n" +
                        "<td>"+reqReturn.data[i].userName+"</td>\n" +
                        "<td>"+reqReturn.data[i].borrowDate+"</td>\n" +
                        "<td>"+reqReturn.data[i].returnDate+"</td>\n" +
                        "<td><button class=\"btn btn-info mana-op\" onclick=pass_return(this)>确认归还</button></td>\n" +
                        "</tr>"
                    );
                }
            }
        },
        dataType:"json",
        error:function () {
            console.log("请求归还处理失败");
        }
    })
}
// 3.6.1  通过确认归还，修改borrow 对应记录的status 为 0
function pass_return(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());
    console.log($(obj).parent().parent().children(":eq(4)").html());
    var bookId = $(obj).parent().parent().children(":eq(0)").html(),
        userName = $(obj).parent().parent().children(":eq(4)").html();
    var flag = confirm("确认通过吗？");
    if(flag){
        $.ajax({
            url:"./ManagePassReturnServlet",
            type:"post",
            data:{"bookId":bookId,"userName":userName},
            success:function (data) {
                console.log(data.message);
                req_return();
            },
            dataType:"json",
            error:function () {
                console.log("ajax请求归还失败");
            }
        })
    }
}

// 3.7  请求延期处理页面展示, borrow表 里 request 不为 0 的记录
function req_delay() {
    $.ajax({
        url:"./ManageDealDelayServlet",
        type:"post",
        success:function (data) {
            console.log(data);
            reqDelay = data;
            $("#req-delay").html("<tobdy><tr>\n" +
                "<th class=\"text-align\">书号</th>\n" +
                "<th class=\"text-align\">书名</th>\n" +
                "<th class=\"text-align\">作者</th>\n" +
                "<th class=\"text-align\">提供人</th>\n" +
                "<th class=\"text-align\">借阅人</th>\n" +
                "<th class=\"text-align\">借阅日期</th>\n" +
                "<th class=\"text-align\">归还日期</th>\n" +
                "<th class=\"text-align\">请求延期至</th>" +
                "<th class=\"text-align\"></th>" +
                "<th class=\"text-align\"></th>\n" +
                "</tr>");
            if(reqDelay.data !== null){
                for (var i = 0; i < reqDelay.data.length; i++) {
                    $("#req-delay").append(
                        "<tr>\n" +
                        "<td>"+reqDelay.data[i].bookId+"</td>\n" +
                        "<td>"+reqDelay.data[i].bookName+"</td>\n" +
                        "<td>"+reqDelay.data[i].author+"</td>\n" +
                        "<td>"+reqDelay.data[i].provider+"</td>\n" +
                        "<td>"+reqDelay.data[i].userName+"</td>\n" +
                        "<td>"+reqDelay.data[i].borrowDate+"</td>\n" +
                        "<td>"+reqDelay.data[i].returnDate+"</td>\n" +
                        "<td>"+reqDelay.data[i].request+"</td>\n" +
                        "<td><button class=\"btn btn-info mana-op\" onclick=pass_delay(this)>通过</button></td>\n" +
                        "<td><button class=\"btn btn-danger mana-op\" onclick=reject_delay(this)>驳回</button></td>\n" +
                        "</tr>"
                    );
                }
            }
        },
        dataType:"json",
        error:function () {
            console.log("请求延期处理失败");
        }
    })
}
// 3.7.1  通过延期申请，borrow表 里 requset 改为0，returnDate置为新
function pass_delay(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());
    console.log($(obj).parent().parent().children(":eq(4)").html());
    console.log($(obj).parent().parent().children(":eq(7)").html());
    var bookId = $(obj).parent().parent().children(":eq(0)").html(),
        userName = $(obj).parent().parent().children(":eq(4)").html(),
        newReturnDate = $(obj).parent().parent().children(":eq(7)").html(),
        flag = confirm("确认通过吗？");
    if(flag){
        $.ajax({
            url:"./ManagePassDelayServlet",
            type:"post",
            data:{"bookId":bookId,"userName":userName,"newReturnDate":newReturnDate},
            success:function (data) {
                console.log(data);
                req_delay();
            },
            dataType:"json",
            error:function () {
                console.log("ajax通过延期处理失败");
            }
        })
    }
}
// 3.7.2  驳回延期申请 ， borrow表 里 requset 重新改为0 （需要通知用户么？）
function reject_delay(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());
    console.log($(obj).parent().parent().children(":eq(4)").html());
    var bookId = $(obj).parent().parent().children(":eq(0)").html(),
        userName = $(obj).parent().parent().children(":eq(4)").html(),
        flag = confirm("确认驳回吗？");
    if(flag){
        $.ajax({
            url:"./ManageRejectDelayServlet",
            type:"post",
            data:{"bookId":bookId,"userName":userName},
            success:function (data) {
                console.log(data);
                req_delay();
            },
            dataType:"json",
            error:function () {
                console.log("ajax驳回延期处理失败");
            }
        })
    }
}

// 3.8  请求上传处理页面展示 ， book 表 status 为 -1 的记录
function req_upload() {
    $.ajax({
        url:"./ManageDealUploadServlet",
        type:"post",
        success:function (data) {
            console.log(data);
            reqUpload = data;
            $("#req-upload").html("<tbody><tr>\n" +
                "<th class=\"text-align\">书号</th>\n" +
                "<th class=\"text-align\">书名</th>\n" +
                "<th class=\"text-align\">作者</th>\n" +
                "<th class=\"text-align\">提供人</th>\n" +
                "<th class=\"text-align\">上传日期</th>\n" +
                "<th class=\"text-align\">通过分享</th>" +
                "<th class=\"text-align\">驳回分享</th>\n" +
                "</tr>");
            if(reqUpload.data !== null) {
                for (var i = 0; i < reqUpload.data.length; i++) {
                    $("#req-upload").append(
                        "<tr>\n" +
                        "<td>"+reqUpload.data[i].bookId+"</td>\n" +
                        "<td>"+reqUpload.data[i].bookName+"</td>\n" +
                        "<td>"+reqUpload.data[i].author+"</td>\n" +
                        "<td>"+reqUpload.data[i].provider+"</td>\n" +
                        "<td>"+reqUpload.data[i].uploadDate+"</td>\n" +
                        "<td><button class=\"btn btn-info mana-op\" onclick=pass_upload(this)>通过</button></td>\n" +
                        "<td><button class=\"btn btn-danger mana-op\" onclick=reject_upload(this)>驳回</button></td>\n" +
                        "</tr>"
                    );
                }
            }
        },
        dataType:"json",
        error:function () {
            console.log("ajax请求上传处理失败");
        }
    })
}
// 3.8.1 通过上传请求
function pass_upload(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());
    var bookId = $(obj).parent().parent().children(":eq(0)").html(),
        flag = confirm("确认通过吗？");
    if(flag){
        $.ajax({
            url:"./ManagePassUploadServlet",
            type:"post",
            data:{"bookId":bookId},
            success:function (data) {
                console.log(data);
                req_upload();
            },
            dataType:"json",
            error:function () {
                console.log("ajax通过上传失败");
            }
        })
    }
}
// 3.8.2 驳回上传请求
function reject_upload(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());
    var bookId = $(obj).parent().parent().children(":eq(0)").html(),
        flag = confirm("确认驳回吗？");
    if(flag){
        $.ajax({
            url:"./ManageRejectUploadServlet",
            type:"post",
            data:{"bookId":bookId},
            success:function (data) {
                console.log(data);
                req_upload();
            },
            dataType:"json",
            error:function () {
                console.log("ajax驳回上传失败");
            }
        })
    }
}

/**
 *  4. 我的图书
 */
// 4.1  点击分享上传新书籍
function upload() {
    alert("已提交信息，请等待管理员审核。请在工作日上班时间段至图书馆当面提供书籍，感谢您的分享！");
    var bookName = $("input[name='bookName']").val(),
        author = $("input[name='author']").val(),
        provider = $("input[name='provider']").val(),
        date = new Date(),
        tempDate;
    tempDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    // 插入到 book ，设 status 为 -1
    $.ajax({
        url:"./uploadMyBookServlet",
        type:"post",
        data:{"bookName":bookName,"author":author,"provider":provider,"uploadDate":tempDate},
        success:function (data) {
            console.log(data.message);
            Mybooks();
        },
        dataType:"json",
        error:function () {
            console.log("请求分享书籍失败");
        }
    });

    $(".upload-close").click();
}

var MyBookIndex;
// 4.2  我的书籍的状态：已被借、正在审核、还未被借, 为modal添加数据
function upload_condition(obj) {
    console.log($(obj).parent().parent().children(":eq(0)").html());  // 序号
    MyBookIndex = $(obj).parent().parent().children(":eq(0)").html() - 1;
    var info = new Array(),
        index = MyBookIndex;
    info.push(myBooks.data[index].userName);
    info.push(myBooks.data[index].borrowDate);
    info.push(myBooks.data[index].returnDate);
    switch (myBooks.data[index].status) {
        case "1": info.push("无人借用");break;
        case "0": info.push("被借用");break;
        case "-1": info.push("上传审核中");break;
    }
    if(myBooks.data[index].recall === 1){
        info[3] = "管理员正在处理撤回";
    }
    // 写入信息,分情况,写在标题
    // $("#look-book").html();
    for (var i = 0; i < 4; i++) {
        $($(".condition span[class='value']:nth-child(n)")[i]).html(info[i]);
    }
}

// 4.3  书籍主人请求撤回自己的书
function back() {
    console.log(MyBookIndex);
    $.ajax({
        url:"./MyBookBackServlet",
        data:{"bookId":myBooks.data[MyBookIndex].bookId},
        type:"post",
        success:function (data) {
            console.log(data.message);
            Mybooks();
        },
        dataType:"json",
        error:function () {
            console.log("撤回失败");
        }
    });
    $(".upload-close").click();
}

// 4.4 为 “我的图书”界面添加表格
function Mybooks() {
    $.ajax({
        url:"./MyBooksTableServlet",
        type:"post",
        data:{},
        success:function (data) {
            console.log(data);
            myBooks = data;
            if(myBooks.data.length > 0){
                $("#upload-table").html("<tbody><tr>\n" +
                    "<th class=\"text-align\">序号</th>\n" +
                    "<th class=\"text-align\">书名</th>\n" +
                    "<th class=\"text-align\">作者</th>\n" +
                    "<th class=\"text-align\">提交日期</th>\n" +
                    "<th class=\"text-align\">状态</th>\n" +
                    "</tr>");
                // 隐藏语句
                $("#NoBook").prop("class", "hide");
                $("#upload-table").prop("class","table table-bordered table-hover text-align");
                for (var i = 0; i < myBooks.data.length; i++) {
                    $("#upload-table").append(
                        "<tr>\n" +
                        "<td>"+(i+1)+"</td>\n" +
                        "<td>"+myBooks.data[i].bookName+"</td>\n" +
                        "<td>"+myBooks.data[i].author+"</td>\n" +
                        "<td>"+myBooks.data[i].uploadDate+"</td>\n" +
                        "<td><a data-toggle=\"modal\" data-target=\"#book-condition\" onclick=upload_condition(this)>查看状态</a></td>\n" +
                        "</tr>"
                    );
                }
            }
            //其他
        },
        dataType:"json",
        error:function () {
            console.log("我的图书请求失败");
        }
    });
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






