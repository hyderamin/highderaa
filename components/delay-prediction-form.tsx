"use client"
import type React from "react"
import { useState } from "react"

/** Your published Google Sheet CSV */
const MASTER_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS-xYvfI3vFOxZ4yjVwAEQ1T68bcuzQkSEfgMWVSPcOFJt48_U24pKP9C_e8odreBYdXjM3M8D1dgMP/pub?output=csv"

/* ----------------- helpers ----------------- */
function normTrain(s: string) {
  return (s || "").replace(/\s+/g, "").toUpperCase() // "ICE 845" -> "ICE845"
}
function familyOf(s: string) {
  const m = normTrain(s).match(/^[A-Z]+/)
  return m ? m[0] : null // "ICE845" -> "ICE"
}
function toHour(date: string, time: string) {
  // Browser timezone; OK for MVP
  return new Date(`${date}T${time}:00`).getHours()
}
// convert JS getDay() 0=Sun..6=Sat to 0=Mon..6=Sun
function toWeekday(date: string) {
  const js = new Date(`${date}T00:00:00`).getDay()
  return (js + 6) % 7
}
function weekdayName(idx: number | null) {
  const names = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  if (idx == null || idx < 0 || idx > 6) return ""
  return names[idx]
}
function median(nums: number[]) {
  if (!nums.length) return null
  const a = [...nums].sort((x, y) => x - y)
  const mid = Math.floor(a.length / 2)
  return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2
}

/** Simple CSV loader (assumes values don’t contain commas) */
async function fetchCSV(url: string) {
  const r = await fetch(url + `&cachebust=${Date.now()}`)
  if (!r.ok) throw new Error(`CSV fetch failed: ${r.status}`)
  const text = await r.text()
  const lines = text.trim().split(/\r?\n/)
  const headers = lines.shift()!.split(",")
  return lines.map((line) => {
    const cells = line.split(",")
    const row: Record<string, any> = {}
    headers.forEach((h, i) => (row[h] = cells[i] === "" ? null : cells[i]))
    // Normalize types based on YOUR headers
    if (row.hour != null) row.hour = Number(row.hour)
    if (row.delay_minutes != null) row.delay_minutes = Number(row.delay_minutes)
    if (row.train_number) row.train_number = normTrain(row.train_number)
    // date remains a string "YYYY-MM-DD"
    return row
  })
}

/** Build aggregates in the browser from your raw rows */
function buildAggregates(rows: any[]) {
  const mapTrainHourWeek = new Map<string, number[]>()
  const mapTrainHour = new Map<string, number[]>()
  const mapFamHourWeek = new Map<string, number[]>()
  const mapFamHour = new Map<string, number[]>()
  const mapStationHour = new Map<string, number[]>()
  const mapNationalHour = new Map<string, number[]>()
  const allDelays: number[] = []

  const push = (m: Map<string, number[]>, k: string, v: number) => {
    if (!m.has(k)) m.set(k, [])
    m.get(k)!.push(v)
  }

  for (const r of rows) {
    const train: string | null = r.train_number || null
    const fam: string | null = train ? familyOf(train) : null
    const hour: number | null = Number.isFinite(r.hour) ? r.hour : null
    const weekday: number | null = r.date ? toWeekday(r.date as string) : null
    const station: string | null = r.station || null
    const delay: number | null = typeof r.delay_minutes === "number" ? r.delay_minutes : null

    if (delay == null) continue

    allDelays.push(delay)

    if (train && hour != null && weekday != null) push(mapTrainHourWeek, `${train}|${hour}|${weekday}`, delay)

    if (train && hour != null) push(mapTrainHour, `${train}|${hour}`, delay)

    if (fam && hour != null && weekday != null) push(mapFamHourWeek, `${fam}|${hour}|${weekday}`, delay)

    if (fam && hour != null) push(mapFamHour, `${fam}|${hour}`, delay)

    if (station && hour != null) push(mapStationHour, `${station}|${hour}`, delay)

    if (hour != null) push(mapNationalHour, `${hour}`, delay)
  }

  const toMedianMap = (m: Map<string, number[]>) => {
    const out = new Map<string, { med: number | null; count: number }>()
    for (const [k, arr] of m.entries()) out.set(k, { med: median(arr), count: arr.length })
    return out
  }

  return {
    L1: toMedianMap(mapTrainHourWeek),
    L2: toMedianMap(mapTrainHour),
    L3: toMedianMap(mapFamHourWeek),
    L4: toMedianMap(mapFamHour),
    L5: toMedianMap(mapStationHour),
    L6: toMedianMap(mapNationalHour),
    L7: { med: median(allDelays), count: allDelays.length },
  }
}

/** Try levels L1..L7 (first hit wins) */
function pickFromAggregates(
  ag: ReturnType<typeof buildAggregates>,
  q: any,
): { med: number | null; key: string; count?: number } {
  const { train, fam, hour, weekday, station } = q
  const hit = (val: { med: number | null; count: number } | undefined, key: string) =>
    val ? { med: val.med, key, count: val.count } : null

  if (train != null && hour != null && weekday != null) {
    const k = `${train}|${hour}|${weekday}`
    const v = ag.L1.get(k)
    const h = hit(v, "train+hour+weekday")
    if (h) return h
  }
  if (train != null && hour != null) {
    const k = `${train}|${hour}`
    const v = ag.L2.get(k)
    const h = hit(v, "train+hour")
    if (h) return h
  }
  if (fam != null && hour != null && weekday != null) {
    const k = `${fam}|${hour}|${weekday}`
    const v = ag.L3.get(k)
    const h = hit(v, "family+hour+weekday")
    if (h) return h
  }
  if (fam != null && hour != null) {
    const k = `${fam}|${hour}`
    const v = ag.L4.get(k)
    const h = hit(v, "family+hour")
    if (h) return h
  }
  if (station != null && hour != null) {
    const k = `${station}|${hour}`
    const v = ag.L5.get(k)
    const h = hit(v, "station+hour")
    if (h) return h
  }
  if (hour != null) {
    const k = `${hour}`
    const v = ag.L6.get(k)
    const h = hit(v, "national+hour")
    if (h) return h
  }
  return { med: ag.L7.med, key: "overall", count: ag.L7.count }
}

