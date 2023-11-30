import * as THREE from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const container = document.getElementById('hero3D')

const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setSize( container.clientWidth, container.clientHeight );
container.appendChild( renderer.domElement );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Choose the shadow type you prefer

window.addEventListener('resize', () => {
  const newWidth = container.clientWidth;
  const newHeight = container.clientHeight;

  // Update the camera's aspect ratio and renderer's size
  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(newWidth, newHeight);
});


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 50, container.clientWidth / container.clientHeight, 1, 10000 );
//const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 0, 10, 100 );
//controls.update();

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Color and intensity
//const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
directionalLight.position.set(0, 10, 30); // Position the directionalLightlight
directionalLight.castShadow = true;
scene.add(directionalLight);
// scene.add(helper)

directionalLight.shadow.mapSize.width = 512; 
directionalLight.shadow.mapSize.height = 512; 
directionalLight.shadow.camera.near = 0.3; 
directionalLight.shadow.camera.far = 1000; 
directionalLight.shadow.camera.left = -50; // Adjust as needed
directionalLight.shadow.camera.right = 50; // Adjust as needed
directionalLight.shadow.camera.top = 50; // Adjust as needed
directionalLight.shadow.camera.bottom = -50; // Adjust as needed



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


const cubeMap2 = new THREE.CubeTextureLoader()
.setPath('./public/cubemap2/')
.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
]);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 ); 
const material = new THREE.MeshPhysicalMaterial( { 
    reflectivity: 1,
    clearcoat: 1, 
    transparent: true, 
    opacity: 0.8,
    envMap: cubeMap,
    envMapIntensity: 1,
 } ); 
const torus = new THREE.Mesh( geometry, material ); 
scene.add(torus)
torus.castShadow = true;
torus.position.z += 10;
torus.position.y += 10;

const geometryCube = new THREE.BoxGeometry( 15, 15, 15 ); 
const materialCube = new THREE.MeshStandardMaterial( {
  color: 0xa3a3a3,
  emissive: 0x575757,
  roughness: 0,
  metalness: 1,
  envMap: cubeMap2,
  envMapIntensity: 2,
} ); 
const cube = new THREE.Mesh( geometryCube, materialCube ); 
scene.add( cube );
cube.castShadow = true;
cube.position.x += 20 ;
cube.position.z -= 15 ;
cube.position.y -= 5 ;

const planeGeometry = new THREE.PlaneGeometry( 100, 100, 112, 112 );
const planeMaterial = new THREE.ShadowMaterial( { 
 } )
// const planeMaterial = new THREE.MeshPhysicalMaterial({color: 0xffffff})
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.rotation.x = 0;
plane.position.z -= 30; 
scene.add( plane );



function animate() {

	requestAnimationFrame( animate );
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    cube.rotation.x -= 0.01;
    cube.rotation.y -= 0.02;

    //controls.update();
	renderer.render( scene, camera );

}
animate()
