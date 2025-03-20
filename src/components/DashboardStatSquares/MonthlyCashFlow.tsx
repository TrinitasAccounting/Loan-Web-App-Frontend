import { FaHandHoldingDollar } from "react-icons/fa6";


type Props = {
    totalMonthlyCashFlowValue: number
}



export default function MonthlyCashFlow({ totalMonthlyCashFlowValue }: Props) {
    return (
        <div>
            <div className="grid grid-flow-col grid-rows-3 gap-1">
                <div className="col-span-2 mt-3  place-content-center justify-items-center">
                    <dt className="  truncate text-md font-medium text-gray-600">Monthly Cash Flow</dt>
                </div>
                <div className="col-span-2 row-span-2  place-content-center justify-items-center">
                    <dd className=" text-4xl font-semibold tracking-tight text-gray-900">$ {totalMonthlyCashFlowValue.toLocaleString('en-US')}</dd>
                </div>
                <div className="row-span-3 mt-3 place-content-center justify-items-center">
                    <FaHandHoldingDollar size={70} />
                </div>
            </div>
        </div>
    )
}