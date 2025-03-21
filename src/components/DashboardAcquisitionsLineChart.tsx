


import { LineChart } from '@mui/x-charts/LineChart';


type Props = {
    loans: any[]
}



export default function DashboardAcquisitionsLineChart({ loans }: Props) {



    //______________________________________________________________________________
    // This is our function that dynamically calculates the values based on the array we pass in
    const calculateCumulativeAverages = () => {
        const yearlyData: any = {};

        // Group data by year into a new array called yearlyData
        loans.forEach((item: any) => {
            const year = new Date(item.note_date).getFullYear();
            if (!yearlyData[year]) {
                yearlyData[year] = [];
            }
            yearlyData[year].push(item.appraisal);
        });


        // Hard coded array with every year inside of it and ROI of 0
        let allYears = [{ year: 2004, amount: 0 }, { year: 2005, amount: 0 }, { year: 2006, amount: 0 }, { year: 2007, amount: 0 }, { year: 2008, amount: 0 }, { year: 2009, amount: 0 }, { year: 2010, amount: 0 }, { year: 2011, amount: 0 }, { year: 2012, amount: 0 }, { year: 2013, amount: 0 }, { year: 2014, amount: 0 }, { year: 2015, amount: 0 }, { year: 2016, amount: 0 }, { year: 2017, amount: 0 }, { year: 2018, amount: 0 }, { year: 2019, amount: 0 }, { year: 2020, amount: 0 }, { year: 2021, amount: 0 }, { year: 2022, amount: 0 }, { year: 2023, amount: 0 }, { year: 2024, amount: 0 }, { year: 2025, amount: 0 }]

        // Defining our initial const values that we need
        let appraisalArrayAllYears = []       // this will be our final output array that we add the object values into
        let sumOfAppraisalsToDateValue = 0;

        //Looping through our array with every year, checking the yearlyData array to see if year exist, if not we append the constant value
        for (const item of allYears) {

            if (typeof yearlyData[item.year] !== 'undefined') {
                // Update our to date appraisal sum
                let arrayOfInterest = yearlyData[item.year]
                let sum = 0;
                for (let i = 0; i < arrayOfInterest.length; i++) {
                    sum += arrayOfInterest[i]

                    sumOfAppraisalsToDateValue += arrayOfInterest[i]
                }

                // Then push the updated sum of Appraisals to our final array
                appraisalArrayAllYears.push({ year: item.year, amount: sumOfAppraisalsToDateValue })
            }
            else {
                // push the sumOfAppraisalsToDateValue since the year doesn't exists   {year: item.year, amount: sumOfAppraisalsToDateValue}
                appraisalArrayAllYears.push({ year: item.year, amount: sumOfAppraisalsToDateValue })
            }
        }

        return (appraisalArrayAllYears)

    };

    // This is the dataset array that we are actually using for the charts, it is the return of our above function
    let loanDataSetToDisplay = calculateCumulativeAverages();


    //________________________________________________________________________________




    return (
        <LineChart
            dataset={loanDataSetToDisplay}
            xAxis={[
                {
                    id: 'Years',
                    dataKey: 'year',
                    scaleType: 'point',
                },
            ]}
            series={[
                {
                    id: 'Assets',
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