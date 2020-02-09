<template>
  <label class="switch">
    <input type="checkbox" />
    <span class="switch__slider"></span>
  </label>
</template>

<style lang="scss">
.switch {
  position: relative;
  display: inline-block;
  width: 22px;
  height: 11px;

  & input {
    display: none;
    &:checked + .switch__slider::before {
      transform: translateX(13px);
    }
  }
  &__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 6px;
    border: 3px solid #e4aed3;
    transition: background-color 0.4s;
    &::before {
      position: absolute;
      content: '';
      width: 13px;
      height: 13px;
      left: -5px;
      top: -4px;
      border-radius: 50%;
      background: #ffffff;
      transition: background-color 0.4s;
    }
  }
}
</style>
