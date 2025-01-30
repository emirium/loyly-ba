import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { DEFAULT_LANGUAGE } from '@/lib/language'

import type { Language } from '@/lib/language'
import Link from 'next/link'
import ProductGallery from '@/collections/ProductGallery'
import { cn } from '@/lib/utils'

const payload = await getPayload({ config })

async function getProduct(slug: string) {
  const product = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: slug,
      },
    },
    locale: 'all',
    depth: 1,
    pagination: false,
  })

  return product.docs[0]
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const cookieStore = await cookies()
  const currentLanguage = (cookieStore.get('language')?.value || DEFAULT_LANGUAGE) as Language
  const slug = (await params).slug

  const product = await getProduct(slug)
  return (
    <section className="bg-[#F7F6F5] py-20">
      <div className="container mx-auto">
        <Link href="/products" className="text-gray-500 text-sm">
          {currentLanguage === 'bs' && <span>&larr; Proizvodi</span>}
          {currentLanguage === 'en' && <span>&larr; Products</span>}
          {currentLanguage === 'de' && <span>&larr; Produktkollektion</span>}
        </Link>
        <h1 className="text-4xl font-medium mt-2">
          {/* @ts-ignore */}
          {product.name[currentLanguage] || `Product ${product.id}`}
        </h1>
        <div className="flex gap-10 mt-10">
          <div className="flex-1">
            <p className="max-w-[70ch] text-lg text-gray-700">
              {/* @ts-ignore */}
              {product.description[currentLanguage] || `Product ${product.id} description`}
            </p>
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-6 py-6 border-y flex flex-col gap-4">
                {product.specifications.map((spec) => (
                  <div key={spec.id}>
                    {/* @ts-ignore */}
                    <h4 className="text-gray-500">{spec.label[currentLanguage]}</h4>
                    {/* @ts-ignore */}
                    <p className="text-xl mt-1">{spec.value[currentLanguage]}</p>
                  </div>
                ))}
              </div>
            )}
            <div
              className={cn(
                'mt-6',
                product.specifications && product.specifications.length > 0 ? '' : 'border-t pt-6',
              )}
            >
              {currentLanguage === 'bs' && <p>Pošaljite upit na:</p>}
              {currentLanguage === 'en' && <p>Send inquiry to:</p>}
              {currentLanguage === 'de' && <p>Senden Sie Ihre Anfrage an:</p>}
              <div className="flex gap-4 mt-4">
                <a
                  href="mailto:info@loyly.ba"
                  className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 hover:border-gray-400 transition-colors rounded"
                >
                  <span className="text-gray-500">✉️</span>
                  info@loyly.ba
                </a>
                <a
                  href="https://wa.me/38762380982"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 hover:border-gray-400 transition-colors rounded"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div>
            {/* <pre>
              <code>{JSON.stringify(product.media, null, 2)}</code>
            </pre> */}
            {product?.media && product.media.length > 0 && 'image' in product.media[0] && (
              <Image
                // @ts-ignore
                src={product.media[0].image.url}
                // @ts-ignore
                alt={product.media[0]?.alt || 'image description'}
                // @ts-ignore
                width={product.media[0].image.width}
                // @ts-ignore
                height={product.media[0].image.height}
                className="max-w-2xl flex-1 object-cover"
              />
            )}
            <ProductGallery
              // @ts-ignore
              media={product.media}
              language={currentLanguage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
