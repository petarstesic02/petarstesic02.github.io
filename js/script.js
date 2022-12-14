$(document).ready(function(){

    let arrayTitle=[
        "MUSIC DISTRIBUTION TO ALL PLATFORMS",
        "LOGIN FROM ANYWHERE IN THE WORLD",
        "GET REWARDED FOR BEING THE BEST"
    ];
    let arrayText=
    [
        "With our services, you are able to distribute your music to all platforms worldwide.",
        "You can login from anywhere, on any device.",
        "We provide our best performing artists with a home studio."
    ];
    let arrayImages=[
        'url("images/about-img.png1")',
        'url("images/about-img.png")',
        'url("images/about-img2.png")'
    ];
    function contentDynamic(){

        let i=Math.floor((Math.random()*3)+1);
        $('#title').text(arrayTitle[i]);
        $('#dynamic_text').text(arrayText[i]);
        $('#pictureDynamic').css('background-image',arrayImages[i]);

    }
    setInterval(contentDynamic,3000);

})

$('#display1').click(function(){
    $('#button-p-1').slideToggle();
})

$('#display2').click(function(){
    $('#button-p-2').slideToggle();
})

$('#display3').click(function(){
    $('#button-p-3').slideToggle();
});