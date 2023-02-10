import React, {Component} from 'react';
import PubSub from 'pubsub-js'

class Search extends Component {
    searchIcon = async ()=>{
        //获取用户输入
        const {keyWordElement:{value:keyWord}} = this
        //发送请求前通知List更新状态
        PubSub.publish('change',{isFirst:false,isLoading:true})

        //发送网络请求 axios
        /*
        axios.get(`/api1/search/users?q=${keyWord}`)
            //请求成功后通知List更新状态
            .then((response)=> PubSub.publish('change',{isLoading:false,users:response.data.items}))
            //请求失败后通知App更新状态
            .catch(error => PubSub.publish('change',{isLoading:false,err:error.message}))
         */

        //发送网络请求使用fetch(未优化)
        /*
        fetch(`/api1/search/users?q=${keyWord}`)
            .then(response => response.json())
            .then( data => console.log(data.items))
            .catch(error => PubSub.publish('change',{isLoading:false,err:error.message}))

         */

        //发送网络请求使用fetch(优化)
        try{
            const response = await  fetch(`/api1/search/users?q=${keyWord}`)
            const data = await response.json()
            PubSub.publish('change',{isLoading:false,users:data.items})
        }catch (e){
            PubSub.publish('change',{isLoading:false,err:e.message})
        }

    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input ref={c => this.keyWordElement = c } type="text" placeholder="enter the name you search"/>&nbsp;
                    <button onClick={this.searchIcon}>Search</button>
                </div>
            </section>
        );
    }
}

export default Search;
