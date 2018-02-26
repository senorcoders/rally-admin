<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Update CTA (Objective) {{objective_id.title}} </h4>
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
                <v-select v-model="objective_id.organization" :options="organizations"  label="name">
                  <template slot="option" slot-scope="option">                      
                      {{ option.name }}
                  </template>
                </v-select>
              </div>
            </div>
						<div class="col-md-12">
	            <div class="form-group">
	              <label>Release Date</label><br>
	              <date-picker v-model="objective_id.release_date" type="datetime" format="yyyy-MM-dd HH:mm" lang="en" ></date-picker>
	            </div>
	          </div>
            <div class="col-md-12">
              <label class="image-tag">Image {{objective.image_url}}</label>
              
              <fileupload ref="my_upload" v-model="objective_id.image_url" target="http://174.138.51.165:3000/" action="POST"> </fileupload>
            <!--<CustomImageUpload></CustomImageUpload>-->
            </div>
          </div>
          
          <div class="col-md-6">
          	<div class="col-md-12">
							<div class="form-group">
	              <label>Talking Points</label>
	              <textarea rows="4" class="form-control border-input"
	                        placeholder="Here can be your short description"
	                        v-model="objective_id.short_desc">

	              </textarea>
	            </div>
	          </div>
	          <div class="col-md-12">
	            <div class="form-group">
	              <label>Why it's important (Description)</label>
	              <textarea rows="4" class="form-control border-input"
	                        placeholder="Here can be your description"
	                        v-model="objective_id.description">

	              </textarea>
	            </div>
	          </div>
          </div>                     
        </div>          
        
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="editObjective">
            Update Objective
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
import config from '../../../../config';
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
      editObjective () {        
        
        let image = $( "#edit-objective-modal-lg input[name='fileUpload']" ).val().replace(/C:\\fakepath\\/i, '');
        let post_data= {}
        if(image != ""){
          post_data= {
            title: this.objective_id.title,
            short_desc: this.objective_id.short_desc,
            description: this.objective_id.description,
            release_date: this.objective_id.release_date,
            organization_id: this.objective_id.organization.id,
            image_url: image,
            source_link: '',          
            action_link:''
          }   
        }else{
          post_data= {
            title: this.objective_id.title,
            short_desc: this.objective_id.short_desc,
            description: this.objective_id.description,
            release_date: this.objective_id.release_date,
            organization_id: this.objective_id.organization.id, //this.objective_id.organization_id,
            source_link: '',          
            action_link:''
          }   
        }
        //alert(JSON.stringify(image));      
        var args = {
				    data: post_data,
				    headers: { "Content-Type": "application/json", "Authorization": this.$root.token }
				};

        
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        //alert( JSON.stringify(args));

        client.registerMethod('jsonMethod', config.baseURL +'/api/objectives/'+$that.objective_id.id, 'PUT')
        client.methods.jsonMethod(args, function (dataObjective, response) {
          //alert( JSON.stringify(dataObjective));
          // parsed response body as js object
          setTimeout(function () {                   
            $('#edit-objective-modal-lg').modal('hide')
            $that.$emit('get_objectives')
          }, 10)
        })

      },
      get_organizations: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        var args = {            
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
        client.registerMethod('jsonMethod', config.baseURL +'/rallyapi/backend/organizations', 'GET')
        client.methods.jsonMethod(args ,function (dataOrganizations, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.organizations = dataOrganizations
          }, 100)
        })
      },
    get_one_objective: function(){
      var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        //alert($that.objective_id);
        var args = {            
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
        client.registerMethod('jsonMethod', config.baseURL +'/rallyapi/api/objectives/'+$that.objective_id, 'GET')
        client.methods.jsonMethod(args, function (dataOrganizations, response) {
          // parsed response body as js object
          setTimeout(function () {
            //$that.organizations = dataOrganizations
            //alert( JSON.stringify(dataOrganizations) );
          }, 100)
        })
      
    },
    requestRallyToken: function() {
          let post_data= {
                "email": "admin@senorcoders.com",
                "password": "helium33"
              }
                
              var args = {
                  data: post_data,
                  headers: { "Content-Type": "application/json" }
              };

              var Client = require('node-rest-client').Client
              var client = new Client()
              var $that = this

              client.registerMethod('jsonMethod', config.baseURL +'/authenticate', 'POST')
              client.methods.jsonMethod(args, function (authData, response) {                
                $that.$root.token = authData.auth_token
                //alert($that.$root.token)
                $that.get_organizations()             
              })
      }
    
  },
  created () {      
    
      this.requestRallyToken();
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
