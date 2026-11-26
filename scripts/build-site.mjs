// Собирает все домашки вида <раздел>/<задача>/package.json в _site/<раздел>/<задача>/
// и генерирует _site/index.html со ссылками на них.
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const out = join(root, "_site");
const repo = "https://github.com/uglyzonedman/mentory-pro-home-tasks";
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

    const readme = join(dir, "README.md");
    const heading = existsSync(readme) ? readFileSync(readme, "utf8").match(/^#\s+(.+)$/m)?.[1] ?? "" : "";
    const title = heading.split(/\s+—\s+/).slice(1).join(" — ") || task;
    const num = task.match(/\d+/)?.[0] ?? "";
    tasks.push({ name: task, num, title, href: `${section}/${task}/`, src: `${repo}/tree/main/${section}/${task}`, description: pkg.description ?? "" });
  }
  if (tasks.length) sections.push({ name: section, tasks });
}

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const sectionTitle = (name) =>
  ({ "advanced-react": "Advanced React", "base-typescript": "Base TypeScript" })[name] ??
  name.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ");
const plural = (n, [one, few, many]) =>
  n % 10 === 1 && n % 100 !== 11 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? few : many;
const total = sections.reduce((n, s) => n + s.tasks.length, 0);

const html = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Домашние задания</title>
<style>
  :root {
    color-scheme: light;
    --bg: #f7f8fa; --surface: #fff; --text: #1f2328; --muted: #6b7280;
    --border: #e5e7eb; --accent: #4f46e5; --accent-soft: #eef2ff;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    line-height: 1.5; color: var(--text); background: var(--bg);
  }
  * { box-sizing: border-box; }
  body { margin: 0; }
  main { max-width: 880px; margin: 0 auto; padding: 56px 20px 72px; }
  header { margin-bottom: 40px; }
  h1 { margin: 0; font-size: 32px; letter-spacing: -.02em; }
  .lead { margin: 8px 0 0; color: var(--muted); }
  .lead a { color: var(--accent); text-decoration: none; }
  .lead a:hover { text-decoration: underline; }
  .stats { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; padding: 0; list-style: none; }
  .stats li { font-size: 13px; padding: 4px 10px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); color: var(--muted); }
  .stats b { color: var(--text); font-weight: 600; }
  section + section { margin-top: 40px; }
  .section-head { display: flex; align-items: baseline; gap: 10px; margin: 0 0 14px; }
  h2 { margin: 0; font-size: 18px; }
  .count { font-size: 13px; color: var(--muted); }
  .grid { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 12px; }
  .card { position: relative; height: 100%; display: flex; flex-direction: column; gap: 6px; padding: 16px; background: var(--surface);
    border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,.04); transition: border-color .15s, box-shadow .15s, transform .15s; }
  .card:hover { border-color: var(--accent); box-shadow: 0 6px 20px rgba(79,70,229,.10); transform: translateY(-2px); }
  .card__top { display: flex; align-items: center; gap: 10px; }
  .card__num { flex-shrink: 0; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 8px;
    background: var(--accent-soft); color: var(--accent); font-weight: 700; font-size: 14px; }
  .card__title { margin: 0; font-size: 15px; font-weight: 600; }
  .card__title a { color: inherit; text-decoration: none; }
  .card__title a::after { content: ""; position: absolute; inset: 0; border-radius: inherit; }
  .card__desc { margin: 0; flex: 1; font-size: 14px; color: var(--muted); }
  .card__foot { display: flex; justify-content: space-between; align-items: center; font-size: 13px; margin-top: 4px; }
  .card__open { color: var(--accent); font-weight: 500; }
  .card__src { position: relative; z-index: 1; color: var(--muted); text-decoration: none; }
  .card__src:hover { color: var(--text); text-decoration: underline; }
  a:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 4px; }
  @media (max-width: 600px) { main { padding-top: 32px; } h1 { font-size: 26px; } }
</style>
</head>
<body>
<main>
  <header>
    <h1>Домашние задания</h1>
    <p class="lead">Курс Mentory Pro · исходники на <a href="${repo}">GitHub</a></p>
    <ul class="stats">
      <li><b>${total}</b> ${plural(total, ["домашка", "домашки", "домашек"])}</li>
      <li><b>${sections.length}</b> ${plural(sections.length, ["раздел", "раздела", "разделов"])}</li>
    </ul>
  </header>
${sections
  .map(
    (s) => `  <section>
    <div class="section-head"><h2>${esc(sectionTitle(s.name))}</h2><span class="count">${s.tasks.length}</span></div>
    <ul class="grid">
${s.tasks
  .map(
    (t) => `      <li><article class="card">
        <div class="card__top"><span class="card__num">${esc(t.num)}</span><h3 class="card__title"><a href="${t.href}">${esc(t.title)}</a></h3></div>
        ${t.description ? `<p class="card__desc">${esc(t.description)}</p>` : ""}
        <div class="card__foot"><span class="card__open">Открыть →</span><a class="card__src" href="${t.src}">Код</a></div>
      </article></li>`,
  )
  .join("\n")}
    </ul>
  </section>`,
  )
  .join("\n")}
</main>
</body>
</html>
`;

writeFileSync(join(out, "index.html"), html);
console.log(`\n✔ Готово: ${total} домашек → _site/`);
