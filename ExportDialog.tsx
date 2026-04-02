import React from 'react';
import { ServerConfig } from '../types/discord';

interface ExportDialogProps {
  config: ServerConfig;
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ config }) => {
  return (
    <div className="bg-[#36393f] p-4 rounded h-full text-white overflow-auto">
      <h2 className="text-xl mb-4">Export</h2>
      <pre className="bg-[#2f3136] p-2 rounded overflow-auto">{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
};