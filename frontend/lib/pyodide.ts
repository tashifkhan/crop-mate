import { loadPyodide, PyodideInterface } from 'pyodide';

let pyodideInstance: PyodideInterface | null = null;

const pythonModuleURL = '/module.py';

async function fetchPythonCode(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch Python module from ${url}: ${response.statusText}`);
  }
  return response.text();
}

export async function initializePyodide() {
  if (!pyodideInstance) {
    console.log('Initializing Pyodide...');
    pyodideInstance = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/',
      fullStdLib: false,
    });
    
    console.log('Loading main script...');
    const pythonCode = await fetchPythonCode(pythonModuleURL);
    await pyodideInstance.runPython(pythonCode);
  }
  return pyodideInstance;
}

// Define allowed Python argument types
type PythonArg = string | number | boolean | object | null | undefined;

export async function callPythonFunction(
  functionName: string, 
  ...args: PythonArg[]
): Promise<unknown> {
  const pyodide = await initializePyodide();
  try {
    const pythonFunction = pyodide.globals.get(functionName);
    
    if (!pythonFunction || typeof pythonFunction !== 'function') {
      console.error('Available globals:', Object.keys(pyodide.globals.toJs()));
      throw new Error(`Function ${functionName} is not a valid Python function`);
    }

    let pyArgs: Array<ReturnType<PyodideInterface['toPy']>> = [];

    pyArgs = args.map((arg, index) => {
      console.log(`Converting argument ${index}`);
      return pyodide.toPy(arg);
    });

    const result = pythonFunction(...pyArgs);
    return result.toJs();
    
  } catch (error) {
    console.error('Error calling Python function:', error);
    throw error;
  }
}