'use client'

import { LayoutGrid, Columns, LayoutList, SplitSquareVertical, Heading1, Text, Link, Square, ImageIcon, Video, Map, Menu, LayoutTemplate, Grid3X3, Grid2X2, AlignLeft, AlignRight, AlignCenter } from 'lucide-react'
import DraggableComponent from './DraggableComponent'

const components = {
  layout: [
    { type: '1Column', icon: LayoutGrid, label: '1 Column' },
    { type: '2Columns', icon: Columns, label: '2 Columns' },
    { type: '3Columns', icon: LayoutList, label: '3 Columns' },
    { type: '2ColumnsSplit', icon: SplitSquareVertical, label: '2 Columns 3/7' },
    { type: '4Columns', icon: Grid2X2, label: '4 Columns' },
    { type: '6Columns', icon: Grid3X3, label: '6 Columns' },
    { type: 'LeftSidebar', icon: AlignLeft, label: 'Left Sidebar' },
    { type: 'RightSidebar', icon: AlignRight, label: 'Right Sidebar' },
    { type: 'HeaderContent', icon: AlignCenter, label: 'Header Content' },
  ],
  content: [
    { type: 'Navbar', icon: Menu, label: 'Navbar' },
    { type: 'Carousel', icon: LayoutTemplate, label: 'Carousel' },
    { type: 'Heading', icon: Heading1, label: 'Heading' },
    { type: 'Text', icon: Text, label: 'Text' },
    { type: 'Link', icon: Link, label: 'Link' },
    { type: 'LinkBox', icon: Square, label: 'Link Box' },
    { type: 'ImageBox', icon: ImageIcon, label: 'Image Box' },
    { type: 'Video', icon: Video, label: 'Video' },
    { type: 'Map', icon: Map, label: 'Map' },
  ],
  imageSizes: [
    { type: 'ImageBoxSmall', icon: ImageIcon, label: 'Small Image', height: '8rem' },
    { type: 'ImageBoxMedium', icon: ImageIcon, label: 'Medium Image', height: '12rem' },
    { type: 'ImageBoxLarge', icon: ImageIcon, label: 'Large Image', height: '16rem' },
  ],
}

interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div className={`fixed top-14 left-0 w-64 bg-zinc-900 text-white h-full overflow-auto transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <h2 className="text-sm font-semibold mb-3 text-zinc-400">Blocks</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-medium mb-2 text-zinc-500">Layout</h3>
            <div className="grid grid-cols-2 gap-2">
              {components.layout.map((component) => (
                <DraggableComponent
                  key={component.type}
                  type={component.type}
                  icon={component.icon}
                  label={component.label}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium mb-2 text-zinc-500">Content</h3>
            <div className="grid grid-cols-2 gap-2">
              {components.content.map((component) => (
                <DraggableComponent
                  key={component.type}
                  type={component.type}
                  icon={component.icon}
                  label={component.label}
                />
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium mb-2 text-zinc-500">Image Sizes</h3>
            <div className="grid grid-cols-2 gap-2">
              {components.imageSizes.map((component) => (
                <DraggableComponent
                  key={component.type}
                  type={component.type}
                  icon={component.icon}
                  label={component.label}
                  height={component.height}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

