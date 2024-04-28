export const metadata = {
  title: 'Recruitment tasks for Digiten',
  description: 'Kamil Matysiak recruitment process',
};

import Hero from '@/components/hero';
import SpaceData from '@/components/spaceData';
import ImageGallery from '@/components/imageGallery';
import ToDoList from '@/components/toDoList';

export default function Home() {
  return (
    <>
      <Hero />
      <SpaceData />
      <ImageGallery />
      <ToDoList />
    </>
  );
}
