export default function MinimalImageTemplate({ data, accentColor = "#3B82F6" }) {
  const { personal_info = {} } = data;

  return (
    <div className="w-full max-w-[8.5in] mx-auto bg-white shadow-lg" style={{ minHeight: '11in' }}>
      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-1/3 p-6" style={{ backgroundColor: `${accentColor}15` }}>
          {/* Profile Image */}
          {personal_info.image && (
            <div className="text-center mb-6">
              <img 
                src={typeof personal_info.image === 'string' ? personal_info.image : URL.createObjectURL(personal_info.image)}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
              />
            </div>
          )}

          {/* Contact Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">CONTACT</h3>
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
                  <p className="text-gray-900 break-all">{personal_info.email}</p>
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
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-2/3 p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {personal_info.full_name || 'Your Name'}
            </h1>
            <p className="text-lg text-gray-600">
              {personal_info.profession || 'Your Profession'}
            </p>
          </div>

          {/* Summary Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.professional_summery || 'Highly analytical Data Analyst with 6 years of experience transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools.'}
            </p>
          </div>

          {/* Experience Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Experience
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">Senior Full Stack Developer</h3>
                    <p className="text-gray-600">Example Technologies</p>
                  </div>
                  <span className="text-sm text-gray-500">Jan 2021 - Present</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Architected, developed, and deployed innovative full-stack applications</li>
                  <li>Creating robust back-end systems and intuitive front-end interfaces</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">
              Education
            </h2>
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">B.TECH</h3>
                  <p className="text-gray-600">Example Institute of Technology</p>
                </div>
                <span className="text-sm text-gray-500">May 2020</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}