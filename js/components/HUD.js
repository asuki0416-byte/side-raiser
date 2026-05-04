// =====================================================
// HUD - ヘッドアップディスプレイ（DAY表示・天気アイコン）
// =====================================================

class HUD {
    constructor() {}

    drawDayBanner(day) {
        const bannerW = 140, bannerH = 60;
        const bx = (W - bannerW) / 2;
        const by = 14;

        // 黒い太枠
        ctx.fillStyle = '#000';
        ctx.fillRect(bx - 4, by - 4, bannerW + 8, bannerH + 8);

        // 黄色背景
        ctx.fillStyle = '#f5c542';
        ctx.fillRect(bx, by, bannerW, bannerH);

        // 内側の暗い影（凹み感）
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(bx, by, bannerW, 2);
        ctx.fillRect(bx, by + bannerH - 2, bannerW, 2);

        // テキスト
        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText('継続日数', bx + bannerW / 2, by + 8);

        ctx.font = 'bold 24px monospace';
        ctx.fillText(`DAY ${day}`, bx + bannerW / 2, by + 24);
    }

    drawWeatherIcon(weather) {
        const wIcons = { clear: '☀', cloudy: '☁', rain: '🌧', snow: '❄', wind: '💨', storm: '⚡' };
        const icon = wIcons[weather] || '';
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(icon, W - 12, 28);
    }

    drawFlashMsg(flashMsg, flashT) {
        if (flashT > 0) {
            ctx.font = 'bold 20px sans-serif';
            ctx.fillStyle = `rgba(255,200,50,${Math.min(1, flashT / 20)})`;
            ctx.textAlign = 'center';
            ctx.fillText(flashMsg, W / 2, 93);
        }
    }

    draw(day, weather, tod, flashMsg, flashT) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.9)';
        ctx.shadowBlur = 6;

        this.drawDayBanner(day);
        this.drawWeatherIcon(weather);
        this.drawFlashMsg(flashMsg, flashT);

        ctx.restore();
    }
}
