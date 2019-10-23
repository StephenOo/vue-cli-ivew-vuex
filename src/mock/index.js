import Mock from 'mockjs'
import loginDate from './mockData/user'

Mock.mock('/user/login', 'post', loginDate)
