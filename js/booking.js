Vue.component('booking',
{
    props:["id"],
    template:`<div :class="'animated fadeInRight component booking ' + id">
                    <h1 v-if="afterSubmit" class="animated bounceIn">We Have Received Your Request Successfully!</h1>    
                    <span class="notifications first-noti animated shake">Please, select a Date Before Selecting Time</span>
                    <span class="notifications second-noti animated shake">Please, select a Date Before Submitting Request</span>
                    <span class="notifications third-noti animated shake">Please, select a Time Before Submitting Request</span>
                    <span class="notifications last-noti animated shake">Please, Write Your Name Before Submitting Request</span>
                    
                    <div v-if="!afterSubmit">
                        <form v-on:submit.prevent>
                            <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate" v-model="customerName">
                                <label for="last_name" class="customerInfo">Your Name</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="phone" type="text" class="validate" v-model="customerNumber">
                                <label for="phone" class="customerInfo">Your Contact</label>
                            </div>

                            <input type="text" class="datepicker small" placeholder="Pick a Date">
                            
                            <div @click="checkDate" class="select-time">See Available Time</div>
                            <select class="browser-default time" v-show="dateSelected == 'selected'">
                                <option value="">Select Time</option>   
                                <option v-check v-for="time in allTime" :value="time">{{ time }}</option>
                            </select>
                            <hr>

                            <button @click="post" class="btn waves-effect waves-light" type="submit" name="action">
                                <i class="material-icons right">send</i>
                                Submit
                            </button>
                        </form>
                    </div>
                    </div>`,
    data(){
        return{
            afterSubmit: false,
            customerName:'',
            customerNumber:'',
            dateSelected:"notselected",
            date:'',
            bookedTime:[],
            allTime:[9,10,11,12,13,14,15,16,17,18,19,20],
            validationName: false,
            validationDate: false,
            validationTime: false
        }
    },
    methods:{
        checkDate(){
            this.date= document.getElementsByClassName("datepicker")[0].value;
            if(this.date){
                this.dateSelected = 'selected';
                //fetching all existing booking to check the available time
                this.$http.get('https://reservationsystem-82b38.firebaseio.com/appointments.json').then(function(data){
                    let saveData = Object.values(data.body);
                    for(let x=0; x < saveData.length; x++){
                        if(saveData[x].date == this.date){
                            this.bookedTime.push(parseInt(saveData[x].time));
                        }
                    }
                    console.log(this.bookedTime);
                })
            }
            else{
                this.notification('first-noti');
            }
        },
        post(){
            let time = document.getElementsByClassName('time')[0].value;
            this.checkDate();

            (!this.date) ? this.notification('second-noti') : this.validationDate = true;
            (!time) ? this.notification('third-noti') : this.validationTime = true;
            (!this.customerName) ? this.notification('last-noti') : this.validationName = true; 
            if( this.validationDate == true & this.validationName ==true & this.validationName == true){
                this.$http.post("https://reservationsystem-82b38.firebaseio.com/appointments.json", {
                    "customerName"   : this.customerName,
                    "customerNumber" : this.customerNumber,
                            "date"   : this.date,
                            "time"   : this.time,
                            "status" : "pending"
                }).then(function(data){
                    this.afterSubmit = true;
                })
            }
        },
        notification(element){
            document.getElementsByClassName(element)[0].style.display="block";
            setTimeout(function(){
                document.getElementsByClassName(element)[0].style.display="none";
            }, 5000)
        },
    },
    mounted() {
        document.addEventListener("DOMContentLoaded", function() {
          var elems = document.querySelectorAll(".datepicker");
          var options = {
            selectMonths: true,
            selectYears: 100,
            maxDate: new Date()
          };
          var instances = M.Datepicker.init(elems, options);
          console.log(instances);
        });
      },
});

//I'll Create A Custom Directive to Filter the Hours
Vue.directive('check',{
    update(el,binding,vnode){
     let time = parseInt(el.innerHTML);
     let check = vnode.context.bookedTime.includes(time);
     if(check){
         el.disabled = true;
         el.style.color= "red";
         el.innerHTML = el.innerHTML + " Not Available"
     }
     else{
         el.disabled = false;
         el.style.color= "green";
         el.style.fontSize = "1.2rem"
     }
    }
  });