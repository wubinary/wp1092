import Station from './models/station'

const alldata = [
  {
    station_id: 'R1',
    station_name: '象山',
    station_type: 'R',
    station_order: 1,
    address: '臺北市文山區新光路2段32號',
    service_counter: '近出口1、2',
    enable_bicycle: '不開放',
    distance_to_next: 3
  },
  {
    station_id: 'R2',
    station_name: '101/世貿中心',
    station_type: 'R',
    station_order: 2,
    address: '臺北市信義區信義路5段20號B1',
    service_counter: '近出口3、4、5',
    enable_bicycle: '開放',
    distance_to_next: 5
  },
  {
    station_id: 'R3',
    station_name: '信義安和',
    station_type: 'R',
    station_order: 3,
    address: '臺北市大安區信義路4段212之1號B1',
    service_counter: '近出口3、4、5',
    enable_bicycle: '開放',
    distance_to_next: 1
  },
  {
    station_id: 'R4',
    station_name: '大安',
    station_type: 'R',
    station_order: 4,
    address: '臺北市大安區信義路3段180號B1',
    service_counter: '近出口1、2、3，近出口4',
    enable_bicycle: '不開放',
    distance_to_next: 7
  },
  {
    station_id: 'R5',
    station_name: '大安森林公園',
    station_type: 'R',
    station_order: 5,
    address: '臺北市大安區信義路3段100號B1',
    service_counter: '近出口4、5、6',
    enable_bicycle: '開放',
    distance_to_next: 4
  },
  {
    station_id: 'R6',
    station_name: '東門',
    station_type: 'R',
    station_order: 6,
    address: '臺北市大安區信義路2段166號B1',
    service_counter: '近出口4、5、6、7、8',
    enable_bicycle: '開放',
    distance_to_next: 5
  },
  {
    station_id: 'R7',
    station_name: '中正紀念堂',
    station_type: 'R',
    station_order: 7,
    address: '臺北市中正區羅斯福路1段8之1號B1',
    service_counter: '近出口2、3、4，近出口5、6、7',
    enable_bicycle: '開放',
    distance_to_next: 3
  },
  {
    station_id: 'R8',
    station_name: '台大醫院',
    station_type: 'R',
    station_order: 8,
    address: '臺北市中正區公園路52號B1',
    service_counter: '近出口3、4',
    enable_bicycle: '開放',
    distance_to_next: 6
  },
  {
    station_id: 'R9',
    station_name: '台北車站',
    station_type: 'R',
    station_order: 9,
    address: '臺北市中正區忠孝西路1段49號',
    service_counter: '近出口M3、M7、M8，近忠孝西路，近出口M4、M5、M6，近忠孝西路，近出口M1、M2，近市民大道',
    enable_bicycle: '不開放',
    distance_to_next: 6
  },
  {
    station_id: 'R10',
    station_name: '中山',
    station_type: 'R',
    station_order: 10,
    address: '臺北市大同區南京西路16號',
    service_counter: '近出口1、4，近出口5、6',
    enable_bicycle: '不開放',
    distance_to_next: -1
  },
  {
    station_id: 'G1',
    station_name: '新店',
    station_type: 'G',
    station_order: 1,
    address: '新北市新店區北宜路1段2號',
    service_counter: '近出口',
    enable_bicycle: '開放',
    distance_to_next: 3
  },
  {
    station_id: 'G2',
    station_name: '新店區公所',
    station_type: 'G',
    station_order: 2,
    address: '新北市新店區北新路1段295號',
    service_counter: '近出口1',
    enable_bicycle: '開放',
    distance_to_next: 7
  },
  {
    station_id: 'G3',
    station_name: '七張',
    station_type: 'G',
    station_order: 3,
    address: '新北市新店區北新路2段150號',
    service_counter: '近出口1',
    enable_bicycle: '開放',
    distance_to_next: 4
  },
  {
    station_id: 'G4',
    station_name: '大坪林',
    station_type: 'G',
    station_order: 4,
    address: '新北市新店區北新路3段190號',
    service_counter: '近出口1',
    enable_bicycle: '開放',
    distance_to_next: 4
  },
  {
    station_id: 'G5',
    station_name: '景美',
    station_type: 'G',
    station_order: 5,
    address: '臺北市文山區羅斯福路6段216號',
    service_counter: '近出口1',
    enable_bicycle: '開放',
    distance_to_next: 1
  },
  {
    station_id: 'G6',
    station_name: '萬隆',
    station_type: 'G',
    station_order: 6,
    address: '臺北市文山區羅斯福路5段214號',
    service_counter: '近出口3',
    enable_bicycle: '開放',
    distance_to_next: 5
  },
  {
    station_id: 'G7',
    station_name: '公館',
    station_type: 'G',
    station_order: 7,
    address: '臺北市中正區羅斯福路4段64之1號B1',
    service_counter: '近出口1、2',
    enable_bicycle: '開放',
    distance_to_next: 6
  },
  {
    station_id: 'G8',
    station_name: '台電大樓',
    station_type: 'G',
    station_order: 8,
    address: '臺北市中正區羅斯福路3段126之5號B1',
    service_counter: '近出口3',
    enable_bicycle: '開放',
    distance_to_next: 9
  },
  {
    station_id: 'G9',
    station_name: '古亭',
    station_type: 'G',
    station_order: 9,
    address: '臺北市中正區羅斯福路2段164之1號B1',
    service_counter: '近出口1、2、3、4，近出口5、6、7、8、9',
    enable_bicycle: '開放',
    distance_to_next: 2
  },
  {
    station_id: 'G10',
    station_name: '中正紀念堂',
    station_type: 'G',
    station_order: 10,
    address: '臺北市中正區羅斯福路1段8之1號B1',
    service_counter: '近出口2、3、4，近出口5、6、7',
    enable_bicycle: '開放',
    distance_to_next: 5
  },
  {
    station_id: 'G11',
    station_name: '小南門',
    station_type: 'G',
    station_order: 11,
    address: '臺北市中正區愛國西路22號B1',
    service_counter: '近出口3、4',
    enable_bicycle: '開放',
    distance_to_next: -1
  }
]

const dataInit = async () => {
  const checkData = await Station.find()
  if (checkData.length !== 21) {
    await Station.remove({})
    await Station.insertMany(alldata)
  }
}

export { dataInit }
