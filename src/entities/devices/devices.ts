export type ResponseDevicesType = {
  current: DeviceType
  others: DeviceType[]
}

export type DeviceType = {
  browserName: string
  browserVersion: string
  deviceId: number
  deviceName: string
  deviceType: string
  ip: string
  lastActive: string
  osName: string
  osVersion: string
}
