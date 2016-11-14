$(document).ready(function () {
  console.log('browseProfiles.js connected')
  var profileCounter = 0
  $('#nextArrow').click(function (event) {
    profileCounter++
    if (groupOfUsers[profileCounter]){
      $.ajax({
        url: window.location.origin + '/user/browseProfile/'+ groupOfUsers[profileCounter],
        type: 'GET',
        dataType: 'json'
      }).done(function (user) {

      var codeToAppend = '<div class="row"><div class="col s12 m6 l4 offset-l2"><div class="spacer"></div><div class="carousel carousel-slider" data-indicators="true"><img class="carousel-item carouselImg" src="'+ user.profileImg +'">'
      if(user.img1){
        codeToAppend += '<img class="carousel-item carouselImg" src="'+ user.img1 +'">'
      }
      if(user.img2){
        codeToAppend += '<img class="carousel-item carouselImg" src="' + user.img2 +'">'
      }
      if(user.img3){
        codeToAppend += '<img class="carousel-item carouselImg" src="' + user.img3 +'">'
      }

      codeToAppend += '</div></div><div class="col s12 m6 l4"><div class="col s12"><h5 class="center">'+ user.firstName + '</h5></div><div class="col s12 center"><p>'

      if (!user.bio){
        codeToAppend += '<i>'+ user.firstName +'left the bio empty <br/> (╯°□°)╯︵ ┻━┻</i></p>'
      } else {
        codeToAppend += '<i>' + user.bio + '</i></p>'
      }
      codeToAppend += '<div class="col s10 offset-s1 blue-grey lighten-5"><p>Skills:<br/>'
      if (!user.skills){
        codeToAppend += user.firstName + 'seems to have decided to leave this empty <br/> ¯\_(ツ)_/¯'
      } else {
        codeToAppend += user.skills
      }
      codeToAppend += '</p></div>'

      codeToAppend += '<div class="spacer col s12"></div><div class="col s10 offset-s1 blue-grey lighten-1 white-text profileContact"><div class="spacer col s12"></div><p>Connect with' + user.firstName + 'for contact details.</p></div></div><div class="spacer col s12"></div><div class="center"><form id="connecting"><input type="hidden" name="userId" value="'+ user.id +'"><input id="connectButton" class="gradBtn" type="submit" name="name" value="Connect"></form></div><div class="spacer col s12"></div></div></div>'

        $('#appendUserProfile').empty()
        $('#appendUserProfile').append(codeToAppend)
        $('.carousel.carousel-slider').carousel({full_width: true})
        $('#connecting').click(function (event) {
          event.preventDefault()
          var userId = $('form input')[0].value
          var params = {userId: userId}

          $.post('/user/' + userId + '/connect', params, function (data) {
            console.log(data)
            Materialize.toast('Request Sent!', 4000)
            $('#connectButton').val('Request Sent')
          })
        })


    }).fail(function () {
      console.log('ajax failed')
    })
  } else {

    $('#appendUserProfile').empty()
    $('#appendUserProfile').append('<div class="row"><div class="col m6 offset-m3" id="centralize"><div><div class="center"><div class="spacer"></div><h5>No ' + currentBrowsingUser.specialization.term + ' found. Please try again.</h5><a href="/" ><button class="gradBtn" type="button" name="button">Return</button></a></div><div class="spacer"></div></div></div></div>')
    alignBox()
  }

  })


  $('#backArrow').click(function (event) {
    profileCounter--
    if (groupOfUsers[profileCounter]){
      $.ajax({
        url: window.location.origin + '/user/browseProfile/'+ groupOfUsers[profileCounter],
        type: 'GET',
        dataType: 'json'
      }).done(function (user) {

      var codeToAppend = '<div class="row"><div class="col s12 m6 l4 offset-l2"><div class="spacer"></div><div class="carousel carousel-slider" data-indicators="true"><img class="carousel-item carouselImg" src="'+ user.profileImg +'">'
      if(user.img1){
        codeToAppend += '<img class="carousel-item carouselImg" src="'+ user.img1 +'">'
      }
      if(user.img2){
        codeToAppend += '<img class="carousel-item carouselImg" src="' + user.img2 + '">'
      }
      if(user.img3){
        codeToAppend += '<img class="carousel-item carouselImg" src="' + user.img3 + '">'
      }

      codeToAppend += '</div></div><div class="col s12 m6 l4"><div class="col s12"><h5 class="center">'+ user.firstName + '</h5></div><div class="col s12 center"><p>'

      if (!user.bio){
        codeToAppend += '<i>'+ user.firstName +'left the bio empty <br/> (╯°□°)╯︵ ┻━┻</i></p>'
      } else {
        codeToAppend += '<i>' + user.bio + '</i></p>'
      }
      codeToAppend += '<div class="col s10 offset-s1 blue-grey lighten-5"><p>Skills:<br/>'
      if (!user.skills){
        codeToAppend += user.firstName + 'seems to have decided to leave this empty <br/> ¯\_(ツ)_/¯'
      } else {
        codeToAppend += user.skills
      }
      codeToAppend += '</p></div>'

      codeToAppend += '<div class="spacer col s12"></div><div class="col s10 offset-s1 blue-grey lighten-1 white-text profileContact"><div class="spacer col s12"></div><p>Connect with' + user.firstName + 'for contact details.</p></div></div><div class="spacer col s12"></div><div class="center"><form id="connecting"><input type="hidden" name="userId" value="'+ user.id +'"><input id="connectButton" class="gradBtn" type="submit" name="name" value="Connect"></form></div><div class="spacer col s12"></div></div></div>'

        $('#appendUserProfile').empty()
        $('#appendUserProfile').append(codeToAppend)
        $('.carousel.carousel-slider').carousel({full_width: true})
        $('#connecting').click(function (event) {
          event.preventDefault()
          var userId = $('form input')[0].value
          var params = {userId: userId}

          $.post('/user/' + userId + '/connect', params, function (data) {
            console.log(data)
            Materialize.toast('Request Sent!', 4000)
            $('#connectButton').val('Request Sent')
          })
        })


    }).fail(function () {
      console.log('ajax failed')
    })
  } else {

    $('#appendUserProfile').empty()
    $('#appendUserProfile').append('<div class="row"><div class="col m6 offset-m3" id="centralize"><div><div class="center"><div class="spacer"></div><h5>No ' + currentBrowsingUser.specialization.term + ' found. Please try again.</h5><a href="/" ><button class="gradBtn" type="button" name="button">Return</button></a></div><div class="spacer"></div></div></div></div>')
    alignBox()
  }

  })

  function alignBox () {
    $('#centralize').css('top', (($(window).height() - $('#centralize').height()) / 2))
  }

  // $.ajax({
  //   url: window.location.origin+'/'+,
  //   type: 'GET',
  //   dataType: 'json'
  //   }).done(function () {
  //   }
  //     }).fail(function () {
  //       console.log("ajax failed")
  //     })

})
