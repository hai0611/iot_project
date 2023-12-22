import React, { useEffect, useRef, useState, memo } from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions } from '@coreui/icons'
import HOST_URL from '../../global'
const WidgetsDropdown = () => {
  const [data, setData] = useState([]);
  const [hum, setHum] = useState([]);
  const [temp, setTemp] = useState([]);
  const [light, setlight] = useState([]);
  const [ran, setRan] = useState([]);
  const [label, setLabel] = useState([]);
  useEffect(() => {
    fetch(`${HOST_URL}/getday`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => { setData(data); })
      .catch((err) => { console.log(err) })
    return () => { }
  }, [])

  useEffect(() => {
    let hour = new Date();
    const map = new Map();
    for (let i = 0; i < 15; i++) {
      var str_time = hour.toTimeString().split(' ')[0].substring(0, 5);
      map.set(str_time, []);
      hour.setMinutes(hour.getMinutes() - 1);
    }
    const arr_label = new Array();
    const data_hum = new Array();
    const data_temp = new Array();
    const data_light = new Array();
    const data_ran = new Array();

    data.map((item, index) => {
      if (index % 15 === 0) {
        data_hum.push(parseFloat(item.humidity));
        data_temp.push(parseFloat(item.temperature));
        data_light.push(parseFloat(item.light));
        data_ran.push(parseFloat(item.ran));
      }
    });

    for (let [key, value] of map) {
      arr_label.unshift(key);
    }
    setHum(data_hum);
    setLabel(arr_label);
    setTemp(data_temp);
    setlight(data_light);
    setRan(data_ran);

    console.log(data_ran)
  }, [data])
  return (
    <>
      {(<CRow>
        {/* <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="secondary"
            // value={
            //   <>
            //     <p id="light_live"></p>
            //   </>
            // }
            // title="Ánh sáng"
            // chart={
            //   <CChartLine
            //     className="mt-3 mx-3"
            //     style={{ height: '70px' }}
            //     data={{
            //       labels: label,
            //       datasets: [
            //         {
            //           label: 'Ánh sáng',
            //           backgroundColor: 'transparent',
            //           borderColor: 'rgba(255,255,255,.55)',
            //           pointBackgroundColor: getStyle('--cui-secondary'),
            //           data: light,
            //         },
            //       ],
            //     }}
            //     options={{
            //       plugins: {
            //         legend: {
            //           display: false,
            //         },
            //       },
            //       maintainAspectRatio: false,
            //       scales: {
            //         x: {
            //           grid: {
            //             display: false,
            //             drawBorder: false,
            //           },
            //           ticks: {
            //             display: false,
            //           },
            //         },
            //         y: {
            //           display: false,
            //           grid: {
            //             display: false,
            //           },
            //           ticks: {
            //             display: false,
            //           },
            //         },
            //       },
            //       elements: {
            //         line: {
            //           borderWidth: 1,
            //           tension: 0.4,
            //         },
            //         point: {
            //           radius: 4,
            //           hitRadius: 10,
            //           hoverRadius: 4,
            //         },
            //       },
            //     }}
            //   />
            // }
          />
        </CCol> */}
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="info"
            value={
              <>
                <p id="hum_live"></p>
              </>
            }
            title="Độ ẩm"

            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: label,
                  datasets: [
                    {
                      label: 'Độ ẩm',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,255,.55)',
                      pointBackgroundColor: getStyle('--cui-info'),
                      data: hum,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 0,
                      max: 100,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="warning"
            value={
              <>
                <p id="temp_live"></p>
              </>
            }
            title="Nhiệt độ"
            // action={
            //   <CDropdown alignment="end">
            //     <CDropdownToggle color="transparent" caret={false} className="p-0">
            //       <CIcon icon={cilOptions} className="text-high-emphasis-inverse" />
            //     </CDropdownToggle>
            //     <CDropdownMenu>
            //       <CDropdownItem>Action</CDropdownItem>
            //       <CDropdownItem>Another action</CDropdownItem>
            //       <CDropdownItem>Something else here...</CDropdownItem>
            //       <CDropdownItem disabled>Disabled action</CDropdownItem>
            //     </CDropdownMenu>
            //   </CDropdown>
            // }
            chart={
              <CChartLine
                className="mt-3"
                style={{ height: '70px' }}
                data={{
                  labels: label,
                  datasets: [
                    {
                      label: 'Nhiệt độ',
                      backgroundColor: 'rgba(255,255,255,.2)',
                      borderColor: 'rgba(255,255,255,.55)',
                      data: temp,
                      fill: true,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 2,
                      tension: 0.4,
                    },
                    point: {
                      radius: 0,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol>
        {/* <CCol sm={6} lg={3}>
          <CWidgetStatsA
            className="mb-4"
            color="danger"
            // value={
            //   <>
            //     <p id="ran_live"></p>
            //   </>
            // }
            title="Mưa"

            chart={
              <CChartLine
                className="mt-3 mx-3"
                style={{ height: '70px' }}
                data={{
                  labels: label,
                  datasets: [
                    {
                      label: 'Mưa',
                      backgroundColor: 'transparent',
                      borderColor: 'rgba(255,255,254,.55)',
                      pointBackgroundColor: getStyle('--cui-danger'),
                      data: ran,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        drawBorder: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                    y: {
                      min: 0,
                      max: 100,
                      display: false,
                      grid: {
                        display: false,
                      },
                      ticks: {
                        display: false,
                      },
                    },
                  },
                  elements: {
                    line: {
                      borderWidth: 1,
                    },
                    point: {
                      radius: 4,
                      hitRadius: 10,
                      hoverRadius: 4,
                    },
                  },
                }}
              />
            }
          />
        </CCol> */}
      </CRow>)}
    </>

  )
}

export default memo(WidgetsDropdown)
