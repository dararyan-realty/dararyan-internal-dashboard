const token = localStorage.getItem('token');
if (!token) window.location.href = 'index.html';

async function fetchProperties() {
  try {
    const res = await fetch('/api/properties', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const properties = await res.json();
    const list = document.getElementById('propertiesList');
    list.innerHTML = '';
    properties.forEach(prop => {
      const li = document.createElement('li');
      li.innerHTML = `${prop.title} - ${prop.price} KWD <button onclick="deleteProperty('${prop._id}')">حذف</button>`;
      list.appendChild(li);
    });
  } catch (err) {
    alert('خطأ: ' + err.message);
  }
}

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

document.getElementById('addPropertyForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const price = document.getElementById('price').value;
  const location = document.getElementById('location').value;
  try {
    await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ title, description, price, location })
    });
    fetchProperties();
  } catch (err) {
    alert('خطأ: ' + err.message);
  }
});

async function deleteProperty(id) {
  try {
    await fetch(`/api/properties/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    fetchProperties();
  } catch (err) {
    alert('خطأ: ' + err.message);
  }
}

async function fetchClients() {
  try {
    const res = await fetch('/api/clients', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Access denied');
    const clients = await res.json();
    const list = document.getElementById('clientsList');
    list.innerHTML = '';
    clients.forEach(client => {
      const li = document.createElement('li');
      li.textContent = `${client.name} - ${client.email}`;
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById('clientsList').innerHTML = '<li>غير متاح (آدمن فقط)</li>';
  }
}

document.getElementById('addClientForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('clientName').value;
  const email = document.getElementById('clientEmail').value;
  const phone = document.getElementById('clientPhone').value;
  try {
    await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ name, email, phone })
    });
    fetchClients();
  } catch (err) {
    alert('خطأ: ' + err.message);
  }
});

async function fetchAppointments() {
  try {
    const res = await fetch('/api/appointments', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Access denied');
    const appointments = await res.json();
    const list = document.getElementById('appointmentsList');
    list.innerHTML = '';
    appointments.forEach(app => {
      const li = document.createElement('li');
      li.textContent = `موعد مع ${app.client.name} في ${app.date}`;
      list.appendChild(li);
    });
  } catch (err) {
    document.getElementById('appointmentsList').innerHTML = '<li>غير متاح (آدمن فقط)</li>';
  }
}

document.getElementById('addAppointmentForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const client = document.getElementById('appointmentClientId').value;
  const property = document.getElementById('appointmentPropertyId').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  try {
    await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ client, property, date, time })
    });
    fetchAppointments();
  } catch (err) {
    alert('خطأ: ' + err.message);
  }
});

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

fetchProperties();
fetchStats();
fetchClients();
fetchAppointments();
