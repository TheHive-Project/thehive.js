import Hapi from 'hapi';
import EventEmitter from 'events';
import _ from 'lodash';

export default class Webhook {
  constructor(config) {
    this.config = config || {};

    this.host = this.config.host || '0.0.0.0';
    this.port = this.config.port || '3333';
    this.path = this.config.path || '/webhook';
    this.eventEmitter = new EventEmitter();
  }

  start() {
    // Create a server with a host and port
    this.server = new Hapi.Server();
    this.server.connection({
      host: this.host,
      port: this.port
    });

    // Add the route
    this.server.route({
      method: 'POST',
      path: this.path,
      handler: (request, reply) => {
        let eventName = _.camelCase(`on ${request.payload.object._type} ${request.payload.operation}`);

        this.eventEmitter.emit(eventName, request.payload.object, request.payload);

        return reply(request.payload);
      }
    });

    // Start the server
    this.server.start(err => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', this.server.info.uri);
    });
  }
  on(eventName, callback) {
    this.eventEmitter.addListener(eventName, callback);
  }
  off(eventName) {
    this.eventEmitter.removeListener(eventName);
  }
}
