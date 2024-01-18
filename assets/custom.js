/**
 * Web Dev Custom Script
 */
jQuery(document).ready(function($) {

  /* PDP Script */
  if ( $('body').hasClass('template-product') ) {

    /* PDP Variation change function */
    $('form.product-form input[type=radio]').change(function() {

      /* Update price off value */
      $('.price__percentage').addClass('d-none');
      setTimeout(function() {
        if ( $('.product-single__meta [data-price]').hasClass('price--on-sale') ) {
          let reg_price = parseFloat($('.price__sale [data-regular-price]').text().replace('$',''));
          let sale_price = parseFloat($('[data-sale-price]').text().replace('$',''));
          let p_off = Math.round((reg_price - sale_price) / reg_price * 100);
          $('.price__percentage span').text(p_off + '% OFF');
          $('.price__percentage').removeClass('d-none');
        }
      }, 20);      
      
    });
    
  }


  /* Header navigation Script */
  navSelect();
  $(window).on('resize', function() {
    navSelect();
  });

  $('input#search_brand').on('focus', function() {
    $('.search_wrap').addClass('input_focus');
  });
  
  $('input#search_brand').on('blur', function() {
    $(this).val('');
    setTimeout(function() {
      $('.search_wrap').removeClass('input_focus');
      $('.brand_wrapper').removeClass('input_active');
      $('.brand_item').removeClass('inactive');
    }, 100);    
  });

  $('input#search_brand').on('click', function() {
    $('.brand_wrapper').toggleClass('input_active');
  });

  $('input#search_brand').on('input', function() {
    var key = $(this).val();
    $('.brand_item').addClass('inactive');
    $('.brand_item').each(function(i, e) {
      if ( $(this).text().toLowerCase().includes(key) ) {
        $(this).removeClass('inactive');
      }
    });
  });

  $('.menu_heading:first-child, .featured_title, .brand_col_title').on('click', function() {

    if ( $(this).hasClass('opened') ) {
      $(this).removeClass('opened');
      $(this).siblings().slideUp(200, function() {
        
      });
    } else {
      $(this).addClass('opened');
      $(this).siblings().slideDown(300, function() {
        
      });
    }
    
  });
  
});

function navSelect() {

  var num;
  if ( $(window).width() > 900 ) {
    $('.nav_item').hover(
      function() {
        num = $(this).attr('nav_num');
        $('.nav_item').removeClass('nav_active');
        $(this).addClass('nav_active');
        $('.nav_panel').removeClass('panel_active');
        $('#nav_panel' + num).addClass('panel_active');
        $('.nav_content').addClass('active');
        $('.nav_overlay').addClass('overlay_active');
      }, function() {
        num = $(this).attr('nav_num');
        if ( $('.nav_content:hover').length == 0 ) {
          $(this).removeClass('nav_active');
          $('.nav_content').removeClass('active');
          $('.nav_overlay').removeClass('overlay_active');
        }
      }
    );
    $(document).on('mousemove', function(e) {
      if ( $('.nav_wrapper:hover').length == 0 ) {
        $('.nav_item').removeClass('nav_active');
        $('.nav_content').removeClass('active');
        $('.nav_overlay').removeClass('overlay_active');
      }
    });
  } else {
    $('.nav_item').on('click', function() {
      num = $(this).attr('nav_num');
      $('.nav_item').removeClass('nav_active');
      $(this).addClass('nav_active');
      $('.nav_panel').removeClass('panel_active');
      $('#nav_panel' + num).addClass('panel_active');
      $('.nav_content').addClass('active');
      $('.nav_overlay').addClass('overlay_active');
    });

    $('.nav_overlay').on('click', function() {
      $('.nav_item').removeClass('nav_active');
      $('.nav_content').removeClass('active');
      $('.nav_overlay').removeClass('overlay_active');
    });
  }
  
}
