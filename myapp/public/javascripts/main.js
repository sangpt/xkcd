/* global $ */
/* global Image */

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.9";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
  
var comics = []
$(document).ready(function() {
    // load truoc 10 comic
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
        var nextImg = $("<img />")
        nextImg.attr('src', comic.img)
        nextImg.attr('title', comic.alt);
        nextImg.attr('id', 'img');
        $("#title").text(comic.title);
        $("#num").text('#' + comic.num);
        return nextImg;
    }
    
    $('#next').click(function() {
        
        var $nextImg = getNextImg()
        
        // tao hieu ung khi thay doi img
        $("#img").fadeOut(400, function() {
            $('#img').replaceWith($nextImg);
        }).fadeIn(400);
        // $("#img").fadeOut('slow')
        // $('#img').replaceWith($nextImg)
        // $("#img").fadeIn('slow')
        // lay them 1 comic de bu vao
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
                } else {
                    alert('Error. ID 1 -> 1845')
                }
                
            },
            error: function() {
                alert('error')
            }
        });
        e.preventDefault();
    })
});



// $(document).ready(function() {
//     $('#next').click(function() {
//         var url = 'https://www.xkcd.com/' + random(1, 1800) + '/info.0.json';
//         $("#test").load(url);
//     })
// });

// function random(min,max)
// {
//     return Math.floor(Math.random()*(max-min+1)+min);
// }