import { Tasks } from '../../utils/types';
import { addToStorage } from '../../utils/utils';

interface InputTextProps {
  tasks: Tasks[],
  text: string,
  setText: (arg: string) => void,
}

export default function InputText({tasks, text, setText}: InputTextProps) {

  return (
    <form onSubmit={() => addToStorage(tasks, text)}>
      <input
        type="text"
        className="input-text"
        placeholder="Type your task now!"
        value={text}
        onChange={({ target }) => setText(target.value)}
        autoFocus
        aria-label="Напечатайте вашу задачу в поле для текста"
        title="Печатайте сюда"
        required
      />
    </form>
  );
}
