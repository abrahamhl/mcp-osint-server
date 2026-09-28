import { describe, it, expect, vi } from 'vitest';
import { chronolocateSun } from '../src/tools/chronolocate.js';
import * as subprocess from '../src/utils/subprocess.js';

vi.mock('../src/utils/subprocess.js');

describe('chronolocate_sun tool', () => {
    it('should pass correct arguments to subprocess', async () => {
        const mockOutput = { azimuth: 120, elevation: 45, shadow_bearing: 300, shadow_ratio: 1.0 };
        vi.spyOn(subprocess, 'runPythonTool').mockResolvedValue(mockOutput);

        const result = await chronolocateSun({ lat: 52.37, lon: 4.90, time: '2023-01-01T12:00:00Z' });
        
        expect(subprocess.runPythonTool).toHaveBeenCalledWith('chronolocate.py', ['--lat', '52.37', '--lon', '4.9', '--time', '2023-01-01T12:00:00Z']);
        expect(result).toEqual(mockOutput);
    });
});
