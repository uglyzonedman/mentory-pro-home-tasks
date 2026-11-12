import { useId, type ReactNode } from "react";

type PanelProps = {
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
};

export const Panel = ({ children, title, actions }: PanelProps) => {
  const titleId = useId();

  return (
    <section className="panel" aria-labelledby={titleId}>
      <h2 id={titleId} className="panel__title">
        {title}
      </h2>
      <div className="panel__body">{children}</div>
      {actions && <div className="panel__actions">{actions}</div>}
    </section>
  );
};
