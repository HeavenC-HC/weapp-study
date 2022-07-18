import { useDidHide, useDidShow } from '@tarojs/taro';
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/lib/integration/react';
import './app.scss';
import store, { persistor } from "./store";

function App (props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {})

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return (
    <Provider store={store}>
      <PersistGate loading={props.children} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}

export default App