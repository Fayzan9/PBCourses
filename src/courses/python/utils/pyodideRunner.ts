let globalPyodide: any = null;
let globalPyodideLoadingPromise: Promise<any> | null = null;

export const getOrLoadPyodide = async (): Promise<any> => {
  if (globalPyodide) {
    return globalPyodide;
  }

  if (globalPyodideLoadingPromise) {
    return globalPyodideLoadingPromise;
  }

  const loadPyodideEngine = async () => {
    try {
      await new Promise<void>((resolve, reject) => {
        if ((window as any).loadPyodide) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to download Pyodide WebAssembly script from CDN.'));
        document.head.appendChild(script);
      });

      const py = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/',
      });

      globalPyodide = py;
      return py;
    } catch (err: any) {
      globalPyodideLoadingPromise = null;
      throw err;
    }
  };

  globalPyodideLoadingPromise = loadPyodideEngine();
  return globalPyodideLoadingPromise;
};

export interface PythonRunResult {
  stdout: string;
  stderr: string;
  error: string | null;
}

export const runPythonCode = async (code: string): Promise<PythonRunResult> => {
  const py = await getOrLoadPyodide();

  // Setup stdout and stderr redirection in Python
  await py.runPythonAsync(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
  `);

  try {
    await py.runPythonAsync(code);
    const stdout = await py.runPythonAsync('sys.stdout.getvalue()');
    const stderr = await py.runPythonAsync('sys.stderr.getvalue()');
    return {
      stdout: stdout || '',
      stderr: stderr || '',
      error: null
    };
  } catch (err: any) {
    return {
      stdout: '',
      stderr: '',
      error: err.message || String(err)
    };
  }
};
