import { useState } from 'react';
import { controls } from './utils/const';
import '../src/app-styles.css';
import { addToStorage, clearCompleted, deleteFromStorage, filteredTasks, updateStorage } from './utils/utils';
import { Tasks } from './utils/types';

export default function App() {
  const [filter, setFilter] = useState('All');
  const [text, setText] = useState('');
  const [isNeedToUpdate, setIsNeedToUpdate] = useState(false);
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');


  return (
    <>
      <div>
        <form onSubmit={() => addToStorage(tasks, text)}>
          <input
            type="text"
            placeholder="Type your task now!"
            value={text}
            onChange={({ target }) => setText(target.value)}
          />
        </form>

        <ul>
          {tasks &&
            filteredTasks[filter](tasks).map(({ task, isDone, date }) => (
              <>
                <label key={date} className={`${isDone ? 'active' : ''}`}>
                  <input
                    type="checkbox"
                    onChange={() => updateStorage(tasks, setIsNeedToUpdate, date, isNeedToUpdate)}
                    checked={isDone}
                  />
                  {task}
                </label>
                <button
                  type="button"
                  key={`${date}${Math.random()}`}
                  onClick={() => deleteFromStorage(tasks, setIsNeedToUpdate, date, isNeedToUpdate)}
                >
                  Delete task
                </button>
              </>
            ))}
        </ul>
      </div>
      <span>
        {tasks.filter(({ isDone }: Tasks) => !isDone).length}{' '}
        items left
      </span>
      <div className="controls">
        {controls.map((button) => (
          <button type="button" key={button} onClick={() => setFilter(button)}>
            {button}
          </button>
        ))}
        <button type="button" onClick={() => clearCompleted(tasks, setIsNeedToUpdate, isNeedToUpdate)}>Clear completed</button>
      </div>
    </>
  );
}
