<template>
  <div>
  <Navbar/>


  <div class="container">
    <div class="row">
      <ImportExcel @jsonData="receberJson($event)"/>

    
      <div class="col">
                  <form  @submit="onSubmit">
                    <div class="mb-3">
                      <label for="Nome" class="form-label">Nome</label>
                      <input v-model="form.nome" type="text" class="form-control" id="Nome" aria-describedby="Nome">
                      
                    </div>
                    <div class="mb-3">
                      <label for="Senha" class="form-label">Senha</label>
                      <input v-model="form.senha" type="password" class="form-control"  autocomplete="on">
                    </div>
                     
                      <div class="mb-3">
                    <label for="Senha" class="form-label">Departamento</label>
                   <select v-model="form.departamento" class="form-select" aria-label="Default select example">                     
                    <option v-for="row in listaDeDepartamento" :key="row.id" :value="row.id">{{row.nome}}</option>                       
                   </select>
                       </div>

                           
                    <div class="mb-3">
                       <label for="Cargo" class="form-label">Cargo</label>
                      <input v-model="form.cargo" type="text" class="form-control" id="Cargo" aria-describedby="Cargo">
                  </div>
                    
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                  </form>
      </div>

      <div class="col">

        <table class="table">
        <thead>
          <tr>
          
            <th scope="col">Nome</th>
            <th scope="col">Departamento</th>
            <th scope="col">Cargo</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        
          <tr v-for="row in listaDeUsuarios" :key="row.id">
       
            <td>{{row.nome}}</td>
            <td>{{row.departamento}}</td>
            <td>{{row.cargo}}</td>
            <td> <button @click="deletar(row.id)" class="btn btn-danger">Deletar</button> 
            <button @click="editar(row.id)" class="btn btn-danger">Editar</button>  </td>
            
    
          </tr>
        </tbody>
      </table>

      </div>
    </div>
  </div>


  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/Navbar.vue'
import ImportExcel from './ImportExcel.vue'


export default {
  components: { Navbar,ImportExcel },

  data(){
    return{
      form:{
        id:null,
        nome:'',
        senha:'',
        departamento:'',
        cargo:''
      },

     UsuariosImportados : null,
     listaDeUsuarios:[], 
     listaDeDepartamento:[] 
    }
  },
  methods:{
    receberJson(payload){

       this.UsuariosImportados = payload

        axios
        .post("http://localhost:3000/importar", this.UsuariosImportados)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.buscarTodosUsuarios();
        }); 
     
    },

    onSubmit(e){


    e.preventDefault();

      if(this.form.id == null || this.form.id  == 'undefined'){
        axios
        .post("http://localhost:3000/inserir", this.form)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.buscarTodosUsuarios();
        });     
    }else if(this.form.id){
  
       axios.post("http://localhost:3000/AtualizarUsuario/", this.form)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.buscarTodosUsuarios();
        }); 

        }

    },

    deletar(id){
        console.log(id)
         axios.post('http://localhost:3000/delete/' + id)
            .then(response => {
                console.log(response.data)
                alert(response.data.message)
             
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
              this.buscarTodosUsuarios();
            })
    },
    editar(id){
      console.log(id)
         axios.post('http://localhost:3000/BuscarUsuario/' + id)
                .then(response => {
                  console.log(response.data.nome)
                     this.form = response.data
                })
    },
    buscarTodosUsuarios(){
       axios.get('http://localhost:3000/select')
            .then(response => {
                console.log(response)
               this.listaDeUsuarios = response.data
            })
    }
  },

  mounted(){     
          
          
          axios.get('http://localhost:3000/select')
            .then(response => {
                console.log(response)
               this.listaDeUsuarios = response.data
            })
            
            axios.get('http://localhost:3000/departamento/select')
            .then(response => {
           
               this.listaDeDepartamento = response.data
            })
      
    
    }
}
</script>

<style scoped>

</style>