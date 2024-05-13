'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { 
  useSearchParams,
  usePathname,
  useRouter
} from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()  // Permite recuperar/manipular los parámetros del URL
  const pathname = usePathname();         // Recupera el pathname
  const { replace } = useRouter();        // Se extraer el método replace para reemplazar el URL actual

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);   // Se crea una nueva instancia URLSearchParams con la variable searchParams
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    params.set('page', '1');

    replace(`${pathname}?${params.toString()}`);    // Se reemplaza el URL actual con el path name actual y los nuevos parámetros
  }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // El valor incluido en el input se incluye como parámetro en el URL para manejar la búsqueda
        onChange={(evt) => handleSearch(evt.target.value)}  
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
