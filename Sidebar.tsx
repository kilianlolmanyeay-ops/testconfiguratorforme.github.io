import React from 'react';

interface SidebarProps {
  activeView: 'roles' | 'channels' | 'permissions' | 'preview' | 'export';
  onViewChange: (view: SidebarProps['activeView']) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems = [
    { id: 'roles', label: 'Rollen' },
    { id: 'channels', label: 'Kanäle' },
    { id: 'permissions', label: 'Rechte' },
    { id: 'preview', label: 'Vorschau' },
    { id: 'export', label: 'Export' },
  ];

  return (
    <div className="w-48 bg-[#2b2d31] text-white flex flex-col">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id as any)}
          className={`p-4 text-left hover:bg-[#40444b] ${
            activeView === item.id ? 'bg-[#40444b] font-bold' : ''
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};