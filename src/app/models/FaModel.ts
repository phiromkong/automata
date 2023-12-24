// Import the BaseModel class
import BaseModel from './BaseModel';

// Define an interface for the transitions
interface Transitions {
  [k: string]: {
    [k: string]: string[];
  };
}

// Define a class called FaModel that extends the BaseModel class
class FaModel extends BaseModel {
  // Declare properties of the class
  states: string[];
  symbols: string[];
  startState: string;
  endStates: string[];
  transitions: Transitions;
  title?: string;

  // Define the constructor of the class
  constructor(
    states: string[],
    symbols: string[],
    startState: string,
    endStates: string[],
    transitions: Transitions,
    createdAt?: Date,
    updatedAt?: Date,
    title?: string,
    id?: string,
  ) {
    // Call the constructor of the parent class
    super(id, createdAt, updatedAt);
    // Initialize the properties of the class with the provided arguments
    this.states = states;
    this.symbols = symbols;
    this.startState = startState;
    this.endStates = endStates;
    this.title = title;
    this.transitions = this.validateTransition(states, transitions);
  }

  // Define a method that creates a copy of the current object with the provided arguments or with the current values
    // Parameters:
    // states, symbols, startState, endStates, transitions: the new values for the corresponding properties
    // createdAt, updatedAt, title, id (optional): the new values for the corresponding properties

    // Function:
    // Creates a copy of the current object with the provided arguments or with the current values

    // Return value:
    // A new FaModel object with the updated properties
  copyWith(
    states: string[],
    symbols: string[],
    startState: string,
    endStates: string[],
    transitions: Transitions,
    createdAt?: Date,
    updatedAt?: Date,
    title?: string,
    id?: string,
  ): FaModel {
    this.id = id || this.id;
    this.createdAt = createdAt ? createdAt.toUTCString() : this.createdAt;
    this.updatedAt = updatedAt ? updatedAt.toUTCString() : this.updatedAt;
    this.states = states || this.states;
    this.symbols = symbols || this.symbols;
    this.startState = startState || this.startState;
    this.endStates = endStates || this.endStates;
    this.title = title || this.title;
    this.transitions = transitions || this.transitions;
    return this;
  }

  // Define a method that validates the transitions
    // Parameters:
    // states: the states of the FA
    // transitions: the transitions of the FA

    // Function:
    // Validates the transitions

    // Return value:
    // The validated transitions
  validateTransition(states: string[], transitions: Transitions): Transitions {

    let validatedTransition: Transitions = {};

    for (const state in transitions) {
      if (states.includes(state)) {
        validatedTransition[state] = {};
        if (!transitions[state]) {
          for (const symbol in transitions[state]) {
            validatedTransition[state][symbol] = [];
          }
        } else {
          for (const symbol in transitions[state]) {
            if (!transitions[state][symbol]) {
              transitions[state][symbol] = [];
            }
            validatedTransition[state][symbol] = transitions[state][symbol];
          }
        }
      }

      for (const symbol in transitions[state]) {
        if (validatedTransition[state] && validatedTransition[state][symbol]) {
          validatedTransition[state][symbol] = validatedTransition[state][
            symbol
          ].filter(e => e !== '');
        }
      }
    }

    this.transitions = validatedTransition;
    return validatedTransition;
  }

  // Define a method that checks if the current object is a NFA
    // Parameters:
    // None

    // Function:
    // Checks if the current object is a NFA

    // Return value:
    // A boolean value that indicates if the current object is a NFA
  isNFA(): Boolean {
    const transitions = this.transitions;
    let isNfa = false;
    if (this.symbols.includes('E')) return true;
    for (const state in transitions) {
      for (const symbol in transitions[state]) {
        const symbolTransition = transitions[state][symbol];
        if (symbolTransition.length !== 1) isNfa = true;
      }
    }
    return isNfa ? true : false;
  }

    // Define a method that tests if a string is accepted by a DFA
      // Parameters:
      // targetString: the string to test
  
      // Function:
      // Tests if a string is accepted by a DFA
  
