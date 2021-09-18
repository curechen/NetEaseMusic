<template>
  <div class="click-button">
    <span class="left">
      <slot name="left"></slot>
    </span>
    <span class="center">
      <slot name="center" class="center"></slot>
    </span>
    <span class="right">
      <slot name="right" class="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ClickButton',
}
</script>

<style scoped>
.click-button {
  /* width: 10px; */
  /* height: 35px; */
  display: inline-block;
  padding: 5px 15px;
  box-sizing: border-box;
  border: 1px solid #d8d8d8;
  border-radius: 15px;
  color: #373737;
  background-color: white;
  font-size: 14px;
  margin-right: 5px;
}

.click-button:hover {
  background-color: rgba(10, 10, 10, .1);
  cursor: pointer;
}

.click-button > * {
  vertical-align: middle;
}


.click-button .left {
  margin-right: 5px;
  font-size: 20px;
}


.click-button .right {
  margin-left: 5px;
  font-size: 16px;
}
</style>
