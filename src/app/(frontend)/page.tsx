import { getPayload } from 'payload'
import config from '@payload-config'
import Image from 'next/image'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import NewsletterForm from '@/components/NewsletterForm'
import { DEFAULT_LANGUAGE } from '@/lib/language'

import type { Page as PayloadPage } from '@/payload-types'
import type { Language } from '@/lib/language'

const payload = await getPayload({ config })

async function getHomepage() {
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
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
    limit: 8,
  })

  return products.docs
}

async function getWebsiteSettings() {
  const settings = await payload.findGlobal({
    slug: 'settings',
    locale: 'all',
    depth: 1,
  })

  return settings
}

export default async function Page() {
  const cookieStore = await cookies()
  const currentLanguage = (cookieStore.get('language')?.value || DEFAULT_LANGUAGE) as Language

  const data = await getHomepage()
  const categories = await getCategories()
  const products = await getProducts()
  const settings = await getWebsiteSettings()
  // @ts-ignore
  const categoriesNames = categories.map((category) => category.name[currentLanguage])
  // @ts-ignore
  const content = JSON.parse(data.content[currentLanguage])

  return (
    <section>
      {/* hero */}
      <div className="container mx-auto flex justify-between">
        <div>
          <h1 className="font-bold text-8xl tracking-tighter mt-32 max-w-[10ch] leading-[1.05]">
            {content.hero.title}
          </h1>
          <p className="text-2xl mt-10 text-gray-500 max-w-[45ch]">{content.hero.subtitle}</p>
          <Link href="/products">
            <button className="uppercase text-white text-lg bg-[#B46C53] hover:bg-white hover:text-[#B46C53] transition-colors px-8 py-2 cursor-pointer mt-7 border border-transparent hover:border-[#B46C53]">
              {content.hero.button}
            </button>
          </Link>
        </div>
        <div>
          {data?.media && data.media.length > 0 && 'image' in data.media[0] && (
            <Image
              // @ts-ignore
              src={data.media[0].image.url}
              // @ts-ignore
              alt={data.media[0]?.caption || 'Homepage image'}
              // @ts-ignore
              width={data.media[0].image.width}
              // @ts-ignore
              height={data.media[0].image.height}
              className="w-[900px] h-auto"
            />
          )}
        </div>
      </div>

      {/* info */}
      <div className="bg-[#F7F6F5] mt-20">
        <div className="container mx-auto flex justify-around pt-14">
          {categoriesNames.map((cn, i) => (
            <p key={i} className="uppercase text-lg tracking-wider">
              {cn}
            </p>
          ))}
        </div>
        <div className="container mx-auto mt-24 flex items-center justify-between">
          <div className="grid grid-cols-2 max-w-3xl gap-4">
            {data?.media && data.media.length > 0 && 'image' in data.media[1] && (
              <Image
                // @ts-ignore
                src={data.media[1].image.url}
                // @ts-ignore
                alt={data.media[1]?.caption || 'Homepage image'}
                // @ts-ignore
                width={data.media[1].image.width}
                // @ts-ignore
                height={data.media[1].image.height}
                className="w-full h-auto"
              />
            )}
            {data?.media && data.media.length > 0 && 'image' in data.media[3] && (
              <Image
                // @ts-ignore
                src={data.media[3].image.url}
                // @ts-ignore
                alt={data.media[3]?.caption || 'Homepage image'}
                // @ts-ignore
                width={data.media[3].image.width}
                // @ts-ignore
                height={data.media[3].image.height}
                className="w-full h-full row-span-2"
              />
            )}
            {data?.media && data.media.length > 0 && 'image' in data.media[2] && (
              <Image
                // @ts-ignore
                src={data.media[2].image.url}
                // @ts-ignore
                alt={data.media[2]?.caption || 'Homepage image'}
                // @ts-ignore
                width={data.media[2].image.width}
                // @ts-ignore
                height={data.media[2].image.height}
                className="w-full h-auto"
              />
            )}
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-center font-medium text-4xl max-w-[30ch]">{content.info.title}</h2>
            <p className="text-center max-w-[70ch] text-gray-700 mt-3 leading-relaxed">
              {content.info.subtitle}
            </p>
            <Link href="/about">
              <button className="uppercase text-white text-lg bg-[#B46C53] hover:bg-white hover:text-[#B46C53] transition-colors px-8 py-2 cursor-pointer mt-7 border border-transparent hover:border-[#B46C53]">
                {content.info.button}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* latest products */}
      <div className="bg-[#F7F6F5] pt-20">
        <div className="container mx-auto mt-10">
          <h2 className="font-medium text-4xl max-w-[30ch]">{content.newProducts.title}</h2>
          <div className="grid grid-cols-4 gap-8 pt-14">
            {products.map((product, index) => {
              if (!product.media) return

              const { image } = product.media[0]

              return (
                <Link
                  href={`/products/${product.slug}`}
                  key={product.id}
                  className="hover:scale-[1.025] transition-transform"
                >
                  <div>
                    <Image
                      // @ts-ignore
                      src={image.url}
                      // @ts-ignore
                      alt={image.alt}
                      // @ts-ignore
                      width={image.width}
                      // @ts-ignore
                      height={image.height}
                      className="w-full h-auto"
                    />
                    <p className="text-lg mt-4">
                      {/* @ts-ignore */}
                      {product.name[currentLanguage] ?? `Product ${index + 1}`}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="pt-14 flex justify-end">
            <Link href="/products">
              <button className="uppercase text-white text-lg bg-[#B46C53] hover:bg-white hover:text-[#B46C53] transition-colors px-8 py-2 cursor-pointer mt-7 border border-transparent hover:border-[#B46C53]">
                {content.hero.button}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* collection banner */}
      <div className="bg-[#F7F6F5] pt-24 pb-32">
        <div className="container mx-auto">
          {data?.media && data.media.length > 0 && 'image' in data.media[4] && (
            <div className="relative">
              <Image
                // @ts-ignore
                src={data.media[4].image.url}
                // @ts-ignore
                alt={data.media[4]?.caption || 'Homepage image'}
                // @ts-ignore
                width={data.media[4].image.width}
                // @ts-ignore
                height={data.media[4].image.height}
                className="w-full h-auto object-cover relative z-0"
              />
              <h4 className="absolute top-14 left-14 text-white text-6xl max-w-[30ch] leading-tight z-10">
                {content.collectionBanner.title}
              </h4>
              <div className="absolute bottom-10 right-10 z-10">
                <Link href="/products">
                  <button className="uppercase text-[#B46C53] text-lg bg-white hover:bg-[#B46C53] hover:text-white transition-colors px-8 py-2 cursor-pointer mt-7 border border-[#B46C53]">
                    {content.collectionBanner.button}
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
