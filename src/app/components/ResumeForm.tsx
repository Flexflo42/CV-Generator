'use client';
import { useState, FormEvent } from 'react';


export default function ResumeForm() {
  const [resumeData, setResumeData] = useState({
    name: '',
    jobTitle: '',
    skills: [''],
    experience: ['']
  });
  
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const addField = (field: 'skills' | 'experience') => {
    setResumeData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleGenerate = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...resumeData,
          skills: resumeData.skills.filter(skill => skill.trim() !== ''),
          experience: resumeData.experience.filter(exp => exp.trim() !== '')
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }
      
      const data = await response.json();
      setGeneratedContent(data.content);
    } catch (error) {
      console.error('Resume generation failed', error);
      setError('Failed to generate resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">CV Generator</h1>
      
      <form onSubmit={handleGenerate} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={resumeData.name}
            onChange={(e) => handleInputChange('name', 0, e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Job Title</label>
          <input
            type="text"
            placeholder="Software Engineer"
            value={resumeData.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', 0, e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        {/* Dynamic Skills Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium">Skills</label>
            <button 
              type="button" 
              onClick={() => addField('skills')}
              className="text-sm text-blue-500"
            >
              + Add Skill
            </button>
          </div>
          
          {resumeData.skills.map((skill, index) => (
            <input
              key={`skill-${index}`}
              type="text"
              placeholder={`JavaScript, React, Node.js, etc.`}
              value={skill}
              onChange={(e) => handleInputChange('skills', index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
        </div>
        
        {/* Dynamic Experience Input */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium">Experience</label>
            <button 
              type="button" 
              onClick={() => addField('experience')}
              className="text-sm text-blue-500"
            >
              + Add Experience
            </button>
          </div>
          
          {resumeData.experience.map((exp, index) => (
            <input
              key={`exp-${index}`}
              type="text"
              placeholder="Senior Developer at XYZ Corp (2020-2023)"
              value={exp}
              onChange={(e) => handleInputChange('experience', index, e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Resume'}
        </button>
      </form>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {generatedContent && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-3">Generated Resume</h2>
          <div className="bg-gray-50 p-4 border rounded whitespace-pre-wrap">
            {generatedContent}
          </div>
        </div>
      )}
    </div>
  );
}