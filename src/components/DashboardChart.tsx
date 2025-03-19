


import { LineChart } from '@mui/x-charts/LineChart';


type Props = {
    loans: any[]
}

const dataset = [


    { date: new Date(2004, 0, 1), fr: 35093.824, gb: 34865.78, dl: 35528.715 },
    { date: new Date(2005, 0, 1), fr: 35495.465, gb: 35623.625, dl: 36205.574 },
    { date: new Date(2006, 0, 1), fr: 36166.16, gb: 36214.07, dl: 38014.137 },
    { date: new Date(2007, 0, 1), fr: 36845.684, gb: 36816.676, dl: 39752.207 },
    { date: new Date(2008, 0, 1), fr: 36761.793, gb: 36264.79, dl: 40715.434 },
    { date: new Date(2009, 0, 1), fr: 35534.926, gb: 34402.36, dl: 38962.938 },
    { date: new Date(2010, 0, 1), fr: 36086.727, gb: 34754.473, dl: 41109.582 },
    { date: new Date(2011, 0, 1), fr: 36691, gb: 34971, dl: 43189 },
    { date: new Date(2012, 0, 1), fr: 36571, gb: 35185, dl: 43320 },
    { date: new Date(2013, 0, 1), fr: 36632, gb: 35618, dl: 43413 },
    { date: new Date(2014, 0, 1), fr: 36527, gb: 36436, dl: 43922 },
    { date: new Date(2015, 0, 1), fr: 36827, gb: 36941, dl: 44293 },
    { date: new Date(2016, 0, 1), fr: 37124, gb: 37334, dl: 44689 },
    { date: new Date(2017, 0, 1), fr: 37895, gb: 37782.83, dl: 45619.785 },
    { date: new Date(2018, 0, 1), fr: 38515.918, gb: 38058.086, dl: 46177.617 },
];



export default function DashboardChart({ loans }: Props) {



    //Formatting our chart data
    let loanDataSet: any[] = []
    let allYearsData: { year: string, amount: number }[] = []
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




        //Finding the running total of the appraised assets
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

    const result = sumAmountsByYear(loans)
    console.log(result)


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
                    label: 'Asset Acquistion by Year',
                    dataKey: 'amount',
                    stack: 'total',
                    area: true,
                    showMark: false,
                },
                // {
                //     id: 'Germany',
                //     label: 'German GDP per capita',
                //     dataKey: 'dl',
                //     stack: 'total',
                //     area: true,
                //     showMark: false,
                // },
                // {
                //     id: 'United Kingdom',
                //     label: 'UK GDP per capita',
                //     dataKey: 'gb',
                //     stack: 'total',
                //     area: true,
                //     showMark: false,
                // },
            ]}
            // width={900}
            // height={400}
            margin={{ left: 70 }}
        />
    );
}