import { getPayload } from 'payload'
import config from '@payload-config'
import { Manrope } from 'next/font/google'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { cn } from '@/lib/utils'
import './globals.css'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import NewsletterForm from '@/components/NewsletterForm'
import { DEFAULT_LANGUAGE } from '@/lib/language'

import type { Language } from '@/lib/language'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import FAQ from '@/components/FAQ'

const payload = await getPayload({ config })
const fontSans = Manrope({ subsets: ['latin'] })

const settings = await payload.findGlobal({
  slug: 'settings',
  locale: 'all',
})

const faq = await payload.findGlobal({
  slug: 'faq',
  locale: 'all',
})

const prefooter = await payload.findGlobal({
  slug: 'prefooter',
  locale: 'all',
})

const allPages = await payload.find({
  collection: 'pages',
  locale: 'all',
  pagination: false,
})

const homePage = allPages.docs
  .filter((doc) => doc.slug === 'home')
  .map((doc) => ({ title: doc.title, href: '/' }))[0]
const aboutPage = allPages.docs
  .filter((doc) => doc.slug === 'about')
  .map((doc) => ({ title: doc.title, href: `/${doc.slug}` }))[0]
const productsPage = allPages.docs
  .filter((doc) => doc.slug === 'products')
  .map((doc) => ({ title: doc.title, href: `/${doc.slug}` }))[0]
const materialsPage = allPages.docs
  .filter((doc) => doc.slug === 'materials')
  .map((doc) => ({ title: doc.title, href: `/${doc.slug}` }))[0]
const contactPage = allPages.docs
  .filter((doc) => doc.slug === 'contact')
  .map((doc) => ({ title: doc.title, href: `/${doc.slug}` }))[0]

const pageLinks = [homePage, aboutPage, productsPage, materialsPage, contactPage]

export const metadata: Metadata = {
  title: 'Loyly',
  description: 'Loyly',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const currentLanguage = (cookieStore.get('language')?.value || DEFAULT_LANGUAGE) as Language

  return (
    <html>
      <body className={cn(fontSans.className)}>
        <Header pageLinks={pageLinks} settings={settings} currentLanguage={currentLanguage}>
          <LanguageSwitcher />
        </Header>
        <main>{children}</main>
        {/* faq */}
        <FAQ
          currentLanguage={currentLanguage}
          // @ts-ignore
          title={faq.title[currentLanguage]}
          // @ts-ignore
          items={faq.items}
        />
        {/* pre footer */}
        <div className="py-32">
          <div className="container mx-auto grid grid-cols-4 gap-8">
            {prefooter.items.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-1">
                <Image
                  // @ts-ignore
                  src={item.image.url}
                  // @ts-ignore
                  alt={item.image.alt}
                  // @ts-ignore
                  width={item.image.width}
                  // @ts-ignore
                  height={item.image.height}
                  className="size-24"
                />
                <span className="mt-10 text-gray-600">0{index + 1}</span>
                {/* @ts-ignore */}
                <h4 className="text-xl">{item.title[currentLanguage]}</h4>
                {/* @ts-ignore */}
                <p className="text-sm text-gray-600">{item.description[currentLanguage]}</p>
              </div>
            ))}
          </div>
        </div>
        {/* footer */}
        <footer className="py-24 bg-[#253860]">
          <div className="container mx-auto">
            <div className="flex justify-between">
              {/* info */}
              <div>
                <Image
                  // @ts-ignore
                  src={settings.logo.url}
                  // @ts-ignore
                  alt={settings.logo.alt}
                  // @ts-ignore
                  width={settings.logo.width}
                  // @ts-ignore
                  height={settings.logo.height}
                  className="h-auto"
                />
                <div className="mt-8 flex gap-4">
                  {settings.socialMedia?.map((sm) => (
                    <div
                      key={sm.id}
                      className="size-12 border border-gray-400 rounded-full flex items-center justify-center"
                    >
                      <a
                        href={sm.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300"
                      >
                        {sm.platform === 'facebook' && <Facebook />}
                        {sm.platform === 'instagram' && <Instagram />}
                        {sm.platform === 'linkedin' && <Linkedin />}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="mt-10 flex flex-col gap-2 text-gray-300">
                  <p>{settings.companyInfo.email}</p>
                  <p>{settings.companyInfo.phone}</p>
                  {/* @ts-ignore */}
                  <p>{settings.companyInfo.address[currentLanguage]}</p>
                </div>
              </div>
              {/* newsletter */}
              <div className="w-[400px]">
                <h4 className="text-white text-left text-xl">Newsletter / Bilten</h4>
                <NewsletterForm />
              </div>
            </div>
            <div className="border-t border-gray-500 text-gray-400 pt-3 mt-24">
              <p>&copy; {new Date().getFullYear()} LÖYLY</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
