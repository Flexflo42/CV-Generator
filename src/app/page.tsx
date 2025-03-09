import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Professional CV Generator
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Create a standout resume in minutes with our AI-powered tools. 
            Perfect for job seekers at any career stage.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Quick & Easy</h3>
              <p className="text-gray-600">Generate a professional CV in just a few simple steps</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">ATS-Friendly</h3>
              <p className="text-gray-600">Optimized formats to pass applicant tracking systems</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Customizable</h3>
              <p className="text-gray-600">Tailor your CV to match specific job requirements</p>
            </div>
          </div>
          
          <Link 
            href="/generator" 
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium px-8 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Create Your CV Now
          </Link>
          
          <p className="mt-4 text-gray-500 text-sm">
            No sign-up required • Free to use • Download in multiple formats
          </p>
        </div>
      </div>
      
      <footer className="bg-gray-800 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-4">Helping professionals showcase their skills since 2025</p>
          <div className="flex justify-center space-x-6">
            <Link href="/about" className="hover:text-white">About</Link>
            <Link href="/templates" className="hover:text-white">Templates</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}