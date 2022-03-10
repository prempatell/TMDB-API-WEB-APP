
/*variables*/
var startIndex=1;
var popularIndex=1;
var FavoritesIndex=1;
var WatchListIndex=1;
var searchButton=1;
var HomeIndex=1;
var bool=0;
var totalResults=0;
var searchtext;  
var request_token;
var HomeToggle=1;
var session_id;
var account_id=10437136;
var mediaMenu="movies";
var MenuCast="movie";
var mediaSearch="movie";
var WatchListTotalResults =1;
var FavoritesTotalResults =1;
var movie_id;
var movie=[];
var mediaType;
var media=[];
var noResults= "<div class='glass'><h2>404 no results found</h2></div>";
/*page actions*/
$(document).ready(function(){
  $Authentication();
  $searchButtonColor();
  console.log(request_token);
$('input:radio[name="SearchDisplayOption"]').change(
  function(){
    if ($('#list_option_one').is(':checked') && $('#list_option_one').val() == 'l') {
      $('#searchResults').css('flex-direction','column');
      console.log("search column");
    }
    else{
      $('#searchResults').css('flex-direction','row');
      console.log("search row");
    }
  });
$('input:radio[name="FavoritesDisplayOption"]').change(
  function(){
    if ($('#list_option_two').is(':checked') && $('#list_option_two').val() == 'l') {
      $('#FavoritesResults').css('flex-direction','column');
      $('#WatchListResults').css('flex-direction','column');
      console.log("Menu shelf column");
    }
    else{
      $('#FavoritesResults').css('flex-direction','row');
      $('#WatchListResults').css('flex-direction','row');
      console.log("menu shelf row");
    }
  });
 
/*toggle actions*/
$("#HomeOption").click(function(){
    HomeIndex=1;
    $PopularContent();
    $clearpage();
    HomeToggle=0;
    console.log(HomeToggle);
    $('#Home').show();
    $("#HomeResults").show();
});
$("#MenuOption").click(function(){
    $clearHome();
    HomeToggle=2;
    console.log(HomeToggle);
    $clearpage();
    $('#Menu').show();
});
$("#SearchOption").click(function(){
    $clearHome();
    HomeToggle=2;
    console.log(HomeToggle);
    $clearpage();
    $('#SearchTab').show();
});


$('.FavoritesToggle').click(function(){
    $('#MenuNameWatchList').hide();
    $('#MenuNameFavorites').show();
    $('#WatchListResults').hide();
    $('#FavoritesResults').show();
    $('#WatchListNav').hide();
    $('#FavoritesNav').show();
    console.log("show favorites")
});

$('.WatchListToggle').click(function(){
    $('#MenuNameWatchList').show();
    $('#MenuNameFavorites').hide();
    $('#WatchListResults').show();
    $('#FavoritesResults').hide();
    $('#WatchListNav').show();
    $('#FavoritesNav').hide();
    console.log("Show watch List")
});
$('.MenuMovieToggle').click(function(){
  WatchListIndex=1;
  FavoritesIndex=1;
  mediaMenu ="movies";
  MenuCast="movie";
  $clearFavoritesSearch();
  $clearWatchListSearch();
  $WatchListSearch();
  $FavoritesSearch();
 
});
$('.MenuTvToggle').click(function(){
  WatchListIndex=1;
  FavoritesIndex=1;
  mediaMenu ="tv";
  MenuCast="tv";
  $clearFavoritesSearch();
  $clearWatchListSearch();
  $WatchListSearch();
  $FavoritesSearch();

});
$('.SearchMovieToggle').click(function(){
  startIndex=1;
  mediaSearch ="movie";
  $clearFavoritesSearch();
  $searchMovie();
 
});
$('.SearchTvToggle').click(function(){
  startIndex=1;
  mediaSearch ="tv";
  $clearSearch();
  $searchMovie();

});
$("#SearchButton").click(function(){
      console.log("search submitted");
      searchtext = $('#textbox').val();
     console.log(searchtext);
      if(searchtext == ''){
        alert("Please enter something to search");
    }
    else{
      if(bool > 0){
    console.log("clear");
    $clearSearch();
      }
    startIndex=1;
    searchButton=1;
    $clearSearch();
    $searchMovie();
    $searchButtonColor();
    }
});
/*Nav buttons*/
$('#searchNavButton1', ).click(function(){
  $clearSearch();
  startIndex=1; 
  searchButton=1;
  $searchMovie();
  $searchButtonColor();
});
$('#searchNavButton2', ).click(function(){
  $clearSearch();
  startIndex=2; 
  searchButton=2;
  $searchMovie();
  $searchButtonColor();
});
$('#searchNavButton3', ).click(function(){
  $clearSearch();
  startIndex=3; 
  searchButton=3;
  $searchMovie();
  $searchButtonColor();
});
$('#searchNavButton4', ).click(function(){
  $clearSearch();
  startIndex=4; 
  searchButton=4;
  $searchMovie();
  $searchButtonColor();
});
$('#searchNavButton5', ).click(function(){
  $clearSearch();
  startIndex=5; 
  searchButton=5;
  $searchMovie();
  $searchButtonColor();
});
$('#FavoritesNavButton1', ).click(function(){
  if(FavoritesIndex==1){
    alert("Can't go back");
  }else{
  $clearFavoritesSearch();
  FavoritesIndex++; 
  $FavoritesSearch();
  }
});
$('#FavoritesNavButton2', ).click(function(){
  if(FavoritesIndex>=FavoritesTotalResults){
    alert("End of Results");
  }else{
  $clearWatchListSearch();
  FavoritesIndex++; 
  $FavoritesSearch();
  }
});
$('#WatchListNavButton1', ).click(function(){
  if(WatchListIndex==1){
    alert("Can't go back");
  }else{
  $clearWatchListSearch();
  WatchListIndex--; 
  $WatchListSearch();
  }
});
$('#WatchListNavButton2', ).click(function(){
  if(WatchListIndex>=WatchListTotalResults){
    alert("End of Results");
  }else{
  $clearFavoritesSearch();
  WatchListIndex++; 
  $WatchListSearch();
  }
});
//$('.AddFavorites').click(function(){
//  console.log("clicked "+this);
//  $.post("https://api.themoviedb.org/3/account/"+account_id+"/favorite?api_key=4b1b68988784917b4b649f5723b60b02&session_id="+session_id, {'media_type':mediaMenu,"media_id":this.value,"true":true}, function(searchResponse){
//    console.log("WatchList:"+searchResponse);
 // });
//});
$(document).on("click",".AddFavorites", function(event){
  console.log("clicked "+this.value);
  if(session_id==undefined){
    alert("you must log in first");
  }else{
  $.post("https://api.themoviedb.org/3/account/"+account_id+"/favorite?api_key=4b1b68988784917b4b649f5723b60b02&session_id="+session_id, {'media_type':this.value,"media_id":this.name,"favorite":true}, function(searchResponse){
  console.log("favorites:"+searchResponse);
  });
 }
});
 $(document).on("click",".AddWatchList", function(event){
  console.log("clicked watchlist");
  if(session_id==undefined){
    alert("you must log in first");
  }else{
  $.post("https://api.themoviedb.org/3/account/"+account_id+"/watchlist?api_key=4b1b68988784917b4b649f5723b60b02&session_id="+session_id, {'media_type':this.value,"media_id":this.name,"watchlist":true}, function(searchResponse){
  console.log("watchlist:"+searchResponse);
  });
 }
});
$(document).on("click",".RemoveFavorites", function(event){
  console.log("clicked "+this.value);
  if(session_id==undefined){
    alert("you must log in first");
  }else{
  $.post("https://api.themoviedb.org/3/account/"+account_id+"/favorite?api_key=4b1b68988784917b4b649f5723b60b02&session_id="+session_id, {'media_type':this.value,"media_id":this.name,"favorite":false}, function(searchResponse){
  console.log("favorites:"+searchResponse);
  });
 }
});
 $(document).on("click",".RemoveWatchList", function(event){
  console.log("clicked watchlist");
  if(session_id==undefined){
    alert("you must log in first");
  }else{
  $.post("https://api.themoviedb.org/3/account/"+account_id+"/watchlist?api_key=4b1b68988784917b4b649f5723b60b02&session_id="+session_id, {'media_type':this.value,"media_id":this.name,"watchlist":false}, function(searchResponse){
  console.log("watchlist:"+searchResponse);
  });
 }
});

$(window).on("scroll", function() {
 //page height
 var scrollHeight = $(document).height();
 //scroll position
 var scrollPos = $(window).height() + $(window).scrollTop();
 // fire if the scroll position is 300 pixels above the bottom of the page
 if(HomeToggle <= 1){
 if(((scrollHeight - 300) >= scrollPos) / scrollHeight == 0){
   HomeIndex++;
   $PopularContent();
  }
  }
});

});
/*Functions*/
$clearpage = function(){
    $('#welcome').hide();
    $('#Home').hide();
    $('#Menu').hide();
    $('#SearchTab').hide();

}

