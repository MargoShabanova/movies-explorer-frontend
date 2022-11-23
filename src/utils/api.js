class Api {
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
}

export const api = new Api({
  baseUrl: "https://api.diploma.margosha.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});
