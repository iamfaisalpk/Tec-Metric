export interface Device {
    _id: string;
    deviceName: string;
    attendanceDevice: string;
    deviceIP: string;
    registrationDevice: string;
    serialNo: string;
    requestMethod: string;
    timeZone: string;
    transferMode: string;
    state?: string;
    city?: string;
    createdAt: string;
    updatedAt?: string;
    createdBy: string;
}

export interface DeviceFormData {
    deviceName: string;
    attendanceDevice: string;
    deviceIP: string;
    registrationDevice: string;
    serialNo: string;
    requestMethod: string;
    timeZone: string;
    transferMode: string;
}

export interface DeviceFilters {
    // Add filters if needed, e.g., state, city
    state: string | null;
    city: string | null;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
}

export interface DeviceState {
    devices: Device[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    filters: DeviceFilters;
    search: string;
    selected: Device | null;
}
