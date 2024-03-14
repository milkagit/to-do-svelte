<!-- TodoForm.svelte -->
<script>
  export let task;
  export let addTask;
</script>

<style>
  .form {
  display: flex;
}

.form input,
.form button {
  border: 1px solid #1e85eb;
  height: 40px;
  outline: none;
  border-radius: 20px;
}

.form input {
  flex: 1;
  text-indent: 20px;
}

.form button {
  width: 60px;
  margin-left: 5px;
  color: #1e85eb;
  cursor: pointer;
}
</style>

<div class="form">
  <input
    type="text"
    bind:value={task}
    on:keydown={(e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    }}
  />
  <button on:click={addTask}>
    Add
  </button>
</div>



