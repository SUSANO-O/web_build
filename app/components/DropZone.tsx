'use client'

import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import RenderComponent from './RenderComponent'
import type { Component } from './Editor'

interface DropZoneProps {
  onDrop: (componentType: string, parentId?: string) => void
  droppedComponents: Component[]
  onDelete: (id: string, parentId?: string) => void
  onMove: (dragIndex: number, hoverIndex: number, parentId?: string) => void
  onImageUpload: (id: string, imageUrl: string, parentId?: string) => void
  parentId?: string
}

export default function DropZone({ onDrop, droppedComponents, onDelete, onMove, onImageUpload, parentId }: DropZoneProps) {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDragLeave = () => {
    setIsOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData('text/plain')
    onDrop(componentType, parentId)
    setIsOver(false)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`min-h-full p-4 ${
          isOver ? 'bg-gray-100' : 'bg-white'
        } transition-colors duration-200 ${parentId ? 'border-2 border-dashed border-gray-200 rounded-lg' : ''}`}
      >
        {droppedComponents.map((component, index) => (
          <RenderComponent
            key={component.id}
            component={component}
            index={index}
            onDelete={onDelete}
            onMove={onMove}
            onImageUpload={onImageUpload}
            onDrop={onDrop}
            parentId={parentId}
          />
        ))}
        {droppedComponents.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400">Drag and drop components here</p>
          </div>
        )}
      </div>
    </DndProvider>
  )
}

