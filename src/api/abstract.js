export default class AbstractApi {
  constructor(client) {
    this.client = client;
    this.api = client.api;
  }

  async findOneBy(url, query) {
    const response = await this.api.post(url, {
      query: query,
      range: '0-1'
    });

    return response.data[0];
  }

  async find(url, query, sort, range) {
    const response = await this.api.post(url, {
      query: query,
      range: range || 'all',
      sort: sort || []
    });

    return response.data;
  }
}
