export interface Employee {
    id: number;
    empName: string;
    empActive: boolean;
    department: number;
}

export interface EmployeeRes {
    data: Employee[];
    totalCount: number;
}

