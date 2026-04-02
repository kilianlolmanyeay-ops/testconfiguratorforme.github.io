// src/app/App.tsx
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sidebar } from './components/Sidebar';
import { RoleEditor } from './components/RoleEditor';
import { ChannelList } from './components/ChannelList';
import { ChannelEditor } from './components/ChannelEditor';
import { PermissionMatrix } from './components/PermissionMatrix';
import { PreviewMode } from './components/PreviewMode';
import { ExportDialog } from './components/ExportDialog';
import { Role, Channel, Category, ServerConfig } from './types/discord';
import { generateId } from './utils/discord-helpers';
import { DEFAULT_EVERYONE_PERMISSIONS } from './types/discord';

export default function App() {
  const [activeView, setActiveView] = useState<'roles' | 'channels' | 'permissions' | 'preview' | 'export'>('roles');

  const [roles, setRoles] = useState<Role[]>([
    {
      id: generateId(),
      name: '@everyone',
      color: '#99aab5',
      position: 0,
      permissions: DEFAULT_EVERYONE_PERMISSIONS.reduce((acc, perm) => {
        acc[perm] = true;
        return acc;
      }, {} as Record<string, boolean>),
    },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: generateId(), name: 'Allgemein', position: 0, permissions: {} },
  ]);

  const [channels, setChannels] = useState<Channel[]>([
    { id: generateId(), name: 'allgemein', type: 'text', categoryId: null, position: 0, nsfw: false, syncWithCategory: false, permissions: {} },
    { id: generateId(), name: 'voice', type: 'voice', categoryId: null, position: 1, nsfw: false, syncWithCategory: false, permissions: {} },
  ]);

  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const serverConfig: ServerConfig = { name: 'Mein Discord Server', roles, categories, channels };

  const updateChannel = (updatedChannel: Channel) => {
    setChannels(channels.map(c => (c.id === updatedChannel.id ? updatedChannel : c)));
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories(categories.map(c => (c.id === updatedCategory.id ? updatedCategory : c)));
  };

  const selectedChannel = channels.find(c => c.id === selectedChannelId) || null;
  const selectedCategory = categories.find(c => c.id === selectedCategoryId) || null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen bg-[#313338] flex overflow-hidden">
        <Sidebar activeView={activeView} onViewChange={setActiveView} />
        <div className="flex-1 p-4 overflow-hidden">
          {activeView === 'roles' && <RoleEditor roles={roles} onRolesChange={setRoles} />}
          {activeView === 'channels' && (
            <div className="flex gap-4 h-full">
              <ChannelList
                categories={categories}
                channels={channels}
                roles={roles}
                onCategoriesChange={setCategories}
                onChannelsChange={setChannels}
                selectedChannelId={selectedChannelId}
                onChannelSelect={(id) => {
                  setSelectedChannelId(id);
                  setSelectedCategoryId(null);
                }}
                selectedCategoryId={selectedCategoryId}
                onCategorySelect={(id) => {
                  setSelectedCategoryId(id);
                  setSelectedChannelId(null);
                }}
              />
              <ChannelEditor
                channel={selectedChannel}
                category={selectedCategory}
                roles={roles}
                onChannelUpdate={updateChannel}
                onCategoryUpdate={updateCategory}
              />
            </div>
          )}
          {activeView === 'permissions' && <PermissionMatrix roles={roles} channels={channels} categories={categories} />}
          {activeView === 'preview' && <PreviewMode roles={roles} channels={channels} categories={categories} />}
          {activeView === 'export' && <ExportDialog config={serverConfig} />}
        </div>
      </div>
    </DndProvider>
  );
}