import ResultList from '@/components/ResultList'
import { getFetchUrl } from '@/lib/getFetchUrl'
import { PageResult, SearchParams } from '@/typings'
import { redirect } from 'next/navigation'
import React from 'react'

export const revalidate = 300

type Props = {
  searchParams: SearchParams
  params: { term: string }
}

const searchPage = async ({ searchParams, params: { term } }: Props) => {
  if (!term) {
    redirect('/')
  }

  //fetch from API
  const response = await fetch(getFetchUrl('api/search'), {
    method: 'POST',
    body: JSON.stringify({ searchTerm: term, ...searchParams }),
  })

  const results = (await response.json()) as PageResult[]

  {
    /* Result List */
  }
  return (
    <div>
      <ResultList results={results} term={term} />
    </div>
  )
}

export default searchPage
