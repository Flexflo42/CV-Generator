// lib/groq.ts
import Groq from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY 
});

// Interface for Resume Data
interface ResumeData {
  name: string;
  jobTitle: string;
  skills: string[];
  experience: string[];
  education?: string[];
}

// Generate Resume Function
export async function generateResume(data: ResumeData) {
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
      model: 'llama-3.3-70b-versatile', // Choose an appropriate model
      max_tokens: 1024,
      temperature: 0.7
    });

    return chatCompletion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating resume:', error);
    throw error;
  }
}

// List Available Models
export async function listGroqModels() {
  try {
    const models = await groq.models.list();
    return models;
  } catch (error) {
    console.error('Error listing models:', error);
    return [];
  }
}