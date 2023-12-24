// Importing the FaModel
import FaModel from 'app/models/FaModel';

// Importing the BaseCacheService
import BaseCacheService from './BaseCacheService';

// Defining a class FaCacheService that extends BaseCacheService with FaModel as the type
class FaCacheService extends BaseCacheService<FaModel> {

  // Overriding the jsonDecode method from BaseCacheService
  // This method takes a JSON string, parses it, and returns a FaModel object
  jsonDecode(json: string): FaModel {
    let result = JSON.parse(json);

    // Creating a new FaModel object with the parsed data
    let faModel = new FaModel(
      result.states,
      result.symbols,
      result.start_state,
      result.final_states,
      result.transitions,
      undefined,
      undefined,
      result.title,
      result.id,
    );

    // Setting the createdAt, updatedAt, and title properties of the FaModel object
    faModel.createdAt = result.created_at;
    faModel.updatedAt = result.updated_at;
    faModel.title = result.title;

    // Returning the FaModel object
    return faModel;
  }

  // Overriding the jsonEncode method from BaseCacheService
  // This method takes a FaModel object and returns a JSON string
  jsonEncode(item: FaModel): string {
    return JSON.stringify({
      id: item.id,
      states: item.states,
      symbols: item.symbols,
      start_state: item.startState,
      final_states: item.endStates,
      transitions: item.transitions,
      created_at: item.createdAt,
      updated_at: item.updatedAt,
      title: item.title,
    });
  }
}

// Exporting the FaCacheService class
export default FaCacheService;
