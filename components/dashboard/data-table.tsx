'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

interface DataTableProps {
  columns: { key: string; label: string; render?: (value: any, row: any) => React.ReactNode }[]
  data: any[]
  title?: string
  searchable?: boolean
  paginated?: boolean
  pageSize?: number
}

export function DataTable({ columns, data, title, searchable = true, paginated = true, pageSize = 10 }: DataTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredData = searchable
    ? data.filter((row) =>
        columns.some((col) => String(row[col.key]).toLowerCase().includes(searchQuery.toLowerCase())),
      )
    : data

  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = paginated
    ? filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : filteredData

  return (
    <Card className="bg-neutral-900 border-neutral-700">
      {title && (
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium text-neutral-300 tracking-wider">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        {searchable && (
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 bg-neutral-800 border-neutral-700 text-white text-sm"
            />
          </div>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-neutral-700 hover:bg-transparent">
                {columns.map((col, colIndex) => (
                  <TableHead key={`${col.key}-${colIndex}`} className="text-xs text-neutral-400 font-medium tracking-wider uppercase">
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, idx) => (
                <TableRow key={idx} className="border-neutral-700 hover:bg-neutral-800/50 transition-colors">
                  {columns.map((col, colIndex) => (
                    <TableCell key={`${col.key}-${colIndex}`} className="text-sm text-neutral-300 py-3">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {paginated && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-neutral-500">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="text-neutral-400 hover:text-orange-500"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-neutral-400 hover:text-orange-500"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
