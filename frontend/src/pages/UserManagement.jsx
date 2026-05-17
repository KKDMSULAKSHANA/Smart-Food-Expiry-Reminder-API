import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser } from '../api';
import { Users, Mail, Plus, X } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setError(null);
    try {
      await createUser(formData);
      loadUsers();
      setIsFormOpen(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>User Management</h1>
          <p>Manage system users.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
          <Plus size={18} /> Add User
        </button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid-cards">
          {users.map(user => (
            <div key={user._id} className="card">
              <div className="card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--surface-color-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                  <Users size={24} />
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{user.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                    <Mail size={14} /> {user.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {users.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              No users found. Create the first user!
            </div>
          )}
        </div>
      )}

      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New User</h3>
              <button className="btn-icon" onClick={() => setIsFormOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            {error && <p style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  className="form-input" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  minLength="6"
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsFormOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={formLoading}>
                  {formLoading ? 'Saving...' : 'Save User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
