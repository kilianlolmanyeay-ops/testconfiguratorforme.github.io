import React from 'react';
import { Role } from '../types/discord';

interface RoleEditorProps {
  roles: Role[];
  onRolesChange: (roles: Role[]) => void;
}

export const RoleEditor: React.FC<RoleEditorProps> = ({ roles, onRolesChange }) => {
  return (
    <div className="bg-[#36393f] p-4 rounded-md h-full overflow-auto">
      <h2 className="text-white text-xl mb-4">Rollen</h2>
      {roles.map((role) => (
        <div key={role.id} className="bg-[#2f3136] p-2 mb-2 rounded flex justify-between items-center">
          <span className="text-white">{role.name}</span>
        </div>
      ))}
    </div>
  );
};