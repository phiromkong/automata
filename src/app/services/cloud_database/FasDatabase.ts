// Importing FaModel, ListModel, Firestore, BaseDatabase, OrderByFields, and faModelConverter
import FaModel from 'app/models/FaModel';
import ListModel from 'app/models/ListModel';
import * as db from 'firebase/firestore';
import BaseDatabase, { OrderByFields } from './BaseDatabase';
import { faModelConverter } from './converters/faModelConverter';

// Defining a class FaDatabase that extends BaseDatabase with FaModel
class FaDatabase extends BaseDatabase<FaModel> {
  // Method to get the collection name
  collectionName(): string {
    return 'fas';
  }

  // Method to get the Firestore data converter for FaModel
  objectConverter(): db.FirestoreDataConverter<FaModel> {
    return faModelConverter;
  }

  // Method to fetch all FaModel documents with optional title start with, order by, and order by direction
  async fetchAllFa(
    nextPageKey?: string,
    titleStartWith?: string,
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): Promise<ListModel<FaModel>> {
    // Constructing the query options
    const queryOptions = new Array<db.QueryConstraint>();

    // If titleStartWith is provided, adding where clauses to filter by title
    if (titleStartWith) {
      queryOptions.push(db.where('title', '>=', titleStartWith));
      queryOptions.push(db.where('title', '<=', titleStartWith + '\uf8ff'));
    }

    // Calling the fetchAll method of the superclass with the constructed query options
    return super.fetchAll(nextPageKey, queryOptions, orderBy, orderByDirection);
  }

  // Method to build the next page key based on the last item and the order by field
  buildNextPageKey(
    lastItem: FaModel,
    orderBy?: OrderByFields,
    orderByDirection?: db.OrderByDirection,
  ): string {
    // Switching on the order by field
    switch (orderBy) {
      case 'title':
        // If the order by field is 'title', returning the title of the last item
        return lastItem.title!;
      case 'created_at':
      default:
        // If the order by field is 'created_at' or not provided, returning the createdAt of the last item
        return lastItem.createdAt;
    }
  }
}

// Exporting the FaDatabase class
export default FaDatabase;
