import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

export function TodoList({ todos, loading, error, onToggle, onDelete }: Props) {
  if (loading) {
    return <div className="text-center text-gray-400 text-sm py-10">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 text-sm py-10">{error}</div>;
  }

  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-400 text-sm py-10">
        Задач пока нет. Добавь первую!
      </div>
    );
  }

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="space-y-2">
      {pending.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}

      {pending.length > 0 && done.length > 0 && (
        <div className="flex items-center gap-2 py-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">выполнено</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}

      {done.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
