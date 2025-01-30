import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { DEFAULT_LANGUAGE } from '@/lib/language'
import Image from 'next/image'

import type { Page as PayloadPage } from '@/payload-types'
import type { Language } from '@/lib/language'
import MaterialButtons from '@/components/MaterialButtons'

const payload = await getPayload({ config })

async function getPage() {
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'materials',
      },
    },
    locale: 'all',
    depth: 1,
    pagination: false,
  })

  return page.docs[0] as PayloadPage
}

async function getMaterials() {
  const materials = await payload.find({
    collection: 'materials',
    locale: 'all',
    depth: 1,
    pagination: false,
  })

  return materials.docs
}

export default async function Page() {
  const cookieStore = await cookies()
  const currentLanguage = (cookieStore.get('language')?.value || DEFAULT_LANGUAGE) as Language

  const data = await getPage()
  const materials = await getMaterials()
  // @ts-ignore
  const content = JSON.parse(data.content[currentLanguage])

  return (
    <section>
      {/* all materials */}
      <div className="bg-[#F7F6F5] py-20">
        <div className="container mx-auto mt-5">
          <h2 className="font-medium text-4xl">{content.title}</h2>
          <div className="mt-14 grid grid-cols-4 gap-10">
            {materials.map((material) => (
              <div key={material.id}>
                {material?.images && material.images.length > 0 && (
                  <Image
                    // @ts-ignore
                    src={material.images[0].image.url}
                    // @ts-ignore
                    alt={material.images[0]?.alt || 'image description'}
                    // @ts-ignore
                    width={material.images[0].image.width}
                    // @ts-ignore
                    height={material.images[0].image.height}
                    className="w-full flex-1 object-cover"
                  />
                )}
                <div className="mt-3 flex items-center justify-between">
                  {/* @ts-ignore */}
                  <p className="text-lg">{material.name[currentLanguage]}</p>
                  <MaterialButtons
                    material={material}
                    currentLanguage={currentLanguage}
                    content={content}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
