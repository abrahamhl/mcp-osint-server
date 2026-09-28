import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

export async function runPythonTool(scriptName: string, args: string[]): Promise<any> {
    try {
        const { stdout, stderr } = await execFileAsync('python', [scriptName, ...args]);
        if (stderr) {
            console.warn(`[Python Tool Warn] ${scriptName}: ${stderr}`);
        }
        return JSON.parse(stdout);
    } catch (error) {
        throw new Error(`Failed to execute Python tool ${scriptName}: ${error}`);
    }
}
