"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { FaArrowLeft, FaArrowRight, FaNewspaper } from "react-icons/fa"

const sampleNews = [
  {
    id: 1,
    title: "मंडी भाव अपडेट: सोयाबीन और गेहूँ में हल्की तेजी",
    summary: "देवास, उज्जैन और रतलाम मंडियों से ताजे रेट्स—किसानों के लिए महत्वपूर्ण जानकारी।",
    href: "/news/mandi-bhav-0902",
    image: "/mandi-field.png",
    tag: "मंडी भाव",
    date: "2025-09-02",
  },
  {
    id: 2,
    title: "सरकारी योजना: सिंचाई के लिए नई सब्सिडी",
    summary: "छोटे और सीमांत किसानों के लिए आसान आवेदन प्रक्रिया—जानें पात्रता और लाभ।",
    href: "/news/sichai-yojana",
    image: "/irrigation-scheme.png",
    tag: "योजनाएँ",
    date: "2025-08-31",
  },
  {
    id: 3,
    title: "समाज समाचार: गाँवों में स्मार्ट कक्षा की शुरुआत",
    summary: "बच्चों की बेहतर शिक्षा के लिए तकनीक—पहला चरण देवास और धार में शुरू।",
    href: "/news/smart-class",
    image: "/smart-classroom.png",
    tag: "समाज",
    date: "2025-08-28",
  },
]

export default function NewsHero() {
  const [index, setIndex] = useState(0)
  const timer = useRef(null)
  const len = sampleNews.length

  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % len)
    }, 5000)
    return () => clearInterval(timer.current)
  }, [len])

  const go = (dir) => {
    setIndex((i) => (i + (dir === "next" ? 1 : -1) + len) % len)
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = setInterval(() => setIndex((i) => (i + 1) % len), 5000)
    }
  }

  // Touch swipe
  const startX = useRef(0)
  const onTouchStart = (e) => (startX.current = e.touches[0].clientX)
  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - startX.current
    if (dx > 50) go("prev")
    if (dx < -50) go("next")
  }

  const slide = sampleNews[index]

  return (
    <section className="w-full border-b">
      <div
        className="relative mx-auto w-full max-w-6xl px-4 py-6 md:py-10"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-emerald-700 font-medium">
              <FaNewspaper aria-hidden />
              <span className="text-sm">{slide.tag}</span>
            </div>
            <h1 className="mt-2 font-serif text-2xl md:text-4xl font-bold text-balance text-emerald-900">
              {slide.title}
            </h1>
            <p className="mt-2 text-sm md:text-base text-muted-foreground text-pretty">{slide.summary}</p>
            <div className="mt-4 flex items-center gap-3">
              <Link
                href={slide.href}
                className="inline-flex rounded-md bg-primary text-primary-foreground px-4 py-2 hover:opacity-90"
              >
                पूरी खबर पढ़ें →
              </Link>
              <div className="hidden md:flex items-center gap-2">
                <button
                  aria-label="Previous news"
                  onClick={() => go("prev")}
                  className="rounded-md border px-3 py-2 hover:bg-card"
                >
                  <FaArrowLeft />
                </button>
                <button
                  aria-label="Next news"
                  onClick={() => go("next")}
                  className="rounded-md border px-3 py-2 hover:bg-card"
                >
                  <FaArrowRight />
                </button>
              </div>
            </div>
            {/* Dots */}
            <div className="mt-4 flex items-center gap-2" role="tablist" aria-label="News slides">
              {sampleNews.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-controls={`slide-${i}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full ${i === index ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
          </div>

          <Link href={slide.href} id={`slide-${index}`} className="block group">
            <div className="relative overflow-hidden rounded-xl border aspect-[16/10] md:aspect-[16/9]">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute left-3 top-3 rounded-md bg-white/90 text-emerald-700 text-xs px-2 py-1 border">
                {new Date(slide.date).toLocaleDateString("hi-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
