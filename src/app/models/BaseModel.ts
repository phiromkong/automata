// Define an abstract class called BaseModel
abstract class BaseModel {
  // Declare optional id property of type string
  id?: string;
  // Declare createdAt and updatedAt properties of type string
  createdAt: string;
  updatedAt: string;

  // Define the constructor of the class
    // Parameters:
    // id (optional): a string that represents the unique identifier of the model
    // createdAt (optional): a Date object that represents the creation time of the model
    // updatedAt (optional): a Date object that represents the last update time of the model

    // Function:
    // Initializes the properties of the model with the provided arguments or with default values
  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {

    // Initialize the id property with the id argument
    this.id = id;
    // Get the current date and time in UTC string format
    let now = new Date().toUTCString();
    // Initialize the createdAt property with the createdAt argument if it's provided, otherwise use the current date and time
    this.createdAt = createdAt ? createdAt.toUTCString() : now;
    // Initialize the updatedAt property with the updatedAt argument if it's provided, otherwise use the current date and time
    this.updatedAt = updatedAt ? updatedAt.toUTCString() : now;

    // Return value: 
    // Does not return a value. It's a constructor, its purpose is to initialize the properties of the object when it's created.
  }
}

// Export the BaseModel class
export default BaseModel;
