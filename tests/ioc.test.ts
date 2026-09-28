import { describe, it, expect, vi } from 'vitest';
import { iocSearch } from '../src/tools/ioc.js';
import * as subprocess from '../src/utils/subprocess.js';

vi.mock('../src/utils/subprocess.js');

describe('ioc_search tool', () => {
    it('should pass correct arguments to subprocess', async () => {
        const mockOutput = { results: [] };
        vi.spyOn(subprocess, 'runPythonTool').mockResolvedValue(mockOutput);

        const result = await iocSearch({ query: '1.1.1.1', type: 'ip' });
        
        expect(subprocess.runPythonTool).toHaveBeenCalledWith('ioc.py', ['--query', '1.1.1.1', '--type', 'ip']);
        expect(result).toEqual(mockOutput);
    });

    it('should omit type if not provided', async () => {
        const mockOutput = { results: [] };
        vi.spyOn(subprocess, 'runPythonTool').mockResolvedValue(mockOutput);

        const result = await iocSearch({ query: 'example.com' });
        
        expect(subprocess.runPythonTool).toHaveBeenCalledWith('ioc.py', ['--query', 'example.com']);
        expect(result).toEqual(mockOutput);
    });
});
