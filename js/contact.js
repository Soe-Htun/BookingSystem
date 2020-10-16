Vue.component('contact',
{
    props:["id"],
    template:`<div :class="'animated fadeInRight component contact ' + id">
                    <i class="material-icons-two-tone">phone</i>
                    <span>09-265094170</span><hr class="hrhr">
                    <i class="material-icons-two-tone">alternate_email</i>
                    <span>soehtun@gmail.com</span><hr class="hrhr">
                    <i class="material-icons-two-tone">location_city</i>
                    <span>Pathein Nyunt 3 Street, Yangon</span><hr class="hrhr">
            </div>`
})