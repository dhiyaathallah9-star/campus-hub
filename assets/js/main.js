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
});