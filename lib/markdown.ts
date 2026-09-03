/**
 * Lightweight markdown to HTML renderer.
 * Handles: headings, bold, italic, inline code, code blocks,
 * unordered/ordered lists, horizontal rules, paragraphs, links.
 * No external dependencies — pure string transforms.
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
    // Bold **text**
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic *text*
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Inline code `code`
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-violet-950/60 text-violet-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
    )
    // Links [text](url)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-violet-400 underline hover:text-violet-300 transition-colors">$1</a>'
    );
}

export function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const output: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++; // skip closing ```
      output.push(
        `<pre class="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto my-6"><code class="text-sm font-mono text-slate-300 leading-relaxed">${codeLines.join("\n")}</code></pre>`
      );
      continue;
    }

    // Headings
    const h3 = line.match(/^### (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h1 = line.match(/^# (.+)/);
    if (h1) {
      output.push(
        `<h1 class="text-3xl md:text-4xl font-bold text-white mt-10 mb-4">${inlineMarkdown(h1[1])}</h1>`
      );
      i++;
      continue;
    }
    if (h2) {
      output.push(
        `<h2 class="text-2xl font-bold text-white mt-10 mb-3 pb-2 border-b border-slate-800">${inlineMarkdown(h2[1])}</h2>`
      );
      i++;
      continue;
    }
    if (h3) {
      output.push(
        `<h3 class="text-xl font-semibold text-violet-300 mt-6 mb-2">${inlineMarkdown(h3[1])}</h3>`
      );
      i++;
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      output.push('<hr class="border-slate-800 my-8" />');
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(
          `<li class="flex gap-2"><span class="text-violet-400 mt-1">&#8226;</span><span>${inlineMarkdown(lines[i].slice(2))}</span></li>`
        );
        i++;
      }
      output.push(`<ul class="space-y-2 my-4 ml-2">${items.join("")}</ul>`);
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      let n = 1;
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        const text = lines[i].replace(/^\d+\. /, "");
        items.push(
          `<li class="flex gap-3"><span class="text-violet-400 font-bold min-w-[1.2rem]">${n}.</span><span>${inlineMarkdown(text)}</span></li>`
        );
        i++;
        n++;
      }
      output.push(`<ol class="space-y-2 my-4 ml-2">${items.join("")}</ol>`);
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-special lines
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
      output.push(
        `<p class="text-slate-300 leading-relaxed my-4">${inlineMarkdown(paraLines.join(" "))}</p>`
      );
    }
  }

  return output.join("\n");
}
