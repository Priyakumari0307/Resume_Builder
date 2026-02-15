import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import Loader from '../components/Loader'
import ResumePreview from '../components/ResumePreview'
import api from '../configs/api'

const Preview = () => {
    const { resumeId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [resumeData, setResumeData] = useState(null)

    const loadResume = async () => {
        try {
            const { data } = await api.get('/api/resumes/public/' + resumeId)
            setResumeData(data.resume)
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadResume()
    }, [resumeId])

    if (isLoading) {
        return <Loader />
    }

    if (!resumeData) {
        return (
            <div className='flex flex-col items-center justify-center h-screen'>
                <p className='text-center text-6xl text-slate-400 font-medium mb-4'>Resume not found</p>
                <p className='text-center text-lg text-slate-500 mb-6'>The resume you're looking for doesn't exist or has been removed.</p>
                <Link
                    to="/"
                    className='bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2 ring-offset-1 ring-1 ring-green-400 flex items-center transition-colors'
                >
                    <ArrowLeftIcon className='mr-2 size-4' />
                    Go to Home Page
                </Link>
            </div>
        )
    }

    return (
        <div className='bg-slate-100 min-h-screen'>
            <div className='max-w-3xl mx-auto py-10'>
                <ResumePreview
                    data={resumeData}
                    template={resumeData.template}
                    accentColor={resumeData.accent_color}
                    classes='py-4 bg-white shadow-lg rounded-lg'
                />
            </div>
        </div>
    )
}

export default Preview