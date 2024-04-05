import { writable, get } from 'svelte/store';

let timeout: NodeJS.Timeout | undefined;

export const ToastStore = writable<ToastState>({
    message: '',
    type: 'info',
    visible: false,
});

export function showToast(type: ToastType, message: string) {
    if (timeout) {
        clearTimeout(timeout);
        ToastStore.update((state) => ({
            ...state,
            visible: false,
        }));
    }
    ToastStore.set({
        message,
        type,
        visible: true,
    });
    timeout = setTimeout(() => {
        ToastStore.set({
            message: '',
            type: 'info',
            visible: false,
        });
        timeout = undefined;
    }, 3000);
};
