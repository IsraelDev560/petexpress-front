'use client'

import { DataTable } from '@/app/dashboard/DataTable';
import { generateColumns } from './table/columns';
import { ApiResponse } from '@/types/ApiResponse';

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

  const onReload = async () => {
        try {
            const res = await get();
            if ("data" in res && Array.isArray(res.data)) {
                setData(res.data);
            } else {
                setData([]);
            }
        } catch (e) {
            console.error("Erro ao recarregar:", e);
        }
    };

  const colums = generateColumns(data, onReload, remove, update);

  return (
    <div className="w-full max-h-[43rem] rounded-md overflow-auto scrollbar-hide p-4 bg-white dark:bg-zinc-900 shadow-lg">
      <DataTable title={title} onReload={onReload} setData={setData} get={get} add={add} remove={remove} update={update} data={data} columns={colums} />
    </div>
  );
}
