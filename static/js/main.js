$(document).ready(function () {
  console.log('main.js connected')
  $('#mainAuth').css('top', (($(window).height() - $('#mainAuth').height()) / 2 - 13))
  $('.button-collapse').sideNav()
  $('select').material_select()

  $('.collapsible').collapsible({
    accordion: false
  })

  $('.carousel.carousel-slider').carousel({full_width: true})

  // event listener for image upload fields
  $('.upload').change(function () {
    $(this).closest('form').submit()
  })

  // event listener for clicking on add friend request
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

  // event listener for accepting friend on request page
  $('.accept').click(function (event) {
    $.ajax({
      url: '/user/friendRequests/accept',
      type: 'PUT',
      data: {userRequestAccepted: this.value},
      dataType: 'json'
    }).done(function (data) {
      $('#' + data).empty()
      // message to be appended if friend request list is empty after ajax
      if ($('.card-panel').length === 0) {
        $('.toEmpty').append('<div class="center" id="mainAuth"><h5>No more user requests.</h5><a href="/user/contacts?_method=DELETE"><button type="button" class="gradBtn" name="button">View contacts</button></b></a>')
        alignMainAuth()
      }
    }).fail(function () {
      console.log('error accepting friend')
    })
  })

  // event listener for rejecting friend on request page
  $('.reject').click(function (event) {
    $.ajax({
      url: '/user/friendRequests/reject',
      type: 'PUT',
      data: {userRequestRejected: this.value},
      dataType: 'json'
    }).done(function (data) {
      $('#' + data).empty()
      // message to be appended if friend request list is empty after ajax
      if ($('.card-panel').length === 0) {
        $('.toEmpty').append('<div class="center" id="mainAuth"><h5>No more user requests.</h5><a href="/user/contacts"><button type="button" class="gradBtn" name="button">View contacts</button></b></a>')
        alignMainAuth()
      }
    }).fail(function () {
      console.log('error rejecting friend')
    })
  })

  // event listener for accepting friend on preview profile page
  $('.accept2').click(function (event) {
    $.ajax({
      url: '/user/friendRequests/accept',
      type: 'PUT',
      data: {userRequestAccepted: this.value},
      dataType: 'json'
    }).done(function (data) {
      $('#toEmpty').empty()
      $('#toEmpty').append('<div class="center" id="mainAuth"><h5>User accepted. View user in contacts.</h5><a href="/user/contacts"><button type="button" class="gradBtn" name="button">Contacts</button></b></a>')
      alignMainAuth()
    }).fail(function () {
      console.log('error accepting friend')
    })
  })

  // event listener for rejecting friend on preview profile page
  $('.reject2').click(function (event) {
    $.ajax({
      url: '/user/friendRequests/reject',
      type: 'PUT',
      data: {userRequestRejected: this.value},
      dataType: 'json'
    }).done(function (data) {
      $('#toEmpty').empty()
      $('#toEmpty').append('<div class="center" id="mainAuth"><h5>User rejected.</h5><a href="/user/friendRequests"><button type="button" class="gradBtn" name="button">More requests</button></b></a>')
      alignMainAuth()
    }).fail(function () {
      console.log('error rejecting friend')
    })
  })

  // event listener for deleting user
  $('#delete').click(function (event) {
    $('#delete').empty()
    $('#delete').append("<a href='/user/deleteUser'>Click again to confirm delete</a>")
  })
})

// to valign and align div
function alignMainAuth () {
  $('#mainAuth').css('top', (($(window).height() - $('#mainAuth').height()) / 2 - 13)).css('left', (($(window).width() - $('#mainAuth').width()) / 2))
}
