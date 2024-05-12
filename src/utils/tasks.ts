enum OrderKeys {
    OVERDUE = 'Overdue',
    TODAY = 'Today',
    THIS_WEEK = 'This Week',
    THIS_MONTH = 'This Month',
    LATER = 'Later',
}

type Filter = 'pending' | 'done' | 'all';

export function orderTasks(tasks: Task[], filter?: Filter): TaskGroup {
    return tasks.reduce((acc, task) => {
        if (filter === 'pending' && task.status === 'Completed'
            || filter === 'done' && task.status !== 'Completed') {
            return acc;
        }
        const date = new Date(task.dueDate);
        let key: string;
        const now = new Date();
        if (date.toDateString() === now.toDateString()) {
            key = OrderKeys.TODAY;
        } else if (date < now && task.status !== 'Completed') {
            key = OrderKeys.OVERDUE;
        } else if (date > now && date < new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) {
            key = OrderKeys.THIS_WEEK;
        } else if (date > now && date < new Date(now.getFullYear(), now.getMonth() + 1, 1)) {
            key = OrderKeys.THIS_MONTH;
        } else {
            key = OrderKeys.LATER;
        }
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(task);
        return acc;
    }, {} as TaskGroup);
}
