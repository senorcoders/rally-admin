<template>
  <div>    
    <div class="row">
      <!-- Large modal -->
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".create-objective-modal-lg">Create Objective</button><br><br>
      <div class="modal fade create-objective-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <CreateObjective></CreateObjective>    
          </div>
        </div>
      </div>
      <div>
        <CreateGoal v-bind:table1="table1" v-bind:goals_data="goals_data" v-bind:objective_id="objective_id"></CreateGoal>
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
                      <td>{{ item.release_date }}</td>              
                      <td> 
                        <button v-on:click="get_goals(item.id)">
                          <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button @click="$emit('edit', item.id)">
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
  import CreateGoal from 'components/Dashboard/Views/Goals/goals.vue'
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
      CreateGoal
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
        objective_id:''
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
      // registering remote methods 
      client.registerMethod("jsonMethod", "http://api.provethisconcept.com/api/goals?objective_id="+id, "GET");
       
      client.methods.jsonMethod(function (dataGoal, response) {
          // parsed response body as js object          
          setTimeout(function () {
              $that.goals_data = dataGoal;
          
            }, 100);
          
      });
      //alert(id);
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
      delete_objective: function (id) {
        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this
        // registering remote methods
        client.registerMethod('jsonDeletMethod', 'https://api.provethisconcept.com/api/objectives/'+id, 'DELETE')
        client.methods.jsonDeletMethod(function (dataR, response) {
          // parsed response body as js object
          setTimeout(function () {
            $that.get_objectives();
          }, 10)
        })
      }
    },
    created () {
      //this.get_objectives()
    },
    beforeMount () {
      this.get_objectives()
    }
  }
</script>
<style>

</style>
