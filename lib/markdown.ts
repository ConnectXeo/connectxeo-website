/**
 * Lightweight markdown to HTML renderer.
 * Handles: headings, bold, italic, inline code, code blocks,
 * unordered/ordered lists, horizontal rules, paragraphs, links.
 * No external dependencies — pure string transforms.
 * Uses theme-aware classes (CSS variables) to match the site design system.
 */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded-md border border-border bg-background-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-primary">$1</code>'
    )
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary">$1</a>'
    );
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++;
      output.push(
        `<pre class="my-6 overflow-x-auto rounded-2xl border border-border bg-background-secondary p-5"><code class="font-mono text-sm leading-relaxed text-foreground-secondary">${codeLines.join("\n")}</code></pre>`
      );
      continue;
    }

    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h1 = line.match(/^# (.+)/);
    if (h1) {
      output.push(
        `<h1 class="mb-4 mt-10 text-3xl font-bold tracking-tight text-foreground md:text-4xl">${inlineMarkdown(h1[1])}</h1>`
      );
      i++;
      continue;
    }
    if (h2) {
      output.push(
        `<h2 class="mb-3 mt-10 border-b border-border pb-3 text-2xl font-bold tracking-tight text-foreground">${inlineMarkdown(h2[1])}</h2>`
      );
      i++;
      continue;
    }
    if (h3) {
      output.push(
        `<h3 class="mb-2 mt-6 text-xl font-bold tracking-tight text-primary">${inlineMarkdown(h3[1])}</h3>`
      );
      i++;
      continue;
    }

    if (line.match(/^---+$/)) {
      output.push('<hr class="my-8 border-border" />');
      i++;
      continue;
    }

    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(
          `<li class="flex gap-3"><span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span><span>${inlineMarkdown(lines[i].slice(2))}</span></li>`
        );
        i++;
      }
      output.push(`<ul class="my-4 ml-2 space-y-2 text-muted">${items.join("")}</ul>`);
      continue;
    }

    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      let n = 1;
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        const text = lines[i].replace(/^\d+\. /, "");
        items.push(
          `<li class="flex gap-3"><span class="min-w-[1.4rem] font-mono font-bold text-primary">${n}.</span><span>${inlineMarkdown(text)}</span></li>`
        );
        i++;
        n++;
      }
      output.push(`<ol class="my-4 ml-2 space-y-2 text-muted">${items.join("")}</ol>`);
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].match(/^---+$/) &&
      !lines[i].match(/^[-*] /) &&
      !lines[i].match(/^\d+\. /)
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      output.push(`<p class="my-4 leading-8 text-muted">${inlineMarkdown(paraLines.join(" "))}</p>`);
    }
  }

  return output.join("\n");
}
