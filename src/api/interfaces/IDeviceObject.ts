// DeviceObject does not exist in old (current) api doc
export interface IDeviceObject {
  id: string | null;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: DeviceType;
  volume_percent: number | null;
}

enum DeviceType {
  Computer = "computer",
  Smartphone = "smartphone",
  Speaker = "speaker",
}

export interface IDevicesObject {
  devices: IDeviceObject[];
}
