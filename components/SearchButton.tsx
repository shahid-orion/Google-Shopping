'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type Props = {}

const SearchButton = (props: Props) => {
  const { pending } = useFormStatus()

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-4 rounded-full 
    disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending && 'Searching...'}
      {!pending && <MagnifyingGlassIcon className="h-4 w-4" />}
    </button>
  )
}

export default SearchButton
