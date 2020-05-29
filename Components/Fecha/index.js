import React, { useContext, useState, useEffect } from 'react';
import { fechaContext } from '../../Context/index'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import es from 'date-fns/locale/es';
import Grafico from '../Grafico/index'


const Fecha = () => {

    const { startDate, setStartDate, endDate, setEndDate } = useContext(fechaContext)

    const [resultados, actualizarResultados] = useState({
        promedio: 0,
        minimo: 0,
        maximo: 0
    })

    const [ejeXY, setEjes] = useState()

    useEffect(() => {
        const consultarAPI = async () => {
            const fechaInicial = moment(startDate).format("YYYY/MM")
            const diaInicial = moment(startDate).format("DD")
            const fechaFinal = moment(endDate).format("YYYY/MM")
            const diaFinal = moment(endDate).format("DD")
            const key = "9c84db4d447c80c74961a72245371245cb7ac15f";
            const url = `https://api.sbif.cl/api-sbifv3/recursos_api/dolar/periodo/${fechaInicial}/dias_i/${diaInicial}/${fechaFinal}/dias_f/${diaFinal}?apikey=${key}&formato=json`

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()


            const valores = resultado.Dolares.map(element => element.Valor)
            const len = valores.length
            const prom = valores.reduce(function (a, b) { return parseInt(a) + parseInt(b) })
            const minim = valores.reduce(function (a, b) { return Math.min(parseFloat(a), parseFloat(b)) })
            const maxim = valores.reduce(function (a, b) { return Math.max(parseFloat(a), parseFloat(b)) })
            
            const ejes = resultado.Dolares.map(element => {return {x: element.Fecha, y: parseInt(element.Valor)}})

            actualizarResultados({
                promedio: prom / len,
                minimo: minim,
                maximo: maxim
            })

            setEjes(ejes)

           
        }

        consultarAPI()
    }, [startDate, endDate, setEjes])

    return (
        <div className="content">
            <div className="calendar">
            <label>Fecha Inicial:</label>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    locale={es}
                    selected={startDate}
                    placeholderText="Selecciona una Fecha"
                    maxDate={startDate === null ? new Date() : endDate}
                    onChange={date => setStartDate(date)}
                />
            </div>
            <div className="calendar-2">
                <label>Fecha Final:</label>
                <DatePicker
                    dateFormat="dd/MM/yyyy"
                    locale={es}
                    placeholderText="Selecciona una Fecha"
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    startDate={startDate}
                    maxDate={new Date()}
                    minDate={startDate}
                />
            </div>
            <div className="results">
            <p>Promedio: $ {Math.round(resultados.promedio)}</p>
            <p>Mínimo: $ {resultados.minimo}</p>
            <p>Máximo: $ {resultados.maximo}</p>
            </div>
         
            <div className="grafico">
            <Grafico data={ejeXY} minimo={resultados.minimo} maximo={resultados.maximo}/>
            </div>
        </div>

    )
}

export default Fecha;