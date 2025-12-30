import * as THREE from 'three';
import { toWorldWidth, toWorldHeight, nearestPowerOfTwo, wrapText } from '../utils/TextPanelUtils';
import type { PanelSizingConfig } from '../utils/TextPanelUtils';
import { AnswerButtonTheme, drawRoundedRect, createVerticalGradient, applySoftShadow, resetShadow } from '../styles/Theme';

type AnswerFeedbackState = 'idle' | 'selected' | 'correct' | 'incorrect';

export class AnswerOption3D extends THREE.Mesh {
    private static readonly CANVAS_WIDTH = 420;
    private static readonly MIN_CANVAS_HEIGHT = 80;
    private static readonly H_PADDING = 36;
    private static readonly V_PADDING = 22;
    private static readonly LINE_HEIGHT = 32;
    private static readonly BASE_PLANE_WIDTH = 1.3;
    private static readonly BASE_PLANE_HEIGHT = 0.28;
    private static readonly MIN_WORLD_WIDTH = 0.65;

    private static readonly PANEL_CONFIG: PanelSizingConfig = {
        basePlaneWidth: AnswerOption3D.BASE_PLANE_WIDTH,
        basePlaneHeight: AnswerOption3D.BASE_PLANE_HEIGHT,
        canvasWidth: AnswerOption3D.CANVAS_WIDTH,
        minCanvasHeight: AnswerOption3D.MIN_CANVAS_HEIGHT,
        minWorldWidth: AnswerOption3D.MIN_WORLD_WIDTH
    };

    private canvas: HTMLCanvasElement;
    private texture: THREE.CanvasTexture;
    private label: string;
    private currentState: AnswerFeedbackState = 'idle';

