import { Link } from 'react-router-dom';
import Orb from './Orb';
import { useSelector } from 'react-redux';


export default function Hero() {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className='min-h-screen w-full bg-black relative flex items-center justify-center'>
            {/* Background Orb */}
            <div className="absolute inset-0">
                <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                    <Orb
                        hoverIntensity={0.5}
                        rotateOnHover={true}
                        hue={0}
                        forceHoverState={false}
                    />
                </div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Build Your Perfect
                    <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Resume</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                    Create professional resumes in minutes with our AI-powered builder.
                    Stand out from the crowd and land your dream job.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    {!user ? (
                        <>
                            <Link
                                to="/login?state=signup"
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 text-lg"
                            >
                                Become a member
                            </Link>

                            <Link
                                to="/login"
                                className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:-translate-y-1 text-lg backdrop-blur-sm"
                            >
                                Sign In
                            </Link>
                        </>
                    ) : (
                        <Link
                            to="/app"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 text-lg"
                        >
                            Dashboard
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}