"use client"
import Link from "next/link"
import { FiRss, FiMap, FiCalendar, FiTrendingUp, FiUsers, FiBookOpen } from "react-icons/fi"

const tiles = [
  { href: "/blog", title: "समाचार", desc: "ताज़ा खबरें", icon: FiRss },
  { href: "/villages", title: "हमारे गाँव", desc: "जानकारी व नक्शा", icon: FiMap },
  { href: "/events", title: "कार्यक्रम", desc: "आगामी आयोजन", icon: FiCalendar },
  { href: "/prices", title: "मंडी भाव", desc: "लाइव भाव", icon: FiTrendingUp },
  { href: "/wall", title: "समाज की आवाज़", desc: "पोस्ट और राय", icon: FiUsers },
  { href: "/stories", title: "कहानियाँ", desc: "प्रेरक सफर", icon: FiBookOpen },
]

export default function NavTiles() {
  return (
    <nav aria-label="मुख्य सेक्शन" className="container mx-auto px-4 -mt-10 md:-mt-14">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {tiles.map(({ href, title, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border bg-card text-card-foreground p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-medium leading-tight">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  )
}
