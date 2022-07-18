import { View } from '@tarojs/components';
import { useEffect, useState } from 'react';
import { AtTabBar } from 'taro-ui';
import Page01 from '../page01';
import Page02 from '../page02';
import Page03 from '../page03';
import './index.scss';

function Index(props) {
  const [current, setCurrent] = useState(0);

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

  return (
    <View className='page-index'>
      <View  className='page-index-content'>
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
      />
    </View>
  );
}

export default Index;

