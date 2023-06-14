<template>
  <div class="container">
    <h1 class="mb-4">Lista de Usuários Cadastrados</h1>

    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Nome Completo</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.full_name }}</td>
            <td>{{ user.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const urlBase = `${window.location.protocol}//${window.location.hostname}:8000`;

export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get(`${urlBase}/api/records/`)
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Erro ao fazer a requisição:", error);
        });
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  padding-top: 40px;
}

h1 {
  font-size: 24px;
  font-weight: bold;
}

.table {
  margin-top: 20px;
}

.table th,
.table td {
  padding: 12px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}
</style>