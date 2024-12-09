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
    axes: false, // 座標軸
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
  // 第1のレンダラ
  const nameHeight = document.getElementById("output1").clientHeight;
  const renderer = new THREE.WebGLRenderer();
  {
    renderer.setClearColor(0x204060);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      0.7*window.innerWidth,
      0.5*window.innerWidth);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.zIndex = 1;
    renderer.domElement.style.top = nameHeight;
  }
  // 第2のレンダラ
  const renderer2 = new THREE.WebGLRenderer();
  {
    renderer2.setClearColor(0x204060);
    renderer2.setPixelRatio(window.devicePixelRatio);
    renderer2.setSize(
      0.3*window.innerWidth,
      0.6*window.innerWidth);
    renderer2.domElement.style.position = "absolute";
    renderer2.domElement.style.zIndex = 1;
    renderer2.domElement.style.top = nameHeight;
  }

  // カメラの作成
  const camera = new THREE.PerspectiveCamera(
    50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0,10,20);
  camera.lookAt(0,-5,-10);
  // 第2のカメラ
  const camera2 = new THREE.PerspectiveCamera(
    100, 1/2, 0.1, 1000);
    {
    camera2.position.set(0,15,5);
    camera2.lookAt(0,0,-10);
    }

  // カメラ制御
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDumping = true;
  orbitControls.target.set(0, -2, -20);
  //orbitControls.minAzimuthAngle = -Math.PI/2;
  //orbitControls.maxAzimuthAngle = Math.PI/2;
  const orbitControls2 = new OrbitControls(camera2, renderer2.domElement);
  orbitControls2.enableDumping = true;
  //orbitControls2.target.set(0, 0, -10);
  //orbitControls2.minAzimuthAngle = -Math.PI/2;
  //orbitControls2.maxAzimuthAngle = Math.PI/2;

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
    
  wallMaterial.color.setRGB(0.02, 0.02, 0.02);
  scene.add(wall);
  

  //手すり
  const stick=new THREE.Group;
  const stickGeomrtry=new THREE.TorusGeometry( 11, 0.1, 8, 30, Math.PI); 
  const stickMaterial=new THREE.MeshLambertMaterial({color:'white'});
  const stick1=new THREE.Mesh(stickGeomrtry,stickMaterial);
  stick1.rotation.x=-Math.PI/2;
  
  stick.add(stick1);
  for (let i = 0; i < 9; i++) {
    const angle = (i/16) * -Math.PI * 2;
    const x = 11 * Math.cos(angle);
    const z = 11 * Math.sin(angle);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3, 16),
                              new THREE.MeshLambertMaterial({ color: 'white'}));
    pole.position.set(x, -1.5, z);
    pole.rotation.y = -angle;
    stick.add(pole);
  }
  stick.position.y=-4;
  stick.position.z=10;
  scene.add(stick);

  //客
  function makeDummy(color) {
    const dummy = new THREE.Group();
    {
      const dhead = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 12, 12),
        new THREE.MeshLambertMaterial({color: color})
      )
      dummy.add(dhead);
      const dbody = new THREE.Mesh(
        new THREE.CylinderGeometry(0.2, 0.2, 0.3, 12, 1),
        new THREE.MeshLambertMaterial({color: color})
      )
      dbody.position.set(0, -0.3, 0);
      dummy.add(dbody);
      const dleg = new THREE.Mesh(
        new THREE.CylinderGeometry(0.15, 0.15, 0.3, 12, 1),
        new THREE.MeshLambertMaterial({color: color})
      )
      dleg.position.set(0, -0.6, 0);
      dummy.add(dleg);
    }
    return dummy;
  }
  const as=new THREE.Group;

  const a = makeDummy("red");
  a.scale.set(2.5, 3.5, 2.5);
  a.position.set(3,-6,-7);
  as.add(a);
  const a2 = makeDummy("red");
  a2.scale.set(2, 3, 2);
  a2.position.set(5,-6,-7);
  as.add(a2);
  const a3 = makeDummy("red");
  a3.scale.set(2.5, 3.5, 2.5);
  a3.position.set(-7,-6,-7);
  as.add(a3);
  const a4 = makeDummy("red");
  a4.scale.set(3, 4, 3);
  a4.position.set(4,-3.5,1.5);
  as.add(a4);
  const a5 = makeDummy("red");
  a5.scale.set(3, 4, 3);
  a5.position.set(-2,-3.5,0.7);
  as.add(a5);

  scene.add(as);

  //立ち位置
  
  const stands_1 = new THREE.Group();
  const standGeometry=new THREE.PlaneGeometry(1,1);
  const standMaterial=new THREE.MeshBasicMaterial({color : 'white'});

  for(let r=-2;r<3;r++){
    const stand=new THREE.Mesh(standGeometry,standMaterial);
    stand.position.set(r*5,7,-7.98);
    stands_1.add(stand);
  }
  stands_1.rotation.x=-Math.PI/2;
  scene.add(stands_1);

  const stands_2 = new THREE.Group();
  
  for (let i = 0; i < 5; i++) {
    const p = (i/8) * Math.PI * 2;
    const x = 10 * Math.cos(p);
    const z = 10 * Math.sin(p);
    const stand_2 = new THREE.Mesh(standGeometry,standMaterial);
    stand_2.position.set(x, z-10, -5.74);
    //stand_2.rotation.y = -p;
    stands_2.add(stand_2);
  }
  stands_2.rotation.x=-Math.PI/2;
  scene.add(stands_2);
  // 自分の生成
  const avatar = makeDummy("white");
  setAvatar(
    new THREE.Vector3(0,
      -3,
      0)
    );
  avatar.scale.set(3, 4, 3);
  scene.add(avatar);

  // 自分の移動
  function setAvatar(position){
    avatar.position.copy(position);
    camera.position.set(avatar.position.x,avatar.position.y,avatar.position.z);
    //camera.lookAt(0,-10,-20);
    camera.updateProjectionMatrix();
  }

  // シート選択のための設定
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  function onMouseDown(event) {
    // マウスの位置を±1の範囲に変換
    mouse.x = (event.clientX / window.innerWidth - 0.7) * 20 / 3 - 1;
    if (mouse.x < -1) {
      mouse.x = -1;
    }
    mouse.y = -(event.clientY / (window.innerWidth*0.6)) * 2 + 1;
    // 光線を発射
    raycaster.setFromCamera(mouse, camera2);
    // 全ての座席について
    stands_1.children.forEach((stand) => {
      //マウスが指しているか確認
      const intersects = raycaster.intersectObject(stand, true);
      if( intersects.length > 0) {
        //指していたら、　その位置にマーカを設置
        const position = new THREE.Vector3(stand.position.x, stand.position.y-12.5, stand.position.z+1);
        setAvatar(position);
      }
    });
    stands_2.children.forEach((stand_2) => {
      //マウスが指しているか確認
      const intersects_2 = raycaster.intersectObject(stand_2, true);
      if( intersects_2.length > 0) {
        //指していたら、　その位置にマーカを設置
        const position_2 = new THREE.Vector3(stand_2.position.x, -3, -stand_2.position.y);
        setAvatar(position_2);
      }
    });
  }
  window.addEventListener("mousedown", onMouseDown, false);


  // 水槽
