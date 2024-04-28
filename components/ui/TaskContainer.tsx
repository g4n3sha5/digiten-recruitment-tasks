import { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  taskNumber: number;
  taskDescription: string;
  textColorClass?: string;
  children: ReactNode;
  className?: string;
}

// Reusable component to keep same visual structure for each task
export const TaskContainer = ({
  textColorClass = 'text-gray-600',
  taskNumber,
  taskDescription,
  children,
  className,
  ...props
}: Props) => {
  return (
    <section {...props} tabIndex={0} className={`relative min-h-screen pt-2 bg-indigo-100 ${className}`}>
      {/* Short vertical line in the center */}
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20  bg-gray-200 transform -translate-y-1/2 "></div>

      <div className="relative pt-12 mx-auto text-center">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center pb-6 px-4">
          <h1 className="h2 mb-4">Task {taskNumber}</h1>
          <p className={`text-lg ${textColorClass}`}>{taskDescription}</p>
          <hr className=" border-cyan-300 w-3/4 my-8 " />
        </div>
      </div>

      {children}
    </section>
  );
};
