<template>
<view>
  <button @click="fun">click</button>
  <!-- 提交 -->
  <van-row type="flex" justify="center">
    <van-col span="24">
      <button type="info" size="large" round @click="formSubmit">创建</button>
    </van-col>
  </van-row>
  <div v-show="true" :style="{height:'700px'}">
    <label>UserName</label>
    <input type="text" placeholder="UserName">
  </div>
  <!-- 弹出确认 -->
  <view v-show="makeSure" @touchmove.stop="move">
    <div class="overlay"></div>
    <div class="overlay-wrap">
      <div class="block">
        <van-panel title="标题" desc="描述信息" status="状态">
          <div>内容</div>
          <div slot="footer">
            <van-button size="small">按钮</van-button>
            <van-button size="small" type="danger">按钮</van-button>
          </div>
        </van-panel>
      </div>
    </div>
  </view>
</view>
</template>

<script>
export default {
  name: 'postimg',
  data() {
    return {
      makeSure: false,
      oShow: false,
      pShow: false,
      addData: {
        checkedNumber: false,
      }
    }
  },
  methods: {
    fun() {
      this.pShow = !this.pShow;
    },
    // 设置是否限制人数
    bindCheckedNumberChange() {
      console.log('进入 bindCheckedNumberChange')
      console.log('picker发送选择改变，携带值为', this.addData.checkedNumber)
      this.addData.checkedNumber = !this.addData.checkedNumber
    },
    formSubmit(e) {
      console.log('进入 formSubmit')
      console.log('picker发送选择改变，携带值为', this)
      let that = this
      console.log(that.addData)
      this.makeSure = true
      console.log('makeSure: ', this.makeSure)
    },
    move() {

    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: rgb(27, 27, 27);
  opacity: 0.8;
}

.overlay-wrap {
  position: fixed;
  z-index: 110;
  top: 10%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.block {
  width: 90%;
  height: 300px;
  background-color: #fff;
  z-index: 110;
}

.tripList_root {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 0;

}
</style>
