import Link from 'next/link';

import { Head } from '../../components/frontend/navigation/Layout';
import Logo from "../../components/ui/Logo";

const params = {
    link: '/pricing/success',
    title: "Abonnement réussi | Hiala",
    description: "Hiala: TV, sports, séries, films en streaming ou en direct live."
}

export default function SuccessPage() {
    return <div className="min-h-screen relative overflow-hidden">
        <Head {...params} />

        <img src="/images/bg-screen.svg" alt="BG Screen" className="absolute hidden md:block inset-0 image-cover -z-10" />
        <img src="/images/frontend/screen/bg-sm.svg" alt="BG Small Screen" className="absolute md:hidden top-[140px] left-[53px] right-[30.31px] bottom-[111.31px] object-contain -z-10" />

        <div className='container flex flex-col items-center'>
            <div className="w-full mt-[30px] md:mt-[37px]">
                <Link href='/'><Logo /></Link>
            </div>

            <div className="flex flex-1 flex-col items-center mt-[126.98px] md:mt-[77px] relative">
                <img src="/images/frontend/screen/112854-congratulations.gif" alt="Success" className='w-[151px] md:w-[263px] absolute -top-[132px] md:-top-[156px] left-0 md:-left-[179px] -z-20' />
                <img src="/images/frontend/screen/112854-congratulations.gif" alt="Success" className='w-[151px] md:w-[263px] absolute top-[19px] md:top-[33px] left-0 md:-left-[99px] -z-20' />
                <img src="/images/frontend/screen/112854-congratulations.gif" alt="Success" className='w-[151px] md:w-[263px] absolute -top-[132px] md:-top-[181px] right-0 md:-right-[177px] -z-20' />
                <img src="/images/frontend/screen/112854-congratulations.gif" alt="Success" className='w-[151px] md:w-[263px] absolute top-[19px] md:top-[92px] right-0 md:-right-[189px] -z-20' />

                <div className="congratulations text-center text-3xl md:text-left md:text-6xl font-bold mb-4 md:mb-[11px]">
                    Félicitations !!!
                </div>

                <img src="/images/curve.svg" alt="Courbe" className="absolute hidden md:block -right-4 -top-6 md:-right-12 md:-top-16 md:translate-x-full" />

                <div className="text-lg text-center md:text-left mb-[37px] space-y-5">
                    <div>Vous avez acheté un bouquet avec succès. Ouvrez l'application et commencez à en profiter immédiatement.</div>
                    <div className='space-x-3 flex items-center justify-center'>
                        <a href="#"><img src="/images/frontend/Available_on_the_App_Store_(black)_SVG.svg.png" alt="App store app download" className='h-10 object-contain' /></a>
                        <a href="#"><img src="/images/frontend/Google_Play_Store_badge_EN.svg.png" alt="Play store app download" className='h-10 object-contain' /></a>
                    </div>
                </div>

                <img src="/images/frontend/screen/103973-tickets.gif" alt="Success" className='w-[184px] md:w-[300px] relative -z-10' />
            </div>

            <img src="/images/frontend/screen/85744-success.gif" alt="Success" className='w-[148px] md:w-[300px] absolute bottom-0 md:-bottom-[23px] left-0 md:left-[81px] -z-20' />
            <img src="/images/frontend/screen/85744-success.gif" alt="Success" className='w-[148px] md:w-[300px] absolute bottom-0 md:-bottom-[83px] right-0 md:right-[15px] -z-20' />
        </div>
    </div>
}