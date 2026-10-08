import React, { useState } from 'react';
import { X, Copy, Check, Github, ExternalLink, Terminal } from 'lucide-react';
import { exportProjectAsZip } from '../utils/zipExporter';

interface GitHubGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubGuideModal: React.FC<GitHubGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  if (!isOpen) return null;

  const copyText = (stepId: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const gitInitScript = `cd java-gradle-devops
git init
git branch -M main
git add .
git commit -m "feat: initial commit for Java Gradle DevOps application"`;

  const gitPushScript = `git remote add origin https://github.com/YOUR_USERNAME/java-gradle-devops.git
git push -u origin main`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 relative my-8 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Github className="w-5 h-5 text-white" />
            <h3 className="text-base font-semibold text-white font-mono">
              Export & GitHub Deployment Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-5 text-xs text-slate-300">
          {/* Step 1 */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-white font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-[10px]">1</span>
                Download & Extract Project ZIP
              </div>
              <button
                onClick={() => exportProjectAsZip()}
                className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded cursor-pointer transition-colors"
              >
                Download ZIP
              </button>
            </div>
            <p className="text-slate-400 text-[11px]">
              Extract <code className="text-cyan-300 font-mono">java-gradle-devops.zip</code> to your desired development workspace folder (e.g. <code className="text-slate-300 font-mono">C:\projects\java-gradle-devops</code>).
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-white font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-[10px]">2</span>
                Initialize Git Repository
              </div>
              <button
                onClick={() => copyText(2, gitInitScript)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
              >
                {copiedStep === 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>
            <pre className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre">
              {gitInitScript}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-white font-mono flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-[10px]">3</span>
                Create GitHub Repository & Push
              </div>
              <button
                onClick={() => copyText(3, gitPushScript)}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white cursor-pointer"
              >
                {copiedStep === 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>
            <p className="text-slate-400 text-[11px] mb-2">
              Create a new empty repository on <a href="https://github.com/new" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-2.5 h-2.5" /></a> (without initializing with README or .gitignore), then run:
            </p>
            <pre className="p-2.5 bg-slate-900 rounded font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre">
              {gitPushScript}
            </pre>
          </div>

          {/* Step 4 */}
          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800">
            <div className="font-semibold text-white font-mono flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center text-[10px]">4</span>
              Automatic CI/CD Pipeline Activation
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Once pushed to the <code className="text-white font-mono">main</code> branch, GitHub Actions will detect <code className="text-emerald-300 font-mono">.github/workflows/build.yml</code>, set up Java 17 Temurin, run all Gradle unit tests, assemble the bootable JAR, and archive the build artifacts under the repository&apos;s <strong>Actions</strong> tab.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
