$(document).ready(function(){
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
  

    var apiKEY = "AIzaSyDYm1_qkLonvPsRYs9N1k-cwvEIwVATWkY"
    $(document).on("click","#search", function () {
        var myFavBand = $("#name").val().trim();

        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" +
        myFavBand + "&key=" + apiKEY + "&maxResults=1";

        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response)
              console.log(response.items[0].snippet.title)
              console.log(response.items[0].id.videoId)
          });
// search()



    })
})






