$(document).ready(function() {
  // var nextPageToken, prevPageToken;
  // var firstPage=true;

  // After the API loads, call a function to enable the search box.
  // function handleAPILoaded() {
  //     $('#search').attr('disabled', false);
  //   }

  //   // Search for a specified string.
  //   function search() {
  //     var q = $('#name').val();
  //     var request = gapi.client.youtube.search.list({
  //       q: q,
  //       part: 'snippet'
  //     });

  //     request.execute(function(response) {
  //         console.log(response)

  //       var str = JSON.stringify(response.result);
  //       $('#search-container').html('<pre>' + str + '</pre>');
  //     });
  //   }

  var apiKEY = "AIzaSyDYm1_qkLonvPsRYs9N1k-cwvEIwVATWkY";
  $(document).on("click", "#search", function() {
    var myFavBand = $("#name")
      .val()
      .trim();
    var str = myFavBand.replace(/\s+/g, "");
    console.log(str);

    var queryURL =
      "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
      myFavBand +
      "&key=" +
      apiKEY +
      "&maxResults=1";

    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      //   console.log(response);
      //   console.log(response.items[0].snippet.title)
      //   console.log(response.items[0].id.videoId)
    });
    // search()
    //-------------------------------------------------------------------------------------------//
    // var apiTM = "ABJmmwT5erF9dGVuWEGiEhDZNsQojazj";
    // $(document).on("click", "#search", function() {
    //   var myFavBand = $("#name")
    //     .val()
    //     .trim();

    //   var queryURL =
    //     "https://app.ticketmaster.com/discovery/v2/events.json?size=" +
    //     myFavBand +
    //     "&apikey=" +
    //     apiTM +
    //     "&maxResults=1";

    var apiKeyTm = "ABJmmwT5erF9dGVuWEGiEhDZNsQojazj";
    var queryURLTm =
      "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" +
      str +
      "&apikey=" +
      apiKeyTm +
      "&maxResults=1";

    console.log(queryURLTm);

    $.ajax({
      url: queryURLTm,
      method: "GET"
    }).done(function(json) {
      console.log(json);
      var events = json._embedded.events;

      for (var i = 0; i < events.length; i++) {
        var bandName = events[i].name;
        var bandImage = events[i].images[0].url;
        var date = events[i].dates.start.localDate;
        var venue = events[i]._embedded.venues[0].name;
        var venueAddress = events[i]._embedded.venues[0].address.line1;
        var venueCity = events[i]._embedded.venues[0].city.name;
        var venueState = events[i]._embedded.venues[0].state.name;
        var venueCountry = events[i]._embedded.venues[0].country.name;
        var seatMap = events[i].seatmap.staticUrl;
        console.log(bandName);
        console.log(bandImage);
        console.log(date);
        console.log(venue);
        console.log(venueAddress);

        $(".is-success").empty();
        $(".is-success").append("<p><h1>" + bandName + "</h1></p>");
        $(".is-success").append("<img src= " + bandImage + ">");
        $(".is-success").append("<p>Venue: " + venue + "</p>");
        $(".is-success").append("<p>Date: " + date + "</p>");
        $(".is-success").append(
          "<p>Address: " +
            venueAddress +
            "<br>" +
            venueCity +
            "<br>" +
            venueState +
            "</p>"
        );
        if ((venueState = false)) {
          $(".is-success").append("<p>Address: " + venueCountry + "</p>");
          $(".is-success").append(
            "<p>" + "<a href='" + seatMap + "'>Buy Tickets Now!</a>" + "</p>"
          );
        }
      }
    });
  });
});
