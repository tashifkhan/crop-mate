import { loadPyodide, PyodideInterface } from 'pyodide';

let pyodideInstance: PyodideInterface | null = null;

const pythonModuleURL = '/scripts/module.py';
const modelURLs = {
    column_names: '/scripts/models/column_names.pkl',
    label_encoders: '/scripts/models/label_encoders.pkl',
    minmaxscaler: '/scripts/models/minmaxscaler.pkl',
    model: '/scripts/models/model.pkl',
    model2: '/scripts/models/model2.pkl',
    standscaler: '/scripts/models/standscaler.pkl',
    standscaler2: '/scripts/models/standscaler2.pkl'
};

async function fetchPythonCode(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch Python module from ${url}: ${response.statusText}`);
  }
  return response.text();
}


async function fetchModel(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch model from ${url}: ${response.statusText}`);
  }
  return response.arrayBuffer();
}

export async function initializePyodide() {
  if (!pyodideInstance) {
    console.log('Initializing Pyodide...');
    pyodideInstance = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/',
      fullStdLib: false,
    });
    
    await pyodideInstance.loadPackage(['scikit-learn', 'numpy', 'pandas', 'joblib', 'scipy']);
    
    console.log('Loading ML models...');
    for (const [modelName, modelURL] of Object.entries(modelURLs)) {
      const modelData = await fetchModel(modelURL);
      pyodideInstance.FS.writeFile(modelName + '.pkl', new Uint8Array(modelData));
    }
    
    console.log('Loading main script...');
    const pythonCode = await fetchPythonCode(pythonModuleURL);
    await pyodideInstance.runPython(pythonCode);
  }
  return pyodideInstance;
}

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