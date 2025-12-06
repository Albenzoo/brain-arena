import * as THREE from 'three';
import { setupRightController } from '../controller/RightControllerHandler';
import { setupLeftController } from '../controller/LeftControllerHandler';


export class InteractionManager {
    private raycaster = new THREE.Raycaster();
    private mouse = new THREE.Vector2();
    private tempMatrix = new THREE.Matrix4();
    private rightController: THREE.Group | null = null;
    private leftController: THREE.Group | null = null;
    private onSelectCallback: ((object: THREE.Object3D) => void) | null = null;
    private interactiveObjects: THREE.Object3D[] = [];
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.Camera;
    private scene: THREE.Scene;

    constructor(
        renderer: THREE.WebGLRenderer,
        camera: THREE.Camera,
        scene: THREE.Scene
    ) {
        this.renderer = renderer;
        this.camera = camera;
        this.scene = scene;
        this.raycaster.far = 5;
        this.initializeControllers();
        this.setupMouseInteraction();
    }

    public onObjectSelected(callback: (object: THREE.Object3D) => void): void {
        this.onSelectCallback = callback;
    }

    public setInteractiveObjects(objects: THREE.Object3D[]): void {
        this.interactiveObjects = objects;
    }

    private initializeControllers(): void {
        // Right Controller
        const rawRight = this.renderer.xr.getController(0);
        this.rightController = setupRightController(rawRight);
        (this.rightController as THREE.XRTargetRaySpace).addEventListener('selectstart', this.onSelectStart);
        this.scene.add(this.rightController);

        // Left Controller
        const rawLeft = this.renderer.xr.getController(1);
        this.leftController = setupLeftController(rawLeft);
        (this.leftController as THREE.XRTargetRaySpace).addEventListener('selectstart', this.onSelectStart);
        this.scene.add(this.leftController);
    }

    private setupMouseInteraction(): void {
        window.addEventListener('click', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);

            // For mouse, we also check children (recursive = true)
            // because we might click on a mesh inside a group
            this.checkIntersection(this.interactiveObjects, true);
        });
    }

    private onSelectStart = (event: THREE.Event): void => {
        const controller = event.target as THREE.Object3D;
        this.tempMatrix.identity().extractRotation(controller.matrixWorld);
        this.raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
        this.raycaster.ray.direction.set(0, 0, -1).applyMatrix4(this.tempMatrix);

        this.checkIntersection(this.interactiveObjects, false);
    };

    private checkIntersection(objects: THREE.Object3D[], recursive: boolean): void {
        if (objects.length === 0) return;

        const intersects = this.raycaster.intersectObjects(objects, recursive);
        if (intersects.length > 0 && this.onSelectCallback) {
            // Go up to the parent object if necessary (useful if the interactive object is a Group)
            // In our case AnswerOption3D is a Mesh, so intersects[0].object is fine
            this.onSelectCallback(intersects[0].object);
        }
    }
}