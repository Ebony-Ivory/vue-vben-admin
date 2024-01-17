<template>
  <div class="common-flex">
    {{ myTextRef }}
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
let myTextRef = ref("default");
window.addEventListener("message", receiveMessage, false);
function receiveMessage(event: any) {
  console.log("🚀 🔶 目标页面接收 🔶 event=>", event);
  var origin = event.origin;
  if (origin !== "http://localhost:5173") 
  {
    console.log("🚀 🔶 非法源 🔶 event=>", event);
    return;
  }
  else{
    myTextRef.value=event.data;
  }
}
</script>
