import React, { useEffect, useState } from 'react'
import { CTableBody, CTableHead, CTableHeaderCell, CTable, CTableRow, CTableDataCell, CCard } from '@coreui/react'
const DataLed = () => {
  const [leds, setLeds] = useState([])
  useEffect(() => {
    fetch(`http://localhost:3001/led`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
      .then((response) => response.json())
      .then((data) =>{setLeds(data)})
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
              <CTableHeaderCell scope="col">Time </CTableHeaderCell>
              <CTableHeaderCell scope="col">Date Update</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {leds.map((led, index) => (
              <CTableRow key={led.id}>
                <CTableHeaderCell scope="row" >{index}</CTableHeaderCell>
                <CTableDataCell>{led.name}</CTableDataCell>
                <CTableDataCell>{String(led.time_update).split(" ")[0]}</CTableDataCell>
                <CTableDataCell>{String(led.time_update).split(" ")[1]}</CTableDataCell>
                <CTableDataCell>{led.status}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>

    </>
  )
}

export default DataLed
