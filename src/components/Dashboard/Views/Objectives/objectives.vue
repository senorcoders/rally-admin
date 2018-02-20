<template>
  <div>    
    <div class="row">
      <!-- Large modal -->
      <!--<div class="modal fade urgentAction urgentAction-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
      
            <UrgentAction></UrgentAction>
          </div>
        </div>
      </div>-->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".create-objective-modal-lg">Create Objective</button>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".urgentAction-modal-lg">Send Urgent Action</button><br><br>

      <div class="modal fade create-objective-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <CreateObjective v-on:get_objectives="get_objectives"></CreateObjective>    
            
          </div>
        </div>
      </div>
      <div id="edit-objective-modal-lg" class="modal fade edit-objective-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <EditObjective v-bind:objective_id="objective_id" v-on:get_objectives="get_objectives"></EditObjective>
          </div>
        </div>
      </div>
      <div>
        <CreateGoal  v-bind:goals_data="goals_data" v-bind:objective_id="objective_id"></CreateGoal>
      </div>

    </div>
    <div class="row create_objective">
      
    </div>
    <div class="row">
        <div class="card">
          <div>
            <div class="header">
              <slot name="header">
                <h4 class="title">Objectives</h4>
                <p class="category">Subtitle-here</p>
              </slot>
            </div>
            <div class="content table-responsive table-full-width">
              <table class="table">
                <thead>
                  <tr> 
                    <!--<th>#</th> -->
                    <th>Image</th>
                    <th>Title</th> 
                    <th>Short Desc</th> 
                    <th>Description</th> 
                    <th>Organization</th>           
                    <!--<th>Action Link</th>-->
                    <th>Release</th>
                    <th>Goals</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr> 
                </thead>
                <tbody>
                  <tr v-for="item in table1.data">
                    <!--<th scope="row">{{ item.id }}</th>-->
                      <td><img :src="item.image_url" alt="" width="80px" /></td> 
                      <td>{{ item.title }}</td>
                      <td>{{ item.short_desc.substr(0, 40) }}</td> 
                      <td>{{ item.description.substr(0, 40) }}</td> 
                      <td>{{ item.organization.name }}</td> 
                      <!--<td>{{ item.organization.action_link }}</td> -->
                      <td>{{ item.release_date | truncate '4' }}</td>              
                      <td> 
                        <button v-on:click="get_goals(item.id)">
                          <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button v-on:click="show_update_form(item, item.organization.id , item.organization.name )">
                          <i class="fa fa-pencil-square-o fa-2x" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button  v-on:click="delete_objective(item.id)">
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
   </form>
  </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  import CreateObjective from 'components/Dashboard/Views/Objectives/CreateObjective.vue'
  import EditObjective from 'components/Dashboard/Views/Objectives/EditObjective.vue'
  import CreateGoal from 'components/Dashboard/Views/Goals/goals.vue'
  import UrgentAction from 'components/Dashboard/Views/UrgentAction/CreateUrgentAction.vue'

  const tableColumns = [
    'Id',
    'Image',
    'Title',
    'Short Desc',
    'Description',
    'OrganizationName',
    'Action Link',
    'Release Date',
    'Goal ',
    'Edit',
    'Delete'
  ]
  let tableData = []

  export default {
    components: {
      PaperTable,
      CreateObjective,
      EditObjective,
      CreateGoal,
      UrgentAction
    },
    data () {
      return {
        table1: {
          title: 'Objectives',
          subTitle: 'Here is a subtitle for this table',
          columns: [...tableColumns],
          data: [...tableData]
        },
        goals_data:[],
        organizations:[],
        objective_id:{
          title: 'objective title',
          organizations: {id:"23", name:"rene"}
        }
      }
    },
    filters: {
  
      truncate: function(string, value) {
        return string.substring(0, value) + '...';
      }
    },
    methods: {
      get_goals: function(id){
      $('#goalsModal').modal('show');
      //alert(id);
      //id = '0a6219f9-71f5-4391-8b66-16558d56411c';
      var Client = require('node-rest-client').Client;
      var client = new Client();
      var $that = this;  
      this.objective_id = id;
      var args = {
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
      client.registerMethod("jsonMethod", "http://api.provethisconcept.com/api/goals?objective_id="+id, "GET");
       
      client.methods.jsonMethod( args, function (dataGoal, response) {
          // parsed response body as js object          
          setTimeout(function () {
              $that.goals_data = dataGoal;
          
            }, 100);
          
      });
    },
      get_objectives: function () {        
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        var args = {
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
        //alert( JSON.stringify(args) )
        // registering remote methods
        client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/objectives', 'GET')
        client.methods.jsonMethod(args, function (dataR, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.table1.data = dataR
          }, 10)
        })
      },
      delete_objective: function (id) {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        var args = {
            headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
        };
        client.registerMethod('jsonDeletMethod', 'https://api.provethisconcept.com/api/objectives/'+id, 'DELETE')
        client.methods.jsonDeletMethod(args, function (dataR, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.get_objectives();
          }, 10)
        })
      },
      show_update_form: function(id, org_id, org_name) {                
        this.objective_id = id;        
        
        $('#edit-objective-modal-lg').modal('show')
      
      },
      request_token: function(){
        //const Auth = require('./../../../../auth/authenticate.js');
        //Auth.requestRallyToken
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

              client.registerMethod('jsonMethod', 'http://api.provethisconcept.com/authenticate', 'POST')
              client.methods.jsonMethod(args, function (authData, response) {
                // parsed response body as js object
                //$that.token = dataOrganizations.auth_token
                //alert(dataOrganizations.auth_token);
                //$that.token = auth_token;
                $that.$root.token = authData.auth_token
                //alert($that.$root.token)
                $that.get_objectives()                
              })
      }
        
      
    },
    
    created () {
      //this.get_objectives()
      //alert("sad");
      this.$root.token = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZWFmZWNlYzctOGQyMi00MjNkLTg4YTgtNzVkZjk3YzRhMzA0IiwiZXhwIjoxNTE4OTA2NjAzfQ.0jBeewVV4H4Ex-m3ZHhv9-RHeg-n5TpEokGP0qY-WC8"
      //this.$root.token = ""
      this.requestRallyToken();
      
      
    },
    beforeMount () {
      //this.get_objectives()
      
    }
    
  }
</script>
<style>

</style>
