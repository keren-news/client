$(document).ready(function(){	
	tokenReady()
	$('#btn-showmore').on('click',function(){
		showmore();
	})

	$.ajax({
		method: "GET",
		url: "http://localhost:3000/news"
	  })
		.done(function( response ) {
			$('.loader').hide()
			$('.br').hide()
			$('#maintop').append(`
			<div class="tile-slide active" id="1" slide-index="1" style="background-image: url('${response[0].fields.thumbnail}');">
			<div class="btn btn-topnews">TOP NEWS</div>
			<div class="tile-title">
				<a href="">${response[0].webTitle}</a>
			</div>
			<div class="tile-detail">
				<div class="tile-date">
					<i class="fa fa-clock-o"></i>
					${new Date(response[0].webPublicationDate)}
				</div>
			</div>
		</div>
			`)

			$('#left').append(`
			<div id="top2" class="tile-s" style="background-image: url('${response[1].fields.thumbnail}')">
			<div class="tile-taggroup">
				<div class="btn btn-topnews tile-tag mb-3">TOP NEWS</div>
			</div>
			<div class="tile-title">
				${response[1].webTitle}
			</div>
			<div class="tile-detail">
				<div class="tile-date">
					<i class="fa fa-clock-o"></i>
					${new Date(response[1].webPublicationDate)}
				</div>
			</div>
		</div>

		<div id="top3" class="tile-s" style="background-image: url('${response[2].fields.thumbnail}')">
			<div class="tile-taggroup">
				<div class="btn btn-topnews tile-tag mb-3">TOP NEWS</div>
			</div>
			<div class="tile-title">
			${response[2].webTitle}
			</div>
			<div class="tile-detail">
				<div class="tile-date">
					<i class="fa fa-clock-o"></i>
					${new Date(response[2].webPublicationDate)}
				</div>
			
			</div>
		</div>
			`)

		$('#centerM').append(`
		<div class="tile-s" style="background-image: url('${response[3].fields.thumbnail}')">
		<div class="tile-taggroup">
			<div class="btn btn-topnews tile-tag mb-3">TOP NEWS</div>
		</div>
		<div class="tile-title">
			${response[3].webTitle}
		</div>
		<div class="tile-detail">
			<div class="tile-date">
				<i class="fa fa-clock-o"></i>
				${new Date(response[3].webPublicationDate)}
			</div>
		</div>

	</div>
	<div class="tile-s" style="background-image: url('${response[4].fields.thumbnail}')">
		<div class="tile-taggroup">
			<div class="btn btn-topnews tile-tag mb-3">TOPNEWS</div>
		</div>
		<div class="tile-title">
		${response[4].webTitle}
		</div>
		<div class="tile-detail">
			<div class="tile-date">
				<i class="fa fa-clock-o"></i>
				${new Date(response[4].webPublicationDate)}
			</div>

		</div>

	</div>
		`)


		$('#right').append(`
		<div class="tile-s" style="background-image: url('${response[5].fields.thumbnail}')">
		<div class="tile-taggroup">
			<div class="btn btn-topnews tile-tag mb-3">TOPNEWS</div>
		</div>
		<div class="tile-title">
		${response[5].webTitle}
		</div>
		<div class="tile-detail">
			<div class="tile-date">
				<i class="fa fa-clock-o"></i>
				${new Date(response[5].webPublicationDate)}
			</div>

		</div>

	</div>
	<div class="tile-s" id="check" style="background-image: url('${response[5].fields.thumbnail}')">
		<div class="tile-taggroup">
			<div class="btn btn-topnews tile-tag mb-3">TOPNEWS</div>
		</div>
		<div class="tile-title">
		${response[6].webTitle}
		</div>
		<div class="tile-detail">
			<div class="tile-date">
				<i class="fa fa-clock-o"></i>
				${new Date(response[5].webPublicationDate)}
			</div>

		</div>

	</div>
		`)

			for (let i = 6; i < response.length; i++) {
				$('#section-two').append(`
				<div class="article-item">
				<div class="article-img" style="background-image: url('${response[i].fields.thumbnail}');">
					
				</div>
				<div class="article-group">
					<div class="article-title">
						${response[i].webTitle}
					</div>
					<div class="article-detail">
						<div class="article-date">
							<i class="fa fa-clock-o"></i>
							${new Date(response[i].webPublicationDate)}
						</div>
					</div>
					<div class="article-content">
						${response[i].fields.bodyText.substr(0,500)}
					</div>
	
				</div>
			</div>
				`)
			}
			
		});
})

function register () {
	let name = $('#name').val()
	let email = $('#email').val()
	let password = $('#password').val()

	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/register',
		data: {
			name: name,
			password: password,
			email: email,
		}
	})
	.done(function(response){
		localStorage.setItem('token', response.token)
		console.log(response)
		tokenReady()
		
    })
    .fail(function(err){
        console.log(err)
    })
}

function login () {
	let emailLogin = $('#emailLogin').val()
	let passwordLogin = $('#passwordLogin').val()
	// console.log(emailLogin, passwordLogin)
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/login',
		data: {
			password: passwordLogin,
			email: emailLogin,
		}
	})
	.done(function(response){
		localStorage.setItem('token', response.token)
		console.log(response)
		tokenReady()
		
    })
    .fail(function(err){
        console.log(err)
    })
}

function onSignIn(googleUser) {
	var id_token = googleUser.getAuthResponse().id_token;
	$.ajax({
		method: 'POST',
		url: 'http://localhost:3000/signinwithgoogle',
		data: {
			token:  id_token
		}
	})
	.done(function(response){
		localStorage.setItem('token', response.token)
		tokenReady()

    })
    .fail(function(err){
        console.log(err)
    })
  }


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
	  console.log('User signed out.');
	  localStorage.removeItem('token')
	  tokenReady()
    });
  }


  $('#register').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget) // Button that triggered the modal	
  })

  $('#login').on('show.bs.modal', function (event) {
	var button = $(event.relatedTarget) // Button that triggered the modal	
  })


  function tokenReady(){
    const token = localStorage.getItem('token')
    if (token){
		$('#gsignout').show()
		$('#gsignin').hide()
		$('#reg').hide()
		$('#log').hide()
    } else {
		$('#gsignout').hide()
		$('#gsignin').show()
		$('#reg').show()
		$('#log').show()
    }
}

