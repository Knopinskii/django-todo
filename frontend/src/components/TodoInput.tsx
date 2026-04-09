interface Props {
  value: string;
  onChange: (value: string) => void;
  onAdd: () => void;
}

export function TodoInput({ value, onChange, onAdd }: Props) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        placeholder="Новая задача..."
        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
      />
      <button
        onClick={onAdd}
        className="px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 active:scale-95 transition-all shadow-sm"
      >
        Добавить
      </button>
    </div>
  );
}
