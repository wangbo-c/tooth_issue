import { reactive } from 'vue'
import { defineStore } from 'pinia'
import issueArr from '../../issue.js'
export const useIssueStore = defineStore('pissue', () => {
  const issue = reactive(issueArr)
  const pageFun = (page = 1, size = 20) => {
    return issue.slice((page - 1) * size, page * size)
  }
  return { issue, pageFun }
})
