/**
 * The absctract class of a Cortex analyzer
 */
export default class Analyzer {
  contructor() {}

  summary() {
    return {};
  }

  error(message) {
    return {success: false, errorMessage: message};
  }

  report(data) {
    return {success: true, summary: this.summary(data), artifacts: [], full: data};
  }
}
