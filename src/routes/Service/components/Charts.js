import React from 'react'
import Chart from './Chart'
import styled from 'styled-components'

export default function Charts({charts}) {
    
    return (

        <ChartsWrapper>
            
            { charts.map((chart, index) => {
                
                return (
                    
                    <Chart 
                    
                        key={index} 
                        usage={chart.usage} 
                        heading={chart.heading} 
                        total={chart.total} 
                        unit={chart.unit}
                    
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