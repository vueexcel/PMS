<template>
  <div class="modal-wrapper">
    <div class="modal">
      <slot name="header" />
      <div class="modal-body">
        <slot name="body" />
      </div>
      <div class="modal-footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-wrapper {
  height: 100vh;
  width: 100%;
  background-color: rgba($color: $teal, $alpha: 0.6);
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    width: 500px;
    background-color: $light-teal;
    border-radius: $rounded;
    padding: 20px 20px;
    .modal-body {
      padding: 20px 0px;
    }
  }
}
</style>