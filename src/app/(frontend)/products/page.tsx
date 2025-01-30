import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { DEFAULT_LANGUAGE } from '@/lib/language'
import FilteredProducts from '@/components/FilteredProducts'

import type { Page as PayloadPage, Product } from '@/payload-types'
import type { Language } from '@/lib/language'

const payload = await getPayload({ config })

async function getPage() {
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'products',
      },
    },
    locale: 'all',
    depth: 1,
    pagination: false,
  })

  return page.docs[0] as PayloadPage
}

async function getCategories() {
  const categories = await payload.find({
    collection: 'categories',
    locale: 'all',
    depth: 1,
    pagination: false,
  })

  return categories.docs
}

async function getProducts() {
  const products = await payload.find({
    collection: 'products',
    locale: 'all',
    depth: 1,
    pagination: false,
  })

  return products.docs
}

export default async function Page() {
  const cookieStore = await cookies()
  const currentLanguage = (cookieStore.get('language')?.value || DEFAULT_LANGUAGE) as Language

  const data = await getPage()
  const categories = await getCategories()
  const products = await getProducts()
  // @ts-ignore
  const categoriesNames = categories.map((category) => category.name[currentLanguage])
  // @ts-ignore
  const content = JSON.parse(data.content[currentLanguage])

  return (
    <section>
      {/* latest products */}
      <div className="bg-[#F7F6F5] py-20">
        <div className="container mx-auto mt-5">
          <h2 className="font-medium text-4xl max-w-[30ch]">{content.hero.title}</h2>
          <p className="mt-5 text-gray-600">{content.filter.title}</p>

          <FilteredProducts
            // @ts-ignore
            products={products as Product[]}
            categories={categoriesNames}
            currentLanguage={currentLanguage}
          />
        </div>
      </div>
    </section>
  )
}
