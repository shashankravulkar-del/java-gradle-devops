import React, { useState } from 'react';
import { Copy, Check, Terminal, Play } from 'lucide-react';

interface CommandItem {
  id: number;
  title: string;
  command: string;
  description: string;
  notes?: string;
}

const WINDOWS_COMMANDS: CommandItem[] = [
  {
    id: 1,
    title: 'Check Java Installation',
    command: 'java -version',
    description: 'Verifies that Java 17+ is installed and configured on the Windows system PATH.',
    notes: 'Expected output shows OpenJDK version "17.0.x" or higher.'
  },
  {
    id: 2,
    title: 'Build using Gradle Wrapper',
    command: '.\\gradlew.bat build',
    description: 'Compiles Java classes, runs unit tests, and packages the binary using the local wrapper.',
    notes: 'Does not require a global Gradle installation on your machine.'
  },
  {
    id: 3,
    title: 'Run Tests',
    command: '.\\gradlew.bat test',
    description: 'Executes the JUnit 5 test suite and creates test reports at build/reports/tests/test/index.html.',
    notes: 'Runs both ApplicationTests, HelloControllerTest, and HealthControllerTest.'
  },
  {
    id: 4,
    title: 'Start the Application',
    command: '.\\gradlew.bat bootRun',
    description: 'Launches the Spring Boot server directly with embedded Tomcat on port 8080.',
    notes: 'Press Ctrl+C to terminate the running server process.'
  },
  {
    id: 5,
    title: 'Test the REST APIs',
    command: 'Invoke-RestMethod -Uri "http://localhost:8080/api/hello?name=Developer"\nInvoke-RestMethod -Uri "http://localhost:8080/health"',
    description: 'Native Windows PowerShell cmdlet to test the greeting and system health endpoints.',
    notes: 'Returns parsed JSON responses directly in the PowerShell console.'
  },
  {
    id: 6,
    title: 'Create the Executable JAR',
    command: '.\\gradlew.bat bootJar',
    description: 'Assembles a self-contained executable Uber-JAR in the build/libs/ directory.',
    notes: 'Target artifact created: build/libs/java-gradle-devops-1.0.0.jar.'
  },
  {
    id: 7,
    title: 'Run the JAR Directly',
    command: 'java -jar build/libs/java-gradle-devops-1.0.0.jar',
    description: 'Executes the compiled Spring Boot application using the local Java runtime.',
    notes: 'Runs independently of Gradle.'
  },
  {
    id: 8,
    title: 'Build Docker Image',
    command: 'docker build -t java-gradle-devops:latest .',
    description: 'Executes the multi-stage Dockerfile to build a lightweight Temurin JRE container image.',
    notes: 'Requires Docker Desktop to be running.'
  },
  {
    id: 9,
    title: 'Run Docker Container',
    command: 'docker run -d --name java-devops-container -p 8080:8080 java-gradle-devops:latest',
    description: 'Runs the container in detached mode (-d), binds port 8080, and names the container.',
    notes: 'App becomes available at http://localhost:8080.'
  },
  {
    id: 10,
    title: 'Check Docker Status',
    command: 'docker ps --filter "name=java-devops-container"',
    description: 'Lists the status, uptime, port bindings, and health check state of the container.',
    notes: 'Status shows (healthy) once the HEALTHCHECK passes.'
  },
  {
    id: 11,
    title: 'View Docker Logs',
    command: 'docker logs -f java-devops-container',
    description: 'Follows (-f) live log output streaming from the containerized Spring Boot instance.',
    notes: 'Press Ctrl+C to stop following logs.'
  },
  {
    id: 12,
    title: 'Stop and Remove Container',
    command: 'docker stop java-devops-container\ndocker rm java-devops-container',
    description: 'Gracefully shuts down the running container and removes it from Docker.',
    notes: 'Ensures the port 8080 is freed for subsequent runs.'
  }
];

export const WindowsCommandsSection: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="windows-commands" className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <h2 className="text-base font-semibold text-white font-mono">
              Windows PowerShell Command Hub
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Exact PowerShell commands to verify Java, build with Gradle Wrapper, test, package, and run Docker
          </p>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Terminal: PowerShell 5.1+ / 7+
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
        {WINDOWS_COMMANDS.map((item) => (
          <div
            key={item.id}
            className="bg-slate-950 border border-slate-800/90 rounded-lg p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                    #{item.id}
                  </span>
                  <h3 className="text-xs font-semibold text-white font-mono">
                    {item.title}
                  </h3>
                </div>

                <button
                  onClick={() => copyToClipboard(item.id, item.command)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors cursor-pointer"
                  title="Copy command"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div>
              <div className="relative group bg-slate-900 border border-slate-800 rounded p-2.5 font-mono text-xs text-emerald-300 overflow-x-auto whitespace-pre">
                <code>{item.command}</code>
              </div>
              {item.notes && (
                <div className="text-[10px] text-slate-400 mt-2 font-mono">
                  Tip: {item.notes}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
