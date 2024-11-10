import { NextResponse } from 'next/server';
import { connectDatabase, insertDocument,getAllCategory } from '@/services/mongo';

export async function GET(request: Request) {
    try {
        const client = await connectDatabase();

        const documents = await getAllCategory(client, 'category');

        console.log(documents)
        return NextResponse.json({ documents });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch documents' }, { status: 500 });
    }
}