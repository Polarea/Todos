import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
function useCorrelationId() {
    const [id, setId] = React.useState(null);
    React.useEffect(() => {
        const existing = window.__corrId;
        if (existing)
            setId(existing);
        else {
            const gen = crypto.randomUUID();
            window.__corrId = gen;
            setId(gen);
        }
    }, []);
    return id;
}
export const App = () => {
    const cid = useCorrelationId();
    const [todos, setTodos] = React.useState([]);
    React.useEffect(() => {
        fetch('http://localhost:4001/todos', { headers: cid ? { 'x-correlation-id': cid } : {} })
            .then((r) => r.json())
            .then(setTodos)
            .catch(console.error);
    }, [cid]);
    return (_jsxs("div", { style: { fontFamily: 'system-ui', margin: 24 }, children: [_jsx("h1", { children: "Todos" }), _jsxs("p", { children: ["Correlation ID: ", cid] }), _jsx("ul", { children: todos.map((t) => (_jsx("li", { children: t.title }, t.id))) })] }));
};
