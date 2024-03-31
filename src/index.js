#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program
  .name('cnap')
  .version('1.0.0')
  .argument(
    '<path>',
    'The path to create the component at, including the component name',
  )
  .action((inputPath) => {
    const basePath = path.join(process.cwd(), 'app/' + inputPath);
    const templatesDir = path.join(__dirname, '..', 'templates');

    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath, { recursive: true });
    }

    fs.readdirSync(templatesDir).forEach((file) => {
      const content = fs.readFileSync(path.join(templatesDir, file), 'utf8');
      fs.writeFileSync(path.join(basePath, file), content);
    });

    console.log(`Component at '${inputPath}' created successfully.`);
  });

program.parse(process.argv);
