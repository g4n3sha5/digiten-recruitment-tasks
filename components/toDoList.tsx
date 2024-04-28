'use client';

import { TaskHeader } from '@/components/ui/TaskHeader';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { Trash } from 'react-bootstrap-icons';
import { uuid } from 'uuidv4';

interface Task {
  id: string;
  content: string;
}

export default function ToDoList() {
  const [taskName, setTaskName] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  // Move items when Drag ends
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  const addTask = () => {
    if (!taskName) return;
    const id = uuid();
    const newTask = { id: id, content: taskName };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (taskId: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  // Load tasks from memory on first component mount
  useEffect(() => {
    if (tasks.length > 0) return;
    const storedTasks = localStorage.getItem('todoTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    const storedTasks = localStorage.getItem('todoTasks');
    if (storedTasks && tasks === JSON.parse(storedTasks)) return;
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <section tabIndex={0} id="task3" className="relative min-h-screen pt-2 bg-indigo-600 ">
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2 "></div>
      <div className="relative pt-12 mx-auto text-center">
        <TaskHeader
          number={3}
          textColorClass="text-white"
          description="Create a to-do list application using React.js that allows users to add, reorder, and remove tasks using drag-and-drop 
          interactions. This task will test your ability to work with React state management and user interactions."
        />
      </div>

      <div className="bg-indigo-500 flex flex-col items-center gap-y-3">
        <h1 className="text-xl my-2 font-semibold">Drag and Drop To-Do List</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex gap-x-3 items-center justify-center px-6 lg:w-4/12"
        >
          <input
            placeholder="Enter task name..."
            onChange={(evt) => setTaskName(evt.target.value)}
            type="text"
            className="rounded-xl w-2/3"
            minLength={1}
            maxLength={25}
          />
          <button
            className="bg-white text-black px-4 py-2 font-semibold rounded-lg hover:bg-cyan-300 text-nowrap"
            onClick={addTask}
          >
            Add Task
          </button>
        </form>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                className="bg-slate-300 pb-10 w-full py-4 flex flex-col gap-y-2 items-center text-xl px-5"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Task task={task} removeTask={removeTask} key={task.id} index={index} />
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  );
}

export const Task = ({
  task,
  removeTask,
  index,
}: {
  task: Task;
  removeTask: (taskId: string) => void;
  index: number;
}) => (
  <Draggable index={index} draggableId={task.id}>
    {(provided) => (
      <li
        className="flex w-1/3 shadow-blue-500  max-w-full px-4 items-center py-2 border bg-indigo-700 justify-between text-white border-black rounded-lg gap-x-3 text-wrap"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <span className="font-bold">{index + 1}.</span>
        <div className="overflow-hidden cut-overflow text-ellipsis text-nowrap ">{task.content}</div>
        <button type="button">
          <Trash className="w-6 h-6 hover:scale-110" onClick={() => removeTask(task.id)} />
        </button>
      </li>
    )}
  </Draggable>
);
