

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import {
    Bars3Icon,
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import LoanTable from './LoanTable'
import TotalAssets from './DashboardStatSquares/TotalAssets'
import TotalAppreciation from './DashboardStatSquares/TotalAppreciation'
import MonthlyCashFlow from './DashboardStatSquares/MonthlyCashFlow'
import DashboardChart from './DashboardChart'


//Pages for navigation
const navigation = [
    { name: 'Dashboard', href: '#', icon: HomeIcon, current: true },
    { name: 'Team', href: '#', icon: UsersIcon, current: false },
    { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    { name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
]


//Props for Typescript (just placeholder of any currently)
type Props = {
    loans: any
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}





export default function DashboardMainLayout({ loans }: Props) {

    const [sidebarOpen, setSidebarOpen] = useState(false)



    // //Total Assets Calculation
    let totalAssetValue = 0;
    loans.map((loan: any) => {
        totalAssetValue += loan.appraisal
    })

    //Total Appreciation Function
    const totalAppreciationFunction = (loans: any) => {
        let totalOriginalBalance = 0;

        loans.map((loan: any) => {
            totalOriginalBalance += loan.original_balance
        })

        return (
            totalAssetValue - totalOriginalBalance
        )
    }
    let totalAppreciatedValue = totalAppreciationFunction(loans)

    //Monthly Cash Flow Function
    const totalMonthlyCashFlowFunction = (loans: any) => {
        let monthlyCashFlow = 0;

        loans.map((loan: any) => {
            monthlyCashFlow += loan.payment
        })

        return monthlyCashFlow

    }
    let totalMonthlyCashFlowValue = totalMonthlyCashFlowFunction(loans)












    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
            <div>
                {/* Mobile version - Larger section compressed, contains the transitions for the side bar opening and the loop to output */}
                <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 flex">
                        <DialogPanel
                            transition
                            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
                        >
                            <TransitionChild>
                                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                                    <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                    </button>
                                </div>
                            </TransitionChild>


                            {/* Mobile Version - sidebar or dropdown list*/}
                            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                                <div className="flex h-16 shrink-0 items-center">
                                    <img
                                        alt="Your Company"
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                        className="h-8 w-auto"
                                    />
                                </div>
                                <nav className="flex flex-1 flex-col">
                                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" className="-mx-2 space-y-1">
                                                {navigation.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-800 text-white'
                                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                            )}
                                                        >
                                                            <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                            {item.name}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>

                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>


                {/* Desktop Version of our Sidebar________________________*/}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
                        <div className="flex h-16 shrink-0 items-center">
                            <img
                                alt="Your Company"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                className="h-8 w-auto"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? 'bg-gray-800 text-white'
                                                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                    )}
                                                >
                                                    <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                    {item.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li>

                                </li>

                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
                    <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-400 lg:hidden">
                        <span className="sr-only">Open sidebar</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                    <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>

                </div>


                {/* This is where all of our content goes, basically think of this as our App.tsx file now */}
                <main className="py-10 lg:pl-72 bg-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="grid  grid-cols-3 gap-12">
                            <div className='bg-gray-50 col-span-1 h-32 rounded-2xl'>

                                <TotalAssets totalAssetValue={totalAssetValue} />
                            </div>

                            <div className='bg-gray-50 col-span-1 h-32 rounded-2xl'>
                                <TotalAppreciation totalAppreciatedValue={totalAppreciatedValue} />
                            </div>
                            <div className='bg-red-200 col-span-1 h-32 rounded-2xl'>
                                <MonthlyCashFlow totalMonthlyCashFlowValue={totalMonthlyCashFlowValue} />
                            </div>
                            <div className='bg-gray-50 col-span-3 h-72 rounded-2xl'>


                                <DashboardChart loans={loans} />

                            </div>

                            <div className="col-span-3 grid  grid-cols-4 gap-12">
                                <div className='bg-red-300 col-span-1 h-12 rounded-2xl'></div>
                                <div className='bg-red-300 col-span-1 h-12 rounded-2xl'></div>
                                <div className='bg-red-300 col-span-1 h-12 rounded-2xl'></div>
                                <div className='bg-red-300 col-span-1 h-12 rounded-2xl'></div>

                            </div>
                            <div className='bg-gray-50 col-span-3 rounded-2xl'>
                                <h2>All Transactions</h2>
                                <LoanTable loans={loans} />
                            </div>

                        </div>

                        {/* <LoanTable loans={loans} /> */}




                    </div>
                </main>
            </div>
        </>
    )
}