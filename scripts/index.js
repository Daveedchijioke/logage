let scrollContainer = document.querySelector('.Categories-Collections');
let backBtn = document.querySelector('.left-arrow');
let ForwardBtn = document.querySelector('.right-arrow');

scrollContainer.addEventListener("wheel", (element)=>{
    element.preventDefault();
    scrollContainer.scrollLeft += element.deltaY;
    scrollContainer.style.scrollBehavior = "auto";
});
ForwardBtn.addEventListener("click",()=>{
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 790;
})
backBtn.addEventListener("click",()=>{
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 790;
})

let scrollContainerTwo = document.querySelector('.most-viewed-images');
let backBtnTwo = document.querySelector('.second-left-arrow');
let ForwardBtnTwo = document.querySelector('.second-right-arrow')

scrollContainerTwo.addEventListener("wheel",(element)=>{
    element.preventDefault();
    scrollContainerTwo.scrollLeft += element.deltaY;
});
backBtnTwo.addEventListener("click", ()=>{
    scrollContainerTwo.scrollLeft -= 790;
})
ForwardBtnTwo.addEventListener('click',()=>{
    scrollContainerTwo.scrollLeft += 790
})

let lastBackBtn = document.querySelector('.last-two-image-btn-back');
let lastForwardBtn = document.querySelector('.last-two-image-btn-forward')
let scrollContainerLast = document.querySelector('.last-two-images');
scrollContainerLast.addEventListener('wheel',(element)=>{
    element.preventDefault();
    scrollContainerLast.style.scrollBehavior= "smooth"
    scrollContainerLast.scrollLeft += element.deltaY;
})
lastBackBtn.addEventListener('click',()=>{
    scrollContainerLast.style.scrollBehavior= "smooth"
    scrollContainerLast.scrollLeft -= 608;
    console.log("back clicked")
});
lastForwardBtn.addEventListener('click', ()=>{
    scrollContainerLast.style.scrollBehavior= "smooth"
    scrollContainerLast.scrollLeft += 608;
    console.log("forward clicked")
});

function displayDate() {
    const now = new Date();
    
    // Format the date as YYYY-MM-DD
    const date = now.toISOString().split('T')[0]; 
    
    // Get hours, minutes, and seconds in 24-hour format
    const time = now.toLocaleTimeString('en-US', { hour12: false });

    // Display in the HTML element
    document.getElementById("showDate").innerHTML = `📅${date} |🕜 ${time}`;
}

displayDate();// Call the function immediately when the page loads

// Update the time every second
setInterval(displayDate, 1000);

//location functionality begins here
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location-info").innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "8c0ae81e00b340378cca754d8f646fff"; // Replace with your API Key
    let apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let details = data.results[0].components;
            let city = details.city || details.town || details.village || "Unknown City";
            let country = details.country;
            document.getElementById("location-info").innerText = ` |📍${city}, ${country}`;
        })
        .catch(error => {
            document.getElementById("location-info").innerText = "Error retrieving location.";
            console.error("Error:", error);
        });
}

function showError(error) {
    let errorMsg = "";
    switch (error.code) {
        case error.PERMISSION_DENIED:
            errorMsg = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMsg = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMsg = "An unknown error occurred.";
            break;
    }
    document.getElementById("location-info").innerText = errorMsg;
}

getLocation()

//nav bar responsiveness
document.addEventListener("DOMContentLoaded", function () {
   
    document.querySelector('.hamburger').addEventListener('click', function() {
        
        document.querySelector('.nav-list ul').classList.toggle('ulShow');
        console.log("clicked")
      });
});
