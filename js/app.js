const MOVIES_DATA_URL = "js/data/movies.json";
const movieListEl = document.getElementById("movie-list");

/**
 * Creates a single movie card element.
 */
function createMovieCard(movie) {
  const article = document.createElement("article");
  article.className = "movie-card";

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = movie.poster;
  img.alt = `${movie.title} poster`;
  img.loading = "lazy";
  figure.appendChild(img);

  const content = document.createElement("div");
  content.className = "flex-column";

  const title = document.createElement("h3");
  title.textContent = movie.title;

  const description = document.createElement("p");
  description.textContent = movie.description;

  const tags = document.createElement("div");
  tags.className = "tags";
  const genre = document.createElement("p");
  genre.textContent = movie.genre;
  const year = document.createElement("p");
  year.textContent = String(movie.year);
  tags.append(genre, year);

  content.append(title, description, tags);
  article.append(figure, content);

  return article;
}

/**
 * Fetches movies from JSON and renders them into #movie-list.
 */
async function renderMovies() {
  try {
    const response = await fetch(MOVIES_DATA_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const movies = await response.json();

    movieListEl.replaceChildren();
    for (const movie of movies) {
      movieListEl.appendChild(createMovieCard(movie));
    }
  } catch (err) {
    movieListEl.innerHTML = `<p class="error">Unable to load movies. (${err.message})</p>`;
  }
}

renderMovies();
