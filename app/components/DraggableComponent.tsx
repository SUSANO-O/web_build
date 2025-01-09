'use client'

import { type LucideIcon } from 'lucide-react'

interface DraggableComponentProps {
  type: string
  icon: LucideIcon
  label: string
}

export default function DraggableComponent({
  type,
  icon: Icon,
  label,
}: DraggableComponentProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', type)
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="flex flex-col items-center justify-center p-3 bg-zinc-800 rounded-lg cursor-move hover:bg-zinc-700 transition-colors"
    >
      <Icon className="w-5 h-5 mb-1" />
      <span className="text-xs text-center">{label}</span>
    </div>
  )
}

