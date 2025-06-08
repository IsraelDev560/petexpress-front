'use client'

import { JSX, useEffect, useState } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoReloadOutline } from "react-icons/io5";
import MiniLoading from './utils/MiniLoading';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  status: number;
  message?: string;
}

interface ListProps<T> {
  title: string;
  add: (item: T) => Promise<ApiResponse<T>>;
  remove: (id: string) => Promise<ApiResponse<null>>;
  get: () => Promise<ApiResponse<T[]>>;
  data: T[];
  searchById: (id: string) => Promise<ApiResponse<T | null>>;
  update: (id: string, item: T) => Promise<ApiResponse<T>>;
  AddFormComponent: (props: {
    title: string;
    onSubmit: (data: T) => void;
    onClose: () => void;
    defaultData?: T;
  }) => JSX.Element;
}

export default function List<T extends Record<string, any>>({
  title,
  get,
  data: initialData,
  add,
  remove,
  searchById,
  update,
  AddFormComponent
}: ListProps<T>) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  const onSubmit = async (newItem: T) => {
    setLoading(true);
    try {
      const response = await add(newItem);
      if (response.success && response.data) {
        setData(prev => [...prev, response.data as T]);
      } else {
        console.warn("Erro ao adicionar:", response.message);
      }
    } catch (error) {
      console.error("Erro no submit:", error);
    } finally {
      setLoading(false);
      setShowForm(false);
    }
  };

  const onReload = async () => {
    setLoading(true);
    try {
      const response = await get();
      if (response.success && response.data) {
        setData(response.data);
      } else {
        console.warn("Erro ao carregar dados:", response.message);
      }
    } catch (e) {
      console.error("Erro ao recarregar:", e);
    } finally {
      setLoading(false);
    }
  };

  const keys = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="w-full max-h-[36rem] rounded-md overflow-auto scrollbar-hide border-2 border-blue-500 animate-neon-border bg-white dark:bg-zinc-900 shadow-lg">
      <div className='flex justify-between w-full'>
        <h2 className="text-2xl font-bold p-4 text-blue-600 dark:text-blue-400">{title}</h2>
        <div className='flex p-4 space-x-3'>
          <button
            onClick={() => setShowForm(true)}
            className='my-auto text-2xl cursor-pointer hover:scale-110 transition'>
            <IoMdAddCircleOutline />
          </button>
          <button
            onClick={onReload}
            className='my-auto text-2xl cursor-pointer hover:scale-110 transition'>
            <IoReloadOutline />
          </button>
        </div>
      </div>

      {showForm &&
        <AddFormComponent
          title={title}
          onSubmit={onSubmit}
          onClose={() => setShowForm(false)}
        />
      }

      {loading ? (
        <MiniLoading />
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-blue-100 dark:bg-zinc-800 text-blue-800 dark:text-blue-300 text-sm">
              {keys.map((key) => (
                <th key={key} className="px-4 py-2 border-b border-blue-300 capitalize">
                  {key}
                </th>
              ))}
              <th className="px-4 py-2 border-b border-blue-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-blue-50 dark:hover:bg-zinc-800 transition">
                {keys.map((key) => (
                  <td key={key} className="px-4 py-2 border-b border-gray-200 dark:border-zinc-700 text-sm text-gray-700 dark:text-gray-100">
                    {String(item[key])}
                  </td>
                ))}
                <td className="px-4 py-2 border-b border-gray-200 dark:border-zinc-700 text-center">
                  <div className="flex justify-center gap-3 text-blue-600 dark:text-blue-300">
                    <button title="Editar" onClick={() => remove(item.id)}>
                      <MdEdit className="hover:scale-110 cursor-pointer transition" />
                    </button>
                    <button title="Excluir">
                      <MdDelete className="hover:scale-110 cursor-pointer transition" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
