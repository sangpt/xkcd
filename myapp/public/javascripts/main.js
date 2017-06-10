/* global $ */
/* global Image */

// load fb sdk
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.9";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
 
// array chua cac comic da load ve
var comics = []
$(document).ready(function() {
    // load truoc 10 comic
    // $("#info").hide()
    for (var i=0; i<10; i++){
        $.ajax({
            type: 'POST',
            url: '/random',
            success: function(res){
                comics.push(res)
            }
        });
    }
  
    // tai anh truoc de load anh nhanh hon
    function getNextImg() {
        var comic = comics.shift()
        
        // bo qua cac comic loi
        while(comic == "") {
            comic = comics.shift()
        }
        
        var nextImg = $("<img />")
        nextImg.attr('src', comic.img)
        nextImg.attr('title', comic.alt);
        nextImg.attr('id', 'img');
        $("#title").text(comic.title);
        $("#num").text('#' + comic.num);
        
        // show info comic
        $("#tnum").text(comic.num);
        $("#tsafe_title").text(comic.safe_title);
        $("#ttitle").text(comic.title);
        $("#timg").text(comic.img);
        $("#tdate").text(comic.year + "/" + comic.month + "/" + comic.day);
        $("#ttrans").text(comic.transcript);
        $("#talt").text(comic.alt);
        
        return nextImg;
    }
    
    $('#next').click(function() {
        
        var $nextImg = getNextImg()
        
        // tao hieu ung khi thay doi img
        $("#img").fadeOut(400, function() {
            $('#img').replaceWith($nextImg);
        }).fadeIn(400);
        $.ajax({
            type: 'POST',
            url: '/random',
            success: function(res){
                comics.push(res)
            }
        });
        
    })
    
    // tim kiem comic theo id
    $("#frm").submit(function(e) {
        var id = $('#id_comic').val();
        $.ajax({
            type: 'POST',
            url: '/search',
            data: {id: id},
            success: function(res){
                if(res != 'error') {
                    $("#title").text(res.title);
                    $("#num").text('#' + res.num);
                    $("#img").attr('src', res.img);
                    $("#img").attr('title', res.alt);
                    
                    $("#tnum").text(res.num);
                    $("#tsafe_title").text(res.safe_title);
                    $("#ttitle").text(res.title);
                    $("#timg").text(res.img);
                    $("#tdate").text(res.year + "/" + res.month + "/" + res.day);
                    $("#ttrans").text(res.transcript);
                    $("#talt").text(res.alt);
                } else {
                    alert('Error. ID 1 -> 1848')
                }
                
            },
            error: function() {
                alert('error')
            }
        });
        e.preventDefault();
    })
    
    $("#btn_info").click(function(){
        $("#info").toggle();
    });
});
