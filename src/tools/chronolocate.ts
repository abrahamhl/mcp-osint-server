import { runPythonTool } from '../utils/subprocess.js';

export interface ChronolocateSunInput {
    lat: number;
    lon: number;
    time: string;
}

export interface ChronolocateSunOutput {
    azimuth: number;
    elevation: number;
    shadow_bearing: number;
    shadow_ratio: number;
}

export async function chronolocateSun(input: ChronolocateSunInput): Promise<ChronolocateSunOutput> {
    const args = ['--lat', input.lat.toString(), '--lon', input.lon.toString(), '--time', input.time];
    return runPythonTool('chronolocate.py', args);
}
