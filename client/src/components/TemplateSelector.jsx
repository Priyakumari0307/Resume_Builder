import { useState } from 'react'
import { Layout } from 'lucide-react'

export default function TemplateSelector({ selectedTemplate, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const templates = [
        {
            id: "classic",
            name: "Classic",
            description: "A clean, traditional resume format with clear sections and professional typography"
        },
        {
            id: "modern",
            name: "Modern",
            description: "Bold, sleek, and built for today's tech-driven resumes."
        },
        {
            id: "minimal",
            name: "Minimal",
            description: "Clean design that puts your skills first, nothing extra."
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            description: "A minimal layout with a subtle visual touch for personal branding."
        },
    ]

    return (
        <div className='relative'>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
                <Layout size={14} />
                <span>Template</span>
            </button>
            {isOpen && (
                <div className='absolute top-full left-0 w-80 p-4 mt-2 z-10 bg-white rounded-lg border border-gray-200 shadow-lg'>
                    <div className="space-y-3">
                        {templates.map((template) => (
                            <div 
                                key={template.id} 
                                onClick={() => { onChange(template.id); setIsOpen(false) }} 
                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all border ${
                                    selectedTemplate === template.id 
                                        ? 'bg-blue-50 border-blue-200' 
                                        : 'border-gray-100 hover:bg-gray-50 hover:border-gray-200'
                                }`}
                            >
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">{template.description}</p>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                    <div className={`w-12 h-16 rounded border-2 ${
                                        selectedTemplate === template.id 
                                            ? 'border-blue-400 bg-blue-100' 
                                            : 'border-gray-300 bg-gray-100'
                                    }`}>
                                        {selectedTemplate === template.id && (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}