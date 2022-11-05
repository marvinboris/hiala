import { ReactElement, useEffect, useState } from 'react'

import { NextPageWithLayout } from './_app'
import { classNames } from '../app/helpers/utils'
import { getBouquets } from '../app/resources/bouquets'
import BouquetType from '../app/types/bouquet'
import Layout, { Head } from '../components/frontend/navigation/Layout'
import Button from '../components/frontend/ui/form/Button'
import BouquetSubscribe from '../components/frontend/pricing/subscribe'
import Status from '../app/enums/status'
import PageLoader from '../components/frontend/ui/page/loader'
import Alert from '../components/frontend/ui/alert'
import { ArrowLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'

const params = {
    link: '/pricing',
    title: "Abonnement | Hiala",
    description: "Hiala: TV, sports, séries, films en streaming ou en direct live."
}

type BouquetProps = BouquetType & {
    active: boolean
    onClick: () => void
}

const Back = ({ onClick }: { onClick: () => void }) => <div className='px-5 md:px-0 absolute top-0 md:top-[51px] md:left-[87px]'>
    <div className="flex items-center cursor-pointer" onClick={onClick}>
        <div className="w-10 h-10 flex items-center justify-center mr-2">
            <ArrowLeftIcon className='text-primary w-8' />
        </div>

        <div className="text-sm">Back</div>
    </div>
</div>

const Bouquet = ({ name, price, active, channelsize, seriesize, onClick }: BouquetProps) => <div onClick={onClick} className={classNames(active ? 'bg-primary text-white' : 'bg-secondary-100', 'cursor-pointer rounded-3xl space-y-3 py-[27px] px-[18px]')}>
    <div className='font-bold'>{name}</div>

    <div className='text-4xl font-semibold'>{price} <span className='text-sm'>XAF / mois</span></div>

    <div>
        <div><ChevronDoubleRightIcon className='w-3 mr-1 inline-block' />{channelsize + seriesize} films, séries et chaînes</div>
        <div><ChevronDoubleRightIcon className='w-3 mr-1 inline-block' />Regardez sur tous vos appareils</div>
        <div><ChevronDoubleRightIcon className='w-3 mr-1 inline-block' />Changez de bouquet quand vous voulez</div>
    </div>
</div>

const PricingPage: NextPageWithLayout = () => {
    const [message, setMessage] = useState<string | null>(null)
    const [status, setStatus] = useState(Status.IDLE)

    const [bouquets, setBouquets] = useState<BouquetType[] | null>(null)
    const [selectedBouquet, setSelectedBouquet] = useState<BouquetType | null>(null)
    const [page, setPage] = useState(1)

    useEffect(() => {
        if (!bouquets) {
            (async function () {
                setStatus(Status.LOADING)
                setMessage(null)
                try {
                    const bouquets = await getBouquets()
                    setStatus(Status.IDLE)
                    setBouquets(bouquets)
                    setSelectedBouquet(bouquets[0])
                } catch (error) {
                    setStatus(Status.FAILED)
                    setMessage('Erreur interne')
                }
            })()
        }
    }, [])

    const bouquetsContent = bouquets !== null && bouquets.map(bouquet => <Bouquet key={'bouquet-' + bouquet.id} {...bouquet} active={selectedBouquet !== null && (bouquet.id === selectedBouquet.id)} onClick={() => setSelectedBouquet(bouquet)} />)

    const previousPage = () => page > 1 ? setPage(page - 1) : null
    const nextPage = () => {
        if (selectedBouquet !== null) setPage(page + 1)
        else {
            setStatus(Status.FAILED)
            setMessage('Veuillez sélectionner un bouquet')
        }
    }

    const firstPageContent = <div>
        <div className='min-h-[400px]'>
            <div className="grid gap-x-[30px] gap-y-[14px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {bouquetsContent}
            </div>
        </div>

        <div className="flex justify-center mt-5">
            <Button onClick={page === 1 ? nextPage : nextPage}>{page === 1 ? "Continuer" : "Soumettre"}</Button>
        </div>
    </div>

    const secondPageContent = selectedBouquet && <div className='relative'>
        <Back onClick={previousPage} />

        <BouquetSubscribe amount={selectedBouquet.price} name={selectedBouquet.name} id={selectedBouquet.id} />
    </div>

    return <>
        <Head {...params} />
        <main>
            <section id="pricing" className="min-h-screen pt-[148px] md:pt-[133px]">
                <div className="container">
                    <div className="text-center">
                        <div className="font-bold mb-[23px] md:mb-[13px] text-2xl md:text-4xl text-primary">Choisissez votre bouquet</div>
                        <div className="text-2xl font-bold mb-5">Vos programmes favoris, où vous voulez, quand vous voulez</div>
                    </div>

                    <div>
                        <div className='space-y-[13.63px]'>
                            {message && <Alert color={status === Status.FAILED ? 'danger' : 'info'}>{message}</Alert>}
                            {status === Status.LOADING ? <PageLoader /> : <>
                                {page === 1 && firstPageContent}
                                {page === 2 && secondPageContent}
                            </>}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>
}

PricingPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default PricingPage