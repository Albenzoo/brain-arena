import './style.css';
import * as THREE from 'three';
import { MainScene } from './core/scenes/MainScene';



const container = document.querySelector('#app');
if (!container) {
  throw new Error("#app element not found in the DOM. Make sure it exists.");
}

// main scena instance
const mainScene = new MainScene(container, animate);
const clock = new THREE.Clock();
// Funzione di animazione da passare alla scena
function animate(): void {
  const delta = clock.getDelta();
  if (mainScene) {
    mainScene.update(delta);
    mainScene.renderer.render(mainScene.scene, mainScene.camera);
  }
}