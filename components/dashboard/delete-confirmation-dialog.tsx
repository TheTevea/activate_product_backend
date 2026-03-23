'use client'

import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface DeleteConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  title?: string
  description?: string
  itemName?: string
  isLoading?: boolean
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title = 'Delete Item',
  description = 'Are you sure you want to delete this item?',
  itemName = 'this item',
  isLoading = false,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-900 border-neutral-700 max-w-sm">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <DialogTitle className="text-white text-lg">{title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          <DialogDescription className="text-neutral-400 text-sm leading-relaxed">
            {description}
          </DialogDescription>
          
          {itemName && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
              <p className="text-xs text-neutral-400 mb-1">Item to be deleted:</p>
              <p className="font-mono text-sm text-red-400">{itemName}</p>
            </div>
          )}

          <p className="text-xs text-neutral-500 italic">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="flex-1 border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
