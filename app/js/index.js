import * as THREE from "three";
import dat from "dat.gui";
import OrbitControls from "three-orbitcontrols";

let renderer, scene, camera, gui, sphere, controller, cylinder, cube, floor, light, step = 0;

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor("#16161d");
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  window.camera = camera;
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);
  scene.add(camera);

  let axes = new THREE.AxesHelper(30);
  scene.add(axes);

  light = new THREE.PointLight("#fff");
  light.position.set(15, 30, 0);
  light.castShadow = true;
  light.shadow.mapSize.width = 2048;
  light.shadow.mapSize.height = 2048;
  scene.add(light);

  const lightHelper = new THREE.PointLightHelper(light);
  scene.add(lightHelper);

  let floorMaterial = new THREE.MeshLambertMaterial({
    color: "#cfe8dc"
  })
  let floorGeometry = new THREE.BoxGeometry(60, 0.1, 20);
  floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.position.x = 15;
  floor.castShadow = true;
  floor.receiveShadow = true;
  scene.add(floor);

  let cubeMaterial = new THREE.MeshLambertMaterial({
    color: "#ff8f00",
    // wireframe: true
  });
  let cubeGeometry = new THREE.CubeGeometry(4, 4, 4);
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -4;
  cube.position.y = 4;
  cube.castShadow = true;
  cube.receiveShadow = true;
  scene.add(cube);

  // let cylinderMaterial = new THREE.MeshBasicMaterial( { color: "#ff7221", wireframe: true } );
  // let cylinderGeometry = new THREE.CylinderGeometry(5, 0.5, 10, 32);
  // cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  // cylinder.position.x = -4;
  // cylinder.position.y = 4;
  // cylinder.castShadow = true;
  // cylinder.receiveShadow = true;
  // scene.add(cylinder);

  let sphereMaterial = new THREE.MeshLambertMaterial({ color: "#3a5f0b"});
  let sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
  sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.x = 10;
  sphere.position.y = 5;
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  scene.add(sphere);

  document.querySelector('#output').appendChild(renderer.domElement);
  renderer.render(scene, camera);
  animate();
}

function animate() {

  light.position.x = controller.lightX;
  step += controller.bouncingSpeed;
  cube.rotation.x += controller.rotationSpeed;
  cube.rotation.y += controller.rotationSpeed;
  cube.rotation.z += controller.rotationSpeed;

  sphere.position.x = 20 + 10 * Math.cos(step);
  sphere.position.y = 5 + 10 * Math.abs(Math.sin(step));

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function Controller() {
  this.rotationSpeed = 0.02;
  this.bouncingSpeed = 0.02;
  this.lightX = 15;
}

function addGui() {
  controller = new Controller();

  gui = new dat.GUI();
  gui.add(controller, "rotationSpeed", 0, 0.2);
  gui.add(controller, "bouncingSpeed", 0, 0.2);
  gui.add(controller, "lightX", -50, 50);
}

function addOrbitControls() {
  const controls = new OrbitControls(camera, renderer.domElement);
}

addGui();
init();
window.addEventListener("resize", onResize);
addOrbitControls();
