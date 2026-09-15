import { ANALYSIS_STEPS } from "../lib/mock-data";

type RunningStateProps = {
  queryText: string;
};

export default function RunningState({ queryText }: RunningStateProps) {
  return (
    <section className="state-running">
      <div className="running-inner">
        <div className="running-q">{queryText}</div>
        <div className="analyzing-box">
          <div className="analyzing-label">Analyzing</div>
          <div className="steps">
            {ANALYSIS_STEPS.map((s) => {
              const done = s.status === "done";
              const current = s.status === "current";
              const bg = done ? "var(--accent)" : current ? "var(--accent-tint)" : "var(--hairline-strong)";
              const color = s.status === "pending" ? "var(--text-faint)" : "var(--text)";
              return (
                <div key={s.text} className="step-row">
                  <span className="step-box" style={{ background: bg }}>
                    {done && (
                      <svg viewBox="0 0 8 8" fill="none">
                        <path
                          d="M1 4l2 2 4-4"
                          stroke="#07140d"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {current && (
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--accent)" }} />
                    )}
                  </span>
                  <span className="step-text" style={{ color }}>
                    {s.text}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="sweep-track">
            <div className="sweep-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
