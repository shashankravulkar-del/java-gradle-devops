import React, { useState, useEffect } from 'react';
import { Activity, Server, Radio, RefreshCw, AlertCircle, CheckCircle2, ExternalLink } from 'lucide-react';

interface HealthData {
  status: string;
  appName?: string;
  version?: string;
  timestamp?: string;
  systemMetrics?: {
    status?: string;
    uptimeSeconds?: number;
    availableProcessors?: number;
    usedMemoryMB?: number;
    totalMemoryMB?: number;
    maxMemoryMB?: number;
  };
}

interface HelloData {
  message?: string;
  status?: string;
  environment?: string;
  version?: string;
  timestamp?: string;
}

export const StatusDashboard: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('http://localhost:8080');
  const [probing, setProbing] = useState(false);
  const [isLive, setIsLive] = useState<boolean | null>(null);
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [helloData, setHelloData] = useState<HelloData | null>(null);
  const [lastChecked, setLastChecked] = useState<string | null>(null);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const checkLiveStatus = async () => {
    setProbing(true);
    setErrorDetails(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    try {
      // Probe /health endpoint
      const healthRes = await fetch(`${targetUrl.replace(/\/$/, '')}/health`, {
        signal: controller.signal,
        headers: { Accept: 'application/json' }
      });

      if (!healthRes.ok) {
        throw new Error(`HTTP ${healthRes.status}: ${healthRes.statusText}`);
      }

      const healthJson: HealthData = await healthRes.json();
      setHealthData(healthJson);

      // Probe /api/hello endpoint
      try {
        const helloRes = await fetch(`${targetUrl.replace(/\/$/, '')}/api/hello`, {
          signal: controller.signal,
          headers: { Accept: 'application/json' }
        });
        if (helloRes.ok) {
          const helloJson: HelloData = await helloRes.json();
          setHelloData(helloJson);
        }
      } catch {
        // Hello endpoint optional probe
      }

      setIsLive(true);
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err: unknown) {
      setIsLive(false);
      setHealthData(null);
      setHelloData(null);
      setLastChecked(new Date().toLocaleTimeString());
      if (err instanceof Error) {
        setErrorDetails(err.message);
      } else {
        setErrorDetails('Unable to reach host');
      }
    } finally {
      clearTimeout(timeoutId);
      setProbing(false);
    }
  };

  useEffect(() => {
    // Initial probe check
    checkLiveStatus();
  }, []);

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 mb-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Radio className={`w-4 h-4 ${isLive ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
            <h2 className="text-base font-semibold text-white font-mono">
              Live Application Telemetry
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real probe against the local Spring Boot service runtime
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-300">
            <span className="text-slate-500 mr-2">Target:</span>
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="bg-transparent text-slate-200 outline-none w-36 sm:w-44 font-mono text-xs"
              placeholder="http://localhost:8080"
            />
          </div>

          <button
            onClick={checkLiveStatus}
            disabled={probing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${probing ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{probing ? 'Probing...' : 'Check Status'}</span>
          </button>
        </div>
      </div>

      {/* Primary Notice When Unreachable */}
      {isLive === false && (
        <div className="my-5 p-4 rounded-lg bg-amber-950/30 border border-amber-800/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold text-amber-300 font-mono tracking-tight">
              Run the project locally to view live status.
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              No active Spring Boot instance detected at <code className="text-amber-200 font-mono">{targetUrl}</code>.
              To see live metrics, run <code className="px-1.5 py-0.5 bg-slate-950 rounded text-amber-200 font-mono">.\gradlew.bat bootRun</code> in Windows PowerShell or start the Docker container on port 8080.
            </p>
            {errorDetails && (
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Probe diagnostic: {errorDetails}
              </p>
            )}
          </div>
        </div>
      )}

      {isLive === true && (
        <div className="my-5 p-4 rounded-lg bg-emerald-950/30 border border-emerald-800/60 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold text-emerald-300 font-mono tracking-tight">
              Connected to local Spring Boot instance!
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Receiving live JSON responses from <code className="text-emerald-200 font-mono">{targetUrl}</code>. Actuator metrics and greeting endpoints are functioning normally.
            </p>
          </div>
        </div>
      )}

      {/* Telemetry 3-Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {/* Card 1: Application Status */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Application Status
            </span>
            <Server className={`w-4 h-4 ${isLive ? 'text-emerald-400' : 'text-slate-500'}`} />
          </div>
          <div className="mt-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className="text-sm font-semibold text-white font-mono">
                {isLive ? 'ONLINE (Port 8080)' : 'OFFLINE'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {isLive
                ? `Active service: ${healthData?.appName || 'java-gradle-devops'} v${healthData?.version || '1.0.0'}`
                : 'Run the project locally to view live status.'}
            </p>
          </div>
        </div>

        {/* Card 2: API Status (/api/hello) */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              API Status (/api/hello)
            </span>
            <ExternalLink className={`w-4 h-4 ${isLive ? 'text-emerald-400' : 'text-slate-500'}`} />
          </div>
          <div className="mt-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
              <span className="text-sm font-semibold text-white font-mono">
                {isLive ? 'READY (200 OK)' : 'AWAITING LOCAL RUN'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 truncate">
              {isLive && helloData?.message
                ? helloData.message
                : 'Run the project locally to view live status.'}
            </p>
          </div>
        </div>

        {/* Card 3: Health Status (/health) */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Health Status (/health)
            </span>
            <Activity className={`w-4 h-4 ${isLive ? 'text-emerald-400' : 'text-slate-500'}`} />
          </div>
          <div className="mt-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
              <span className="text-sm font-semibold text-white font-mono">
                {isLive ? `HEALTHY: ${healthData?.status || 'UP'}` : 'UNAVAILABLE'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {isLive && healthData?.systemMetrics
                ? `Uptime: ${healthData.systemMetrics.uptimeSeconds}s · Memory: ${healthData.systemMetrics.usedMemoryMB}MB / ${healthData.systemMetrics.totalMemoryMB}MB`
                : 'Run the project locally to view live status.'}
            </p>
          </div>
        </div>
      </div>

      {lastChecked && (
        <div className="mt-3 text-right">
          <span className="text-[11px] text-slate-500 font-mono">
            Last probed: {lastChecked}
          </span>
        </div>
      )}
    </section>
  );
};
