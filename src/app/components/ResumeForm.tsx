'use client';
import { useState, FormEvent } from 'react';
import { generateResume } from '../lib/groq';

export default function ResumeForm() {
  const [resumeData, setResumeData] = useState({
    name: '',
    jobTitle: '',
    skills: [''],
    experience: ['']
  });

  const handleInputChange = (
    field: keyof typeof resumeData, 
    index: number, 
    value: string
  ) => {
    const newData = {...resumeData};
    
    if (field === 'skills' || field === 'experience') {
      newData[field][index] = value;
    } else {
      newData[field as 'name' | 'jobTitle'] = value;
    }

    setResumeData(newData);
  };

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const generatedResume = await generateResume({
        ...resumeData,
        skills: resumeData.skills.filter(skill => skill.trim() !== ''),
        experience: resumeData.experience.filter(exp => exp.trim() !== '')
      });
      
      // TODO: Handle generated resume (e.g., display or save)
      console.log(generatedResume);
    } catch (error) {
      // TODO: Implement error handling
      console.error('Resume generation failed', error);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={resumeData.name}
        onChange={(e) => handleInputChange('name', 0, e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Job Title"
        value={resumeData.jobTitle}
        onChange={(e) => handleInputChange('jobTitle', 0, e.target.value)}
        className="w-full p-2 border rounded"
      />
      
      {/* Dynamic Skills Input */}
      {resumeData.skills.map((skill, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Skill ${index + 1}`}
          value={skill}
          onChange={(e) => handleInputChange('skills', index, e.target.value)}
          className="w-full p-2 border rounded"
        />
      ))}
      
      {/* Dynamic Experience Input */}
      {resumeData.experience.map((exp, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Experience ${index + 1}`}
          value={exp}
          onChange={(e) => handleInputChange('experience', index, e.target.value)}
          className="w-full p-2 border rounded"
        />
      ))}
      
      <button 
        type="submit" 
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Generate Resume
      </button>
    </form>
  );
}