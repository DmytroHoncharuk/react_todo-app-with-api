import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filteredTodos: Todo[];
  tempTodo: Todo | null;
  onDelete: (id: number) => void;
  deletingTodoId: number | null;
  updatingTodos: number[];
  setTempTodoTitle: (newTitle: string) => void;
  tempTodoTitle: string;
  updatingTodo: number | null;
  onDoubleClick: (id: number) => void;
  setUpdatingTodoId: (newId: number | null) => void;
  serverRequest: boolean;
  toggleTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  tempTodo,
  onDelete,
  deletingTodoId,
  updatingTodos,
  setTempTodoTitle,
  tempTodoTitle,
  updatingTodo,
  onDoubleClick,
  setUpdatingTodoId,
  serverRequest,
  toggleTodo,
}) => {
  return (
    <>
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          isDeleting={deletingTodoId === todo.id}
          isUpdating={updatingTodos.includes(todo.id)}
          isUpdatingTitle={updatingTodo === todo.id}
          tempTitle={tempTodoTitle}
          setTempTitle={setTempTodoTitle}
          onDoubleClick={onDoubleClick}
          setUpdatingTodoId={setUpdatingTodoId}
          isServerRequest={serverRequest}
          toggleTodo={toggleTodo}
        />
      ))}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          onDelete={() => {}}
          isDeleting={false}
          isUpdating={false}
          isUpdatingTitle={false}
          tempTitle=""
          setTempTitle={() => {}}
          onDoubleClick={() => {}}
          setUpdatingTodoId={() => {}}
          isServerRequest={false}
          toggleTodo={() => {}}
        />
      )}
    </>
  );
};
