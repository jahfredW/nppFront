<template>
    <v-col class="films d-flex flex-column" cols="6" v-for="item in this.test">
        <v-card class="card d-flex flex-column justify-space-between bg-purple-lighten-5">
            <v-card-title>{{  item.title }}</v-card-title>
            <v-card-text>{{ item.description }}</v-card-text>
            <v-card-actions class="d-flex justify-center">
                <div class="btn" elevation="5">Consulter</div>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>


export default{
    name: 'FilmCard',

    props: {
        test : Array
    }

}

</script>



