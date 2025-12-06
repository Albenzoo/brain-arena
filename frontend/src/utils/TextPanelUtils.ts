export interface PanelSizingConfig {
    basePlaneWidth: number;
    basePlaneHeight: number;
    canvasWidth: number;
    minCanvasHeight: number;
    minWorldWidth: number;
}

export function toWorldWidth(pixelWidth: number, cfg: PanelSizingConfig): number {
    const pixelToWorld = cfg.basePlaneWidth / cfg.canvasWidth;
    return Math.max(cfg.minWorldWidth, pixelWidth * pixelToWorld);
}

export function toWorldHeight(pixelHeight: number, cfg: PanelSizingConfig): number {
    const pixelToWorld = cfg.basePlaneHeight / cfg.minCanvasHeight;
    return Math.max(cfg.basePlaneHeight, pixelHeight * pixelToWorld);
}

export function nearestPowerOfTwo(value: number): number {
    return Math.pow(2, Math.ceil(Math.log2(value)));
}

export function wrapText(
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
): string[] {
    if (!text.trim()) {
        return [''];
    }

    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = words.shift() ?? '';

    words.forEach((word) => {
        const testLine = `${currentLine} ${word}`.trim();
        if (ctx.measureText(testLine).width <= maxWidth) {
            currentLine = testLine;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });

    lines.push(currentLine);
    return lines;
}