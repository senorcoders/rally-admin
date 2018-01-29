<template>
	<div id="goalsModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">

	  <div class="modal-dialog modal-lg" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<i class="fa fa-remove" aria-hidden="true"></i>
	        </button>
	        <h4 class="modal-title" id="gridSystemModalLabel">Goals</h4>
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
					          	<div class="col-md-4">
						            <div class="form-group">
						              <label>Goal Type</label>
						              <v-select v-model="goal.goal_type" :options="[{label: 'Call', value: 'call'},{label: 'Donate', value: 'donate'},{label: 'Email', value: 'email'},{label: 'Fax', value: 'fax'}]" label="label">							    
												  </v-select>
						            </div>
						          </div>

						          <div class="col-md-4">
						            <div class="form-group">
						              <label>Reps</label>
						              <v-select v-model="goal.representative_id" :options="reps" label="name">
												    <template slot="option" slot-scope="option">
												        <img style="width=40px" class="fa" :src="option.photo_url"></img>
												        {{ option.name }}
												    </template>
												  </v-select>
						            </div>
						          </div>
						          </div>
										<div class="row">	
						          <div class="col-md-6">
												<fg-input type="text"
					                      label="Source Link"
					                      placeholder="Source Link"
					                      v-model="goal.title">
					            	</fg-input>
					          	</div>
					          	<div class="col-md-6">
						            <div class="form-group">
						              <label>Contact Option</label>
						              <v-select v-model="goal.goal_type" :options="[{label: 'Call', value: 'call'},{label: 'Donate', value: 'donate'},{label: 'Email', value: 'email'},{label: 'Fax', value: 'fax'}]" label="label">							    
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
					          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="updateProfile">
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
						  					<th>Representative</th>
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
													<td>{{ goal.contact_option }}</td> 							
													<td>{{ goal.title }}</td> 																				
													<td>
														<button @click="$emit('remove', goal.id)">
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
  	props: ["goals_data"],
    data () {
      return {
        goal: {
				title: '',
				short_desc: '',
				description: '',
				goal_type: '',
				representative_id:'',
				
        organizations: [
				]				
      },
      reps: []
    }
  },
    methods: {
      updateProfile () {
      	let post_data= {
      		title: this.goal.title,
					short_desc: this.goal.short_desc,
					description: this.goal.description,
					release_date: this.goal.release_date
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
          	//alert( JSON.stringify(response) );
            //$that.organizations = dataOrganizations
            $that.get_goals()
          }, 10)
        })

      },
      get_goals: function () {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/goals', 'GET')
        client.methods.jsonMethod(function (dataR, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.table1.data = dataR
          }, 10)
        })
      },
      get_contact_option: function () {
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
      }
    },    
    created () {
      //this.get_contact_option()
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