      // Return value:
      // A boolean value that indicates if the string is accepted by the DFA
    stringAcceptedByDFA(targetString) {
    let nextTransition;
    targetString.split('').every((symbol, index) => {
      if (!this.symbols.includes(symbol)) {
        nextTransition = '';
        return false;
      }
      if (index === 0) {
        nextTransition = this.transitions[this.startState][symbol][0];
        console.log(symbol, 'x', this.startState, '->', nextTransition);
      } else {
        nextTransition = this.transitions[nextTransition][symbol][0];
        console.log(
          symbol,
          'x',
          this.transitions[nextTransition][symbol][0],
          '->',
          nextTransition,
        );
      }
      return true;
    });

    if (this.endStates.includes(nextTransition)) return true;
    else return false;
  }

    // Define a method that tests if a string is accepted by a NFA
  findAllStates = (
    targetString, // The string to test
    transitions, // The transitions of the NFA
    startStates = this.startState, // The start state of the NFA
    result: any = [], // The result array to store the possible final states
  ) => {
    let state = startStates;

    // Loop each character of target String
    targetString.split('').every((input, indexString) => {
      // If the input symbol is not in the alphabet, stop processing
      if (!this.symbols.includes(input)) {
        state = '';
        result = [];
        return false;
      }
      // If the current state has an epsilon transition, recursively process the remaining string for each possible transition
      if (transitions[state]['E'] && transitions[state]['E'].length !== 0) {
        transitions[state]['E'].forEach((transition, index) => {
          this.findAllStates(
            targetString.slice(indexString),
            transitions,
            transitions[state]['E'][index],
            result,
          );
        });
      }

      // If there are multiple transitions for the current input symbol, recursively process the remaining string for each possible transition
      if (transitions[state][input].length > 1) {
        transitions[state][input].forEach((transition, index) => {
          this.findAllStates(
            targetString.slice(indexString + 1),
            transitions,
            transitions[state][input][index],
            result,
          );
        });

        state = '';
        return false; // break loop
      } else if (transitions[state][input].length === 0) {
        // If there's no transition, stop processing
        return false; // break loop
      } else {
        // If there's exactly one transition, move to the next state and continue processing
        const nextState = transitions[state][input][0];
        state = nextState;
        return true; // continue
      }
    });

    // If the string has been completely processed, add the current state to the result
    if (state) result.push(state);

    // Return all possible final states
    return result;
  };

  // Define a method that tests if a string is accepted by a NFA
  stringAcceptedByNFA = targetString => {
    // Find all possible final states for the given string
    const possibleState = this.findAllStates(
      targetString,
      this.transitions,
      this.startState,
    );
    // Check if any of the possible final states is an accepting state
    const found = this.endStates.find(val => {
      if (possibleState.includes(val)) {
        return true;
      }
    });
    // If an accepting state is found, the string is accepted; otherwise, it is not
    if (found) return true;
    else return false;
  };

  // Define a method that converts the FA to a dot string for visualization
  toDotString = () => {
    let dotStr = 'digraph fsm {\n';
    dotStr += 'rankdir=LR;\n';
    dotStr += 'size="8,5";\n';
    dotStr += 'node [shape = point]; INITIAL_STATE\n';
    dotStr +=
      'node [shape = doublecircle]; ' + this.endStates.join(',') + ';\n';
    dotStr += 'node [shape = circle];\n';
    dotStr += 'INITIAL_STATE -> ' + this.startState + ';\n';

    // Loop through each state and each symbol to add the transitions to the dot string
    for (const state in this.transitions) {
      for (const symbol in this.transitions[state]) {
        if (this.transitions[state][symbol].length > 0) {
          this.transitions[state][symbol].forEach(nextState => {
            if (nextState) {
              dotStr += '' + state + ' -> ';
              dotStr += nextState;
              dotStr +=
                ' ' + '[label=' + (symbol === 'E' ? 'ε' : symbol) + '];\n';
            }
          });
        }
      }
    }

    dotStr += '}';

    // Return the dot string
    return dotStr;
  };
}

export default FaModel;
