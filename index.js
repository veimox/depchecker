#! /usr/bin/env node

const depcheck = require("depcheck");
const fs = require("fs");

depcheck(process.cwd(), {}, (unused) => {
  // Reads and parses the package.json file
  const packageJson = require(`${process.cwd()}/package.json`);

  // Gets the dependencies from the package.json file
  const dependencies = packageJson.dependencies;

  // Removes the dependencies that are not used
  for (const dependency in dependencies) {
    if (unused.dependencies.includes(dependency)) {
      delete dependencies[dependency];
    }
  }

  // Updates the package.json file
  fs.writeFile(
    `${process.cwd()}/package.json`,
    JSON.stringify(packageJson, null, 2),
    (err) => {
      if (err) throw err;
    }
  );
});
