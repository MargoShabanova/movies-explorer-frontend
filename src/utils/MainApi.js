import { BEATFILM_URL, LOCAL_API_URL } from "../utils/constants";

class MainApi {
  constructor({ baseUrl, beatfilmUrl, headers }) {
    this._baseUrl = baseUrl;
    this._beatfilmUrl = beatfilmUrl;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  signUp(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then(this._checkResponse);
  }

  signIn(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  signOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: "include",
      headers: this._headers,
    })
      .then(this._checkResponce)
      .catch(console.log);
  }

  editProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then(this._checkResponce)
      .catch(console.log);
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: "include",
      headers: this._headers,
    })
      .then(this._checkResponce)
      .catch(console.log);
  }

  addMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${this._beatfilmUrl}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${this._beatfilmUrl}${movie.image.formats.thumbnail.url}`,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        movieId: movie.id,
      }),
    })
      .then(this._checkResponce)
      .catch(console.log);
  }

  deleteMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    })
      .then(this._checkResponce)
      .catch(console.log);
  }
}

export const mainApi = new MainApi({
  baseUrl: LOCAL_API_URL,
  beatfilmUrl: BEATFILM_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
