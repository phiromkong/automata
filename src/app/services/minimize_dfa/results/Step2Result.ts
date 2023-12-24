// class for step 2 result
class Step2Result {
  markedSets1stItr: string[];
  markedSets2ndItr: string[];
  mergedEqualStates: string[];

  /**
   *
   * @param markedSets1stItr
   * @param markedSets2ndItr
   * @param mergedEqualStates
   */
  constructor(
    markedSets1stItr: string[],
    markedSets2ndItr: string[],
    mergedEqualStates: string[],
  ) {
    this.markedSets1stItr = markedSets1stItr;
    this.markedSets2ndItr = markedSets2ndItr;
    this.mergedEqualStates = mergedEqualStates;
  }
}

export default Step2Result;
