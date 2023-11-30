import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import TWEEN from '@tweenjs/tween.js'

const scene1 = new THREE.Scene();

const container = document.querySelector('[class*="3D1"]');
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

const camera1 = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(containerWidth, containerHeight);
container.appendChild(renderer.domElement);

// adjust the aspect ratio when the window is resized
window.addEventListener('resize', () => {
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;

  // Update the camera's aspect ratio and renderer's size
  camera1.aspect = newWidth / newHeight;
  camera1.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});


let loadedModel;
const loader = new GLTFLoader();


const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color and intensity
directionalLight.position.set(0, 1, 0); // Position the light
scene1.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Color and intensity

const cubeMap = new THREE.CubeTextureLoader()
  .setPath('./public/cubemap/')
  .load([
    'px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png'
  ]);
scene1.add(ambientLight);

camera1.position.z = 10;

///////

loader.load('./public/iconsgradient.glb', (gltf) => {
  loadedModel = gltf.scene;

  // Create a material for the cube
  const cubeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x000000, // Adjust the cube color as needed
    transparent: true,
    opacity: 0.8,
    reflectivity: 1,
    clearcoat: 1,
  });

  // Create a material for the text
  const textMaterial = new THREE.MeshPhysicalMaterial({
    envMap: cubeMap,
    envMapIntensity: 1,
  });

  // Traverse the loadedModel's children (meshes) and apply materials accordingly
  loadedModel.traverse((child) => {
    if (child.isMesh) {
      if (child.name === 'Cube002') {
        child.material = cubeMaterial;
      } else {
        child.material = textMaterial;
      }
    }
  });

  scene1.add(loadedModel);

  // Assuming 'loadedModel' is your 3D model object
  const originalPosition = new THREE.Vector3(0, 0, 0);
  const pushDistance = 2;


  const canvas = document.querySelector('canvas');

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseout', onMouseOut)
  let animationInProgress;

  function onMouseMove(event) {
    if (loadedModel) {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      // Calculate the new position based on mouse position and push distance
      const newPosition = new THREE.Vector3(
        originalPosition.x + mouseX * pushDistance,
        originalPosition.y + mouseY * pushDistance,
        originalPosition.z
      );

      // Update the position of the loadedModel
      loadedModel.position.copy(newPosition);
      animateModel(newPosition, 0.5, TWEEN.Easing.Elastic.In)
    }
  }

  function onMouseOut(event) {
    loadedModel.position.copy(originalPosition);
    animateModel(originalPosition, 0.5, TWEEN.Easing.Elastic.Out)
  }

  function animateModel(newPosition, duration, easingFunction) {
    animationInProgress = true;

    // new TWEEN(loadedModel.position)
    //   .to(newPosition, duration) // Adjust the duration as needed
    //   .easing(easingFunction) // Use the specified easing function
    //   .onComplete(() => {
    //     animationInProgress = false;
    //   })
    //   .start();
  }

});


function animate() {
  requestAnimationFrame(animate);

  // loadedModel.rotation.x += 0.01;
  // loadedModel.rotation.y += 0.01;

  renderer.render(scene1, camera1);
}

animate();
