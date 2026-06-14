let pyodidePromise: Promise<any> | null = null;

export async function getOrLoadPyodide() {
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = (async () => {
    // Check if script is already present
    if (!(window as any).loadPyodide) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
      script.async = true;
      document.body.appendChild(script);

      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Pyodide script from CDN'));
      });
    }

    const pyodide = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
    });
    
    return pyodide;
  })();

  return pyodidePromise;
}

export async function runPythonCode(code: string): Promise<{ stdout: string; stderr: string; error?: string }> {
  try {
    const pyodide = await getOrLoadPyodide();
    
    // Set up stdout and stderr redirects
    let stdout = '';
    let stderr = '';
    
    pyodide.setStdout({
      write: (text: string) => {
        stdout += text;
        return text.length;
      }
    });
    
    pyodide.setStderr({
      write: (text: string) => {
        stderr += text;
        return text.length;
      }
    });

    await pyodide.runPythonAsync(code);

    return { stdout, stderr };
  } catch (err: any) {
    return { stdout: '', stderr: '', error: err.message || String(err) };
  }
}
