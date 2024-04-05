import { get, post, remove, update } from './utils'
// import * as mock from '../mock'

export async function getTasks(): Promise<{ tasks: Task[] } | never> {
    try {
        return await get('/tasks');
        // return mock.getTasks();
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
    try {
        return await update('/tasks', task);
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
