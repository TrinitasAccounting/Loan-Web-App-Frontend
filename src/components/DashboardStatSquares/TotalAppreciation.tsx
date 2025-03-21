import { BsHouseUpFill } from "react-icons/bs";

type Props = {
    totalAppreciatedValue: number
}

export default function TotalAppreciation({ totalAppreciatedValue }: Props) {
    return (
        <div>
            <dl className="w-full h-full ">
                <div className="grid grid-flow-col grid-rows-3 gap-1">
                    <div className="col-span-2 mt-3  place-content-center justify-items-center">
                        <dt className="  truncate text-md font-medium text-gray-600">ROI from Appreciation</dt>
                    </div>
                    <div className="col-span-2 row-span-2  place-content-center justify-items-center">
                        <dd className=" text-4xl font-semibold tracking-tight text-gray-900">$ {totalAppreciatedValue.toLocaleString('en-US')}</dd>
                    </div>
                    <div className="row-span-3 mt-3 place-content-center justify-items-center">
                        <BsHouseUpFill size={70} />
                    </div>
                </div>
            </dl>
        </div>
    )
}