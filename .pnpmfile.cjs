// Remove platform-specific binaries that cause issues on Linux
function afterResolve(resolution, rawResolution, context) {
  // Remove Windows-only rollup binary
  if (resolution.id.includes('@rollup/rollup-win32')) {
    return null;
  }
  if (resolution.id.includes('@rollup/rollup-win64')) {
    return null;
  }
  // Remove Windows-only Tailwind binary
  if (resolution.id.includes('@tailwindcss/oxide-win')) {
    return null;
  }
  // Remove Windows-only lightningcss binary
  if (resolution.id.includes('lightningcss-win')) {
    return null;
  }
  return resolution;
}

module.exports = {
  hooks: {
    afterResolve,
  },
};
