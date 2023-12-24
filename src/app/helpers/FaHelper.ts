// Import the FaModel
import FaModel from 'app/models/FaModel';

// Define the FaHelper class
class FaHelper {
  /**
   * Sorts a set of states in ascending order.
   * @param {Set<string>} set - A set of states.
   * @returns {Set<string>} A new set of states, sorted in ascending order.
   */
  static sortStates(set: Set<string>): Set<string> {
    return new Set<string>(Array.from(set).sort());
  }

  /**
   * Removes items from a set where a condition is true.
   * @param {Set<string>} items - A set of items.
   * @param {Function} condition - A condition function.
   * @returns {Set<string>} A new set of items, excluding those for which the condition function returns true.
   */
  static removeWhereSet(items: Set<string>, condition): Set<string> {
    return new Set<string>(FaHelper.removeWhere(Array.from(items), condition));
  }

  /**
   * Removes items from an array where a condition is true.
   * @param {string[]} items - An array of items.
   * @param {Function} condition - A condition function.
   * @returns {string[]} A new array of items, excluding those for which the condition function returns true.
   */
  static removeWhere(items: string[], condition): string[] {
    return items.filter(e => condition(e));
  }

  /**
   * Constructs a string of states.
   * @param {Set<string>} states - A set of states.
   * @returns {string} A string of states, sorted and joined by commas.
   */
  static constructStates(states: Set<string>): string {
    return Array.from(FaHelper.sortStates(states)).join(',');
  }

  /**
   * Finds the next states from a single state in a finite automaton.
   * @param {string} state - A state.
   * @param {FaModel} fa - A finite automaton model.
   * @returns {Set<string>} A set of next states.
   */
  static findNextStateFromSingleState(state: string, fa: FaModel): Set<string> {
    let states: string[] = [];

    let transitions = fa.transitions![state]!;
    for (let symbol in transitions!) {
      let nextStates = transitions![symbol];
      states.push(...nextStates);
    }

    return new Set<string>(states);
  }

  /**
   * Finds the next states from a set of states in a finite automaton.
   * @param {Set<string>} states - A set of states.
   * @param {FaModel} fa - A finite automaton model.
   * @returns {Set<string>} A set of next states.
   */
  static findNextStates(states: Set<string>, fa: FaModel): Set<string> {
    let nextStates = new Set<string>();

    for (const state of Array.from(states)) {
      let _next = FaHelper.findNextStateFromSingleState(state, fa);
      for (const states of Array.from(_next)) {
        nextStates.add(states);
      }
    }

    return nextStates;
  }
}

// Export the FaHelper class
export default FaHelper;
