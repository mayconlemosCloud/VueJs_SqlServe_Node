<template>
  
 <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">Maycon Lemos</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>


   
      <b-nav-item to="/usuarios" >Cadastrar Usuário</b-nav-item>  
      <b-nav-item to="/departamento" >Cadastrar Departamento</b-nav-item>  
      <b-nav-item to="/Centrocusto" >Cadastrar Centro Custo</b-nav-item>  

    



      </b-navbar-nav>

    
      <b-navbar-nav class="ml-auto"> 
       

        

              
          <b-dropdown-item  @click="Logout">Sair</b-dropdown-item>
   

      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {

  methods:{
    Logout(){
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        this.$router.push('/login')
    }
  }

}
</script>

<style scoped>

.nav-link.logout{
  cursor: pointer;
}

</style>