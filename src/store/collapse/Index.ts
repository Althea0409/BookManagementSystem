import { defineStore } from 'pinia'
//定义store,并导出；参数一：必须唯一
export const collapseStore = defineStore('isCollapse', {
    //定义state 相当于全局的内存
    state: () => {
        return {
            isCollapse: false
        }
    },
    //定义getters
    getters: {
        getCollapse: (state) => {
            return state.isCollapse
        }
    },
    //定义actions 用于操作state
    //注意此处，不能使用箭头函数，否则this的指向将会被改变
    actions: {
        setCollapse() {
            this.isCollapse = !this.isCollapse;
        }
    }
})