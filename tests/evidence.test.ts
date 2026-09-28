import { describe, it, expect, vi } from 'vitest';
import { evidenceVerify } from '../src/tools/evidence.js';
import * as subprocess from '../src/utils/subprocess.js';

vi.mock('../src/utils/subprocess.js');

describe('evidence_verify tool', () => {
    it('should pass correct arguments to subprocess', async () => {
        const mockOutput = { verified: true, chain_length: 5, broken_links: [] };
        vi.spyOn(subprocess, 'runPythonTool').mockResolvedValue(mockOutput);

        const result = await evidenceVerify({ case_id: 'C-123', evidence_dir: '/tmp/evidence' });
        
        expect(subprocess.runPythonTool).toHaveBeenCalledWith('evidence.py', ['--case-id', 'C-123', '--evidence-dir', '/tmp/evidence']);
        expect(result).toEqual(mockOutput);
    });
});
