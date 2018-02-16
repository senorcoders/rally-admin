<template>
<div id="editGoalsModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">

	  <div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<i class="fa fa-remove" aria-hidden="true"></i>
	        </button>
	        <h4 class="modal-title" id="gridSystemModalLabel">Goals </h4>
	      </div>
	      <div class="modal-body">
					
					<div class="card">
					    <div class="header">
					      <h4 class="title">Update Goal {{goal_id.title}} </h4>
					    </div>
					    <div class="content">
					      <form>
					        <div class="row">
					          <div class="col-md-12">
					          	<div class="col-md-4">
												<fg-input type="text"
					                      label="Title"
					                      placeholder="Title"
					                      v-model="goal_id.title">
					            	</fg-input>
					          	</div>
					          	<div class="col-md-3">
						            <div class="form-group">
						              <label>Goal Type</label>
						              <v-select v-model="goal_id.goal_type" :options="[{label: 'Call', value: 'call'},{label: 'Donate', value: 'donate'},{label: 'Email', value: 'email'},{label: 'Fax', value: 'fax'}]" label="label">							    
												  </v-select>
						            </div>
						          </div>

						          <div class="col-md-5">
						            <div class="form-group">
						            	<label>Contact Option </label>
						              <v-select id="contact" v-model="goal_id.backend_contact_option[0]" :options="contact_options" label="title">
												    <template slot="option" slot-scope="option">												        
												        {{ option.title }}
												    </template>
												  </v-select>							              
						            </div>
						          </div>
						          </div>
										<div class="col-md-12">	
						          <div class="col-md-6">
												<fg-input type="text"
					                      label="Source Link"
					                      placeholder="Source Link"
					                      v-model="goal_id.source_link">
					            	</fg-input>
					          	</div>
					          	<div class="col-md-6" v-if="goal_id.backend_contact_option[0].id === '40c652e4-bf45-4680-8223-b0b0cf8a92ba'">

						            <div class="form-group reps" >
						             	<label>Reps</label>
						              <v-select v-model="goal_id.reps_goals[0]" :options="reps" label="name">
												    <template slot="option" slot-scope="option">												        
												        {{ option.name}}
												    </template>
												  </v-select>
						            </div>
						          </div>
						          <div class="col-md-12">
						            <div class="form-group">
						              <label>Description</label>
						              <textarea rows="3" class="form-control border-input"
						                        placeholder="Here can be your description"
						                        v-model="goal_id.description">

						              </textarea>
						            </div>
						          </div>
					          </div>                     
					        </div>          
					        
					        <div class="text-center">
					          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateGoal">
					            Update goal
					          </button>
					        </div>
					        <div class="clearfix"></div>
					      </form>
					    </div>
					  </div>
					  <br>
					  <br>					  
	      </div>
	    </div>
	  </div>
	</div>
</template>
<script>	
//import uploader from 'vuejs-uploader'
  export default {  	
  	name: 'EditGoal',
    props: ["goal_id"],
    data () {
      return {
        goal: {
				title: '',
				source_link: '',
				short_desc: '',
				description: '',
				goal_type: '',
				objective_id: this.objective_id,
				representative_id:'',
				contact_option_id: '',
				contact_option: '',
        organizations: [
				]				
      },
      reps: [],
      contact_options: []
    }
  },
    methods: {
      updateGoal () {        
        
        let post_data= {
      		title: this.goal_id.title,
					short_desc: '',
					description: this.goal_id.description,
					source_link: this.goal_id.source_link,
					goal_type: this.goal_id.goal_type.value,
					//representative_id: this.goal.representative_id.id,
					contact_option_id: this.goal_id.contact_option_id.id,
					objective_id: this.goal_id.objective_id
      	}
        	
        var args = {
				    data: post_data,
				    headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
				};

        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/goals/'+$that.goal_id.id, 'PUT')
        client.methods.jsonMethod(args, function (dataOrganizations, response) {
          // parsed response body as js object
          setTimeout(function () {            
            
						if($that.goal_id.contact_option_id == '40c652e4-bf45-4680-8223-b0b0cf8a92ba'){
							var rep_goal = {
	            	goal_id: dataOrganizations.id,
	            	representative_id : $that.goal.representative_id.id
	            }
	            
			        var argsRepGoal = {
							    data: rep_goal,
							    headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
							};
							client.registerMethod('saveGoalRep', 'https://api.provethisconcept.com/api/goal_representatives', 'POST')
	            client.methods.saveGoalRep(argsRepGoal, function (dataGoalRep, responseGoalRep) {
	            	
	            })
						}
            $('#editGoalsModal').modal('hide')
            $that.$emit('get_goals')        
            console.log(dataOrganizations);
          }, 10)
        })        

      },
      get_contact_option: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        var args = {            
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/goal_types', 'GET')
        client.methods.jsonMethod(args, function (dataContactOptions, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.contact_options = dataContactOptions
          }, 10)
        })
      },
      get_reps_option: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        var args = {            
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
        client.registerMethod('jsonMethod', 'http://api.provethisconcept.com/rallyapi/backend/reps', 'GET')        
        client.methods.jsonMethod(args, function (dataReps, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.reps = dataReps
          }, 10)
        })
      },
      get_organizations: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        var args = {            
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
        // registering remote methods
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/rallyapi/backend/organizations', 'GET')
        client.methods.jsonMethod(args, function (dataOrganizations, response) {
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
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/rallyapi/api/objectives/'+$that.objective_id, 'GET')
        var args = {            
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
        client.methods.jsonMethod(args, function (dataOrganizations, response) {
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
      this.get_contact_option();
            this.get_reps_option();

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
#editGoalsModal .modal-lg {
    width: 80% !important;
}
</style>
