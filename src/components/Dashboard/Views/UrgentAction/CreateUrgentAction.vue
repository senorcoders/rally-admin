<template>
  <div class="card">
    <div class="header action">
      <h4 class="title">Send Urgent Call to Action </h4>
    </div>
    <div class="content">
      <form>
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <div class="form-group">
	              <label>Message</label>
	              <textarea rows="3" class="form-control border-input"
	                        placeholder="Urgent Message"
	                        v-model="ux_events.data">

	              </textarea>
	            </div>
          </div>
          <div class="col-md-12">
        		<div class="text-center">
		          <button type="submit" class="btn btn-info btn-fill btn-wd" @click.prevent="saveAction">
		            Send
		          </button>
		        </div>  	
          </div>
        </div>
        
        <div class="clearfix"></div>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ux_events: {
          what: 'unread',
          data: '',
          user_id: 'a13d9682-929f-47d7-a49c-69d19f41a2b5',
          device_id: 'd8a5e208-40f1-4212-b617-314f062b18f4',
          sender_id: 'b38da1d8-e300-4a49-90b0-aaa32662dcba'          
        }
      }
    },
    methods: {
      saveAction () {
      	var args = {
            headers: { "Content-Type": "application/json", "Authorization": this.$root.token }
        };


        var Client = require('node-rest-client').Client
        var client = new Client()
        var $that = this

        //making the push notification to all the devices //push notifications server should be running
       //https://noti.provethisconcept.com/notification/notify/:message(.:format) 
        client.registerMethod("jsonMethod", "https://noti.provethisconcept.com/notification/notify/"+$that.ux_events.data, "GET");
        client.methods.jsonMethod( function (dataNotification, responseNotifications) {
        	console.log("notification sent");
        })          

      	client.registerMethod("jsonMethod", "http://api.provethisconcept.com/rallyapi/user/all_devices", "GET");
        client.methods.jsonMethod(args, function (dataRally, responseRally) {          
          for (let item of dataRally){
          	let post_data= $that.ux_events   
		        var args = {
						    data: post_data,
						    headers: { "Content-Type": "application/json", "Authorization": $that.$root.token }
						};
						//console.log(item)
//		        if(item.user_id == "b38da1d8-e300-4a49-90b0-aaa32662dcba"){
			        post_data.user_id = item.user_id;
			      	post_data.device_id = item.device_id;

			      	client.registerMethod('jsonMethod', 'https://api.provethisconcept.com/api/ux_events', 'POST')
			        client.methods.jsonMethod(args, function (dataObjective, response) {
			          // parsed response body as js object        
			          setTimeout(function () {
			            $('.urgentAction-modal-lg').modal('hide')            
			          }, 10)
			        })			      	
//		        }
		      	
		        
          }
        })
      	
      	/**/
        
      }
    }
  }

</script>
<style>
.header.action{
	text-align: center;
}
.urgentAction{
}
</style>
