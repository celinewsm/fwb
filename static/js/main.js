$(document).ready(function () {
  console.log("main.js connected")
  $('.button-collapse').sideNav()
  $('select').material_select()

  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $('.upload').change(function(){
    $(this).closest('form').submit();
  })

})
