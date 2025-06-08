"use client"

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
import { Dispatch, SetStateAction, useState } from "react";
import { ApiResponse } from "@/types/ApiResponse"
import { z } from "zod"
import { DialogState } from "./List"
import { mapTitleToType } from "./table/columns"

export default function AddForms<T extends Record<string, any>>({
  title,
  add,
  edit,
  schema,
  setEdit,
  update,
  open,
  setOpen,
  onReload
}: {
  title: string;
  add: (item: T) => Promise<ApiResponse<T>>;
  update: (id: string, item: T) => Promise<ApiResponse<T>>;
  edit: string | null;
  schema: z.ZodObject<any>;
  setEdit: Dispatch<SetStateAction<string | null>>;
  open: DialogState;
  setOpen: (open: DialogState) => void;
  onReload: () => void;
}) {
  const isEdit = !!edit;
  const [feedback, setFeedback] = useState({ message: '', type: '' })
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawItem: any = {};
    formData.forEach((value, key) => {
      rawItem[key] = value;
    });
    const result = schema.safeParse(rawItem);
    if (!result.success) {
      setFeedback({ message: "Erro de validação", type: "error" });
      console.warn(result.error);
      return;
    }
    const parsedItem = result.data;
    try {
      let response;
      if (edit) {
        response = await update(edit, parsedItem as T);
        setEdit(null)
      } else {
        response = await add(parsedItem as T);
      }
      const data = response.data;
      if ('data' in response && response.status === 200 && response.data) {
        setFeedback({
          message: (typeof data === 'object' && data !== null && 'message' in data && typeof (data as any).message === 'string')
            ? (data as any).message
            : 'Added successfully!',
          type: 'success'
        })
        setTimeout(() => onReload(), 400);
      } else {
        const errorMessage =
          typeof data?.message === 'string'
            ? data.message
            : 'Error to add';
        setFeedback({
          message: String(errorMessage),
          type: 'error'
        })
        console.warn("Error to add:", errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setFeedback({ message: '', type: '' });
        setOpen({ open: false, type: mapTitleToType(title) });
      }, 2000);
    }
  };

  return (
    <Dialog open={open.open} onOpenChange={(isOpen) => {
      setOpen({ ...open, open: isOpen, type: mapTitleToType(title) });
      if (!isOpen) setEdit(null);
    }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="text-2xl cursor-pointer hover:scale-110 transition">
          <IoMdAddCircleOutline />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {isEdit ? "Update" : "Add"} {title.toLowerCase()} below
            </DialogDescription>
          </DialogHeader>
          <div className="grid mt-4 mb-4 gap-4">
            {Object.entries(schema.shape).map(([key]) => (
              <div className="grid gap-3" key={key}>
                <Label htmlFor={key} className="capitalize">{key}</Label>
                <Input
                  id={key}
                  name={key}
                  defaultValue=""
                />
              </div>
            ))}
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
