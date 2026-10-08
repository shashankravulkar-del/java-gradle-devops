import React, { useState } from 'react';
import { PROJECT_FILES, ProjectFile } from '../data/projectFiles';
import { FileText, Folder, Copy, Check, Download, ChevronRight, Code } from 'lucide-react';
import { downloadSingleFile, exportProjectAsZip } from '../utils/zipExporter';

export const FileExplorer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ProjectFile>(PROJECT_FILES[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const filteredFiles = categoryFilter === 'all'
    ? PROJECT_FILES
    : PROJECT_FILES.filter(f => f.category === categoryFilter);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    downloadSingleFile(selectedFile.name, selectedFile.content);
  };

  const handleExportZip = async () => {
    setExporting(true);
    try {
      await exportProjectAsZip();
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden mb-10">
      {/* Explorer Header */}
      <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-semibold text-white font-mono">
              Project Structure & Source Inspector
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Browse and inspect every configuration and source code file in <code className="text-cyan-300 font-mono">java-gradle-devops/</code>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportZip}
            disabled={exporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exporting ? 'Exporting...' : 'Download Complete ZIP'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-slate-500 font-mono text-[11px] mr-2">Filter:</span>
        {[
          { id: 'all', label: 'All Files' },
          { id: 'build', label: 'Build & Wrapper' },
          { id: 'source', label: 'Java Source' },
          { id: 'test', label: 'Unit Tests' },
          { id: 'docker', label: 'Docker' },
          { id: 'ci', label: 'GitHub CI' },
          { id: 'doc', label: 'Docs & Git' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
              categoryFilter === cat.id
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main 2-Column Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left: File Tree List */}
        <div className="lg:col-span-4 border-r border-slate-800 bg-slate-950/60 p-3 overflow-y-auto max-h-[600px]">
          <div className="text-[11px] font-mono text-slate-500 px-3 py-1.5 uppercase tracking-wider">
            Repository Files ({filteredFiles.length})
          </div>
          <div className="space-y-1 mt-1">
            {filteredFiles.map((file) => {
              const isSelected = selectedFile.path === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-colors flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800 text-cyan-300 font-medium border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
                    <span className="truncate">{file.path}</span>
                  </div>
                  <ChevronRight className={`w-3 h-3 shrink-0 ${isSelected ? 'text-cyan-400' : 'opacity-0 group-hover:opacity-100 text-slate-500'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Code Viewer */}
        <div className="lg:col-span-8 flex flex-col bg-slate-950 max-h-[600px]">
          {/* File Info Header */}
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-900/60">
            <div className="truncate">
              <div className="flex items-center gap-2">
                <Code className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-xs font-mono text-white font-semibold truncate">
                  java-gradle-devops/{selectedFile.path}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                {selectedFile.description}
              </p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyCode}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Copy file contents"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleDownloadSingle}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                title="Download this file"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Code Window with Line Numbers */}
          <div className="p-4 overflow-auto flex-1 font-mono text-xs text-slate-200 leading-relaxed bg-slate-950 select-text">
            <pre className="overflow-x-auto whitespace-pre">
              <code>{selectedFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
