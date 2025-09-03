"use client"

import Link from "next/link"

export default function MobileDock({ items = [] }) {
  // pick top tabs for mobile
  const tabs = items.filter((i) => ["Home", "News", "Villages", "Posts", "Events"].includes(i.name))

  if (!tabs.length) return null

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70 sm:hidden"
      role="navigation"
      aria-label="Primary"
    >
      <ul className="mx-auto max-w-6xl px-3 py-2 grid grid-cols-5 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <li key={tab.name}>
              <Link
                href={tab.href}
                className="flex flex-col items-center justify-center gap-0.5 rounded-md px-2 py-1.5 text-[11px] font-medium hover:text-emerald-700"
                aria-label={tab.name}
              >
                <span className="text-base" aria-hidden>
                  {Icon ? <Icon /> : null}
                </span>
                <span className="truncate">{tab.name}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
