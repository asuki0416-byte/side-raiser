// =====================================================
// Twitter 風吹き出しコンポーネント
// =====================================================
class CommentBubble {
    constructor() {}

    /**
     * @param {CanvasRenderingContext2D} ctx
     * @param {number} cx - bubble center x
     * @param {number} cy - bubble center y
     * @param {string} text - body text
     * @param {string} account - "@xxx" or empty
     */
    draw(ctx, cx, cy, text, account) {
        const hasAvatar = account && account.length > 0;
        const avatarW = 18;
        const padding = 6;
        const bodyW = 130;
        const textMaxW = bodyW - (hasAvatar ? avatarW + padding : 0) - padding * 2;
        const lines = wrapLines(text, textMaxW);
        const lineH = 14;
        const accountH = hasAvatar ? 12 : 0;
        const bodyH = padding * 2 + accountH + lines.length * lineH + 4;

        const bx = cx - bodyW / 2;
        const by = cy - bodyH / 2;

        // 吹き出し本体（黒に近い濃紺、角丸）
        ctx.fillStyle = '#0c0a1a';
        rRect(bx, by, bodyW, bodyH, 4);
        ctx.fill();

        // 細い黒枠（縁取り）
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        rRect(bx, by, bodyW, bodyH, 4);
        ctx.stroke();

        // アバター（仮で丸いオレンジ円）
        if (hasAvatar) {
            const ax = bx + padding;
            const ay = by + padding;
            ctx.fillStyle = '#FF8A65';
            ctx.beginPath();
            ctx.arc(ax + avatarW / 2, ay + avatarW / 2, avatarW / 2, 0, Math.PI * 2);
            ctx.fill();

            // アバター内に小さな顔（目）
            ctx.fillStyle = '#000';
            ctx.fillRect(ax + 5, ay + 7, 2, 2);
            ctx.fillRect(ax + 11, ay + 7, 2, 2);
        }

        // テキストエリアの左端
        const textX = bx + padding + (hasAvatar ? avatarW + padding : 0);
        const textY = by + padding;

        // @account 名（薄いグレー）
        if (hasAvatar) {
            ctx.fillStyle = '#888';
            ctx.font = '9px monospace';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'top';
            ctx.fillText(account, textX, textY);
        }

        // 本文（白）
        ctx.fillStyle = '#fff';
        ctx.font = '11px monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], textX, textY + accountH + i * lineH);
        }
    }
}
