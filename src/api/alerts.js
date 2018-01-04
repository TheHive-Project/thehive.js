import Search from '../search.js';
import AbstractApi from './abstract.js';

export default class AlertApi extends AbstractApi {
  constructor(client) {
    super(client);
  }

  async findOneBy(query) {
    return await super.findOneBy('/api/alert/_search', query);
  }

  async find(query, sort, range) {
    return await super.find('/api/alert/_search', query, sort, range);
  }

  async byId(id) {
    return await this.findOneBy(Search.id(id));
  }

  async ofCase(id, query) {
    var parentExpr = Search.parentId('case', id);

    if (query) {
      return await this.find(Search.and([parentExpr, query]));
    }
    return await this.find(parentExpr);
  }

  async create() {
    // TODO not implemented yet
  }

  async createCase(id, template) {
    const response = await this.api.post(`/api/alert/${id}/createCase`, template ? { caseTemplate: template } : {});

    return response.data;
  }

  async update(id, alert) {
    const response = await this.api.patch(`/api/alert/${id}`);

    return response.data;
  }

  async bulkUpdate(query, updates) {
    const alerts = await this.find(query);
    const ids = alerts.map(alert => alert.id);
    const response = await this.api.patch('/api/alert/_bulk', Object.assign({ ids: ids }, updates));

    return response.data;
  }

  async markAsRead(id) {
    const response = await this.api.post(`/api/alert/${id}/markAsRead`);

    return response.data;
  }

  async markAsUnread(id) {
    const response = await this.api.post(`/api/alert/${id}/markAsUnread`);

    return response.data;
  }

  async follow(id) {
    const response = await this.api.post(`/api/alert/${id}/follow`);

    return response.data;
  }

  async unfollow(id) {
    const response = await this.api.post(`/api/alert/${id}/unfollow`);

    return response.data;
  }
}
