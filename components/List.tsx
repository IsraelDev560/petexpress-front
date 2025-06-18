'use client'

import { DataTable } from '@/components/table/DataTable';
import { generateColumns } from './table/columns';
import { ApiResponse } from '@/types/ApiResponse';
import { useState } from 'react';
export interface ListProps<T> {
  title: string;
  add: (item: T) => Promise<ApiResponse<T>>;
  remove: (id: string) => Promise<ApiResponse<null>>;
  get: () => Promise<ApiResponse<T[]>>;
  data: T[];
  setData: (data: T[]) => void;
  searchById: (id: string) => Promise<ApiResponse<T | null>>;
  update: (id: string, item: T) => Promise<ApiResponse<T>>;
}

export type DialogState = {
  open: boolean;
  type?: "tasks" | "users" | "animals" | 'tasks-types' | 'auth'; 
}

export default function List<T extends Record<string, any>>({
  title,
  get,
  data,
  setData,
  add,
  remove,
  searchById,
  update,
}: ListProps<T>) {
  const [edit, setEdit] = useState<string | null>('')
  const [isDialogOpen, setIsDialogOpen] = useState<DialogState>({ open: false, type: undefined });
  const onReload = async () => {
    try {
      const res = await get();
      if ("data" in res && Array.isArray(res.data)) {
        setData(res.data as T[]);
      } else {
        setData([]);
      }
    } catch (e) {
      console.error("Erro to reload:", e);
    }
  };

  const colums = generateColumns(data, title, onReload, remove, setIsDialogOpen, setEdit);

  return (
    <div className="w-full max-h-[43rem] rounded-md overflow-auto scrollbar-hide p-4 bg-white dark:bg-zinc-900 shadow-lg">
      <DataTable
        setIsDialogOpen={setIsDialogOpen}
        isDialogOpen={isDialogOpen}
        title={title}
        edit={edit}
        setEdit={setEdit}
        onReload={onReload}
        get={get}
        add={add}
        remove={remove}
        update={update}
        data={data}
        columns={colums}
      />
    </div>
  );
}
