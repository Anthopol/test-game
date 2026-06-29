import Phaser from 'phaser';

const LARAVEL_API_BASE = '/api/v1';

class LaravelBridge {
  constructor(gameSlug) {
    this.gameSlug = gameSlug;
    this.token = localStorage.getItem('auth_token');
  }
  async loadProgress() {
    if (!this.token) return null;
    const resp = await fetch(`${LARAVEL_API_BASE}/progress/games/${this.gameSlug}`, {
      headers: { Authorization: `Bearer ${this.token}` }
    });
    const json = await resp.json();
    return json.success ? json.data : null;
  }
  async saveProgress(data, completed = false) {
    if (!this.token) return false;
    const resp = await fetch(`${LARAVEL_API_BASE}/progress/games/${this.gameSlug}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ progress_data: data, completed })
    });
    const json = await resp.json();
    return json.success;
  }
}

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  init(data) {
    this.bridge = new LaravelBridge('test-game');
    this.score = 0;
    this.scoreText = null;
  }

  async create() {
    // Load saved score
    const saved = await this.bridge.loadProgress();
    if (saved && saved.score) {
      this.score = saved.score;
    }

    this.add.text(400, 200, 'Click the circle!', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.scoreText = this.add.text(400, 300, `Score: ${this.score}`, { fontSize: '28px', fill: '#0f0' }).setOrigin(0.5);

    const circle = this.add.circle(400, 450, 50, 0xff0000);
    circle.setInteractive();
    circle.on('pointerdown', () => {
      this.score++;
      this.scoreText.setText(`Score: ${this.score}`);
      this.bridge.saveProgress({ score: this.score }, this.score >= 10); // win if >=10
      if (this.score >= 10) {
        this.add.text(400, 100, 'YOU WIN!', { fontSize: '48px', fill: '#ff0' }).setOrigin(0.5);
      }
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: MainScene,
  parent: document.body
};

const game = new Phaser.Game(config);