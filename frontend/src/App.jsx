// App.jsx

import { useCallback } from 'react';
import { useEffect, useState } from 'react';

export default function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    Emp_id: '',
  });

  const fetchUsers = useCallback(async () => {
  try {
    const res = await fetch(`${apiUrl}/users`);
    const data = await res.json();
    setUsers(data.users);
  } catch (error) {
    console.log(error);
  }
}, [apiUrl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log(data);

      setForm({
        name: '',
        email: '',
        Emp_id: '',
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Employee Management</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="Emp_id"
          placeholder="Employee ID"
          value={form.Emp_id}
          onChange={handleChange}
        />

        <button type="submit">Add</button>
      </form>

      <h2>Total User: {users.length}</h2>

      {users.map((user) => (
        <div key={user._id} className="">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.Emp_id}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
