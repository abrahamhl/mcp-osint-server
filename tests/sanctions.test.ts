import { describe, it, expect, vi } from 'vitest';
import { sanctionsScreen } from '../src/tools/sanctions.js';
import * as subprocess from '../src/utils/subprocess.js';

vi.mock('../src/utils/subprocess.js');

describe('sanctions_screen tool', () => {
    it('should pass correct arguments to subprocess', async () => {
        const mockOutput = { matches: [], total_screened: 100 };
        vi.spyOn(subprocess, 'runPythonTool').mockResolvedValue(mockOutput);

        const result = await sanctionsScreen({ name: 'John Doe', birth_year: 1990 });
        
        expect(subprocess.runPythonTool).toHaveBeenCalledWith('sanctions.py', ['--name', 'John Doe', '--birth-year', '1990']);
        expect(result).toEqual(mockOutput);
    });

    it('should omit birth_year if not provided', async () => {
        const mockOutput = { matches: [], total_screened: 100 };
        vi.spyOn(subprocess, 'runPythonTool').mockResolvedValue(mockOutput);

        const result = await sanctionsScreen({ name: 'Jane Doe' });
        
        expect(subprocess.runPythonTool).toHaveBeenCalledWith('sanctions.py', ['--name', 'Jane Doe']);
        expect(result).toEqual(mockOutput);
    });
});
