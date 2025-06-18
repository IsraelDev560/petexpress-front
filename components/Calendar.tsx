"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function formatDateForUI(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function formatDateForSubmit(date: Date | undefined) {
  if (!date) return ""
  return date.toISOString().split("T")[0] // yyyy-mm-dd
}

function isValidDate(date: Date | undefined) {
  if (!date) return false
  return !isNaN(date.getTime())
}

export function CalendarInput({
  label,
  name,
  value,
  onChange,
}: {
  label: string
  name: string
  value: string // valor REAL: yyyy-mm-dd
  onChange: (val: string) => void // onChange REAL
}) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  )

  const handleSelect = (newDate: Date | undefined) => {
    if (!newDate) return
    setDate(newDate)
    onChange(formatDateForSubmit(newDate)) // envia no padrão ISO
    setOpen(false)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-2">
        <Input
          id={`${name}-ui`}
          value={formatDateForUI(date)}
          placeholder="Select a date"
          readOnly
          onClick={() => setOpen(true)}
          className="bg-background pr-10 cursor-pointer"
        />
        <input type="hidden" name={name} value={value} />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              captionLayout="dropdown"
              month={date}
              onMonthChange={setDate}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
