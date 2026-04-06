/**
 * WIRTUALNY SYSTEM RP - CORE ENGINE
 * Domena: wirtualnysystemrp.pl
 */

const SystemRP = {
    state: {
        points: parseInt(localStorage.getItem('rp_points')) || 0,
        lastReport: 0
    },

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.updateDisplay();
        this.checkConnection();
    },

    cacheDOM() {
        this.display = document.getElementById('pointsDisplay');
        this.clickBtn = document.getElementById('clickBtn');
        this.reportBtn = document.getElementById('sendReportBtn');
        this.reportArea = document.getElementById('reportText');
        this.reportType = document.getElementById('issueType');
        this.feedback = document.getElementById('feedbackMsg');
    },

    bindEvents() {
        // Generowanie punktów
        this.clickBtn.addEventListener('click', () => {
            this.state.points++;
            this.save();
            this.updateDisplay();
            this.animateClick();
        });

        // Wysyłanie błędu
        this.reportBtn.addEventListener('click', () => this.handleReport());
    },

    handleReport() {
        const text = this.reportArea.value.trim();
        const type = this.reportType.value;
        const now = Date.now();

        if (now - this.state.lastReport < 60000) {
            this.showFeedback("SYSTEM BUSY: Odczekaj 60s.", "orange");
            return;
        }

        if (text.length < 10) {
            this.showFeedback("BŁĄD: Opis musi mieć min. 10 znaków.", "var(--accent)");
            return;
        }

        // Symulacja wysyłki danych do Cloudflare
        console.log(`[RAPORT ${type.toUpperCase()}]: ${text}`);
        
        this.state.lastReport = now;
        this.reportArea.value = "";
        this.showFeedback("ZGŁOSZENIE PRZYJĘTE. DZIĘKUJEMY.", "#4ade80");
    },

    updateDisplay() {
        if (this.display) this.display.innerText = this.state.points.toLocaleString();
    },

    save() {
        localStorage.setItem('rp_points', this.state.points);
    },

    showFeedback(msg, color) {
        this.feedback.innerText = msg;
        this.feedback.style.color = color;
        setTimeout(() => this.feedback.innerText = "", 5000);
    },

    animateClick() {
        this.clickBtn.style.transform = "scale(0.98)";
        setTimeout(() => this.clickBtn.style.transform = "scale(1)", 50);
    },

    checkConnection() {
        console.log("%c WIRTUALNY SYSTEM RP AKTYWNY ", "background: #38bdf8; color: #000; font-weight: bold;");
    }
};

// Inicjalizacja po załadowaniu strony
document.addEventListener('DOMContentLoaded', () => SystemRP.init());
