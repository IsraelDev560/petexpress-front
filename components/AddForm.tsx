"use client"
import { ApiResponse } from "./List";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IoMdAddCircleOutline } from "react-icons/io";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export default function AddForm<TData, TValue, T>({ title, add, columns, setData }: {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  add: (item: T) => Promise<ApiResponse<T>>;
  setData: (data: T) => void;
}) {
  const [feedback, setFeedback] = useState({ message: '', type: '' })
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newItem: any = {};
    columns.forEach((col) => {
      const key = col.accessorKey || col.id;
      if (key && key !== 'id' && key !== 'actions' && key !== 'select') {
        newItem[key] = formData.get(key as string);
      }
    });
    try {
      const response = await add(newItem);
      const data = response.data;
      if (response.status === 200 && response.data) {
        setFeedback({
          message: (typeof data === 'object' && data !== null && 'message' in data && typeof (data as any).message === 'string')
            ? (data as any).message
            : 'Added successfully!',
          type: 'success'
        })
        if (data !== undefined) {
          setData(data as T)
        }
      } else {
        setFeedback({
          message: (typeof data === 'object' && data !== null && 'message' in data && typeof (data as any).message === 'string')
            ? (data as any).message
            : 'Error to add',
          type: 'error'
        })
        console.warn("Error to add:", (typeof data === 'object' && data !== null && 'message' in data) ? (data as any).message : data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setFeedback({ message: '', type: '' });
      }, 2000);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-2xl cursor-pointer hover:scale-110 transition"><IoMdAddCircleOutline /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form method="POST" onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Add {title.toLowerCase()} below
            </DialogDescription>
          </DialogHeader>
          <div className="grid mt-4 mb-4 gap-4">
            {columns.filter((col) => {
              const key = col.accessorKey || col.id;
              return key && key !== 'id' && key !== 'actions' && key !== 'select';
            }).map((item, idx) => {

              return (
                <div className="grid gap-3" key={idx}>
                  <Label htmlFor="name" className="capitalize">{item.accessorKey}</Label>
                  <Input id="name" name={item.accessorKey} />
                </div>
              )
            })}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
        <p className={`text-sm text-center ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
          {feedback.message}
        </p>
      </DialogContent>
    </Dialog>
  );
}
