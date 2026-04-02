// src/app/components/PreviewMode.tsx
import React from 'react';
import { Role, Channel, Category } from '../types/discord';

interface PreviewModeProps {
  roles: Role[];
  channels: Channel[];
  categories: Category[];
}

export const PreviewMode: React.FC<PreviewModeProps> = ({ roles, channels, categories }) => {
  return (
    <div className="bg-[#36393f] p-4 rounded overflow-auto h-full text-white">
      <h2 className="text-xl mb-4">Preview Mode</h2>
      
      <div className="mb-4">
        <h3 className="text-lg mb-2">Rollen</h3>
        <ul className="list-disc ml-5">
          {roles.map((role) => (
            <li key={role.id}>{role.name}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="text-lg mb-2">Kategorien & Kanäle</h3>
        {categories.map((category) => (
          <div key={category.id} className="mb-2">
            <strong>{category.name}</strong>
            <ul className="ml-5">
              {channels
                .filter((c) => c.categoryId === category.id)
                .map((channel) => (
                  <li key={channel.id}>
                    {channel.name} {channel.nsfw && <span className="text-red-500">(NSFW)</span>}
                  </li>
                ))}
            </ul>
          </div>
        ))}

        {/* Unkategorisierte Kanäle */}
        <div>
          <strong>Unkategorisierte Kanäle</strong>
          <ul className="ml-5">
            {channels
              .filter((c) => !c.categoryId)
              .map((channel) => (
                <li key={channel.id}>
                  {channel.name} {channel.nsfw && <span className="text-red-500">(NSFW)</span>}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};