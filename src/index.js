const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { name } = require('../package.json');

function findTemplatesDir() {
  // Common paths to check
  const possiblePaths = [
    path.join(__dirname, 'templates'), // Local development
    path.join(__dirname, '..', 'templates'), // Global, standard Node.js
    path.join(
      __dirname,
      '..',
      '..',
      '..',
      'lib',
      'node_modules',
      name,
      'templates',
    ), // nvm or n
    // Add more paths as needed
  ];

  // Check each path and return the first one that exists
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }

  // Fallback or throw an error if the templates directory cannot be found
  throw new Error('Templates directory not found');
}

// Function to ask for path and page name
async function getPathAndPageName() {
  const questions = [
    {
      type: 'input',
      name: 'path',
      message: 'Path:',
      validate: function (value) {
        const pass = value.match(/^[a-zA-Z0-9\/]*$/);
        if (pass) {
          return true;
        }

        return 'Please enter a valid path (alphanumeric and slashes only)';
      },
    },
    {
      type: 'input',
      name: 'pageName',
      message: 'Page name:',
      validate: function (value) {
        // Simple CamelCase validation: starts with an uppercase letter followed by lowercase letters/numbers
        if (/^[A-Z][a-zA-Z0-9]*$/.test(value)) {
          return true;
        }
        return 'Please enter a valid page name in CamelCase (e.g., MyPage)';
      },
    },
  ];

  return inquirer.prompt(questions);
}

async function createComponent() {
  const { path: userPath, pageName } = await getPathAndPageName();
  const basePath = './' + path.join(process.cwd(), 'app', userPath);
  const templatesDir = findTemplatesDir();

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  fs.readdirSync(templatesDir).forEach((file) => {
    let content = fs.readFileSync(path.join(templatesDir, file), 'utf8');

    // Dynamically replace the component name based on the file type
    if (file === 'page.js') {
      content = content.replace(/PageName/g, pageName);
    } else if (file === 'template.js') {
      content = content.replace(/PageNameTemplate/g, `${pageName}Template`);
    } else if (file === 'layout.js') {
      content = content.replace(/PageNameLayout/g, `${pageName}Layout`);
    } else if (file === 'loader.js') {
      content = content.replace(/PageNameLoader/g, `${pageName}Loader`);
    }

    fs.writeFileSync(path.join(basePath, file), content);
  });

  console.log(`Component '${pageName}' created successfully at '${userPath}'`);
}

createComponent();
