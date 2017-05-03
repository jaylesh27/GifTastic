//create an array of strings that consists of names of different tv shows

var tvShows = ["game of thrones",
				"silicon valley",
				"daredevil",
				"house",
				"friends",
				"community",
				"30 rock",
				"parks and recreation",
				"the office",
				"the west wing",
				"breaking bad",
				"the walking dead",
				"family guy",
				"mad men"
	];



$(document).ready(function() {

//create a function to render buttons for each of the movies in the array
	function displayButtons() {
		//empty the tvShowButtons div before appending the entire tvShows array as buttons with the addition of the new button
		$("#tvShowButtons").empty();
		//create a for loop to go through the tvShows array and add a button for each item in array to the webpage
		for (var i = 0; i < tvShows.length; i++) {
			//console.log(tvShows[i]);
			//create a var to store a new button HTML element
			var addButton = $("<button></button>");
			//add a class of "tv-show" to each button
			addButton.addClass("tv-show");
			//add an attribute of data-name for each item in tvShow array
			addButton.attr("data-name", tvShows[i]);
			//add text to each button
			addButton.text(tvShows[i]);
			//add buttons to tvShowButtons div in HTML page
			$("#tvShowButtons").append(addButton);
		}

	};


//create a form that takes the user input (ex: user types in "breaking bad") and adds it to the tvShows array and as a button in the webpage

 	$("#addTvShow").on("click", function(event) {
 		//prevent the default event triggered when pressing the button
    	event.preventDefault();
    	//create a var to store the user input into the text box
    	var newTvShow = $("#tv-show-input").val().trim();
    	//remove text from input box after user submits it
    	$("#tv-show-input").val("");
    	//add the user input into the tvShows array
    	tvShows.push(newTvShow);
 		//run the displayButtons function to add the user input to the web page
    	displayButtons();
  	});


//when user clicks on a button, display 10 static gifs on the page
	$("#tvShowButtons").on("click", ".tv-show", function() {
		//clear out gifsnotjifs div each time a button is pressed
		$("#gifsnotjifs").empty();
		var tvShow = $(this).attr("data-name");
		console.log(tvShow);
		//create a var to store the URL for the giphy API
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		        tvShow + "&api_key=dc6zaTOxFJmzC&limit=10";

		//perform an API call using ajax
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			//declare "results" variable to store the data from the API call made to giphy
			var results = response.data;
			//console.log(results);
			//create a for loop to run through each of the gifs that were pulled with the giphy API and add a div, rating, and img for each to the HTML page
			for (var i = 0; i < results.length; i++) {
				//create a var for a div to store gif and rating
				var gifDiv = $("<div class='gif-item'></div>");
				//create a var to store the rating of each gif
				var rating = results[i].rating;
				//create a p element to display gif rating
				var gifRating = $("<p>").text("Rating: " + rating);
				//create a var for img element
		        var tvShowGif = $("<img>");
		        //add a src attr to the gif with a link to the static version of the gif
		        tvShowGif.attr("src", results[i].images.original_still.url);
		        //add data-still, data-animate and data-state attributes to tvShowGif
		        tvShowGif.attr("data-still", results[i].images.original_still.url);
		        tvShowGif.attr("data-animate", results[i].images.fixed_height.url);
		        tvShowGif.attr("data-state", "still");
		        console.log(tvShowGif.attr("data-state"));
		        //add rating to the gifDiv
		        gifDiv.prepend(gifRating);
		        //add img to the givDiv
		        gifDiv.prepend(tvShowGif);
		        //add the gifDiv to the HTML div that will display the gifs
		        $("#gifsnotjifs").prepend(gifDiv);

			}

		});

	});

//when user clicks on a gif, it should animate and if user clicks again it should pause
	$("#gifsnotjifs").on("click", "img", function() {
		var state = $(this).attr("data-state");
			if (state === "still") {
		        $(this).attr("src", $(this).attr("data-animate"));
		        $(this).attr("data-state", "animate");
		      }else if (state === "animate") {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
      		}
	});


	displayButtons();

});