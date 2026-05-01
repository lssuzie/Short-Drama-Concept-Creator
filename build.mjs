import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('src/index.html', 'utf8');
const css = readFileSync('src/style.css', 'utf8');
const js = readFileSync('src/app.js', 'utf8');

const out = html
  .replace(
    '<link rel="stylesheet" href="style.css">',
    `<style>\n${css.replace(/\n$/, '')}\n</style>`
  )
  .replace(
    '<script src="app.js"></script>',
    `<script>\n${js.replace(/\n$/, '')}\n</script>`
  );

writeFileSync('index.html', out);
console.log(`built index.html (${out.length} bytes)`);
