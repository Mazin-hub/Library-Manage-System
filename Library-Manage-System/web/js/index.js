
var searchBooks,
    borrowBooks,
    myBooks,
    manageBooks;

/**
 *  7. 共享部分
 */
$(function () {
    /*
       获取用户借阅数据（无误数据要隐藏表格）、图书数据（无数据要隐藏语句）
       借阅数据需要做判断，判断状态，3种：延期、归还、超时归还，只有延期能点击
    */
    // 1. 借阅
    $.ajax({
        url:"",
        data:{},
        type:"post",
        success:function (data) {
            console.log(data);
            borrowBooks = data;
            if(data.data.length > 0){
                // 如果该用户现在借了书，那么不隐藏表格
                $("#borrow-table").prop("class","table table-bordered table-hover text-align");
                // var status = [];   // 登记 状态
                // for (var i = 0; i < borrowBooks.data.length; i++) {
                //     if(borrowBooks.data[i].status.equal("-1")){
                //         status.push({"status":"超时，请立即到实体图书馆归还"});
                //     }else if (borrowBooks.data[i].status.equal("0")){
                //         status.push({"status":"已归还"});
                //     }else if (borrowBooks.data[i].status.equal("1")){
                //         status.push({"status":"延期归还 or 现在归还"});
                //     }
                //     // length > 0 存在数据
                //     $("#borrow-table").append(
                //         "<tr>\n" +
                //         "<td>"+(i+1)+"</td>\n" +
                //         "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#detial\" onclick=detial(this)>"+borrowBooks.data[i].bookName+"</a></td>\n" +
                //         "<td>"+borrowBooks.data[i].author+"</td>\n" +
                //         "<td>"+borrowBooks.data[i].genre+"</td>\n" +
                //         "<td>"+borrowBooks.data[i].borrowDate+"</td>\n" +
                //         "<td>"+borrowBooks.data[i].returnDate+"</td>\n" +
                //         "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#delay-return\" onclick=delay_return()>"+status[i].status+"</a></td>\n" +
                //         "</tr>"
                //     );
                // }
            }
        },
        dataType:"json",
        error:function () {
            console.log("我的借阅ajax失败");
            $("#borrow-table").prop("class","table table-bordered table-hover text-align");
            for (var i = 0; i < 4; i++) {
                // length > 0 存在数据
                $("#borrow-table").append(
                    "<tr>\n" +
                    "<td>"+(i+1)+"</td>\n" +
                    "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#detial\" onclick=detial(this)>爱的教育</a></td>\n" +
                    "<td>?</td>\n" +
                    "<td>?</td>\n" +
                    "<td>?</td>\n" +
                    "<td>?</td>\n" +
                    "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#delay-return\" onclick=delay_return(this)>延期归还 or 现在归还</a></td>\n" +
                    "</tr>"
                );
            }
        }
    });
    // 2. 我的图书
    $.ajax({
        url:"",
        type:"post",
        data:{},
        success:function (data) {
            console.log(data);
            myBooks = data;
            // if(myBooks.data.length > 0){
            //     // 隐藏语句
            //     $("#NoBook").prop("class", "hide");
            //     $("#upload-table").prop("class","table table-bordered table-hover text-align");
            //     for (var i = 0; i < myBooks.data.length; i++) {
            //         $("#upload-table").append(
            //             "<tr>\n" +
            //             "<td>"+myBooks.data[i].bookName+"</td>\n" +
            //             "<td>"+myBooks.data[i].author+"</td>\n" +
            //             "<td>"+myBooks.data[i].uploadDate+"</td>\n" +
            //             "<td>"+myBooks.data[i].bookId+"</td>\n" +
            //             "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#book-condition\">查看状态</a></td>\n" +
            //             "</tr>"
            //         );
            //     }
            // }

            //其他
        },
        dataType:"json",
        error:function () {
            $("#upload-table").prop("class","table table-bordered table-hover text-align");
            console.log("我的图书请求失败");
            $("#upload-table").append(
                "<tr>\n" +
                "<td>?</td>\n" +
                "<td>?</td>\n" +
                "<td>?</td>\n" +
                "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#book-condition\">查看状态</a></td>\n" +
                "</tr>"
            );
        }
    })

})

