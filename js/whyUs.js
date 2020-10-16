Vue.component('whyus',
{
    props:["id","about"],
    template: `<div :class="'animated fadeInRight component why-us ' + id">
                    <h4 v-for="h in about"> {{ h.h3 }}
                        
                        <h5>{{ h.h5 }}</h5><hr class="hrhr">
                    </h4>
                </div>`
});