import React, {Component} from 'react';
import './index.css'
import PubSub from 'pubsub-js'

class List extends Component {

    state = {//初始化状态
        users:[], //users初始值为数组
        isFirst:true,//是否第一次打开页面
        isLoading:false,//标识是否处于加载
        err:''//存储请求相关错误信息
    }

    componentDidMount() {
       this.token =  PubSub.subscribe('change',(_,data) => {
            this.setState(data)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }

    render() {
        const {users,isFirst,isLoading,err} = this.state
        return (
            <div className="row">
                {
                    isFirst ? <h2>欢迎使用,输入关键字,随后点击搜索</h2> :
                        isLoading ? <h2>Loading....</h2> :
                            err ? <h2 style={{color:'red'}}>{err}</h2> :
                    users.map((userObj)=>{
                        return (
                            <div key={userObj.id} className="card">
                                <a href={userObj.html_url} target="_blank" rel="noreferrer">
                                    <img src={userObj.avatar_url} style={{width:'100px'}} alt='icon'/>
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default List;
