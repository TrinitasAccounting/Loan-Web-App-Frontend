

type Props = {
    totalAssetValue: number,
}




export default function TotalAssets({ totalAssetValue }: Props) {
    return (
        <div>

            <dl className="w-full h-full ">
                <div className=" sm:p-8">
                    <dt className="truncate text-sm font-medium text-gray-500">Portfolio Asset's</dt>
                    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">$ {totalAssetValue.toLocaleString('en-US')}</dd>
                </div>
            </dl>
        </div>
    )
}