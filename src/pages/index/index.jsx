import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtButton } from 'taro-ui';
import Page01 from '../page01';
import Page02 from '../page02';
import Page03 from '../page03';
import './index.scss';

function Index(props) {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    loginUser()
  }, [])

  const loginUser = () => {

  }

  const handleClick = (value) => {
    setCurrent(value)
  }

  const renderPage = () => {
    switch(current){
      case 0:
        return <Page01 dataList={{a: 11222}} />;
      case 1:
        return <Page02 />;
      case 2:
        return <Page03 />;
    }
  }

  const tobegin = (res) => {
    if(res.detail.userInfo){ // 返回的信息中包含用户信息则证明用户允许获取信息授权
      console.log('授权成功')
      console.log(res.detail.userInfo)
      // 保存用户信息微信登录
      Taro.setStorageSync('userInfo', res.detail.userInfo)

      setLoading(!loading)
      Taro.login()
        .then(resLogin => {
          console.info(resLogin)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (resLogin.code){
            // 登录
            /* _login({...res.detail, code: resLogin.code},(result) => {
              if (result.data.status === 200){
                Taro.setStorageSync('token', result.data.data.token)
                Taro.switchTab({url: '/pages/index/index'})
              } else {
                Taro.showToast({
                  title: '登录失败，请稍后重试',
                  icon: 'none',
                  mask: true
                })
              }
            }, () => {
              Taro.showToast({
                title: '登录失败，请稍后重试',
                icon: 'none',
                mask: true
              })
            }) */
          }
          setLoading(false)
        })
    } else {
      Taro.switchTab({url: '/pages/index/index'})
    }
  }

  return (
    <View className='page-index'>
          <View className='login body'>
            <View className='textAlign need'>需要使用你的微信昵称和头像</View>
            <AtButton
              className='at-col defaultWidth button'
              loading={loading}
              openType='getUserInfo'
              onGetUserInfo={tobegin}
            >
              点击授权
            </AtButton>
            <AtButton
              type='secondary'
              className='at-col defaultWidth'
              onClick={() => Taro.switchTab({url: '/pages/index/index'})}
            >
              暂不登录
            </AtButton>
          </View>
      {/* <View  className='page-index-content'>
        {
          renderPage()
        }
      </View>
      <AtTabBar
        fixed
        tabList={[
          { title: '待办事项' },
          { title: '拍照' },
          { title: '通讯录'}
        ]}
        onClick={handleClick}
        current={current}
      /> */}
    </View>
  );
}

export default Index;

