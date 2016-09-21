$(document).ready(function () {
  console.log("main.js connected")
  $('.button-collapse').sideNav()
  $('select').material_select()

  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $('.carousel.carousel-slider').carousel({full_width: true,height:250});

  $('.upload').change(function(){
    $(this).closest('form').submit();
  })

})
