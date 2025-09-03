"use client"

import Link from "next/link"

export default function QuickNav({ items = [] }) {
  if (!items?.length) return null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className="group rounded-xl border bg-card p-3 md:p-4 flex items-center gap-3 hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label={item.name}
          >
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border"
              aria-hidden
            >
              {Icon ? <Icon /> : null}
            </span>
            <div className="flex-1">
              <p className="text-sm md:text-base font-medium text-emerald-900">{item.name}</p>
              <p className="text-xs text-muted-foreground hidden sm:block">जाएँ</p>
            </div>
            <span className="opacity-0 group-hover:opacity-100 text-emerald-600 text-sm">→</span>
          </Link>
        )
      })}
    </div>
  )
}
