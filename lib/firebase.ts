import firebase from 'firebase-admin';

import * as fs from 'fs';
import * as path from 'path';
import { Firestore } from '@google-cloud/firestore';

const getCredentials = () => {
  const serviceAccountFilepath = path.join(process.cwd(), '.firebase/credentials.json');

  if (fs.existsSync(serviceAccountFilepath)) {
    const serviceAccountFile = fs.readFileSync(serviceAccountFilepath, {
      encoding: 'utf8'
    });

    return JSON.parse(serviceAccountFile);
  }

  const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (serviceAccountEnv) {
    return JSON.parse(serviceAccountEnv);
  }

  return null;
};

const initFirestore = (): Firestore => {
  if (firebase.apps.length === 0) {
    const credentials = getCredentials();
    if (!credentials) {
      throw new Error('Firebase authentication details not provided.');
    }

    firebase.initializeApp({
      credential: firebase.credential.cert(credentials)
    });

    const db = firebase.app().firestore();
    db.settings({ ignoreUndefinedProperties: false });

    return db;
  }

  return firebase.app().firestore();
};

class Firebase {
  db: Firestore;

  constructor() {
    this.db = initFirestore();
  }
}

const firebaseInstance = new Firebase();
export default firebaseInstance;
