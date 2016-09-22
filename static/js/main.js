$(document).ready(function () {
  console.log("main.js connected")
  $('.button-collapse').sideNav()
  $('select').material_select()

  $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
  });

  $('.carousel.carousel-slider').carousel({full_width: true});

  $('.upload').change(function(){
    $(this).closest('form').submit();
  })

  $("#connecting").click(function(event){
    event.preventDefault()
    var userId = $("form input")[0].value
    var params = {userId: userId};

    $.post("/user/"+userId+"/connect", params, function(data) {
      console.log(data)
      Materialize.toast('Request Sent!', 4000)
      $("#connectButton").val("Request Sent")
    });
});

// Materialize.toast('I am a toast!', 4000) // 4000 is the duration of the toast

})
