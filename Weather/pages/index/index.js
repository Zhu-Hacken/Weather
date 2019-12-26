// pages/index/index.js

//const config = app.globalData.config

//根据网络上的教程，若想使用Async-await，此处应该有这一段避免报错
//const regeneratorRuntime = require('../../lib/runtime')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgimage:"https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2996220940,3625666886&fm=26&gp=0.jpg",
    greeting:" ",
    // location:"定位中. . .",
    location:["请选择您所在的地区"],
    now:{   //当前天气数据
      fl:"N/A", //温度
      cond_code:"100",  //天气图标
      cond_txt:"N/A",
    },
    update:'',
    //小时预报
    daily_forecast:'',
    // hourly:{
    //   time:'10:00',
    //   cond_txt:'晴',
    //   cond_code:'100',
    //   tmp:'25',
    //   wind_dir:'北风',
    //   wind_sc:'1'
    // },
    hourly:[],
    hourly_page:[0,1],
    hourly_times:[1,2,3,4],
    
    
    //每日预报
    daily_pages:[0,1,],
    daily_items: [0, 1, 2, 3],
    // daily_forecast:
    // {
    //   date:'12/19',
    //   cond_txt_d:'100',
    //   tmp_min:'15',
    //   tmp_max:'20',
    //   wind_dir:'北风',
    //   wind_sc:'3-4'
    // },
    daily_forecast:[],
    days: ['今天', '明天', '后天', '明天', '后天', '明天', '后天'],
    // 生活指数
    lifestyle:[],
  },
  //根据时间获取问候语
  getGreeting:function(e)
  {
    let h = new Date().getHours()
    let w = ''
    if (h > 0 && h <= 5) {
      w = '深夜'
    } else if (h > 5 && h <= 9) {
      w = '早上'
    } else if (h > 9 && h <= 11) {
      w = '上午'
    } else if (h > 11 && h <= 13) {
      w = '中午'
    } else if (h > 13 && h <= 17) {
      w = '下午'
    } else if (h > 17 && h <= 19) {
      w = '傍晚'
    } else {
      w = '晚上'
    }
    var that = this;
    console.log(h)
    console.log(w)
    this.setData({
      greeting: w+'好'
    })
  },
  //显示框框
  showWindow:function(e)
  {
    var that = this;
    setData({
      
    })
  },
  //地区选择器获取地区
  changeRegion:function(e)
  {
      this.setData({
        location:e.detail.value
      })
      this.getWeather();
  },
  //获取天气
  getWeather:function(e)
  {
    var that = this;
    //请求实况天气
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data: {
        location: that.data.location[1],
        key: 'd7c764d4ee6448e894bfcf50900c9d54',
      },
      success: function (res) {
        console.log(res.data)

        that.setData({ 
          now: res.data.HeWeather6[0].now,
          update: res.data.HeWeather6[0].update,
         })
      }

    }),
      //请求隔3小时的天气
      wx.request({
        url: 'https://free-api.heweather.net/s6/weather/hourly?',
        data: {
          location: that.data.location[1],
          key: 'd7c764d4ee6448e894bfcf50900c9d54'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
            hourly: res.data.HeWeather6[0].hourly,            
          })


          for(let i = 0; i<8;i++)
          {
            var hour = 'hourly[' + i + '].time'//若想使用变量调用数组的某个值，需要用变量保存起来
            var time = res.data.HeWeather6[0].hourly[i].time
            time = time.substring(11,17)
            that.setData({
              [hour]: time
            })
            // that.data.hourly[0].time = that.data.HeWeather6[0].hourly[2].time
          }

        }

      }),

    //请求未来几天天气
      wx.request({
        url: 'https://free-api.heweather.net/s6/weather/forecast?',
        data: {
          location: that.data.location[1],
          key: 'd7c764d4ee6448e894bfcf50900c9d54'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({ 
            daily_forecast: res.data.HeWeather6[0].daily_forecast, 
            // updata:res.data.HeWeather6[0].update
            })
          console.log(res.data.HeWeather6[0].daily_forecast)

          for (let i = 0; i < 7; i++) {
            var day = 'daily_forecast[' + i + '].date'//若想使用变量调用数组的某个值，需要用变量保存起来
            var time = res.data.HeWeather6[0].daily_forecast[i].date
            time = time.substring(5, 10)
            that.setData({
              [day]: time
            })
            // that.data.hourly[0].time = that.data.HeWeather6[0].hourly[2].time
          }


        },

        
      }),

      //请求生活指数
      wx.request({
      url: 'https://free-api.heweather.net/s6/weather/lifestyle?',
        data: {
          location: that.data.location[1],
          key: 'd7c764d4ee6448e894bfcf50900c9d54'
        },
        success: function (res) {
          console.log(res.data)
          that.setData({
          //   daily_forecast: res.data.HeWeather6[0].daily_forecast,
          lifestyle:res.data.HeWeather6[0].lifestyle
          })
          // console.log(res.data.HeWeather6[0].daily_forecast)
        },
      })

    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGreeting();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})