GetURLParameter = function (sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}
$clearSearch = function(){
    $("div[id*='SearchMovie']").each(function (x, pj) {
    $(pj).remove();
    console.log("book removed");
 });
}
$clearHome = function(){
    $("div[id*='HomeMovie']").each(function (x, pj) {
    $(pj).remove();
    console.log("home removed");
 });
}

$clearFavoritesSearch = function(){
    $("div[id*='FavoritesMovie']").each(function (x, pj) {
    $(pj).remove();
    console.log("Favorites's page cleared");
 });
}
$clearWatchListSearch = function(){
    $("div[id*='WatchListMovie']").each(function (x, pj) {
    $(pj).remove();
    console.log("WatchList's page removed");
 });
}
/*API key: 4b1b68988784917b4b649f5723b60b02*/
/*API Read acess Token (v4 auth)*/
/*eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjFiNjg5ODg3ODQ5MTdiNGI2NDlmNTcyM2I2MGIwMiIsInN1YiI6IjYwODgyMDExODQ0NDhlMDA3OTMyMmNmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6OfaTVdNW_bl1UnDPDklp2zz0hION_VRzjdPc54nJ54*/
/*https://api.themoviedb.org/*/
$Authentication=function(){
  request_token=GetURLParameter('request_token');
  console.log("Request Token: " + request_token);
  console.log("session_ID:"+session_id);
  if(request_token == undefined){
    $GetToken();
  } else if(session_id == undefined){
   $GetSession();
 }
}
$GetToken=function(){
  $.get("https://api.themoviedb.org/3/authentication/token/new?api_key=4b1b68988784917b4b649f5723b60b02", function(searchResponse){
   console.log(searchResponse);
   request_token = searchResponse.request_token;
   var account='<div class="glass"><p><a href="https://www.themoviedb.org/authenticate/'+request_token+'?redirect_to=https://baileyknez.azurewebsites.net/FinalProject.html">Click to enable list</a></p></div>';
   $("#FavoritesResults").append(account);
   $("#WatchListResults").append(account);
  });
}
$GetSession=function(){
  $.post("https://api.themoviedb.org/3/authentication/session/new?api_key=4b1b68988784917b4b649f5723b60b02", {'request_token':request_token}, function(searchResponse){
     console.log(searchResponse);
     session_id =searchResponse.session_id;
     AccountDetail();
     $FavoritesSearch();
     $WatchListSearch();
     $('#FavoritesNav').show();
  });
  if(session_id == undefined){
    $GetToken();
  }
}
  
 AccountDetail = function(){
  $.get("https://api.themoviedb.org/3/account?api_key=4b1b68988784917b4b649f5723b60b02&session_id="+session_id, function(searchResponse){
     console.log(searchResponse);
     account_id =searchResponse.id;
     console.log(account_id);
    });
 }
