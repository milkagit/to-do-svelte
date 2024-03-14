<script lang="ts">
  import { onMount } from "svelte";
  import { todos } from "./stores/todos.js";

  import TodoForm from "./components/TodoForm.svelte";
  import TodoList from "./components/TodoList.svelte";
  import Filters from "./components/Filters.svelte";

  let task = "";
  let filter = "all";
  let errMsg = "";

  // Use $todos to access the value of the todos store
  $: $todos;

  onMount(async () => {
    // Fetch todos from the dummy API
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();

    // Take only the first 3 todos for this example
    todos.set(
      data.slice(0, 3).map((todo: { title: any; completed: any }) => ({
        task: todo.title,
        status: todo.completed ? "completed" : "pending",
      }))
    );
    console.log("fetched todos:", $todos);
  });

  function addTask() {
    if (!task.trim()) {
      errMsg = "Please fill in this field!";
      return;
    }
    todos.update((currentTodos) => [
      { task, status: "pending" },
      ...currentTodos,
    ]);
    task = "";
    errMsg = "";

    // console.log("Updated todos after adding a new task:", $todos);
  }

  function markComplete(i: number) {
    // Update the todos store by marking a task as completed
    todos.update((currentTodos) => {
      currentTodos[i].status = "completed";
      return [...currentTodos];
    });
  }

  function removeTask(i: number) {
    // Update the todos store by removing a task
    todos.update((currentTodos) => {
      currentTodos.splice(i, 1);
      return [...currentTodos];
    });
  }

  function refreshData() {
    // Set the todos store to the default state
    todos.set([]);
  }

  function handleFilterChange(event: CustomEvent<string>) {
    const selectedFilter = event.detail;
    filter = selectedFilter;
  }
</script>

<div class="container">
  <button on:click={refreshData}>Refresh Data</button>

  <TodoForm bind:task {addTask} />
  {#if errMsg}
    <p style="color: red;">{errMsg}</p>
  {/if}
  <TodoList {$todos} {filter} {markComplete} {removeTask} />
  <Filters {filter} on:filterChange={handleFilterChange} />
</div>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .container {
    width: 100%;
    height: 100vh;
    background: #6d849b;
    display: grid;
    justify-content: center;
    align-items: center;
  }
</style>
