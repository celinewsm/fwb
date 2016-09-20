$(document).ready(function () {
  console.log("main.js conntected")
  $('.button-collapse').sideNav()

  var chip = {
    tag: 'skill',
  };

  $('.chips').material_chip();
  $('.chips-initial').material_chip({
    data: [{
      tag: 'Apple',
    }, {
      tag: 'Microsoft',
    }, {
      tag: 'Google',
    }],
  });
  $('.chips-placeholder').material_chip({
    placeholder: 'Enter a tag',
    secondaryPlaceholder: '+Tag',
  });

})
