<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 offset-md-3">
                <div class="card my-5">
                    <form @submit.prevent="submitForm" class="card-body cardbody-color p-lg-5">
                        <div v-if="responseMessage" :class="responseMessageType" class="alert mb-3">
                            {{ responseMessage }}
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" v-model="username" id="Username" placeholder="Usuario">
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" v-model="full_name" id="FullName"
                                placeholder="Nome Completo">
                        </div>
                        <div class="mb-3">
                            <input type="email" class="form-control" v-model="email" id="Email" aria-describedby="emailHelp"
                                placeholder="Email">
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" v-model="password" id="password"
                                placeholder="Senha">
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from "axios";

const urlBase = `${window.location.protocol}//${window.location.hostname}:8000`;

export default {
    data() {
        return {
            username: "",
            full_name: "",
            email: "",
            password: "",
            responseMessage: "",
            responseMessageType: "",
        };
    },
    methods: {
        submitForm() {
            const formData = {
                username: this.username,
                full_name: this.full_name,
                email: this.email,
                password: this.password,
            };

            axios
                .post(`${urlBase}/api/records/`, formData)
                .then((response) => {
                    if (response.status === 201) {
                        this.responseMessage = "Cadastro realizado com sucesso!";
                        this.responseMessageType = "alert-success";
                    } else {
                        this.responseMessage = "Erro ao cadastrar. Por favor, tente novamente.";
                        this.responseMessageType = "alert-danger";
                    }
                })
                .catch((error) => {
                    console.error("Erro ao fazer a requisição:", error);
                    this.responseMessage = "Erro ao cadastrar. Por favor, tente novamente.";
                    this.responseMessageType = "alert-danger";
                });
        },
    },
    
};
</script>
  
<style scoped>
.btn-color {
    background-color: #0e1c36;
    color: #fff;
}

.btn-color:hover {
    background-color: #0d1a33;
    color: #fff;
}

.alert {
    padding: 1rem;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
}

.alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
}

.alert-danger {
    background-color: #f8d7da;
    border-color: #f5c6cb;
    color: #721c24;
}

a {
    text-decoration: none;
}
</style>
  