import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "./style.css";
import MyImage from './1.png';
// import fuc from './tool/sum';

  // let domele = document.querySelector('#root1');
  // let str = 213;

  // domele.innerHTML = `${str}你好`;
  // domele.classList.add('hello');
  // let img = new Image();
  // img.src = MyImage;
  // domele.appendChild(img);
  // let oDiv = document.createElement('div');
  
  // img.onclick = (e) =>{
  //   //懒加载 哪里有  哪里加载  import导入的是一个promise,通过resolve.default获取实际导出的值
  //   import('./tool/sum').then(ele=>{
  //     let data = ele.default;
  //     console.log(data);
  //     oDiv.innerHTML = data(111,111) + '';
  //     domele.appendChild(oDiv);
  //   })
  // }
class Mybox extends Componnet{
  render(){
    return(
      <div className="hello">
        <img src="MyImage"></img>
        <span>你好啊！！！</span>    
      </div>
    );
  }
}
  ReactDOM.render(<Mybox />, document.getElementById('root1'));