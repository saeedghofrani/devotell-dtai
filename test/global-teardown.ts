import { execSync } from 'child_process';

module.exports = async () => {
    // Drop test database
    execSync('npm run typeorm:test schema:drop');
};