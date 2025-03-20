


import { BarChart } from '@mui/x-charts/BarChart';
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { dataset, valueFormatter } from '../dataset/weather';

type Props = {
    loans: any
}

const dataset = [
    {
        year: 2004,
        CVROI: 59,
        SP: 57,

    },
    {
        year: 2005,
        CVROI: 50,
        SP: 52,

    },
    {
        year: 2006,
        CVROI: 47,
        SP: 51,

    },
    {
        year: 2007,
        CVROI: 56,
        SP: 54,

    },
    {
        year: 2008,
        CVROI: 57,
        SP: 69,

    },

];

const chartSetting = {
    yAxis: [
        {
            label: 'Annual ROI (%)',
        },
    ],
    // width: 500,
    // height: 300,
    // sx: {
    //     [`.${axisClasses.left} .${axisClasses.label}`]: {
    //         transform: 'translate(-20px, 0)',
    //     },
    // },
};

export default function DashboardROIBarChart({ loans }: Props) {


    const calculateCumulativeAverages = () => {
        const yearlyData: any = {};

        // Group data by year into a new array called yearlyData
        loans.forEach((item: any) => {
            const year = new Date(item.note_date).getFullYear();
            if (!yearlyData[year]) {
                yearlyData[year] = [];
            }
            yearlyData[year].push(item.interest);
        });


        // Hard coded array with every year inside of it and ROI of 0
        let allYears = [{ year: 2004, ROI: 0 }, { year: 2005, ROI: 0 }, { year: 2006, ROI: 0 }, { year: 2007, ROI: 0 }, { year: 2008, ROI: 0 }, { year: 2009, ROI: 0 }, { year: 2010, ROI: 0 }, { year: 2011, ROI: 0 }, { year: 2012, ROI: 0 }, { year: 2013, ROI: 0 }, { year: 2014, ROI: 0 }, { year: 2015, ROI: 0 }, { year: 2016, ROI: 0 }, { year: 2017, ROI: 0 }, { year: 2018, ROI: 0 }, { year: 2019, ROI: 0 }, { year: 2020, ROI: 0 }, { year: 2021, ROI: 0 }, { year: 2022, ROI: 0 }, { year: 2023, ROI: 0 },]

        // Defining our initial const values that we need
        let ROIArrayAllYears = []       // this will be our final output array that we add the object values into
        let ROIToDateValue = 0;
        let sumOfROIToDateValue = 0;
        let countOfROIToDateValue = 0;
        //Looping through our array with every year, checking the yearlyData array to see if year exist, if not we append the constant value
        for (const item of allYears) {

            if (typeof yearlyData[item.year] !== 'undefined') {
                // Update our to date average calculation (sum the item array / length of item array)
                let arrayOfInterest = yearlyData[item.year]
                let length = arrayOfInterest.length
                let sum = 0;
                for (let i = 0; i < arrayOfInterest.length; i++) {
                    sum += arrayOfInterest[i]
                    countOfROIToDateValue++
                    sumOfROIToDateValue += arrayOfInterest[i]
                }
                let averageToAdd = sum / length
                ROIToDateValue = sumOfROIToDateValue / countOfROIToDateValue

                //ROI TO DATE will just be a running sum correct, and then divide by the count
                // Then push the updated ROI average to testArray
                ROIArrayAllYears.push({ year: item.year, ROI: ROIToDateValue })
            }
            else {
                // push the ROIToDateValue since the year doesn't exists   {year: item.year, ROI: ROIToDateValue}
                ROIArrayAllYears.push({ year: item.year, ROI: ROIToDateValue })
            }
        }

        return (ROIArrayAllYears)

    };

    let loanDataSetToDisplay = calculateCumulativeAverages();
    // console.log(loanDataSetToDisplay)


    return (
        <BarChart
            dataset={loanDataSetToDisplay}
            xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
            series={[
                { dataKey: 'ROI', label: 'ROI', },
                // { dataKey: 'SP', label: 'S&P ROI', },

            ]}
            {...chartSetting}
        />
    );
}
