const token = localStorage.getItem('token');
if (!token) window.location.href = 'index.html';

async function fetchStats() {
  try {
    const res = await fetch('/api/stats', { headers: { 'Authorization': `Bearer ${token}` } }); // Assume a stats route
    const stats = await res.json();
    document.getElementById('stats').innerHTML = `<p>عدد العروض: ${stats.offers}</p><p>عدد الطلبات: ${stats.requests}</p>`;
  } catch (err) {
    alert('خطأ: ' + err.message);
  }
}

// Similar functions for properties, clients, etc.

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

fetchStats();
// Call other fetch functions
