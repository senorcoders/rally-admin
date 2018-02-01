<template>
	<div id="goalsModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">

	  <div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<i class="fa fa-remove" aria-hidden="true"></i>
	        </button>
	        <h4 class="modal-title" id="gridSystemModalLabel">Goals {{objective_id}}</h4>
	      </div>
	      <div class="modal-body">
					
					<div class="card">
					    <div class="header">
					      <h4 class="title">Create Goal</h4>
					    </div>
					    <div class="content">
					      <form>
					        <div class="row">
					          <div class="col-md-12">
					          	<div class="col-md-4">
												<fg-input type="text"
					                      label="Title"
					                      placeholder="Title"
					                      v-model="goal.title">
					            	</fg-input>
					          	</div>
					          	<div class="col-md-3">
						            <div class="form-group">
						              <label>Goal Type</label>
						              <v-select v-model="goal.goal_type" :options="[{label: 'Call', value: 'call'},{label: 'Donate', value: 'donate'},{label: 'Email', value: 'email'},{label: 'Fax', value: 'fax'}]" label="label">							    
												  </v-select>
						            </div>
						          </div>

						          <div class="col-md-5">
						            <div class="form-group">
						            	<label>Contact Option </label>
						              <v-select id="contact" v-model="goal.contact_option_id" v-on:click="greet" :options="contact_options" label="title">
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
					                      v-model="goal.source_link">
					            	</fg-input>
					          	</div>
					          	<div class="col-md-6" v-if="goal.contact_option_id.id === '40c652e4-bf45-4680-8223-b0b0cf8a92ba'">

						            <div class="form-group reps" >
						             	<label>Reps</label>
						              <v-select v-model="goal.representative_id" :options="reps" label="name">
												    <template slot="option" slot-scope="option">
												        <img style="width=40px" class="fa" :src="option.photo_url"></img>
												        {{ option.name }}
												    </template>
												  </v-select>
						            </div>
						          </div>
						          <div class="col-md-12">
						            <div class="form-group">
						              <label>Description</label>
						              <textarea rows="3" class="form-control border-input"
						                        placeholder="Here can be your description"
						                        v-model="goal.description">

						              </textarea>
						            </div>
						          </div>
					          </div>                     
					        </div>          
					        
					        <div class="text-center">
					          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="saveGoal">
					            Create goal
					          </button>
					        </div>
					        <div class="clearfix"></div>
					      </form>
					    </div>
					  </div>
					  <br>
					  <br>
					  <div class="content table-responsive table-full-width">
              <table class="table">
                <thead>
                  <tr> 				  					
						  					<th>Title</th> 
						  					<th>Goal Type</th>   
						  					<th>Description</th>  					
						  					<th>Source Link</th> 
						  					<th>Contact Option</th>
						  					
						  					<th>Delete</th>
                  </tr> 
                </thead>
                <tbody>
                  <tr v-for="goal in goals_data">
                    <!--<th scope="row">{{ item.id }}</th>-->
                      
													<td>{{ goal.title }}</td>
													<td>{{ goal.goal_type }}</td> 
													<td>{{ goal.description.substr(0, 40) }}</td> 
													<td>{{ goal.source_link }}</td> 
													<td>{{ goal.contact_option[0] }}</td> 																				
													<td>
														<button  v-on:click="delete_goal(goal.id)">
		                          <i class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
		                        </button>   						
						    					</td>
                  </tr>
                </tbody>
              </table>
            </div>
	      </div>
	    </div>
	  </div>
	</div>
  
</template>
<script>

  export default {
  	name: 'CreateGoal',
  	props: ["goals_data","objective_id"],
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
    	greet(){
    		alert('yes');
    	},
      saveGoal () {
      	let post_data= {
      		title: this.goal.title,
					short_desc: '',
					description: this.goal.description,
					source_link: this.goal.source_link,
					goal_type: this.goal.goal_type.value,
					//representative_id: this.goal.representative_id.id,
					contact_option_id: this.goal.contact_option_id.id,
					objective_id: this.objective_id
      	}
        	
        var args = {
				    data: post_data,
				    headers: { "Content-Type": "application/json" }
				};

        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/goals', 'POST')
        client.methods.jsonMethod(args, function (dataOrganizations, response) {
          // parsed response body as js object

          setTimeout(function () {            
            $that.get_goals()
            //alert(dataOrganizations.contact_option_id);
						if(dataOrganizations.contact_option_id == '40c652e4-bf45-4680-8223-b0b0cf8a92ba'){
							var rep_goal = {
	            	goal_id: dataOrganizations.id,
	            	representative_id : $that.goal.representative_id.id
	            }
	            //alert( JSON.stringify(rep_goal) );
			        var argsRepGoal = {
							    data: rep_goal,
							    headers: { "Content-Type": "application/json" }
							};
							client.registerMethod('saveGoalRep', 'https://api.provethisconcept.com/api/goal_representatives', 'POST')
	            client.methods.saveGoalRep(argsRepGoal, function (dataGoalRep, responseGoalRep) {
	            	alert( JSON.stringify(dataGoalRep) );
	            })
						}
            
            alert( JSON.stringify(dataOrganizations.id) );
            console.log(dataOrganizations);
          }, 10)
        })

      },
      get_goals: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/goals?objective_id='+$that.objective_id, 'GET')
        client.methods.jsonMethod(function (dataGoals, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.goals_data = dataGoals;
          }, 10)
        })
      },
      get_contact_option: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/goal_types', 'GET')
        client.methods.jsonMethod(function (dataContactOptions, response) {
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
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/reps', 'GET')
        client.methods.jsonMethod(function (dataReps, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.reps = dataReps
          }, 10)
        })
      },
      delete_goal: function (id) {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        client.registerMethod('jsonDeletMethod', 'https://api.provethisconcept.com/api/goals/'+id, 'DELETE')
        client.methods.jsonDeletMethod(function (dataR, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.get_goals();
          }, 10)
        })
      }
    },    
    created () {
      this.get_contact_option()
      this.get_reps_option();
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
.modal-lg {
    width: 65% !important;
}
</style>
