import React, { useState } from 'react';
import { GitHubIcon, LoaderIcon } from './Icons';

interface RepoFormProps {
    onSubmit: (url: string) => void;
    isLoading: boolean;
    recentRepos: string[];
}

const RepoForm: React.FC<RepoFormProps> = ({ onSubmit, isLoading, recentRepos }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            onSubmit(url.trim());
        }
    };

    const handleRecentClick = (repoUrl: string) => {
        setUrl(repoUrl);
        onSubmit(repoUrl);
    };

    return (
        <div className="w-full max-w-xl flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-grow w-full group">
                    <GitHubIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors pointer-events-none" />
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://github.com/user/repo"
                        className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-all shadow-inner"
                        aria-label="GitHub Repository URL"
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-bold rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <LoaderIcon className="w-5 h-5 animate-spin" />
                            <span>...</span>
                        </>
                    ) : (
                        'LOAD'
                    )}
                </button>
            </form>

            {recentRepos.length > 0 && (
                <div className="w-full flex flex-col items-center sm:items-start animate-in fade-in slide-in-from-top-1">
                    <span className="text-xs font-mono text-zinc-500 mb-2 uppercase tracking-widest">Recent Repositories</span>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {recentRepos.map((repo) => {
                             // Extract simple name for display if possible
                             const display = repo.replace('https://github.com/', '').replace('git@github.com:', '').replace('.git', '');
                             return (
                                <button
                                    key={repo}
                                    type="button"
                                    disabled={isLoading}
                                    onClick={() => handleRecentClick(repo)}
                                    className="px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 rounded-full transition-all duration-200 truncate max-w-[200px]"
                                    title={repo}
                                >
                                    {display}
                                </button>
                             )
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepoForm;