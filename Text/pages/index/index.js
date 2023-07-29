import{
  getCourseListRequest
}from'../../api/main.js'
const app = getApp()
import{
  getNowWeek
} from '../../utils/util'
Page({
  data: {
    navList:[
      {
        title:'查课表',
        icon:'/image/download/alarm-clock.png',
        path:'/pages/course/index'
      },
      {
        title:'查成绩',
        icon:'/image/download/checklist.png',
        path:'/pages/score/index'
      },
      {
        title:'查考勤',
        icon:'/image/download/classroom.png',
        path:'/pages/attendance/index'
      },
      {
        title:'校历',
        icon:'/image/download/schedule.png',
        path:'/pages/calendar/index'
      }
  ],
  weekDayCount:7,
    startDate:'2023/02/20',
    weekIndexText:['一','二','三','四','五','六','日'],
    nowMonth:1,
    courseList:[],
    weekCalendar:[1,2,3,4,5,6,7],
  totalWeek:20,
  todayCourseList:[]
  },
  // 事件处理函数
  
  onLoad() {
    getCourseListRequest().then(res=>{
      this.setData({
        courseList:res.data
      })
      wx.setStorageSync('courses', res.data)
      this.getTodayCourseList()
    })
    const{
      windowWidth
    } = wx.getSystemInfoSync()
    this.setData({
      windowWidth
    })
    this.getWeekDates()
    this.getTodayDate()
  },
  nav(e){
    const index = e.currentTarget.dataset.index
    const path = this.data.navList[index].path
    wx.navigateTo({
      url:path,
      fail(){
        wx.switchTab({
          url: path,
        })
      }
    })
  },
  getTodayCourseList(){
    const todayWeek = new Date().getDay()
    const todayWeeks = getNowWeek(this.data.startDate,this.data.totalWeek)
    const todayCourseList = wx.getStorageSync('courses').filter(item=>{
      return item.week == todayWeek && item.weeks.indexOf(todayWeeks) > -1
    })
    todayCourseList.sort((a,b)=>{
      return a.section - b.section
    })
    this.setData({
      todayWeek,
      todayWeeks,
      todayCourseList
    })
  },
  getWeekDates(){
    const startDate = new Date(this.data.startDate)
    const addTime = (this.data.nowWeek-1)*7*24*60*60*1000
    const firstDate = startDate.getTime() + addTime
    const{
      month:nowMonth
    } = this.getdateObject(new Date(firstDate))
    const weekCalendar = []
    for(let i=0;i<this.data.weekDayCount;i++){
      const date = new Date(firstDate + i*24*60*60*1000)
      const{day} = this.getdateObject(date)
      weekCalendar.push(day)
    }
    this.setData({
      nowMonth,
      weekCalendar
    })
  },
  getdateObject(date = new Date()){
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate()
    return {
      year,
      month,
      day
    }
  },
  
  
  getTodayDate(){
    const{
      month:todayMonth,
      day:todayDay
    } = this.getdateObject()
    this.setData({
      todayMonth,
      todayDay
    })
  },
})
