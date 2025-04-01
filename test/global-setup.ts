import { execSync } from 'child_process';

module.exports = async () => {
  execSync('npm run typeorm:test migration:run');
};
