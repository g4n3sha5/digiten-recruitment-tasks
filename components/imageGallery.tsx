'use client';

import { TaskContainer } from '@/components/ui/TaskContainer';
import { images } from '@/public/utils';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, XLg } from 'react-bootstrap-icons';
import { useSwipeable } from 'react-swipeable';

interface ModalProps {
  imageOpen: boolean;
  setImageOpen: (bool: boolean) => void;
  incrementIndex: () => void;
  decrementIndex: () => void;
  currentIndex: number;
}

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
              <img src={image.src} alt="Sample image" className="h-[75vh] w-[80vw] hover:object-fill object-cover " />
            </div>
          ))}
        </div>
        {/* Modal section */}
        {imageOpen && (
          <Modal
            imageOpen={imageOpen}
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

const Modal = ({ imageOpen, setImageOpen, incrementIndex, decrementIndex, currentIndex }: ModalProps) => {
  const [dragStartX, setDragStartX] = useState(0);

  // Swipe handler using react-swipable
  const handleSwipe = (deltaX: number) => {
    if (deltaX > 50) {
      incrementIndex();
    } else if (deltaX < -50) {
      decrementIndex();
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(-100),
    onSwipedRight: () => handleSwipe(100),
  });

  // Handle "swipe" drag event on Desktop
  const handleMouseDown = (evt: React.MouseEvent<HTMLDivElement>) => {
    setDragStartX(evt.clientX); // Record the initial X position when mouse is pressed down
  };
  const handleMouseUp = (evt: React.MouseEvent<HTMLDivElement>) => {
    const deltaX = evt.clientX - dragStartX;
    if (deltaX > 75) {
      decrementIndex();
    } else if (deltaX < -75) {
      incrementIndex();
    }
  };

  return (
    <div
      {...swipeHandlers}
      onClick={() => {
        setImageOpen(false);
      }}
      className={`${
        imageOpen ? 'opacity-100 flex' : 'opacity-0 hidden'
      } w-screen h-screen transition-all backdrop-blur-lg select-none backdrop-saturate-150 backdrop-contrast-125 backdrop-brightness-[35%] fixed top-0 items-center justify-center z-20
    `}
    >
      <div
        tabIndex={-1}
        onDragStart={handleMouseDown}
        onDragEnd={handleMouseUp}
        onClick={(evt) => {
          evt.stopPropagation();
        }}
        className="border-white rounded-xl w-screen h-screen md:h-[90vh] md:w-[80%] object-cover relative "
      >
        <img src={images[currentIndex].src} className="w-full h-full object-cover cursor-grab" />
        <div className="w-full" onClick={() => setImageOpen(false)}>
          <XLg color="ghostwhite" className="cursor-pointer absolute top-6 right-6 w-8 h-8 z-30" />
        </div>
        <ImageArrowAside onClick={decrementIndex} direction="left" />
        <ImageArrowAside onClick={incrementIndex} direction="right" />
      </div>

      <div className="absolute text-white bottom-4">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};
// Arrow left / arrow right on slide aside
const ImageArrowAside = ({ onClick, direction }: { onClick: () => void; direction: 'left' | 'right' }) => {
  const Comp = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <div
      onClick={onClick}
      className={`w-5 md:w-20 bg-gallery-normal cursor-pointer hover:bg-gallery-hover z-10 
      transition absolute ${direction}-0 top-0 h-full flex justify-center`}
    >
      <Comp color="ghostwhite" className={`top-1/2 z-20 w-4 md:w-8 h-auto `} />
    </div>
  );
};
