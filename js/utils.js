// =====================================================
// ユーティリティ関数
// =====================================================

const lerp  = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function lerpHex(c0, c1, t) {
    const r0=parseInt(c0.slice(1,3),16), g0=parseInt(c0.slice(3,5),16), b0=parseInt(c0.slice(5,7),16);
    const r1=parseInt(c1.slice(1,3),16), g1=parseInt(c1.slice(3,5),16), b1=parseInt(c1.slice(5,7),16);
    return `rgb(${Math.round(r0+(r1-r0)*t)},${Math.round(g0+(g1-g0)*t)},${Math.round(b0+(b1-b0)*t)})`;
}

function rRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
    ctx.lineTo(x+w, y+h-r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
    ctx.lineTo(x+r, y+h); ctx.arcTo(x, y+h, x, y+h-r, r);
    ctx.lineTo(x, y+r); ctx.arcTo(x, y, x+r, y, r);
    ctx.closePath();
}

function wrapLines(text, maxW) {
    const lines = []; let line = '';
    for (const ch of text) {
        if (ctx.measureText(line + ch).width > maxW && line) { lines.push(line); line = ch; }
        else line += ch;
    }
    if (line) lines.push(line);
    return lines;
}

function drawWrapped(text, cx, startY, maxW, lh) {
    wrapLines(text, maxW).forEach((l, i) => ctx.fillText(l, cx, startY + i * lh));
}
