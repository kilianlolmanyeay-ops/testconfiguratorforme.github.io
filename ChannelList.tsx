// src/app/components/ChannelList.tsx
import React from 'react';
import { Role, Channel, Category } from '../types/discord';
import { getChannelTypeIcon, getChannelTypeName } from '../utils/discord-helpers';
import { LucideIcon, Lock, Plus } from 'lucide-react';

interface ChannelListProps {
  categories: Category[];
  channels: Channel[];
  roles: Role[];
  onCategoriesChange: (categories: Category[]) => void;
  onChannelsChange: (channels: Channel[]) => void;
  selectedChannelId: string | null;
  onChannelSelect: (id: string) => void;
  selectedCategoryId: string | null;
  onCategorySelect: (id: string) => void;
}

export const ChannelList: React.FC<ChannelListProps> = ({
  categories,
  channels,
  roles,
  onCategoriesChange,
  onChannelsChange,
  selectedChannelId,
  onChannelSelect,
  selectedCategoryId,
  onCategorySelect,
}) => {

  const handleCategoryClick = (id: string) => {
    onCategorySelect(id);
  };

  const handleChannelClick = (id: string) => {
    onChannelSelect(id);
  };

  return (
    <div className="w-1/3 bg-[#2b2d31] p-3 overflow-y-auto">
      {/* Kategorien */}
      {categories.map((category) => (
        <div key={category.id} className="mb-3">
          <div
            onClick={() => handleCategoryClick(category.id)}
            className={`cursor-pointer p-2 rounded ${
              selectedCategoryId === category.id ? 'bg-[#40444b]' : ''
            }`}
          >
            {category.name}
          </div>

          {/* Kanäle in Kategorie */}
          <div className="ml-4">
            {channels
              .filter((c) => c.categoryId === category.id)
              .map((channel) => (
                <div
                  key={channel.id}
                  onClick={() => handleChannelClick(channel.id)}
                  className={`cursor-pointer p-1 rounded flex items-center gap-2 ${
                    selectedChannelId === channel.id ? 'bg-[#40444b]' : ''
                  }`}
                >
                  <span>{getChannelTypeIcon(channel.type)}</span>
                  <span>{channel.name}</span>
                  {channel.nsfw && <span className="text-red-500 text-xs">NSFW</span>}
                  {/* Optional: Lock Icon für private Kanäle */}
                  {Object.keys(channel.permissions).length > 0 && <Lock size={12} />}
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Unkategorisierte Kanäle */}
      <div className="mb-3">
        <div className="text-gray-400 mb-1">Unkategorisierte Kanäle</div>
        {channels
          .filter((c) => !c.categoryId)
          .map((channel) => (
            <div
              key={channel.id}
              onClick={() => handleChannelClick(channel.id)}
              className={`cursor-pointer p-1 rounded flex items-center gap-2 ${
                selectedChannelId === channel.id ? 'bg-[#40444b]' : ''
              }`}
            >
              <span>{getChannelTypeIcon(channel.type)}</span>
              <span>{channel.name}</span>
              {channel.nsfw && <span className="text-red-500 text-xs">NSFW</span>}
              {Object.keys(channel.permissions).length > 0 && <Lock size={12} />}
            </div>
          ))}
      </div>
    </div>
  );
};