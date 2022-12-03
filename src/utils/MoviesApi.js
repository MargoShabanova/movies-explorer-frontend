import { beatfilmUrl } from "../utils/constants";

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponce(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`).then(this._checkResponce);
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: beatfilmUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
