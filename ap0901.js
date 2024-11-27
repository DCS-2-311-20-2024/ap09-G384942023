//
// 応用プログラミング 第9,10回 自由課題 (ap0901.js)
// G384942023 村上瑛
//
"use strict"; // 厳格モード

// ライブラリをモジュールとして読み込む
import * as THREE from "three";
import { OrbitControls } from "three/addons";
import { GUI } from "ili-gui";

// ３Ｄページ作成関数の定義
function init() {
  // 制御変数の定義
  const param = {
    axes: true, // 座標軸
  };
  
  // シーン作成
  const scene = new THREE.Scene();

  // GUIコントローラの設定
  const gui = new GUI();
  gui.add(param, "axes").name("座標軸");

  // 座標軸の設定
  const axes = new THREE.AxesHelper(18);
  scene.add(axes);
  
  // レンダラの設定
  const renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, innerHeight);
    document.getElementById("output").appendChild(renderer.domElement);


  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(10,20,30);
  camera.lookAt(0,0,0);

  // カメラ制御
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDumping = true;
  orbitControls.minAzimuthAngle = -Math.PI/2;
  orbitControls.maxAzimuthAngle = Math.PI/2;

  //光
  const dirLight = new THREE.DirectionalLight(0xffffff, 5);
  dirLight.position.set(0, 13, -11);
  dirLight.castShadow = true;
  scene.add(dirLight);
  const light2 = new THREE.AmbientLight('white', 1);//環境光
  scene.add(light2);

  //水族館
  const wall=new THREE.Group;
  const wallGeometry1=new THREE.BoxGeometry(5,16,4.5);
  const wallMaterial=new THREE.MeshLambertMaterial({ color:'gray'});

  const wall1=new THREE.Mesh(wallGeometry1,wallMaterial);
  wall1.position.x=12.5;
  wall1.position.z=-10;
  wall.add(wall1);
  const wall2=new THREE.Mesh(wallGeometry1,wallMaterial);
  wall2.position.x=-12.5;
  wall2.position.z=-10;
  wall.add(wall2);

  const wallGeometry2=new THREE.BoxGeometry(20,2,4.5);
  const wall3=new THREE.Mesh(wallGeometry2,wallMaterial);
  wall3.position.y=7;
  wall3.position.z=-10;
  wall.add(wall3);
  const wall4=new THREE.Mesh(wallGeometry2,wallMaterial);
  wall4.position.y=-7;
  wall4.position.z=-10;
  wall.add(wall4);

  const wallGeometry3=new THREE.BoxGeometry(4,16,24.5);
  const wall5=new THREE.Mesh(wallGeometry3,wallMaterial);
  wall5.position.x=17;
  wall.add(wall5);
  const wall6=new THREE.Mesh(wallGeometry3,wallMaterial);
  wall6.position.x=-17;
  wall.add(wall6);

  const wallGeometry4=new THREE.BoxGeometry(30,4.5,24.5);
  const wall7=new THREE.Mesh(wallGeometry4,wallMaterial);
  wall7.position.y=-10.25;
  wall.add(wall7);

  const wallGeometry5=new THREE.CylinderGeometry(12,12,4.5,30,1);
  const wall8=new THREE.Mesh(wallGeometry5,wallMaterial);
  wall8.position.y=-8;
  wall8.position.z=10;
  wall.add(wall8);
  const wallGeometry6=new THREE.BoxGeometry(30,4.5,4.5);
  const wall9=new THREE.Mesh(wallGeometry6,wallMaterial);
  wall9.position.y=-8.001;
  wall9.position.z=10;
  wall.add(wall9);

  // 影の設定
    wall.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
    
  scene.add(wall);
  

  // 水槽
const tank = new THREE.Mesh(
  new THREE.BoxGeometry(20, 12, 4),  
  new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 })
);
tank.position.z=-10;
scene.add(tank);

const tankwall=new THREE.Group;
const tankwall1 = new THREE.Mesh(
  new THREE.PlaneGeometry(20,12),
  new THREE.MeshLambertMaterial({ color:'white'})
);
tankwall1.position.z=-20;
tankwall.add(tankwall1);

const tankwall2 = new THREE.Mesh(
  new THREE.PlaneGeometry(20,12),
  new THREE.MeshLambertMaterial({ color:'white'})
);
tankwall2.rotation.y=Math.PI;
//tankwall2.position.x=-6;
tankwall1.position.z=-15;
tankwall.add(tankwall2);


scene.add(tankwall);


//魚影作成
function FishShadow() {
  // 背中の曲線
  const backCurve = new THREE.QuadraticBezierCurve(
    new THREE.Vector3(-1, 0,0), // 頭
    new THREE.Vector3(0, 0.5,0), // 背中
    new THREE.Vector3(1, 0,0) // 尾
  );

  // 腹の曲線
  const bellyCurve = new THREE.QuadraticBezierCurve(
    new THREE.Vector3(1, 0,0), // 尾
    new THREE.Vector3(0, -0.3,0), // 腹
    new THREE.Vector3(-1, 0,0) // 頭
  );

  // 曲線から頂点を取得
  const backPoints = backCurve.getPoints(20); // 背中の点
  const bellyPoints = bellyCurve.getPoints(20); // 腹の点

  // 頂点リストを結合
  const fishShape = new THREE.Shape([...backPoints, ...bellyPoints]);

  // 尻尾の形（三角形）
  fishShape.moveTo(1, 0); // 尾の基点
  fishShape.lineTo(1.3, 0.3); // 尾の上端
  fishShape.lineTo(1.3, -0.3); // 尾の下端
  fishShape.lineTo(1, 0); // 尾の基点
  
  const fishMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide
  });

  // 影を生成
  const fishGeometry = new THREE.ShapeGeometry(fishShape);
  const fishShadow = new THREE.Mesh(fishGeometry, fishMaterial);

  fishShadow.castShadow = true;
  return fishShadow;
}

// 魚影追加
const fishs1=new THREE.Group;

for(let i=-2;i<3;i++){
  const fish = FishShadow()
  fish.position.z = -8.1;
  fish.position.y=i*(Math.random()*2);
  fish.position.x=(Math.random()*20);
  fishs1.add(fish);
};
scene.add(fishs1);
// 魚のアニメーション関数
function animateFish() {
  fishs1.position.x -= 0.06;
  if (fishs1.position.x < -40) {
    fishs1.position.x = 40;
    fishs1.scale.setScalar(Math.random() * 0.5 + 0.5); // 大きさをランダムに変更
  }
}

const fishs2=new THREE.Group;

for(let i=-5;i<6;i++){
  const fish2 = FishShadow()
  fish2.position.z = -9;
  fish2.position.y=i*(Math.random()*2);
  fish2.position.x=(Math.random()*10);
  fishs2.add(fish2);
};
scene.add(fishs2);
// 魚のアニメーション
function animateFish2() {
  fishs2.position.x -= 0.1;
  if (fishs2.position.x < -20) {
    fishs2.position.x = 20;
    fishs2.scale.setScalar(0.5); // 大きさをランダムに変更
  }
}

  // 描画関数
  function render() {
    // 座標軸の表示
    axes.visible = param.axes;
    orbitControls.update();
    // 魚の動き
    animateFish();
    animateFish2();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  // 描画開始
  requestAnimationFrame(render);
}

init();