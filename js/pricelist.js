Vue.component('pricelist',
{
    props:["id","prices"],
    template:`<div :class="'animated fadeInRight component pricelist ' + id">
                <table>
                    <thead>
                    <tr>
                        <th>Services</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="p in prices">
                            <td>{{ p.name }}</td>
                            <td>{{ p.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>`
})