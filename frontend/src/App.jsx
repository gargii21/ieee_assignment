import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/getUsers');
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5000/createUsers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setFormData({ name: '', email: '', password: '' });
    setShowForm(false);
    fetchUsers(); // refresh data
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Users</h1>
      </header>
      <main className="content">
        <div className="card-container">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="card">
                <div className="card-header">User Details</div>
                <div className="card-body">
                  <p><span>Name:</span> {user.name}</p>
                  <p><span>Email:</span> {user.email}</p>
                  <p><span>Joined:</span> {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-users">No users found</p>
          )}
        </div>

        <div className="action-section">
          <button className="primary-button" onClick={() => setShowForm(true)}>
            Register New User
          </button>
        </div>
      </main>

      {/* Popup Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Register New User</h2>
              <button className="close-button" onClick={() => setShowForm(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit} className="user-form">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    id="name"
                    name="name" 
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    id="email"
                    name="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input 
                    id="password"
                    name="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                  />
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
                  <button type="submit" className="submit-button">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
