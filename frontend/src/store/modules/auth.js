import {  jwtDecrypt,tokenAlive } from "../../shared/jwtHelper";


import axios from 'axios'

const state = () => ({
    authData: {
      token: "",
      refreshToken: "",
      tokenExp: "",
      userId: "",
      nome: "",
    },
    loginStatus:"",
  });
   
  const getters = {
      getLoginStatus(state){
        return state.loginStatus;
      },

      getAuthData(state){
        return state.authData;
      },

      isTokenActive(state) {
        console.log(state)
        if (!state.authData) {
          
          return false;
        }
        return tokenAlive(state.authData.tokenExp);
      },
  };
   
  const actions = {

    async login({ commit }, payload) {
  
     
      const response = await axios
        .post("http://localhost:3000/login", payload)
        .catch((err) => {
          console.log(err);
        });

  
       
     
      if (response && response) {
        
        commit("saveTokenData", response);
        commit("setLoginStatu", "success");

      } else {
        commit("setLoginStatu", "failed");
      }


    },
  };
   
  const mutations = {
    saveTokenData(state, data) {

      
       
        localStorage.setItem("access_token", data.data);
        localStorage.setItem("refresh_token", data.data);
     
        const jwtDecodedValue = jwtDecrypt(data.data);
     
        console.log(jwtDecodedValue)

        const newTokenData = {
          token: data.token,
          refreshToken: data.token,
          tokenExp: jwtDecodedValue.exp,        
          nome: jwtDecodedValue.nome,
        };       

        state.authData = newTokenData; 

      },
      setLoginStatu(state, value){
         state.loginStatus = value;
      }
  };
   
  export default{
      namespaced:true,
      state,
      getters,
      actions,
      mutations
  }