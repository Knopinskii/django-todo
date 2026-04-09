import { useState, useEffect } from "react";
import type { Todo } from "./types";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";
import { LoginPage } from "./components/LoginPage";

const API_URL = "http://localhost:8000/todos/";

function App() {
  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem("token")
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setTodos([]);
  };

  if (!token) return <LoginPage onLogin={handleLogin} />;

  useEffect(() => {
    fetch(API_URL, { headers: { Authorization: `Token ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Не удалось загрузить задачи");
        setLoading(false);
      });
  }, []);

  const addTodo = async () => {
    const title = input.trim();
    if (!title) return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Token ${token}` },
      body: JSON.stringify({ title, done: false }),
    });
    if (res.ok) {
      const todo = await res.json();
      setTodos((prev) => [...prev, todo]);
      setInput("");
    }
  };

  const toggleTodo = async (todo: Todo) => {
    const res = await fetch(`${API_URL}${todo.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Token ${token}` },
      body: JSON.stringify({ done: !todo.done }),
    });
    if (res.ok) {
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t))
      );
    }
  };

  const deleteTodo = async (id: number) => {
    const res = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
      headers: { Authorization: `Token ${token}` },
    });
    if (res.ok) {
      setTodos((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const pending = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-lg">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Мои задачи</h1>
            <p className="text-gray-400 mt-1 text-sm">
              {pending.length} осталось · {done.length} выполнено
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
          >
            Выйти
          </button>
        </div>

        <TodoInput value={input} onChange={setInput} onAdd={addTodo} />

        <TodoList
          todos={todos}
          loading={loading}
          error={error}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
