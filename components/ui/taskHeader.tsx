interface Props {
  number: number;
  description: string;
  textColorClass?: string;
}

export const TaskHeader = ({ number, description, textColorClass = 'text-gray-600' }: Props) => (
  <div className="max-w-3xl mx-auto text-center flex flex-col items-center pb-6 px-4">
    <h1 className="h2 mb-4">Task {number}</h1>
    <p className={`text-lg ${textColorClass}`}>{description}</p>
    <hr className=" border-cyan-300 w-3/4 my-8 " />
  </div>
);
