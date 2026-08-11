import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are mandatory.' },
        { status: 400 }
      );
    }

    // Server-side logging of B2B submission
    console.log('Next.js B2B Contact Form submission received:', { name, email, subject, message });

    return NextResponse.json({
      success: true,
      message: 'Thank you. Your inquiry has been logged successfully on the Next.js backend.'
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
