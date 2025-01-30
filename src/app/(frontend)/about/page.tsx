import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { DEFAULT_LANGUAGE } from '@/lib/language'
import Image from 'next/image'

import type { Page as PayloadPage } from '@/payload-types'
import type { Language } from '@/lib/language'

const payload = await getPayload({ config })

async function getPage() {
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'about',
      },
    },
    locale: 'all',
    depth: 1,
    pagination: false,
  })

  return page.docs[0] as PayloadPage
}

export default async function Page() {
  const cookieStore = await cookies()
  const currentLanguage = (cookieStore.get('language')?.value || DEFAULT_LANGUAGE) as Language

  const data = await getPage()
  // @ts-ignore
  const content = JSON.parse(data.content[currentLanguage])

  return (
    <section>
      <div className="bg-[#F7F6F5] py-20">
        <div className="container mx-auto mt-5">
          <h1 className="text-5xl font-medium">{content.hero.title}</h1>
          {/* hero */}
          <div className="flex justify-between items-center gap-10 mt-16">
            {/* left grid */}
            <div className="flex-1">
              <div className="p-6 bg-white flex justify-between gap-5">
                <div className="flex flex-col justify-between">
                  <h4 className="text-5xl">{content.hero.first.number}</h4>
                  <p className="text-gray-600">{content.hero.first.text}</p>
                </div>
                {data?.media && data.media.length > 0 && 'image' in data.media[0] && (
                  <Image
                    // @ts-ignore
                    src={data.media[0].image.url}
                    // @ts-ignore
                    alt={data.media[0]?.alt || 'image description'}
                    // @ts-ignore
                    width={data.media[0].image.width}
                    // @ts-ignore
                    height={data.media[0].image.height}
                    className="max-w-[200px] h-auto flex-1"
                  />
                )}
              </div>
              <div className="flex gap-10 mt-10">
                {/* orange square */}
                <div className="p-6 bg-[#B46C53] text-white flex flex-col justify-between min-h-[250px]">
                  <h4 className="text-5xl">{content.hero.second.number}</h4>
                  <p>{content.hero.second.text}</p>
                </div>
                {/* black square */}
                <div className="p-6 bg-black text-white flex flex-col justify-between">
                  <h4 className="text-5xl">{content.hero.third.number}</h4>
                  <p>{content.hero.third.text}</p>
                </div>
              </div>
            </div>
            {/* right content */}
            <div className="flex-1">
              {data?.media && data.media.length > 0 && 'image' in data.media[1] && (
                <Image
                  // @ts-ignore
                  src={data.media[1].image.url}
                  // @ts-ignore
                  alt={data.media[1]?.alt || 'image description'}
                  // @ts-ignore
                  width={data.media[1].image.width}
                  // @ts-ignore
                  height={data.media[1].image.height}
                  className="w-full h-auto flex-1"
                />
              )}
              <div className="mt-5">
                <h4 className="text-2xl">{content.hero.fourth.title}</h4>
                <p className="text-gray-600 mt-1">{content.hero.fourth.description}</p>
              </div>
            </div>
          </div>
          {/* info */}
          <div className="mt-48 flex justify-between gap-10">
            <div className="flex-1">
              <div className="py-10 border-b border-gray-300">
                <h4 className="text-2xl">{content.info.first.title}</h4>
                <p className="text-gray-600 mt-1 text-lg">{content.info.first.description}</p>
              </div>
              <div className="py-10 border-b border-gray-300">
                <h4 className="text-2xl">{content.info.second.title}</h4>
                <p className="text-gray-600 mt-1 text-lg">{content.info.second.description}</p>
              </div>
              <div className="py-10 border-b border-gray-300">
                <h4 className="text-2xl">{content.info.third.title}</h4>
                <p className="text-gray-600 mt-1 text-lg">{content.info.third.description}</p>
              </div>
            </div>
            {data?.media && data.media.length > 0 && 'image' in data.media[2] && (
              <Image
                // @ts-ignore
                src={data.media[2].image.url}
                // @ts-ignore
                alt={data.media[2]?.alt || 'image description'}
                // @ts-ignore
                width={data.media[2].image.width}
                // @ts-ignore
                height={data.media[2].image.height}
                className="max-w-3xl h-auto flex-1"
              />
            )}
          </div>
          <div className="mt-48 flex justify-between gap-10">
            <div className="flex-1">
              <div className="h-[400px]">
                {data?.media && data.media.length > 0 && 'image' in data.media[3] && (
                  <Image
                    // @ts-ignore
                    src={data.media[3].image.url}
                    // @ts-ignore
                    alt={data.media[3]?.alt || 'image description'}
                    // @ts-ignore
                    width={data.media[3].image.width}
                    // @ts-ignore
                    height={data.media[3].image.height}
                    className="max-w-lg h-full object-cover"
                  />
                )}
              </div>
              <div className="mt-5">
                <h4 className="text-2xl">{content.info.fourth.title}</h4>
                <p className="text-gray-600 mt-1">{content.info.fourth.description}</p>
              </div>
            </div>
            <div className="flex-2">
              <div className="h-[400px]">
                {data?.media && data.media.length > 0 && 'image' in data.media[4] && (
                  <Image
                    // @ts-ignore
                    src={data.media[4].image.url}
                    // @ts-ignore
                    alt={data.media[4]?.alt || 'image description'}
                    // @ts-ignore
                    width={data.media[4].image.width}
                    // @ts-ignore
                    height={data.media[4].image.height}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="mt-5 flex justify-between gap-10">
                <div>
                  <h4 className="text-2xl">{content.info.fifth.title}</h4>
                  <p className="text-gray-600 mt-1">{content.info.fifth.description}</p>
                </div>
                <div>
                  <h4 className="text-2xl">{content.info.sixth.title}</h4>
                  <p className="text-gray-600 mt-1">{content.info.sixth.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
