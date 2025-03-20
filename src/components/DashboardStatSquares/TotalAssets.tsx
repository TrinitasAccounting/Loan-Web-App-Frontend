import { FaChartLine } from "react-icons/fa";


type Props = {
    totalAssetValue: number,
}




export default function TotalAssets({ totalAssetValue }: Props) {
    return (
        <div>
            <div className="grid grid-flow-col grid-rows-3 gap-1">
                <div className="col-span-2 mt-3  place-content-center justify-items-center">
                    <dt className="  truncate text-md font-medium text-gray-600">Portfolio Asset's</dt>
                </div>
                <div className="col-span-2 row-span-2  place-content-center justify-items-center">
                    <dd className=" text-4xl font-semibold tracking-tight text-gray-900">$ {totalAssetValue.toLocaleString('en-US')}</dd>
                </div>
                <div className="row-span-3 mt-3 place-content-center justify-items-center">
                    <FaChartLine size={70} />
                </div>
            </div>
        </div>
    )
}