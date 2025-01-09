'use client'

import { Menu, ChevronDown, Settings, HelpCircle, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <nav className="bg-zinc-900 text-white border-b border-zinc-800">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white" onClick={toggleSidebar}>
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

