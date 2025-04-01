import { execSync } from 'child_process';

module.exports = async () => {
  // Run migrations or seed test database
  execSync('npm run typeorm:test migration:run');
};