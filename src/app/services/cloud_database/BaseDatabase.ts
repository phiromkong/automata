// Importing FirebaseConfig, Firestore, ListModel, and BaseModel
import FirebaseConfig from './FirebaseConfig';
import * as db from 'firebase/firestore';
import ListModel from 'app/models/ListModel';
import BaseModel from 'app/models/BaseModel';

// Defining a type for order by fields
export declare type OrderByFields = 'title' | 'created_at' | 'updated_at';

// Defining an abstract class BaseDatabase that works with any object that extends BaseModel
abstract class BaseDatabase<T extends BaseModel> {
  // Static Firestore instance
  static instance: db.Firestore;

  // Page size for pagination
  pageSize: number = 5;

  // Constructor
  constructor() {
    // Initializing the Firestore instance if it's not already initialized
    BaseDatabase.instance ??= db.getFirestore(FirebaseConfig.instance);
  }

  // Abstract methods to be implemented by subclasses
  abstract collectionName(): string;
  abstract objectConverter(): db.FirestoreDataConverter<T>;

  // Method to fetch all documents from a collection with pagination and optional queries and order by
  async fetchAll(
    nextPageKey?: string,
    queries?: db.QueryConstraint[],
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): Promise<ListModel<T>> {
    // Constructing the query options
    const queryOptions = this.constructQueryOptions(
      nextPageKey,
      queries,
      orderBy,
      orderByDirection,
    );

    // Getting the collection reference
    const reference = this.collectionReference();

    // Fetching the documents
    const result = await db.getDocs(db.query(reference, ...queryOptions));

    // Converting the documents to objects of type T
    let items = new Array<T>();
    for (const document of result.docs) {
      let element = document.data();
      items.push(element);
    }

    // Setting the next page key
    if (items.length >= this.pageSize) {
      nextPageKey = this.buildNextPageKey(items[items.length - 1], orderBy);
    } else {
      nextPageKey = undefined;
    }

    // Returning a ListModel object with the items and the next page key
    return new ListModel(items, nextPageKey);
  }

  // Abstract method to build the next page key
  abstract buildNextPageKey(
    lastItem: T,
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): string;

  // Method to fetch a single document by id
  async fetchOne(id: string): Promise<T | undefined> {
    const result = await db.getDoc(this.documentReference(id));
    return result.data();
  }

  // Method to create a new document
  async create(data: T): Promise<T | undefined> {
    const reference = this.collectionReference();
    const result = await db.addDoc(reference, data);
    return this.fetchOne(result.id);
  }

  // Method to update a document
  async update(id: string, data: T): Promise<T | undefined> {
    const reference = this.documentReference(id);
    await db.setDoc(reference, data);
    return this.fetchOne(id);
  }

  // Method to delete a document
  async delete(id: string): Promise<void> {
    const reference = this.documentReference(id);
    return await db.deleteDoc(reference);
  }

  // Method to get the path of a document
  documentPath(documentId: string): string {
    return this.collectionName() + '/' + documentId;
  }

  // Method to get a document reference
  documentReference(documentId: string): db.DocumentReference<T> {
    const reference = db
      .doc(BaseDatabase.instance, this.documentPath(documentId))
      .withConverter<T>(this.objectConverter());
    return reference;
  }

  // Method to get a collection reference
  collectionReference(): db.CollectionReference<T> {
    const reference = db
      .collection(BaseDatabase.instance, this.collectionName())
      .withConverter<T>(this.objectConverter());
    return reference;
  }

  // Method to construct the query options for fetchAll
  constructQueryOptions(
    nextPageKey?: string,
    queries?: db.QueryConstraint[],
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): db.QueryConstraint[] {
    const queryOptions = new Array<db.QueryConstraint>();

    const fieldPath = orderBy || 'created_at';
    const directionStr = orderByDirection || 'asc';

    queryOptions.push(db.orderBy(fieldPath, directionStr));
    queryOptions.push(db.limit(this.pageSize));

    if (nextPageKey) {
      queryOptions.push(db.startAfter(nextPageKey));
    }

    if (queries) {
      for (const query of queries) {
        queryOptions.push(query);
      }
    }

    return queryOptions;
  }
}

// Exporting the BaseDatabase class
export default BaseDatabase;
