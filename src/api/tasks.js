import Search from '../search.js';
import AbstractApi from './abstract.js';

export default class TaskApi extends AbstractApi {
  constructor(client) {
    super(client);
  }

  async findOneBy(query) {
    return await super.findOneBy('/api/case/task/_search', query);
  }

  async find(query, sort, range) {
    return super.find('/api/case/task/_search', query, sort, range);
  }

  async byId(id) {
    return await this.findOneBy(Search.id(id));
  }

  async ofCase(caseId, query) {
    var parentExpr = Search.parentId('case', caseId);

    if (query) {
      return await this.find(Search.and([parentExpr, query]));
    }
    return await this.find(parentExpr);
  }

  async create(caseId, task) {
    // TODO not implemented yet
  }

  async logs(id) {
    // TODO not implemented yet
  }

  async addLog() {
    // TODO not implemented yet
  }
}
