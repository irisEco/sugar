<template>
<view :class="makeSure?'tripList_root':''">
  <van-row>
    <van-row>
      <van-col>
        <div class="counter-warp">
          <div v-for="thumb in addData.src" :key="thumb">
            <image height="300" fit="cover" :src="thumb" v-model="addData.src" />
          </div>
          <van-cell-group>
            <van-field type="text" required="true" v-model="addData.title" placeholder="请输入组局标题" @change="bindTitleChange"></van-field>

            <!-- 开始时间 -->
            <van-cell title="开始时间:" icon="clock-o" is-link required>
              <picker mode="time" :value="addData.startTime" start="00:00" end="24:00" bindchange="bindSTimeChange" @change="bindSTimeChange">
                <view class="picker" v-model="addData.startTime">
                  {{addData.startTime}}
                </view>
              </picker>
            </van-cell>
            <van-cell title="开始日期:" icon="clock-o" is-link required>
              <picker mode="date" :value="addData.startDate" bindchange="bindSDateChange" @change="bindSDateChange">
                <view class="picker" v-model="addData.startDate">
                  {{addData.startDate}}
                </view>
              </picker>
            </van-cell>

            <!-- 活动地点 -->
            <van-cell title="活动地点" icon="location-o">
              <picker mode="region" bindchange="bindRegionChange" @change="bindRegionChange" :value="addData.region" :custom-item="addData.customItem">
                <view class="picker" v-model="addData.region">
                  {{addData.region[0]}}，{{addData.region[1]}}，{{addData.region[2]}}
                </view>
              </picker>
            </van-cell>

            <!-- 活动地址详细 -->
            <van-field placeholder="请输入详细地址" required="true" border="false" v-model="addData.detailedAddress" @change="bindDetailedAddressChange"></van-field>

            <!-- 是否全天活动,全天活动则不需要设置结束时间 -->
            <van-cell title="全天活动" icon="smile-o">
              <switch :checked="addData.checkedAllDay" bindchange="bindCheckedDayChange" @change="bindCheckedDayChange" v-model="addData.checkedAllDay" />
            </van-cell>

            <!-- 设置结束时间 -->
            <div v-show="!addData.checkedAllDay">
              <van-cell title="结束时间:" icon="pause-circle-o" is-link>
                <picker mode="time" :value="addData.endTime" start="00:00" end="24:00" bindchange="bindETimeChange" @change="bindETimeChange">
                  <view class="picker" v-model="addData.endTime">
                    {{addData.endTime}}
                  </view>
                </picker>
              </van-cell>
              <van-cell title="结束日期:" icon="pause-circle-o" is-link>
                <picker mode="date" :value="addData.endDate" bindchange="bindEDateChange" @change="bindeDateChange">
                  <view class="picker" v-model="addData.endDate">
                    {{addData.endDate}}
                  </view>
                </picker>
              </van-cell>
            </div>

            <!-- 设置微信提醒 -->
            <van-cell title="是否微信提醒" icon="smile-comment-o">
              <switch :checked="addData.checkedRemind" bindchange="bindCheckedRemainChange" @change="bindCheckedRemainChange" v-model="addData.checkedRemind" />
            </van-cell>

            <!-- 设置微信提醒时间 -->
            <div v-show="addData.checkedRemind">
              <van-cell title="提醒时间:" icon="clock-o" is-link>
                <picker mode="time" :value="addData.remindTime" start="00:00" end="24:00" bindchange="bindRTimeChange" @change="bindRTimeChange">
                  <view class="picker" v-model="addData.remindTime">
                    {{addData.remindTime}}
                  </view>
                </picker>
              </van-cell>
              <van-cell title="提醒日期:" icon="clock-o" is-link>
                <picker mode="date" :value="addData.remindDate" bindchange="bindRDateChange" @change="bindRDateChange">
                  <view class="picker" v-model="addData.remindDate">
                    {{addData.remindDate}}
                  </view>
                </picker>
              </van-cell>
            </div>

            <!-- 设置人数限制 -->
            <van-cell title="是否限制人数" icon="smile-comment-o">
              <switch :checked="addData.checkedNumber" bindchange="bindCheckedNumberChange" @change="bindCheckedNumberChange" v-model="addData.checkedNumber" />
            </van-cell>

            <!-- 如果设置人数限制 -->
            <div v-show="addData.checkedNumber">
              <van-cell title="限制参加人数为">
                <van-stepper :value="addData.num" input-width="40px" button-size="32px" v-model="addData.num" @change="bindStepperNumChange" />
              </van-cell>
            </div>

            <!-- 简介 -->
            <van-cell-group>
              <van-field :value="addData.introduction" rows="20" autosize label="简介" type="textarea" maxlength="250" placeholder="请输入组局的大概描述,比如求组队自习学习局,饭局等~" show-word-limit v-model="addData.introduction" @change="bindIntroductionChange" @keyup.enter="bindIntroductionChange" />
            </van-cell-group>
          </van-cell-group>

          <!-- 提交 -->
          <van-row type="flex" justify="center" class="sub">
            <van-col span="24">
              <button class="btn-info" type="info" size="large" round @click="formSubmit">创建</button>
            </van-col>
          </van-row>
        </div>
      </van-col>
    </van-row>

    <!-- 弹出确认框 -->
    <div v-show="makeSure">
      <div class="overlay"></div>
      <div class="overlay-wrap">
        <div class="set-localtion">
          <van-panel :title="addData.title" :desc="addData.introduction" status="状态">
            <div>
              <van-row class="makeSure-content">
                <p v-show="addData.startTime!=''">开始时间:<span>{{addData.startDate}}-{{addData.startTime}}</span></p>
                <p v-show="addData.region!=''&&addData.detailedAddress!=''">活动地点:<span>{{addData.region[0]}}，{{addData.region[1]}}，{{addData.region[2]}} {{addData.detailedAddress}}</span></p>
                <div v-show="!addData.checkedAllDay">
                  <p>结束时间:<span>{{addData.endDate}}-{{addData.endTime}}</span></p>
                </div>
                <div v-show="addData.checkedRemind">
                  <p>提醒时间:<span>{{addData.remindDate}}-{{addData.remindTime}}</span></p>
                </div>
                <div v-show="addData.checkedNumber">
                  <p>参加人数限制:<span>{{addData.num}}</span></p>
                </div>
              </van-row>
            </div>
          </van-panel>
          <div class="overlay-footer">
            <van-button round size="small" @click="confirmCancel">取消</van-button>
            <van-button round size="small" type="info" @click="comfirmDetermine">确定</van-button>
          </div>
        </div>
      </div>
    </div>

  </van-row>
