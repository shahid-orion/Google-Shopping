import { PageResult, SearchParams } from '@/typings'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { searchTerm, pages, ...params } = await request.json()
  const searchParams: SearchParams = params

  if (!searchTerm) {
    return NextResponse.next(
      new Response('Missing search term', { status: 404 })
    )
  }

  const filters: any = []

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value) {
      if (key == 'max_price') {
        if ((value = '600')) return
      }

      filters.push({
        key: key,
        value: key === 'sort_by' ? value : Number(value),
      })
    }
  })

  const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
    method: 'post',
    //body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(
        process.env.OXYLABS_USERNAME + ':' + process.env.OXYLABS_PASSWORD
      ).toString('base64')}`,
    },
    cache: 'no-store',
    body: JSON.stringify({
      source: 'google_shopping_search',
      domain: 'com',
      query: searchTerm,
      pages: Number(pages) || 1,
      parse: true,
      context: filters,
    }),
  })

  const data = await response.json()

  console.log(data)

  const pageResult: PageResult[] = data.results

  return NextResponse.json(pageResult)
}
