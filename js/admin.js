Vue.component('admin',{
    template: `<div>
                    <table class="pending">
                        <thead>
                            <tr>
                                <th>Dates</th>
                                <th>Timing</th>
                                <th>Names</th>
                                <th>Contact Number</th>
                                <th>Status</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="booking in bookings" v-show="booking.status=='pending'">
                                <td>{{booking.date}}</td>
                                <td>{{booking.time}}</td>
                                <td>{{booking.customerName}}</td>
                                <td>{{booking.customerNumber}}</td>
                                <td>{{booking.status}}</td>
                                <td>
                                    <a href="javascripts:;">
                                        <i @click="update" :data-key=booking.unique :id=booking.status class="material-icons">autorenew</i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br><hr class="hrhr"><br>

                    <table class="approved">
                    <thead>
                        <tr>
                            <th>Dates</th>
                            <th>Timing</th>
                            <th>Names</th>
                            <th>Contact Number</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="booking in bookings" v-show="booking.status=='approved'">
                            <td>{{booking.date}}</td>
                            <td>{{booking.time}}</td>
                            <td>{{booking.customerName}}</td>
                            <td>{{booking.customerNumber}}</td>
                            <td>{{booking.status}}</td>
                            <td>
                                <a href="javascripts:;">
                                    <i @click="update" :data-key=booking.unique :id=booking.status class="material-icons">autorenew</i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>`,
    data(){
        return{
            bookings:[],
            statusUpdate:""
        }
    },
    methods:{
        fetcher(){
            this.$http.get('https://reservationsystem-82b38.firebaseio.com/appointments.json').then(function(data){
                return data.json();
            }).then(function(data){
                let requests = [];
                for(let key in data){
                    data[key].unique = key;

                    requests.push(data[key]);
                }
               this.bookings = requests;
            })
        },
        update(event){
            let key= event.srcElement.dataset.key;
            let status = event.srcElement.id;

            // If clicked booking status is pending then change to approved else change to pending
            (status =='pending') ? this.statusUpdate = 'approved' : this.statusUpdate = 'pending';
            let reload = () => { this.fetcher(); }
            // I have added the cdn of firebase database for updating the data
            firebase.database().ref('appointments').child(key).update(
                {
                    status : this.statusUpdate
                },function(error){
                if(!error){
                    reload();
                }
            });
        }
    },
    created(){
        this.fetcher();
    }
})