const glass = new THREE.Mesh(
  new THREE.BoxGeometry(20, 12, 4),  
  new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 })
);
glass.position.z=-10;
scene.add(glass);

const tankwall=new THREE.Group;
const tankMaterial=new THREE.MeshLambertMaterial({ color:'blue', side: THREE.DoubleSide});
//奥
const tankwall1 = new THREE.Mesh(
  new THREE.PlaneGeometry(24,12.02),
  tankMaterial
);
tankwall1.position.z=-30;
tankwall.add(tankwall1);
//左
const tankwall2 = new THREE.Mesh(
  new THREE.PlaneGeometry(20,12.02),
  tankMaterial
);
tankwall2.rotation.y=Math.PI/2;
tankwall2.position.x=-12;
tankwall2.position.z=-20;
tankwall.add(tankwall2);
//右
const tankwall3= new THREE.Mesh(
  new THREE.PlaneGeometry(20,12.02),
  tankMaterial
);
tankwall3.rotation.y=Math.PI/2;
tankwall3.position.x=12;
tankwall3.position.z=-20;
tankwall.add(tankwall3);
//床
const tankwall4 = new THREE.Mesh(
  new THREE.PlaneGeometry(24,24),
  tankMaterial
);
tankwall4.rotation.x=Math.PI/2;
tankwall4.position.y=-6.01;
tankwall4.position.z=-22;
tankwall.add(tankwall4);
//天井
const tankwall5 = new THREE.Mesh(
  new THREE.PlaneGeometry(24,24),
  tankMaterial
);
tankwall5.rotation.x=Math.PI/2;
tankwall5.position.y=6.01;
tankwall5.position.z=-22;
tankwall.add(tankwall5);

