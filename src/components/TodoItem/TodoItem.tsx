import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo | null;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  isUpdating: boolean;
  isUpdatingTitle: boolean;
  tempTitle: string;
  setTempTitle: (newTitle: string) => void;
  onDoubleClick: (id: number) => void;
  setUpdatingTodoId: (newId: number | null) => void;
  isServerRequest: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  isDeleting,
  isUpdating,
  isUpdatingTitle,
  tempTitle,
  setTempTitle,
  onDoubleClick,
  setUpdatingTodoId,
  isServerRequest,
}) => {
  if (!todo) {
    return null;
  }

  const { id, completed, title } = todo;

  const handleBlur = () => {
    if (tempTitle.trim() === todo.title || tempTitle.trim() === '') {
      setUpdatingTodoId(null);

      return;
    }

    onDoubleClick(id);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTempTitle(todo.title);
      setUpdatingTodoId(null);
    }
  };

  return (
    <div key={id} data-cy="Todo" className={classNames('todo', { completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          readOnly
        />
      </label>
      {isUpdatingTitle ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            onDoubleClick(id);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={tempTitle}
            onChange={e => setTempTitle(e.target.value)}
            onBlur={() => handleBlur()}
            onKeyUp={e => handleKeyUp(e)}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setTempTitle(title);
              setUpdatingTodoId(id);
            }}
          >
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
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isDeleting || isUpdating || isServerRequest,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
