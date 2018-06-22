$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCUM8kkq5sib8PGpDP-DsqzptMCNO9uGzk",
        authDomain: "bands-in-town.firebaseapp.com",
        databaseURL: "https://bands-in-town.firebaseio.com",
        projectId: "bands-in-town",
        storageBucket: "bands-in-town.appspot.com",
        messagingSenderId: "705988577969"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    database.ref().on("value", function (snapshot) {
        console.log("printing snapshot")
        // console.log(snapshot);
        console.log(snapshotToArray(snapshot));



        function snapshotToArray(snapshot) {
            var returnArr = [];

            snapshot.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;

                returnArr.push(item);
            });

            return returnArr;

        };

        bandArray = snapshotToArray(snapshot)

        for (var i = 0; i < bandArray.length; i++) {
            $("#history").prepend("<a class='dropdown-item'>" + bandArray[i] + "</a>");
        }


    })


    var apiKEY = "AIzaSyDYm1_qkLonvPsRYs9N1k-cwvEIwVATWkY"
    $(document).on("click", "#search", function () {

        var youtubeVideo = $("#name").val().trim();
        database.ref().push(youtubeVideo)

        var str = youtubeVideo.replace(/\s+/g, "");
        console.log(str);


        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=" +
            youtubeVideo + "&key=" + apiKEY + "&maxResults=3";

        console.log(queryURL)

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {


            var videoId1 = "https://www.youtube.com/embed/" + response.items[0].id.videoId;
            $('#youTube').attr('src', videoId1);
            var videoId2 = "https://www.youtube.com/embed/" + response.items[1].id.videoId;
            var videoId3 = "https://www.youtube.com/embed/" + response.items[2].id.videoId;


            $("#next").on("click", function () {
                console.log(videoId1);
                console.log($('#youTube').attr('src'))

                if (videoId1 === $('#youTube').attr('src')) {
                    $('#youTube').attr('src', videoId2)
                } else if
                (videoId2 === $('#youTube').attr('src')) {
                    $('#youTube').attr('src', videoId3)
                } else if
                (videoId3 === $('#youTube').attr('src')) {
                    $('#youTube').attr('src', videoId1)
                } else
                    return;
            })

            $("#previous").on("click", function () {
                if (videoId3 === $('#youTube').attr('src')) {
                    $('#youTube').attr('src', videoId2)
                } else if
                (videoId2 === $('#youTube').attr('src')) {
                    $('#youTube').attr('src', videoId1)
                } else if
                (videoId1 === $('#youTube').attr('src')) {
                    $('#youTube').attr('src', videoId3)
                } else
                    return;

            })

        })


        // search()
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
        }).done(function (json) {

            var events = json._embedded.events;

            $(".is-success").empty();
            var bandName = events[0].name;
            var bandImage = events[0].images[0].url;
            $(".is-success").append("<p><h1>" + bandName + "</h1></p>");
            $(".is-success").append("<img src= " + bandImage + ">");
            for (var i = 0; i < 6; i++) {



                var date = events[i].dates.start.localDate;
                var venue = events[i]._embedded.venues[0].name;
                var venueAddress = events[i]._embedded.venues[0].address.line1;
                var venueCity = events[i]._embedded.venues[0].city.name;
                var venueState = events[i]._embedded.venues[0].state.name;
                var venueCountry = events[i]._embedded.venues[0].country.name;
                var seatMap = events[i].url;


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
                if ((venueState === false)) {
                    $(".is-success").append("<p>Address: " + venueCountry + "</p>");

                }
                $(".is-success").append(
                    "<p>" + "<a href=" + seatMap + ">Buy Tickets Now!</a>" + "</p>"
                );
                $(".is-success").append("<p>" + "___________________________________________________________" + "</p>");

            }




        })

        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });

        //Ticketmaster JS----------------------------------------//



    });
})

function myFunction() {
    document.getElementById("history").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-menu");
        var i;
        for (i = 0; i < 4; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}






