// =====================================================
// ObstacleRack コンポーネント
// ダンベルラック型障害物の描画
// =====================================================

class ObstacleRack {
    constructor(x, topH, gap) {
        this.x = x;
        this.topH = topH;
        this.gap = gap;
    }

    drawTop(ctx) {
        this.#drawRack(ctx, this.x, 0, PIPE_W, this.topH, false);
    }

    drawBottom(ctx) {
        this.#drawRack(ctx, this.x, this.topH + this.gap, PIPE_W, H - (this.topH + this.gap), true);
    }

    #drawRack(ctx, x, y, w, h, isFloorRack) {
        // グレーの柱本体
        ctx.fillStyle = '#5a5a6e';
        ctx.fillRect(x + 6, y, w - 12, h);

        // 左右の影で立体感
        ctx.fillStyle = '#3d3d4d';
        ctx.fillRect(x + 6, y, 4, h);  // 左影
        ctx.fillRect(x + w - 10, y, 4, h);  // 右影

        // プレート（黒い円板を一定間隔で）
        const plateCount = Math.floor(h / 18);
        const plateOffset = isFloorRack ? 4 : 0;
        for (let i = 0; i < plateCount; i++) {
            const py = isFloorRack
                ? (y + h - 18 * (i + 1) - plateOffset)
                : (y + 18 * i + plateOffset);

            // プレート本体（黒）
            ctx.fillStyle = '#1a1a25';
            ctx.fillRect(x + 2, py + 2, w - 4, 14);

            // プレートのハイライト（上部の細い明るい線）
            ctx.fillStyle = '#6b6b7a';
            ctx.fillRect(x + 2, py + 2, w - 4, 1);
        }

        // 上端または下端のキャップ
        const capH = 16;
        if (isFloorRack) {
            // 床ラックの下端
            ctx.fillStyle = '#3d3d4d';
            ctx.fillRect(x + 4, y + h - capH, w - 8, capH);
        } else {
            // 空中ラックの上端に金色のGVMサイン
            ctx.fillStyle = '#d4a93c';
            ctx.fillRect(x + 8, y, w - 16, 14);

            // 黒い枠
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 8, y, w - 16, 14);

            // GVMテキスト
            ctx.fillStyle = '#000';
            ctx.font = 'bold 9px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('GVM', x + w / 2, y + 7);
        }
    }
}
