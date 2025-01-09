'use client'

import { useState } from 'react'
import Sidebar from './Sidebar'
import DropZone from './DropZone'
import Navbar from './Navbar'
import { Button } from "@/components/ui/button"
import { Download, Save, Monitor, Tablet, Smartphone } from 'lucide-react'
import { generateHTML, generateCSS } from '../utils/codeGenerator'

export interface Component {
  id: string
  type: string
  content?: string
  columns?: number
  imageUrl?: string
  height?: string
  children?: Component[]
}

export default function Editor() {
  const [droppedComponents, setDroppedComponents] = useState<Component[]>([])
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleDrop = (componentType: string, parentId?: string) => {
    const newComponent: Component = {
      id: Math.random().toString(36).substr(2, 9),
      type: componentType,
      content: '',
      columns: componentType.includes('Columns') ? parseInt(componentType) : undefined,
      children: [],
    }

    if (parentId) {
      setDroppedComponents((prev) => {
        return prev.map((component) => {
          if (component.id === parentId) {
            return {
              ...component,
              children: [...(component.children || []), newComponent],
            }
          }
          return component
        })
      })
    } else {
      setDroppedComponents((prev) => [...prev, newComponent])
    }
  }

  const handleDelete = (id: string, parentId?: string) => {
    if (parentId) {
      setDroppedComponents((prev) => {
        return prev.map((component) => {
          if (component.id === parentId) {
            return {
              ...component,
              children: component.children?.filter((child) => child.id !== id),
            }
          }
          return component
        })
      })
    } else {
      setDroppedComponents((prev) => prev.filter((component) => component.id !== id))
    }
  }

  const handleMove = (dragIndex: number, hoverIndex: number, parentId?: string) => {
    if (parentId) {
      setDroppedComponents((prev) => {
        return prev.map((component) => {
          if (component.id === parentId && component.children) {
            const dragComponent = component.children[dragIndex]
            const newChildren = [...component.children]
            newChildren.splice(dragIndex, 1)
            newChildren.splice(hoverIndex, 0, dragComponent)
            return { ...component, children: newChildren }
          }
          return component
        })
      })
    } else {
      const dragComponent = droppedComponents[dragIndex]
      setDroppedComponents((prev) => {
        const newComponents = [...prev]
        newComponents.splice(dragIndex, 1)
        newComponents.splice(hoverIndex, 0, dragComponent)
        return newComponents
      })
    }
  }

  const handleImageUpload = (id: string, imageUrl: string, parentId?: string) => {
    if (parentId) {
      setDroppedComponents((prev) => {
        return prev.map((component) => {
          if (component.id === parentId) {
            return {
              ...component,
              children: component.children?.map((child) =>
                child.id === id ? { ...child, imageUrl } : child
              ),
            }
          }
          return component
        })
      })
    } else {
      setDroppedComponents((prev) =>
        prev.map((component) =>
          component.id === id ? { ...component, imageUrl } : component
        )
      )
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(droppedComponents),
      })
      if (response.ok) {
        alert('Layout saved successfully!')
      } else {
        throw new Error('Failed to save layout')
      }
    } catch (error) {
      console.error('Error saving layout:', error)
      alert('Failed to save layout. Please try again.')
    }
  }

  const handleDownload = () => {
    const jsonString = JSON.stringify(droppedComponents, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'layout.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadHTML = () => {
    const html = generateHTML(droppedComponents)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'layout.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDownloadCSS = () => {
    const css = generateCSS(droppedComponents)
    const blob = new Blob([css], { type: 'text/css' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'styles.css'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`flex-1 bg-white overflow-auto transition-all duration-300 ${isSidebarOpen ? 'ml-64' : ''}`}>
        <div className="sticky top-0 z-10 bg-white border-b p-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <Button onClick={() => setViewportSize('desktop')} variant={viewportSize === 'desktop' ? 'default' : 'outline'}>
              <Monitor className="h-4 w-4" />
            </Button>
            <Button onClick={() => setViewportSize('tablet')} variant={viewportSize === 'tablet' ? 'default' : 'outline'}>
              <Tablet className="h-4 w-4" />
            </Button>
            <Button onClick={() => setViewportSize('mobile')} variant={viewportSize === 'mobile' ? 'default' : 'outline'}>
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSave} className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handleDownload} className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              JSON
            </Button>
            <Button onClick={handleDownloadHTML} className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              HTML
            </Button>
            <Button onClick={handleDownloadCSS} className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              CSS
            </Button>
          </div>
        </div>
        <div className={`mx-auto transition-all duration-300 ${
          viewportSize === 'desktop' ? 'w-full' :
          viewportSize === 'tablet' ? 'w-[768px]' :
          'w-[375px]'
        }`}>
          <DropZone
            onDrop={handleDrop}
            droppedComponents={droppedComponents}
            onDelete={handleDelete}
            onMove={handleMove}
            onImageUpload={handleImageUpload}
          />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} />
    </div>
  )
}

