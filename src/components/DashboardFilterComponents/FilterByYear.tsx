

// import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
// import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
// import { CheckIcon } from '@heroicons/react/20/solid'


// type Props = {
//     allPools: { name: string; }[],
//     selectedPool: any,
//     setSelectedPool: any
// }

// export default function FilterByYear({ allPools, selectedPool, setSelectedPool }: Props) {


//     return (
//         <Listbox value={selectedPool} onChange={setSelectedPool}>
//             <Label className="block ml-3 text-sm/5 font-medium text-gray-900">Filter by Year</Label>
//             <div className="relative mt-1 ml-3">
//                 <ListboxButton className="grid w-full sm:h-10 cursor-default grid-cols-1 rounded-xl py-1.5 pl-3 pr-2 text-left text-gray-900  -outline-offset-1 outline-gray-300 hover:bg-blue-50 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
//                     <span className="col-start-1 row-start-1 truncate pr-6">{selectedPool.name}</span>
//                     <ChevronUpDownIcon
//                         aria-hidden="true"
//                         className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
//                     />
//                 </ListboxButton>

//                 <ListboxOptions
//                     transition
//                     className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
//                 >
//                     {allPools.map((pool, index) => (
//                         <ListboxOption
//                             key={index}
//                             value={pool}
//                             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
//                         >
//                             <span className="block truncate font-normal group-data-[selected]:font-semibold">{pool.name}</span>

//                             <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
//                                 <CheckIcon aria-hidden="true" className="size-5" />
//                             </span>
//                         </ListboxOption>
//                     ))}
//                 </ListboxOptions>
//             </div>
//         </Listbox>
//     )
// }