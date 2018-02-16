<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Create Objective</h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-6">
          	<div class="col-md-12">
							<fg-input type="text"
                      label="Title"
                      placeholder="Title"
                      v-model="objective.title">
            	</fg-input>
          	</div>
          	<div class="col-md-12">
	            <div class="form-group">
	              <label>Organizations</label>
	              <v-select v-model="objective.organizations" :options="organizations" label="name">
							    <template slot="option" slot-scope="option">
							        <!--<img style="width=20px" class="fa" :src="option.image_url"></img>-->
							        {{ option.name }}
							    </template>
							  </v-select>
	            </div>
	          </div>
						<div class="col-md-12">
	            <div class="form-group">
	              <label>Release Date</label><br>
	              <date-picker v-model="objective.release_date" format="yyyy-MM-dd" lang="en" :first-day-of-week="0"></date-picker>
	            </div>
	          </div>
            <div class="col-md-12">
              <label class="image-tag">Image {{objective.image_url}}</label>
              
              <fileupload ref="my_upload" v-model="objective.image_url" target="http://174.138.51.165:3000/" action="POST"> </fileupload>
            <!--<CustomImageUpload></CustomImageUpload>-->
            </div>
          </div>
          
          <div class="col-md-6">
          	<div class="col-md-12">
							<div class="form-group">
	              <label>Short Description</label>
	              <textarea rows="4" class="form-control border-input"
	                        placeholder="Here can be your short description"
	                        v-model="objective.short_desc">

	              </textarea>
	            </div>
	          </div>
	          <div class="col-md-12">
	            <div class="form-group">
	              <label>Description</label>
	              <textarea rows="4" class="form-control border-input"
	                        placeholder="Here can be your description"
	                        v-model="objective.description">

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
  	name: 'CreateObjective',
    props: ["table1"],
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
      		title: this.objective.title,
					short_desc: this.objective.short_desc,
					description: this.objective.description,
					release_date: this.objective.release_date,
					organization_id: this.objective.organizations.id,
          source_link: '',
          image_url: image,
          action_link:''
      	}        
        var args = {
				    data: post_data,
				    headers: { "Content-Type": "application/json", "Authorization": this.$root.token }
				};

        
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        //alert( JSON.stringify(args) ); 

        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/objectives', 'POST')
        client.methods.jsonMethod(args, function (dataObjective, response) {
          // parsed response body as js object        
          setTimeout(function () {            
            //$that.get_objectives()
            $('.create-objective-modal-lg').modal('hide')
            
            $that.$emit('get_objectives')
            //$that.$parent.$options.methods.get_objectives()
            //alert('listo');
          }, 10)
        })

      },
      get_organizations: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        var args = {            
            headers: { "Content-Type": "application/json","Authorization": $that.$root.token }
        };

        // registering remote methods
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/rallyapi/backend/organizations', 'GET')
        client.methods.jsonMethod(args, function (dataOrganizations, response) {
          // parsed response body as js object
          //alert( JSON.stringify(dataOrganizations) )
          setTimeout(function () {
            //alert( JSON.stringify(dataOrganizations) );
            $that.organizations = dataOrganizations
          }, 100)
        })
      }
    },
    created () {
      this.$root.token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZWFmZWNlYzctOGQyMi00MjNkLTg4YTgtNzVkZjk3YzRhMzA0IiwiZXhwIjoxNTE4OTA2NjAzfQ.0jBeewVV4H4Ex-m3ZHhv9-RHeg-n5TpEokGP0qY-WC8"
      this.get_organizations()
    },
    beforeMount () {
      //this.get_organizations()
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
