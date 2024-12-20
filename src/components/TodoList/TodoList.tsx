import { TempTodoItem } from '../TempTodoItem/TempTodoItem';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  filteredTodos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
  deletingTodoId: number | null;
  updatingTodos: number[]; // Новий пропс
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  tempTodo,
  onDelete,
  deletingTodoId,
  updatingTodos,
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
        />
      ))}

      <TempTodoItem tempTodo={tempTodo} />
    </>
  );
};
