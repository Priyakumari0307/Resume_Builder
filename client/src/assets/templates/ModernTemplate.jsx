export default function ModernTemplate({ data, accentColor = "#3B82F6" }) {
  const { personal_info = {} } = data;

  return (
    <div className="w-full max-w-[8.5in] mx-auto bg-white shadow-lg" style={{ minHeight: '11in' }}>
      {/* Header Section */}
      <div className="px-8 py-6" style={{ backgroundColor: accentColor }}>
        <div className="flex items-center gap-6 text-white">
          {personal_info.image && (
            <div className="flex-shrink-0">
              <img 
                src={typeof personal_info.image === 'string' ? personal_info.image : URL.createObjectURL(personal_info.image)}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">
              {personal_info.full_name || 'Your Name'}
            </h1>
            <p className="text-lg opacity-90 mb-3">
              {personal_info.profession || 'Your Profession'}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="px-8 py-4 bg-gray-50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {personal_info.phone && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📞</span>
              <span>{personal_info.phone}</span>
            </div>
          )}
          {personal_info.email && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">✉️</span>
              <span>{personal_info.email}</span>
            </div>
          )}
          {personal_info.location && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">📍</span>
              <span>{personal_info.location}</span>
            </div>
          )}
          {personal_info.linkedin && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">💼</span>
              <span className="truncate">{personal_info.linkedin}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Summary Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white px-4 py-2 mb-4 rounded" style={{ backgroundColor: accentColor }}>
            SUMMARY
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.professional_summery || 'Highly analytical Data Analyst with 6 years of experience transforming complex datasets into actionable insights using SQL, Python, and advanced visualization tools.'}
          </p>
        </div>

        {/* Experience Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white px-4 py-2 mb-4 rounded" style={{ backgroundColor: accentColor }}>
            EXPERIENCE
          </h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">Senior Full Stack Developer</h3>
                  <p className="text-gray-600">Example Technologies</p>
                </div>
                <span className="text-sm text-gray-500">Jan 2021 - Present</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Architected, developed, and deployed innovative full-stack applications of E-commerce platforms</li>
                <li>Creating robust back-end systems and intuitive front-end interfaces</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white px-4 py-2 mb-4 rounded" style={{ backgroundColor: accentColor }}>
            EDUCATION
          </h2>
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">B.TECH</h3>
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