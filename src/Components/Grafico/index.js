import React, { useEffect, useRef, useState } from 'react'
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, VerticalGridLines  } from 'react-vis';



const Grafico = (props) => {
    const elRef = useRef(null)

    const [WSize, setWSize] = useState(0)

    useEffect(() => {
        const isWindow = typeof window !== `undefined` ? window.addEventListener('resize', handleScroll) : null
        const rect = elRef.current.getBoundingClientRect()
        const initialWSize = rect.width -10
        setWSize(initialWSize)
    }, [])

    const handleScroll = () => {
        const rect = elRef.current.getBoundingClientRect();
        let newWSize = Math.round(rect.width - 10)
        setWSize(newWSize)

    }


    return (
        <div ref={elRef} style={{width: '100%', height: '100%'}}>
        <XYPlot
            width={WSize}
            height={300}
            xType="ordinal"
            yType="linear"
            stackBy="x"
            yDomain={[props.minimo-10,props.maximo+10]}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries
            color="#2b9b63d5"
                data={props.data} />
          
        </XYPlot>
        </div>)
}

export default Grafico;