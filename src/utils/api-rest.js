const delay = (ms) => new Promise((res) => { setTimeout(res, ms); });

const API = {
  serverURL: 'http://localhost:3010/',

  async makeRequest(request, callback) {
    // delay is used only to simulate a more realistic response time
    await delay(1000);

    const res = await fetch(request.url, {
      method: request.method || 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: request.data && JSON.stringify(request.data),
    });

    const dataJSON = await res.json();

    if (callback) callback(dataJSON);

    return (dataJSON);
  },

  login(user, password) {
    return this.makeRequest({
      url: `${this.serverURL}login`,
      method: 'POST',
      data: { user, password },
    });
  },

  logout() {
    return this.makeRequest({
      url: `${this.serverURL}logout`,
      method: 'PUT',
    });
  },

  getEmployees() {
    return this.makeRequest({
      url: `${this.serverURL}employees`,
    });
  },

  deleteEmployee(id) {
    return this.makeRequest({
      url: `${this.serverURL}employees/${id}`,
      method: 'DELETE',
    });
  },

  addEmployee(data) {
    return this.makeRequest({
      url: `${this.serverURL}employees`,
      method: 'POST',
      data,
    });
  },

  updateEmployee(data) {
    return this.makeRequest({
      url: `${this.serverURL}employees/${data.id}`,
      method: 'PUT',
      data,
    });
  },
};

export default API;
