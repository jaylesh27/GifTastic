//create an array of strings that fall under a specific category (ex: list of different types of animals)

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
				"anthony bourdain parts unknown",
				"the walking dead",
				"family guy",
				"mad men"
	];

$(document).ready(function() {


//create a function to render buttons for each of the movies in the array

	function displayButtons() {
		$("#tvShowButtons").empty();
		for (var i = 0; i < tvShows.length; i++) {
			var addButton = $("<button>");
			addButton.addClass("tv-show");
			addButton.attr("data-name", tvShows[i]);
			addButton.text(tvShows[i]);
			console.log(addButton);
			$("#tvShowButtons").append(addButton);
		}

	};


//create a form that takes the user input (ex: user types in "dogs") and adds it to the topics array as a button as well and displays it on the HTML page

  $("#addTvShow").on("click", function(event) {
    event.preventDefault();

    var newTvShow = $("#tv-show-input").val().trim();
    
    tvShows.push(newTvShow);
 
    displayButtons();
  });

displayButtons();


//when user clicks on a button, display 10 static gifs on the page

//when user clicks on a gif, it should animate

//under every gif, display its rating (G, PG, etc)

//have the new button have the same functionality as the default buttons that were already on the page





});