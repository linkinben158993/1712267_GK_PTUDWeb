// Get Specific Moive
let specific_movie = "https://api.themoviedb.org/3/movie/550?api_key=21702253ac343d65b98f3d4e87663ce2"
//Get Lists Of Popular Movies
let popular_movies = "https://api.themoviedb.org/3/movie/popular?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1";
//Get Lists Of Top Movies
let top_movies = "https://api.themoviedb.org/3/movie/top_rated?api_key=21702253ac343d65b98f3d4e87663ce2&language=en-US&page=1"

function evtSubmit(e) {
    e.preventDefault();

    const strSearch = $('form input').val();

    const reqStr = strSearch;
}

var spinner = $("div.spinner-border").hide();

$(document).ready(function () {
    var list_movies;
    $.ajax({
        url: popular_movies,
        type: 'GET',
        dataType: 'json',
        error: function () {
            alert("Fetch Failed!");
        }
    })

        .done(function (data) {
            console.log(data);

            let movies_list = data.results;

            console.log(movies_list);

            var content = '';
            for (const item of movies_list) {
                let count = 0;
                content += `
                <div class = "content">
                    <div class="list-thumb">
                        <img src="https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
                            alt="" width="110">
                    </div>

                    <span class="book-now">
                        <button class="btn-info"><i class="fa fa-info-circle"></i></button>
                    </span>

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
                                    <td class="genre">
                                        Action | Sci-Fi | Adventure
                                    </td>
                                </tr>
                                <tr>
                                    <td class="duration">
                                        3h 50 minutes
                                    </td>
                                </tr>

                            </table>
                            <span class="more-option"></span>
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
                                    <li class="active">Info</li>
                                    <li>Cast</li>
                                    <li>Reviews</li>
                                    <li>Awards(0)</li>
                                </ul>
                                <div class="info">
                                    <span class="genre">
                                        Action | Sci-Fi | Adventure
                                    </span>
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

