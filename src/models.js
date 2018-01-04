import _ from 'lodash';

export class CustomFieldBuilder {
  constructor() {
    this.fields = {};
  }

  add(type, name, value) {
    var order = _.keys(this.fields).length;

    this.fields[name] = {
      [type]: value,
      order: order
    };
  }

  addDate(name, value) {
    this.add('date', name, value);
    return this;
  }
  addNumber(name, value) {
    this.add('number', name, value);
    return this;
  }
  addString(name, value) {
    this.add('string', name, value);
    return this;
  }
  addBoolean(name, value) {
    this.add('boolean', name, value);
    return this;
  }
  build() {
    return this.fields;
  }
}

export class Task {
  constructor(properties) {
    var defaults = {
      title: null,
      status: 'Waiting',
      flag: false,
      description: null,
      owner: null,
      startDate: null
    };

    Object.assign(this, properties, defaults);
  }
}

export class TaskLog {
  constructor(properties) {
    var defaults = {
      message: null,
      file: null
    };

    Object.assign(this, properties, defaults);
  }
}

export class Case {
  constructor(properties) {
    var defaults = {
      title: null,
      description: null,
      tlp: 2,
      severity: 2,
      flag: false,
      tags: [],
      metrics: {},
      tasks: [],
      startDate: new Date().valueOf(),
      customFields: {}
    };

    Object.assign(this, properties, defaults);

    if (properties.tasks) {
      this.tasks = properties.tasks.map(t => new Task(t));
    }
  }
}

export class CaseTemplate {
  constructor(properties) {
    var defaults = {
      name: null,
      titlePrefix: null,
      description: null,
      severity: 2,
      flag: false,
      tlp: 2,
      tags: [],
      metricNames: [],
      tasks: []
    };

    Object.assign(this, properties, defaults);

    if (properties.tasks) {
      this.tasks = properties.tasks.map(t => new Task(t));
    }
  }
}

export class Alert {
  constructor(properties) {
    var defaults = {
      title: null,
      description: null,
      source: null,
      sourceRef: null,
      type: null,
      tlp: 2,
      severity: 2,
      tags: [],
      follow: false,
      status: 'New',
      date: new Date().valueOf(),
      artifacts: [],
      caseTemplate: null
    };

    Object.assign(this, properties, defaults);
  }
}
