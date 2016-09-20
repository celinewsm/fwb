$(document).ready(function () {
  console.log("main.js connected")
  $('.button-collapse').sideNav()
  $('select').material_select();

  $('#profileImgUpload').change(function(){
    $('#profileImgForm').submit();
  })

})
