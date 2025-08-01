import Logo from '../assets/logoOpacity.svg';
import { Gamepad2 } from 'lucide-react';
import '../Components/css/HeroSection.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  const handleClick = () => {
    const user = localStorage.getItem('user');
    navigate(user ? '/HomePage' : '/Preloader');
  };

  return (
    <div
      id="background"
      className="bg-gradient-to-t from-cyan-300 via-transparent to-black flex justify-center items-center min-h-screen px-4"
    >
      <div
        className="relative bg-contain bg-no-repeat w-full max-w-5xl h-72 sm:h-96 flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${Logo})`,
          backgroundPosition: 'center 80%',
        }}
      >
        {/* Lottie fondo, capa inferior */}
        <DotLottieReact
          className="absolute top-0 left-0 h-full w-full z-0"
          src="https://lottie.host/9ad2756e-5d0c-4e48-be43-d964c37daea0/lz10b4JsWT.lottie"
          loop
          autoplay
        />
        <DotLottieReact
          className="absolute top-0 left-0 h-full w-full z-0 rotate-180"
          src="https://lottie.host/8f385097-1fd9-4e6b-8d84-ab7bb31d37db/nLLINWcew3.lottie"
          loop
          autoplay
        />

        {/* Contenido principal, capa superior */}
        <section className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg mb-2">UrChoice</h1>
          <p className="opacity-70 text-xl sm:text-2xl font-bold text-white drop-shadow-2xl mb-6">
            Which will be your choice?
          </p>
          <button
            type="button"
            onClick={handleClick}
            className="flex items-center gap-2 bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition"
            aria-label="Play now"
          >
            <Gamepad2 size={24} />
            <span>Play now</span>
          </button>
        </section>
      </div>
    </div>
  );
}

export default HeroSection;
