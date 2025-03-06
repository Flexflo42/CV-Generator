// app/api/generate-resume/route.ts
import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize Groq client on the server
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional resume writer. Create a concise, ATS-friendly resume.'
        },
        {
          role: 'user',
          content: `Generate a professional resume with the following details:
            Name: ${data.name}
            Job Title: ${data.jobTitle}
            Skills: ${data.skills.join(', ')}
            Experience: ${data.experience.join('; ')}
            
            Guidelines:
            - Use a clean, professional format
            - Highlight key achievements
            - Optimize for Applicant Tracking Systems (ATS)
            - Keep it concise and impactful`
        }
      ],
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      temperature: 0.7
    });

    return NextResponse.json({ content: chatCompletion.choices[0]?.message?.content || '' });
  } catch (error) {
    console.error('Error generating resume:', error);
    return NextResponse.json({ error: 'Failed to generate resume' }, { status: 500 });
  }
}