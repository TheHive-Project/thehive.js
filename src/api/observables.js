import Search from '../search.js';
import AbstractApi from './abstract.js';

export default class ObservableApi extends AbstractApi {
  constructor(client) {
    super(client);
  }

  async findOneBy(query) {
    return await super.findOneBy('/api/case/artifact/_search', query);
  }

  async find(query, sort, range) {
    return await super.find('/api/case/artifact/_search', query, sort, range);
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
}
