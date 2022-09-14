import React from 'react';
import HostList from './HostList';
const RemoteList = React.lazy(()=>import('remote/RemoteList'));
const App = ()=>{
  return (
      <div>
          <h2>本地组件 HostList</h2>
          <HostList/>
          <React.Suspense fallback={<div>加载中....</div>}>
              <RemoteList/>
          </React.Suspense>
      </div>
  )
}
export default App;