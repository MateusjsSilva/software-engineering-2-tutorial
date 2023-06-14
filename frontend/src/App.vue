<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Meu Site</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/sing-in" class="nav-link">Cadastro</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/list-users" class="nav-link">Usuários</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/images" class="nav-link">Imagens</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import SingIn from "./components/SingIn.vue";
import ListUsers from "./components/ListUsers.vue";
import ImageUpload from '@/components/ImageUpload.vue';

export default {
  components: {
    SingIn,
    ListUsers,
    ImageUpload
  }
};
</script>

<style scoped>
.navbar {
  padding: 5px;
}

.navbar-brand {
  font-weight: bold;
}

.nav-link {
  font-weight: normal;
}

.navbar-toggler {
  border: none;
}

.nav-item {
  margin-right: 15px;
}
</style>