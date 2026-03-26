"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// Min: June 1, 2025
const MIN_DATE = new Date(2025, 5, 1);

export interface DateRange {
  start: Date;
  end: Date;
}

interface Props {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function formatDate(d: Date) {
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay(); // 0 = Sunday
}

export function DateRangePicker({ value, onChange }: Props) {
  const today = startOfDay(new Date());
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(value.start.getFullYear());
  const [viewMonth, setViewMonth] = useState(value.start.getMonth());
  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSelecting("start");
        setHoverDate(null);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function isDisabled(d: Date) {
    return d < MIN_DATE || d > today;
  }

  function isStart(d: Date) {
    return sameDay(d, value.start);
  }

  function isEnd(d: Date) {
    if (selecting === "end" && hoverDate) return sameDay(d, hoverDate);
    return sameDay(d, value.end);
  }

  function isInRange(d: Date) {
    const lo = startOfDay(value.start);
    const hi = selecting === "end" && hoverDate
      ? startOfDay(hoverDate)
      : startOfDay(value.end);
    const [rangeStart, rangeEnd] = lo <= hi ? [lo, hi] : [hi, lo];
    return d > rangeStart && d < rangeEnd;
  }

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  function canGoPrev() {
    return viewYear > 2025 || (viewYear === 2025 && viewMonth > 5);
  }

  function canGoNext() {
    return viewYear < today.getFullYear() ||
      (viewYear === today.getFullYear() && viewMonth < today.getMonth());
  }

  function handleDayClick(d: Date) {
    if (isDisabled(d)) return;
    if (selecting === "start") {
      onChange({ start: d, end: d });
      setSelecting("end");
    } else {
      const s = startOfDay(value.start);
      const e = startOfDay(d);
      if (e < s) {
        onChange({ start: e, end: s });
      } else {
        onChange({ start: s, end: e });
      }
      setSelecting("start");
      setOpen(false);
      setHoverDate(null);
    }
  }

  // Build calendar grid
  const totalDays = daysInMonth(viewYear, viewMonth);
  const firstDay = firstWeekday(viewYear, viewMonth);
  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="relative" ref={ref}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          setSelecting("start");
          setHoverDate(null);
          setViewYear(value.start.getFullYear());
          setViewMonth(value.start.getMonth());
        }}
        className="flex items-center gap-3 w-full h-14 px-5 rounded-xl text-left transition-all"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: open ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Calendar className="w-4 h-4 shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} />
        <span className="text-white text-sm font-light flex-1">
          {formatDate(value.start)} — {formatDate(value.end)}
        </span>
        <div className="flex gap-1">
          {(["início", "fim"] as const).map((label, i) => (
            <span
              key={label}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: open && ((i === 0 && selecting === "start") || (i === 1 && selecting === "end"))
                  ? "rgba(255,255,255,0.15)" : "transparent",
                color: open && ((i === 0 && selecting === "start") || (i === 1 && selecting === "end"))
                  ? "#fff" : "rgba(255,255,255,0.3)",
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </button>

      {/* Calendar dropdown */}
      {open && (
        <div
          className="absolute top-16 left-0 z-50 rounded-2xl p-5"
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.8)",
            minWidth: "300px",
          }}
        >
          {/* Instruction */}
          <p className="section-label mb-4">
            {selecting === "start" ? "Selecione a data inicial" : "Selecione a data final"}
          </p>

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              disabled={!canGoPrev()}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity disabled:opacity-20"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <span className="text-white font-medium text-sm">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              disabled={!canGoNext()}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-opacity disabled:opacity-20"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Week header */}
          <div className="grid grid-cols-7 mb-1">
            {WEEK_DAYS.map((d) => (
              <div key={d} className="h-8 flex items-center justify-center">
                <span className="text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {d}
                </span>
              </div>
            ))}
          </div>

          {/* Day grid */}
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;

              const disabled = isDisabled(day);
              const start = isStart(day);
              const end = isEnd(day);
              const inRange = isInRange(day);
              const isToday = sameDay(day, today);

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={disabled}
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => selecting === "end" && !disabled && setHoverDate(day)}
                  onMouseLeave={() => selecting === "end" && setHoverDate(null)}
                  className="h-8 w-full flex items-center justify-center text-xs transition-all rounded-lg"
                  style={{
                    background: start || end
                      ? "#fff"
                      : inRange
                      ? "rgba(255,255,255,0.1)"
                      : "transparent",
                    color: start || end
                      ? "#000"
                      : disabled
                      ? "rgba(255,255,255,0.15)"
                      : inRange
                      ? "#fff"
                      : isToday
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.6)",
                    fontWeight: start || end ? "600" : isToday ? "600" : "400",
                    cursor: disabled ? "not-allowed" : "pointer",
                    outline: isToday && !start && !end ? "1px solid rgba(255,255,255,0.2)" : "none",
                  }}
                >
                  {day.getDate()}
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div
            className="mt-4 pt-4 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
              {formatDate(value.start)} — {formatDate(value.end)}
            </span>
            <button
              type="button"
              onClick={() => { setOpen(false); setSelecting("start"); setHoverDate(null); }}
              className="text-xs px-3 py-1.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Keep legacy export alias so the import in ClientReportForm still works
export { DateRangePicker as MonthRangePicker };
export type { DateRange as MonthRange };
