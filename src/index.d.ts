declare interface Window {
    _APP_STORE_: any;
}

type User = {
    alias: string;
    id: number;
    email: string;
}

type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue';

type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    dueDate: string;
    recurring: false | string;
    createdBy: User;
    assignedTo: User;
}

type TaskDTO = Omit<Task, "assignedTo"> & {
    assignedTo: string;
}

type TaskGroup = {
    [key: string]: Task[];
}

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastState = {
    message: string;
    type: ToastType;
    visible: boolean;
};
