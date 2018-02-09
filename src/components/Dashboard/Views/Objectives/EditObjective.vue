<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Update Objective {{objective_id.title}} </h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-6">
          	<div class="col-md-12">
							<fg-input type="text"
                      label="Title"                      
                      placeholder="Title"
                      v-model="objective_id.title">
            	</fg-input>
          	</div>
          	<div class="col-md-12">
              <div class="form-group">
                <label>Organizations</label>
                <v-select v-model="objective.organizations" :options="organizations" label="name">
                  <template slot="option" slot-scope="option">
                      <img style="width=20px" class="fa" :src="option.image_url"></img>
                      {{ option.name }}
                  </template>
                </v-select>
              </div>
            </div>
						<div class="col-md-12">
	            <div class="form-group">
	              <label>Release Date</label><br>
	              <date-picker v-model="objective_id.release_date" format="yyyy-MM-dd" lang="en" ></date-picker>
	            </div>
	          </div>
            <div class="col-md-12">
              <label class="image-tag">Image {{objective.image_url}}</label>
              
              <fileupload ref="my_upload" v-model="objective_id.image_url" target="http://138.68.19.227:3000/" action="POST"> </fileupload>
            <!--<CustomImageUpload></CustomImageUpload>-->
            </div>
          </div>
          
          <div class="col-md-6">
          	<div class="col-md-12">
							<div class="form-group">
	              <label>Short Description</label>
	              <textarea rows="4" class="form-control border-input"
	                        placeholder="Here can be your short description"
	                        v-model="objective_id.short_desc">

	              </textarea>
	            </div>
	          </div>
	          <div class="col-md-12">
	            <div class="form-group">
	              <label>Description</label>
	              <textarea rows="4" class="form-control border-input"
	                        placeholder="Here can be your description"
	                        v-model="objective_id.description">

	              </textarea>
	            </div>
	          </div>
          </div>                     
        </div>          
        
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="saveObjective">
            Create Objective
          </button>
        </div>
        <div class="clearfix"></div>
      </form>        
    </div>
  </div>
</template>
<script>


import DatePicker from 'vue2-datepicker'
import FileUpload from 'vue-simple-upload/dist/FileUpload'
import CustomImageUpload from 'components/Dashboard/Views/ImageUpload.vue'

//import uploader from 'vuejs-uploader'
  export default {
  	components: { DatePicker, 'fileupload': FileUpload, CustomImageUpload },
  	name: 'EditObjective',
    props: ["objective_id"],
    data () {
      return {
        objective: {
				title: '',
				short_desc: '',
				description: '',
				release_date: '',
        image_url: '',
				organization_id: '',
        organizations:''				  
      },
      organizations: []
    }
  },
    methods: {
      saveObjective () {
        let image = $( "input[name='fileUpload']" ).val().replace(/C:\\fakepath\\/i, '');
      	let post_data= {
      		title: '',
					short_desc: '',
					description: '',
					release_date: '',
					organization_id: '',
          source_link: '',
          image_url: '',
          action_link:''
      	}        

        var args = {
				    data: post_data,
				    headers: { "Content-Type": "application/json" }
				};

        
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this

        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/objectives', 'POST')
        client.methods.jsonMethod(args, function (dataObjective, response) {
          // parsed response body as js object        
          setTimeout(function () {       
            $that.$emit('get_objectives')
          }, 10)
        })

      },
      get_organizations: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/rallyapi/backend/organizations', 'GET')
        client.methods.jsonMethod(function (dataOrganizations, response) {
          // parsed response body as js object
          setTimeout(function () {
            //alert(JSON.stringify(dataOrganizations));
          }, 100)
        })
      },
    get_one_objective: function(){
      var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        //alert($that.objective_id);
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/rallyapi/api/objectives/'+$that.objective_id, 'GET')
        client.methods.jsonMethod(function (dataOrganizations, response) {
          // parsed response body as js object
          setTimeout(function () {
            //$that.organizations = dataOrganizations
            //alert( JSON.stringify(dataOrganizations) );
          }, 100)
        })
      
    }
    
  },
  created () {      
      this.get_organizations();
    },
    beforeMount () {
      //alert('mount');
      //this.get_organizations()
      //get_one_objective();
    }
}

</script>
<style>
.modal-backdrop.fade.in {
    display: none;
}
.image-tag{
  margin-bottom: 15px !important;
}
</style>
