const user = {
    alias: "John Doe",
    email: "john@doe.com"
} as User;

const tasks: Task[] = [
    // Tasks for today
    {
        id: "1",
        title: "Finish report",
        description: "Complete the quarterly report for the finance department",
        status: "Pending",
        dueDate: new Date().toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "2",
        title: "Meeting with client",
        description: "Discuss project updates with the client",
        status: "In Progress",
        dueDate: new Date().toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    // Tasks for this week
    {
        id: "3",
        title: "Prepare presentation",
        description: "Create slides for the team meeting on Friday",
        status: "Pending",
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "4",
        title: "Review project proposal",
        description: "Provide feedback on the latest project proposal",
        status: "Pending",
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "5",
        title: "Monthly review",
        description: "Conduct monthly performance review with team members",
        status: "Pending",
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: "Monthly",
        createdBy: user,
        assignedTo: user
    },
    {
        id: "6",
        title: "Submit expense report",
        description: "Submit expenses for reimbursement",
        status: "Done",
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    // Tasks for the rest of the month
    {
        id: "7",
        title: "Project kickoff meeting",
        description: "Kick off the new project with the team",
        status: "Pending",
        dueDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "8",
        title: "Monthly report",
        description: "Compile and send out the monthly progress report",
        status: "Pending",
        dueDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: "Monthly",
        createdBy: user,
        assignedTo: user
    },
    {
        id: "9",
        title: "Training session",
        description: "Attend the training session on new software tools",
        status: "Pending",
        dueDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "10",
        title: "Website redesign",
        description: "Discuss initial ideas for website redesign",
        status: "Pending",
        dueDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    // 3 Overdue tasks
    {
        id: "11",
        title: "Follow up on overdue invoice",
        description: "Contact the client regarding the overdue invoice",
        status: "Overdue",
        dueDate: "2024-03-15",
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "12",
        title: "Bug fixing",
        description: "Fix critical bugs reported by QA team",
        status: "Overdue",
        dueDate: "2024-03-18",
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "13",
        title: "Update documentation",
        description: "Update project documentation with latest changes",
        status: "Overdue",
        dueDate: "2024-03-16",
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    // 3 In Progress tasks
    {
        id: "14",
        title: "Code refactoring",
        description: "Refactor the legacy codebase for better performance",
        status: "In Progress",
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "15",
        title: "UI redesign",
        description: "Work on redesigning the user interface",
        status: "In Progress",
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
    {
        id: "16",
        title: "Client demo",
        description: "Prepare for the upcoming client demo",
        status: "In Progress",
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        recurring: false,
        createdBy: user,
        assignedTo: user
    },
];

export function getTasks(): Promise<{ tasks: Task[] } | never> {
    return Promise.resolve({ tasks });
};

export function createTask(task: Task): Promise<void> {
    tasks.push(task);
    return Promise.resolve();
};

export function updateTask(task: Task): Promise<void> {
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
        tasks[index] = task;
    }
    return Promise.resolve();
};

export function deleteTask(id: string): Promise<void> {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
    }
    return Promise.resolve();
};

export function login(): Promise<User> {
    return Promise.resolve(user);
}

export function completeTask(taskId: string): Promise<void> {
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
        tasks[index].status = "Done";
    }
    return Promise.resolve();
}

