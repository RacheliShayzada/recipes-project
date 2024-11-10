import { NextResponse } from 'next/server';
import { connectDatabase, insertDocument,getAllDocuments } from '@/services/mongo';

export async function GET(request: Request) {
    try {
        const client = await connectDatabase();

        const documents = await getAllDocuments(client, 'recipes');

        console.log(documents)
        return NextResponse.json({ documents });
    } catch (error) {
        // Handle errors
        return NextResponse.json({ message: 'Failed to fetch documents' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newItem = await request.json(); 
        const client = await connectDatabase();
        
        const result = await insertDocument(client, 'recipes', newItem);

        return NextResponse.json({ message: 'Item inserted successfully!', result });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to insert item'}, { status: 500 });
    }
}