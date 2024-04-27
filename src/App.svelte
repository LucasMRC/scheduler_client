<script lang="ts">
    import { onMount } from "svelte";
    import Login from "./pages/Login.svelte";
    import Form from "./pages/Form.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import { ToastStore } from "./store/toast";
    import { ModeWatcher } from "mode-watcher";
    import QuickActions from "./lib/components/QuickActions.svelte";
    import Toast from "./lib/components/Toast.svelte";
    import { logout, restoreSession } from "./lib/api";
    import Store from "./store";

    let screen = "login";

    onMount(async () => {
        window._APP_STORE_ = {};
        try {
            const user = await restoreSession();
            Store.saveUser(user);
            window._APP_STORE_.user = user;
            screen = "dashboard";
        } catch (error) {
            console.error(error);
            screen = "login";
        }
    });

    let type = "info" as ToastType;
    let message = "";
    let showToast = false;

    ToastStore.subscribe((value: ToastState) => {
        type = value.type;
        message = value.message;
        showToast = value.visible;
    });

    function handleLogout() {
        logout();
        screen = "login";
    }
</script>

<main>
    <ModeWatcher />
    <QuickActions displayLogout={screen !== "login"} {handleLogout} />
    {#if screen === "login"}
        <Login goToDashboard={() => (screen = "dashboard")} />
    {:else if screen === "dashboard"}
        <Dashboard
            goToLogin={() => (screen = "login")}
            goToForm={() => (screen = "form")}
        />
    {:else if screen === "form"}
        <Form goToDashboard={() => (screen = "dashboard")} />
    {:else}
        <p>Invalid screen</p>
    {/if}
    {#if showToast}
        <Toast {type} {message} />
    {/if}
</main>
