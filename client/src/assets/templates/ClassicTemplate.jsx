export default function ClassicTemplate({ data, accentColor = "#3B82F6" }) {
  const { personal_info = {}, experience = [], education = [], project = [], skills = [] } = data;

  return (
    <div className="w-full max-w-[8.5in] mx-auto bg-white shadow-lg" style={{ minHeight: '11in' }}>
      {/* Header Section with Profile */}
      <div className="px-8 py-8">
        <div className="flex items-start gap-8">
          {/* Profile Image */}
          {personal_info.image && (
            <div className="flex-shrink-0">
              <img 
                src={typeof personal_info.image === 'string' ? personal_info.image : URL.createObjectURL(personal_info.image)}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          )}
          
          {/* Name and Title */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {personal_info.full_name || 'Jordan Lee'}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {personal_info.profession || 'Frontend Engineer'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-8 pb-8">
        <div className="grid grid-cols-5 gap-8">
          {/* Left Column - Contact & Education */}
          <div className="col-span-2 space-y-8">
            {/* Contact Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">CONTACT</h2>
              <div className="space-y-3 text-sm">
                {personal_info.phone && (
                  <div>
                    <p className="text-gray-600">Phone</p>
                    <p className="text-gray-900">{personal_info.phone}</p>
                  </div>
                )}
                {personal_info.email && (
                  <div>
                    <p className="text-gray-600">Email</p>
                    <p className="text-gray-900">{personal_info.email}</p>
                  </div>
                )}
                {personal_info.location && (
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="text-gray-900">{personal_info.location}</p>
                  </div>
                )}
                {personal_info.linkedin && (
                  <div>
                    <p className="text-gray-600">LinkedIn</p>
                    <p className="text-gray-900 break-all">{personal_info.linkedin}</p>
                  </div>
                )}
                {personal_info.website && (
                  <div>
                    <p className="text-gray-600">Website</p>
                    <p className="text-gray-900 break-all">{personal_info.website}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">EDUCATION</h2>
              <div className="space-y-4">
                {education.length > 0 ? education.map((edu, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(edu.graduation_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    {edu.field && <p className="text-sm text-gray-500">{edu.field}</p>}
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                )) : (
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">B.TECH</h3>
                      <span className="text-sm text-gray-500">May 2020</span>
                    </div>
                    <p className="text-sm text-gray-600">Example Institute of Technology</p>
                  </div>
                )}
              </div>
            </div>

            {/* Skills Section */}
            {skills.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Summary & Experience */}
          <div className="col-span-3 space-y-8">
            {/* Summary Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">SUMMARY</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                {data.professional_summary || data.professional_summery || 'Highly analytical Data Analyst with 6 years of experience transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools.'}
              </p>
            </div>

            {/* Experience Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">EXPERIENCE</h2>
              <div className="space-y-6">
                {experience.length > 0 ? experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {
                          exp.is_current ? 'Present' : new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        }
                      </span>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {exp.description.split('\n').map((line, lineIndex) => (
                        <p key={lineIndex} className="mb-1">{line}</p>
                      ))}
                    </div>
                  </div>
                )) : (
                  <>
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">Senior Full Stack Developer</h3>
                          <p className="text-sm text-gray-600">Example Technologies</p>
                        </div>
                        <span className="text-sm text-gray-500">Jan 2021 - Present</span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                        <li>Architected, developed, and deployed innovative full-stack applications of E-commerce platforms</li>
                        <li>Creating robust back-end systems and intuitive front-end interfaces</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">Full Stack Developer</h3>
                          <p className="text-sm text-gray-600">Example Technologies</p>
                        </div>
                        <span className="text-sm text-gray-500">Aug 2019 - May 2021</span>
                      </div>
                      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ml-4">
                        <li>Developed and maintained web applications</li>
                        <li>Collaborated with cross-functional teams</li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Projects Section */}
            {project.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">PROJECTS</h2>
                <div className="space-y-4">
                  {project.map((proj, index) => (
                    <div key={index}>
                      <div className="mb-2">
                        <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                        <p className="text-sm text-gray-600">{proj.type}</p>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}