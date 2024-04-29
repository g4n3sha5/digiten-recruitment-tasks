import { Github } from 'react-bootstrap-icons';

export default function Hero() {
  return (
    <section className=" bg-[#00c8ff] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20 flex flex-col items-center">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16 text-white">
            <h1
              className="text-5xl md:text-8xl textShadow font-extrabold leading-tighter tracking-tighter mb-7 "
              data-aos="zoom-y-out"
            >
              Kamil Matysiak
            </h1>

            <h1 className="text-2xl mb-10" data-aos="zoom-y-im">
              kmatysiak-it@outlook.com
            </h1>

            <div className="max-w-3xl mx-auto flex center justify-center gap-x-4">
              <a
                className="btn text-white bg-blue-600 hover:bg-gray-900 w-full mb-4 sm:w-auto sm:mb-0"
                href="#spaceData"
              >
                Task 1
              </a>
              <a className="btn text-white bg-blue-900 hover:bg-gray-800 w-full sm:w-auto " href="#imageGallery">
                Task 2
              </a>
              <a
                className="btn text-white bg-gray-900 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0"
                href="#toDoList"
              >
                Task 3
              </a>
            </div>
            <a
              className="btn text-white mt-10 bg-blue-600 hover:bg-gray-900 w-full mb-4 sm:w-auto sm:mb-0"
              href="https://github.com/g4n3sha5/digiten-recruitment-tasks"
              target="_blank"
            >
              <Github className="w-7 h-7 mx-2" />
              Code
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
