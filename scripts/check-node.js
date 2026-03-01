const major = Number(process.versions.node.split('.')[0]);

if (Number.isNaN(major) || major < 20 || major >= 23) {
  console.error(`Unsupported Node.js version: ${process.versions.node}`);
  console.error('Use Node.js 20-22 (recommended: 22 LTS).');
  process.exit(1);
}
