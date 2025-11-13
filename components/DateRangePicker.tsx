"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import AvailabilityCalendar from "./AvailabilityCalendar";
import { CalendarIcon } from "./Icons";

interface DateRangePickerProps {
  label?: string;
  startPlaceholder: string;
  endPlaceholder: string;
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  helperText?: string;
  clearLabel: string;
  locale?: string;
  monthsToShow?: number;
  compact?: boolean;
  instructions?: string;
  legendLabels?: {
    available: string;
    booked: string;
    selected: string;
  };
  calendarTitle?: string;
  location?: "hero" | "contact";
  closeLabel?: string;
  emptyValueLabel?: string;
}

const formatDisplayDate = (value: string, locale: string, isClient: boolean) => {
  if (!value) return "";
  // Only format dates on client-side to avoid hydration mismatch
  if (!isClient) return value;
  try {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

export default function DateRangePicker({
  label,
  startPlaceholder,
  endPlaceholder,
  startDate,
  endDate,
  onChange,
  helperText,
  clearLabel,
  locale = "en",
  monthsToShow = 2,
  compact = true,
  instructions,
  legendLabels,
  calendarTitle = "Availability",
  location = "contact",
  closeLabel = "Close",
  emptyValueLabel = "Select date",
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [hasMountedCalendar, setHasMountedCalendar] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const displayStart = useMemo(() => (startDate ? formatDisplayDate(startDate, locale, isClient) : emptyValueLabel), [startDate, locale, emptyValueLabel, isClient]);
  const displayEnd = useMemo(() => (endDate ? formatDisplayDate(endDate, locale, isClient) : emptyValueLabel), [endDate, locale, emptyValueLabel, isClient]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (open && !hasMountedCalendar) {
      setHasMountedCalendar(true);
    }
  }, [open, hasMountedCalendar]);

  const handleSelectionChange = (start: string | null, end: string | null) => {
    const normalizedStart = start ?? "";
    const normalizedEnd = end ?? "";
    onChange(normalizedStart, normalizedEnd);
    if (start && end) {
      setTimeout(() => setOpen(false), 120);
    }
  };

  const clearDates = () => {
    onChange("", "");
  };

  return (
    <div className="space-y-2" ref={wrapperRef}>
      {label ? <label className="text-sm font-medium text-slate-700">{label}</label> : null}
      <div className="grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={startPlaceholder}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
        >
          <span className="flex flex-col">
            <span className="text-xs text-slate-500">{startPlaceholder}</span>
            <span className="font-medium">{displayStart}</span>
          </span>
          <CalendarIcon className="h-4 w-4 text-slate-500" />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={endPlaceholder}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-left text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-200"
        >
          <span className="flex flex-col">
            <span className="text-xs text-slate-500">{endPlaceholder}</span>
            <span className="font-medium">{displayEnd}</span>
          </span>
          <CalendarIcon className="h-4 w-4 text-slate-500" />
        </button>
      </div>
      {helperText ? <p className="text-xs text-slate-500">{helperText}</p> : null}
      {hasMountedCalendar && open && (
        <div
          className="relative"
          role="dialog"
          aria-label={calendarTitle}
          aria-modal="true"
        >
          <div
            className="absolute left-0 right-0 z-30 mt-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl transition-all duration-150 sm:w-auto"
          >
            <AvailabilityCalendar
              compact={compact}
              monthsToShow={monthsToShow}
              onSelectionChange={handleSelectionChange}
              selectedStart={startDate || undefined}
              selectedEnd={endDate || undefined}
              legendLabels={legendLabels}
              title={calendarTitle}
              instructions={instructions}
              location={location}
            />
            <div className="mt-3 flex items-center justify-between text-xs">
              <button type="button" onClick={clearDates} className="font-medium text-rose-600 hover:text-rose-700">
                {clearLabel}
              </button>
              <button type="button" onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700">
                {closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
