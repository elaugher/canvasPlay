"use strict";
//alert("JS active");

const submitBtn = document.getElementById("geo-button");
const text2 = document.getElementById("locationText2");
const text3 = document.getElementById("locationText3");
const text4 = document.getElementById("locationText4");



//event for submit button click
submitBtn.addEventListener("click", function(){

    if (navigator.geolocation){
        console.log(navigator.geolocation);
        submitBtn.textContent = "Triangulating Position";
        navigator.geolocation.getCurrentPosition(function(position){
            text2.textContent = "Latitude: " + position.coords.latitude;
            text3.textContent = "Longitude: " + position.coords.longitude;
            submitBtn.textContent = "Thank you for your cooperation citizen";

            let latlon = position.coords.latitude+","+position.coords.longitude;

            let imgUrl = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon;
            imgUrl += "&zoom=14&size=300x300&key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU";

            text4.innerHTML = "<img src='"+imgUrl+ "'>";
            //console.log(imgUrl);
            //console.log(text4.innerHTML);

        },
        function(error){
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    submitBtn.textContent = "Allow the geolocation damn it!"
                    break;
                case error.POSITION_UNAVAILABLE:
                    submitBtn.textContent = "Location Request: info not available"
                    break;
                case error.TIMEOUT:
                    submitBtn.textContent = "Location request: timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    submitBtn.textContent = "Location Request: unknown error"
                    break;
            }
        });
    } else {
        submitBtn.textContent = "Geolocation not supported";
    }

});