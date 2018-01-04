import axios from 'axios';
import https from 'https';
import Q from 'q';

import CaseApi from './api/cases.js';
import TaskApi from './api/tasks.js';
import ObservableApi from './api/observables.js';
import AlertApi from './api/alerts.js';
import CortexApi from './api/cortex.js';

export default class Client {
  constructor(url, apiKey, config) {
    var options = {};

    if (config && config.skipSsl) {
      options.httpsAgent = new https.Agent({
        rejectUnauthorized: false
      });
    }

    this.api = axios.create(
      Object.assign(
        {
          baseURL: url,
          headers: {
            'X-Application': 'thehive.js'
          }
        },
        options
      )
    );

    // TODO handle proxy configuration
    this.api.defaults.headers.common['Authorization'] = 'Bearer ' + apiKey;
    this.api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    this.api.interceptors.response.use(
      config => config,
      error => {
        console.log(`${error}`);
        return Q.reject(error);
      }
    );

    this.case = new CaseApi(this);
    this.task = new TaskApi(this);
    this.observable = new ObservableApi(this);
    this.alert = new AlertApi(this);
    this.cortex = new CortexApi(this);
  }
}
