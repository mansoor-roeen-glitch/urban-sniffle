import React, {useEffect, useState} from 'react'
import Chart from './Chart'
import styled from 'styled-components'

export default function Charts ({serviceStatus}) {
    
    // Component Variables
    let serviceStatusResponse = serviceStatus?.body

    // React Hooks
    const [isServieStatus, setIsServiceStatus] = useState( serviceStatus?.success )
    const [chartsList, setChartsList] = useState([])

    // Update Charts function
    const updateCharts = () => {


        const pieChartData = [

            {
                renderUnit: "gb",
                heading: "Bandwith Usage",
                total: serviceStatusResponse.bandwidth_max,
                usage: serviceStatusResponse.bandwidth_used,
            },

            {
                renderUnit: "gb",
                heading: "Storage Usage",
                total: serviceStatusResponse.disk_max,
                usage: serviceStatusResponse.disk_used,
            }, 

            {
                renderUnit: "gb",
                heading: "Memeory Usage",
                total: serviceStatusResponse.mem_max,
                usage: serviceStatusResponse.mem_used,
            }

        ]

        setChartsList( pieChartData )

    }

    // Initial Function 
    useEffect(() => {

        if ( serviceStatus?.success ) {
            
            setIsServiceStatus(true)
            updateCharts()

        }

    }, [serviceStatus])
 
    return (

        <ChartsWrapper>
            
            { chartsList.map((chart, index) => {
                
                return (
                    
                    <Chart 
                    
                        key={index} 
                        usage={chart.usage} 
                        heading={chart.heading} 
                        total={chart.total} 
                        unit={chart.renderUnit}
                    
                    />

                )

            })}
            
        </ChartsWrapper>

    )

}

const ChartsWrapper = styled.div `

    width: 100%;
    column-gap: 40px;
    
    display: grid;
    height: fit-content;

    grid-template-rows: auto;
    grid-template-columns: repeat(3, 1fr);

`;