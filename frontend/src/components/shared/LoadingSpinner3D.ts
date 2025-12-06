import * as THREE from 'three';

export class LoadingSpinner3D extends THREE.Group {
    private readonly ring: THREE.Mesh;

    constructor() {
        super();
        const geometry = new THREE.TorusGeometry(0.08, 0.02, 16, 48);
        const material = new THREE.MeshStandardMaterial({ color: 0x00bcd4, emissive: 0x004b5f });
        this.ring = new THREE.Mesh(geometry, material);
        this.add(this.ring);
        this.visible = false;
    }

    public tick(delta: number): void {
        if (!this.visible) {
            return;
        }
        this.ring.rotation.z += delta * Math.PI;
    }

    public show(position: THREE.Vector3): void {
        this.position.copy(position);
        this.visible = true;
    }

    public hide(): void {
        this.visible = false;
    }

    public dispose(): void {
        this.ring.geometry.dispose();
        (this.ring.material as THREE.Material).dispose();
    }
}