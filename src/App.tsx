/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
import { useState } from 'react';
import { controls, storageNames } from './const/const';

interface Tasks {
  task: string,
  isDone: boolean,
  date: string,
}
export default function App() {
  const [text, setText] = useState('');
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false);
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  const handleSubmit = () => {
    const taskToAdd = { task: text, isDone: false, date: Date.now() };
    localStorage.setItem(storageNames.tasks, tasks.length > 0 ? JSON.stringify([...tasks, taskToAdd]) : JSON.stringify([taskToAdd]));
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your task now!"
            value={text}
            onChange={({ target }) => setText(target.value)}
          />
        </form>

        <ul>
          {tasks &&
            tasks.map(
              ({
                task,
                isDone,
                date,
              }: {
                task: string;
                isDone: boolean;
                date: string;
              }) => (
                <>
                  <label key={date}>
                    <input
                      type="checkbox"
                      key={date}
                      className={!isDone ? 'active' : ''}
                    />
                    {task}
                  </label>
                  <button
                    type="button"
                    key={`${date}${Math.random()}`}
                    onClick={() => {
                      const findedTask = tasks.findIndex(
                        (el: Tasks) => el.date === date,
                      );
                      tasks.splice(findedTask, 1);
                      localStorage.setItem(storageNames.tasks, JSON.stringify(tasks));
                      setIsNeedToUpdate(!isNeedToUpdate);
                    }}
                  >
                    Delete task
                  </button>
                </>
              ),
            )}
        </ul>
      </div>
      <span>
        {tasks.filter(({ isDone }: { isDone: boolean }) => !isDone).length}{' '}
        items left
      </span>
      <div className="controls">
        {controls.map((button) => (
          <button type="button" key={button}>
            {button}
          </button>
        ))}
        <button type="button">Clear completed</button>
      </div>
    </>
  );
}
