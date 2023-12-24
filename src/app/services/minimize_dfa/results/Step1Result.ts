import FaModel from 'app/models/FaModel';

// class for step 1 result
class Step1Result {
  removedStates: string[];
  accessibleStates: string[];
  newFA: FaModel;
  /**
   *
   * @param removedStates
   * @param accessibleStates
   * @param newFA
   */
  constructor(
    removedStates: string[],
    accessibleStates: string[],
    newFA: FaModel,
  ) {
    this.removedStates = removedStates;
    this.accessibleStates = accessibleStates;
    this.newFA = newFA;
  }
}

export default Step1Result;
