import FaModel from '../../../models/FaModel';
import Step1Result from '../results/Step1Result';
import FirstIteration from './FirstIteration';
import NextIteration from './NextIteration';
import Step2Result from '../results/Step2Result';

// Merge equal states
class Step2MinimizeDfa {
  fa: FaModel;
  firstIteration: FirstIteration;
  nextIteration: NextIteration;
  /**
   *
   * @param step1
   */
  constructor(step1: Step1Result) {
    this.fa = Object.assign({}, step1.newFA);
    this.firstIteration = new FirstIteration(this.fa);
    this.nextIteration = new NextIteration(this.fa);
  }
  /**
   *
   * @returns
   */
  exec(): Step2Result {
    this.firstIteration.exec();
    this.nextIteration.exec(
      this.firstIteration.markedSets,
      this.firstIteration.statesSets,
    );
    // return the result
    return new Step2Result(
      Array.from(this.firstIteration.markedSets),
      Array.from(this.nextIteration.nextMarkedSets),
      Array.from(this.nextIteration.mergedEqualStates),
    );
  }
}

export default Step2MinimizeDfa;
