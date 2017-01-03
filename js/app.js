
// Since the script is at the bottom of the page , the document ready function is not needed
	$("form").on("submit",function(evt){
		// prevent form to take user to another page on submit.
		   evt.preventDefault();

		   // display an svg loading animation while waiting the response from the server.
		   	$("#movies").html("<li style='width:100%; text-align: center;'><h1>Loading..</h1><img src='svg/gears.svg'></li>");

		   	// catch search fields
		   var searchTerm = $("#search");
		   var searchYear = $("#year");


// sprepare url, and data that will be send in the ajax request.
		var url ="http://www.omdbapi.com/?callback=?";

		var data = {
			s: searchTerm.val(),
			y: searchYear.val(),
			type: "movie",
			r: "json"

			

		};

		// set callback function
		function callback(movies){
			
			console.log(movies);
			var movieHTML="";

			// if there is no Response, then there are no movies on the server that match with the  request.
			if(movies.Response ==="False"){
				movieHTML+="<li class='no-movies' style='width:100%'>";
				movieHTML+="<i class='material-icons icon-help'>help_outline</i>No movies found that match: "+searchTerm.val()+"";
				movieHTML+="</li>";

			}else{// there are movies in the response.
					
				$.each(movies.Search,function(i,movie){
						
						movieHTML+="<li class='movie_div'  onclick='viewMovieDetails(\""+movie.imdbID+"\")' >";
						movieHTML+="<div class='poster-wrap' >";
						if(movie.Poster !="N/A"){// if there are thumbnails
						movieHTML+="<img class='movie-poster' src='"+movie.Poster+"'>";
						}else{ //if there are no thumbnails in the movie then replace with the next line
							movieHTML+="<i class='material-icons poster-placeholder'>crop_original</i>"
						}
						movieHTML +="</div>";
						movieHTML +="<span class='movie-title'>"+movie.Title+"</span>";
						movieHTML +="<span class='movie-year'>"+movie.Year+"</span>";
						movieHTML +="</li>";
				});
				
				}

				
				// once  everything is formated to html then add to the dom.
				$("#movies").html(movieHTML);
		};

		// AJAX request.
		$.getJSON(url,data,callback);


	});


// This function is very similar to the one above, 
//the main diference is the key used in the configuration data object., this time we are using 'i', that search by id and takes only 1 result.

function viewMovieDetails(id){
//animation to simulate transition between overlay and main page.
	$(".moviePage").show("slow");
			$("#movies").hide();


//prepare url and data for ajax request
	var url ="http://www.omdbapi.com/?callback=?";

			var data = {
			i:id,			
			r: "json"		

		};
		function callback(details){
			console.log(details);

		//this callback returns detailed info to the dom.	
			var topdiv ="<h2>"+details.Title+ " ("+details.Year+")</h2>";
				 topdiv +="<h4> IMBD Rating: "+details.imdbRating+"</h4>";

			var bottomdiv ="<h3>Plot Synopsis</h3>";
				bottomdiv +="<p>"+details.Plot+"</p>";
				bottomdiv +="<a href ='http://www.imdb.com/title/"+details.imdbID+"'>View on IMDB</a>";
             
             

			$(".moviePage_topdiv_title").html(topdiv);

			$(".moviePage_bottomdiv_content").html(bottomdiv);
			if(details.Poster !="N/A"){
				$(".moviePage_thumbnail").attr("src",details.Poster)

			}else{


				$(".moviePage_thumbnail").attr("src","img/noImage.png");
			}
				
			

			
		}
		
		$.getJSON(url,data,callback);
	

}
function back(){

//this function will take out the overlay and as soon as the animation finish, it will add default elements and svg animation
//this animation will show while the user is waiting for the server response.

			$(".moviePage").hide("slow",function(){

				$("#movies").show("slow",function(){
					$(".moviePage_topdiv_title").html("<h1>Loading..</h1><img src='svg/gears.svg'>");
					$(".moviePage_bottomdiv_content").html("");
					$(".moviePage_thumbnail").attr("src","")
				});

			});
			
}
