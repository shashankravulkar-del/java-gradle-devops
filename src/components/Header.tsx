import React, { useState } from 'react';
import { Download, Github, Terminal, Check } from 'lucide-react';
import { exportProjectAsZip } from '../utils/zipExporter';

interface HeaderProps {
  onOpenGitHubGuide: () => void;
  onScrollToCommands: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenGitHubGuide, onScrollToCommands }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await exportProjectAsZip();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Download failed', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-lg">
                JG
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-mono">
                  Java Gradle DevOps Application
                </h1>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span>Java 17</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Spring Boot 3.3.4</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Gradle 8.10</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>Docker</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>GitHub Actions CI</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onScrollToCommands}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Windows Commands</span>
            </button>

            <button
              onClick={onOpenGitHubGuide}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub Setup</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors rounded-lg shadow-sm cursor-pointer disabled:opacity-50"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{downloading ? 'Packing ZIP...' : 'Export Project (.ZIP)'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
