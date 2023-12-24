// Importing the BaseModel
import BaseModel from 'app/models/BaseModel';

// Defining an abstract class BaseCacheService that works with any object that extends BaseModel
abstract class BaseCacheService<T extends BaseModel> {
  // Abstract method to decode a JSON string to an object of type T
  abstract jsonDecode(json: string): T;

  // Abstract method to encode an object of type T to a JSON string
  abstract jsonEncode(item: T): string;

  // Method to get an item from local storage by its id
  get(id: string): T | undefined {
    let result = localStorage.getItem(id);
    if (result) {
      // If the item exists, decode it from JSON and return it
      return this.jsonDecode(result);
    }
  }

  // Method to set an item in local storage
  set(item: T): T | undefined {
    // The item is stored with its id or createdAt as the key, and the JSON-encoded item as the value
    localStorage.setItem(item.id ?? item.createdAt, this.jsonEncode(item));
    // The method then retrieves the item from local storage and returns it
    return this.get(item.id ?? item.createdAt);
  }

  // Method to set multiple items in local storage
  setAll(datas: T[]) {
    // For each item in the provided array, set it in local storage
    for (const item of datas) {
      this.set(item);
    }
  }
}

// Exporting the BaseCacheService class
export default BaseCacheService;
