// Get Specific Moive
let specific_movie_prefix = "https://api.themoviedb.org/3/movie/";

let specifig_movie_suffix = "?api_key=21702253ac343d65b98f3d4e87663ce2";

// Get Specific Moive Reviews
let specific_movie_reviews_prefix = "https://api.themoviedb.org/3/movie/";

let specific_movie_reviews_suffix = "/reviews?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1";


//Get Lists Of Popular Movies
let popular_movies = "https://api.themoviedb.org/3/movie/popular?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1";

//Get Lists Of Top Movies
let top_movies = "https://api.themoviedb.org/3/movie/top_rated?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1";

//Get Gernes List
let genreList = "https://api.themoviedb.org/3/genre/movie/list?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US";

//Search Query's Prefix People
let searchQuerySuffix_Credit = 'https://api.themoviedb.org/3/movie/';
//Search Query's Suffix People
let searchQueryPrefix_Credit = '/credits?api_key=21702253ac343d65b98f3d4e87663ce2';

$body = $("body");

$(document).on({
    ajaxStart: function () { $body.addClass("loading"); },
    ajaxStop: function () { $body.removeClass("loading"); }
});

$(document).ready(function () {
    let genres = [];

    $.ajax({
        url: genreList,
        type: 'GET',
        dataType: 'json',

        success: function (data) {
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

            //console.log(movies_list);
            //console.log(genres);

            var content = '';
            for (const item of movies_list) {
                let count = 0;

                let movie_genres = [];

                for (const genre_item of genres[0]) {
                    for (const movies_list_genres of item.genre_ids) {
                        if (genre_item.id == movies_list_genres) {
                            movie_genres.push(genre_item.name);
                        }
                    }
                }

                //console.log(movie_genres);

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
                                    <td class="rating">`;
                var star = Math.round(parseFloat(item.vote_average) / 2);
                for (item_rating = 0; item_rating < star; item_rating++) {
                    content += '<i class="fa fa-star"></i>';
                }
                var blankStar = 5 - star;
                for (item_rating = 0; item_rating < blankStar; item_rating++) {
                    content += '<i class="fa fa-star na"></i>';
                }
                content +=
                    `</td>
                                </tr>
                                <tr>
                                    <td class="genre">`

                for (const item_genre of movie_genres) {
                    content += `| ${item_genre} |`
                }
                // <td class="genre">
                //     ${movie_genres[0]} | ${movie_genres[1]} | ${movie_genres[2]}
                // </td>

                content += `</tr>
                                    </td>
                                <tr>
                                    <td class="release">
                                        Release Date: ${item.release_date}
                                    </td>
                                </tr>

                            </table>
                            <span class="more-option"></span>
                            
                            <span class="book-now">
                                <button class="btn-info" value=${item.id}><i class="fa fa-info-circle"></i></button>
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
                                        ${item.runtime} minutes.
                                    </td>
                                </tr>
                                <tr>
                                    <td class="rating">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star na"></i>
                                        <span>${item.vote_average}/5</span>
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

                for (const item_genre of movie_genres) {
                    content += `| ${item_genre} |`
                }

                content += `</span>
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
                // count = count + 1;
                // if (count == 1) {
                //     break;
                // }
            }
            $('#list-item-content').html(content);

            $(".btn-info").click(function () {

                var content = '';

                $('#list-item-content').html(content);

                let specific_movie_final = specific_movie_prefix + $(this).val() + specifig_movie_suffix;

                let specific_movie_reviews_final = specific_movie_reviews_prefix + $(this).val() + specific_movie_reviews_suffix;
                //console.log(specific_movie_reviews_final);

                let genres = [];
                let reviews = [];

                $.ajax({
                    url: genreList,
                    type: 'GET',
                    dataType: 'json',

                    success: function (data) {
                        genres.push(data.genres);
                    },

                    error: function () {
                        alert("Fetch Failed!");
                    }
                })

                $.ajax({
                    url: specific_movie_reviews_final,
                    type: 'GET',
                    dataType: 'json',

                    success: function (data) {
                        reviews.push(data.results);
                    },

                    error: function () {
                        alert("Fetch Failed!");
                    }
                })

                $.ajax({
                    url: specific_movie_final,
                    type: 'GET',
                    dataType: 'json',

                    error: function () {
                        alert("Fetch Failed!");
                    }
                })

                    .done(function (data) {
                        let movie = data;

                        var content = '';
                        let movie_genres_list = [];

                        for (const genre_item of genres[0]) {
                            for (const movie_genres of movie.genres) {
                                if (genre_item.id == movie_genres.id) {
                                    movie_genres_list.push(genre_item.name);
                                }
                            }
                        }

                        content += `
                            <div class = "content">
                                <div class="list-thumb">
                                    <img src="http://image.tmdb.org/t/p/w185/${movie.poster_path}"
                                        alt="" width="110">
                                </div>
            
                                <div class="movie-detail">
                                    <div class="short-detail">
                                        <table>
                                            <tr>
                                                <td class="title">${movie.title}</td>
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

                        for (const item_genre of movie_genres_list) {
                            content += `| ${item_genre} |`
                        }
                        // <td class="genre">
                        //     ${movie_genres[0]} | ${movie_genres[1]} | ${movie_genres[2]}
                        // </td>

                        content += `</tr>
                                                </td>
                                            <tr>
                                                <td class="release">
                                                    Release Date: ${movie.release_date}
                                                </td>
                                            </tr>
            
                                        </table>
                                        <span class="more-option"></span>
                                        
                                        <span class="book-now">
                                            <button class="btn-info" value=${movie.id}><i class="fa fa-info-circle"></i></button>
                                        </span>
                                    </div>
            
                                    <div class="full-detail">
                                        <table>
                                            <tr>
                                                <td class="title">${movie.original_title}</td>
                                            </tr>
                                            <tr>
                                                <td class="author">Stephen McFeely, Christopher Markus</td>
                                            </tr>
                                            <tr>
                                                <td class="duration">
                                                    ${movie.runtime} minutes.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="rating">`

                        var star = Math.round(parseFloat(movie.vote_average) / 2);

                        for (item_rating = 0; item_rating < star; item_rating++) {
                            content += '<i class="fa fa-star"></i>';
                        }
                        var blankStar = 5 - star;
                        for (item_rating = 0; item_rating < blankStar; item_rating++) {
                            content += '<i class="fa fa-star na"></i>';
                        }

                        content += `
                                                    <span>${movie.vote_average}/10</span>
                                                    
                                                </td>
                                            </tr>
                                        </table>
                                        <div class="meta-data">
                                            <ul class="nav">
                                                <button class="info"><li class="active">Info</li></button>
                                                <button class="cast" value="${movie.id}"><li>Cast</li></button>
                                                <button class="review"><li>Reviews</li></button>
                                                <button class="award"><li>Awards(0)</li></button>
                                            </ul>
                                            <div class="info">
                                                <span class="genre"> `

                        for (const item_genre of movie_genres_list) {
                            content += `| ${item_genre} |`
                        }

                        content += `</span>
                                                <span class="span-content" id="span-content">
                                                    <h3 class="overview"> Overview: </h3>
                                                    <h6 class="overview-content"> ${movie.overview} </h6>
                                                    <br />
                                                    <div class = "cast-content-container" id="cast-content-container">

                                                    </div>
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
                        // count = count + 1;
                        // if (count == 1) {
                        //     break;
                        // }
                        $('#list-item-content').html(content);
                        $("div.content div.full-detail").show();

                        $(".info").click(function () {
                            var content = '';


                            content += `<h3 class="overview"> Overview: </h3>
                                        <h6 class="overview-content"> ${movie.overview} </h6>
                                            <br />
                                        <div class = "cast-content-container" id="cast-content-container">

                                        </div>`;

                            $('#span-content').html(content);
                        });

                        $(".review").click(function () {
                            var content = '';

                            for (const item_review of reviews[0]) {
                                //console.log(item_review);
                                content += `<h3 class="review"> By ${item_review.author}: </h3>
                                            <h6 class="review-content">${item_review.content}</h6>
                                            <br />
                                            <div class = "cast-content-container" id="cast-content-container">

                                            </div>`;
                            }
                            $('#span-content').html(content);
                        });

                        $(".cast").click(function () {
                            $("h3.overview").hide();
                            $("h3.review").hide();
                            $("h6.overview-content").hide();
                            $("h6.review-content").hide();
                            var content = '';

                            // Get value from button
                            let value = $(this).val();

                            let searchString = value;

                            searchString = searchString.replace(/\s/g, "%20");

                            let finalSearchQuery_People = searchQuerySuffix_Credit + searchString + searchQueryPrefix_Credit;

                            //console.log(finalSearchQuery_People);

                            $.ajax({
                                url: finalSearchQuery_People,
                                type: 'GET',
                                dataType: 'json',

                                success: function () {

                                },

                                error: function () {
                                    alert("Fetch Failed!");
                                }
                            })
                                .done(function (data) {
                                    content += `<h3>Cast</h3>`;

                                    let cast = data.cast;

                                    let crew = data.crew;

                                    for (const cast_item of cast) {
                                        content +=
                                            `
                                                    <div class="cast-detail">
                                                            <div class="profile-thumb">
                                                                <img src="http://image.tmdb.org/t/p/w185/${cast_item.profile_path}"
                                                                    alt="" width="110">
                                                            </div>
                                                    <div class="cast-detail">
                                                        <table>
                                                            <tr>
                                                                <td class="title">${cast_item.name}</td>
                                                            </tr>
            
                                                            <tr>
                                                                <td class="release">
                                                                    As: ${cast_item.character}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    <span class="more-option"></span>
                                                </div>
                                            </div>`
                                    }
                                    $('#cast-content-container').html(content);
                                })
                        })

                        $(".btn-back-button").click(function () {

                            location.reload();

                        });
                    });
            });
        });
});

