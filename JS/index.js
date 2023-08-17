// Add an event listener to the search form for the 'keyup' event
document.getElementById("search-form").addEventListener('keyup', function () {
    // Get the URL for the API request
    var url = getUrl();
    // Create a new XMLHttpRequest object
    // Why XMLHTTPRequest - XMLHttpRequest (XHR) objects are used to interact with servers. 
    // You can retrieve data from a URL without having to do a full page refresh. 
    // This enables a Web page to update just part of a page without disrupting what the user is doing.
    var xhrRequest = new XMLHttpRequest();
    // Open a GET request to the specified URL
    xhrRequest.open('get', url, true);
    // Send the request
    xhrRequest.send();
    // Set an event listener to handle the response when it's loaded
    xhrRequest.onload = function () {
        // Parse the JSON response
        var data = JSON.parse(xhrRequest.responseText);
        // Call the display function to show the data
        display(data);
    }
});


// Get the URL from  API
function getUrl() {
    // From Id I'll get value.
    var searchQuery = document.getElementById('search-string').value;
    // Print the Search Query in to Console.
    console.log(searchQuery);
    //  Set the main heading for user to know what he/she searched for.
    document.getElementById('querySection').innerHTML = 'You have searched for : ' + searchQuery;
    //  If search query matches the results then it will execute next function/command.
    if (!searchQuery) {
        console.log('Name cannot be empty!');
        return "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=b004991b395107c3ecb81ae53b5a5ff9&hash=1eb1b9053f2ed6e3214c792386fda533"
    } else {
        return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&apikey=b004991b395107c3ecb81ae53b5a5ff9&hash=1eb1b9053f2ed6e3214c792386fda533&ts=1`
    }
}

//  Get Canvas 
let canvas = document.getElementById('canvas');
// Get Search String
let searchHero = document.getElementById('search-string').value;


// This Function will display the Data on the Screen
function display(data) {
    var superHeroList = document.getElementById('superhero-list');
    superHeroList.innerHTML = "";
    var results = data.data.results;
    //  Printing the results that are get from searched Query
    console.log(results);
    if (!results) {
        //  if Search character matches the results then only it will forward to next step
        document.getElementById('search-character').value = "";
        window.alert("No super hero found!");
    } else {
        //  Else the process it going on
        // Creating a For Loop because there will be n number of results for same query
        for (let result of results) {
            var templateCanvas = canvas.content.cloneNode(true);
            //  Get all the elemets from id and then changes its Inner HTMl
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + result.id;

            if (result.comics && result.comics.available) {
                templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>' + result.comics.available;
            }
            if (result.series && result.series.available) {
                templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>' + result.series.available;
            }
            if (result.stories && result.stories.available) {
                templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>' + result.stories.available;
            }


            //  Set Event listenet for Learn  more button 
            templateCanvas.getElementById('learn-more').addEventListener('click', function () {
                localStorage.setItem('id', result.id);
                window.location.assign('./about.html');
            });
            //  Set Event listenet for Fav  more button 
            templateCanvas.getElementById('fav').addEventListener('click', function () {
                var index = localStorage.length;
                var data = JSON.stringify(result);
                localStorage.setItem(result.id, data);
            });
            superHeroList.appendChild(templateCanvas);
        }
    }
};
//  This is a function for displaying a alert box type message on the bottom of the screen, when we add to fav. heros.
function addFunction() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}