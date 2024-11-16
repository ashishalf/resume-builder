'use client'

import { useState, useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import { PlusCircle, MinusCircle, Download } from 'lucide-react'

export function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phone: '',
    email: '',
    github: '',
    linkedin: ''
  })

  const [objective, setObjective] = useState('')

  const [workExperience, setWorkExperience] = useState([{
    company: '',
    position: '',
    duration: '',
    responsibilities: ''
  }])

  const [education, setEducation] = useState([{
    degree: '',
    institution: '',
    timeline: ''
  }])

  const [skills, setSkills] = useState({
    programming: '',
    webTech: '',
    databases: '',
    tools: ''
  })

  const [projects, setProjects] = useState([{
    title: '',
    description: '',
    techStack: '',
    link: ''
  }])

  const [certificates, setCertificates] = useState([{
    name: '',
    provider: '',
    description: ''
  }])

  const [awards, setAwards] = useState([{
    name: '',
    issuer: '',
    details: ''
  }])

  const resumeRef = useRef(null)

  const handleDownload = async () => {
  const element = resumeRef.current;
  
  // Ensure element is not null before passing it to html2canvas
  if (!element) {
    console.error('Resume element not found');
    return;
  }

  const canvas = await html2canvas(element);
  const data = canvas.toDataURL('image/png');

  const pdf = new jsPDF();
  const imgProperties = pdf.getImageProperties(data);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('resume.pdf');
};


  const addSection = (section, setState) => {
    setState(prev => [...prev, section === 'education' ? {
      degree: '',
      institution: '',
      timeline: ''
    } : section === 'workExperience' ? {
      company: '',
      position: '',
      duration: '',
      responsibilities: ''
    } : section === 'projects' ? {
      title: '',
      description: '',
      techStack: '',
      link: ''
    } : section === 'certificates' ? {
      name: '',
      provider: '',
      description: ''
    } : {
      name: '',
      issuer: '',
      details: ''
    }])
  }

  const removeSection = (section, index, setState) => {
    setState(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">Resume Builder</h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10 space-y-8">
            {/* Personal Info */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Full Name"
                  value={personalInfo.name}
                  onChange={(e) => setPersonalInfo({...personalInfo, name: e.target.value})}
                />
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                />
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                />
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="GitHub URL"
                  value={personalInfo.github}
                  onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                />
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="LinkedIn URL"
                  value={personalInfo.linkedin}
                  onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                />
              </div>
            </div>

            {/* Objective */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Objective</h2>
              <textarea
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your career objective"
                rows={4}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
              />
            </div>

            {/* Work Experience */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Work Experience</h2>
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => addSection('workExperience', setWorkExperience)}
                >
                  <PlusCircle className="w-5 h-5 mr-1" />
                  Add Experience
                </button>
              </div>
              {workExperience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const newWorkExperience = [...workExperience]
                        newWorkExperience[index].company = e.target.value
                        setWorkExperience(newWorkExperience)
                      }}
                    />
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => {
                        const newWorkExperience = [...workExperience]
                        newWorkExperience[index].position = e.target.value
                        setWorkExperience(newWorkExperience)
                      }}
                    />
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => {
                        const newWorkExperience = [...workExperience]
                        newWorkExperience[index].duration = e.target.value
                        setWorkExperience(newWorkExperience)
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <textarea
                      className="flex-grow px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Responsibilities"
                      rows={3}
                      value={exp.responsibilities}
                      onChange={(e) => {
                        const newWorkExperience = [...workExperience]
                        newWorkExperience[index].responsibilities = e.target.value
                        setWorkExperience(newWorkExperience)
                      }}
                    />
                    <button
                      className="ml-4 text-red-600 hover:text-red-800"
                      onClick={() => removeSection('workExperience', index, setWorkExperience)}
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => addSection('education', setEducation)}
                >
                  <PlusCircle className="w-5 h-5 mr-1" />
                  Add Education
                </button>
              </div>
              {education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...education]
                        newEducation[index].degree = e.target.value
                        setEducation(newEducation)
                      }}
                    />
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Institution"
                      value={edu.institution}
                      onChange={(e) => {
                        const newEducation = [...education]
                        newEducation[index].institution = e.target.value
                        setEducation(newEducation)
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      className="flex-grow px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Timeline"
                      value={edu.timeline}
                      onChange={(e) => {
                        const newEducation = [...education]
                        newEducation[index].timeline = e.target.value
                        setEducation(newEducation)
                      }}
                    />
                    <button
                      className="ml-4 text-red-600 hover:text-red-800"
                      onClick={() => removeSection('education', index, setEducation)}
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Programming Languages"
                  value={skills.programming}
                  onChange={(e) => setSkills({...skills, programming: e.target.value})}
                />
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Web Technologies"
                  value={skills.webTech}
                  onChange={(e) => setSkills({...skills, webTech: e.target.value})}
                />
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Databases"
                  value={skills.databases}
                  onChange={(e) => setSkills({...skills, databases: e.target.value})}
                />
                <input
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Tools & Platforms"
                  value={skills.tools}
                  onChange={(e) => setSkills({...skills, tools: e.target.value})}
                />
              </div>
            </div>

            {/* Projects */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => addSection('projects', setProjects)}
                >
                  <PlusCircle className="w-5 h-5 mr-1" />
                  Add Project
                </button>
              </div>
              {projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Project Title"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...projects]
                        newProjects[index].title = e.target.value
                        setProjects(newProjects)
                      }}
                    />
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Tech Stack"
                      value={project.techStack}
                      onChange={(e) => {
                        const newProjects = [...projects]
                        newProjects[index].techStack = e.target.value
                        setProjects(newProjects)
                      }}
                    />
                  </div>
                  <textarea
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 mb-4"
                    placeholder="Project Description"
                    rows={3}
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...projects]
                      newProjects[index].description = e.target.value
                      setProjects(newProjects)
                    }}
                  />
                  <div className="flex items-center">
                    <input
                      className="flex-grow px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Project Link"
                      value={project.link}
                      onChange={(e) => {
                        const newProjects = [...projects]
                        newProjects[index].link = e.target.value
                        setProjects(newProjects)
                      }}
                    />
                    <button
                      className="ml-4 text-red-600 hover:text-red-800"
                      onClick={() => removeSection('projects', index, setProjects)}
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Certificates */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Certificates</h2>
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => addSection('certificates', setCertificates)}
                >
                  <PlusCircle className="w-5 h-5 mr-1" />
                  Add Certificate
                </button>
              </div>
              {certificates.map((cert, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Certificate Name"
                      value={cert.name}
                      onChange={(e) => {
                        const newCertificates = [...certificates]
                        newCertificates[index].name = e.target.value
                        setCertificates(newCertificates)
                      }}
                    />
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Provider"
                      value={cert.provider}
                      onChange={(e) => {
                        const newCertificates = [...certificates]
                        newCertificates[index].provider = e.target.value
                        setCertificates(newCertificates)
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      className="flex-grow px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Description"
                      value={cert.description}
                      onChange={(e) => {
                        const newCertificates = [...certificates]
                        newCertificates[index].description = e.target.value
                        setCertificates(newCertificates)
                      }}
                    />
                    <button
                      className="ml-4 text-red-600 hover:text-red-800"
                      onClick={() => removeSection('certificates', index, setCertificates)}
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Awards */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Awards</h2>
                <button
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  onClick={() => addSection('awards', setAwards)}
                >
                  <PlusCircle className="w-5 h-5 mr-1" />
                  Add Award
                </button>
              </div>
              {awards.map((award, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Award Name"
                      value={award.name}
                      onChange={(e) => {
                        const newAwards = [...awards]
                        newAwards[index].name = e.target.value
                        setAwards(newAwards)
                      }}
                    />
                    <input
                      className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Issuer"
                      value={award.issuer}
                      onChange={(e) => {
                        const newAwards = [...awards]
                        newAwards[index].issuer = e.target.value
                        setAwards(newAwards)
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      className="flex-grow px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="Details"
                      value={award.details}
                      onChange={(e) => {
                        const newAwards = [...awards]
                        newAwards[index].details = e.target.value
                        setAwards(newAwards)
                      }}
                    />
                    <button
                      className="ml-4 text-red-600 hover:text-red-800"
                      onClick={() => removeSection('awards', index, setAwards)}
                    >
                      <MinusCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleDownload}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </button>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="mt-12 bg-white shadow-xl rounded-lg overflow-hidden" ref={resumeRef}>
          <div className="p-8 space-y-6 font-[Calibri]">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
              <p className="text-lg   mt-2">
                {personalInfo.phone} | {personalInfo.email} | {personalInfo.github} | {personalInfo.linkedin}
              </p>
            </div>

            {/* Objective */}
            {objective && (
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 mb-2">OBJECTIVE</h2>
                <p className="text-lg   ">{objective}</p>
              </div>
            )}

            {/* Work Experience */}
            {workExperience.length > 0 && (
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 mb-2">WORK EXPERIENCE</h2>
                {workExperience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">{exp.position}</span>
                      <span >{exp.duration}</span>
                    </div>
                    <p className="text-lg italic">{exp.company}</p>
                    <p className="text-lg   mt-1">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 mb-2">EDUCATION</h2>
                {education.map((edu, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <div>
                      <span className="text-lg font-semibold">{edu.degree} -</span>
                      <span className=" text-lg ml-2">{edu.institution}</span>
                    </div>
                    <div>{edu.timeline}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {(skills.programming || skills.webTech || skills.databases || skills.tools) && (
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 mb-2">SKILLS</h2>
                <div className="text-lg    space-y-1">
                  {skills.programming && (
                    <p>
                      <span className="font-semibold">Programming Languages:</span> {skills.programming}
                    </p>
                  )}
                  {skills.webTech && (
                    <p>
                      <span className="font-semibold">Web Technologies:</span> {skills.webTech}
                    </p>
                  )}
                  {skills.databases && (
                    <p>
                      <span className="font-semibold">Databases:</span> {skills.databases}
                    </p>
                  )}
                  {skills.tools && (
                    <p>
                      <span className="font-semibold">Tools & Others:</span> {skills.tools}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 mb-2">PROJECTS</h2>
                {projects.map((project, index) => (
                  <div key={index} className="mb-4">
                    <p className="text-lg  font-semibold">{project.title}</p>
                    <p className="text-lg   ">{project.description}</p>
                    <p className="text-lg   "><span className="font-semibold">Tech Stack:</span> {project.techStack}</p>
                    <p className="text-lg   "><span className="font-semibold">Link:</span>  {project.link} </p>
                  </div>
                ))}
              </div>
            )}

            {/* Certificates */}
            {certificates.length > 0 && (
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 mb-2">CERTIFICATES</h2>
                {certificates.map((cert, index) => (
                  <div key={index} className="mb-2 text-lg">
                    <span className="font-semibold">{cert.name}</span> - {cert.provider}
                    {cert.description && <p className="text-lg   ">{cert.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {/* Awards */}
            {awards.length > 0 && (
              <div>
                <h2 className="text-xl font-bold border-b border-gray-300 mb-2">AWARDS</h2>
                {awards.map((award, index) => (
                  <div key={index} className="mb-2 text-lg">
                    <span className="font-semibold">{award.name}</span> - {award.issuer}
                    {award.details && <p className="text-lg   ">{award.details}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <p className='text-center mt-6'>created with ❤️ by <a href='https://ashishkumar.vercel.app/' className='text-sky-600 underline' target='blank'>Ashish Kumar</a></p>
        </div>
      </div>
    </div>
  )
}