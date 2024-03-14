<script lang="ts">
  import { tick, onMount } from "svelte";

  // Initial value
  export let id = Math.random();
  export let value = "#5E7ABC";
  let myIndex = 0;
  let myRow = 0;

  // Our color set
  let values = [
    [
      "#DAAFE9",
      "#C7DBF5",
      "#AAD5FB",
      "#ADE5DA",
      "#B0EDC3",
      "#FDF0A4",
      "#F8D6A2",
    ],
    [
      "#C47ADA",
      "#90BAEE",
      "#75BAFA",
      "#72D5BF",
      "#73DE8C",
      "#FBE66E",
      "#F5B969",
    ],
    [
      "#AE44B7",
      "#5E7ABC",
      "#5E7ABC",
      "#4DACA9",
      "#63B75A",
      "#EDBD4A",
      "#EC9740",
    ],
    [
      "#501B87",
      "#021B6B",
      "#0C2794",
      "#337277",
      "#2F6A52",
      "#AE802F",
      "#AD6127",
    ],
  ];

  // Keyboard shortcut
  let trigger = "Escape";
  function handleKeydown(e: { key: string }) {
    if (e.key == trigger) {
      ddActive = false;
    }
  }

  let windowHeight: number;
  let top: boolean;

  let ddActive = false;

  let ddHeight = 158;
  let inputHeight: number;

  async function toggleDropdown(
    e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) {
    if (
      e.clientY + inputHeight < ddHeight ||
      windowHeight - ddHeight - inputHeight - e.clientY > 0
    ) {
      top = false;
    } else {
      top = true;
    }

    ddActive = !ddActive;

    await tick();
    if (ddActive) {
      const selected = document.querySelector(".color-block.active");
      if (selected) {
        selected.focus();
      }
      // document.querySelector(".color-block.active").focus();
    }
  }

  function changeValue(innerValue: string) {
    value = innerValue;
    ddActive = false;
  }

  function keyboardGridNav(
    e: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement },
    index: number
  ) {
    let focussedElement = (document.activeElement?.id || "").toString();

    if (focussedElement) {
      myRow = parseInt(focussedElement.charAt(focussedElement.length - 3));
      myIndex = parseInt(focussedElement.charAt(focussedElement.length - 1));
    } else {
      // Handle the case where there's no focused element
      return;
    }

    let nextRow;
    let prevRow;
    let nextIndex;
    let prevIndex;

    let targetId: string | null = null;

    switch (e.keyCode) {
      // left arrow
      case 37:
        prevIndex = myIndex - 1;
        if (prevIndex > -1) {
          targetId = id + "-" + myRow + "-" + prevIndex;
        }
        break;
      // top arrow
      case 38:
        prevRow = myRow - 1;
        if (prevRow > -1) {
          targetId = id + "-" + prevRow + "-" + myIndex;
        }
        break;
      // right arrow
      case 39:
        nextIndex = myIndex + 1;
        if (nextIndex < values[0].length) {
          targetId = id + "-" + myRow + "-" + nextIndex;
        }
        break;
      // down arrow
      case 40:
        nextRow = myRow + 1;
        if (nextRow < values.length) {
          targetId = id + "-" + nextRow + "-" + myIndex;
        }
        break;
    }

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.focus();
      }
    }
  }
</script>

<svelte:window bind:innerHeight={windowHeight} on:keydown={handleKeydown} />

<div class="color-picker-holder">
  <div class="color-picker-inner">
    <button
      bind:clientHeight={inputHeight}
      class="select-color"
      on:click={(e) => toggleDropdown(e)}
      class:fake-focus={ddActive}
    >
      <div style="display: flex;">
        <div style="background: {value};" class="color-block"></div>
        <div class="caret" class:top style="margin-right: .2rem;"></div>
      </div>
    </button>
    <!-- <input type="text" bind:value /> -->
  </div>

  {#if ddActive}
    <div class:top bind:clientHeight={ddHeight} class="values-dropdown">
      <div class="values-dropdown-grid">
        {#each values as val, index}
          {#each val as innerValue, innerIndex}
            <button
              id="{id}-{index}-{innerIndex}"
              class:active={innerValue == value}
              on:keydown={(e) => keyboardGridNav(e, innerIndex)}
              style="background: {innerValue};"
              on:click={() => {
                changeValue(innerValue);
              }}
              class="color-block"
            >
            </button>
          {/each}
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .color-picker-holder {
    position: relative;
  }

  .color-picker-inner {
    display: flex;
    height: 35px;
  }

  .select-color {
    border: 1px solid #ccc;
    padding: 3px;
    border-radius: 0.2rem;
    margin-right: 0.4rem;
    background: #fff;
    height: 35px;
  }

  .caret {
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #555;
    position: relative;
    top: 10px;
    margin-left: 4px;
  }

  .caret.top {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #555;
    border-top: none;
  }

  .active {
    box-shadow:
      inset 0 0 0 1px #fff,
      0 0 3px 1px rgba(0, 0, 0, 0.25);
  }

  .fake-focus,
  input:focus,
  button:focus {
    outline: 0;
    box-shadow: 0 0 0 2px #18a0fb;
    border-color: #18a0fb;
  }

  .color-block {
    border-radius: 0.2rem;
    width: 24px;
    height: 24px;
    line-height: 0;
    font-size: 0;
  }

  .values-dropdown {
    padding: 1rem;
    position: absolute;
    z-index: 1;
    top: 40px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
  }

  .values-dropdown-grid {
    grid-template-columns: repeat(7, 24px);
    grid-template-rows: 24px 24px;
    grid-gap: 10px;
    display: grid;
  }

  .values-dropdown.top {
    top: auto;
    bottom: 40px;
  }

  .values-dropdown button {
    border: none;
  }
</style>
