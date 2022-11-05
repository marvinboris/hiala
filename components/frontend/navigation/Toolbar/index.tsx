/* This example requires Tailwind CSS v2.0+ */
import { Fragment, ComponentProps } from 'react'
import Link from 'next/link'
import { Popover, Transition } from '@headlessui/react'
import { XMarkIcon, HomeIcon, IdentificationIcon, Bars3BottomRightIcon, PhoneIcon, QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon, ArrowRightIcon, WalletIcon } from '@heroicons/react/24/outline'

import Logo from '../../../ui/Logo'

import NavItem from './NavItem'
import LanguageSelect from './LanguageSelect'
import Dropdown from './Dropdown'
import Resource from './Resource'
import Button from '../../ui/form/Button'
import { useRouter } from 'next/router'

const mobileNavItems = [
    { name: 'Accueil', href: '#home', icon: HomeIcon },
    { name: 'A propos', href: '#want', icon: IdentificationIcon },
    { name: 'FAQ', href: '#faq', icon: QuestionMarkCircleIcon },
    { name: 'Contact', href: '#contact', icon: PhoneIcon },
    { name: 'Abonnement', href: '/pricing', icon: WalletIcon },
]

const renderMobileNavItem = (item: { name: string, href: string, icon: (props: ComponentProps<'svg'>) => JSX.Element }, close: () => void) => {
    const router = useRouter()

    const content = <>
        <item.icon className="h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
        <span className="ml-3 text-base font-medium text-secondary-900 dark:text-white">{item.name}</span>
    </>

    return item.href.startsWith('#') && router.pathname === '/' ? <a key={item.name} href={item.href} onClick={close} className="-m-3 flex items-center rounded-md p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800">
        {content}
    </a> : <Link key={item.name} href={item.href.startsWith('#') ? `/${item.href}` : item.href} onClick={close} className="-m-3 flex items-center rounded-md p-3 hover:bg-secondary-50 dark:hover:bg-secondary-800">
        {content}
    </Link>
}

export default function Toolbar() {
    return (
        <Popover className="fixed w-full top-0 z-40 bg-white/80 dark:bg-secondary-900 backdrop-filter backdrop-blur">
            {({ close }) => <>
                <div className="container">
                    <div className="flex items-center py-[30px] md:py-[10px]">
                        <div className="flex justify-start">
                            <Link href="/" className='cursor-pointer'>
                                <span className="sr-only">Hiala</span>
                                <Logo />
                            </Link>
                        </div>

                        <div className='flex-1 md:flex-initial md:ml-auto flex items-center'>
                            <div className="flex items-center mr-[77px]">
                                <Popover.Group as="nav" className="hidden space-x-8 md:flex">
                                    <NavItem href="#home" icon={HomeIcon}>Accueil</NavItem>
                                    <NavItem href="#want">A propos</NavItem>
                                    <NavItem href="#faq">FAQ</NavItem>
                                    <NavItem href="#contact">Contact</NavItem>
                                </Popover.Group>
                            </div>

                            <div>
                                <LanguageSelect />
                            </div>

                            <div className='hidden md:block ml-[26px]'>
                                <Link href='/pricing'>
                                    <Button size='sm'><span className='font-medium'>Abonnement</span><span><ArrowRightIcon className='ml-2 inline-block w-5 text-white/60 group-hover:text-white transition-all duration-200' /></span></Button>
                                </Link>
                            </div>

                            <div className="md:hidden ml-auto md:ml-4">
                                <Popover.Button className="flex h-10 items-center justify-center rounded-md p-2 text-primary bg-primary/10 -m-2 focus:outline-none">
                                    <span className="sr-only">Ouvrir le menu</span>
                                    <Bars3BottomRightIcon className="w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>
                    </div>
                </div>

                <Popover.Overlay className="md:hidden fixed top-0 w-full h-screen z-40 bg-black/20 dark:bg-secondary-900/80 backdrop-filter backdrop-blur-sm" />
                <Transition as={Fragment} enter="duration-200 ease-out" enterFrom="opacity-0" enterTo="opacity-100" leave="duration-200 ease-in" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <Popover.Panel focus className="fixed inset-x-0 top-0 z-50 md:hidden">
                        <div className="absolute top-0 left-0 w-full pt-4">
                            <div className="container flex justify-end">
                                <Popover.Button className="flex h-10 items-center justify-center rounded-md p-2 -mr-2 focus:outline-none">
                                    <span className="sr-only">Fermer le menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </Popover.Button>
                            </div>
                        </div>

                        <div className="mt-[72px] container">
                            <div className="divide-y-2 divide-secondary-50 dark:divide-secondary-200/10 rounded-lg bg-white dark:bg-secondary-800 shadow-lg ring-1 ring-black/5 dark:ring-white/5">
                                <div className="px-5 pt-5 pb-6">
                                    <div className="mt-6">
                                        <nav className="grid gap-y-8">
                                            {mobileNavItems.map(item => renderMobileNavItem(item, close))}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </>}
        </Popover>
    )
}
