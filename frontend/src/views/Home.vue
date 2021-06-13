<template>
  <div >
   <Navbar/>
  
  <div class="container">


    <div class="row">
    
    <div class="col">

   

    </div>

    <div class="col">


    </div>


    </div>
   

  </div>
 
  </div>
</template>


<script>
import { mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'

//import Usuarios from '../views/Usuarios.vue'

export default ({
  components:{
    Navbar
    
    },

  data() {
    return{
      token : sessionStorage.getItem('token')
    }
    
  },

  computed:{
        ...mapGetters('auth',{
            gettersAuthData:'getAuthData'
        })
    }
})
</script>

