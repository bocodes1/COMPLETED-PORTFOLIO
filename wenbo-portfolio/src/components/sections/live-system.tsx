import { MacWindow } from "@/components/ui/mac-window";
import { Reveal } from "@/components/ui/reveal";
import { EquityChart } from "@/components/ui/equity-chart";
import { TickStream } from "@/components/ui/tick-stream";
import { StatCounter } from "@/components/ui/stat-counter";

/*
 * §3.3 — the showpiece: cex-lag-bot panel.
 *
 * TODO: telemetry below is ILLUSTRATIVE (spec §6.1). Wire to real backtest
 * numbers or a recorded run before claiming them as live. The UI labels the
 * data "illustrative" until then — do not remove that label without wiring
 * real data.
 */
const telemetry: { label: string; value: number | string; suffix?: string }[] = [
  { label: "tick latency (p50)", value: 38, suffix: " ms" },
  { label: "fill rate", value: 64, suffix: " %" },
  { label: "maker / taker", value: "100 / 0" },
  { label: "uptime", value: 212, suffix: " h" },
];

const logLines = [
  { t: "14:02:11", msg: "regime filter pass — window armed, maker quote placed" },
  { t: "14:02:14", msg: "fill @ 0.54 — holding to resolution" },
  { t: "14:07:00", msg: "resolved ITM — position settled, ledger updated" },
];

export function LiveSystem() {
  return (
    <section className="mx-auto max-w-5xl px-5 pb-28 sm:px-8 sm:pb-36">
      <Reveal>
        <MacWindow
          title="cex-lag-bot — trading-engine"
          titlebarEnd={
            <span className="flex items-center gap-2">
              <span className="live-dot" aria-hidden="true" />
              <span className="meta-label">live</span>
            </span>
          }
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-xl text-ink sm:text-2xl">
                A trading engine that runs while I sleep
              </h2>
              <span className="meta-label">illustrative data — recorded run pending</span>
            </div>
            <p className="mt-3 max-w-[62ch] text-[13px] leading-[1.8] text-ink-mid">
              Maker-only arbitrage on the pricing lag between Binance spot and
              5-minute binary options. Confidence-gated entries, hold to
              resolution, regime-filtered. Python · asyncio · websockets.
            </p>

            {/* telemetry grid */}
            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-4">
              {telemetry.map((t) => (
                <div
                  key={t.label}
                  className="bg-panel px-4 py-4 transition-colors duration-200 hover:bg-titlebar"
                >
                  <dt className="meta-label">{t.label}</dt>
                  <dd className="tabular mt-2 text-lg text-ink">
                    {typeof t.value === "number" ? (
                      <StatCounter value={t.value} suffix={t.suffix} />
                    ) : (
                      t.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* charts — grayscale, interactive */}
            <div className="mt-6 grid gap-4 lg:grid-cols-[2fr_1fr]">
              <figure className="overflow-hidden rounded-[4px] border border-line bg-bg px-4 pt-4 pb-2">
                <figcaption className="meta-label">
                  equity curve — backtest (illustrative)
                </figcaption>
                <div className="mt-2">
                  <EquityChart />
                </div>
              </figure>
              <figure className="overflow-hidden rounded-[4px] border border-line bg-bg px-4 pt-4 pb-2">
                <figcaption className="meta-label">tick latency (illustrative)</figcaption>
                <div className="mt-2">
                  <TickStream />
                </div>
              </figure>
            </div>

            {/* short log — minimal, not a fake streaming terminal */}
            <div className="mt-6 space-y-1.5 text-[12px] leading-relaxed">
              {logLines.map((l) => (
                <p key={l.t} className="text-ink-dim">
                  <span className="tabular text-ink-mid">{l.t}</span>
                  <span className="mx-2 text-line">│</span>
                  {l.msg}
                </p>
              ))}
            </div>
          </div>
        </MacWindow>
      </Reveal>
    </section>
  );
}
