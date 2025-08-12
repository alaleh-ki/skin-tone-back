const fs = require("fs");
const path = require("path");

function readJson(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  return JSON.parse(content);
}

function writeJson(filePath, obj) {
  const content = JSON.stringify(obj, null, 2) + "\n";
  fs.writeFileSync(filePath, content, "utf8");
}

function ensure(obj, key, fallback) {
  if (!obj[key] || typeof obj[key] !== "object") {
    obj[key] = fallback;
  }
  return obj[key];
}

function updatePackageJson(pkgPath) {
  const pkg = readJson(pkgPath);

  ensure(pkg, "dependencies", {});
  ensure(pkg, "devDependencies", {});
  ensure(pkg, "scripts", {});

  // Scripts standardization
  pkg.scripts.build = "tsc";
  pkg.scripts.start = "node dist/index.js";
  pkg.scripts.dev = "nodemon --watch src --exec ts-node src/index.ts";

  // Dependency versions alignment (update only if present)
  if (pkg.dependencies.express) pkg.dependencies.express = "^4.21.2";
  if (pkg.dependencies.dotenv) pkg.dependencies.dotenv = "^17.2.1";
  if (pkg.dependencies.axios) pkg.dependencies.axios = "^1.10.0";

  // Dev dependency versions
  pkg.devDependencies["ts-node"] = "^10.9.2";
  pkg.devDependencies["typescript"] = "^5.5.4";
  pkg.devDependencies["nodemon"] = "^3.1.4";

  if (pkg.devDependencies["@types/express"]) {
    pkg.devDependencies["@types/express"] = "^4.17.21";
  }
  if (pkg.devDependencies["@types/chroma-js"]) {
    pkg.devDependencies["@types/chroma-js"] = "^3.1.1";
  }

  writeJson(pkgPath, pkg);
}

function updateDockerfile(dockerfilePath) {
  if (!fs.existsSync(dockerfilePath)) return;
  let content = fs.readFileSync(dockerfilePath, "utf8");

  // Insert RUN npm run build after COPY . . if not already present anywhere
  const hasBuild = /\bRUN\s+npm\s+run\s+build\b/.test(content);
  if (!hasBuild) {
    content = content.replace(/(COPY\s+\.\s+\.\s*\r?\n)/, `$1RUN npm run build\n`);
    fs.writeFileSync(dockerfilePath, content, "utf8");
  }
}

function main() {
  const root = process.cwd();

  const packageJsonPaths = [path.join(root, "ai-description-service", "package.json"), path.join(root, "color-analysis-service", "package.json"), path.join(root, "palette-service", "package.json"), path.join(root, "gateway-api", "package.json")];

  packageJsonPaths.forEach((pkgPath) => {
    if (fs.existsSync(pkgPath)) {
      updatePackageJson(pkgPath);
      console.log(`Updated ${path.relative(root, pkgPath)}`);
    }
  });

  const dockerfiles = [
    path.join(root, "ai-description-service", "Dockerfile"), 
    path.join(root, "color-analysis-service", "Dockerfile"),
    path.join(root, "palette-service", "Dockerfile"),
    path.join(root, "gateway-api", "Dockerfile")
  ];
  
  dockerfiles.forEach((dfPath) => {
    if (fs.existsSync(dfPath)) {
      updateDockerfile(dfPath);
      console.log(`Ensured build step in ${path.relative(root, dfPath)}`);
    }
  });
}

main();
