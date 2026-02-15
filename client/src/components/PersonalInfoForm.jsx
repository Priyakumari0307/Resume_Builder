import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";

export default function PersonalInfoForm({ data, onChange, RemoveBackground, setRemoveBackgrond }) {
    const handleImageChange = (field, value) => {
        onChange({ ...data, [field]: value });
    }
    
    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type: "text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
        { key: "website", label: "Personal Website", icon: Globe, type: "url" }
    ]
    
    return (
        <div className="space-y-6">
            <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>Personal Information</h3>
                <p className='text-sm text-gray-600 mb-6'>Get Started with the personal information</p>
            </div>

            {/* Profile Image Upload */}
            <div className='flex items-center gap-4'>
                <label className="cursor-pointer">
                    {data.image ? (
                        <img 
                            src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} 
                            alt="user-image" 
                            className='w-16 h-16 rounded-full object-cover border-2 border-gray-200 hover:opacity-80 transition-opacity'
                        />
                    ) : (
                        <div className='w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors'>
                            <User className='size-6 text-gray-400' />
                        </div>
                    )}
                    <input 
                        type="file" 
                        accept="image/jpeg,image/jpg,image/png" 
                        className="hidden" 
                        onChange={(e) => handleImageChange('image', e.target.files[0])} 
                    />
                </label>
                
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-700">Profile Photo</p>
                    <p className="text-xs text-gray-500">Upload a professional photo</p>
                </div>

                {typeof data.image === 'object' && (
                    <div className="flex items-center gap-2">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={RemoveBackground} 
                                onChange={(e) => setRemoveBackgrond(!RemoveBackground)} 
                                className="sr-only peer" 
                            />
                            <div className='w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-200'>
                                <div className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></div>
                            </div>
                        </label>
                        <span className='text-xs text-gray-600'>Remove Background</span>
                    </div>
                )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
                {fields.map((field) => {
                    const Icon = field.icon;
                    return (
                        <div key={field.key}>
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                <Icon className="size-4 text-gray-500" />
                                {field.label}
                                {field.required && <span className="text-red-500">*</span>}
                            </label>
                            <input 
                                type={field.type} 
                                value={data[field.key] || ""} 
                                onChange={(e) => handleImageChange(field.key, e.target.value)} 
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm" 
                                placeholder={`Enter your ${field.label.toLowerCase()}`} 
                                required={field.required} 
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}