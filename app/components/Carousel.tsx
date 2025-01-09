'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const templates = [
  {
    id: 1,
    title: 'Landing Page',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 2,
    title: 'Blog Post',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 3,
    title: 'Portfolio',
    image: '/placeholder.svg?height=200&width=300',
  },
  {
    id: 4,
    title: 'E-commerce',
    image: '/placeholder.svg?height=200&width=300',
  },
]

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === templates.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? templates.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="relative bg-zinc-900 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-lg font-semibold">Templates</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="text-white border-zinc-700 hover:bg-zinc-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="text-white border-zinc-700 hover:bg-zinc-800"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {templates.map((template) => (
            <div
              key={template.id}
              className="flex-none w-full px-2"
            >
              <div className="bg-zinc-800 rounded-lg p-4 hover:bg-zinc-700 transition-colors cursor-pointer">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
                <h3 className="text-white font-medium">{template.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

