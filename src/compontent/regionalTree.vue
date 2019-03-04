<!--
 * @Description: In User Settings Edit
 * @Author: oouyang
 * @LastEditors: Please set LastEditors
 * @Date: 2019-03-01 15:10:46
 * @LastEditTime: 2019-03-04 22:21:01
 -->

<template>
  <div>
    <p>区域树型组件:{{activeItem._source.areaname}}</p>
    <div class="tree">
      <div v-for="(childTree,nodeIndex) in treeList" :key="nodeIndex">
        <div
          class="childNode"
          v-for="item in childTree"
          :key="item._id"
          @click="_getItemList(item,nodeIndex)"
        >
          <div
            class="childNode_Item"
            :class="{active : activeIndex == item._id,parent:showParent(item)}"
          >{{item._source.areaname}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "regionalTree",
  data() {
    return {
      treeList: [], //核心数组
      isopen: false,
      activeIndex: null, //当前选择区域
      activeItem: {
        _source:{
          areaname:"",
        }
      } //当前选择数据
    };
  },
  computed: {},
  filters: {},
  created() {},
  mounted() {
    let vm = this;
    vm.getChildList("440305").then(res => {
      console.log(res);
      vm.treeList.push(res.data);
    });
  },
  methods: {
    /**
     * @description: 样式处理。高亮父级
     * @param {type}
     * @return:
     */
    showParent(item) {
      return this.activeItem._id
        ? this.activeItem._id.indexOf(item._id) != -1
          ? true
          : false
        : false;
    },
    /**
     * @description:
     * @param {Object} item子树对象
     * @param {Number} nodeIndex用于判断当前点击有没有list
     * @return:
     */
    _getItemList(item, nodeIndex) {
      console.log(item, nodeIndex);
      let vm = this;
      vm.activeIndex = item._id;
      vm.activeItem = item;
      let code = item._source.areacode;
      vm.getChildList(code).then(res => {
        //如果核心数组里面存在，先删除，再push
        if (vm.treeList[nodeIndex + 1]) {
          let arr = vm.treeList;
          arr = arr.slice(0, nodeIndex + 1);
          vm.treeList = arr;
          vm.treeList.push(res.data);
        } else {
          vm.treeList.push(res.data);
        }
      });
    },
    /**
     * @description: 根据父级区域code获取子区域数据
     * @param {parentCode}
     * @return:
     */
    getChildList(parentCode) {
      return axios({
        method: "post",
        url: "http://192.168.100.181:8990/cubeData/api/getAreaInfoByParentcode",
        params: {
          parentCode: parentCode
        }
      }).then(response => {
        return Promise.resolve(response.data);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tree {
  display: flex;
}
.childNode {
  display: flex;
  .childNode_Item {
    width: 100%;
    cursor: pointer;
  }
  &:hover {
    background: #f3f3f3;
  }
  .childNode_Item.active,
  .childNode_Item.parent {
    color: #2d8cf0;
    background: #f3f3f3;
  }
}
</style>


