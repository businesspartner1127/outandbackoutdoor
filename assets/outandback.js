jQuery(document).ready(function () {


//----------------------------------------------------------------//
// Window Content Load 
//----------------------------------------------------------------//
//PREFORMS AFTER ALL IS LOADED
  

$(window).on("load",function(){
	$(".variantInfo ul").mCustomScrollbar();
});
  
  
$('a[href*="#"]:not([href="#"])').click(function() {
    var offset = -100; // <-- change the value here
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top + offset
            }, 600);
            return false;
        }
    }
});
  
  
$('.flexslider').flexslider({
    animation: "fade",
    dots: true
});  

(function($){
    jQuery.fn.checkEmpty = function() {
       return !$.trim(this.html()).length;
    };
}(jQuery));
  
if($("#new").checkEmpty()){
     $('#buyNew').attr('disabled','disabled');
  	 $("#buyNew").html("BUY NEW<span>UNAVAILABLE<span>");
}else{

}
  
if($("#used").checkEmpty()){
     $('#buyUsed').attr('disabled','disabled');
  	 $("#buyUsed").html("BUY USED<span>UNAVAILABLE<span>");
}else{

}  
  
$(".urlContainer a:contains('VIEW')").html(function(_, html) {
   return html.replace(/(VIEW)/g, '<span>$1</span>');
});
  
  
$('.product-tags li:contains("-auto-color-")').each(function(){
    $(this).html($(this).html().split("-auto-color-").join(""));
  	$(this).hide();
});
  
$('.product-tags li:contains("-auto-size-")').each(function(){
    $(this).html($(this).html().split("-auto-size-").join(""));
  	$(this).hide();
});
  
$('.product-tags li:contains("-auto-condition-")').each(function(){
    $(this).html($(this).html().split("-auto-condition-").join(""));
   	$(this).hide();
});
  
$('.product-tags li:contains("Unspecified")').each(function(){
   	$(this).hide();
});
  
$('.product-tags li:contains("Default Size")').each(function(){
   	$(this).hide();
});  
  
$("#mtn-nav").on('click', function () {
    $("#parentNav").css({right: "0px"});
});
  
$('#nav-close-btn').on('click', function () {
    $("#overlay").fadeOut(400);
    $("#parentNav").css({right: "-450px"});
});
  
$('#mensParent').on('click', function () {
    $("#mensNav").addClass('open')
});

$('#womensParent').on('click', function () {
    $("#womensNav").addClass('open')
});
  
$('#kidsParent').on('click', function () {
    $("#kidsNav").addClass('open')
});
  
  $('#packsParent').on('click', function () {
    $("#packsNav").addClass('open')
});
  
  $('#collectionsParent').on('click', function () {
    $("#collectionsNav").addClass('open')
});
  
$('.backButton').on('click', function () {
    $(".main-nav").removeClass('open');
});
  
 
$('.sub-menu').prev('a').click(function() {
    $(this).next('.sub-menu').slideToggle('down');
    $(this).toggleClass('active');
});
  
  
$( '.variantList .clickTrigger' ).on( "click", function() {
   	$(this).siblings('ul').slideToggle(400);
   	$(this).children('.brand').toggleClass('active');
}); 
  
  
$("#reportTrigger").on('click', function () {
  	$("#overlay").fadeIn(400);
    $("#reportLightbox").fadeIn(400);
  	$("#reportLightbox").css({top: "50%"});
});

  
$(".loginTrigger").on('click', function () {
  	$("#overlay").fadeIn(400);
    $("#loginLightbox").fadeIn(400);
  	$("#loginLightbox").css({top: "50%"});
});
  
$(".registerTrigger").on('click', function () {
  	$("#overlay").fadeIn(400);
    $("#registerLightbox").fadeIn(400);
  	$("#registerLightbox").css({top: "50%"});
});
  
$("#RecoverPassword").on('click', function () {
  	$("#loginLightbox").fadeOut(400);
  	$("#loginLightbox").css({top: "60%"});
    $("#recoverLightbox").fadeIn(400);
  	$("#recoverLightbox").css({top: "50%"});
});
  
$(".lightboxBack").on('click', function () {
  	$("#recoverLightbox").fadeOut(400);
  	$("#recoverLightbox").css({top: "60%"});
  	$("#loginLightbox").fadeIn(400);
  	$("#loginLightbox").css({top: "50%"});
}); 
  
$(".lightboxClose").on('click', function () {
  	$("#overlay").fadeOut(400);
  	$("#loginLightbox").css({top: "60%"});
  	$("#registerLightbox").css({top: "60%"});
  	$("#recoverLightbox").css({top: "60%"});
  	$("#reportLightbox").css({top: "60%"});
    $("#loginLightbox").fadeOut(400);
  	$("#registerLightbox").fadeOut(400);
  	$("#recoverLightbox").fadeOut(400);
  	$("#reportLightbox").fadeOut(400);
});

$(document).on('mouseenter', '#mtn-nav', function() {
   $('.bar1').animate({height: 24}, 800, "easeOutExpo");
   $('.bar2').animate({height: 37}, 800, "easeOutExpo");
   $('.bar3').animate({height: 28}, 800, "easeOutExpo");
   $('.bar4').animate({height: 19}, 800, "easeOutExpo");
 }).on('mouseleave', '#mtn-nav', function() {
   $('.bar1').animate({height: 19}, 800, "easeOutExpo");
   $('.bar2').animate({height: 26}, 800, "easeOutExpo");
   $('.bar3').animate({height: 37}, 800, "easeOutExpo");
   $('.bar4').animate({height: 22}, 800, "easeOutExpo");
});
  
$('.categories').slick({
  dots: false,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoPlay: false,
  infinite: false,
      responsive: [
    {
      breakpoint: 968,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
    ]
});
  
$('.blogPosts').slick({
  dots: false,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoPlay: false,
  infinite: false,
      responsive: [
    {
      breakpoint: 968,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false
      }
    }
    ]
});

 $('.lightboxTrigger').on('click', function () {
   	$('#lightbox').fadeIn(600);
 });
  
  $('.closeX').on('click', function () {
   	$('#lightbox').fadeOut(600);
 });
  
  
$('.faq .section').click(function(){
    $(this).find('.row').slideToggle(400);
        if ($(this).find('.row').is(':visible'))
        $(this).find('.row').css('display','flex');
    $(this).toggleClass('active');
});
 
  
$('.search-bar__close').on('click', function () {
  $(".search-bar").css({
          'top': '-2px',
          'position': 'fixed'
      });
});

$('.fa-search').on('click', function () {
  $(".search-bar").css({
          'top': '75px',
          'position': 'fixed'
      });
}); 
});