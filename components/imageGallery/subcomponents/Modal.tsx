import { images, sliderStates, sliderTransition } from '@/public/utils';
import { ChevronLeft, ChevronRight, XLg } from 'react-bootstrap-icons';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  setImageOpen: (bool: boolean) => void;
  incrementIndex: () => void;
  decrementIndex: () => void;
  currentIndex: number;
}

export const Modal = ({ setImageOpen, incrementIndex, decrementIndex, currentIndex }: ModalProps) => {
  const [dragStartX, setDragStartX] = useState(0);

  // Handle "swipe" drag event on Desktop
  const handleDragStart = (evt: any) => {
    if (!evt.clientX) return;
    setDragStartX(evt.clientX);
    // Record the initial X position when mouse is pressed down
  };

  const handleDragEnd = (evt: any) => {
    const deltaX = evt.clientX - dragStartX;
    if (deltaX > -75) {
      decrementIndex();
    } else if (deltaX < 75) {
      incrementIndex();
    }
  };

  return (
    <div
      onClick={() => {
        setImageOpen(false);
      }}
      className={`flex w-screen h-screen transition-all backdrop-blur-lg select-none backdrop-saturate-150 backdrop-contrast-125 backdrop-brightness-[35%] fixed top-0 items-center justify-center z-20
      `}
    >
      <div className="w-full flex justify-center relative">
        <motion.div
          // {...swipeHandlers}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={(evt) => {
            evt.stopPropagation();
          }}
          initial="incoming"
          animate="active"
          exit="exit"
          variants={sliderStates}
          transition={sliderTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.08}
          tabIndex={0}
          whileTap={{ cursor: 'grabbing' }}
          className="border-white rounded-xl w-screen  h-screen md:h-[90vh] md:w-[80%]  cursor-grab overflow-hidden relative"
        >
          <img
            src={images[currentIndex].src}
            className="pointer-events-none h-full w-full object-cover lg:object-fill "
          />
          <div onClick={() => setImageOpen(false)}>
            <XLg color="ghostwhite" className="cursor-pointer absolute top-6 right-6 w-8 h-8 z-30" />
          </div>
          <ImageArrowAside onClick={decrementIndex} direction="left" />
          <ImageArrowAside onClick={incrementIndex} direction="right" />
          <div className="absolute text-white  left-1/2 bottom-4 z-20">
            {currentIndex + 1}/{images.length}
          </div>
        </motion.div>
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
