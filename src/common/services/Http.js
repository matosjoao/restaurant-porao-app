import axios from 'axios';
import * as qs from 'qs';
import {API_BASE_URL} from '../../Config';

const axiosConfig = {
  baseURL: API_BASE_URL,
  // timeout: 10,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=utf-8',
  },
};

const http = axios.create(axiosConfig);

http.interceptors.response.use(
  response => response.data,
  async error => {
    if (error.response && error.response.status === 401) {
      //  && http.defaults.headers.common.Authorization
      //TODO:: Go to logout
      /* store.dispatch(logout()); */
    }
    return Promise.reject(error);
  },
);

class Http {
  //hasInternet = false;
  authorization;
  language;

  constructor() {
    //Internet.addInternetListener((hasInternet: boolean) => {this.hasInternet = hasInternet});

    http.interceptors.request.use(
      request => {
        request.headers = this.getHeaders(request.headers);
        return request;
      },
      error => error,
    );
  }

  setToken(token) {
    if (token) {
      this.authorization = `${token.token_type} ${token.access_token}`;
    } else {
      this.authorization = '';
    }
  }

  setLanguage(language) {
    if (language) {
      this.language = language;
    }
  }

  async post(url, data, config) {
    return http
      .post(url, data, config)
      .catch(error => this.onError(error, url));
  }

  async put(url, data, config) {
    return http.put(url, data, config).catch(error => this.onError(error, url));
  }

  async get(url, params = null, config) {
    if (params) {
      const paramsAsQuery = qs.stringify(params); // , { serializeDate: (d) => d.getTime().toString()}
      url = `${url}?${paramsAsQuery}`;
    }
    return http.get(url, config).catch(error => this.onError(error, url));
  }

  async delete(url, params = null) {
    if (params) {
      const paramsAsQuery = qs.stringify(params);
      url = `${url}?${paramsAsQuery}`;
    }
    return http.delete(url).catch(error => this.onError(error, url));
  }

  getHeaders = headers => {
    return Object.assign(headers || {}, {
      Authorization:
        headers && headers.Authorization !== undefined
          ? headers.Authorization
          : this.authorization,
      'X-App-Lang': this.language,
    });
  };

  onError(error, _url) {
    // if (this.hasInternet) { // TODO: add to local logs
    //     Logger.error(LOGGER_LOG_TYPE.REQUEST, error.message, { url: API_BASE_URL + url, error }, { disableSend: true });
    // }
    return Promise.reject(error);
  }
}

export default new Http();
