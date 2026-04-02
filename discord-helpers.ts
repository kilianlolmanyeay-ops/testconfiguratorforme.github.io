import { PERMISSIONS, ChannelType, Permission } from '../types/discord';

export function getPermissionsForChannelType(channelType: ChannelType | null): Permission[] {
  if (!channelType) return [];

  return PERMISSIONS.filter(perm => {
    if (perm.category === 'server' || perm.category === 'other') return true;
    if (perm.channelTypes) return perm.channelTypes.includes(channelType);
    return false;
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function getChannelTypeIcon(type: ChannelType): string {
  switch (type) {
    case 'text': return 'hash';
    case 'voice': return 'volume-2';
    case 'stage': return 'radio';
    case 'forum': return 'message-square';
    case 'announcement': return 'megaphone';
  }
}

export function getChannelTypeName(type: ChannelType): string {
  switch (type) {
    case 'text': return 'Text-Kanal';
    case 'voice': return 'Voice-Kanal';
    case 'stage': return 'Stage-Kanal';
    case 'forum': return 'Forum';
    case 'announcement': return 'Ankündigungs-Kanal';
  }
}