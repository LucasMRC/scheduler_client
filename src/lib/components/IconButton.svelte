<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    import { Button } from "./ui/button/index";

    type $$Props = HTMLAttributes<HTMLDivElement>;

    let className: $$Props["class"] = undefined;
    export { className as class };
</script>

<Button
    on:click
    variant="ghost"
    size="icon"
    class={`${className} hover:bg-transparent transition-all hover:text-slate-400`}
>
    <slot />
</Button>
