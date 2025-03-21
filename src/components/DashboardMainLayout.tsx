
//Imports, expand it to see all imports
import { useEffect, useState } from 'react'
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
import FilterByPool from './DashboardFilterComponents/FilterByPool'
import DashboardAcquisitionsLineChart from './DashboardAcquisitionsLineChart'
import DashboardROIBarChart from './DashboardROIBarChart'


//Pages for navigation   (PLACEHOLDER PAGES)
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
    loans: any,
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}





export default function DashboardMainLayout({ loans }: Props) {



    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [filteredLoans, setFilteredLoans] = useState<any>([])
    const [stateInput, setStateInput] = useState("")
    const [balanceInput, setBalanceInput] = useState("")
    const [yearInput, setYearInput] = useState("")

    //Filter the table by STATE: states and functions_________________________________________________________________

    const handleStateChange = (event: any) => {
        setStateInput(event.target.value)
    }

    const filteredLoansWithAllFilters = filteredLoans.filter((loan: any) => {
        return (loan.state.toLowerCase().startsWith(stateInput.toLowerCase()))
    })


    //Filtering the table by BALANCE: states and functions ____________________________________________________________
    const handleBalanceChange = (event: any) => {
        setBalanceInput(event.target.value)
    }

    const filteredLoansWithStateBalance = filteredLoansWithAllFilters.filter((loan: any) => {
        return (loan.original_balance > Number(balanceInput))
    })


    //Filtering the table by NOTE_DATE: states and functions ____________________________________________________________
    const handleYearChange = (event: any) => {
        setYearInput(event.target.value)
    }

    const filteredLoansWithStateBalanceYear = filteredLoansWithStateBalance.filter((loan: any) => {
        return (loan.note_date.startsWith(yearInput))
    })







    // //Total Assets Calculation
    let totalAssetValue = 0;
    const totalAssetFunction = (loans: any) => {
        totalAssetValue = 0;
        loans.map((loan: any) => {
            totalAssetValue += loan.appraisal
        })
    }
    totalAssetFunction(filteredLoansWithStateBalanceYear)

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
    let totalAppreciatedValue = totalAppreciationFunction(filteredLoansWithStateBalanceYear)

    //Monthly Cash Flow Function
    const totalMonthlyCashFlowFunction = (loans: any) => {
        let monthlyCashFlow = 0;

        loans.map((loan: any) => {
            monthlyCashFlow += loan.payment
        })

        return monthlyCashFlow

    }
    let totalMonthlyCashFlowValue = totalMonthlyCashFlowFunction(filteredLoansWithStateBalanceYear)





    //Filtering the table by POOL: states and functions__________________________________________________
    //// looping through our loans array to get all of the pool names in the database
    const allPools: { name: string; }[] = [
        { name: 'All' }
    ]
    //// Loops through the database and extracts every Pool name, adding it to our allPools array of objects. 
    const getAllPoolNames = (loans: any) => {
        for (let i = 0; i < loans.length; i++) {
            const foundName = allPools.find(obj => obj.name === loans[i].pool)
            if (!foundName) {
                allPools.push({ name: loans[i].pool })
            }
        }
    }
    ////Runnign the function to add all PoolNames to our array  (Optimization: probably can use a useEffect here to run this only once, but it works just fine for now. )
    getAllPoolNames(loans)

    ////the state for our filter by pool dropdown (has to be assigend here so we can use the first index of the allPools array as the initial state value)
    const [selectedPool, setSelectedPool] = useState(allPools[0])

    ////Filtering Loans array by the selectedPool anytime the selectedPool state is changed
    useEffect(() => {
        // if (stateInput.length > 0) {
        //     setFilteredLoans([...loans])
        //     setSelectedPool(allPools[0])
        // }
        if (selectedPool.name === 'All') {
            // const newLoanData = [...loans]
            setFilteredLoans([...loans])
            // setNewFilteredLoans([...loans])
        }
        else {
            const newLoanData = loans.filter((loan: any) => {
                return (loan.pool === selectedPool.name)
            })
            setFilteredLoans([...newLoanData])
            // setNewFilteredLoans([...newLoanData])
            // console.log([...newLoanData])
        }
    }, [loans, selectedPool])







    return (
        <>

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
                        <div className="grid  grid-cols-3 gap-6">

                            {/* PORTFOLIO ASSETS BOX */}
                            <div className='bg-gray-50 col-span-1 h-32 rounded-2xl'>
                                <TotalAssets totalAssetValue={totalAssetValue} />
                            </div>

                            {/* ROI FROM APPRECIATION BOX */}
                            <div className='bg-gray-50 col-span-1 h-32 rounded-2xl'>
                                <TotalAppreciation totalAppreciatedValue={totalAppreciatedValue} />
                            </div>

                            {/* MONTHLY CASH FLOW BOX */}
                            <div className='bg-gray-50 col-span-1 h-32 rounded-2xl'>
                                <MonthlyCashFlow totalMonthlyCashFlowValue={totalMonthlyCashFlowValue} />
                            </div>

                            {/* TOTAL ASSETS IN PORTFOLIO LINE CHART */}
                            <div className='bg-gray-50 col-span-3 h-64 rounded-2xl pl-2'>
                                <h1 className='text-center text-gray-600 font-bold'>Total Assets in Portfolio by Year</h1>
                                <DashboardAcquisitionsLineChart loans={filteredLoansWithStateBalanceYear} />
                            </div>

                            {/* CUMULATIVE ROI % BAR CHART */}
                            <div className='bg-gray-50 col-span-3 h-64 rounded-2xl pl-2'>
                                <h1 className='text-center text-gray-600 font-bold'>Cumulative ROI (%) by Year</h1>
                                <DashboardROIBarChart loans={filteredLoansWithStateBalanceYear} />
                            </div>


                            {/* LOANS TABLE SECTION */}
                            <div className='bg-gray-50 col-span-3 rounded-2xl'>

                                {/* TABLE HEADER */}
                                <div className=' grid grid-cols-6'>

                                    {/* TABLE TITLE */}
                                    <div className='bg-gray-50 col-span-2 px-8 pt-5'>
                                        <h1 className='text-base font-semibold text-gray-900'>Loans</h1>
                                        <p className="mt-2 text-sm text-gray-700">
                                            A table to display all loans inside of our portfolio</p>
                                    </div>

                                    {/* FILTER BY POOL COMPONENT */}
                                    <div className=' border-gray-300 col-span-1 mt-2 mr-2 rounded-xl'>
                                        <FilterByPool allPools={allPools} selectedPool={selectedPool} setSelectedPool={setSelectedPool} />

                                    </div>

                                    {/* FILTER BY STATE */}
                                    <div className=' border-gray-300 col-span-1 mt-2 mr-2 rounded-xl'>
                                        <div>
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                                Search by State
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="state"
                                                    name="state"
                                                    value={stateInput}
                                                    onChange={handleStateChange}
                                                    type="text"
                                                    placeholder="State"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* FILTER BY ORIGINAL BALANCE */}
                                    <div className=' border-gray-300 col-span-1 mt-2 mr-2 rounded-xl'>
                                        <div>
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                                Original Bal. Greater Than
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="balance"
                                                    name="balance"
                                                    value={balanceInput}
                                                    onChange={handleBalanceChange}
                                                    type="number"
                                                    placeholder="Minimum Original Balance"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* FILTER BY YEAR */}
                                    <div className=' border-gray-300 col-span-1 mt-2 mr-2 rounded-xl'>

                                        <div>
                                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">

                                                Filter By Year
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="balance"
                                                    name="balance"
                                                    value={yearInput}
                                                    onChange={handleYearChange}
                                                    type="number"
                                                    placeholder="Year Acquired"
                                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* LOAN TABLE COMPONENT */}
                                <LoanTable loans={filteredLoansWithStateBalanceYear} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}