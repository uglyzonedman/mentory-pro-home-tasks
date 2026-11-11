import { useEffect, useRef } from "react";

let active = 0;

export const getActive = () => active;

type Props = {
  title: string;
};

export const Child = ({ title }: Props) => {
  console.log(`[render] Child, title="${title}"`);

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new MutationObserver((records) => {
      records.forEach((r) =>
        console.log(`[DOM] ${r.type}`, r.target.nodeValue ?? r.target.nodeName),
      );
    });
    observer.observe(node, {
      subtree: true,
      characterData: true,
      childList: true,
      attributes: true,
    });
    active++;
    console.log(`[effect] подписка создана, активных: ${active}`);

    return () => {
      active--;
      observer.disconnect();
      console.log(`[effect] подписка снята, активных: ${active}`);
    };
  }, []);

  return (
    <section ref={ref}>
      <h2>{title}</h2>
      <p>Постоянный текст ребёнка</p>
    </section>
  );
};
