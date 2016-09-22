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

$(".accept").click(function(event){
  console.log(this.value)
  console.log("accept button clicked")
  $.ajax({
    url: '/user/friendRequests/accept',
    type: 'PUT',
    data: {userRequestAccepted: this.value},
    dataType: 'json'
  }).done(function (data) {
    $("#"+data).empty()
  }).fail(function () {
    console.log('error accepting friend')
  })
});

$(".reject").click(function(event){
  console.log(this.value)
  console.log("accept button clicked")

  $.ajax({
    url: '/user/friendRequests/reject',
    type: 'PUT',
    data: {userRequestRejected: this.value},
    dataType: 'json'
  }).done(function (data) {
    $("#"+data).empty()
  }).fail(function () {
    console.log('error rejecting friend')
  })
});

$(".accept2").click(function(event){
  console.log(this.value)
  console.log("accept button clicked")
  $.ajax({
    url: '/user/friendRequests/accept',
    type: 'PUT',
    data: {userRequestAccepted: this.value},
    dataType: 'json'
  }).done(function (data) {

    $("#toEmpty").empty()
    $("#toEmpty").append('<div class="center"><h3>User accepted. View user in contacts.</h3><a class="btn" href="/user/contacts">Contacts</a></div>')

  }).fail(function () {

    console.log('error accepting friend')
  })
});

$(".reject2").click(function(event){
  console.log(this.value)
  console.log("accept button clicked")

  $.ajax({
    url: '/user/friendRequests/reject',
    type: 'PUT',
    data: {userRequestRejected: this.value},
    dataType: 'json'
  }).done(function (data) {

    $("#toEmpty").empty()
    $("#toEmpty").append('<div class="center"><h3>User rejected.</h3><a class="btn" href="/user/friendRequests">More requests</a></div>')

  }).fail(function () {
    console.log('error rejecting friend')
  })
});



// Materialize.toast('I am a toast!', 4000) // 4000 is the duration of the toast

})
