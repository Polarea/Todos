import React from 'react';

function useCorrelationId() {
  const [id, setId] = React.useState<string | null>(null);
  React.useEffect(() => {
    const existing = (window as any).__corrId;
    if (existing) setId(existing);
    else {
      const gen = crypto.randomUUID();
      (window as any).__corrId = gen;
      setId(gen);
    }
  }, []);
  return id;
}

export const App: React.FC = () => {
  const cid = useCorrelationId();
  const [todos, setTodos] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:4001/todos', { headers: cid ? { 'x-correlation-id': cid } : {} })
      .then((r) => r.json())
      .then(setTodos)
      .catch(console.error);
  }, [cid]);

  return (
    <div style={{ fontFamily: 'system-ui', margin: 24 }}>
      <h1>Todos</h1>
      <p>Correlation ID: {cid}</p>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
};
