<template>
<div>

        <vs-navbar  class="nabarx" style="background-color: white; padding: 10px 10px 10px 10px; border-radius:10px">
      <div slot="title">
      <div class="flex-Center" slot="title">
         <img width="65" src="../assets/Logo.png" />
        <vs-navbar-title style="width:  !important">
         QUEUING SYSTEM
        </vs-navbar-title>
      </div>
      </div>
      <vs-navbar-item index="0">
       <vs-avatar  color="primary" :text="vSelectDepartment"/>
       
      </vs-navbar-item>
     
    </vs-navbar>

  <div>
    <vs-tabs :color="colorx">
      <vs-tab label="Active Screens" icon="tv" @click="colorx = 'white'">
      <div>
      <vs-list class="custom-Shadow custom-border-10"  style= "background-color: white ; height: 60vh; overflow-y: auto">
      <vs-list-header title="Available Screens"></vs-list-header>
      <div>
      </div>
        <div v-for="screen in Data" :key="screen.id">
            <vs-list-item v-if="screen.status && screen.department == vSelectDepartment" :title="screen.stationName" :subtitle="screen.department+' - '+ 'Current Number: '  + screen.currentNumber + ' ' + 'Type: ' + screen.type">
            <vs-button    style="margin-right: 10px;" v-on:click="nextNumber(screen.id, screen.stationName, screen.currentNumber,  screen.type)" color="primary" type="border" icon="arrow_forward_ios"></vs-button>
              
              <vs-button style="margin-right: 10px;" v-on:click="openController(screen.id, screen.stationName, screen.currentNumber, screen.type)" color="primary" type="border" icon="tune"></vs-button>
              <vs-button style="margin-right: 10px;" v-on:click="generateLink(screen.id, screen.type)" color="primary" type="border" icon="personal_video"></vs-button>
              <vs-button v-on:click="disablePopup(screen.id, screen.stationName, screen.currentNumber, screen.type)" color="primary" type="border" icon="delete"></vs-button>
            </vs-list-item>
          </div>
      </vs-list>
        <vs-button v-on:click="popupActivo=true" color="danger" :disabled="!vSelectDepartment" style="margin-top:10px" type="gradient" icon="add">Add Screen</vs-button>
        <vs-button v-on:click="addSelectDepartmentpopup=true" color="danger" style="margin-top:10px; margin-left:10px" type="gradient" icon="rule">Select Department</vs-button>
        <vs-button v-on:click="AddDepartmentPopup = true" color="danger" style="margin-top:10px; margin-left:10px" type="gradient" icon="add_box">Add Department</vs-button>
        <vs-button v-on:click="logout" color="danger" style="margin-top:10px; margin-left:10px" type="gradient" icon="restart_alt">reset</vs-button>

      </div>
      </vs-tab>
      <vs-tab label="Deleted Screens" icon="delete" @click="colorx = 'white'">
      <div>
       <vs-list class="custom-Shadow custom-border-10"  style= "background-color: white ; height: 60vh; overflow-y: auto">
      <vs-list-header title="Deleted Screens"></vs-list-header>
        <div v-for="screen in Data" :key="screen.id">
            <vs-list-item v-if="!screen.status && screen.department == vSelectDepartment" :title="screen.stationName" :subtitle="'Current Number: ' + screen.currentNumber">
              <vs-button style="margin-right: 10px;" v-on:click="restorePopup(screen.id, screen.stationName, screen.currentNumber, screen.type)" color="primary" type="border" icon="settings_backup_restore"></vs-button>
            </vs-list-item>
          </div>
      </vs-list>
      </div>
      </vs-tab>

    </vs-tabs>
  </div>
 
 
  <div class="">

  <vs-popup class="holamundo"  title="Add Screen" :active.sync="popupActivo">
     
     <vs-row vs-type="flex" vs-justify="center">
      <vs-col  vs-type="flex" vs-justify="center" vs-align="center" vs-w="10">
       <vs-input label="Screen Name"  placeholder="Input Screen Name" v-model="ScreenNameVal"/>
        <vs-select
          style="margin-left:2px"
          class="selectExample"
          label="Select Type"
            v-model="screenType"
          >
          <vs-select-item  value="Single User" text="Single User" />
            <vs-select-item  value="Multiple User" text="Multiple User" />
        </vs-select>
      </vs-col>
    </vs-row>

    <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
        <div style="margin-top: 10px">
        <vs-button v-on:click="addScreen"  color="primary" type="border" :disabled="this.ScreenNameVal === ''" >add</vs-button>
       </div>
      
      </vs-col>
    </vs-row>
    </vs-popup>


  <vs-popup class="holamundo"  title="Delete Screen" :active.sync="disableScreen">

    <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
      
        <div style="margin-top: 10px">
        <p  style="margin-bottom: 10px">Are you sure to delete this Screen?</p>
        <div style="display: flex">
          <vs-button v-on:click="updateStatus" style="margin-right: 5px" color="danger" type="border" >Delete</vs-button>
        <vs-button v-on:click="disableScreen = false" color="primary" type="border" >cancel</vs-button>
        </div>

       </div>
      </vs-col>
    </vs-row>
    </vs-popup>

  <vs-popup class="holamundo"  title="Delete Screen" :active.sync="restoreDataPopup">

    <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
      
        <div style="margin-top: 10px">
        <p  style="margin-bottom: 10px">Restore this Screen?</p>
        <div style="display: flex">
          <vs-button v-on:click="restoreStatus" style="margin-right: 5px" color="danger" type="border" >Yes</vs-button>
        <vs-button v-on:click="restoreDataPopup = false" color="primary" type="border" >No</vs-button>
        </div>

       </div>
      </vs-col>
    </vs-row>
    </vs-popup>

  <vs-popup class="holamundo"  title="Controller" :active.sync="editPopup">

    <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="2">
      
        <div style="margin-top: 10px">
        <vs-input-number v-model="number"/>
        <vs-button color="primary" v-on:click="updateCurrentNumber" type="border" icon="update">UPDATE</vs-button>
       </div>
      </vs-col>
    </vs-row>
    </vs-popup>

  <vs-popup class="holamundo"  title="Generated Screen URL" :active.sync="showGeneratedPopup">

    <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
      
        <div style="margin-top: 10px">
           <p s>Copy this Link and Paste to a browser.</p>
           <vs-input style="margin-top: 10px" class="inputx" placeholder="Generated Link"  v-model="screenGeneratedURL"/>
       </div>
      </vs-col>
    </vs-row>
    </vs-popup>


      <vs-popup class="holamundo"  title="Configuration" :active.sync="configSetpopup">

    <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
      
        <div style="margin-top: 10px">
           <vs-input style="margin-top: 10px" class="inputx" placeholder="Department"  v-model="departmentData"/>
         
              <vs-button color="primary" style="margin-top: 10px"  v-on:click="saveConfig" type="border" icon="save">Save</vs-button>
       </div>
      </vs-col>
    </vs-row>
    </vs-popup>


    
   <vs-popup class="holamundo"  title="Select Department" :active.sync="addSelectDepartmentpopup">

    <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
      
        <div style="margin-top: 10px">
        <vs-select
          class="selectExample"
          label="Select Department"
         v-model="departmentData"
          >
          <vs-select-item :key="index" :value="item.value" :text="item.department" v-for="item,index in DepartM" />
          </vs-select>
         
          <vs-button color="primary"  :disabled="!departmentData"  style="margin-top: 10px"  v-on:click="saveConfig" type="border" icon="save">Save </vs-button>
       </div>
      </vs-col>
    </vs-row>
    </vs-popup>

  <vs-popup class="holamundo"  title="Add Department" :active.sync="AddDepartmentPopup">

    <vs-row vs-type="flex" vs-justify="center">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="5">
      
        <div style="margin-top: 10px">
            <vs-input class="inputx" placeholder="New Department" v-model="addDeptVal"/>

            <vs-button color="primary" style="margin-top: 10px"  v-on:click="addDepartment" type="border" :disabled="addDeptVal === ''" icon="save">Save </vs-button>
       </div>
      </vs-col>
    </vs-row>
    </vs-popup>
  </div>
