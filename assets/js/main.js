var map;
function initMap(latitude, longitude) {
    const lati = Number(latitude);
    const long = Number(longitude);

    console.log('lati', lati);
    console.log('long', long);

    var styledMapType = new google.maps.StyledMapType(
        [
            {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
            }
        ],
        {name: 'Styled Map'});

    var uluru = {lat: lati, lng: long};
    var map = new google.maps.Map(document.getElementById('map'), {
        center: uluru,
        zoom: 5
    });

    var image = {
        url: '/assets/img/icons8-ok-hand-50.png',
        // This marker is 20 pixels wide by 32 pixels high.
        size: new google.maps.Size(50, 50),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(-20, 28)
    };

    var marker = new google.maps.Marker({
        position: uluru, 
        map: map,
        icon: image,
        draggable: true
    });

    $('#h1-maps').show();
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}

function reqTranslate() {
    const text = $('#text').val();
    const target = $('#target').val();
    console.log('text', text);
    console.log('target', target);

    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/translate`,
        data: {
            text: text,
            target: target
        }
    })
        .done(function(result) {
            console.log(result);
            $('#translation-input').text(result.translation);
        })
        .fail(function(err) {
            console.log(err);
        });
}

function reqTranslate2(text, target, id) {
    console.log('text', text);
    console.log('target', target);

    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/translate`,
        data: {
            text: text,
            target: target
        }
    })
        .done(function(result) {
            console.log(result);
            $(`#text${id}`).text(result.translation);
        })
        .fail(function(err) {
            console.log(err);
        });
}

function reqTranslateTitle(text, target, title, id) {
    console.log('text', text);
    console.log('target', target);

    // $.ajax({
    //     method: 'POST',
    //     url: `http://localhost:3000/translate`,
    //     data: {
    //         text: text,
    //         target: target
    //     }
    // })
    //     .done(function(result_text) {
    //         console.log(result);
    //         $.ajax({
    //             method: 'POST',
    //             url: `http://localhost:3000/translate`,
    //             data: {
    //                 text: title,
    //                 target: target
    //             }
    //         })
    //             .done(function(result_title) {
    //                 $(`#title${id}`).text(result_title.translation);
    //                 $(`#text${id}`).text(result_text.translation);
    //             })
    //             .fail(function(err) {
    //                 console.log(err);
    //             });
    //     })
    //     .fail(function(err) {
    //         console.log(err);
    //     });
}

function getCountryData() {
    const text = $('#country-input').val();
    console.log(text);
    $.ajax({
        method: 'POST',
        url: `http://localhost:3000/getCountries`,
        data: {
            country: text
        }
    })
        .done(function(result) {
            $('#country-input').val('');
            console.log(result);
            const latitude = result.Latitude;
            const longitude = result.Longitude;
            const country = result.Name;
            const countryCode = result.Alpha2Code
            localStorage.setItem('countryCode', countryCode);
            initMap(latitude, longitude);
            getRelatedArticle(country);
        })
        .fail(function(err) {
            console.log(err);
        });
}

function getRelatedArticle(country) {
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/news/search?key=${country}`
    })
        .done(function(response) {
            $('#section-two').empty();
            $('#h1-article').show();
            const target = localStorage.getItem('countryCode');
            for (let i = 6; i < response.length; i++) {
				$('#section-two').append(`
				    <div class="article-item">
				        <div class="article-img mb-2" style="background-image: url('${response[i].fields.thumbnail}');">
				        </div>

                        <div class="article-group mb-4">
                            <div class="article-title" id="title${i}">
                                ${response[i].webTitle}
                            </div>

                            <div class="article-detail mb-4">
                                <div class="article-date">
                                    <i class="fa fa-clock-o"></i>
                                    ${new Date(response[i].webPublicationDate)}
                                </div>
                            </div>

                            <div class="article-content" id="text${i}">
                                ${response[i].fields.bodyText.substr(0,1000)}
                            </div>

                            <div class="translate-button mt-4">
                                <button class="btn btn-danger btn-block" onclick="reqTranslate2('${response[i].fields.bodyText.substr(0,1000)}', '${target}', ${i})">Translate <i class="fas fa-bullhorn ml-1"></i></button>
                            </div>
                        </div>
			        </div>
				`)
			}
        });
}

$('h5').on('click', function() {
    const text = $(this).text();
    const target = 'id';

    reqTranslate2(text, target);
});

$('#form-country').on('submit', function(e) {
    e.preventDefault();
    getCountryData();
})

$('#country-input').on('click', function() {
    const text = $('#country-input').val();
    console.log(text);
});

function signOut() {
    console.log('masuk sini')
    localStorage.removeItem('token')
    location.replace('/index.html')
  }

$(document).ready(function() {
    $('#h1-maps').hide();
    $('#h1-article').hide();
});