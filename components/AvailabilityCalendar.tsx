"use client";

import { useEffect, useState } from "react";
import {
  trackCalendarView,
  trackDateSelection,
  trackCalendarNavigation,
  trackBlockedDateClick,
} from "@/lib/analytics";

interface BookedRange {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
}

interface AvailabilityCalendarProps {
  onDateSelect?: (startDate: string, endDate: string) => void;
  onSelectionChange?: (startDate: string | null, endDate: string | null) => void;
  selectedStart?: string;
  selectedEnd?: string;
  monthsToShow?: number;
  compact?: boolean;
  maxAdvanceMonths?: number;
  title?: string;
  legendLabels?: {
    available: string;
    booked: string;
    selected: string;
  };
  instructions?: string;
  location?: 'hero' | 'contact'; // For tracking purposes
}

export default function AvailabilityCalendar({
  onDateSelect,
  onSelectionChange,
  selectedStart,
  selectedEnd,
  monthsToShow = 3,
  compact = false,
  maxAdvanceMonths = 12,
  title = "Availability",
  legendLabels = { available: "Available", booked: "Booked", selected: "Selected" },
  instructions,
  location = 'contact',
}: AvailabilityCalendarProps) {
  const [bookedRanges, setBookedRanges] = useState<BookedRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectingStart, setSelectingStart] = useState(true);
  const [tempStart, setTempStart] = useState<string | null>(selectedStart || null);
  const [tempEnd, setTempEnd] = useState<string | null>(selectedEnd || null);
  const [startMonthOffset, setStartMonthOffset] = useState(0);
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const maxStartOffset = Math.max(0, maxAdvanceMonths - monthsToShow);

  useEffect(() => {
    fetchAvailability();
  }, []);

  useEffect(() => {
    if (selectedStart === undefined && selectedEnd === undefined) {
      return;
    }
    const normalizedStart = selectedStart && selectedStart.length ? selectedStart : null;
    const normalizedEnd = selectedEnd && selectedEnd.length ? selectedEnd : null;
    setTempStart(normalizedStart);
    setTempEnd(normalizedEnd);
    setSelectingStart(!normalizedStart || Boolean(normalizedEnd));

    if (normalizedStart) {
      const selectedDate = new Date(normalizedStart);
      const baseDate = new Date();
      const diffInMonths = (selectedDate.getFullYear() - baseDate.getFullYear()) * 12 + (selectedDate.getMonth() - baseDate.getMonth());
      if (diffInMonths >= 0 && diffInMonths <= maxStartOffset) {
        setStartMonthOffset(diffInMonths);
      }
    }
  }, [selectedStart, selectedEnd, maxStartOffset]);

  // Track calendar view once when loaded
  useEffect(() => {
    if (!loading && !hasTrackedView) {
      trackCalendarView(location);
      setHasTrackedView(true);
    }
  }, [loading, hasTrackedView, location]);

  const fetchAvailability = async () => {
    try {
      const response = await fetch("/api/availability");
      const data = await response.json();
      if (data.success) {
        setBookedRanges(data.bookedRanges || []);
      }
    } catch (error) {
      console.error("Failed to fetch availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const isDateBooked = (dateStr: string): boolean => {
    const date = new Date(dateStr);
    return bookedRanges.some((range) => {
      const start = new Date(range.start);
      const end = new Date(range.end);
      return date >= start && date < end;
    });
  };

  const isDateInSelectedRange = (dateStr: string): boolean => {
    if (!tempStart || !tempEnd) return false;
    const date = new Date(dateStr);
    const start = new Date(tempStart);
    const end = new Date(tempEnd);
    return date >= start && date <= end;
  };

  const isDateSelected = (dateStr: string): boolean => {
    return dateStr === tempStart || dateStr === tempEnd;
  };

  const updateSelection = (start: string | null, end: string | null) => {
    setTempStart(start);
    setTempEnd(end);
    if (onSelectionChange) {
      onSelectionChange(start, end);
    }
  };

  const handleDateClick = (dateStr: string) => {
    if (isDateBooked(dateStr)) {
      // Track attempt to click blocked date
      trackBlockedDateClick(dateStr, location);
      return;
    }

    if (selectingStart || !tempStart) {
      updateSelection(dateStr, null);
      setSelectingStart(false);
    } else {
      // Selecting end date
      const start = new Date(tempStart);
      const end = new Date(dateStr);

      if (end < start) {
        // Swap if end is before start
        updateSelection(dateStr, tempStart);
        if (onDateSelect) {
          onDateSelect(dateStr, tempStart);
        }
        // Track the completed date selection
        trackDateSelection(dateStr, tempStart, location);
      } else {
        // Check if any dates in range are booked
        let hasBookedDate = false;
        const current = new Date(tempStart);
        while (current <= end) {
          const currentStr = current.toISOString().split("T")[0];
          if (isDateBooked(currentStr)) {
            hasBookedDate = true;
            break;
          }
          current.setDate(current.getDate() + 1);
        }

        if (!hasBookedDate) {
          updateSelection(tempStart, dateStr);
          if (onDateSelect) {
            onDateSelect(tempStart, dateStr);
          }
          // Track the completed date selection
          trackDateSelection(tempStart, dateStr, location);
        } else {
          // Reset and start over
          updateSelection(dateStr, null);
          setSelectingStart(false);
        }
      }
      setSelectingStart(true);
    }
  };

  const renderMonth = (monthOffset: number) => {
    const targetDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay(); // 0 = Sunday
    const daysInMonth = lastDay.getDate();

    const days = [];
    const todayStr = today.toISOString().split("T")[0];

    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isBooked = isDateBooked(dateStr);
      const isInRange = isDateInSelectedRange(dateStr);
      const isSelected = isDateSelected(dateStr);
      const isToday = dateStr === todayStr;
      const isPast = new Date(dateStr) < new Date(todayStr);

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => !isPast && !isBooked && handleDateClick(dateStr)}
          disabled={isPast || isBooked}
          className={`
            aspect-square rounded-lg text-sm font-medium transition-colors
            ${compact ? "text-xs" : "text-sm"}
            ${isPast ? "text-slate-300 cursor-not-allowed" : ""}
            ${isBooked ? "bg-rose-100 text-rose-400 line-through cursor-not-allowed" : ""}
            ${isSelected ? "bg-rose-600 text-white ring-2 ring-rose-600 ring-offset-1" : ""}
            ${isInRange && !isSelected ? "bg-rose-200 text-rose-900" : ""}
            ${!isBooked && !isPast && !isSelected && !isInRange ? "hover:bg-slate-100" : ""}
            ${isToday && !isSelected ? "ring-2 ring-rose-600" : ""}
          `}
        >
          {day}
        </button>
      );
    }

    return (
      <div key={monthOffset} className={compact ? "min-w-[240px]" : "min-w-[280px]"}>
        <h3 className={`mb-3 font-semibold text-slate-900 ${compact ? "text-sm" : "text-base"}`}>
          {monthNames[month]} {year}
        </h3>
        <div className="grid grid-cols-7 gap-1 text-center">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className={`font-medium text-slate-500 ${compact ? "text-xs pb-1" : "text-sm pb-2"}`}>
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`rounded-2xl border border-slate-200 bg-white ${compact ? "p-4" : "p-6"} shadow-sm`}>
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-rose-600" />
        </div>
      </div>
    );
  }

  const firstVisibleMonth = monthNames[new Date(today.getFullYear(), today.getMonth() + startMonthOffset, 1).getMonth()];
  const firstVisibleYear = new Date(today.getFullYear(), today.getMonth() + startMonthOffset, 1).getFullYear();
  const lastVisibleDate = new Date(
    today.getFullYear(),
    today.getMonth() + startMonthOffset + monthsToShow - 1,
    1
  );
  const lastVisibleMonth = monthNames[lastVisibleDate.getMonth()];
  const lastVisibleYear = lastVisibleDate.getFullYear();

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white ${compact ? "p-4" : "p-6"} shadow-sm`}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className={`font-semibold text-slate-900 ${compact ? "text-base" : "text-lg"}`}>
            {title}
          </h2>
          <p className="text-xs text-slate-500">
            {firstVisibleMonth} {firstVisibleYear} – {lastVisibleMonth} {lastVisibleYear}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setStartMonthOffset((prev) => Math.max(0, prev - 1));
              trackCalendarNavigation('prev', location);
            }}
            disabled={startMonthOffset === 0}
            aria-label="Show earlier months"
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => {
              setStartMonthOffset((prev) => Math.min(maxStartOffset, prev + 1));
              trackCalendarNavigation('next', location);
            }}
            disabled={startMonthOffset >= maxStartOffset}
            aria-label="Show later months"
            className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {instructions ? (
        <p className="mb-3 text-xs text-slate-500">{instructions}</p>
      ) : null}
      <div className="mb-4 flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-white border border-slate-200" />
          <span className="text-slate-600">{legendLabels.available}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-rose-100" />
          <span className="text-slate-600">{legendLabels.booked}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded bg-rose-600" />
          <span className="text-slate-600">{legendLabels.selected}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-6">
          {Array.from({ length: monthsToShow }, (_, i) => renderMonth(startMonthOffset + i))}
        </div>
      </div>
      {tempStart && !tempEnd && (
        <p className="mt-3 text-xs text-slate-600">
          Selected check-in: <span className="font-medium">{tempStart}</span>. Now select check-out date.
        </p>
      )}
    </div>
  );
}
