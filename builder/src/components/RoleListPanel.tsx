import React, { useState } from 'react';
import { RoleLevel } from '../types/index';
import { generateId } from '../utils/framework';

interface RoleListPanelProps {
  roleLevels: RoleLevel[];
  selectedRoleId: string | null;
  onRolesChange: (roles: RoleLevel[]) => void;
  onSelectRole: (roleId: string | null) => void;
}

const RoleListPanel: React.FC<RoleListPanelProps> = ({
  roleLevels,
  selectedRoleId,
  onRolesChange,
  onSelectRole
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAddRole = () => {
    const newRole: RoleLevel = {
      id: generateId(),
      name: `Role Level ${roleLevels.length + 1}`,
      order: roleLevels.length
    };
    onRolesChange([...roleLevels, newRole]);
    onSelectRole(newRole.id);
  };

  const handleRemoveRole = (id: string) => {
    onRolesChange(roleLevels.filter(r => r.id !== id));
    if (selectedRoleId === id) {
      onSelectRole(null);
    }
  };

  const handleStartEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = (id: string) => {
    onRolesChange(
      roleLevels.map(r => r.id === id ? { ...r, name: editingName } : r)
    );
    setEditingId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  return (
    <div className="section">
      <div className="section-title">
        <span>Role Levels</span>
        <button onClick={handleAddRole} className="btn btn-small btn-primary">
          + Add
        </button>
      </div>
      {roleLevels.length === 0 ? (
        <div className="empty-state">No role levels yet. Add one to get started.</div>
      ) : (
        <div>
          {roleLevels.map(role => (
            <div
              key={role.id}
              className={`list-item ${selectedRoleId === role.id ? 'selected' : ''}`}
              onClick={() => onSelectRole(role.id)}
            >
              <div className="list-item-text">
                {editingId === role.id ? (
                  <input
                    autoFocus
                    type="text"
                    value={editingName}
                    onChange={e => setEditingName(e.target.value)}
                    onBlur={() => handleSaveEdit(role.id)}
                    onKeyDown={e => handleKeyDown(e, role.id)}
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <span
                    onDoubleClick={e => {
                      e.stopPropagation();
                      handleStartEdit(role.id, role.name);
                    }}
                  >
                    {role.name}
                  </span>
                )}
              </div>
              <div className="list-item-actions">
                <button
                  className="remove-btn"
                  onClick={e => {
                    e.stopPropagation();
                    handleRemoveRole(role.id);
                  }}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleListPanel;
