<template style="">
<div>
 <vs-row  >
 <div  style="background-color:transparent;  width: 50vw; height: 70vh; margin: 0 0 0 0 !important;">
 <div class="grid-container" v-if="ctype === currentDepartment">
   <div class="grid-item" :key="index" v-for="col,index in allData" v-if="col.type === 'Multiple User' && col.status && col.department === currentDepartment">
        <vs-card  style="background-color:transparent;  margin: 0 0 0 0 !important; border: 3px solid white; width:24vw; height: 25vh; display:flex; align-items: center; justify-content: center; color:white">
            <h1>{{col.stationName}}</h1><br>
              <h1 style="color:yellow; font-size: 5vw">{{col.currentNumber}}</h1><br>
            <h1>Now Serving</h1>
        </vs-card>
  </div>
  </div>
  <div v-if="ctype !== currentDepartment">
   <p style="font-size: 10vh; color: white; font-weight: bold">  Please Select a Department</p>
  </div>
 </div>
    <vs-col vs-type="flex" vs-justify="center" style="border-left: 5px solid white; padding-left: 15px"  vs-align="center" vs-w="5">
    <video width="100%" id="vid" height="100%"   loop autoplay muted>
      <source src="/covid.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    </vs-col>
 </vs-row>
 </div>
</template>



<script>
// @ is an alias to /src

import axios from 'axios';



const baseUrl = "http://192.168.32.6:3000/queue"

const configUrl = "http://192.168.32.6:3000/config"

const departmentUrl = "http://192.168.32.6:3000/department"


export default {
  name: 'About',
  components: {
    
  },
  data() {
    return {
      Data : null,
      popupActivo:false,
      disableScreen: false,
      ScreenNameVal: '',
      targetURL: null,
      targetName: null,
      targetcurrentNumber: null,
      colorx: '#8B0000',
      availableData: null,
      archivedData:null,
      restoreDataPopup: false,
      editPopup: false,
      number:0,
      screenDisplaypopup: false,
      generatedScreenURL: null,
      cnumber:null,
      ctitle: null,
      status: false,
      allData: null,
      ctype: null,
      currentDepartment: null,
      mainID:  null,
      latestUpdate: "",
      highestNum: 0
    }
  },
  mounted() {
     this.timer = setInterval(
       this.refetch
    , 2000);
  },
  methods: {

  openController(id,name,cn){
    this.editPopup = true
    let url = baseUrl + '/' + id
    this.targetURL = url
    this.targetName = name
    this.number = cn
  },
  disablePopup(id,name,cn){
  
   this.disableScreen = true
   let url = baseUrl + '/' + id
   this.targetURL = url
   this.targetName = name
   this.targetcurrentNumber = cn
   
  },

  restorePopup(id,name,cn){
  
   this.restoreDataPopup = true
   let url = baseUrl + '/' + id
   this.targetURL = url
   this.targetName = name
   this.targetcurrentNumber = cn
   
  },
  async addScreen(){
    try{
        const res = await axios.post(baseUrl, {stationName: this.ScreenNameVal, currentNumber: 1, status: true});

        this.Data = [...this.Data, res.data]

        this.ScreenNameVal = ""
        this.popupActivo = false
        this.addsuccess()

        }catch(e){
          console.log(e);
        }
      },
  async updateStatus(){
        try{
      const res = await axios.put (this.targetURL,{
        status: false,
        currentNumber: this.targetcurrentNumber,
        stationName: this.targetName
      });       
    
      this.delete()
      this.disableScreen = false
    this.refetch()
  
          }catch(e){
          console.log(e);
        }

    },

      async updateCurrentNumber(){
        try{
      const res = await axios.put (this.targetURL,{
        status: true,
        currentNumber: this.number,
        stationName: this.targetName
      });       
 
      this.updated()
      this.refetch()
          }catch(e){
          console.log(e);
        }

    },

    async restoreStatus(){
        try{
      const res = await axios.put (this.targetURL,{
        status: true,
        currentNumber: this.targetcurrentNumber,
        stationName: this.targetName
      });       
    
      this.restored()
      this.restoreDataPopup = false
      this.refetch()
    
  
          }catch(e){
          console.log(e);
        }

    },
    restored(){
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
      this.$vs.notify({title:'Notification',text:'Screen Successfully Restored',color:color,position:'top-right'})
    },
    delete(){
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
      this.$vs.notify({title:'Notification',text:'Screen Successfully Deleted',color:color,position:'top-right'})
    },
    updated(){
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
      this.$vs.notify({title:'Notification',text:'Updated Successfully',color:color,position:'top-right'})
    },
      addsuccess(){
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
      this.$vs.notify({title:'Notification',text:'Screen Successfully Added',color:color,position:'top-right'})
    },
    async refetch(){
      try{
      const res = await axios.get(baseUrl + '/' + this.$route.params.id);
      const con = await axios.get(configUrl);     
      this.ctitle = res.data.stationName
      this.cnumber = res.data.currentNumber
      this.status = res.data.status
      this.mainID = this.$route.params.id
      this.ctype = res.data.department
      this.currentDepartment = localStorage.getItem('department')
    }catch(e){
      console.log(e);
    }

   try{
      const resall = await axios.get(baseUrl);
      this.allData = resall.data
      // for(let x = 0; x < resall.data.length; x++){
      //   if(resall.data[x].currentNumber >  this.highestNum && this.currentDepartment === resall.data[x].department){
      //   this.highestNum = resall.data[x].currentNumber
      //   console.log('dadadad',  resall.data[x].currentNumber)
      //   this.latestUpdate = resall.data[x].stationName
      //   this.cnumber = resall.data[x].currentNumber
      //   }  
      // }
      this.mainID = this.$route.params.id
      console.log(this.allData)
    }catch(e){
      console.log(e);
    }

    }
  },
  async created(){
    try{
      const res = await axios.get(baseUrl + '/' + this.$route.params.id);
      const con = await axios.get(configUrl);
      console.log(res.data.currentNumber);
      this.ctitle = res.data.stationName
      this.latestUpdate =  res.data.stationName
      this.cnumber = res.data.currentNumber
      this.status = res.data.status,
      this.allData = res.data
      this.ctype = res.data.department
      this.currentDepartment = localStorage.getItem('department')
      this.mainID = this.$route.params.id
    }catch(e){
      console.log(e);
    }

      
    try{
      const resall = await axios.get(baseUrl);
      this.mainID = this.$route.params.id
      this.allData = resall.data
      // for(let x = 0; x < resall.data.length; x++){
      //   if(resall.data[x].currentNumber >  this.highestNum && this.currentDepartment === resall.data[x].department){
      //   this.highestNum = resall.data[x].currentNumber
      //   console.log('dadadad',  resall.data[x].currentNumber)
      //   this.latestUpdate = resall.data[x].stationName
      //   this.cnumber = resall.data[x].currentNumber 
      //   }  
      // }
      console.log(this.allData)
    }catch(e){
      console.log(e);
    }

    
  }
  
}
</script>


<style>
.custom-Shadow{
box-shadow: 1px 0px 3px 0px rgba(0,0,0,0.45);
-webkit-box-shadow: 1px 0px 3px 0px rgba(0,0,0,0.45);
-moz-box-shadow: 1px 0px 3px 0px rgba(0,0,0,0.45);
}

.custom-border-10{
  border-radius: 10px;
}
.custom-Width{
  width: 100% !important;
  height: auto !important;
}
.grid-container {
  display: grid;
  grid-template-columns: auto auto ;
  margin-top: -40px;

}
.grid-item {
margin-bottom: 20px;

 
}
</style>