import { CCard, CCol, CContainer, CImage, CRow } from '@coreui/react'
import React from 'react'

const Profile = () => {
  return (
    <>
      <CContainer>
        <CCard style={{ height: "500px", overflow: "hidden" }}>
          <CImage fluid rounded src="./img\background.jpg" />
        </CCard>
        <CCard style={{
          padding: "50px",
          marginTop: "-200px",
          marginLeft: "100px",
          marginRight: "100px"
        }}>
          <CRow>
            <CCol sm={4}>
              <CImage align="start" rounded src="./img\avatar.png" width={200} height={200} />
            </CCol>
            <CCol sm={8}>
              <h2>Đỗ Việt Long </h2>
              <p>B20DCCN404</p>
            </CCol>
          </CRow>
          <CRow>
            <p>                     </p>
            <p><strong>Class: </strong>D20HTTT03</p>
            <p><strong>Email: </strong>long09092k2@gmail.com</p>
            <p><strong>Phone: </strong>0865266195</p>
          </CRow>
          <CRow>
            <CCol sm={4}>
              <CImage align="start" rounded src="./img\avatar.png" width={200} height={200} />
            </CCol>
            <CCol sm={8}>
              <h2>Vũ Ngọc Hải </h2>
              <p>B20DCCN224</p>
            </CCol>
          </CRow>
          <CRow>
            <p>                     </p>
            <p><strong>Class: </strong>D20CNPM04</p>
            <p><strong>Email: </strong>haivu0352@gmail.com</p>
            <p><strong>Phone: </strong>0114523546</p>
          </CRow>
        </CCard>
        
      </CContainer>

    </>
  )
}

export default Profile