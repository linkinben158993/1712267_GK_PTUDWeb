// Get Specific Moive
let specific_movie = "https://api.themoviedb.org/3/movie/550?api_key=21702253ac343d65b98f3d4e87663ce2"
//Get Lists Of Popular Movies
let popular_movies = "https://api.themoviedb.org/3/movie/popular?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1";
//Get Lists Of Top Movies
let top_movies = "https://api.themoviedb.org/3/movie/top_rated?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1";
//Get Gernes List
let genreList = "https://api.themoviedb.org/3/genre/movie/list?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US";

function evtSubmit(e) {
    e.preventDefault();

    const strSearch = $('form input').val();

    const reqStr = strSearch;
}

var spinner = $("div.spinner-border").hide();

$(document).ready(function (movies_popular) {
    let genres = [];

    $.ajax({
        url: genreList,
        type: 'GET',
        dataType: 'json',

        success: function(data){
            genres.push(data.genres);
        },
        
        error: function () {
            alert("Fetch Failed!");
        }
    })

    $.ajax({
        url: popular_movies,
        type: 'GET',
        dataType: 'json',
        
        error: function () {
            alert("Fetch Failed!");
        }
    })
        .done(function (data) {
            let movies_list = data.results;

            console.log(movies_list);
            console.log(genres);



            var content = '';
            for (const item of movies_list) {
                let count = 0;

                let movie_genres = [];

                for(const genre_item of genres[0]){
                    for(const movies_list_genres of item.genre_ids){
                        if(genre_item.id == movies_list_genres){
                            movie_genres.push(genre_item.name);
                        }
                    }
                }

                console.log(movie_genres);

                content += `
                <div class = "content">
                    <div class="list-thumb">
                        <img src="http://image.tmdb.org/t/p/w185/${item.poster_path}"
                            alt="" width="110">
                    </div>

                    <div class="movie-detail">
                        <div class="short-detail">
                            <table>
                                <tr>
                                    <td class="title">${item.title}</td>
                                </tr>
                                <tr>
                                    <td class="author">Stephen McFeely, Christopher Markus</td>
                                </tr>
                                <tr>
                                    <td class="rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star na"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="genre">`
                                
                                for(const item_genre of movie_genres){
                                    content += `| ${item_genre} |`
                                }
                                    // <td class="genre">
                                    //     ${movie_genres[0]} | ${movie_genres[1]} | ${movie_genres[2]}
                                    // </td>

                content +=      `</tr>
                                    </td>
                                <tr>
                                    <td class="release">
                                        Release Date: ${item.release_date}
                                    </td>
                                </tr>

                            </table>
                            <span class="more-option"></span>
                            
                            <span class="book-now">
                                <button class="btn-info"><i class="fa fa-info-circle"></i></button>
                            </span>
                        </div>

                        <div class="full-detail">
                            <table>
                                <tr>
                                    <td class="title">${item.original_title}</td>
                                </tr>
                                <tr>
                                    <td class="author">Stephen McFeely, Christopher Markus</td>
                                </tr>
                                <tr>
                                    <td class="duration">
                                        3h 50 minutes
                                    </td>
                                </tr>
                                <tr>
                                    <td class="rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star na"></i>
                                        <span>4.5/5</span>
                                    </td>
                                </tr>
                            </table>
                            <div class="meta-data">
                                <ul class="nav">
                                    <button class="active"><li class="active">Info</li></button>
                                    <button class=""><li>Cast</li></button>
                                    <button class=""><li>Reviews</li></button>
                                    <button class=""><li>Awards(0)</li></button>
                                </ul>
                                <div class="info">
                                    <span class="genre"> `
                                    
                                    for(const item_genre of movie_genres){
                                        content += `| ${item_genre} |`
                                    }

                content +=          `</span>
                                    <span class="story">
                                        ${item.overview}
                                        <br />
                                    </span>
                                </div>
                                <div class="btn-back">
                                    <span class="btn-back-span">
                                        <button class="btn-back-button"><i class="fa fa-arrow-left">Click Here To Go
                                                Back</i></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                count = count + 1;
                if (count == 1) {
                    break;
                }
            }
            $('#list-item-content').html(content);

            $(".btn-info").click(function () {
                spinner.show();

                $("div.list-item div.full-detail").show();
                $("div.content span.book-now").hide();
                $("div.content div.short-detail").hide();

                spinner.hide();
            });

            $(".btn-back-button").click(function () {
                $("div.list-item div.full-detail").hide();
                $("div.content span.book-now").show();
                $("div.content div.short-detail").show();
            });
        })
});

