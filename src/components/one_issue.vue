<template>
  <div class="issue">
    <div class="title">{{ questionObj.issue.slice(0,questionObj.issue.length - 2) }}</div>
    <van-radio-group v-model="checked" shape="dot" @change="changeIssue1">
      <van-radio :name="item[0]" v-for="item,index in questionObj.options" :key="index">{{ item }}</van-radio>
    </van-radio-group>
  </div>
</template>

<script setup>
import { ref, defineProps,defineEmits } from 'vue'
const props = defineProps({
  questionObj:{
    type:Object,
    default:() => {}
  },
  index:{
    type:Number,
    default:1
  }
})
const checked = ref()
const emit = defineEmits(['changeIssue'])
const changeIssue1 = () => {
  emit('changeIssue', props.index, checked)
}
</script>

<style>
.issue {
  background-color: #F1F1F1;
  padding: 10px;
  margin-bottom: 2em;
  border-radius: 10px;
  font-size: 12px;
  color: #1b1b1b !important;
}
.van-radio__label{
  color: #1b1b1b !important;
}
.title {
  margin-bottom: 1em;
}
.van-radio{
  margin-bottom: 1em;
}
</style>