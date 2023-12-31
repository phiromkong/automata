import FaHelper from '../../../helpers/FaHelper';
import FaModel from '../../../models/FaModel';
// first iteration class for step 2
class FirstIteration {
  fa: FaModel;
  markedSets: Set<string>;
  statesSets: Set<string>;
  // constructor of this class
  /**
   *
   * @param fa
   */
  constructor(fa: FaModel) {
    this.fa = fa;
    this.markedSets = new Set<string>();
    this.statesSets = new Set<string>();
  }
  /**
   *
   * @param state
   * @returns
   */
  allInFinalState(state: Set<string>): boolean {
    let length = Array.from(state).filter(e =>
      this.fa.endStates.includes(e),
    ).length;
    return length === state.size;
  }
  /**
   *
   */
  exec() {
    this.markedSets.clear();
    this.statesSets.clear();
    // loop for exec
    for (const stateR of this.fa.states) {
      for (const stateC of this.fa.states) {
        if (stateR !== stateC) {
          let sets = new Set<string>([stateC, stateR]);
          let states = FaHelper.constructStates(sets);
          this.statesSets.add(states);

          for (const fstate of this.fa.endStates) {
            if (sets.has(fstate)) {
              if (!this.allInFinalState(sets)) {
                this.markedSets.add(states);
              }
            }
          }
        }
      }
    }
  }
}

export default FirstIteration;
