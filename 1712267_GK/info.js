// Get Specific Moive
let specific_movie = "https://api.themoviedb.org/3/movie/550?api_key=21702253ac343d65b98f3d4e87663ce2"
//Get Lists Of Popular Movies
let popular_movies = "https://api.themoviedb.org/3/movie/popular?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1";
//Get Lists Of Top Movies
let top_movies = "https://api.themoviedb.org/3/movie/top_rated?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1"

function evtSubmit(e)
{
    e.preventDefault();

    const strSearch = $('form input').val();

    const reqStr = strSearch;
}

var spinner = $("div.spinner-border").hide();

$(document).ready(function(){
    $(".btn-info").click(function(){
        spinner.show();
        
        $("div.list-item .full-detail").show();
        $("div.list-items span.book-now").hide();
        
        spinner.hide();       
    });

    $(".btn-back-button").click(function(){
        $("div.list-item .full-detail").hide();
        $("div.list-item span.book-now").show();
    });
});

