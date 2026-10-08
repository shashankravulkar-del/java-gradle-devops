import React from 'react';
import { Coffee, Layers, Flame, Network, CheckSquare, Container, GitPullRequest } from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  version: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  keyCapability: string;
  configReference: string;
}

const TECHNOLOGIES: TechItem[] = [
  {
    name: 'Java',
    category: 'Runtime / Language',
    version: '17 LTS',
    icon: Coffee,
    description: 'Long-term support release of the Java SE platform with high-performance JVM garbage collection and container awareness.',
    keyCapability: 'Toolchain compatibility & container support (-XX:+UseContainerSupport)',
    configReference: 'java.toolchain { languageVersion = JavaLanguageVersion.of(17) }'
  },
  {
    name: 'Gradle',
    category: 'Build Automation',
    version: '8.10.2',
    icon: Layers,
    description: 'Declarative build orchestration with incremental task graph execution, dependency caching, and self-bootstrapping Gradle Wrapper.',
    keyCapability: 'Zero pre-installation required via ./gradlew and gradlew.bat',
    configReference: 'gradle/wrapper/gradle-wrapper.properties'
  },
  {
    name: 'Spring Boot',
    category: 'Application Framework',
    version: '3.3.4',
    icon: Flame,
    description: 'Opinionated web framework providing embedded Tomcat server, auto-configuration, and operational monitoring via Actuator.',
    keyCapability: 'Production fat bootJar packaging with built-in Actuator health metrics',
    configReference: 'org.springframework.boot:spring-boot-starter-web'
  },
  {
    name: 'REST API',
    category: 'Interface Architecture',
    version: 'HTTP/JSON',
    icon: Network,
    description: 'Stateless endpoints with centralized exception translation (@RestControllerAdvice) and ISO-8601 timestamps.',
    keyCapability: 'Endpoints: GET /api/hello and GET /health with standard JSON contracts',
    configReference: 'com.devops.app.controller.HelloController'
  },
  {
    name: 'JUnit 5 & MockMvc',
    category: 'Automated Testing',
    version: 'Jupiter 5.x',
    icon: CheckSquare,
    description: 'Test framework for unit tests and controller integration checks without running a full servlet container.',
    keyCapability: 'Automated test execution via ./gradlew test in CI pipelines',
    configReference: 'src/test/java/com/devops/app/HelloControllerTest.java'
  },
  {
    name: 'Docker',
    category: 'Containerization',
    version: 'Multi-Stage',
    icon: Container,
    description: 'Two-stage lightweight build using Temurin JDK for compilation and hardened Temurin JRE running as non-root user.',
    keyCapability: 'Reduced attack surface, minimal image footprint, built-in HEALTHCHECK',
    configReference: 'Dockerfile (FROM eclipse-temurin:17-jre-jammy)'
  },
  {
    name: 'GitHub Actions',
    category: 'Continuous Integration',
    version: 'v4 Actions',
    icon: GitPullRequest,
    description: 'Automated workflow executing on push and pull requests to build, test, and archive artifacts.',
    keyCapability: 'Zero-friction validation with Gradle dependency cache integration',
    configReference: '.github/workflows/build.yml'
  }
];

export const TechStackCards: React.FC = () => {
  return (
    <section className="mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <h2 className="text-lg font-semibold text-white font-mono">
            DevOps Technology Architecture
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Core components powering the automated build, test, package, and deployment lifecycle
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TECHNOLOGIES.map((tech) => {
          const Icon = tech.icon;
          return (
            <div
              key={tech.name}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white font-mono">
                        {tech.name}
                      </h3>
                      <div className="text-[11px] text-slate-400">
                        {tech.category}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-medium">
                    {tech.version}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {tech.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-[11px] text-slate-400 mb-1">
                  <span className="font-medium text-slate-300">Role:</span> {tech.keyCapability}
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate bg-slate-950 p-1.5 rounded border border-slate-800/60">
                  {tech.configReference}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
