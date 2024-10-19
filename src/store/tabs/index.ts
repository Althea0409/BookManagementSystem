import { defineStore } from 'pinia'
// 定义tabs的数据类型
export interface Tabs {
    title: string;// 菜单名称
    path: string;// 当前路由的path
}
// 定义state类型
export interface State {
    tabsList: Array<Tabs>
}
// 定义tabs的store
export const tabsStore = defineStore('tabsStore', {
    // 定义state
    state: (): State => {
        return {
            tabsList: []
        }
    },
    // 定义getters
    getters: {
        // 获取选项卡数据
        getTabs(state) {
            return state.tabsList
        }
    },
    // 定义actions
    actions: {
        // 添加选项卡数据
        addTab(tab: Tabs) {
            // 判断数据是否在选项卡数据里，如果不存在，才放入
            if (this.tabsList.some(item => item.path === tab.path)) return;
            this.tabsList.push(tab)
        }
    }
})