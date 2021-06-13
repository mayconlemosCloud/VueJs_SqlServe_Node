<template>
  <div>
  <Navbar/>


  <div class="container">
    <div class="row">
      <div class="col">
                  <form  @submit="onSubmit">
                 
                    <div class="mb-3">
                      <label for="Departamento" class="form-label">Departamento</label>
                      <input v-model="form.nome" type="text" class="form-control"  autocomplete="on">
                    </div>
                  
        
                   <select v-model="form.idcentrocusto" class="form-select" aria-label="Default select example">                       


                   
                    <option v-for="row in listaDeCentrocusto" :key="row.id" :value="row.id">{{row.nome}}</option>
                        
                                           
                   </select>
                    
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                  </form>
      </div>

      <div class="col">

        <table class="table">
        <thead>
          <tr>
          
        
            <th scope="col">Departamento</th>
            <th scope="col">Centro de Custo</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        
          <tr v-for="row in listaDeDepartamento" :key="row.id">
       
            <td>{{row.nome}}</td>       
            <td>{{row.centrocusto}}</td>
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
        idcentrocusto:'',

      },
     listaDeDepartamento:[] ,
     listaDeCentrocusto:[] 
    }
  },
  methods:{

    onSubmit(e){


    e.preventDefault();

      if(this.form.id == null || this.form.id  == 'undefined'){
        axios
        .post("http://localhost:3000/departamento/inserir", this.form)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.buscarTodosDepartamentos();
        });     
    }else if(this.form.id){
      console.log(this.form)
       axios.post("http://localhost:3000/departamento/Atualizar/", this.form)
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.buscarTodosDepartamentos();
        }); 

        }

    },

    deletar(id){
        console.log(id)
         axios.post('http://localhost:3000/departamento/delete/' + id)
            .then(response => {
                console.log(response.data)
                alert(response.data.message)
             
            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
              this.buscarTodosDepartamentos();
            })
    },
    editar(id){
      console.log(id)
         axios.post('http://localhost:3000/departamento/Buscar/' + id)
                .then(response => {
                  console.log(response.data.nome)
                     this.form = response.data
                    
                })
    },
    buscarTodosDepartamentos(){
       axios.get('http://localhost:3000/departamento/select')
            .then(response => {
                console.log(response)
               this.listaDeDepartamento = response.data
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