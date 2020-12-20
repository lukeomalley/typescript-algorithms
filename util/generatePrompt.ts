import fs from 'fs';

/**
 * Generates a prompt file from a template
 *
 * Usage: npm run g <path>/<file-name>
 * Ex: npm run g easy/two-number-sum
 */
function main() {
  // Extract the path
  const filePath = process.argv[2];
  if (!filePath) {
    console.error('No argument for file name. Please see script usage. "npm run g <file-name>"');
    process.exit(1);
  }

  // Validate the path
  const error = isValid(filePath);
  if (error !== null) {
    console.error(error);
    process.exit(1);
  }

  // Read the template file
  let template = fs.readFileSync(`${__dirname}/promptTemplate`, 'utf-8');

  // Extract and convert function name
  const functionName = toCamelCase(filePath.split('/')[1]);
  const promptTitle = toTitle(filePath.split('/')[1]);

  // Fill the template with file specifics
  template = template.replace(/<function-name>/g, functionName).replace(/<prompt-title>/g, promptTitle);

  // Create the file
  fs.writeFileSync(`${filePath}.ts`, template);
}

main();

// =============================================================================
// Helper Functions
// =============================================================================

function isValid(pathName: string): Error | null {
  const [dir, fileName] = pathName.split('/');

  if (!dir || !fileName) {
    return new Error('Invalid path. File path must be of structure <dir>/<file-name>.');
  }

  const validDirs = {
    easy: true,
    medium: true,
    hard: true,
    'very-hard': true,
  };
  if (!(dir in validDirs)) {
    return new Error('Invalid directory. Must be one of the following: easy, medium, hard, very-hard.');
  }

  if (hasUpperCase(fileName) || fileName.includes('_')) {
    return new Error(
      'Invalid file name. File name must be kebab case and contain only lowercase letters. Ex. <file-name>',
    );
  }

  return null;
}

function hasUpperCase(str: string): boolean {
  return /[A-Z]/.test(str);
}

function toCamelCase(kebabCase: string): string {
  const stringParts = kebabCase.split('-');

  return stringParts
    .map((s, i) => {
      if (i === 0) {
        return s;
      }
      return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    })
    .join('');
}

function toTitle(kebabCase: string): string {
  const stringParts = kebabCase.split('-');
  return stringParts.map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()).join(' ');
}
