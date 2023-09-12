"use strict";
//alert("JS active");

const submitBtn = document.getElementById("geo-button");
const text2 = document.getElementById("locationText2");
const text3 = document.getElementById("locationText3");




//event for submit button click
submitBtn.addEventListener("click", function(){

    if (navigator.geolocation){
        console.log(navigator.geolocation);
        submitBtn.textContent = "Triangulating Position";
        navigator.geolocation.getCurrentPosition(function(position){
            text2.textContent = "Latitude: " + position.coords.latitude;
            text3.textContent = "Longitudd: " + position.coords.longitude;
            submitBtn.textContent = "Thank you for your cooperation citizen";
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