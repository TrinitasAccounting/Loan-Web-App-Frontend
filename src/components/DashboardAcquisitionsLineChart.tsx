


import { LineChart } from '@mui/x-charts/LineChart';


type Props = {
    loans: any[]
}



export default function DashboardAcquisitionsLineChart({ loans }: Props) {



    //Formatting our chart data
    // let loanDataSet: any[] = []

    //Defining our chart data object
    let allYearsData: { year: string, amount: number }[] = []

    //Calculating our chartData from the cummatilive totals of the loans asset appraisals by year
    const sumAmountsByYear = (loans: any) => {

        //loop through and get the sum for each year 
        const yearlyTotals: any = {};
        for (const loan of loans) {
            const year: number = new Date(loan.note_date).getFullYear()
            if (!yearlyTotals[year]) {
                yearlyTotals[year] = 0;
            }
            yearlyTotals[year] += loan.appraisal
        }


        //Finding the running total of the appraised assets then storing it in a new cummulativeYearlyTotals variable
        function updateObjectValues(obj: any) {
            let sum = 0;
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const currentValue = obj[key];
                    obj[key] = sum + obj[key];
                    sum += currentValue;
                }
            }
            return obj;
        }
        const cummulativeYearlyTotals = updateObjectValues(yearlyTotals)

        // allYearsData is every year in consecutive order with the cummulative assets by year
        // then we can loop through the sum of each year array and running a cummulative total by year
        allYearsData = [
            { year: "2004", amount: cummulativeYearlyTotals[2004] },
            { year: "2005", amount: cummulativeYearlyTotals[2006] },
            { year: "2006", amount: cummulativeYearlyTotals[2006] },
            { year: "2007", amount: cummulativeYearlyTotals[2006] },
            { year: "2008", amount: cummulativeYearlyTotals[2006] },
            { year: "2009", amount: cummulativeYearlyTotals[2006] },
            { year: "2010", amount: cummulativeYearlyTotals[2006] },
            { year: "2011", amount: cummulativeYearlyTotals[2006] },
            { year: "2012", amount: cummulativeYearlyTotals[2012] },
            { year: "2013", amount: cummulativeYearlyTotals[2013] },
            { year: "2014", amount: cummulativeYearlyTotals[2014] },
            { year: "2015", amount: cummulativeYearlyTotals[2015] },
            { year: "2016", amount: cummulativeYearlyTotals[2016] },
            { year: "2017", amount: cummulativeYearlyTotals[2016] },
            { year: "2018", amount: cummulativeYearlyTotals[2018] },
            { year: "2019", amount: cummulativeYearlyTotals[2019] },
            { year: "2020", amount: cummulativeYearlyTotals[2020] },
            { year: "2021", amount: cummulativeYearlyTotals[2020] },
            { year: "2022", amount: cummulativeYearlyTotals[2020] },
            { year: "2023", amount: cummulativeYearlyTotals[2020] },
            { year: "2024", amount: cummulativeYearlyTotals[2020] },
            { year: "2025", amount: cummulativeYearlyTotals[2020] },

            // { '2005': cummulativeYearlyTotals[2004] },
            // { '2005': cummulativeYearlyTotals[2004] },
            // { '2006': cummulativeYearlyTotals[2006] },
            // { '2007': cummulativeYearlyTotals[2006] },
            // { '2008': cummulativeYearlyTotals[2006] },
            // '2004': cummulativeYearlyTotals[2004],
            // '2005': cummulativeYearlyTotals[2004],
            // '2006': cummulativeYearlyTotals[2006],
            // '2007': cummulativeYearlyTotals[2006],
            // '2008': cummulativeYearlyTotals[2006],
            // '2009': cummulativeYearlyTotals[2006],
            // '2010': cummulativeYearlyTotals[2006],
            // '2011': cummulativeYearlyTotals[2006],
            // '2012': cummulativeYearlyTotals[2012],
            // '2013': cummulativeYearlyTotals[2013],
            // '2014': cummulativeYearlyTotals[2014],
            // '2015': cummulativeYearlyTotals[2015],
            // '2016': cummulativeYearlyTotals[2016],
            // '2017': cummulativeYearlyTotals[2016],
            // '2018': cummulativeYearlyTotals[2018],
            // '2019': cummulativeYearlyTotals[2019],
            // '2020': cummulativeYearlyTotals[2020],
            // '2021': cummulativeYearlyTotals[2020],
            // '2022': cummulativeYearlyTotals[2020],
            // '2023': cummulativeYearlyTotals[2020],
            // '2024': cummulativeYearlyTotals[2020],
            // '2025': cummulativeYearlyTotals[2020]
        ]

        //Looping through to create a dataset for each year
        // let loanDataSet = []
        // for (const key in allYearsData) {
        //     let myKey: any = key as any
        //     loanDataSet.push({ date: new Date(Number(key), 0, 1), totalAppraisalValue: allYearsData[myKey as typeof allYearsData] })
        // }


        return (allYearsData)

    }

    sumAmountsByYear(loans)



    return (
        <LineChart
            dataset={allYearsData}
            xAxis={[
                {
                    id: 'Years',
                    dataKey: 'year',
                    scaleType: 'point',
                    // valueFormatter: (date) => date.getFullYear().toString(),
                },
            ]}
            series={[
                {
                    id: 'Assets',
                    label: 'Total Acquistions by Year',
                    dataKey: 'amount',
                    stack: 'total',
                    area: true,
                    showMark: false,
                },

            ]}
            // width={900}
            // height={400}
            margin={{ left: 70 }}
        />
    );
}