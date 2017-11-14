/**
 * Created by yuanyongjun on 2017/11/14.
 */

var perpage = 2;
var page = 1;
var pages = 0;
var comments=[];


$('#messageBtn').on('click', function () {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        dataType: 'json',
        data: {
            contentid: $('#contentId').val(),
            content: $('#messageContent').val()
        },
        success: function (responseData) {
            $('#messageContent').val('');
            comments=responseData.data.comments.reverse();
            renderComment();
        }
    });
});

$.ajax({
    type: 'GET',
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val()
    },
    success: function (responseData) {
        comments=responseData.data.comments.reverse();
        renderComment();
    }
});

$('.pager').delegate('a','click',function(){
    if($(this).parent().hasClass('previous')){
        page--;
    }else{
        page++;
    }
    renderComment();
});

function renderComment() {
    $('#messageCount').html(comments.length);

    if(comments.length==0){
        $('.messageList').html('<div class="noMessage"><p>还没有评论</p></div>');
        return;
    }

    pages=Math.ceil(comments.length/perpage);
    var start=Math.max(0,((page-1)*perpage));
    var end=Math.min((start+perpage),comments.length);

    var $listComments=$('.pager li');

    if(comments.length>0){
        $listComments.eq(1).html(page+' / '+pages);
        if(page<=1){
            page=1;
            $listComments.eq(0).html('<span>没有上一页</span>');
        }else{
            $listComments.eq(0).html('<a href="javascript:;">上一页</a>');
        }

        if(page>=pages){
            page=pages;
            $listComments.eq(2).html('<span>没有下一页</span>');
        }else{
            $listComments.eq(2).html('<a href="javascript:;">下一页</a>');
        }
    }


    var html = '';
    for (var i = start; i < end; i++) {
        html += '<div class="messageBox">' +
            '<span class="messPerson">' + comments[i].username + '</span><span class="messTime">' + formatDate(comments[i].postTime) + '</span><div class="clear"></div>' +
            '<p class="messInfo">' + comments[i].content + '</p></div>';
    }
    $('.messageList').html(html);
}

function formatDate(d) {
    var date = new Date(d);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours(2) + ':' + date.getMinutes(2) + ':' + date.getSeconds(2);
}