tankMaterial.color.setRGB(0.3, 0.4, 0.9);

scene.add(tankwall);

//岩
const rock=new THREE.Group;

const rockShape_1 = new THREE.Shape([
  new THREE.Vector2(-3, -3),
  new THREE.Vector2(-2, -2.3),
  new THREE.Vector2(-1, -2.3),
  new THREE.Vector2(0, -1),
  new THREE.Vector2(1, -1),
  new THREE.Vector2(1, -3),
]);

const rockGeometry_1 = new THREE.ShapeGeometry(rockShape_1);
const rockMaterial_1 = new THREE.MeshLambertMaterial({color:'white',side: THREE.DoubleSide});
rockMaterial_1.color.setRGB(0.53, 0.53, 0.53);
const rock1 = new THREE.Mesh(rockGeometry_1, rockMaterial_1);
rock1.scale.set(2, 2, 2); 
rock1.position.set(10, 0, -20); 

rock.add(rock1);

const rockShape_2 = new THREE.Shape([
  new THREE.Vector2(3, -3),
  new THREE.Vector2(2, -2.3),
  new THREE.Vector2(1, -2.3),
  new THREE.Vector2(0, -1),
  new THREE.Vector2(-1, -1),
  new THREE.Vector2(-1, -3),
]);

const rockGeometry_2 = new THREE.ShapeGeometry(rockShape_2);
const rockMaterial_2 = new THREE.MeshLambertMaterial({color:'white',side: THREE.DoubleSide});
rockMaterial_2.color.setRGB(0.63, 0.63, 0.7);
const rock2 = new THREE.Mesh(rockGeometry_2, rockMaterial_2);
rock2.scale.set(3, 3, 3); 
rock2.position.set(-10, 3, -25); 

rock.add(rock2);

scene.add(rock);


//魚影作成
function FishShadow() {
  // 背中
  const top = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(-1, 0),
    new THREE.Vector2(0, 0.5),
    new THREE.Vector2(1, 0)
  );
  // 腹
  const under = new THREE.QuadraticBezierCurve(
    new THREE.Vector2(1, 0),
    new THREE.Vector2(0, -0.3),
    new THREE.Vector2(-1, 0)
  );

  const topPoints = top.getPoints(20);
  const underPoints = under.getPoints(20);
  
  const Points=topPoints.concat(underPoints);
  const fishShape = new THREE.Shape(Points);

  fishShape.moveTo(1, 0)
  fishShape.lineTo(1.3, 0.3),
  fishShape.lineTo(1.3, -0.3),
  fishShape.lineTo(1, 0)
  
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
  fish.position.y=i*(Math.random()*2);
  fish.position.x=(Math.random()*20);
  fishs1.add(fish);
};
fishs1.position.z = -20;
scene.add(fishs1);
// 魚のアニメーション関数
function animateFish() {
  fishs1.position.x -= 0.06;
  if (fishs1.position.x < -40) {
    fishs1.position.x = 40;
    fishs1.scale.setScalar(Math.random() * 0.5 + 0.5);
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
fishs2.position.z = -8.1;
scene.add(fishs2);
// 魚のアニメーション
function animateFish2() {
  fishs2.position.x -= 0.1;
  if (fishs2.position.x < -20) {
    fishs2.position.x = 20;
    fishs2.scale.setScalar(0.5); // 大きさをランダムに変更
  }
}

//旋回する魚群
const fishs3=new THREE.Group;

  // レンダラーの配置
  document.getElementById("output1").appendChild(renderer.domElement);
  document.getElementById("output2").appendChild(renderer2.domElement);

  // Windowサイズの変更処理
  window.addEventListener("resize", ()=>{
    camera.updateProjectionMatrix();
    camera2.updateProjectionMatrix();
    renderer.setSize(0.7*window.innerWidth, 0.5*window.innerWidth);
    renderer2.setSize(0.3*window.innerWidth, 0.6*window.innerWidth);
  }, false);

//scene.position.z=20;
  // 描画関数
  function render() {
    // 座標軸の表示
    axes.visible = param.axes;
    orbitControls.update();
    // 魚の動き
    animateFish();
    animateFish2();

    renderer.render(scene, camera);
    renderer2.render(scene, camera2);

    requestAnimationFrame(render);
  }

  // 描画開始
  requestAnimationFrame(render);
}

init();