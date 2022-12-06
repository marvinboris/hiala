import { ArrowDownOnSquareIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, EnvelopeIcon, MapPinIcon, PhoneIcon, PlayIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ReactElement, useEffect, useState } from 'react'

import { NextPageWithLayout } from './_app'
import { getFaqs } from '../app/resources/faqs'
import { getLocations } from '../app/resources/locations'
import FaqType from '../app/types/faq'
import LocationType from '../app/types/location'
import Layout, { Head } from '../components/frontend/navigation/Layout'
import Button from '../components/frontend/ui/form/Button'
import SocialNetworks from '../components/frontend/navigation/Footer/SocialNetworks'
import GetStarted from '../components/frontend/home/GetStarted'

const params = {
  link: '/',
  title: "Hiala",
  description: "Hiala: TV, sports, séries, films en streaming ou en direct live."
}

const Location = ({ address, city, days, hours, map, phone }: LocationType) => <div>
  <div className='w-[208px] md:w-auto'>
    <div className="aspect-[4/3] relative rounded-[27.759px] shadow-lg overflow-hidden mb-[18.51px]">
      <iframe src={map} className="w-full h-full absolute inset-0" />
    </div>

    <div className="md:pr-[58.1px] space-y-2">
      <div><span className="font-bold">{city}</span> - {address}</div>

      <div><span className="font-bold">Timings :</span><br />{days}<br />{hours}</div>

      <div><span className="font-bold">Phone :</span><br />{phone}</div>
    </div>
  </div>
</div>

interface DirectionButtonProps {
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element,
  onClick: () => void
}

const DirectionButton = ({ icon: Icon, onClick }: DirectionButtonProps) => <div onClick={onClick} className="w-[50.58px] h-[50.58px] rounded-full flex items-center justify-center bg-primary/20 cursor-pointer">
  <Icon className='text-primary w-5' />
</div>

interface PageButtonProps {
  active: boolean
  page: number
  onClick: (page: number) => void
}

const classNames = (...c: string[]) => c.join(' ')

const PageButton = ({ active, page, onClick }: PageButtonProps) => <div onClick={() => onClick(page)} className={classNames('text-lg', active ? "font-bold text-primary" : "")}>{page}</div>

const Faq = ({ question, answer }: FaqType) => <div className='rounded-3xl bg-secondary-100 py-[27px] px-[18px]'>
  <div className='font-bold'>{question}</div>

  <div className="mt-[13px] mb-2.5 w-[44px]">
    <div className="rounded-xl h-1 bg-primary" />
  </div>

  <div className='text-sm'>{answer}</div>
</div>

