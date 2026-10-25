// =========================================================
// CAMPUS HUB - MAIN JAVASCRIPT LOGIC
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------
  // 1. FAQ ACCORDION INTERACTIVITY
  // -------------------------------------------------------
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach((button) => {
    button.addEventListener('click', () => {
      const answer = button.nextElementSibling;
      const icon = button.querySelector('span:last-child');

      // Toggle visibilitas jawaban
      answer.classList.toggle('hidden');

      // Ubah ikon + / -
      if (answer.classList.contains('hidden')) {
        icon.textContent = '+';
      } else {
        icon.textContent = '−';
      }
    });
  });

  // -------------------------------------------------------
  // 2. TO-DO LIST WITH LOCAL STORAGE
  // -------------------------------------------------------
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  // Ambil daftar tugas dari Local Storage saat pertama dimuat
  let todos = JSON.parse(localStorage.getItem('campusHub_todos')) || [];

  // Fungsi untuk menyimpan daftar tugas ke Local Storage
  const saveTodos = () => {
    localStorage.setItem('campusHub_todos', JSON.stringify(todos));
  };

  // Fungsi untuk merender daftar tugas ke HTML
  const renderTodos = () => {
    todoList.innerHTML = '';

    if (todos.length === 0) {
      todoList.innerHTML = `
        <li class="text-center text-slate-500 text-sm py-4">
          Belum ada tugas tersimpan. Tambahkan tugas baru di atas!
        </li>
      `;
      return;
    }

    todos.forEach((todo, index) => {
      const li = document.createElement('li');
      li.className = `bg-slate-900/80 border border-cyan-500/20 rounded-xl p-4 flex justify-between items-center backdrop-blur-md transition duration-300 ${
        todo.completed ? 'opacity-60 line-through text-slate-400' : 'text-slate-100'
      }`;

      li.innerHTML = `
        <span class="flex-1 cursor-pointer select-none" onclick="toggleTodo(${index})">
          ${todo.completed ? '✓ ' : '• '} ${todo.text}
        </span>
        <button 
          onclick="deleteTodo(${index})" 
          class="text-red-400 hover:text-red-300 text-xs font-semibold px-2 py-1 rounded bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 transition ml-3"
        >
          Hapus
        </button>
      `;

      todoList.appendChild(li);
    });
  };

  // Tambah Tugas Baru
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();

    if (text !== '') {
      todos.push({ text, completed: false });
      saveTodos();
      renderTodos();
      todoInput.value = '';
    }
  });

  // Toggle status selesai/belum
  window.toggleTodo = (index) => {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
  };

  // Hapus tugas
  window.deleteTodo = (index) => {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  };

  // Tampilkan tugas yang tersimpan di awal
  renderTodos();

  // -------------------------------------------------------
  // 3. CONTACT / FEEDBACK FORM SUBMISSION
  // -------------------------------------------------------
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('nama').value.trim();
    const kategori = document.getElementById('kategori').value;

    alert(`Terima kasih ${nama}! Pesan kamu dengan kategori "${kategori}" telah berhasil dikirim.`);
    
    contactForm.reset();
  });

   
    // 1. Elemen muncul saat di-scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 2. Bar progres, navbar, dan Sea-chan pendamping
    const progress = document.getElementById('scroll-progress');
    const navbar = document.getElementById('navbar');
    const buddy = document.getElementById('chan-buddy');
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      progress.style.width = pct + '%';
      navbar.classList.toggle('scrolled', h.scrollTop > 40);
      buddy.classList.toggle('visible', h.scrollTop > window.innerHeight * 0.6);
    }, { passive: true });

    // 3. Gelembung di hero
    const bubbleBox = document.getElementById('bubbles');
    for (let i = 0; i < 18; i++) {
      const b = document.createElement('span');
      const size = 6 + Math.random() * 18;
      b.className = 'bubble';
      b.style.width = b.style.height = size + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.animationDuration = 8 + Math.random() * 10 + 's';
      b.style.animationDelay = Math.random() * 10 + 's';
      bubbleBox.appendChild(b);
    }

    // 4. Efek mengetik
    const text = "'Ready for Overclock'";
    const typing = document.getElementById('typing');
    let t = 0;
    (function type() {
      if (t <= text.length) { typing.textContent = text.slice(0, t++); setTimeout(type, 90); }
    })();

    // 5. Sea-chan: melompat, hati beterbangan, dan ganti kalimat
    function hop(img) {
      img.classList.remove('seachan-idle', 'seachan-hop');
      void img.offsetWidth;               // reset animasi
      img.classList.add('seachan-hop');
      setTimeout(() => { img.classList.remove('seachan-hop'); img.classList.add('seachan-idle'); }, 700);
    }
    function hearts(x, y) {
      const icons = ['💙', '✨', '💎', '🫧', '⭐'];
      for (let i = 0; i < 7; i++) {
        const s = document.createElement('span');
        s.className = 'pop-heart';
        s.textContent = icons[Math.floor(Math.random() * icons.length)];
        s.style.left = x - 10 + 'px';
        s.style.top = y - 10 + 'px';
        s.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
        s.style.animationDelay = i * 40 + 'ms';
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 1300);
      }
    }
    function say(el, msg) {
      el.classList.add('swap');
      setTimeout(() => { el.innerHTML = msg; el.classList.remove('swap'); }, 250);
    }

    const heroChan = document.getElementById('hero-chan');
    const heroSpeech = document.getElementById('hero-speech');
    const heroLines = [
      'Halo, Maba! Aku <span class="text-sea-500">Sea-chan</span> 💙',
      'Semangat ngoding ya! 💻',
      'Jangan lupa ikut PKKMB tanggal 1 September!',
      'Mampir ke Lab Open House, yuk~ 🧪',
      'Follow <span class="text-sea-500">@sea.laboratory</span> ya! 📸',
      'Ehehe, geli tahu~ 😆',
    ];
    let lineIdx = 0;
    heroChan.addEventListener('click', (e) => {
      hop(heroChan);
      hearts(e.clientX, e.clientY);
      lineIdx = (lineIdx + 1) % heroLines.length;
      say(heroSpeech, heroLines[lineIdx]);
    });

    // Sea-chan pendamping berganti kalimat sesuai bagian yang sedang dibaca
    const buddyChan = document.getElementById('buddy-chan');
    const buddySpeech = document.getElementById('buddy-speech');
    const sectionLines = {
      jadwal:  'Catat tanggalnya, jangan sampai telat! 📅',
      lab:     'Ini lab kesayanganku~ Follow IG kami ya! 📸',
      todo:    'Tulis tugasmu di sini biar nggak lupa ✍️',
      faq:     'Ada yang bingung? Klik pertanyaannya!',
      game:    'Main bareng aku, yuk! 🎮',
      contact: 'Kirim pesan, nanti kami balas! 💌',
    };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && sectionLines[entry.target.id]) {
          say(buddySpeech, sectionLines[entry.target.id]);
          hop(buddyChan);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });  // aktif saat bagian melewati tengah layar
    Object.keys(sectionLines).forEach(id => sectionObserver.observe(document.getElementById(id)));

    buddyChan.addEventListener('click', (e) => {
      hop(buddyChan);
      hearts(e.clientX, e.clientY);
      say(buddySpeech, 'Wusss~ kembali ke atas! 🚀');
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 350);
    });

    // ===================== 6. MINI GAME (ULAR & TETRIS) =====================
    (() => {
      const store = {
        get(k) { try { return +localStorage.getItem(k) || 0; } catch (e) { return 0; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
      };
      const rand = n => Math.floor(Math.random() * n);
      function rr(ctx, x, y, w, h, r) {        // kotak sudut bulat
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
      }
      function board(ctx, w, h, cell) {         // latar papan game
        ctx.fillStyle = '#031a33';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'rgba(92,200,245,.07)';
        ctx.lineWidth = 1;
        for (let x = cell; x < w; x += cell) { ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, h); ctx.stroke(); }
        for (let y = cell; y < h; y += cell) { ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(w, y + .5); ctx.stroke(); }
      }
      function overlay(ctx, w, h, title, sub) {
        ctx.fillStyle = 'rgba(3,26,51,.78)';
        ctx.fillRect(0, 0, w, h);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#5cc8f5';
        ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(title, w / 2, h / 2 - 6);
        ctx.fillStyle = '#eaf6ff';
        ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(sub, w / 2, h / 2 + 20);
      }
      function block(ctx, x, y, s, color) {     // satu kotak tetris
        ctx.fillStyle = color;
        rr(ctx, x + 1, y + 1, s - 2, s - 2, 4);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.28)';
        rr(ctx, x + 3, y + 3, s - 6, 4, 2);
        ctx.fill();
      }

      // ---------- ULAR ----------
      const sc = document.getElementById('snake-canvas'), sx = sc.getContext('2d');
      const N = 15, C = 20;
      const snake = {
        name: 'Ular', bestKey: 'seachan-best-snake',
        reset() {
          this.body = [{ x: 7, y: 7 }, { x: 6, y: 7 }, { x: 5, y: 7 }];
          this.dir = { x: 1, y: 0 };
          this.queue = [];
          this.score = 0;
          this.speed = 150;
          this.over = false;
          this.placeFood();
        },
        placeFood() {
          do { this.food = { x: rand(N), y: rand(N) }; }
          while (this.body.some(p => p.x === this.food.x && p.y === this.food.y));
        },
        input(k) {
          const m = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } }[k];
          if (!m) return;
          const lastDir = this.queue.length ? this.queue[this.queue.length - 1] : this.dir;
          if ((m.x === -lastDir.x && m.y === -lastDir.y) || (m.x === lastDir.x && m.y === lastDir.y)) return;
          if (this.queue.length < 2) this.queue.push(m);
        },
        interval() { return this.speed; },
        step() {
          if (this.queue.length) this.dir = this.queue.shift();
          const head = { x: this.body[0].x + this.dir.x, y: this.body[0].y + this.dir.y };
          const eating = head.x === this.food.x && head.y === this.food.y;
          const bodyToCheck = eating ? this.body : this.body.slice(0, -1);
          if (head.x < 0 || head.y < 0 || head.x >= N || head.y >= N ||
              bodyToCheck.some(p => p.x === head.x && p.y === head.y)) { this.over = true; return; }
          this.body.unshift(head);
          if (eating) {
            this.score += 10;
            this.speed = Math.max(65, this.speed - 4);
            this.placeFood();
          } else {
            this.body.pop();
          }
        },
        draw() {
          board(sx, sc.width, sc.height, C);
          // makanan: gelembung yang berdenyut
          const pulse = 1 + Math.sin(performance.now() / 180) * .12;
          const fx = this.food.x * C + C / 2, fy = this.food.y * C + C / 2;
          const g = sx.createRadialGradient(fx - 3, fy - 3, 1, fx, fy, 9 * pulse);
          g.addColorStop(0, '#ffffff'); g.addColorStop(.5, '#f9a8d4'); g.addColorStop(1, '#ec4899');
          sx.fillStyle = g;
          sx.beginPath(); sx.arc(fx, fy, 7 * pulse, 0, Math.PI * 2); sx.fill();
          // badan ular: dari biru muda ke biru tua
          const len = this.body.length;
          this.body.forEach((p, i) => {
            const t = i / Math.max(1, len - 1);
            const r = Math.round(92 + (18 - 92) * t), gg = Math.round(200 + (119 - 200) * t), b = Math.round(245 + (184 - 245) * t);
            sx.fillStyle = `rgb(${r},${gg},${b})`;
            rr(sx, p.x * C + 1, p.y * C + 1, C - 2, C - 2, i === 0 ? 7 : 5);
            sx.fill();
          });
          // mata di kepala
          const h = this.body[0], cx = h.x * C + C / 2, cy = h.y * C + C / 2;
          const ox = this.dir.y !== 0 ? 4 : 0, oy = this.dir.x !== 0 ? 4 : 0;
          [[1], [-1]].forEach(([s]) => {
            const ex = cx + this.dir.x * 3 + ox * s, ey = cy + this.dir.y * 3 + oy * s;
            sx.fillStyle = '#fff'; sx.beginPath(); sx.arc(ex, ey, 3, 0, Math.PI * 2); sx.fill();
            sx.fillStyle = '#031a33'; sx.beginPath(); sx.arc(ex + this.dir.x, ey + this.dir.y, 1.5, 0, Math.PI * 2); sx.fill();
          });
        },
        idle(title, sub) { this.draw(); overlay(sx, sc.width, sc.height, title, sub); },
        help: 'Pakai tombol panah / WASD atau tombol arah di bawah. Makan gelembung pink, jangan menabrak dinding atau badan sendiri!',
        actionLabel: '●',
      };

      // ---------- TETRIS ----------
      const tc = document.getElementById('tetris-canvas'), tx = tc.getContext('2d');
      const nc = document.getElementById('tetris-next'), nx = nc.getContext('2d');
      const COLS = 10, ROWS = 20, T = 20;
      const SHAPES = {
        I: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
        O: [[1, 1], [1, 1]],
        T: [[0, 1, 0], [1, 1, 1], [0, 0, 0]],
        S: [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
        Z: [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
        J: [[1, 0, 0], [1, 1, 1], [0, 0, 0]],
        L: [[0, 0, 1], [1, 1, 1], [0, 0, 0]],
      };
      // warna keluarga biru laut, dibuat cukup beda supaya mudah dibedakan
      const COLORS = { I: '#5cc8f5', O: '#a5f3fc', T: '#818cf8', S: '#2dd4bf', Z: '#38bdf8', J: '#1a9ad8', L: '#93c5fd' };
      const keys = Object.keys(SHAPES);
      const tetris = {
        name: 'Tetris', bestKey: 'seachan-best-tetris',
        reset() {
          this.grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
          this.score = 0; this.lines = 0; this.level = 1; this.over = false;
          this.nextKey = keys[rand(keys.length)];
          this.spawn();
        },
        spawn() {
          const k = this.nextKey;
          this.nextKey = keys[rand(keys.length)];
          const m = SHAPES[k].map(r => r.slice());
          this.piece = { k, m, x: Math.floor((COLS - m[0].length) / 2), y: k === 'I' ? -1 : 0 };
          if (this.collide(m, this.piece.x, this.piece.y)) this.over = true;
        },
        collide(m, ox, oy) {
          for (let y = 0; y < m.length; y++) for (let x = 0; x < m[y].length; x++) {
            if (!m[y][x]) continue;
            const gx = ox + x, gy = oy + y;
            if (gx < 0 || gx >= COLS || gy >= ROWS) return true;
            if (gy >= 0 && this.grid[gy][gx]) return true;
          }
          return false;
        },
        rotate() {
          const m = this.piece.m;
          const r = m[0].map((_, i) => m.map(row => row[i]).reverse());
          for (const off of [0, -1, 1, -2, 2]) {
            if (!this.collide(r, this.piece.x + off, this.piece.y)) { this.piece.m = r; this.piece.x += off; return; }
          }
        },
        move(dx) { if (!this.collide(this.piece.m, this.piece.x + dx, this.piece.y)) this.piece.x += dx; },
        drop() {
          if (!this.collide(this.piece.m, this.piece.x, this.piece.y + 1)) { this.piece.y++; return true; }
          this.lock();
          return false;
        },
        hardDrop() {
          let n = 0;
          while (!this.collide(this.piece.m, this.piece.x, this.piece.y + 1)) { this.piece.y++; n++; }
          this.score += n * 2;
          this.lock();
        },
        lock() {
          const { m, x, y, k } = this.piece;
          for (let r = 0; r < m.length; r++) for (let c = 0; c < m[r].length; c++) {
            if (!m[r][c]) continue;
            if (y + r < 0) { this.over = true; return; }
            this.grid[y + r][x + c] = k;
          }
          let cleared = 0;
          for (let r = ROWS - 1; r >= 0; r--) {
            if (this.grid[r].every(Boolean)) {
              this.grid.splice(r, 1);
              this.grid.unshift(Array(COLS).fill(null));
              cleared++; r++;
            }
          }
          if (cleared) {
            this.lines += cleared;
            this.score += [0, 100, 300, 500, 800][cleared] * this.level;
            this.level = 1 + Math.floor(this.lines / 10);
          }
          this.spawn();
        },
        input(k) {
          if (k === 'left') this.move(-1);
          else if (k === 'right') this.move(1);
          else if (k === 'down') { if (this.drop()) this.score += 1; }
          else if (k === 'up') this.rotate();
          else if (k === 'action') this.hardDrop();
        },
        interval() { return Math.max(90, 650 - (this.level - 1) * 60); },
        step() { this.drop(); },
        draw() {
          board(tx, tc.width, tc.height, T);
          this.grid.forEach((row, y) => row.forEach((k, x) => { if (k) block(tx, x * T, y * T, T, COLORS[k]); }));
          if (this.piece && !this.over) {
            // bayangan tempat jatuh
            let gy = this.piece.y;
            while (!this.collide(this.piece.m, this.piece.x, gy + 1)) gy++;
            this.piece.m.forEach((row, r) => row.forEach((v, c) => {
              if (!v || gy + r < 0) return;
              tx.strokeStyle = 'rgba(92,200,245,.45)';
              tx.lineWidth = 1.5;
              rr(tx, (this.piece.x + c) * T + 2, (gy + r) * T + 2, T - 4, T - 4, 4);
              tx.stroke();
            }));
            this.piece.m.forEach((row, r) => row.forEach((v, c) => {
              if (v && this.piece.y + r >= 0) block(tx, (this.piece.x + c) * T, (this.piece.y + r) * T, T, COLORS[this.piece.k]);
            }));
          }
          // pratinjau balok berikutnya
          nx.clearRect(0, 0, nc.width, nc.height);
          if (this.nextKey) {
            const m = SHAPES[this.nextKey], s = 14;
            const cells = [];
            m.forEach((row, r) => row.forEach((v, c) => { if (v) cells.push([c, r]); }));
            const minX = Math.min(...cells.map(p => p[0])), maxX = Math.max(...cells.map(p => p[0]));
            const minY = Math.min(...cells.map(p => p[1])), maxY = Math.max(...cells.map(p => p[1]));
            const offX = (nc.width - (maxX - minX + 1) * s) / 2, offY = (nc.height - (maxY - minY + 1) * s) / 2;
            cells.forEach(([c, r]) => block(nx, offX + (c - minX) * s, offY + (r - minY) * s, s, COLORS[this.nextKey]));
          }
        },
        idle(title, sub) { this.draw(); overlay(tx, tc.width, tc.height, title, sub); },
        help: '◀ ▶ geser, ▲ putar, ▼ turun pelan, ● (atau Spasi) jatuhkan langsung. Penuhi satu baris untuk menghapusnya!',
        actionLabel: '⤓',
      };

      // ---------- PENGATUR GAME ----------
      const games = { snake, tetris };
      const canvases = { snake: sc, tetris: tc };
      const scoreEl = document.getElementById('hud-score');
      const bestEl = document.getElementById('hud-best');
      const levelEl = document.getElementById('hud-level');
      const startBtn = document.getElementById('game-start');
      const helpEl = document.getElementById('game-help');
      const padAction = document.getElementById('pad-action');
      let current = 'snake', state = 'idle', last = 0, acc = 0, rafId = null;

      function hud() {
        const g = games[current];
        scoreEl.textContent = g.score || 0;
        bestEl.textContent = store.get(g.bestKey);
        levelEl.textContent = tetris.level || 1;
      }
      function loop(t) {
        if (state !== 'running') return;
        const g = games[current];
        acc = Math.min(acc + (t - last), 1000);
        last = t;
        while (acc >= g.interval()) {
          acc -= g.interval();
          g.step();
          if (g.over) { gameOver(); return; }
        }
        g.draw();
        hud();
        rafId = requestAnimationFrame(loop);
      }
      function start() {
        const g = games[current];
        g.reset();
        state = 'running';
        acc = 0; last = performance.now();
        startBtn.textContent = '❚❚ Jeda';
        say(buddySpeech, current === 'snake' ? 'Ayo, kejar gelembungnya! 🫧' : 'Susun yang rapi ya~ 🧱');
        rafId = requestAnimationFrame(loop);
      }
      function pause() {
        state = 'paused';
        cancelAnimationFrame(rafId);
        games[current].idle('Jeda', 'Tekan Lanjut untuk main lagi');
        startBtn.textContent = '▶ Lanjut';
      }
      function resume() {
        state = 'running';
        last = performance.now();
        startBtn.textContent = '❚❚ Jeda';
        rafId = requestAnimationFrame(loop);
      }
      function gameOver() {
        state = 'over';
        cancelAnimationFrame(rafId);
        const g = games[current];
        const best = store.get(g.bestKey);
        const newBest = g.score > best;
        if (newBest) store.set(g.bestKey, g.score);
        hud();
        g.idle(newBest ? 'Rekor Baru! 🎉' : 'Game Over', 'Skor kamu: ' + g.score);
        startBtn.textContent = '↻ Main Lagi';
        say(buddySpeech, newBest ? `Wah, rekor baru ${g.score}! Hebat! 🎉` : `Skormu ${g.score}. Coba lagi, pasti bisa! 💪`);
        hop(buddyChan);
      }
      function stop() {
        cancelAnimationFrame(rafId);
        state = 'idle';
        startBtn.textContent = '▶ Mulai';
      }
      function switchGame(name) {
        stop();
        current = name;
        document.querySelectorAll('.game-tab').forEach(b => b.classList.toggle('active', b.dataset.game === name));
        Object.entries(canvases).forEach(([k, c]) => c.classList.toggle('hidden', k !== name));
        document.getElementById('hud-level-box').classList.toggle('hidden', name !== 'tetris');
        document.getElementById('hud-next-box').classList.toggle('hidden', name !== 'tetris');
        helpEl.textContent = games[name].help;
        padAction.textContent = games[name].actionLabel;
        const g = games[name];
        g.reset();
        g.idle(g.name + ' Sea-chan', 'Tekan Mulai untuk bermain');
        hud();
      }
      function handle(k) {
        if (state !== 'running') return;
        const g = games[current];
        g.input(k);
        if (g.over) { gameOver(); return; }
        g.draw();
        hud();
      }

      startBtn.addEventListener('click', () => {
        startBtn.blur();   // supaya Spasi tidak ikut menekan tombol ini
        if (state === 'running') pause();
        else if (state === 'paused') resume();
        else start();
      });
      document.querySelectorAll('.game-tab').forEach(b => b.addEventListener('click', () => { b.blur(); switchGame(b.dataset.game); }));
      document.querySelectorAll('.pad-btn').forEach(b => b.addEventListener('pointerdown', e => {
        e.preventDefault();
        handle(b.dataset.key);
      }));
      const keyMap = {
        ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
        w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right', ' ': 'action',
      };
      document.addEventListener('keydown', e => {
        if (state !== 'running') return;
        const k = keyMap[e.key];
        if (!k) return;
        e.preventDefault();            // supaya halaman tidak ikut ter-scroll
        handle(k);
      });
      // jeda otomatis kalau pindah tab browser
      document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'running') pause(); });

      tetris.reset(); tetris.idle('Tetris Sea-chan', 'Tekan Mulai untuk bermain');
      switchGame('snake');
    })();
  
});
