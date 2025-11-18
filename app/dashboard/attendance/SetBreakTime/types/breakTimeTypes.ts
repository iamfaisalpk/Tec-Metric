export interface BreakTime {
    _id: string;
    name: string;
    startTime: string;
    endTime: string;
    duration: string; // auto-calculated
    withSalary: boolean;
    calculationType: 'Auto Deduct' | 'Manual';
    description?: string;
    createdAt: string;
    updatedAt?: string;
    createdBy: string;
}

export interface BreakTimeFormData {
    name: string;
    startTime: string;
    endTime: string;
    duration: string;
    withSalary: boolean;
    calculationType: 'Auto Deduct' | 'Manual';
    description?: string;
}

export interface BreakTimeFilters {
    name: string | null;
    startTime: string | null;
    calculationType: string | null;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
}

export interface BreakTimeState {
    breakTimes: BreakTime[];
    loading: boolean;
    error: string | null;
    pagination: Pagination;
    filters: BreakTimeFilters;
    search: string;
    selected: BreakTime | null;
}
