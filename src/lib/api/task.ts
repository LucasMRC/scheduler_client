import { get, post, remove, update } from './utils'
// import * as mock from '../mock'

export async function getTasks(): Promise<{ tasks: TaskDTO[] } | never> {
    try {
        const { tasks } = await get('/tasks');
        return {
            tasks: tasks.map((task: TaskDTO) => ({
                ...task,
                dueDate: task.dueDate.split('T')[0], // format date in an input friendly way
            }))
        };
    } catch (error) {
        throw error;
    }
}

export async function createTask(task: TaskDTO): Promise<void> {
    try {
        return await post('/tasks', task);
        // return mock.createTask(task);
    } catch (error) {
        throw error;
    }
}

export async function updateTask(task: Task): Promise<void> {
    const curatedTask = {
        ...task,
        assignedTo: task.assignedTo.alias,
    } as TaskDTO;
    try {
        return await update<TaskDTO>(`/tasks/${task.id}`, curatedTask);
        // return mock.updateTask(task);
    } catch (error) {
        throw error;
    }
}

export async function deleteTask(task: Task): Promise<void> {
    try {
        return await remove('/tasks/' + task.id);
        // return mock.deleteTask(task.id);
    } catch (error) {
        throw error;
    }
}

export async function completeTask(task: Task): Promise<void> {
    try {
        return await post('/tasks', task);
        // return mock.completeTask(task.id);
    } catch (error) {
        throw error;
    }
}
