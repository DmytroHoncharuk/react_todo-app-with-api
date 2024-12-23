import { TempTodoItem } from '../TempTodoItem/TempTodoItem';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
  deletingTodoId: number | null;
  updatingTodos: number[];
  updatingTodo: number | null;
  tempTodoTitle: string | null;
  setTempTodoTitle: (newTitle: string) => void;
  setUpdatingTodoId: (newId: number | null) => void;
  onDoubleClick: (id: number) => void;
  serverRequest: boolean;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  tempTodo,
  onDelete,
  deletingTodoId,
  updatingTodos,
  updatingTodo,
  tempTodoTitle,
  setTempTodoTitle,
  onDoubleClick,
  setUpdatingTodoId,
  serverRequest,
}) => {
  return (
    <>
      {filteredTodos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          onDelete={onDelete}
          isDeleting={deletingTodoId === todo.id}
          isUpdating={updatingTodos.includes(todo.id)}
          isUpdatingTitle={updatingTodo === todo.id}
          tempTitle={tempTodoTitle ?? ''}
          setTempTitle={setTempTodoTitle}
          onDoubleClick={onDoubleClick}
          setUpdatingTodoId={setUpdatingTodoId}
          isServerRequest={updatingTodo === todo.id && serverRequest}
        />
      ))}

      <TempTodoItem tempTodo={tempTodo} />
    </>
  );
};
