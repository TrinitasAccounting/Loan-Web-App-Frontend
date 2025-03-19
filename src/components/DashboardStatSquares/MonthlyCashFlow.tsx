

type Props = {
    totalMonthlyCashFlowValue: number
}



export default function MonthlyCashFlow({ totalMonthlyCashFlowValue }: Props) {
    return (
        <div>

            <dl className="w-full h-full ">
                <div className=" sm:p-8">
                    <dt className="truncate text-sm font-medium text-gray-500">Monthly Cash Flow</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">$ {totalMonthlyCashFlowValue}</dd>
                </div>
            </dl>
        </div>
    )
}