$searchMovie = function(){
  console.log(mediaSearch);
  $.get( "https://api.themoviedb.org/3/search/"+mediaSearch+"?api_key=4b1b68988784917b4b649f5723b60b02&query="+searchtext+"&page="+startIndex, function(searchResponse){
    console.log(searchResponse);
    console.log("search from:" + startIndex);
    var searchdata, cover;
    
    bool++;
    var template = $('#SearchTemp').html();
    var text = Mustache.render(template, searchResponse);
    $("#searchResults").html(text);
    console.log("book made");
    
    for(i = 0; i < searchResponse.results.length; i++) {
    movie_id = searchResponse.results[i].id;
    movie.push(""+movie_id);
    media.push(mediaSearch);
    }
    $addCast();
  });
  
  $("#searchNav").show();
}

$addCast = function(){
  console.log(movie);
    for(i = 0; i < movie.length; i++) {
    $.get( "https://api.themoviedb.org/3/"+media[i]+"/"+movie[i]+"/credits?api_key=4b1b68988784917b4b649f5723b60b02", function(castResponse){
    console.log(castResponse);
    console.log(castResponse.id);
    var template = $('#CastTemp').html();
    var text = Mustache.render(template, castResponse);

    var id = "."+castResponse.id
    console.log("ID: "+id)
    $(id).append(text);
    console.log("Cast made");
  });
  }
  movie=[];
  media=[];
}


