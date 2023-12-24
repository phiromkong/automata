import FaModel from 'app/models/FaModel';
// class for step 3 result
class Step3Result {
  newFA: FaModel;
  /**
   *
   * @param newFA
   */

  constructor(newFA: FaModel) {
    this.newFA = newFA;
  }
}

export default Step3Result;
