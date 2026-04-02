export type ChannelType = 'text' | 'voice' | 'stage' | 'forum' | 'announcement';

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'server' | 'text' | 'voice' | 'other';
  dangerous?: boolean;
  channelTypes?: ChannelType[];
}

export interface Role {
  id: string;
  name: string;
  color: string;
  position: number;
  permissions: Record<string, boolean>;
}

export interface Channel {
  id: string;
  name: string;
  type: ChannelType;
  categoryId: string | null;
  position: number;
  nsfw: boolean;
  syncWithCategory: boolean;
  permissions: Record<string, Record<string, boolean>>; // roleId -> permissionId -> allowed
  userLimit?: number;
}

export interface Category {
  id: string;
  name: string;
  position: number;
  permissions: Record<string, Record<string, boolean>>;
}

export interface ServerConfig {
  name: string;
  roles: Role[];
  categories: Category[];
  channels: Channel[];
}

export const PERMISSIONS: Permission[] = [
  // Server Permissions
  { id: 'CREATE_INSTANT_INVITE', name: 'Einladungen erstellen', description: 'Erlaubt das Erstellen von Einladungslinks', category: 'server' },
  { id: 'KICK_MEMBERS', name: 'Mitglieder kicken', description: 'Erlaubt das Kicken von Mitgliedern', category: 'server', dangerous: true },
  { id: 'BAN_MEMBERS', name: 'Mitglieder bannen', description: 'Erlaubt das Bannen von Mitgliedern', category: 'server', dangerous: true },
  { id: 'ADMINISTRATOR', name: 'Administrator', description: 'Vollständige Kontrolle über den Server', category: 'server', dangerous: true },
  { id: 'MANAGE_CHANNELS', name: 'Kanäle verwalten', description: 'Erlaubt das Erstellen, Bearbeiten und Löschen von Kanälen', category: 'server', dangerous: true },
  { id: 'MANAGE_GUILD', name: 'Server verwalten', description: 'Erlaubt das Bearbeiten der Server-Einstellungen', category: 'server', dangerous: true },
  { id: 'MANAGE_ROLES', name: 'Rollen verwalten', description: 'Erlaubt das Erstellen und Bearbeiten von Rollen', category: 'server', dangerous: true },
  { id: 'VIEW_GUILD_INSIGHTS', name: 'Server-Einblicke ansehen', description: 'Erlaubt das Ansehen von Server-Statistiken', category: 'server' },
  { id: 'VIEW_AUDIT_LOG', name: 'Audit-Log anzeigen', description: 'Erlaubt das Ansehen des Audit-Logs', category: 'server' },
  { id: 'CHANGE_NICKNAME', name: 'Nickname ändern', description: 'Erlaubt das Ändern des eigenen Nicknames', category: 'server' },
  { id: 'MANAGE_NICKNAMES', name: 'Nicknames anderer verwalten', description: 'Erlaubt das Ändern der Nicknames anderer', category: 'server' },

  // Text Permissions
  { id: 'VIEW_CHANNEL', name: 'Kanal anzeigen', description: 'Erlaubt das Sehen des Kanals', category: 'text', channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'SEND_MESSAGES', name: 'Nachrichten senden', description: 'Erlaubt das Senden von Nachrichten', category: 'text', channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'SEND_TTS_MESSAGES', name: 'TTS-Nachrichten senden', description: 'Erlaubt das Senden von Text-to-Speech Nachrichten', category: 'text', channelTypes: ['text'] },
  { id: 'MANAGE_MESSAGES', name: 'Nachrichten verwalten', description: 'Erlaubt das Löschen und Anheften von Nachrichten', category: 'text', dangerous: true, channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'EMBED_LINKS', name: 'Links einbetten', description: 'Erlaubt das Einbetten von Links', category: 'text', channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'ATTACH_FILES', name: 'Dateien anhängen', description: 'Erlaubt das Hochladen von Dateien', category: 'text', channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'READ_MESSAGE_HISTORY', name: 'Nachrichtenverlauf lesen', description: 'Erlaubt das Lesen älterer Nachrichten', category: 'text', channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'MENTION_EVERYONE', name: '@everyone/@here verwenden', description: 'Erlaubt @everyone und @here Erwähnungen', category: 'text', dangerous: true, channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'USE_EXTERNAL_EMOJIS', name: 'Externe Emojis verwenden', description: 'Erlaubt die Verwendung externer Emojis', category: 'text', channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'USE_EXTERNAL_STICKERS', name: 'Externe Sticker verwenden', description: 'Erlaubt die Verwendung externer Sticker', category: 'text', channelTypes: ['text', 'forum', 'announcement'] },
  { id: 'SEND_MESSAGES_IN_THREADS', name: 'Nachrichten in Threads senden', description: 'Erlaubt das Senden von Nachrichten in Threads', category: 'text', channelTypes: ['text', 'forum'] },
  { id: 'CREATE_PUBLIC_THREADS', name: 'Öffentliche Threads erstellen', description: 'Erlaubt das Erstellen öffentlicher Threads', category: 'text', channelTypes: ['text', 'forum'] },
  { id: 'CREATE_PRIVATE_THREADS', name: 'Private Threads erstellen', description: 'Erlaubt das Erstellen privater Threads', category: 'text', channelTypes: ['text'] },
  { id: 'ADD_REACTIONS', name: 'Reaktionen hinzufügen', description: 'Erlaubt das Hinzufügen von Reaktionen', category: 'text', channelTypes: ['text', 'forum', 'announcement'] },

  // Voice Permissions
  { id: 'CONNECT', name: 'Verbinden', description: 'Erlaubt das Beitreten von Voice-Kanälen', category: 'voice', channelTypes: ['voice', 'stage'] },
  { id: 'SPEAK', name: 'Sprechen', description: 'Erlaubt das Sprechen in Voice-Kanälen', category: 'voice', channelTypes: ['voice'] },
  { id: 'PRIORITY_SPEAKER', name: 'Priority Speaker', description: 'Stimme ist lauter als andere', category: 'voice', channelTypes: ['voice'] },
  { id: 'STREAM', name: 'Streamen (Go Live)', description: 'Erlaubt das Streamen', category: 'voice', channelTypes: ['voice'] },
  { id: 'MUTE_MEMBERS', name: 'Andere stummschalten', description: 'Erlaubt das Stummschalten anderer', category: 'voice', dangerous: true, channelTypes: ['voice', 'stage'] },
  { id: 'DEAFEN_MEMBERS', name: 'Andere taubstellen', description: 'Erlaubt das Taubstellen anderer', category: 'voice', dangerous: true, channelTypes: ['voice', 'stage'] },
  { id: 'MOVE_MEMBERS', name: 'Mitglieder verschieben', description: 'Erlaubt das Verschieben von Mitgliedern zwischen Kanälen', category: 'voice', dangerous: true, channelTypes: ['voice', 'stage'] },
  { id: 'USE_VAD', name: 'Voice-Aktivitätserkennung verwenden', description: 'Erlaubt die Verwendung von Voice-Aktivität', category: 'voice', channelTypes: ['voice'] },
  { id: 'REQUEST_TO_SPEAK', name: 'Anfragen zu sprechen (Stage)', description: 'Erlaubt das Anfordern zu sprechen in Stage-Kanälen', category: 'voice', channelTypes: ['stage'] },
  { id: 'USE_SOUNDBOARD', name: 'Soundboard verwenden', description: 'Erlaubt die Verwendung des Soundboards', category: 'voice', channelTypes: ['voice'] },
  { id: 'SEND_VOICE_MESSAGES', name: 'Voice-Nachrichten senden', description: 'Erlaubt das Senden von Voice-Nachrichten', category: 'voice', channelTypes: ['voice'] },

  // Other Permissions
  { id: 'USE_APPLICATION_COMMANDS', name: 'Anwendungen benutzen (Slash-Commands, Bots)', description: 'Erlaubt die Verwendung von Slash-Commands', category: 'other' },
  { id: 'MANAGE_EVENTS', name: 'Veranstaltungen verwalten', description: 'Erlaubt das Verwalten von Events', category: 'other' },
  { id: 'CREATE_EVENTS', name: 'Eigene Events erstellen', description: 'Erlaubt das Erstellen von Events', category: 'other' },
  { id: 'MANAGE_EMOJIS_AND_STICKERS', name: 'Eigene Emojis/Sticker/Sounds erstellen', description: 'Erlaubt das Verwalten von Emojis und Stickern', category: 'other' },
  { id: 'MODERATE_MEMBERS', name: 'Moderieren (Timeout)', description: 'Erlaubt das Timeouten von Mitgliedern', category: 'other', dangerous: true },
  { id: 'VIEW_CREATOR_MONETIZATION_ANALYTICS', name: 'Monetarisierungs-Einblicke ansehen', description: 'Erlaubt das Ansehen von Monetarisierungs-Statistiken', category: 'other' },
  { id: 'SEND_POLLS', name: 'Umfragen senden', description: 'Erlaubt das Erstellen von Umfragen', category: 'other' },
  { id: 'USE_EXTERNAL_APPS', name: 'Externe Apps verwenden', description: 'Erlaubt die Verwendung externer Apps', category: 'other' },
  { id: 'MANAGE_WEBHOOKS', name: 'Webhooks verwalten', description: 'Erlaubt das Verwalten von Webhooks', category: 'other', dangerous: true },
];

export const DEFAULT_EVERYONE_PERMISSIONS = [
  'VIEW_CHANNEL',
  'SEND_MESSAGES',
  'EMBED_LINKS',
  'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',
  'ADD_REACTIONS',
  'CONNECT',
  'SPEAK',
  'USE_VAD',
];