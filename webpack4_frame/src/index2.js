import "./style.css";
import MyImage from './1.png';
import fuc from './tool/sum';

  let dom = document.querySelector('#root2');
  dom.innerHTML = "你fddsf好" + fuc(3, 4);
  dom.classList.add('hello');
  let img = new Image();
  img.src = MyImage;
  dom.appendChild(img);
