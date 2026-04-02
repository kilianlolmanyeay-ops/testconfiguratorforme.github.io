import React from 'react';
import { Channel, Category, Role } from '../types/discord';

interface ChannelEditorProps {
  channel: Channel | null;
  category: Category | null;
  roles: Role[];
  onChannelUpdate: (channel: Channel) => void;
  onCategoryUpdate: (category: Category) => void;
}

export const ChannelEditor: React.FC<ChannelEditorProps> = ({ channel }) => {
  if (!channel) return <div className="text-white">Kein Kanal ausgewählt</div>;

  return (
    <div className="flex-1 bg-[#36393f] p-4 rounded">
      <h2 className="text-white text-xl mb-4">{channel.name}</h2>
      <p className="text-white">Typ: {channel.type}</p>
      <p className="text-white">Kategorie: {channel.categoryId || 'Keine'}</p>
    </div>
  );
};