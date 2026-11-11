// Собирает все домашки вида <раздел>/<задача>/package.json в _site/<раздел>/<задача>/
// и генерирует _site/index.html со ссылками на них.
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = join(root, "_site");
const skip = new Set([".git", ".github", "node_modules", "scripts", "_site"]);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const dirs = (p) =>
  readdirSync(p, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !skip.has(d.name) && !d.name.startsWith("."))
    .map((d) => d.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

const sections = [];

for (const section of dirs(root)) {
  const tasks = [];
  for (const task of dirs(join(root, section))) {
    const dir = join(root, section, task);
    const pkgPath = join(dir, "package.json");
    if (!existsSync(pkgPath)) continue;

    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    const dest = join(out, section, task);
    console.log(`\n▶ ${section}/${task}`);

    execSync(existsSync(join(dir, "package-lock.json")) ? "npm ci" : "npm install", {
      cwd: dir,
      stdio: "inherit",
    });
    // build = "tsc -b && vite build", аргументы уходят в vite build
    execSync(`npm run build -- --base ./ --outDir "${dest}" --emptyOutDir`, {
      cwd: dir,
      stdio: "inherit",
    });

    tasks.push({ name: task, href: `${section}/${task}/`, description: pkg.description ?? "" });
  }
  if (tasks.length) sections.push({ name: section, tasks });
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Домашние задания</title>
<style>
  :root { color-scheme: light; font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  body { margin: 0; background: #f7f8fa; color: #1f2328; }
  main { max-width: 720px; margin: 48px auto; padding: 0 16px; }
  h1 { margin: 0 0 24px; }
  h2 { font-size: 14px; text-transform: uppercase; letter-spacing: .06em; color: #6b7280; margin: 32px 0 12px; }
  ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
  a { display: block; padding: 16px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; color: inherit; text-decoration: none; transition: border-color .15s; }
  a:hover { border-color: #4f46e5; }
  b { display: block; color: #4f46e5; }
  span { font-size: 14px; color: #6b7280; }
</style>
</head>
<body>
<main>
  <h1>Домашние задания</h1>
${sections
  .map(
    (s) => `  <h2>${esc(s.name)}</h2>
  <ul>
${s.tasks
  .map((t) => `    <li><a href="${t.href}"><b>${esc(t.name)}</b>${t.description ? `<span>${esc(t.description)}</span>` : ""}</a></li>`)
  .join("\n")}
  </ul>`,
  )
  .join("\n")}
</main>
</body>
</html>
`;

writeFileSync(join(out, "index.html"), html);
console.log(`\n✔ Готово: ${sections.reduce((n, s) => n + s.tasks.length, 0)} домашек → _site/`);
