import thumb1 from '@/public/images/thumb1.jpg';
import thumb2 from '@/public/images/thumb2.jpg';
import thumb3 from '@/public/images/thumb3.jpg';
import thumb4 from '@/public/images/thumb4.jpg';

export const images = [thumb1, thumb2, thumb3, thumb4];

export const sliderStates = {
  incoming: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1,
    opacity: 0.2,
  }),
};

export const sliderTransition = {
  duration: 0.5,
  ease: [0.56, 0.03, 0.12, 1.04],
};
