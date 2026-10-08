import React, { useState } from 'react';
import { Layers, Container, GitMerge, FileCode, CheckCircle, ShieldCheck } from 'lucide-react';

export const DevOpsInfoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gradle' | 'docker' | 'cicd'>('gradle');

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 mb-10">
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-white font-mono">
            DevOps Blueprint & Operational Specifications
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            In-depth architectural mechanisms for build automation, containerization, and CI/CD
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('gradle')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'gradle'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gradle Build</span>
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'docker'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Container className="w-3.5 h-3.5 text-blue-400" />
            <span>Docker Container</span>
          </button>
          <button
            onClick={() => setActiveTab('cicd')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              activeTab === 'cicd'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
            <span>GitHub Actions CI</span>
          </button>
        </div>
      </div>

      {/* Tab Content: Gradle */}
      {activeTab === 'gradle' && (
        <div className="pt-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2 mb-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                How the Gradle Wrapper Works
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The Gradle Wrapper (<code className="text-cyan-300 font-mono">./gradlew</code> on Linux/macOS and <code className="text-cyan-300 font-mono">.\gradlew.bat</code> on Windows) is a lightweight bootstrap script. When invoked, it checks for the Gradle runtime declared in <code className="text-slate-400 font-mono">gradle/wrapper/gradle-wrapper.properties</code>. If missing, it downloads Gradle 8.10.2 automatically to your user cache.
              </p>
              <div className="mt-3 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-slate-500"># Windows PowerShell Execution:</span><br />
                .\gradlew.bat build
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Gradle Dependency & Task Graph
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Gradle constructs a Directed Acyclic Graph (DAG) before executing tasks. Tasks evaluate input and output hashes; unchanged code skips compilation via <code className="text-emerald-300 font-mono">UP-TO-DATE</code>.
              </p>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono font-bold">·</span>
                  <span><strong className="text-white font-mono">implementation</strong>: Internal dependencies like Spring Boot Starter Web.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono font-bold">·</span>
                  <span><strong className="text-white font-mono">testImplementation</strong>: JUnit 5 test harness excluded from the production JAR.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-mono font-bold">·</span>
                  <span><strong className="text-white font-mono">bootJar</strong>: Assembles an executable Uber-JAR with embedded Tomcat.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Essential Gradle Task Reference
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800/80">
                <span className="font-mono text-cyan-300 font-medium">.\gradlew.bat compileJava</span>
                <p className="text-[11px] text-slate-400 mt-1">Compiles Java source files to bytecode in build/classes</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800/80">
                <span className="font-mono text-cyan-300 font-medium">.\gradlew.bat test</span>
                <p className="text-[11px] text-slate-400 mt-1">Executes JUnit test suites and renders HTML test reports</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800/80">
                <span className="font-mono text-cyan-300 font-medium">.\gradlew.bat bootJar</span>
                <p className="text-[11px] text-slate-400 mt-1">Assembles java-gradle-devops-1.0.0.jar in build/libs/</p>
              </div>
              <div className="p-2.5 bg-slate-900 rounded border border-slate-800/80">
                <span className="font-mono text-cyan-300 font-medium">.\gradlew.bat bootRun</span>
                <p className="text-[11px] text-slate-400 mt-1">Launches the Spring Boot server directly on port 8080</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Docker */}
      {activeTab === 'docker' && (
        <div className="pt-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2 mb-2">
                <Container className="w-4 h-4 text-blue-400" />
                Multi-Stage Build Architecture
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The container build splits build-time dependencies from runtime requirements. The full JDK is only used in Stage 1 to build the JAR; the final image only contains the minimal JRE, reducing total size and removing developer compilers from production.
              </p>
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                  <div className="font-mono text-blue-300 font-semibold">Stage 1: Builder</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Base: eclipse-temurin:17-jdk-jammy (~450MB) - compiles & runs tests</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded border border-slate-800">
                  <div className="font-mono text-emerald-300 font-semibold">Stage 2: Runner (Production)</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Base: eclipse-temurin:17-jre-jammy (~200MB) - minimal runtime only</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Security & Health Monitoring
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Containers should never run as root. The Dockerfile creates a designated non-privileged user and group <code className="text-emerald-300 font-mono">devops:devops</code>.
              </p>
              <div className="mt-3 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-slate-500"># Built-in Container Health Check:</span><br />
                HEALTHCHECK --interval=30s --timeout=3s --retries=3 \<br />
                &nbsp;&nbsp;CMD wget -qO- http://localhost:8080/health || exit 1
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Docker inspects this command every 30 seconds. If 3 consecutive failures occur, the container status turns to <code className="text-amber-300">unhealthy</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: CI/CD */}
      {activeTab === 'cicd' && (
        <div className="pt-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2 mb-2">
                <GitMerge className="w-4 h-4 text-emerald-400" />
                GitHub Actions Pipeline Breakdown
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Located at <code className="text-emerald-300 font-mono">.github/workflows/build.yml</code>, the CI pipeline triggers automatically on every push or pull request to the main branch.
              </p>
              <div className="mt-3 space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs text-cyan-400 shrink-0">1</span>
                  <span><strong>Checkout:</strong> Clones project via <code className="text-slate-400 font-mono">actions/checkout@v4</code>.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs text-cyan-400 shrink-0">2</span>
                  <span><strong>Setup JDK & Cache:</strong> Installs Eclipse Temurin JDK 17 with automatic Gradle cache keys.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs text-cyan-400 shrink-0">3</span>
                  <span><strong>Wrapper Validation:</strong> Verifies cryptographic checksum of the Gradle wrapper.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs text-cyan-400 shrink-0">4</span>
                  <span><strong>Test & Report:</strong> Runs <code className="text-slate-400 font-mono">./gradlew test</code> and publishes reports.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-mono text-xs text-cyan-400 shrink-0">5</span>
                  <span><strong>Package & Archive:</strong> Generates and stores the production JAR artifact.</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white font-mono flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                Quality Gates & Artifact Retention
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                If any JUnit test fails or if compilation encounters an error, the pipeline immediately halts, failing the pull request checks before broken code can reach production.
              </p>
              <div className="mt-3 bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                <div className="text-xs font-semibold text-slate-200 mb-1">Archived Artifacts:</div>
                <ul className="text-xs space-y-1 text-slate-400">
                  <li>· <strong className="text-slate-300 font-mono">junit-test-reports</strong>: Preserved for 7 days for post-run analysis.</li>
                  <li>· <strong className="text-slate-300 font-mono">java-gradle-devops-jar</strong>: Ready-to-deploy JAR kept for 14 days.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
