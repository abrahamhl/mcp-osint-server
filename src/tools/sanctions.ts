import { runPythonTool } from '../utils/subprocess.js';

export interface SanctionsInput {
    name: string;
    birth_year?: number;
}

export interface SanctionsOutput {
    matches: Array<{
        listed_name: string;
        score: number;
        reasons: string[];
    }>;
    total_screened: number;
}

export async function sanctionsScreen(input: SanctionsInput): Promise<SanctionsOutput> {
    const args = ['--name', input.name];
    if (input.birth_year) {
        args.push('--birth-year', input.birth_year.toString());
    }
    return runPythonTool('sanctions.py', args);
}
