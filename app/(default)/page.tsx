export const metadata = {
  title: 'Recruitment tasks for Digiten',
  description: 'Kamil Matysiak recruitment process',
};

import Hero from '@/components/Hero';
import SpaceData from '@/components/SpaceData';
import ImageGallery from '@/components/ImageGallery';
import ToDoList from '@/components/ToDoList';

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
