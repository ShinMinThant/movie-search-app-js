const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.getElementById("errorMessage");
const movieContainer = document.getElementById("movieContainer");

const apiKey = "d882e710";

movieInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", function () {
  const movie = movieInput.value;
  loadingMessage.textContent = "Loading....";
  errorMessage.textContent = "";
  movieContainer.style.display = "none";

  if (movie.trim() === "") {
    movieContainer.style.display = "none";
    loadingMessage.textContent = "";
    errorMessage.textContent = "Please enter a movie name!";
    return;
  }

  const url = `https://www.omdbapi.com/?s=${movie}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        movieContainer.innerHTML = "";
        errorMessage.textContent = "";

        if (data.Response === "False") {
          movieContainer.style.display = "none";
          loadingMessage.textContent = "";
          errorMessage.textContent = "Movie not found!";
          return;
        }

        errorMessage.textContent = "";
        loadingMessage.textContent = "";
        movieContainer.style.display = "block";

        data.Search.forEach((movie) => {
          const div = document.createElement("div");
          div.classList.add("movie-card");

          console.log(movie.Poster);
          console.log(data.Search[0]);

          div.innerHTML = `
                <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
                `;

          movieContainer.appendChild(div);
        });
      }, 500);
    })
    .catch((err) => {
      errorMessage.textContent = "Something went wrong!";
      console.log(err);
    });
});
