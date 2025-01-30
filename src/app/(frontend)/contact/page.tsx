import { getPayload } from 'payload'
import config from '@payload-config'
import { cookies } from 'next/headers'
import { DEFAULT_LANGUAGE } from '@/lib/language'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import Map from '@/components/Map'

import type { Page as PayloadPage } from '@/payload-types'
import type { Language } from '@/lib/language'

const payload = await getPayload({ config })

async function getPage() {
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'contact',
      },
    },
    locale: 'all',
    depth: 1,
    pagination: false,
  })

  return page.docs[0] as PayloadPage
}

const settings = await payload.findGlobal({
  slug: 'settings',
  locale: 'all',
})

export default async function Page() {
  const cookieStore = await cookies()
  const currentLanguage = (cookieStore.get('language')?.value || DEFAULT_LANGUAGE) as Language

  const data = await getPage()
  // @ts-ignore
  const content = JSON.parse(data.content[currentLanguage])

  return (
    <section>
      {/* latest products */}
      <div className="bg-[#F7F6F5] py-20">
        <div className="container mx-auto mt-5">
          <h2 className="font-medium text-4xl max-w-[30ch]">{content.hero.title}</h2>
          <p className="mt-5 text-gray-600 max-w-[50ch]">{content.hero.subtitle}</p>
          <div className="mt-24 flex justify-between gap-10">
            <div className="flex-1">
              <ContactForm content={content.form} />
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
                className="max-w-xl h-auto flex-1"
              />
            )}
          </div>
          {/* map */}
          <div className="mt-32 border border-gray-300 p-4 relative z-0">
            <Map language={currentLanguage} />
            {/* contact information */}
            <div className="absolute right-8 w-[400px] top-1/2 -translate-y-1/2 z-10 bg-[#B46C53] p-8 text-white">
              <h4 className="text-xl pb-4 border-b border-white/40">{content.contactInfo.title}</h4>
              <div className="py-5 border-b border-white/40">
                <h4 className="text-lg border-white/40 flex items-center gap-2">
                  <Mail className="stroke-[2] size-5 text-white/70" />
                  <span>{content.contactInfo.email.title}</span>
                </h4>
                <p className="text-sm text-white/90 mt-1">{content.contactInfo.email.subtitle}</p>
                <p className="mt-4 text-lg">{settings.companyInfo.email}</p>
              </div>
              <div className="pt-5">
                <h4 className="text-lg border-white/40 flex items-center gap-2">
                  <Phone className="stroke-[2] size-5 text-white/70" />
                  <span>{content.contactInfo.phone.title}</span>
                </h4>
                <p className="text-sm text-white/90 mt-1">{content.contactInfo.phone.subtitle}</p>
                <p className="mt-4 text-lg">{settings.companyInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
