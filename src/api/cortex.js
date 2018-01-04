export default class CortexApi {
  constructor(client) {
    this.api = client.api;
  }

  async analyzers() {
    const response = await this.api.post('/api/connector/cortex/analyzer');

    return response.data;
  }

  async run(cortexId, artifactId, analyzerId) {
    const body = { cortexId, artifactId, analyzerId };
    const response = await this.api.post('/api/connector/cortex/job', body);

    return response.data;
  }
}
