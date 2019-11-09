var movieName = localStorage.getItem("movie"); //reading the respective  movie name
document.title = movieName; //change the title of the page
valueChange(); // caling the below function

async function valueChange() {
  // fetching value of the particular country using the api
  try {
    await fetch(
      "http://www.omdbapi.com/?apikey=a3ca4ea3&i=" + movieName.toString()
    )
      .then(res => res.json())
      .then(posts => (x = posts));

    document.getElementById("title").innerHTML = x.Title;
    document.title = x.Title; // setting title of the page
    document.getElementById("flag").setAttribute("src", x.Poster); // seting url for movie poster
    document.getElementById("year").innerText = x.Year;
    document.getElementById("type").innerText = x.Type.toString().toUpperCase();
    document.getElementById("genre").innerText = x.Genre;
    document.getElementById("runtime").innerText = x.Runtime;
    document.getElementById("release").innerText = x.Released;
    document.getElementById("language").innerText = x.Language;
    document.getElementById("actors").innerText = x.Actors;
    document.getElementById("director").innerText = x.Director;
    document.getElementById("writer").innerText = x.Writer;
    document.getElementById("plot").innerText = x.Plot;
    document.getElementById("imdbId").innerText = x.imdbID;
    document.getElementById("imdbRating").innerText = x.imdbRating;
    document.getElementById("imdbVotes").innerText = x.imdbVotes;
    document.getElementById("production").innerText = x.Production;
    document.getElementById("boxoffice").innerText = x.BoxOffice;
    document.getElementById("awards").innerText = x.Awards;

    // array of rating are displayed
    var temp = "";
    for (var i = 0; i < x.Ratings.length; i++) {
      temp += x.Ratings[i]["Source"] + " - " + x.Ratings[i]["Value"] + "<br>";
    }
    document.getElementById("ratings").innerHTML = temp; //setting currency
  } catch {
    //cation is displayed if any problem on connectio or on loading API
    document.getElementById("root").innerHTML =
      "<p>Sorry unable to load data. Please check internet connection</p>";
    console.log("Problem on loading data");
  }
}

// function to bo back
function goBack() {
  window.history.back();
}
