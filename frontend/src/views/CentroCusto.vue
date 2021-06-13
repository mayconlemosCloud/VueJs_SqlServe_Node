<template>
  <div>
  <Navbar/>


  <div class="container">
    <div class="row">
      <div class="col">
                  <form  @submit="onSubmit">
                 
                    <div class="mb-3">
                      <label for="Nome" class="form-label">Nome</label>
                      <input v-model="form.nome" type="text" class="form-control"  autocomplete="on">
                    </div>                
        
                
                    
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                  </form>
      </div>

      <div class="col">

        <table class="table">
        <thead>
          <tr>
          
        
        
            <th scope="col">Centro de Custo</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        
          <tr v-for="row in listaDeCentrocusto" :key="row.id">
       
            <td>{{row.nome}}</td>       
           
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


export default {
  components: { Navbar },

  data(){
    return{
      form:{
        id:null,
        nome:'',
       

      },

     listaDeCentrocusto:[] 
    }
  },
  methods:{

    onSubmit(e){


    e.preventDefault();

      if(this.form.id == null || this.form.id  == 'undefined'){
        axios
        .post("http://localhost:3000/CentroCusto/inserir", this.form)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.buscarTodosCentroCusto();
        });     
    }else if(this.form.id){
      console.log(this.form)
       axios.post("http://localhost:3000/CentroCusto/Atualizar/", this.form)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.buscarTodosCentroCusto();
        }); 

        }

    },

    deletar(id){
        console.log(id)
         axios.post('http://localhost:3000/CentroCusto/delete/' + id)
            .then(response => {
                console.log(response.data)
                alert(response.data.message)
             
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
              this.buscarTodosCentroCusto();
            })
    },
    editar(id){
      console.log(id)
         axios.post('http://localhost:3000/CentroCusto/Buscar/' + id)
                .then(response => {
                  console.log(response.data.nome)
                     this.form = response.data
                    
                })
    },
    buscarTodosCentroCusto(){
       axios.get('http://localhost:3000/CentroCusto/select')
            .then(response => {
                console.log(response)
               this.listaDeCentrocusto = response.data
            })
    }
  },

  mounted(){     
          
          
          axios.get('http://localhost:3000/departamento/select')
            .then(response => {
           
               this.listaDeDepartamento = response.data
            })

              axios.get('http://localhost:3000/centrocusto/select')
            .then(response => {
               
               this.listaDeCentrocusto = response.data 
       
            })
      
      
    
    }
}
</script>

<style scoped>

</style>