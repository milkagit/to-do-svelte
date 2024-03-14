<!-- Filters.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let filter: string;
  const dispatch = createEventDispatcher();

  function handleFilterClick(selectedFilter: string) {
    dispatch("filterChange", { detail: selectedFilter });
    console.log("selectedFilter", selectedFilter);
  }
  // function handleFilterClick(selectedFilter: string) {
  //   dispatch("filterChange", selectedFilter);
  //   console.log("selectedFilter", { filter: selectedFilter });
  // }
</script>

<div class="filters">
  <button
    class={filter === "all" ? "active" : ""}
    on:click={() => handleFilterClick("all")}
  >
    All
  </button>
  <button
    class={filter === "completed" ? "active" : ""}
    on:click={() => handleFilterClick("completed")}
  >
    Completed
  </button>
  <button
    class={filter === "incomplete" ? "active" : ""}
    on:click={() => handleFilterClick("incomplete")}
  >
    Incomplete
  </button>
</div>

<style>
  .filters {
    display: flex;
    justify-content: space-between;
  }

  .filters > button {
    padding: 10px 8px;
    border: 1px solid #1e85eb;
    color: #1e85eb;
    border-radius: 20px;
    cursor: pointer;
  }

  .filters > button.active {
    background: #1e85eb;
    color: #f5f5f5;
  }
</style>
