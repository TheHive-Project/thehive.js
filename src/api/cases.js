import Search from '../search.js';
import AbstractApi from './abstract.js';

export default class CaseApi extends AbstractApi {
  constructor(client) {
    super(client);
  }

  async findOneBy(query) {
    return await super.findOneBy('/api/case/_search', query);
  }

  async find(query, sort, range) {
    return super.find('/api/case/_search', query, sort, range);
  }

  async byId(id) {
    return await this.findOneBy(Search.id(id));
  }

  async byNumber(number) {
    return await this.findOneBy(Search.eq('caseId', number));
  }

  async create(caze) {
    const response = await this.api.post('/api/case', caze);

    return response.data;
  }

  async tasks(id, query) {
    return await this.client.task.ofCase(id, query);
  }

  async addTask(id, task) {
    return await this.client.task.create(id, task);
  }

  async observables(id, query) {
    return await this.client.observable.ofCase(id, query);
  }

  async addObservable(id, observable) {
    return await this.client.observable.create(id, observable);
  }

  async links(id) {
    const links = await this.api.get(`/api/case/${id}/links`);

    return links.data;
  }

  async havingObservable(caseQuery, query) {
    const childExpr = Search.child('case_artifact', query);
    const criteria = caseQuery ? Search.and([caseQuery, childExpr]) : childExpr;

    return await this.find(criteria, [], 'all');
  }
}