const HomePage: NextPageWithLayout = () => {
  const [locations, setLocations] = useState<LocationType[] | null>(null)
  const [faqs, setFaqs] = useState<FaqType[] | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!faqs) getFaqs().then(faqs => setFaqs(faqs))
  }, [])

  const faqsContent = faqs !== null && faqs.filter((f, i) => (i >= 6 * (page - 1)) && (i < 6 * page)).map(faq => <Faq key={'faq-' + faq.question} {...faq} />)

  const pageNumber = faqs !== null ? Math.ceil(faqs.length / 6) : 0

  const firstPage = page > 2 ? page === pageNumber ? page - 2 : page - 1 : 1
  const secondPage = page > 2 ? page === pageNumber ? page - 1 : page : 2
  const thirdPage = page > 2 ? page === pageNumber ? page : page + 1 : 3

  const previousPage = () => page > 1 ? setPage(page - 1) : null
  const nextPage = () => page < pageNumber ? setPage(page + 1) : null


  useEffect(() => {
    if (!locations) getLocations().then(locations => setLocations(locations))
  }, [])

  const locationsContent = locations !== null && locations.map(location => <Location key={'location-' + location.map} {...location} />)

  return <>
    <Head {...params} />
    <main>
      <section id='home' className="min-h-screen flex items-center pt-[133px] pb-12 bg-gradient-to-t from-primary/10 to-transparent">
        <div className='container'>
          <div className='grid md:gap-12 md:grid-cols-2'>
            <div>
              <div className="font-bold mb-[23px] md:mb-[13px] text-2xl md:text-4xl text-primary">Vos programmes préférés</div>

              <div className='font-bold mb-5 md:mb-[23px] text-3xl md:text-5xl'>
                Bienvenue chez Hiala
              </div>

              <div className="mb-[26.89px] md:mb-[71px] md:pr-[70px]">
                Regardez vos séries, films et programmes favoris où vous voulez, quand vous voulez.<br /><br />
                Enregistrez-vous et démarrez un essai gratuit.
              </div>

              <div className="hidden md:flex gap-4">
                <GetStarted />
                <a href="/files/app.apk"><Button color="night">Télécharger l'application <ArrowDownOnSquareIcon className='w-6 inline-block opacity-50' /></Button></a>
              </div>
            </div>

            <div>
              <div className='relative pl-[34.79px] pr-[36.81px] pt-[46px] pb-[38px]'>
                <div className="aspect-[4/3] md:aspect-video relative">
                  <div className="absolute z-10 rounded-[45px] bg-white inset-0" />
                  <img src="/images/frontend/kelly-sikkema-MsddXGPfQlA-unsplash.jpg" alt="Banner" className="absolute rounded-[45px] top-0 z-20 image-cover" />
                  <div className="absolute z-30 rounded-[45px] inset-0 bg-black/40 flex flex-col items-center justify-center" />
                </div>

                <div className="absolute z-0 bottom-0 left-0 rounded-[38.0488px] bg-orange/10 shadow-lg shadow-orange/10 ratio-4by3 w-2/5" />
                <div className="absolute z-0 top-0 right-0 rounded-[45px] bg-primary/10 shadow-lg shadow-primary/10 ratio-4by3 w-3/5" />
              </div>

              <div className="text-center flex mt-[39.13px] md:hidden gap-4">
                <GetStarted />
                <a href="/files/app.apk"><Button color="night">Télécharger l'application <ArrowDownOnSquareIcon className='w-6 inline-block opacity-50' /></Button></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="want" className="min-h-screen py-[133px]">
        <div className="container">
          <div className="grid md:gap-12 md:grid-cols-2">
            <div className='order-1 md:order-2'>
              <div className="font-bold mb-[23px] md:mb-[13px] text-2xl md:text-4xl text-primary">Tout ce que vous voulez</div>

              <div className='md:mb-[45px]'>
                Hiala vous permet de regarder à la fois vos chaînes préférées, ainsi que les sorties les plus récentes de films et séries et même les plus anciens pour les nostalgiques.
                <br /><br />
                Profitez d'une semaine gratuite. Pas de décodeur nécessaire. Téléchargez notre application et commencez maintenant.
              </div>

              <div className="hidden md:block">
                <GetStarted />
              </div>
            </div>

            <div className='order-2 md:order-1 relative scale-75 md:scale-100'>
              <div className="pb-8 lg:pb-[60px] pr-8 lg:pr-[63px] pt-8 lg:pt-16">
                <div className="aspect-[4/3] md:aspect-video relative">
                  <div className="w-[22px] h-[22px] rounded-full bg-primary absolute -top-1 -right-6" />
                  <img src="/images/frontend/eye-speak-aIVayOQj5_M-unsplash.jpg" alt="Mission" className="absolute z-10 inset-0 rounded-[45px] image-cover" />
                </div>

                <div className="absolute z-0 bottom-0 right-0 rounded-[45px] bg-primary/10 shadow-lg shadow-primary/10 ratio-4by3 w-3/5" />
              </div>
            </div>

            <div className='order-3 md:hidden text-center'>
              <GetStarted />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="min-h-screen pt-[148px] md:pt-[133px]">
        <div className="container">
          <div className="text-center">
            <div className="font-bold mb-[23px] md:mb-[13px] text-2xl md:text-4xl text-primary">Foire aux questions</div>
            <div className="text-2xl font-bold mb-5">En cas de difficultés</div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-x-[30px] gap-y-[14px] md:grid-cols-3">
              {faqsContent}
            </div>

            <div className="mt-[52px] pb-[100px] md:pb-0 flex items-center justify-center space-x-6">
              <div>
                <DirectionButton icon={ChevronLeftIcon} onClick={previousPage} />
              </div>

              <div className="flex items-center space-x-[18px]">
                <PageButton active={page === firstPage} page={firstPage} onClick={setPage} />
                {pageNumber > 1 && <PageButton active={page === secondPage} page={secondPage} onClick={setPage} />}
                {pageNumber > 2 && <PageButton active={page === thirdPage} page={thirdPage} onClick={setPage} />}
              </div>

              <div>
                <DirectionButton icon={ChevronRightIcon} onClick={nextPage} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen pt-[148px] md:pt-[133px] pb-5">
        <div className="container">
          <div className="font-bold mb-[23px] md:mb-[13px] text-2xl md:text-4xl text-primary">Contact</div>

          <div className="flex flex-wrap justify-between">
            <div className="order-2 md:order-1 w-full md:w-3/4 mt-[31px] md:mt-0 pb-[49px] md:pb-0">
              <div className="text-2xl font-bold mb-5">Retrouvez-nous</div>

              <div className="flex items-stretch -mx-6 px-6 md:mx-0 md:px-0 pb-5 md:pb-0 w-screen md:w-auto overflow-x-auto space-x-[22px] md:space-x-0 md:grid md:gap-5 md:grid-cols-3">
                {locationsContent}
              </div>
            </div>

            <div className="order-1 md:order-2 w-full md:w-1/4 md:mt-[52px] md:pl-[90px]">
              <div className='space-y-6'>
                <div className="flex">
                  <div>
                    <div className="w-12">
                      <MapPinIcon className='text-primary w-7' />
                    </div>
                  </div>

                  <div>
                    Adresse détaillée de l'entreprise
                  </div>
                </div>

                <div className="flex">
                  <div>
                    <div className="w-12">
                      <EnvelopeIcon className='text-primary w-7' />
                    </div>
                  </div>

                  <div>contact@hiala.tv</div>
                </div>

                <div className="flex">
                  <div>
                    <div className="w-12">
                      <PhoneIcon className='text-primary w-7' />
                    </div>
                  </div>

                  <div>+000 000 000 000</div>
                </div>
              </div>

              <div className="mt-10">
                <SocialNetworks />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </>
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default HomePage