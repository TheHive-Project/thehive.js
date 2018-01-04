/**
 * Search build class
 */
export default {
  eq: function (field, value) {
    return {
      _field: field,
      _value: value
    };
  },
  ne: function (field, value) {
    return {
      _not: {
        _field: field,
        _value: value
      }
    };
  },
  gt: function (field, value) {
    return { _gt: { field: value } };
  },

  gte: function (field, value) {
    return { _gte: { field: value } };
  },

  lt: function (field, value) {
    return { _lt: { field: value } };
  },

  lte: function (field, value) {
    return { _lte: { field: value } };
  },

  not: function (expr) {
    return { _not: expr };
  },

  and: function (exprs) {
    return { _and: exprs };
  },

  or: function (exprs) {
    return { _or: exprs };
  },
  in: function (field, values) {
    return { _in: { _field: field, _values: values } };
  },

  contains: function (field) {
    return { _contains: field };
  },

  id: function (id) {
    return { _id: id };
  },

  between: function (field, from, to) {
    return { _between: { _from: from, _to: to } };
  },

  parentId: function (type, id) {
    return { _parent: { _type: type, _id: id } };
  },

  parent: function (type, criterion) {
    return { _parent: { _type: type, _query: criterion } };
  },

  child: function (type, criterion) {
    return { _child: { _type: type, _query: criterion } };
  },

  type: function (type) {
    return { _type: type };
  },

  string: function (queryString) {
    return { _string: queryString };
  }
};
