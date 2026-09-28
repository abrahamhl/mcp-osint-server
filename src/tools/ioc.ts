import { runPythonTool } from '../utils/subprocess.js';

export interface IocSearchInput {
    query: string;
    type?: 'ip' | 'domain' | 'hash' | 'url';
}

export interface IocSearchOutput {
    results: Array<{
        value: string;
        type: string;
        source: string;
        first_seen: string;
        tags: string[];
    }>;
}

export async function iocSearch(input: IocSearchInput): Promise<IocSearchOutput> {
    const args = ['--query', input.query];
    if (input.type) {
        args.push('--type', input.type);
    }
    return runPythonTool('ioc.py', args);
}
