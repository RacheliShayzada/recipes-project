import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';


let client: MongoClient;
let clientPromise: Promise<MongoClient>;


export async function connectDatabase() {
   if (!client) {
       const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
       if (!dbConnectionString) {
           throw new Error('Database connection string is not defined');
       }
       client = new MongoClient(dbConnectionString);
       clientPromise = client.connect();
   }
   return clientPromise;
}



export async function insertDocument(client: any, collection: string, document: object) {
   const db = client.db('mini_project');
   const result = await db.collection(collection).insertOne(document);
   return result;
}


export async function getAllDocuments(client: any, collection: string) {
   const db = client.db('mini_project');
   const documents = await db.collection(collection).find().toArray();
   return documents;
}




