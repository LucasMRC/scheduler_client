import { getUsers } from '../lib/api/users';
import { writable, get, type Writable } from 'svelte/store';
import { showToast } from './toast';
import { updateTask } from '$lib/api';

let StoreInstance: Store;

class Store {
    private user: Writable<User | null>;
    private tasks: Writable<Task[]>;
    private users: Writable<User[]>;

    constructor() {
        this.user = writable<User | null>(null);
        this.tasks = writable<Task[]>([]);
        this.users = writable<User[]>([]);

        if (StoreInstance) {
            return StoreInstance;
        }
        StoreInstance = this;
    }

    public saveUser(newUser: User) {
        this.user.set(newUser);
    };

    public removeUser() {
        this.user.set(null);
    };

    public getUser(): Writable<User | null> {
        return this.user;
    };

    public async setTasks(newTasks: TaskDTO[]) {
        if (!get(this.users).length) {
            await this.fetchUsers();
        }
        const users = get(this.users);
        const tasks = newTasks.map((task) => ({
            ...task,
            dueDate: task.dueDate.split('T')[0],
            assignedTo: users.find((user) => user.alias === task.assignedTo)!,
        }));
        this.tasks.set(tasks);
    };

    public saveTask(newTask: Task) {
        this.tasks.update((currentTasks) => {
            return [...currentTasks, newTask];
        });
    };

    public removeTask(taskId: string) {
        this.tasks.update((currentTasks) => {
            return currentTasks.filter((task) => task.id !== taskId);
        });
    };

    public getTasks(): Writable<Task[]> {
        return this.tasks;
    }

    public async fetchUsers() {
        try {
            const { users } = await getUsers();
            this.users.set(users);
        } catch (error) {
            if (error instanceof Error) {
                showToast("error", error.message);
            } else {
                showToast("error", "Error getting users");
            }
            console.error("Error fetching users", error);
        }
    };

    public getUsers(): User[] {
        return get(this.users);
    }
    
    public updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((currentTasks) => {
            return currentTasks.map((task) => {
                if (task.id === taskId) {
                    const updatedTask = { ...task, status: newStatus } as Task;
                    updateTask(updatedTask).catch((error) => {
                        if (error instanceof Error) {
                            showToast("error", error.message);
                        } else {
                            showToast("error", "Error updating task");
                        }
                        console.error("Error updating task", error);
                    });
                    return updatedTask;
                }
                return task;
            });
        });
    }
};

export default new Store();
export * from './toast'