$PopularContent=function(){
  $.get("https://api.themoviedb.org/3/trending/all/day?api_key=4b1b68988784917b4b649f5723b60b02&page="+ HomeIndex, function(searchResponse){
   console.log(searchResponse);
   console.log("search from:" + popularIndex);
   totalResults=searchResponse.total_pages;
   console.log("total results:"+totalResults);

   var template = $('#PopularContentTemp').html();
   var text = Mustache.render(template, searchResponse);
   $("#HomeResults").append(text);

   for(i = 0; i < searchResponse.results.length; i++) {
    movie_id = searchResponse.results[i].id;
    movie.push(""+movie_id)
    mediaType=searchResponse.results[i].media_type;
    media.push(""+mediaType);
   }
   $addCast();
  });
}

$FavoritesSearch=function(){
  $.get("https://api.themoviedb.org/3/account/10437136/favorite/"+mediaMenu+"?api_key=4b1b68988784917b4b649f5723b60b02&session_id="+session_id+"&language=en-US&sort_by=created_at.asc&page="+FavoritesIndex, function(searchResponse){
  console.log(searchResponse);
   console.log("search from:" + FavoritesIndex);
   FavoritesTotalResults=searchResponse.total_pages;
   console.log("total results:"+totalResults)
    

   var template = $('#FavoritesTemp').html();
   var text = Mustache.render(template, searchResponse);
   $("#FavoritesResults").html(text);
   console.log("favorites made");
   
   if(FavoritesTotalResults==0){
    $("#FavoritesResults").append(noResults);
    console.log("no results");
   }
   for(i = 0; i < searchResponse.results.length; i++) {
    movie_id = searchResponse.results[i].id;
    movie.push(""+movie_id);
    media.push(MenuCast);
   
   }
   $addCast();
  });
};

$WatchListSearch=function(){
    $.get("https://api.themoviedb.org/3/account/10437136/watchlist/"+mediaMenu+"?api_key=4b1b68988784917b4b649f5723b60b02&language=en-US&session_id="+session_id+"&sort_by=created_at.asc&page="+WatchListIndex, function(searchResponse){
   console.log(searchResponse);
   console.log("search from:" + WatchListIndex);
   WatchListTotalResults=searchResponse.total_pages;
   console.log("total results:"+totalResults);
   
  
   var template = $('#WatchListTemp').html();
   var text = Mustache.render(template, searchResponse);
   $("#WatchListResults").html(text);
   console.log("WatchList made");

   if(WatchListTotalResults==0){
    $("#WatchListResults").append(noResults);
    console.log("no results");
   }
   for(i = 0; i < searchResponse.results.length; i++) {
    movie_id = searchResponse.results[i].id;
    movie.push(""+movie_id);
    media.push(MenuCast);
   
   }
   $addCast();
  });
};
$searchButtonColor = function(){
  $searchButtonWhite();
  switch(searchButton){
    case 1:
      $("#searchNavButton1").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 2:      
      $("#searchNavButton2").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 3:     
      $("#searchNavButton3").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 4:    
      $("#searchNavButton4").css("background-color","rgba(211, 206, 206, 0.582)");
    break;
    case 5:
      $("#searchNavButton5").css("background-color","rgba(211, 206, 206, 0.582)");
    break;

  }
};
$searchButtonWhite = function(){
  $("#searchNavButton1").css("background-color","rgba(255, 255, 255, .7)");
  $("#searchNavButton2").css("background-color","rgba(255, 255, 255, .7)");
  $("#searchNavButton3").css("background-color","rgba(255, 255, 255, .7)");
  $("#searchNavButton4").css("background-color","rgba(255, 255, 255, .7)");
  $("#searchNavButton5").css("background-color","rgba(255, 255, 255, .7)");
};
