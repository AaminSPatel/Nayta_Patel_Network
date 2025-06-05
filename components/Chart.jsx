"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { usePatel } from "./patelContext"

export default function Chart({ type }) {
  const canvasRef = useRef(null)
  const { users, villages, blogs, posts } = usePatel()
  const [timeRange, setTimeRange] = useState('month') // 'day' or 'month'
  const [chartData, setChartData] = useState([])
  const [maxValue, setMaxValue] = useState(100)

  useEffect(() => {
    if (!users || !villages || !blogs || !posts) return
    
    let data = []
    let max = 0
    
    // Process data based on selected type and time range
    switch (type) {
      case 'users':
        data = processData(users, timeRange)
        max = Math.max(...data, 10)
        break
      case 'blogs':
        data = processData(blogs, timeRange)
        max = Math.max(...data, 10)
        break
      case 'posts':
        data = processData(posts, timeRange)
        max = Math.max(...data, 10)
        break
      case 'villages':
        data = processData(villages, timeRange)
        max = Math.max(...data, 10)
        break
      default:
        data = []
    }
    
    setChartData(data)
    setMaxValue(max)
  }, [type, timeRange, users, villages, blogs, posts ,type])

  // Process data by day or month
  const processData = (items, range) => {
    const now = new Date()
    let result = []
    
    if (range === 'day') {
      // Last 14 days data
      for (let i = 13; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        
        const count = items.filter(item => {
          let itemDate;
          if(type === 'posts'){
         itemDate = new Date(item.dateOfCreation).toISOString().split('T')[0]
          }else if(type === 'blogs'){
         itemDate = new Date(item.date).toISOString().split('T')[0]
          }
          else{
           itemDate = new Date(item.createdAt).toISOString().split('T')[0]

          }
          return itemDate === dateStr
        }).length
        
        result.push(count)
      }
    } else {
      // Last 12 months data
      for (let i = 11; i >= 0; i--) {
        const date = new Date(now)
        date.setMonth(date.getMonth() - i)
        const year = date.getFullYear()
        const month = date.getMonth()
        
        const count = items.filter(item => {
          const itemDate = new Date(item.createdAt)
          return itemDate.getFullYear() === year && itemDate.getMonth() === month
        }).length
        
        result.push(count)
      }
    }
    
    return result
  }

  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return

    const ctx = canvasRef.current.getContext('2d')
    const width = canvasRef.current.width
    const height = canvasRef.current.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw chart background
    ctx.fillStyle = '#f9fafb'
    ctx.fillRect(0, 0, width, height)

    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i < 6; i++) {
      const y = 20 + (i * (height - 40)) / 5
      ctx.beginPath()
      ctx.moveTo(40, y)
      ctx.lineTo(width - 20, y)
      ctx.stroke()
    }

    // Vertical grid lines
    const dataPoints = timeRange === 'day' ? 14 : 12
    for (let i = 0; i < dataPoints; i++) {
      const x = 40 + (i * (width - 60)) / (dataPoints - 1)
      ctx.beginPath()
      ctx.moveTo(x, 20)
      ctx.lineTo(x, height - 20)
      ctx.stroke()
    }

    // Draw axes labels
    ctx.fillStyle = '#6b7280'
    ctx.font = '10px sans-serif'

    // X-axis labels
    if (timeRange === 'day') {
      // Day labels (last 14 days)
      const days = []
      for (let i = 13; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        days.push(date.getDate())
      }
      for (let i = 0; i < 14; i++) {
        const x = 40 + (i * (width - 60)) / 13
        ctx.fillText(days[i].toString(), x - 5, height - 5)
      }
    } else {
      // Month labels
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      for (let i = 0; i < 12; i++) {
        const x = 40 + (i * (width - 60)) / 11
        ctx.fillText(months[i], x - 10, height - 5)
      }
    }

    // Y-axis labels (values)
    for (let i = 0; i < 5; i++) {
      const y = 20 + (i * (height - 40)) / 4
      ctx.fillText(Math.floor(maxValue - (i * maxValue) / 4).toString(), 5, y + 3)
    }

    // Draw line chart
    ctx.strokeStyle = '#10b981'
    ctx.lineWidth = 2
    ctx.beginPath()

    for (let i = 0; i < chartData.length; i++) {
      const x = 40 + (i * (width - 60)) / (chartData.length - 1)
      const y = height - 20 - (chartData[i] / maxValue) * (height - 40)

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.stroke()

    // Draw points
    ctx.fillStyle = '#ffffff'
    ctx.strokeStyle = '#10b981'
    ctx.lineWidth = 2

    for (let i = 0; i < chartData.length; i++) {
      const x = 40 + (i * (width - 60)) / (chartData.length - 1)
      const y = height - 20 - (chartData[i] / maxValue) * (height - 40)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }

    // Draw area under the line
    ctx.fillStyle = 'rgba(16, 185, 129, 0.1)'
    ctx.beginPath()

    // Start from bottom left
    ctx.moveTo(40, height - 20)

    // Draw line to match the line chart
    for (let i = 0; i < chartData.length; i++) {
      const x = 40 + (i * (width - 60)) / (chartData.length - 1)
      const y = height - 20 - (chartData[i] / maxValue) * (height - 40)
      ctx.lineTo(x, y)
    }

    // Complete the path to bottom right
    ctx.lineTo(width - 20, height - 20)
    ctx.closePath()
    ctx.fill()
  }, [chartData, maxValue, timeRange])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-lg shadow p-4 "
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 capitalize">
          {type} Analytics
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('day')}
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'day' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="w-full h-64">
        <canvas ref={canvasRef} width={800} height={300} className="w-full h-full"></canvas>
      </div>
    </motion.div>
  )
}