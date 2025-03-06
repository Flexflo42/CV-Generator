// app/generator/page.tsx
//import ResumeForm from '@/components/ResumeForm';
// src/app/generator/page.tsx
import ResumeForm from '../components/ResumeForm';

export default function GeneratorPage() {
  return (
    <div className="container mx-auto p-4">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-4">
          Build Your Professional Resume
        </h1>
        <p className="text-lg text-orange-600">
          Create a clean and effective resume in minutes with our simple, free resume generator.
          Just enter your details, and we'll handle the rest!
        </p>
      </section>
      <ResumeForm />
    </div>
  )
}
