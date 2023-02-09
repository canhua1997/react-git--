import React, {Component} from 'react';
import List from './components/List'
import Search from "./components/Search";
class App extends Component {
    state = {//初始化状态
        users:[], //users初始值为数组
        isFirst:true,//是否第一次打开页面
        isLoading:false,//标识是否处于加载
        err:''//存储请求相关错误信息
    }

    updateState = (userObj) => {
        this.setState(userObj)
    }
    render() {
        return (
            <div className="container">
                <Search updateAppState={this.updateState}/>
                <List {...this.state}/>
            </div>
        );
    }
}

export default App;
