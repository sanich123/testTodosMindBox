import { controls, storageActions } from '../../utils/const';
import { Tasks } from '../../utils/types';
import { actionsWithStorage } from '../../utils/utils';

interface ControlsBtnsProps {
  setFilter: (arg: string) => void,
  tasks: Tasks[],
  setIsNeedToUpdate: (arg: boolean) => void,
  isNeedToUpdate: boolean,
}

export default function ControlsBtns({setFilter, tasks, setIsNeedToUpdate, isNeedToUpdate}: ControlsBtnsProps) {

  return (
    <>
      {controls.map((button) => (
        <button
          type="button"
          key={button}
          onClick={() => setFilter(button)}
          disabled={!tasks.length}
        >
          {button}
        </button>
      ))}
      <button
        className="clear-btn"
        type="button"
        onClick={() =>
          actionsWithStorage({
            action: storageActions.clearCompleted,
            tasks,
            setIsNeedToUpdate,
            isNeedToUpdate,
          })}
        disabled={!tasks.length}
      >
        Clear completed
      </button>
    </>
  );
}
