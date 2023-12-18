import React, { useEffect, useState } from 'react'

import { CTableBody, CTableHead, CTableHeaderCell, CTable, CTableRow, CTableDataCell, CCard } from '@coreui/react'

const DataSensor = () => {
  const [sensors, setSensors] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3001`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then((response) => response.json())
      .then((data) =>{setSensors(data)})
      .catch((err) => { console.log(err) })
  }, [])
  // console.log(leds)
  return (
    <>
      <CCard>
        <CTable>
          <CTableHead>
            <CTableRow color="dark">
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Humidity </CTableHeaderCell>
              <CTableHeaderCell scope="col">Temperature</CTableHeaderCell>
              <CTableHeaderCell scope="col">Light</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ran</CTableHeaderCell>
              <CTableHeaderCell scope="col">Time update</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {sensors.map((sensor, index) => (
              <CTableRow key={sensor.id}>
                <CTableHeaderCell scope="row" >{index}</CTableHeaderCell>
                <CTableDataCell>{sensor.id_sensor}</CTableDataCell>
                <CTableDataCell>{sensor.humidity}</CTableDataCell>
                <CTableDataCell>{sensor.temperature?parseFloat(sensor.temperature).toFixed(2):""}</CTableDataCell>
                <CTableDataCell>{sensor.light?parseInt(sensor.light):""}</CTableDataCell>
                <CTableDataCell>{sensor.ran?parseInt(sensor.ran):""}</CTableDataCell>
                <CTableDataCell>{sensor.time_update}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>

    </>
  )
}

export default DataSensor