</view>
</template>

<script>
import {
  formatTime,
  formatHour,
  formatDate
} from '../../utils/index.js'



export default {

  data() {
    let t = new Date()
    let s = formatTime(t)
    let time = formatHour(t)
    let date = formatDate(t)
    return {
      title: '23e',
      message: "test",
      makeSure: false,
      addData: {
        title: "",
        start: t,
        end: t,
        currentDate: new Date(),
        startDate: date,
        startTime: time,
        endDate: date,
        endTime: time,
        remindDate: date,
        remindTime: time,
        checkedAllDay: true,
        checkedRemind: false,
        checkedNumber: false,
        detailedAddress: "",
        introduction: "",
        num: 1,
        region: ['全部', '全部', '全部'],
        customItem: '全部',
        src: ['/static/images/temple.png'],
      }

    }
  },
  methods: {
    // 设置标题
    bindTitleChange(e) {
      console.log('进入 bindTitleChange')
      console.log('picker发送选择改变，携带值为', e)
      this.addData.title = e.mp.detail
    },
    bindIntroductionChange(e) {
      console.log('进入 bindTitleChange')
      console.log('picker发送选择改变，携带值为', e)
      this.addData.introduction = e.mp.detail
    },
    // 设置详细地址
    bindDetailedAddressChange(e) {
      console.log('进入 bindTitleChange')
      console.log('picker发送选择改变，携带值为', e)
      this.addData.detailedAddress = e.mp.detail
    },
    // 设置开始日期
    bindSDateChange(e) {
      console.log('进入 bindDateChange')
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.addData.startDate = e.mp.detail.value
    },
    // 设置开始日期
    bindSTimeChange(e) {
      console.log('进入 bindTimeChange')
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.addData.startTime = e.mp.detail.value
    },
    // 设置结束日期
    bindEDateChange(e) {
      console.log('进入 bindDateChange')
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.addData.endDate = e.mp.detail.value
    },
    // 设置结束时间
    bindETimeChange(e) {
      console.log('进入 bindTimeChange')
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.addData.endTime = e.mp.detail.value
    },
    // 设置提醒日期
    bindRDateChange(e) {
      console.log('进入 bindDateChange')
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.addData.remindDate = e.mp.detail.value
    },
    // 设置提醒时间
    bindRTimeChange(e) {
      console.log('进入 bindTimeChange')
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.addData.remindTime = e.mp.detail.value
    },
    // 设置省市区
    bindRegionChange(e) {
      console.log('进入 bindRegionChange')
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.addData.region = e.mp.detail.value
    },
    // 设置是否整天活动
    bindCheckedDayChange() {
      console.log('进入 bindCheckedDayChange')
      console.log('picker发送选择改变，携带值为', this.addData.checkedAllDay)
      this.addData.checkedAllDay = !this.addData.checkedAllDay
    },
    // 设置是否提醒
    bindCheckedRemainChange() {
      console.log('进入 bindCheckedRemainChange')
      console.log('picker发送选择改变，携带值为', this.addData.checkedRemind)
      this.addData.checkedRemind = !this.addData.checkedRemind

    },
    // 设置是否限制人数
    bindCheckedNumberChange() {
      console.log('进入 bindCheckedNumberChange')
      console.log('picker发送选择改变，携带值为', this.addData.checkedNumber)
      this.addData.checkedNumber = !this.addData.checkedNumber

    },
    // 表单提交
    bindStepperNumChange(e) {
      console.log('进入 bindStepperNumChange')
      console.log('picker发送选择改变，携带值为', e)
      this.addData.num = e.mp.detail

    },
    formSubmit(e) {
      console.log('进入 formSubmit')
      console.log('picker发送选择改变，携带值为', this)
      let that = this
      console.log(that.addData)
      this.makeSure = true
      console.log('makeSure: ', this.makeSure)
    },
    confirmCancel() {
      console.log('进入 confirmCancel')
      console.log('picker发送选择改变，携带值为')
      this.makeSure = false
    },
    comfirmDetermine() {
      console.log('进入 comfirmDetermine')
      console.log('picker发送选择改变，携带值为', this)
      let that = this.addData
      console.log(that)
      this.$http.post('/addGroup',{
        data:that
      }).then((resp)=>{
        console.log(resp.data)
      }).catch((err)=>{
        console.log(err)
      })
      console.log('post ok!')
      this.makeSure = false
      // wx.switchTab({
      //   url: 'pages/counter/main'
      // })

    }
  }
}
</script>

<style lang="scss">
.counter-warp {
  position: relative;
  width: 100vw;
  top: 0;

}

.btn-info {
  background-color: #e45b19;
  color: white;
}

.counter-warp image {
  width: 100vw;

}

.sub {
  margin-top: 30px;
  padding: 40px;
}

.section {
  border: 1px soild #233454;
  display: block;
}

/* 遮罩层 */
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

.set-localtion {
  width: 80%;
  background-color: #fff;
  padding: 10px;
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

.overlay-footer {
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.makeSure-content {
  p {
    text-align: left;
    border-bottom: 1rpx solid #eee;
    margin-top: 3px;
    font-size: 14px;
    line-height: 24px;
    color: #999;
    padding: 5px;

  }

  p::after {
    content: "";

  }

  span {
    padding-left: 20px;
  }
}
</style>
