// Importing the FaModel
import FaModel from '../../../models/FaModel';

// Importing Firestore database and FirestoreDataConverter from Firebase Firestore
import db, { FirestoreDataConverter, Timestamp } from 'firebase/firestore';

// Defining a FirestoreDataConverter for FaModel
export const faModelConverter: FirestoreDataConverter<FaModel> = {

  // Method to convert a FaModel object to Firestore document data
  toFirestore(faModel: FaModel): db.DocumentData {
    return {
      states: faModel.states,
      symbols: faModel.symbols,
      start_state: faModel.startState,
      final_states: faModel.endStates,
      transitions: faModel.transitions,
      created_at: faModel.createdAt,
      updated_at: faModel.updatedAt,
      title: faModel.title,
    };
  },

  // Method to convert Firestore document data to a FaModel object
  fromFirestore(
    snapshot: db.QueryDocumentSnapshot,
    options: db.SnapshotOptions,
  ): FaModel {
    // Getting the document data from the snapshot
    const data = snapshot.data(options);

    // Creating a new FaModel object with the document data
    let faModel = new FaModel(
      data.states,
      data.symbols,
      data.start_state,
      data.final_states,
      data.transitions,
      undefined,
      undefined,
      data.title,
      snapshot.id,
    );

    // Setting the createdAt, updatedAt, title, and id properties of the FaModel object
    faModel.createdAt = data.created_at;
    faModel.updatedAt = data.updated_at;
    faModel.title = data.title;
    faModel.id = snapshot.id;

    // Returning the FaModel object
    return faModel;
  },
};
