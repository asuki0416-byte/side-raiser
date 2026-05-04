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
        ctx.fillStyle = '#1a1a2e';
        const buildings = [
            { x: 30, y: H - 90, w: 50, h: 30 },
            { x: 90, y: H - 110, w: 70, h: 50 },
            { x: 180, y: H - 100, w: 60, h: 40 },
            { x: 260, y: H - 115, w: 80, h: 55 },
        ];
        for (const b of buildings) {
            ctx.fillRect(b.x, b.y, b.w, b.h);
        }
    }
}
