'use client'

import { useState, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ChevronLeft, ChevronRight, Menu, ChevronDown, Settings, HelpCircle, User, X, Move, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Component } from './Editor'
import DropZone from './DropZone'

interface RenderComponentProps {
  component: Component
  index: number
  onDelete: (id: string, parentId?: string) => void
  onMove: (dragIndex: number, hoverIndex: number, parentId?: string) => void
  onImageUpload: (id: string, imageUrl: string, parentId?: string) => void
  onDrop: (componentType: string, parentId?: string) => void
  parentId?: string
}

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

export default function RenderComponent({ component, index, onDelete, onMove, onImageUpload, onDrop, parentId }: RenderComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: { index: number; parentId?: string }, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      const dragParentId = item.parentId
      const hoverParentId = parentId

      if (dragIndex === hoverIndex && dragParentId === hoverParentId) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      onMove(dragIndex, hoverIndex, hoverParentId)
      item.index = hoverIndex
      item.parentId = hoverParentId
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => {
      return { id: component.id, index, parentId }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onImageUpload(component.id, reader.result as string, parentId)
      }
      reader.readAsDataURL(file)
    }
  }

  const renderColumns = (count: number) => {
    return (
      <div className={`grid grid-cols-${count} gap-4 mb-4`}>
        {Array.from({ length: count }).map((_, i) => (
          <DropZone
            key={i}
            onDrop={onDrop}
            droppedComponents={component.children?.filter((_, index) => index % count === i) || []}
            onDelete={onDelete}
            onMove={onMove}
            onImageUpload={onImageUpload}
            parentId={component.id}
          />
        ))}
      </div>
    )
  }

  const renderSplitColumns = () => {
    return (
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-5">
          <DropZone
            onDrop={onDrop}
            droppedComponents={component.children?.slice(0, 1) || []}
            onDelete={onDelete}
            onMove={onMove}
            onImageUpload={onImageUpload}
            parentId={component.id}
          />
        </div>
        <div className="col-span-7">
          <DropZone
            onDrop={onDrop}
            droppedComponents={component.children?.slice(1, 2) || []}
            onDelete={onDelete}
            onMove={onMove}
            onImageUpload={onImageUpload}
            parentId={component.id}
          />
        </div>
      </div>
    )
  }

  const renderCarousel = () => {
    return (
      <div className="relative bg-zinc-900 p-6 mb-4 rounded-lg">
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

  const renderNavbar = () => {
    return (
      <nav className="bg-zinc-900 text-white border-b border-zinc-800 mb-4">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">My Project</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>New Project</DropdownMenuItem>
                  <DropdownMenuItem>Open Project</DropdownMenuItem>
                  <DropdownMenuItem>Save Project</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
    )
  }

  const renderContent = () => {
    switch (component.type) {
      case '1Column':
      case '2Columns':
      case '3Columns':
      case '4Columns':
      case '6Columns':
        return renderColumns(parseInt(component.type))
      case '2ColumnsSplit':
        return renderSplitColumns()
      case 'LeftSidebar':
        return (
          <div className="flex gap-4 mb-4">
            <div className="w-1/4">
              <DropZone
                onDrop={onDrop}
                droppedComponents={component.children?.slice(0, 1) || []}
                onDelete={onDelete}
                onMove={onMove}
                onImageUpload={onImageUpload}
                parentId={component.id}
              />
            </div>
            <div className="w-3/4">
              <DropZone
                onDrop={onDrop}
                droppedComponents={component.children?.slice(1) || []}
                onDelete={onDelete}
                onMove={onMove}
                onImageUpload={onImageUpload}
                parentId={component.id}
              />
            </div>
          </div>
        )
      case 'RightSidebar':
        return (
          <div className="flex gap-4 mb-4">
            <div className="w-3/4">
              <DropZone
                onDrop={onDrop}
                droppedComponents={component.children?.slice(0, 1) || []}
                onDelete={onDelete}
                onMove={onMove}
                onImageUpload={onImageUpload}
                parentId={component.id}
              />
            </div>
            <div className="w-1/4">
              <DropZone
                onDrop={onDrop}
                droppedComponents={component.children?.slice(1) || []}
                onDelete={onDelete}
                onMove={onMove}
                onImageUpload={onImageUpload}
                parentId={component.id}
              />
            </div>
          </div>
        )
      case 'HeaderContent':
        return (
          <div className="mb-4">
            <div className="mb-4">
              <DropZone
                onDrop={onDrop}
                droppedComponents={component.children?.slice(0, 1) || []}
                onDelete={onDelete}
                onMove={onMove}
                onImageUpload={onImageUpload}
                parentId={component.id}
              />
            </div>
            <div>
              <DropZone
                onDrop={onDrop}
                droppedComponents={component.children?.slice(1) || []}
                onDelete={onDelete}
                onMove={onMove}
                onImageUpload={onImageUpload}
                parentId={component.id}
              />
            </div>
          </div>
        )
      case 'Navbar':
        return renderNavbar()
      case 'Carousel':
        return renderCarousel()
      case 'Heading':
        return <h2 className="text-2xl font-bold mb-4" contentEditable>{component.content || 'Sample Heading'}</h2>
      case 'Text':
        return <p className="mb-4" contentEditable>{component.content || 'This is a sample text block.'}</p>
      case 'Link':
        return (
          <a href="#" className="text-blue-500 hover:underline mb-4 inline-block" contentEditable>
            {component.content || 'Sample Link'}
          </a>
        )
      case 'LinkBox':
        return (
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <a href="#" className="text-blue-500 hover:underline" contentEditable>
              {component.content || 'Link Box'}
            </a>
          </div>
        )
      case 'ImageBox':
        return (
          <div className="mb-4">
            {component.imageUrl ? (
              <img
                src={component.imageUrl}
                alt="Uploaded image"
                className="w-full object-cover rounded-lg"
                style={{ height: component.height || '12rem' }}
              />
            ) : (
              <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center" style={{ height: component.height || '12rem' }}>
                <label htmlFor={`image-upload-${component.id}`} className="cursor-pointer">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <input
                    id={`image-upload-${component.id}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            )}
          </div>
        )
      case 'Video':
        return (
          <div className="aspect-video mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Video Placeholder</span>
          </div>
        )
      case 'Map':
        return (
          <div className="aspect-video mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Map Placeholder</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div ref={ref} style={{ opacity }} className="relative mb-4 group" data-handler-id={handlerId}>
      {renderContent()}
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="secondary" size="icon" onClick={() => onDelete(component.id, parentId)}>
          <X className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" className="cursor-move">
          <Move className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

