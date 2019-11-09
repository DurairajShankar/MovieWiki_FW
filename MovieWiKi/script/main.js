function localVar(value) {
  localStorage.setItem("movie", value); // movie id was stored
}
var count;
var term;
var totalcount;
//this fuction called when the input box is updated
async function valueChange(value) {
  totalcount = 0; // total no of searc result
  count = 1;
  term = value;
  value = document.getElementById("search").value; // getting value inside the text box
  if (value == "") {
    // if value is null then value then empty site
    return;
  }
  try {
    //getting data from API
    document.getElementById("cardcontainer").innerHTML = "";
    var b = await fetch(
      "http://www.omdbapi.com/?apikey=a3ca4ea3&page=1&s=" + value
    )
      .then(res => res.json())
      .then(posts => update(posts));
  } catch {
    //any error then updated here
    document.getElementById("cardcontainer").innerHTML =
      "<h1>Sorry, No Search Results Found</h1>";
	  
    console.log("Error occured");
  }
  //console.log(b);
}

// the cards are in this function
function update(x) {
  {
    if (totalcount == 0) totalcount = x.totalResults;
    if (x.totalResults > count * 10 + 10) {
      document.getElementById("more").style.display = "inline";
    } else {
      document.getElementById("more").style.display = "none";
    }
    var cardcontainer = document.getElementById("cardcontainer"); //getting container of cards
    if (x.status == 404) {
      //cecking status if value returnd is null then it was displayed
      cardcontainer.innerHTML = "<h2>Sorry! No result Found</h2>";
    } else {
      cardcontainer.innerHTML += ""; //making card container epmty
      x = x.Search;
      console.log(x);
      for (var i = 0; i < x.length; i++) {
        //the card is restricted to 10 because of api pagination
        var imgSrc;
        //card ws creatd with flag, movie name and year
        if (x[i].Poster == "N/A") {
          imgSrc = "img/nope.jpg";
        } else {
          imgSrc = x[i].Poster;
        }
        var temp =
          "<a href='./detailed.html'><div class='card'onclick='localVar (\"" +
          x[i].imdbID.toString() +
          "\")'><img width='150px' height='200px'src=" +
          imgSrc +
          "></img></a> " +
          "<div id='MovieTitle'>" +
          x[i].Title +
          "</div>" +
          "<div id='MovieYear'>" +
          x[i].Year +
          "</div>";

        cardcontainer.innerHTML += temp;
      }
    }
  }
}

// this function is to load more
async function loadMore() {
  value = document.getElementById("search").value;
  console.log("totoal count : " + totalcount.toString());
  if (count * 10 < totalcount - 10) {
    count = count + 1;
    console.log(count);
    console.log(
      "http://www.omdbapi.com/?apikey=a3ca4ea3&page=" +
        count.toString() +
        "&s=" +
        value
    );
    try {
      await fetch(
        "http://www.omdbapi.com/?apikey=a3ca4ea3&page=" +
          String(count) +
          "&s=" +
          value
      )
        .then(res => res.json())
        .then(posts => update(posts));
    } catch {
      //any error then updated here
      document.getElementById("cardcontainer").innerHTML =
        "<p>Sorry unable to load data. Please check internet connection</p>";
      console.log("Error occured");
      document.getElementById("more").style.display = "none";
    }
  } else if (count * 10 < totalcount) {
  } else {
    document.getElementById("more").style.display = "none";
  }
}
