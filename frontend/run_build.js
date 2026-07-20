import { execSync } from 'child_process';
import fs from 'fs';

try {
  console.log("Executing vite build...");
  const output = execSync('npx vite build', { encoding: 'utf8' });
  fs.writeFileSync('build_result.txt', 'SUCCESS\n' + output);
} catch (error) {
  const stdout = error.stdout || '';
  const stderr = error.stderr || '';
  fs.writeFileSync('build_result.txt', 'FAILED\nSTDOUT:\n' + stdout + '\nSTDERR:\n' + stderr + '\nMESSAGE:\n' + error.message);
}
