<script lang="ts">
    import { Button } from "./ui/button/index";
</script>

<Button
    on:click
    variant="ghost"
    size="icon"
    class="hover:bg-transparent transition-all hover:text-slate-400"
>
    <slot />
</Button>
