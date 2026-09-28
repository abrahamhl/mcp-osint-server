import { runPythonTool } from '../utils/subprocess.js';

export interface EvidenceVerifyInput {
    case_id: string;
    evidence_dir: string;
}

export interface EvidenceVerifyOutput {
    verified: boolean;
    chain_length: number;
    broken_links: string[];
}

export async function evidenceVerify(input: EvidenceVerifyInput): Promise<EvidenceVerifyOutput> {
    const args = ['--case-id', input.case_id, '--evidence-dir', input.evidence_dir];
    return runPythonTool('evidence.py', args);
}
