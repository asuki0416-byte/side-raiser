// =====================================================
// BackgroundSystem - 背景レイヤー統合管理
// =====================================================

class BackgroundSystem {
    constructor() {
        // 状態はグローバル変数を使用（外部から管理）
    }

    update(day, now) {
        const tod = getTod(day);
        const weather = getWeather(day);

        updateClouds();
        updateParticles(weather);
        updateLightning(weather, now);
    }

    draw(day, now) {
        const tod = getTod(day);
        const weather = getWeather(day);

        // Layer 1: 空グラデーション
        const sky = getSkyColors(tod);
        const g = ctx.createLinearGradient(0, 0, 0, H);
        g.addColorStop(0, sky.top);
        g.addColorStop(1, sky.bot);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);

        // Layer 2: 星
        const starA = getStarAlpha(tod);
        if (starA > 0) drawStars(starA);

        // Layer 3: 月
        drawMoon(tod);

        // Layer 4: 太陽
        drawSun(tod);

        // Layer 5: 雲
        drawClouds(weather, tod);

        // 天気パーティクル（雲と街並みの間）
        drawParticles();

        // Layer 6: 街並み遠景
        this.drawCityFar();

        // Layer 7: 地面
        drawGround();
    }

    drawCityFar() {
        // 縦長のビルを並べた仮シルエット（pixel art 仮版）。後でPNGに差し替え予定
        ctx.fillStyle = '#0d0d1a';
        // ビル群（x, w, h）— 高さは varied、地面ライン (H-18) からせり上がる
        const groundY = H - 18;
        const buildings = [
            { x: 0,   w: 22, h: 38 },
            { x: 22,  w: 18, h: 56 },
            { x: 40,  w: 28, h: 70 },
            { x: 68,  w: 16, h: 44 },
            { x: 84,  w: 32, h: 88 },
            { x: 116, w: 20, h: 52 },
            { x: 136, w: 26, h: 64 },
            { x: 162, w: 18, h: 40 },
            { x: 180, w: 30, h: 76 },
            { x: 210, w: 22, h: 50 },
            { x: 232, w: 18, h: 60 },
            { x: 250, w: 28, h: 82 },
            { x: 278, w: 22, h: 44 },
            { x: 300, w: 20, h: 56 },
            { x: 320, w: 28, h: 68 },
            { x: 348, w: 18, h: 42 },
            { x: 366, w: 24, h: 58 },
            { x: 390, w: 16, h: 36 },
        ];
        for (const b of buildings) {
            ctx.fillRect(b.x, groundY - b.h, b.w, b.h);
            // 上端に小さい区切り（屋上ライン）
            ctx.fillStyle = '#1a1a2e';
            ctx.fillRect(b.x, groundY - b.h, b.w, 2);
            ctx.fillStyle = '#0d0d1a';
        }
        // 窓のハイライト（小さなドット）— 一部のビルにランダム配置
        ctx.fillStyle = '#3a3a5a';
        for (const b of buildings) {
            if (b.h < 50) continue;
            const cols = 2, rows = Math.floor(b.h / 14);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if ((r + c) % 3 === 0) {
                        ctx.fillRect(
                            b.x + 4 + c * (b.w / cols),
                            groundY - b.h + 8 + r * 12,
                            2, 3
                        );
                    }
                }
            }
        }
    }
}
