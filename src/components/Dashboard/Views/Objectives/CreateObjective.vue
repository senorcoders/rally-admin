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
	              <v-select v-model="objective.organization_id" :options="organizations" label="name">
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
	              <date-picker v-model="objective.release_date" format="yyyy-MM-dd" lang="en" :first-day-of-week="0"></date-picker>
	            </div>
	          </div>

          </div>
          
          <div class="col-md-6">
          	<div class="col-md-12">
							<div class="form-group">
	              <label>Short Description</label>
	              <textarea rows="3" class="form-control border-input"
	                        placeholder="Here can be your short description"
	                        v-model="objective.short_desc">

	              </textarea>
	            </div>
	          </div>
	          <div class="col-md-12">
	            <div class="form-group">
	              <label>Description</label>
	              <textarea rows="3" class="form-control border-input"
	                        placeholder="Here can be your description"
	                        v-model="objective.description">

	              </textarea>
	            </div>
	          </div>
          </div>                     
        </div>          
        
        <div class="text-center">
          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateProfile">
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

  export default {
  	components: { DatePicker },
  	name: 'CreateObjective',
    data () {
      return {
        objective: {
				title: '',
				short_desc: '',
				description: '',
				release_date: '',
				organization_id: '',
				
        organizations: [
        	{id:'1',
        	title:'choose one org',
        	image_url: ''}
				]
      }
    }
  },
    methods: {
      updateProfile () {
      	let post_data= {
      		title: this.objective.title,
					short_desc: this.objective.short_desc,
					description: this.objective.description,
					release_date: this.objective.release_date,
					organization_id: this.objective.organization_id.id
      	}
        	
        var args = {
				    data: post_data,
				    headers: { "Content-Type": "application/json" }
				};

        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this

        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/objectives', 'POST')
        client.methods.jsonMethod(args, function (dataOrganizations, response) {
          // parsed response body as js object

          setTimeout(function () {
            //$that.organizations = dataOrganizations
            $that.get_objectives()
          }, 10)
        })

      },
      get_objectives: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/objectives', 'GET')
        client.methods.jsonMethod(function (dataR, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.table1.data = dataR
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
            $that.organizations = dataOrganizations
          }, 10)
        })
      }
    },
    created () {
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
</style>
