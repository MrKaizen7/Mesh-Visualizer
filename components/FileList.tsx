import React from 'react';
import type { MeshFile } from '../App';
import { FileCodeIcon, GitHubIcon } from './Icons';

interface FileListProps {
    files: MeshFile[];
    selectedFile: MeshFile | null;
    repoName: string;
    onSelect: (file: MeshFile) => void;
    onReset: () => void;
}

const FileList: React.FC<FileListProps> = ({ files, selectedFile, repoName, onSelect, onReset }) => {

    const getFileExtension = (path: string) => {
        return path.split('.').pop()?.toUpperCase() || '';
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex-shrink-0 mb-6">
                <div className="flex items-center gap-3 text-sm font-bold text-zinc-200 mb-4 break-all p-3 bg-zinc-950/50 rounded-lg border border-zinc-800">
                    <GitHubIcon className="w-5 h-5 flex-shrink-0 text-zinc-500"/>
                    <span className="truncate">{repoName}</span>
                </div>
                 <button 
                    onClick={onReset}
                    className="w-full px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-1 focus:ring-zinc-500 text-xs uppercase tracking-wide border border-zinc-700 hover:border-zinc-600"
                >
                    ← Open Different Repo
                </button>
            </div>
            <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Assets</span>
                <span className="text-xs font-mono text-zinc-600">{files.length} found</span>
            </div>
            
            <ul className="flex-grow overflow-y-auto space-y-1 -mr-2 pr-2 custom-scrollbar">
                {files.map((file) => (
                    <li key={file.path}>
                        <button
                            onClick={() => onSelect(file)}
                            className={`w-full flex items-center gap-3 p-2.5 rounded-md text-left transition-all border ${
                                selectedFile?.path === file.path
                                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100 shadow-md scale-[1.02]'
                                    : 'bg-transparent text-zinc-400 border-transparent hover:bg-zinc-800/50 hover:text-zinc-200 hover:border-zinc-800'
                            }`}
                        >
                            <FileCodeIcon className={`w-4 h-4 flex-shrink-0 ${selectedFile?.path === file.path ? 'text-zinc-900' : 'text-zinc-600'}`} />
                            <span className="flex-grow truncate text-xs font-medium" title={file.path}>
                                {file.path}
                            </span>
                            <span className={`flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                selectedFile?.path === file.path
                                    ? 'bg-zinc-300 text-zinc-800'
                                    : 'bg-zinc-900 text-zinc-600'
                            }`}>
                                {getFileExtension(file.path)}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;