</div>
</template>



<script>
// @ is an alias to /src

import axios from 'axios';
var airport = new Audio('/airport_sound.mp3');

const routeUrl = "http://quemanagement.lguquezon.com"

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
      DepartM : null,
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
      showGeneratedPopup: false,
      screenGeneratedURL: null,
      isConfig: false,
      configSetpopup: false,
      addSelectDepartmentpopup: false,
      AddDepartmentPopup: false,
      conUrlRoute : "",
      conServerRoute : "",
      conConfigRoute : "",
      departmentData: "",
      vSelectDepartment: "",
      addDeptVal:"",
      highestNum: 0,
      screenType: "Single User",
      typeSelection: "",
      allMulticount: 0,
      disableMulti: false
    }
  },
  mounted() {
    


  },
  methods: {
  generateLink(value, type){
    if(type === "Single User"){
      this.screenGeneratedURL = routeUrl + '/screen/' + value
    }else{
      this.screenGeneratedURL = routeUrl + '/multiple/' + value
    }

    this.showGeneratedPopup = true
    this.screenType = type

  },

  openController(id,name,cn, type){
    this.editPopup = true
    let url = baseUrl + '/' + id
    this.targetURL = url
    this.targetName = name
    this.number = cn
    this.screenType = type
  },
  nextNumber(id,name,cn,type){
    let url = baseUrl + '/' + id
    this.targetURL = url
    this.targetName = name
    this.number = cn
    this.screenType = type
    if(type === "Single User"){
          this.nextCurrentNumber()
    }else{
          this.nextCurrentNumberMulti()
    }

  },
  disablePopup(id,name,cn , type){
  
   this.disableScreen = true
   let url = baseUrl + '/' + id
   this.targetURL = url
   this.targetName = name
   this.targetcurrentNumber = cn
   this.screenType = type
   
  },

  restorePopup(id,name,cn, type){
  
   this.restoreDataPopup = true
   let url = baseUrl + '/' + id
   this.targetURL = url
   this.targetName = name
   this.targetcurrentNumber = cn
   this.screenType = type
   
  },
   logout(){
  
     localStorage.removeItem("department");
        this.refetch()
  },
  async addScreen(){
    try{
        const res = await axios.post(baseUrl, {stationName: this.ScreenNameVal, currentNumber: 1, status: true,department: this.departmentData, type: this.screenType});

        this.Data = [...this.Data, res.data]

        this.ScreenNameVal = ""
        this.popupActivo = false
        this.addsuccess()

        }catch(e){
          console.log(e);
        }
    },

      async addDepartment(){
    try{
        const res = await axios.post(departmentUrl, {department: this.addDeptVal, value: this.addDeptVal});

        this.DepartM = [...this.DepartM, res.data]

        this.addDeptVal = ""
        this.AddDepartmentPopup = false
        this.addDeptsuccess()

        }catch(e){
          console.log(e);
        }
    },
  async updateStatus(){
        try{
      const res = await axios.put (this.targetURL,{
        status: false,
        currentNumber: this.targetcurrentNumber,
        stationName: this.targetName,
        department: this.departmentData,
        type: this.screenType
      });       
    
      this.delete()
      this.disableScreen = false
      this.refetch()
  
          }catch(e){
          console.log(e);
        }

    },
    

  async saveConfig(){
    try{
     
      const res = await axios.put (configUrl + '/0',{
        department: this.departmentData
      });       
     localStorage.setItem('department',this.departmentData);
      this.updated()
      this.addSelectDepartmentpopup = false
      this.refetch()
      console.log("vSelectDepartment: ", this.vSelectDepartment)
     
  
      }catch(e){
      console.log(e);
      }
    },

      async updateCurrentNumber(){
        try{
      const res = await axios.put (this.targetURL,{
        status: true,
        currentNumber: parseInt(this.number),
        stationName: this.targetName,
        department: this.departmentData,
        type: this.screenType
      });       

      let working = new SpeechSynthesisUtterance(); 
      working.pitch = 10;
      working.volume = 10;
      working.rate = 1;
      working.text = "Now Serving number" + this.number + "Please Proceed to" + this.targetName;
      airport.play();
      setTimeout(function(){window.speechSynthesis.speak(working); }, 3000);
      setTimeout(function(){airport.play(); }, 7000);

    
      this.updated()
      this.refetch()
          }catch(e){
          console.log(e);
        }

    },

    
      async nextCurrentNumber(){
      try{
      const res = await axios.put (this.targetURL,{
        status: true,
        currentNumber: parseInt(this.number + 1),
        stationName: this.targetName,
        department: this.departmentData,
        type: this.screenType
      });       

      let working = new SpeechSynthesisUtterance(); 
      working.pitch = 10;
      working.volume = 10;
      working.rate = 1;
      working.text = "Now Serving number" +parseInt(this.number + 1) + "Please Proceed to" + this.targetName ;

      airport.play();
      setTimeout(function(){window.speechSynthesis.speak(working); }, 3000);
      setTimeout(function(){airport.play(); }, 7000);
    
      this.updated()
      this.refetch()
          }catch(e){
          console.log(e);
        }

    },
    async nextCurrentNumberMulti(){
      try{
      const res = await axios.put (this.targetURL,{
        status: true,
        currentNumber: parseInt(this.highestNum + 1),
        stationName: this.targetName,
        department: this.departmentData,
        type: this.screenType
      });       

      let working = new SpeechSynthesisUtterance(); 
      working.pitch = 10;
      working.volume = 10;
      working.rate = 1;
      working.text = "Now Serving number" +parseInt(this.highestNum + 1) + "Please Proceed to" + this.targetName ;

      airport.play();
      setTimeout(function(){window.speechSynthesis.speak(working); }, 3000);
      setTimeout(function(){airport.play(); }, 7000);
    
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
        stationName: this.targetName,
        department: this.departmentData,
        type: this.screenType
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
      addDeptsuccess(){
      function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }
      let color = `rgb(${getRandomInt(0,255)},${getRandomInt(0,255)},${getRandomInt(0,255)})`
      this.$vs.notify({title:'Notification',text:'Department Successfully Added',color:color,position:'top-right'})
    },
    async refetch(){
      try{
        this.highestNum= 0
        const res = await axios.get(baseUrl);
        const con = await axios.get(configUrl);
        const dep = await axios.get(departmentUrl);
        this.Data = res.data
        this.DepartM = dep.data
        console.log(res.data);
        this.departmentData =  localStorage.getItem('department');
         this.vSelectDepartment = localStorage.getItem('department');
        for(let x = 0; x < res.data.length; x++){
          if(res.data[x].currentNumber >  this.highestNum  && res.data[x].type === 'Multiple User' &&  this.departmentData ===  res.data[x].department){
          this.highestNum = res.data[x].currentNumber
          console.log('dadadad',  res.data[x].currentNumber)
          }  

        }
        // if(con.data[0].department){
        //  this.addSelectDepartmentpopup = false
        // }else{
        //   this.addSelectDepartmentpopup = true
        // }


    
      }catch(e){
        console.log(e);
      }
    }
  },
  async created(){
      try{
        this.highestNum= 0
        const res = await axios.get(baseUrl);
        const con = await axios.get(configUrl);
        const dep = await axios.get(departmentUrl);
        this.Data = res.data
        this.DepartM = dep.data
        this.departmentData =  localStorage.getItem('department');
        console.log("asdasdasdasdsadsa" + this.departmentData);
        this.vSelectDepartment = localStorage.getItem('department');
        for(let x = 0; x < res.data.length; x++){
          if(res.data[x].currentNumber >  this.highestNum && res.data[x].type === 'Multiple User' &&  this.departmentData ===  res.data[x].department ){
          this.highestNum = res.data[x].currentNumber
          console.log('dadadad',  res.data[x].currentNumber)
          }  


        }



        // localStorage.setItem('department',this.vSelectDepartment);
        // alert( localStorage.getItem('department') );

        // for(let x = 0; x < this.DepartM.length; x++){
        // if(this.vSelectDepartment === this.DepartM[x].department){
        //     localStorage.setItem('department',departmentData);
        //   this.vSelectDepartment = localStorage.getItem('department');
        // }else{
       
        //     this.vSelectDepartment = con.data[0].department
        // }
        // }
   
      
        // }
        // if(this.vSelectDepartment === )
        // this.$router.push({
        //   name: 'Home',
        //   params: { data: yourData}
        // });
        // if(con.data[0].department){
        //  this.addSelectDepartmentpopup = false
        // }else{
        //   this.addSelectDepartmentpopup = true
        // }

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

.flex-Center{
  display: flex;
  align-items: center;
}
</style>