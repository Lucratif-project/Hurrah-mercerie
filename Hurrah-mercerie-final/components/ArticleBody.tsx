// Affiche le texte d'un article avec une mise en forme simple :
//   "## Titre"  → sous-titre
//   "- élément" → liste à puces
//   ligne vide  → nouveau paragraphe
export default function ArticleBody({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let paragraph: string[] = [];

  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`ul-${blocks.length}`} className="mt-4 space-y-2">
          {list.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      list = [];
    }
  };
  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="mt-5">
          {paragraph.join(" ")}
        </p>
      );
      paragraph = [];
    }
  };

  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      flushList();
      flushParagraph();
      blocks.push(
        <h2 key={`h-${blocks.length}`} className="mt-10 text-2xl font-black text-neutral-950">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
    } else if (line === "") {
      flushList();
      flushParagraph();
    } else {
      flushList();
      paragraph.push(line);
    }
  }
  flushList();
  flushParagraph();

  return <div className="text-lg leading-8 text-neutral-700">{blocks}</div>;
}