    constructor(answer: string) {
        const canvas = document.createElement('canvas');
        canvas.width = AnswerOption3D.CANVAS_WIDTH;
        canvas.height = AnswerOption3D.MIN_CANVAS_HEIGHT;

        const { contentWidth, contentHeight } = AnswerOption3D.drawAnswer(canvas, answer, 'idle');
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const geometry = new THREE.PlaneGeometry(
            toWorldWidth(contentWidth, AnswerOption3D.PANEL_CONFIG),
            toWorldHeight(contentHeight, AnswerOption3D.PANEL_CONFIG)
        );
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });

        super(geometry, material);

        this.canvas = canvas;
        this.texture = texture;
        this.label = answer;
    }

    public setFeedbackState(state: AnswerFeedbackState): void {
        if (this.currentState === state) return;
        this.currentState = state;

        const oldWidth = this.canvas.width;
        const oldHeight = this.canvas.height;

        // Redraw with the new state
        AnswerOption3D.drawAnswer(this.canvas, this.label, state);

        // Check if canvas dimensions changed
        const dimensionsChanged = (oldWidth !== this.canvas.width || oldHeight !== this.canvas.height);

        if (dimensionsChanged) {
            // Dispose old texture and create new one
            this.texture.dispose();
            this.texture = new THREE.CanvasTexture(this.canvas);
            this.texture.needsUpdate = true;

            const material = this.material as THREE.MeshBasicMaterial;
            material.map = this.texture;
            material.needsUpdate = true;
        } else {
            // Just update existing texture
            this.texture.needsUpdate = true;
        }
    }

    public setAnswer(answer: string) {
        const oldWidth = this.canvas.width;
        const oldHeight = this.canvas.height;

        const { contentWidth, contentHeight } = AnswerOption3D.drawAnswer(this.canvas, answer, this.currentState);
        this.label = answer;

        // Check if canvas dimensions changed
        const dimensionsChanged = (oldWidth !== this.canvas.width || oldHeight !== this.canvas.height);

        if (dimensionsChanged) {
            // Dispose old texture and create new one
            this.texture.dispose();
            this.texture = new THREE.CanvasTexture(this.canvas);
            this.texture.needsUpdate = true;

            const material = this.material as THREE.MeshBasicMaterial;
            material.map = this.texture;
            material.needsUpdate = true;
        } else {
            // Just update existing texture
            this.texture.needsUpdate = true;
        }

        const newWidth = toWorldWidth(contentWidth, AnswerOption3D.PANEL_CONFIG);
        const newHeight = toWorldHeight(contentHeight, AnswerOption3D.PANEL_CONFIG);

        this.geometry.dispose();
        this.geometry = new THREE.PlaneGeometry(newWidth, newHeight);
    }

    public getLabel(): string {
        return this.label;
    }

    private static drawAnswer(
        canvas: HTMLCanvasElement,
        answer: string,
        state: AnswerFeedbackState
    ): { contentWidth: number; contentHeight: number } {
        const tempCtx = canvas.getContext('2d');
        if (!tempCtx) {
            throw new Error('Unable to acquire 2D context');
        }

        const theme = AnswerButtonTheme;
        tempCtx.font = theme.text.font;
        const maxTextWidth = this.CANVAS_WIDTH - this.H_PADDING * 2;
        const lines = wrapText(tempCtx, answer, maxTextWidth);
        const safeLineCount = Math.max(lines.length, 1);
        const widestLine = lines.reduce((max, line) => Math.max(max, tempCtx.measureText(line).width), 0);
        const contentWidth = Math.max(
            widestLine + this.H_PADDING * 2,
            this.CANVAS_WIDTH * 0.4
        );
        const contentHeight = safeLineCount * this.LINE_HEIGHT + this.V_PADDING * 2;
        const requiredHeight = nearestPowerOfTwo(
            Math.max(contentHeight, this.MIN_CANVAS_HEIGHT)
        );

        if (canvas.width !== this.CANVAS_WIDTH) {
            canvas.width = this.CANVAS_WIDTH;
        }
        if (canvas.height !== requiredHeight) {
            canvas.height = requiredHeight;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Unable to acquire 2D context after resize');
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const borderWidth = theme.border.width;
        const borderRadius = theme.borderRadius;
        const padding = borderWidth / 2 + 4; // Extra padding per ombra
        const rectX = padding;
        const rectY = padding;
        const rectWidth = canvas.width - padding * 2;
        const rectHeight = canvas.height - padding * 2;

        // Colors based on state
        let bgStart: string = theme.background.gradientStart;
        let bgEnd: string = theme.background.gradientEnd;
        let borderColor: string = theme.border.color;
        let textColor: string = theme.text.color;

        switch (state) {
            case 'selected':
                bgStart = theme.states.selected.background;
                bgEnd = '#5A1AA4'; // Darker purple
                borderColor = theme.states.selected.border;
                break;
            case 'correct':
                bgStart = theme.states.correct.background;
                bgEnd = '#00CC99';
                borderColor = theme.states.correct.border;
                textColor = theme.states.correct.textColor;
                break;
            case 'incorrect':
                bgStart = theme.states.incorrect.background;
                bgEnd = '#CC2255';
                borderColor = theme.states.incorrect.border;
                textColor = theme.states.incorrect.textColor;
                break;
        }

        // Background with gradient and pill borders
        const gradient = createVerticalGradient(ctx, canvas.height, bgStart, bgEnd);

        // Soft 3D shadow
        applySoftShadow(ctx, 'rgba(0, 0, 0, 0.35)', 12, 4);
        drawRoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, borderRadius);
        ctx.fillStyle = gradient;
        ctx.fill();
        resetShadow(ctx);

        // Gold border
        drawRoundedRect(ctx, rectX, rectY, rectWidth, rectHeight, borderRadius);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = borderWidth;
        ctx.stroke();

        // Text with light shadow
        ctx.font = theme.text.font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const totalTextHeight = (safeLineCount - 1) * this.LINE_HEIGHT;
        const startY = (canvas.height - totalTextHeight) / 2;

        lines.forEach((line, index) => {
            const y = startY + index * this.LINE_HEIGHT;

            // Text shadow
            ctx.fillStyle = theme.text.shadowColor;
            ctx.fillText(line, canvas.width / 2 + 1, y + 1);

            // Main text
            ctx.fillStyle = textColor;
            ctx.fillText(line, canvas.width / 2, y);
        });

        return { contentWidth, contentHeight };
    }

    public dispose(): void {
        this.geometry.dispose();
        this.texture.dispose();
        const material = this.material as THREE.MeshBasicMaterial;
        material.dispose();
    }
}