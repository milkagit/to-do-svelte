<!-- TodoItem.svelte -->
<script lang="ts">
  import ColorPicker from "./ColorPicker.svelte";

  export let todo: { status: string; task: any };
  export let i: number;
  export let filter: string;
  export let markComplete: (arg0: any) => any;
  export let removeTask: (arg0: any) => any;

  // export let selectedColor: string; // Default color
  export let selectedColor = "#ffffff"; //default

  function handleColorChange(event: CustomEvent<any>) {
    const color = event.detail.toString();
    selectedColor = color;
    console.log("color", event.detail);
  }
</script>

{#if filter == "all" || (filter == "completed" && todo.status == "completed") || (filter == "incomplete" && todo.status == "pending")}
  <div class="task" style="background-color: {selectedColor}">
    <ColorPicker on:colorChange={handleColorChange} />
    <div style="background-color: {selectedColor}">{todo.task}</div>
    <div class="task-btn">
      <input
        type="checkbox"
        class="common-style {todo.status === 'completed'}"
        checked={todo.status === "completed"}
        on:change={() => markComplete(i)}
      />
      <button class="common-style" on:click={() => removeTask(i)}>
        &#10006;
      </button>
    </div>
  </div>
{/if}

<style>
  .task {
    display: flex;
    justify-content: space-between;
    height: 25px;
    gap: 5px;
  }

  .task-btn {
    display: flex;
    align-items: center;
  }

  .common-style {
    width: 25px;
    height: 25px;
    background-color: white;
  }

  .common-style.completed {
    background-color: purple;
  }
</style>
