import { FaceFrownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react'

import { Head } from '../../components/frontend/navigation/Layout';
import Logo from "../../components/ui/Logo";

const params = {
    link: '/pricing/failure',
    title: "Echec de l'abonnement | Hiala",
    description: "Hiala: TV, sports, séries, films en streaming ou en direct live."
}

export default function FailurePage() {
    return <div className="min-h-screen relative overflow-hidden">
        <Head {...params} />

        <div className='container flex flex-col items-center'>
            <div className="w-full mt-[30px] md:mt-[37px]">
                <Link href='/'><Logo /></Link>
            </div>

            <div className="flex flex-1 flex-col items-center mt-[126.98px] md:mt-[77px] relative">
                <div className='flex justify-center'>
                    <FaceFrownIcon className='text-red w-20' />
                </div>

                <div className="text-center text-red text-3xl md:text-left md:text-6xl font-bold mb-4 md:mb-[11px]">
                    Votre paiement n'a pas abouti
                </div>

                <div className="text-lg text-center mb-[37px] lg:text-xl space-y-5">
                    <div>Paiement annulé, rejeté ou invalide. Si votre compte a été débité, veuillez nous contacter au travers du formulaire de la page d'accueil ou encore par téléphone.</div>
                </div>
            </div>
        </div>
    </div>
}