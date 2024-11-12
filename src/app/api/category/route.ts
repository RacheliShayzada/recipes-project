import { NextResponse } from 'next/server';
import { connectDatabase, getAllCategory, insertDocuments } from '@/services/mongo';
import { Category } from "@/types/types";

export async function GET(request: Request) {
    try {
        const client = await connectDatabase();

        const documents = await getAllCategory(client, 'category');
        return NextResponse.json({ documents });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch documents' }, { status: 500 });
    }
}

export async function POST(request: Request, { params }: any) {
    try {
        const { localCategories } = params;
        const client = await connectDatabase();
        const documents = await insertDocuments(client, 'category', localCategories);
        return NextResponse.json({ documents });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to fetch documents' }, { status: 500 });
    }
}