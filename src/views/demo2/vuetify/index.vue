<template
  ><div class="common-flex-col">
    <div class="w-full p-2">
      <VCard title="滑动选择器">
        <VDivider></VDivider>
        <VRangeSlider
          class="px-8 pt-8"
          :ticks="seasons"
          :model-value="[0, 1]"
          min="0"
          max="3"
          :step="1"
          show-ticks="always"
          thumb-label="always"
          tick-size="4"
        >
          <template v-slot:thumb-label="{ modelValue }">
            <div class="i-mdi-snowflake"></div>
          </template>
        </VRangeSlider>
      </VCard>
    </div>
    <div class="w-full p-2">
      <VCard title="进度条">
        <VDivider></VDivider>
        <div class="p-4">
          <VProgressLinear model-value="10" color="light-blue" height="10" striped></VProgressLinear>
        <br />
        <VProgressLinear
          model-value="20"
          color="light-green-darken-4"
          height="10"
          striped
        ></VProgressLinear>
        <br />
        <VProgressLinear model-value="45" height="10" striped color="lime"></VProgressLinear>
        <br />
        <VProgressLinear model-value="60" height="10" striped color="deep-orange"></VProgressLinear>
        </div>
 
      </VCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { VRangeSlider, VProgressLinear, VCard, VDivider } from 'vuetify/components';
  let seasons = ref({
    0: 'Winter',
    1: 'Spring',
    2: 'Summer',
    3: 'Fall',
  });
  const loading = ref(true);
  setTimeout(() => {
    loading.value = false;
  }, 1500);
</script>
<style lang="less" scoped></style>
