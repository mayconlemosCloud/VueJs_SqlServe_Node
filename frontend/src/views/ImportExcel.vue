<template>
  <div id="app">
    <label for="" class="mt-5">Importe arquivo seus usuários de arquivo excel</label> <br>
    <vue-xlsx-table  @on-select-file="selecionar">Importar</vue-xlsx-table>
  </div>
</template>
 
<script>

export default {
  name: 'app',
  methods: {
    selecionar(convertedData) {
    
      this.$emit("jsonData",convertedData.body);
    }
  }
}
</script>