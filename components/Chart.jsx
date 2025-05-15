"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Chart() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext("2d")
    const width = canvasRef.current.width
    const height = canvasRef.current.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw chart background
    ctx.fillStyle = "#f9fafb"
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i < 5; i++) {
      const y = 20 + (i * (height - 40)) / 4
      ctx.beginPath()
      ctx.moveTo(40, y)
      ctx.lineTo(width - 20, y)
      ctx.stroke()
    }

    // Vertical grid lines
    for (let i = 0; i < 12; i++) {
      const x = 40 + (i * (width - 60)) / 11
      ctx.beginPath()
      ctx.moveTo(x, 20)
      ctx.lineTo(x, height - 20)
      ctx.stroke()
    }

    // Draw axes labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px sans-serif"

    // X-axis labels (months)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    for (let i = 0; i < 12; i++) {
      const x = 40 + (i * (width - 60)) / 11
      ctx.fillText(months[i], x - 10, height - 5)
    }

    // Y-axis labels (values)
    const maxValue = 1000
    for (let i = 0; i < 5; i++) {
      const y = 20 + (i * (height - 40)) / 4
      ctx.fillText(`$${maxValue - (i * maxValue) / 4}`, 5, y + 3)
    }

    // Sample data
    const data = [200, 350, 320, 480, 600, 520, 700, 650, 800, 750, 900, 850]

    // Draw line chart
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let i = 0; i < data.length; i++) {
      const x = 40 + (i * (width - 60)) / 11
      const y = height - 20 - (data[i] / maxValue) * (height - 40)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Draw points
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 2

    for (let i = 0; i < data.length; i++) {
      const x = 40 + (i * (width - 60)) / 11
      const y = height - 20 - (data[i] / maxValue) * (height - 40)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }

    // Draw area under the line
    ctx.fillStyle = "rgba(16, 185, 129, 0.1)"
    ctx.beginPath()

    // Start from bottom left
    ctx.moveTo(40, height - 20)

    // Draw line to match the line chart
    for (let i = 0; i < data.length; i++) {
      const x = 40 + (i * (width - 60)) / 11
      const y = height - 20 - (data[i] / maxValue) * (height - 40)
      ctx.lineTo(x, y)
    }

    // Complete the path to bottom right
    ctx.lineTo(width - 20, height - 20)
    ctx.closePath()
    ctx.fill()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-64"
    >
      <canvas ref={canvasRef} width={800} height={300} className="w-full h-full"></canvas>
    </motion.div>
  )
}
