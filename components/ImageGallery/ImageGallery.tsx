'use client';

import { Modal } from '@/components/ImageGallery/subcomponents/Modal';
import { TaskContainer } from '@/components/ui/TaskContainer';
import { images } from '@/public/utils';
import { useState } from 'react';

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageOpen, setImageOpen] = useState<boolean>();

  const incrementIndex = () =>
    currentIndex + 1 < images.length ? setCurrentIndex(currentIndex + 1) : setCurrentIndex(0);
  const decrementIndex = () =>
    currentIndex - 1 < 0 ? setCurrentIndex(images.length - 1) : setCurrentIndex(currentIndex - 1);

  return (
    <TaskContainer
      id="imageGallery"
      tabIndex={0}
      onKeyUp={(evt) => {
        if (evt.key === 'Escape') {
          setImageOpen(false);
        }
        if (evt.key === 'ArrowLeft') return decrementIndex();
        if (evt.key === 'ArrowRight') return incrementIndex();
      }}
      taskNumber={2}
      taskDescription="You are tasked with creating a responsive image gallery component using React.js. The gallery should display a grid of 
      thumbnail images, and users should be able to swipe left or right on a touch-enabled device (or use drag-and-drop on 
      a desktop) to navigate between images."
    >
      <div className="relative pt-12 mx-auto text-center ">
        <div className="flex flex-wrap lg:flex-nowrap items-center w-full lg:gap-x-1 bg-white">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setImageOpen(true);
                setCurrentIndex(index);
              }}
              className={`cursor-pointer hover:scale-x-150 transition-all  z-10 hover:z-20 w-1/2 lg:w-1/4  overflow-hidden ${
                currentIndex === index ? 'border-blue-500' : ''
              }`}
            >
              <img src={image.src} alt="Sample image" className="h-[75vh] w-[80vw] hover w:object-fill object-cover " />
            </div>
          ))}
        </div>

        {/* Modal section */}
        {imageOpen && (
          <Modal
            setImageOpen={setImageOpen}
            incrementIndex={incrementIndex}
            decrementIndex={decrementIndex}
            currentIndex={currentIndex}
          />
        )}
      </div>
    </TaskContainer>
  );
}