// 点击书名显示书信息
function detial(obj) {
    console.log($(obj).parent().parent().parent().parent().prop("id"));
    console.log($(obj).parent().parent().children(":eq(0)").html());
    var tag = $("a[data-target='#delay-return']").html(),             // 借阅状态
        id = $(obj).parent().parent().parent().parent().prop("id"),    // 根据table的id判断是哪个页面
        index = $(obj).parent().parent().children(":eq(0)").html() - 1,   // 表格的序号和数据下标有关系
        detials = new Array(7),               //  借阅面板
        confirms = new Array(6),              //  确认借阅面板
        tempBooks;                          // detial(obj) 方法用于两个界面，而modal用的数据不同，作为中间变量赋值
    // 遇到是  能延期 或 能归还 的情况，那么不显示借阅，当且仅当是已归还的情况，搜索页面必定显示可借阅按钮
    if(tag === "已归还" || id === "search-table"){
        $("button[data-target='#confirm-borrow']").prop("class","btn btn-success");
    }else{
        $("button[data-target='#confirm-borrow']").prop("class","hide")
    }

    // 判断是哪个页面调用detial()
    if(id === "search-table"){
        // 搜索界面
        tempBooks = searchBooks;
    }else if(id === "borrow-table"){
        // 借阅界面
        tempBooks = borrowBooks;
    }
    // 借阅面板的赋值
    // detials.push(tempBooks.data[index].bookName);
    // detials.push(tempBooks.data[index].author);
    // detials.push(tempBooks.data[index].genre);
    // detials.push(tempBooks.data[index].publish);
    // detials.push(tempBooks.data[index].provider);
    // detials.push(tempBooks.data[index].total);
    // detials.push(tempBooks.data[index].now);
    // 确认借阅面板的赋值
    var date = new Date(),
        borrowDate =  date.getFullYear() + "-" + (date.getMonth()+1) + "-" +date.getDate(),
        returnDate = date.getFullYear() + "-" + (date.getMonth()+2) + "-" +date.getDate();
    // confirms.push(tempBooks.data[index].bookName);
    // confirms.push(tempBooks.data[index].author);
    // confirms.push(tempBooks.data[index].genre);
    // confirms.push(tempBooks.data[index].provider);
    // confirms.push(borrowDate);
    // confirms.push(returnDate);

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
        url:"",
        data:{"bookName":bookName,"author":author,"genre":genre,"publish":publish},
        type:"post",
        success:function (data) {
            console.log(data);
            searchBooks = data;
            // $(".search-hide").prop("class","search-hide");  // 取消class=hide
            // for (var i = 0; i < searchBooks.data.length; i++) {
            //     $("#search-table").append(
            //         "<tr>" +
            //         "<td>"+(i+1)+"</td>" +
            //         "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#detial\" onclick=detial(this)>"+searchBooks.data[i].bookName+"</a></td>\n" +
            //         "<td>"+searchBooks.data[i].author+"</td>\n" +
            //         "<td>"+searchBooks.data[i].genre+"</td>\n" +
            //         "<td>"+searchBooks.data[i].publish+"</td>\n" +
            //         "</tr>"
            //     );
            // }
        },
        dataType:"json",
        error:function () {
            console.log("搜索ajax失败");
            $(".search-hide").prop("class","search-hide");
        }
    });
    // i < searchBooks.data.length，为表格添加行，modal赋值在 detial() ,效果测试
    for (var i = 0; i < 2; i++) {
        $("#search-table").append(
            "<tr>" +
            "<td>"+(i+1)+"</td>" +
            "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#detial\" onclick=detial(this)>爱的教育</a></td>\n" +
            "<td>?</td>\n" +
            "<td>?</td>\n" +
            "<td>?</td>\n" +
            "</tr>"
        );
    }
}