/** Copy/UX helpers */
function friendlyPattern(
  key: string,
  q: { train?: string; fam?: string; hour?: number; weekday?: number; station?: string | null },
) {
  const h = q.hour != null ? `${q.hour.toString().padStart(2, "0")}:00` : ""
  const w = weekdayName(q.weekday ?? null)
  switch (key) {
    case "train+hour+weekday":
      return `${q.train} at ${h} on ${w}`
    case "train+hour":
      return `${q.train} around ${h}`
    case "family+hour+weekday":
      return `${q.fam} trains at ${h} on ${w}`
    case "family+hour":
      return `${q.fam} trains around ${h}`
    case "station+hour":
      return `${q.station ?? "this station"} around ${h}`
    case "national+hour":
      return `all trains around ${h}`
    default:
      return "overall historical data"
  }
}
function confidenceLabel(level: string, count: number | undefined) {
  if (!count || count < 5) return "Low"
  if (level === "overall" || level.startsWith("national")) return count >= 50 ? "Medium" : "Low"
  if (level.startsWith("station")) return count >= 20 ? "Medium" : "Low"
  if (level.startsWith("family")) return count >= 15 ? "High" : "Medium"
  if (level.startsWith("train")) return count >= 8 ? "High" : "Medium"
  return "Low"
}

/* ----------------- component ----------------- */
type Result = {
  headline: string // big primary line
  detailsLine: string // compact context line
  fallbackNote?: string // only when we didn't hit L1
}

export function DelayPredictionForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setResult(null)
    setLoading(true)
    try {
      const fd = new FormData(e.currentTarget)
      const startStation = (fd.get("startStation") as string) || ""
      const date = (fd.get("date") as string) || ""
      const time = (fd.get("time") as string) || ""
      const trainInput = (fd.get("train") as string) || ""

      if (!date || !time) throw new Error("Please enter date and time.")
      if (!trainInput) throw new Error("Please enter a train number.")

      const train = normTrain(trainInput)
      const fam = familyOf(train)
      const hour = toHour(date, time)
      const weekday = toWeekday(date)
      const station = startStation.trim() || null

      const rows = await fetchCSV(MASTER_URL)
      const ag = buildAggregates(rows)
      const pick = pickFromAggregates(ag, { train, fam, hour, weekday, station })

      // Primary headline:
      let headline: string
      if (pick.med == null) {
        headline = "Likely delay: —"
      } else if (pick.med <= 0) {
        // “on-time” => show what the user really cares about
        headline = "Likely delay: 0–15 min (possible)"
      } else {
        headline = `Likely delay: ${pick.med.toFixed(1)} min`
      }

      const pattern = friendlyPattern(pick.key, { train, fam, hour, weekday, station })
      const confidence = confidenceLabel(pick.key, pick.count)
      const countText = typeof pick.count === "number" ? `${pick.count} past trips` : "historical data"
      const detailsLine = `Confidence: ${confidence} • Based on ${countText} • Pattern: ${pattern}`

      const fallbackNote =
        pick.key === "train+hour+weekday"
          ? undefined
          : pick.key.startsWith("family")
            ? "Few exact trips; used the train family pattern."
            : pick.key.startsWith("station")
              ? "Few train-level trips; used station pattern."
              : pick.key.startsWith("national")
                ? "Very few local trips; used national-by-hour pattern."
                : "Sparse data; used overall history."

      setResult({ headline, detailsLine, fallbackNote })
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="text-sm mb-1">Start Destination</span>
          <input name="startStation" placeholder="e.g. Berlin Hbf" className="w-full rounded border px-3 py-2" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm mb-1">End Destination</span>
          <input name="endStation" placeholder="e.g. München Hbf" className="w-full rounded border px-3 py-2" />
        </label>
        <label className="flex flex-col">
          <span className="text-sm mb-1">Date</span>
          <input name="date" type="date" className="w-full rounded border px-3 py-2" required />
        </label>
        <label className="flex flex-col">
          <span className="text-sm mb-1">Time</span>
          <input name="time" type="time" className="w-full rounded border px-3 py-2" required />
        </label>
        <label className="flex flex-col sm:col-span-2">
          <span className="text-sm mb-1">Train Number</span>
          <input name="train" placeholder="e.g. ICE 845" className="w-full rounded border px-3 py-2" required />
        </label>
      </div>

      <button type="submit" disabled={loading} className="rounded bg-red-600 px-4 py-2 text-white">
        {loading ? "Predicting…" : "Predict the Delay"}
      </button>

      {error && <div className="mt-3 text-red-600 text-sm">Error: {error}</div>}

      {result && (
        <div className="mt-4 p-4 rounded border space-y-2">
          <div className="text-lg font-semibold">{result.headline}</div>
          <div className="text-sm text-gray-700">{result.detailsLine}</div>
          {result.fallbackNote && <div className="text-xs text-gray-500">{result.fallbackNote}</div>}
        </div>
      )}
    </form>
  )
}
