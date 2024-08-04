import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const Todos = () => {

    const [todo, setTodo] = useState('');

    const queryClient = useQueryClient();

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:3000/todos');
        return response.data;
    }

    const addTodo = async () => {
        console.log(todo);
        const response = await axios.post('http://localhost:3000/todos', { todo });
        console.log(response);
        // mutation.mutate();
        setTodo('');
    }

    const { isPending, error, data: todos } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    const mutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            // Invalidate and refetch
            setTodo('');
            queryClient.invalidateQueries(['todos']);
        }
    });

    const updateTodo = (e) => {
        setTodo(e.target.value);
        console.log(todo);
    }

    const checkDB = async () => {
        try {
            const response = await axios.get('http://localhost:3000/');
            console.log(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    // checkDB();

    return (
        <div>
            <h4>Todos</h4>
            {/* input todos */ }
            <form action="">
                <input
                    type="text"
                    onChange={ (e) => updateTodo(e) }
                    value={ todo }
                />
                <button onClick={
                    (e) => {
                        e.preventDefault();
                        mutation.mutate(todo);
                    }
                } >Add</button>

                { mutation.isLoading && <p>Adding...</p> }
                { mutation.isError && <p>Error: { mutation.error.message }</p> }
                { mutation.isSuccess && <p>Todo added successfully!</p> }
            </form>
            {/* output todos */ }
            <ol>
                { isPending && <li>Loading...</li> }
                { error && <li>Error: { error.message }</li> }
                { todos && todos.toReversed().map((todo) => <li key={ todo.id }>{ todo.title }</li>) }
            </ol>

        </div>
    );
}

export default Todos;