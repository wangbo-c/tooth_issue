<template>
  <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <issues v-for="(value, index) in list" :key="index" :questionObj="value" :index="index" @changeIssue="changeIssue"/>
  </van-list>
  <div class="popupBtn" @click="show = true">概览</div>

  <van-popup v-model:show="show" round position="bottom" :style="{ height: '70%' }">
    <van-list v-model:loading="loadingPopup" :finished="finishedPopup" finished-text="没有更多了" @load="onLoadPopup" class="diamondBox">
        <span class="diamond" :class="value.flag?'yes':'diamond'" v-for="(value, index) in listPopup" :key="index">{{ value.index }}</span>
    </van-list>
  </van-popup>
</template>

<script setup>
import { ref, reactive } from 'vue'
import issues from './components/one_issue.vue'
import { useIssueStore } from './stores/counter'
const pissue = useIssueStore();
const issueArr = pissue.issue
// van list
const list = reactive([]);
const loading = ref(false);
const finished = ref(false);
let page = 1;
const onLoad = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  list.push(...pissue.pageFun(page))
  page++;
  // 加载状态结束
  loading.value = false;

  // 数据全部加载完成
  if (list.length >= issueArr.length) {
    finished.value = true;
  }
};


// van popup
const show = ref(false)
const listPopup = reactive([]);
for (let i = 0; i < 100; i++) {
  listPopup.push({ index: listPopup.length + 1, flag: false })
}
const loadingPopup = ref(false);
const finishedPopup = ref(false);
const onLoadPopup = () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  for (let i = 0; i < 100; i++) {
    listPopup.push({index: listPopup.length + 1 ,flag:false})
  }
  // 加载状态结束
  loadingPopup.value = false;

  // 数据全部加载完成
  if (listPopup.length >= issueArr.length) {
    finishedPopup.value = true;
  }
};


// flag 用于判断题目正确与否
const changeIssue = (index,op) => {
  const a = op.value
  const b = issueArr[index].result
  listPopup[index].flag = a==b
}
</script>

<style>
#app {
  padding: 3em 1em;
}

.diamondBox {
  width: 100%;
  height: 90%;
  margin-top: 10%;
  text-align: center;
  overflow: auto;
}

.diamond {
  display: inline-block;
  width: 2em;
  height: auto;
  padding: 0.5em;
  background-color: #eaeaea;
  border-radius: 5px;
  text-align: center;
  line-height: 2em;
  margin: 0.5em;
  border-radius: 10px;
}
.yes{
  background-color: rgb(255, 167, 72);
  color: #fff;
}
.popupBtn {
  position: fixed;
  bottom: 3.5em;
  right: 1em;
  width: 3em;
  height: 3em;
  line-height: 3em;
  text-align: center;
  background-color: #818181;
  color: #f3f3f3;
  border-radius: 5px;
  cursor: pointer;
}
</style>
