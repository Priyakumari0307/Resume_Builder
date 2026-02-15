export default function MinimalTemplate({ data, accentColor = "#3B82F6" }) {
  const { personal_info = {} } = data;

  return (
    <div className="w-full max-w-[8.5in] mx-auto bg-white shadow-lg" style={{ minHeight: '11in' }}>
      {/* Header Section */}
      <div className="px-8 py-8 text-center border-b">
        <h1 className="text-4xl font-light text-gray-900 mb-2">
          {personal_info.full_name || 'Your Name'}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          {personal_info.profession || 'Your Profession'}
        </p>
        
        {/* Contact Information */}
        <div className="flex justify-center gap-6 text-sm text-gray-600">
          {personal_info.phone && <span>{personal_info.phone}</span>}
          {personal_info.email && <span>{personal_info.email}</span>}
          {personal_info.location && <span>{personal_info.location}</span>}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
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
  );
}