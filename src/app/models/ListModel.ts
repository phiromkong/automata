// Define a generic class ListModel
class ListModel<T> {
  // An array to hold items of type T
  items: T[];

  // A string to hold the key for the next page, if it exists
  nextPageKey?: string;

  // Constructor for the ListModel class
  constructor(items: T[], nextPageKey?: string) {
    // Initialize the items array with the provided items
    this.items = items;

    // Initialize the nextPageKey with the provided key
    this.nextPageKey = nextPageKey;
  }
}

// Export the ListModel class as default
export default ListModel;
