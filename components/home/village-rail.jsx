"use client"

import Link from "next/link"
import { FaMapMarkerAlt } from "react-icons/fa"

const sampleVillages = [
  {
    id: "silawati",
    name: "Silawati (सिलावटि)",
    district: "Dewas",
    image: "/village-mosque.png",
    href: "/directory?focus=silawati",
  },
  {
    id: "malwasa",
    name: "Malwasa (मलवासा)",
    district: "Ratlam",
    image: "/village-green-fields.png",
    href: "/directory?focus=malwasa",
  },
  {
    id: "bank",
    name: "Bank (बांक)",
    district: "Dhar",
    image: "/village-road.png",
    href: "/directory?focus=bank",
  },
  {
    id: "ujjain",
    name: "Ujjain Rural",
    district: "Ujjain",
    image: "/ujjain-village.png",
    href: "/directory?focus=ujjain",
  },
]

export default function VillageRail() {
  return (
    <section>
      <header className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-emerald-800">हमारे गाँव</h2>
          <p className="text-sm text-muted-foreground">पहचान, संस्कृति और प्रगति—गाँवों की कहानी यहाँ देखें।</p>
        </div>
        <Link
          href="/directory"
          className="hidden sm:inline-flex rounded-md bg-primary text-primary-foreground px-4 py-2 hover:opacity-90"
        >
          सभी गाँव →
        </Link>
      </header>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-pl-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sampleVillages.map((v) => (
            <Link
              key={v.id}
              href={v.href}
              className="min-w-[80%] sm:min-w-[360px] lg:min-w-[380px] snap-start"
              aria-label={`${v.name} - ${v.district}`}
            >
              <article className="rounded-xl border bg-card overflow-hidden">
                <div className="aspect-[16/10] relative">
                  <img
                    src={v.image || "/placeholder.svg"}
                    alt={`${v.name} image`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-emerald-900">{v.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-600" aria-hidden /> {v.district}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="sm:hidden text-center mt-5">
          <Link
            href="/directory"
            className="inline-flex rounded-md bg-primary text-primary-foreground px-4 py-2 hover:opacity-90"
          >
            View All Villages →
          </Link>
        </div>
      </div>
    </section>
  )
}
