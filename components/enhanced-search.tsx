// components/enhanced-search.tsx
"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X } from "lucide-react"

interface SearchableItem {
  id: string
  name: string
  [key: string]: any
}

interface EnhancedSearchProps<T extends SearchableItem> {
  items: T[]
  onFilter: (filteredItems: T[]) => void
  placeholder?: string
  searchFields?: (keyof T)[]
  categories?: string[]
  onCategoryChange?: (category: string) => void
  selectedCategory?: string
}

export function EnhancedSearch<T extends SearchableItem>({
  items,
  onFilter,
  placeholder = "Search...",
  searchFields = ['name'],
  categories,
  onCategoryChange,
  selectedCategory = "All"
}: EnhancedSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredItems = useMemo(() => {
    let filtered = items

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(item =>
        searchFields.some(field => {
          const value = item[field]
          return typeof value === 'string' && 
                 value.toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(item => 
        item.type === selectedCategory || 
        item.category === selectedCategory
      )
    }

    return filtered
  }, [items, searchTerm, selectedCategory, searchFields])

  // Update parent component whenever filtered items change
  useMemo(() => {
    onFilter(filteredItems)
  }, [filteredItems, onFilter])

  const clearSearch = () => {
    setSearchTerm("")
    onCategoryChange?.("All")
  }

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => setSearchTerm("")}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Category Filters */}
      {categories && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange?.(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}

      {/* Active Filters & Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {(searchTerm || selectedCategory !== "All") && (
            <>
              <span>Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary">
                  Search: {searchTerm}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => setSearchTerm("")}
                  />
                </Badge>
              )}
              {selectedCategory !== "All" && (
                <Badge variant="secondary">
                  {selectedCategory}
                  <X 
                    className="h-3 w-3 ml-1 cursor-pointer" 
                    onClick={() => onCategoryChange?.("All")}
                  />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={clearSearch}>
                Clear all
              </Button>
            </>
          )}
        </div>
        <span>{filteredItems.length} of {items.length} items</span>
      </div>
    </div>
  )
}