// 1.2   确认借阅
function confirm_borrow() {
    alert("已提交申请，等待审核");
    var bookName = $(".confirm span[class='value']:nth-child(n)")[0].innerText,
        borrowDate = $(".confirm span[class='value']:nth-child(n)")[4].innerText,
        returnDate = $(".confirm span[class='value']:nth-child(n)")[5].innerText;
    // 插入 borrow ，设置 status 为 borrow 、request 为 0
    $.ajax({
        url:"",
        type:"post",
        data:{"bookName":bookName,"borrowDate":borrowDate,"returnDate":returnDate},
        success:function (data) {
            console.log(data.message);
            // 插入
            $("#borrow-table").append(
                "<tr>\n" +
                "<td>"+"表格末尾序号"+"</td>\n" +
                "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#detial\" onclick=detial(this)>爱的教育</a></td>\n" +
                "<td>?</td>\n" +
                "<td>?</td>\n" +
                "<td>?</td>\n" +
                "<td>?</td>\n" +
                "<td>等待审核</td>\n" +
                "</tr>"
            );
        },
        dataType:"json",
        error:function () {
            console.log("提交借阅申请失败");
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
    // console.log(bookName);
    // console.log(provider);
    // 插入 borrow ，找到对应记录 设置 request 为 1
    $.ajax({
        url:"",
        data:{"bookName":bookName,"provider":provider,"newReturnDate":tempDate},
        type:"post",
        success:function (data) {
            console.log(data.message);
        },
        dataType:"json"
    });
    $(".delay-close").click();
}

// 2.2  确定归还（按钮提交至管理员）
function reback(){
    var bookName = $(".delay span[class='value']")[0].innerText;
    // 根据书名，去borrow找到对应记录，设置status 为 return
    $.ajax({
        url:"",
        type:"post",
        data:{"bookName":bookName},
        success:function (data) {
            console.log(data.message);
        },
        dataType:"json",
        error:function () {
            console.log("归还失败");
        }
    })
}

// 2.3  为 modal 添加数据
function delay_return(obj) {
    // console.log($(obj).parent().parent().children(":eq(0)").html());
    var index = $(obj).parent().parent().children(":eq(0)").html() - 1,
        delays = new Array(5);
    // delays.push(borrowBooks.data[index].bookName);
    // delays.push(borrowBooks.data[index].author);
    // delays.push(borrowBooks.data[index].genre);
    // delays.push(borrowBooks.data[index].provider);
    // delays.push(borrowBooks.data[index].returnDate);
    // for (var i = 0; i < 5; i++) {
    //     $($(".delay span[class='value']:nth-child(n)")[i]).html(delays[i]);
    // }
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
    // $.ajax({
    //     url:"",
    //     data:{"user":user,"password":password},
    //     type:"post",
    //     success:function (data) {
    //         console.log(data.message);
    //         $(".lock").prop("class","lock hide");
    //         $(".manage-row").prop("class","manage-row row");
    //         manage_books();
    //     },
    //     dataType:"json"
    // });

    if($(".luser").val() === "mzp520" && $(".lword").val() === "mzp520"){
        $(".lock").prop("class","lock hide");
        $(".manage-row").prop("class","manage-row row");
    }
}

// 3.3  请求图书馆中的书,status 不为 -1 的都行
function manage_books() {
    $.ajax({
        url:"",
        data:{},
        type:"post",
        success:function (data) {
            console.log(data);
            manageBooks = data;
            show_manage_books();
        },
        dataType:"json",
        error:function () {
            $("#manage-table").append(
                "<tr>\n" +
                "<td>1</td>\n" +
                "<td>？</td>\n" +
                "<td>?</td>\n" +
                "<td>?</td>\n" +
                "<td>?</td>\n" +
                "<td>?</td>\n" +
                "<td>？</td>\n" +
                "<td><button class=\"btn btn-info mana-op\">修改</button></td>\n" +
                "<td><button class=\"btn btn-danger mana-op\">删除</button></td>\n" +
                "</tr>"
            );
        }
    });
}

// 3.4  添加、展示表格数据
function show_manage_books() {
    for (var i = 0; i < manageBooks.data.length; i++) {
        $("#manage-table").append(
            "<tr>\n" +
            "<td>"+(i+1)+"</td>\n" +
            "<td>"+manageBooks.data[i].bookName+"</td>\n" +
            "<td>"+manageBooks.data[i].author+"</td>\n" +
            "<td>"+manageBooks.data[i].genre+"</td>\n" +
            "<td>"+manageBooks.data[i].publish+"</td>\n" +
            "<td>"+manageBooks.data[i].uploadDate+"</td>\n" +
            "<td>"+manageBooks.data[i].provider+"</td>\n" +
            "<td><button class=\"btn btn-info mana-op\">修改</button></td>\n" +
            "<td><button class=\"btn btn-danger mana-op\">删除</button></td>\n" +
            "</tr>"
        );
    }
}

// 3.5  请求借阅处理页面展示
function req_borrow() {

}

// 3.6  请求归还处理页面展示
function req_return() {

}

// 3.7  请求延期处理页面展示
function req_delay() {

}

// 3.8  请求上传处理页面展示
function req_upload() {

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
        url:"",
        type:"post",
        data:{"bookName":bookName,"author":author,"provider":provider,"uploadDate":tempDate},
        success:function (data) {
            console.log(data.message);
            $("#upload-table").append(
                "<tr>\n" +
                "<td>"+bookName+"</td>\n" +
                "<td>"+author+"</td>\n" +
                "<td>"+tempDate+"</td>\n" +
                "<td><a href=\"javascript:;\" data-toggle=\"modal\" data-target=\"#book-condition\" onclick=upload_condition()>查看状态</a></td>\n" +
                "</tr>"
            );
        },
        dataType:"json",
        error:function () {
            console.log("请求分享书籍失败");
        }
    });

    $(".upload-close").click();
}

// 4.2  我的书籍的状态：已被借、正在审核、还未被借, 为modal添加数据
function upload_condition() {
    // 写入信息,分情况,写在标题
    $("#look-book").html();
    for (var i = 0; i < 5; i++) {
        $($(".condition span[class='value']:nth-child(n)")[i]).html();
    }

}

// 4.3  书籍主人请求撤回自己的书
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






