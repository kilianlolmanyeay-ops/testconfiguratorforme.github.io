import React from 'react';
import { Role, Channel, Category } from '../types/discord';

interface PermissionMatrixProps {
  roles: Role[];
  channels: Channel[];
  categories: Category[];
}

export const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ roles, channels }) => {
  return (
    <div className="bg-[#36393f] p-4 rounded overflow-auto h-full text-white">
      <h2 className="text-xl mb-4">Rechte-Matrix</h2>
      <table className="table-auto border-collapse border border-gray-500 w-full">
        <thead>
          <tr>
            <th className="border px-2 py-1">Kanal</th>
            {roles.map((role) => (
              <th key={role.id} className="border px-2 py-1">{role.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.id}>
              <td className="border px-2 py-1">{channel.name}</td>
              {roles.map((role) => (
                <td key={role.id} className="border px-2 py-1 text-center">
                  {/* Platzhalter für Erlaubt/Verweigert/Neutral */}
                  ✓
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};