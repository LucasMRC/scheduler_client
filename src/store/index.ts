import { getUsers } from '../lib/api/users';
import { orderTasks } from '../utils/tasks';
import { writable, get, type Writable } from 'svelte/store';
import { showToast } from './toast';

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

    public getUser(): User | null {
        return get(this.user);
    };

    public setTasks(newTasks: Task[]) {
        this.tasks.set(newTasks);
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

    public getTasks(): Task[] {
        return get(this.tasks);
    }

    public getOrderedTasks(): TaskGroup {
        return orderTasks(get(this.tasks));
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
};

export default new Store();
export * from './toast'