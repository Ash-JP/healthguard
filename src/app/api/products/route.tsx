import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/products.json');
    const data = await fs.readFile(filePath, 'utf8');
    const products = JSON.parse(data);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error reading products database:', error);
    return NextResponse.json({ error: 'Failed to load products database' }, { status: 500 });
  }
}
