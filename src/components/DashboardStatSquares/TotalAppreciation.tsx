
type Props = {
    totalAppreciatedValue: number
}

export default function TotalAppreciation({ totalAppreciatedValue }: Props) {
    return (
        <div>

            <dl className="w-full h-full ">
                <div className=" sm:p-8">
                    <dt className="truncate text-sm font-medium text-gray-500">Total Appreciation</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">$ {totalAppreciatedValue}</dd>
                </div>
            </dl>
        </div>
    )
}