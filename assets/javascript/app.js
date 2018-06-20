$(document).ready(function () {

    var apiKEY = "AIzaSyDYm1_qkLonvPsRYs9N1k-cwvEIwVATWkY"
    $(document).on("click", "#search", function () {
        var youtubeVideo = $("#name").val().trim();

        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" +
            youtubeVideo + "&key=" + apiKEY + "&maxResults=3";

        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            console.log(response.items[0].snippet.title)
            console.log(response.items[0].id.videoId)

            var videoId1 = response.items[0].id.videoId
            $('#youTube1').attr('src', "https://www.youtube.com/embed/" + videoId1)

            var videoId2 = response.items[1].id.videoId
            $('#youTube2').attr('src', "https://www.youtube.com/embed/" + videoId2)

            var videoId3 = response.items[2].id.videoId
            $('#youTube3').attr('src', "https://www.youtube.com/embed/" + videoId3)
            // <iframe width="560" height="315" id="youtubeVid" src="https://www.youtube.com/embed/I2bBZvSPpOo" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            // $("#youtubeVid").attr("src", "https://www.youtube.com/embed/" + videoId)
            // response
            // https://www.youtube.com/playlist?list= <-- This is the structure of the playlist page in youtube
        });
        // search()



    })
})






