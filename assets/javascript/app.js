$(document).ready(function(){
    // var nextPageToken, prevPageToken;
    // var firstPage=true;

    var apiKEY = "AIzaSyDYm1_qkLonvPsRYs9N1k-cwvEIwVATWkY"
    $(document).on("click","#search", function () {
        var myFavBand = $("#name").val().trim();

        var queryURL = "https://www.googleapis.com/youtube/v3/search?q=" +
        myFavBand + "&api_key=" + apiKEY + "&limit=10";

        console.log(queryURL)



    })
})






