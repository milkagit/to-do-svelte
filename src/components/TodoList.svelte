<!-- TodoList.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import TodoItem from "./TodoItem.svelte";
  import { todos } from "../stores/todos.js";

  export let filter: string;
  export let markComplete: any;
  export let removeTask: any;

  let fetchedTodos: any[] = [];
  let filteredTodos: string | any[] = [];

  // export let selectedColor = "#ffffff"; //default

  const unsubscribe = todos.subscribe((value) => {
    fetchedTodos = value;
    updatedFilters();
  });

  onMount(() => {
    console.log("Fetched todos in TodoList", fetchedTodos);
    updatedFilters();
  });

  onDestroy(() => {
    unsubscribe();
  });

  function updatedFilters() {
    if (filter === "completed") {
      filteredTodos = fetchedTodos.filter(
        (todo) => todo.status === "completed"
      );
    } else if (filter === "incomplete") {
      filteredTodos = fetchedTodos.filter((todo) => todo.status === "pending");
    } else {
      filteredTodos = fetchedTodos;
    }
  }
</script>

<div class="tasks">
  {#if Array.isArray(filteredTodos) && filteredTodos.length > 0}
    {#each filteredTodos as todo, i}
      <TodoItem {todo} {i} {filter} {markComplete} {removeTask} />
    {/each}
  {:else}
    <p>No todos available.</p>
  {/if}
</div>

<style>
  .tasks {
    min-height: 100px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
