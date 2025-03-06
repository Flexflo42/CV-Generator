// app/generator/page.tsx
//import ResumeForm from '@/components/ResumeForm';
// src/app/generator/page.tsx
import ResumeForm from '../components/ResumeForm';

export default function GeneratorPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Generator</h1>
      <ResumeForm />
    </div>
  )
}