import * as THREE from 'three';
import { LogoPanelTheme, drawRoundedRect } from '../../styles/Theme';

/**
 * Pannello logo con bordi arrotondati e tema Brain Arena
 */
export class LogoPanel3D extends THREE.Mesh {
    private static readonly WIDTH = 1.2;
    private static readonly HEIGHT = 0.5;
    private static readonly CANVAS_WIDTH = 512;
    private static readonly CANVAS_HEIGHT = 256;

    private canvas: HTMLCanvasElement;
    private texture: THREE.CanvasTexture;

    constructor() {
        const canvas = document.createElement('canvas');
        canvas.width = LogoPanel3D.CANVAS_WIDTH;
        canvas.height = LogoPanel3D.CANVAS_HEIGHT;

        LogoPanel3D.drawPlaceholder(canvas);

        const texture = new THREE.CanvasTexture(canvas);
        const geometry = new THREE.PlaneGeometry(LogoPanel3D.WIDTH, LogoPanel3D.HEIGHT);
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

        super(geometry, material);

        this.canvas = canvas;
        this.texture = texture;
    }

    /**
     * Disegna solo i bordi arrotondati (senza riempimento)
     */
    private static drawBorder(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const theme = LogoPanelTheme;
        const padding = theme.border.width / 2;
        const rectX = padding;
        const rectY = padding;
        const rectWidth = canvas.width - theme.border.width;
        const rectHeight = canvas.height - theme.border.width;

        drawRoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, theme.border.radius);
        ctx.strokeStyle = theme.border.color;
        ctx.lineWidth = theme.border.width;
        ctx.stroke();
    }

    /**
     * Disegna il placeholder (usato quando non c'è immagine)
     */
    private static drawPlaceholder(canvas: HTMLCanvasElement): void {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const theme = LogoPanelTheme;
        const padding = theme.border.width / 2;
        const rectX = padding;
        const rectY = padding;
        const rectWidth = canvas.width - theme.border.width;
        const rectHeight = canvas.height - theme.border.width;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Sfondo con gradiente e bordi arrotondati
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, theme.background.gradientStart);
        gradient.addColorStop(1, theme.background.gradientEnd);

        drawRoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, theme.border.radius);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bordo
        this.drawBorder(canvas);

        // Testo placeholder
        ctx.font = 'bold 52px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Ombra testo
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillText('BRAIN ARENA', canvas.width / 2 + 2, canvas.height / 2 + 2);

        // Testo principale in oro
        ctx.fillStyle = '#FFC93C';
        ctx.fillText('BRAIN ARENA', canvas.width / 2, canvas.height / 2);

        ctx.font = '18px sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText('AR Quiz Challenge', canvas.width / 2, canvas.height / 2 + 42);
    }

    /**
     * Carica un'immagine e la disegna con bordi arrotondati
     */
    public setLogoImage(imageUrl: string): void {
        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            const ctx = this.canvas.getContext('2d');
            if (!ctx) return;

            const theme = LogoPanelTheme;
            const padding = theme.border.width;
            const rectX = padding;
            const rectY = padding;
            const rectWidth = this.canvas.width - padding * 2;
            const rectHeight = this.canvas.height - padding * 2;

            // Pulisci canvas
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Crea clipping path con bordi arrotondati
            ctx.save();
            drawRoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, theme.border.radius);
            ctx.clip();

            // Disegna l'immagine dentro il clipping path (scala per riempire)
            ctx.drawImage(img, rectX, rectY, rectWidth, rectHeight);
            ctx.restore();

            // Disegna il bordo sopra l'immagine
            LogoPanel3D.drawBorder(this.canvas);

            // Aggiorna la texture
            this.texture.needsUpdate = true;
        };

        img.onerror = () => {
            console.warn(`Impossibile caricare il logo: ${imageUrl}`);
        };

        img.src = imageUrl;
    }

    public dispose(): void {
        this.geometry.dispose();
        const material = this.material as THREE.MeshBasicMaterial;
        material.map?.dispose();
        material.dispose();
    }
}