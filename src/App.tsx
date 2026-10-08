/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { StatusDashboard } from './components/StatusDashboard';
import { TechStackCards } from './components/TechStackCards';
import { DevOpsInfoSection } from './components/DevOpsInfoSection';
import { FileExplorer } from './components/FileExplorer';
import { WindowsCommandsSection } from './components/WindowsCommandsSection';
import { GitHubGuideModal } from './components/GitHubGuideModal';
import { Terminal, Shield, GitBranch, ArrowRight, Download } from 'lucide-react';
import { exportProjectAsZip } from './utils/zipExporter';

export default function App() {
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);

  const scrollToCommands = () => {
    const el = document.getElementById('windows-commands');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Header
        onOpenGitHubGuide={() => setIsGitHubModalOpen(true)}
        onScrollToCommands={scrollToCommands}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>DevOps Portfolio Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
              Production Java Spring Boot with Gradle & CI/CD
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              A complete, self-contained reference project engineered for modern containerized delivery. Includes automated Gradle builds, JUnit unit and integration tests, Docker multi-stage optimization, centralized error handling, and GitHub Actions CI automation.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              <button
                onClick={() => exportProjectAsZip()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors rounded-lg cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export ZIP Package</span>
              </button>
              <button
                onClick={scrollToCommands}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg border border-slate-700 cursor-pointer"
              >
                <span>View Windows PowerShell Commands</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. Live Application & Health Telemetry Dashboard */}
        <StatusDashboard />

        {/* 2. Technology Stack Architecture */}
        <TechStackCards />

        {/* 3. Deep Dive DevOps Specifications (Gradle, Docker, CI/CD) */}
        <DevOpsInfoSection />

        {/* 4. Complete Project File Structure & Code Viewer */}
        <FileExplorer />

        {/* 5. Exact Windows PowerShell Commands Reference */}
        <WindowsCommandsSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Java Gradle DevOps Application · Independent Portfolio Project</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Java 17 LTS</span>
            <span aria-hidden="true">·</span>
            <span>Spring Boot 3.3.4</span>
            <span aria-hidden="true">·</span>
            <span>Gradle 8.10.2</span>
            <span aria-hidden="true">·</span>
            <span>Docker</span>
            <span aria-hidden="true">·</span>
            <span>GitHub Actions</span>
          </div>
        </div>
      </footer>

      {/* GitHub Deployment Modal */}
      <GitHubGuideModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />
    </div>
  );
}
