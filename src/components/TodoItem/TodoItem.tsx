import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo | null;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  isUpdating: boolean; // Новий пропс для стану оновлення
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  isDeleting,
  isUpdating,
}) => {
  if (!todo) {
    return null;
  }

  const { id, completed, title } = todo;

  return (
    <div key={id} data-cy="Todo" className={classNames('todo', { completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          readOnly
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => onDelete(id)}
      >
        ×
      </button>
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isDeleting || isUpdating,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
