import React, { useEffect, useRef, useState } from 'react'

import { CCard, CCardBody, CCol, CRow, } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import HOST_URL from '../../global'

const LiveChar = () => {
    const data_humidity = useRef([]);
    const data_temperature = useRef([]);
    const data_light = useRef([]);
    const data_ran = useRef([]);
    const timeline = useRef(["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function () {
                setTime(prevState => prevState + 1)
                const data = JSON.parse(this.responseText)[0]
                // console.log(data)
                try{
                    data_humidity.current.push(data.humidity);
                    data_temperature.current.push(data.temperature);
                    data_light.current.push(data.light);
                    data_ran.current.push(data.ran);
    
                    document.getElementById("light_live").innerHTML = `${parseInt(data.light)} LUX`;
                    document.getElementById("hum_live").innerHTML = `${data.humidity} %`;
                    document.getElementById("temp_live").innerHTML = `${parseFloat(data.temperature).toFixed(2)} °C`;
                    document.getElementById("ran_live").innerHTML = `${data.ran} ml`;
                    
                }catch(err){

                }

            }
            xhttp.open("GET", `${HOST_URL}/live`, true);
            xhttp.send();

        }, 3000);
        return () => clearInterval(interval)
    }, [time])

    useEffect(() => {
        const date = new Date();
        if (time < 20) {
            timeline.current.splice(time, 1, date.toTimeString().split(' ')[0]);
        } else {
            timeline.current.push(date.toTimeString().split(' ')[0]);
            data_humidity.current.shift();
            data_temperature.current.shift();
            data_light.current.shift();
            data_ran.current.shift();
            timeline.current.shift();
        }
    }, [time])
    return (
        <>
            <CCard className="mb-4" style={{ height: '90%' }}>
                <CRow>
                    <CCol sm={6}>
                        <CCardBody >
                            <CRow>
                                <CCol sm={5}>
                                    <h4 id="traffic" className="card-title mb-0">
                                        Độ ẩm
                                    </h4>
                                    <p className="small text-medium-emphasis" id="datalive"></p>
                                </CCol>
                                <CCol sm={7} className="d-none d-md-block">
                                </CCol>
                            </CRow>
                            <CChartLine
                                style={{ height: '300px', marginTop: '40px' }}
                                data={{
                                    labels: timeline.current,
                                    datasets: [
                                        {
                                            label: 'Độ ẩm',
                                            backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                                            borderColor: getStyle('--cui-info'),
                                            pointHoverBackgroundColor: getStyle('--cui-info'),
                                            borderWidth: 2,
                                            data: data_humidity.current,
                                            fill: true,
                                        }
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    animation: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                drawOnChartArea: false,
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                beginAtZero: true,
                                                maxTicksLimit: 5,
                                                stepSize: Math.ceil(250 / 5),
                                                max: 250,
                                            },
                                        },
                                    },
                                    elements: {

                                        line: {
                                            tension: 0.8,
                                        },
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                            hoverBorderWidth: 3,
                                        },
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCol>
                    <CCol sm={6}>
                        <CCardBody >
                            <CRow>
                                <CCol sm={5}>
                                    <h4 id="traffic" className="card-title mb-0">
                                        Nhiệt độ
                                    </h4>
                                    <p className="small text-medium-emphasis" id="datalive"></p>
                                </CCol>
                                <CCol sm={7} className="d-none d-md-block">
                                </CCol>
                            </CRow>
                            <CChartLine
                                style={{ height: '300px', marginTop: '40px' }}
                                data={{
                                    labels: timeline.current,
                                    datasets: [
                               
                                        {
                                            label: 'Nhiệt độ',
                                            backgroundColor: 'transparent',
                                            borderColor: getStyle('--cui-success'),
                                            pointHoverBackgroundColor: getStyle('--cui-success'),
                                            borderWidth: 2,
                                            data: data_temperature.current,
                                        }
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    animation: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                drawOnChartArea: false,
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                beginAtZero: true,
                                                maxTicksLimit: 5,
                                                stepSize: Math.ceil(250 / 5),
                                                max: 250,
                                            },
                                        },
                                    },
                                    elements: {

                                        line: {
                                            tension: 0.8,
                                        },
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                            hoverBorderWidth: 3,
                                        },
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol sm={6}>
                        <CCardBody >
                            <CRow>
                                <CCol sm={5}>
                                    <h4 id="traffic" className="card-title mb-0">
                                        Ánh sáng
                                    </h4>
                                    <p className="small text-medium-emphasis" id="datalive"></p>
                                </CCol>
                                <CCol sm={7} className="d-none d-md-block">
                                </CCol>
                            </CRow>
                            <CChartLine
                                style={{ height: '300px', marginTop: '40px' }}
                                data={{
                                    labels: timeline.current,
                                    datasets: [
                                        
                                        {
                                            label: 'Ánh sáng',
                                            backgroundColor: 'transparent',
                                            borderColor: getStyle('--cui-warning'),
                                            pointHoverBackgroundColor: getStyle('--cui-warning'),
                                            borderWidth: 1,
                                            borderDash: [8, 5],
                                            data: data_light.current,
                                        },
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    animation: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                drawOnChartArea: false,
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                beginAtZero: true,
                                                maxTicksLimit: 5,
                                                stepSize: Math.ceil(250 / 5),
                                                max: 250,
                                            },
                                        },
                                    },
                                    elements: {

                                        line: {
                                            tension: 0.8,
                                        },
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                            hoverBorderWidth: 3,
                                        },
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCol>
                    <CCol sm={6}>
                        <CCardBody >
                            <CRow>
                                <CCol sm={5}>
                                    <h4 id="traffic" className="card-title mb-0">
                                        Mưa
                                    </h4>
                                    <p className="small text-medium-emphasis" id="datalive"></p>
                                </CCol>
                                <CCol sm={7} className="d-none d-md-block">
                                </CCol>
                            </CRow>
                            <CChartLine
                                style={{ height: '300px', marginTop: '40px' }}
                                data={{
                                    labels: timeline.current,
                                    datasets: [
                                        
                                        {
                                            label: 'Mưa',
                                            backgroundColor: 'transparent',
                                            borderColor: getStyle('--cui-danger'),
                                            pointHoverBackgroundColor: getStyle('--cui-danger'),
                                            borderWidth: 1,
                                            borderDash: [8, 5],
                                            data: data_ran.current,
                                        },
                                    ],
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    animation: false,
                                    plugins: {
                                        legend: {
                                            display: true,
                                        },
                                    },
                                    scales: {
                                        x: {
                                            grid: {
                                                drawOnChartArea: false,
                                            },
                                        },
                                        y: {
                                            ticks: {
                                                beginAtZero: true,
                                                maxTicksLimit: 5,
                                                stepSize: Math.ceil(250 / 5),
                                                max: 250,
                                            },
                                        },
                                    },
                                    elements: {

                                        line: {
                                            tension: 0.8,
                                        },
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                            hoverBorderWidth: 3,
                                        },
                                    },
                                }}
                            />
                        </CCardBody>
                    </CCol>
                </CRow>
            </CCard>
        </>
    )

}

export default LiveChar