import { connectDatabase,getDocumentsByIds } from '@/services/mongo';
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function POST(request: Request) {
    try {
        const { ids } = await request.json();
        console.log(ids,"POST request");
        const objectIds = ids.map((id: string) => new ObjectId(id));
        const client = await connectDatabase();
        const documents = await getDocumentsByIds(client, 'recipes', objectIds);
        return NextResponse.json({ documents });
    } catch (error) {
        console.error('Error fetching documents:', error);
        return NextResponse.json({ message: 'Failed to fetch documents' }, { status: 500 });
    }
}
