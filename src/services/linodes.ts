import Axios, { AxiosPromise } from 'axios';
import { omit } from 'ramda';
import { API_ROOT } from 'src/constants';


/* tslint:disable-next-line */
export type RescueRequestObject = Pick<Linode.Devices, 'sda' | 'sdb' | 'sdc' | 'sdd' | 'sde' | 'sdf' | 'sdg'>

export const rescueLinode = (linodeId: number, devices: RescueRequestObject): Promise<{}> =>
  Axios.post(
    `${API_ROOT}/linode/instances/${linodeId}/rescue`,
    { devices: omit(['sdh'], devices) },
  );

type GetLinodeType = Promise<Linode.ResourcePage<Linode.Config>>;
export const getLinodeConfigs = (id: number): GetLinodeType =>
  Axios.get(`${API_ROOT}/linode/instances/${id}/configs`)
    .then(response => response.data);

type GetLinodeVolumesType = Promise<Linode.ResourcePage<Linode.Volume>>;
export const getLinodeVolumes = (id: number): GetLinodeVolumesType =>
  Axios.get(`${API_ROOT}/linode/instances/${id}/volumes`)
    .then(response => response.data);

type GetLinodeDisksType = Promise<Linode.ResourcePage<Linode.Disk>>;
export const getLinodeDisks = (id: number): GetLinodeDisksType =>
  Axios.get(`${API_ROOT}/linode/instances/${id}/disks`)
    .then(response => response.data);

type GetLinodeBackupsType = Promise<Linode.ResourcePage<Linode.LinodeBackup>>;
export const getLinodeBackups = (id: number): GetLinodeBackupsType =>
  Axios.get(`${API_ROOT}/linode/instances/${id}/backups`)
    .then(response => response.data);

export const enableBackups = (id: number): AxiosPromise =>
  Axios.post(`${API_ROOT}/linode/instances/${id}/backups/enable`);

export const cancelBackups = (id: number): AxiosPromise =>
  Axios.post(`${API_ROOT}/linode/instances/${id}/backups/cancel`);

export const takeSnapshot = (id: number, label: string): AxiosPromise =>
  Axios.post(`${API_ROOT}/linode/instances/${id}/backups`, { label });

export const updateBackupsWindow = (id: number, day: string, window: string): AxiosPromise =>
  Axios.put(`${API_ROOT}/linode/instances/${id}`,
    { backups: { schedule: { day, window } } });

type RebuildLinodeType = Promise<{}>;
export const rebuildLinode = (id: number, image: string, password: string): RebuildLinodeType =>
  Axios.post(`${API_ROOT}/linode/instances/${id}/rebuild`, { image, root_pass: password })
    .then(response => response.data);

export const resizeLinode = (id: number, type: string): Promise<{}> => Axios
  .post(`${API_ROOT}/linode/instances/${id}/resize`, { type });

type GetLinodesPage = Promise<Linode.ResourcePage<Linode.Linode>>;
export const getLinodesPage = (page: number): GetLinodesPage =>
  Axios.get(`${API_ROOT}/linode/instances/?page=${page}`)
    .then(response => response.data);
