"use client"
import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, A11y } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import { usePatel } from "./patelContext.js"

export default function NewsHeroCarousel() {
  const ctx = usePatel()
  const blogs = ctx?.blogs || []
  const formatContent = ctx?.formatContent

  const news = useMemo(() => {
    const primary = blogs.filter(
      (b) => (b.category && /news|समाचार|ख़बर/i.test(b.category)) || /news|समाचार|ख़बर/i.test(b.title || ""),
    )
    const list = (primary.length ? primary : blogs).slice(0, 6)
    return list
  }, [blogs])

  if (!news?.length) return null

  return (
    <section className="relative w-full overflow-hidden" aria-labelledby="latest-news-heading">
      <div className="absolute inset-0 -z-10 bg-card" />
      <h1 id="latest-news-heading" className="sr-only">
        ताज़ा समाचार
      </h1>

      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        autoplay={{ delay: 4000, pauseOnMouseEnter: true, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-[440px] md:h-[520px]"
      >
        {news.map((item) => (
          <SwiperSlide key={item._id}>
            <article className="relative h-full">
              <div className="absolute inset-0">
                <Image
                  src={item?.image?.url || "/placeholder.svg?height=800&width=1400&query=news%20cover"}
                  alt={item?.title || "समाचार"}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
              </div>

              <div className="relative h-full container mx-auto px-4 flex items-end pb-8 md:items-center md:pb-0">
                <div className="max-w-2xl bg-card/90 backdrop-blur rounded-xl p-4 md:p-6 shadow-md">
                  <p className="text-xs tracking-wide uppercase text-emerald-400">ताज़ा समाचार</p>
                  <h2 className="font-serif text-white text-2xl md:text-4xl font-bold text-balance mt-1">
                    {item.title}
                  </h2>
                  <p className="hidden md:block text-muted-foreground mt-3 line-clamp-3">
                    {typeof formatContent === "function" ? formatContent(item.content) : item.excerpt || ""}
                  </p>
                  <div className="mt-4">
                    <Link
                      href={`/blog/${item._id}`}
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label="और पढ़ें"
                    >
                      और पढ़ें →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
