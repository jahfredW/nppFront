<template>
    <v-container class="container has-text-centered px-10">
        <div class="mb-10">
            <!-- <svg class="hello" width="466" height="200" viewBox="0 0 466 157" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 132C3.74197 131.525 5.07355 130.038 6.66667 129.222C11.7767 126.605 17.8995 125.565 23.5 124.556C35.6453 122.365 47.4871 122 59.2222 117.778C87.4845 107.61 118.745 96.3146 138.778 72.8889C154.19 54.8661 172.903 29.5129 172 4.22222C171.828 -0.584352 165.394 4.48981 163.944 5.55556C154.701 12.3522 149.912 24.9646 144.667 34.8889C133.182 56.6175 128.982 80.4104 121.944 103.722C118.373 115.551 116.319 128.019 113.778 140.111C112.769 144.912 112.188 150.816 109.611 155.111C108.919 156.264 109.929 148.085 110 147.556C111.549 136.023 115.832 127.288 122 117.5C126.409 110.503 130.013 103.452 137.333 99.2222C150.37 91.6898 154.323 128.521 164.667 132.444C170.693 134.73 178.41 138.061 184.889 138C201.545 137.843 211.871 123.524 218.333 109.778C220.735 104.669 230.669 86.494 224.556 80.5556C218.385 74.5617 208.036 80.0731 204.222 86.2222C199.085 94.5042 199.955 101.221 204 109.889C206.338 114.9 207.799 120.319 212.444 123.444C222.506 130.213 232.173 131.896 244.389 130.833C258.777 129.582 265.401 120.917 274.722 111.333C295.408 90.0647 312.15 63.5386 321.389 35.1111C324.921 24.2418 323.642 13.1781 310 16.4444C289.224 21.4189 282.411 42.0593 281.222 61.2222C279.851 83.3308 283.309 107.074 289.444 128.111C292.022 136.948 300.634 142 310.222 142C340.581 142 358.298 107.291 371.944 84.6667C379.16 72.704 385.234 61.9179 387 47.8889C388.429 36.5395 390 24.7374 390 13.2778C390 4.28492 370.426 9.59947 366.667 14.4444C364.312 17.4796 363.849 22.4378 362.778 26C360.636 33.1215 358.883 40.0485 358 47.4444C356.729 58.086 353.617 68.4074 351.444 78.8889C350.34 84.2155 350.577 90.7449 351.556 96.0556C352.761 102.598 352.414 109.969 354.111 116.333C354.389 117.377 357.21 120.637 358 121.778C359.355 123.736 362.129 125.545 364 127C372.002 133.224 384.1 134 393.778 134C406.124 134 416.4 130.524 426.444 123.333C434.337 117.683 457.27 104.553 450.389 91.5556C447.992 87.0283 436.337 85.3113 431.5 86.0556C425.793 86.9335 422 90.0852 422 96C422 102.443 419.036 110.204 423.222 116C431.054 126.845 448.296 117.693 455.944 110.944C461.114 106.383 465.728 99.3011 463.889 91.9444C462.212 85.2357 450.205 85.6222 445.778 88.4444C439.529 92.4283 434.762 98.4438 430 104" stroke="black" stroke-width="3" stroke-linecap="round"/>
        </svg> -->
        <v-row>
            <FilmCard :test="filmList" />
        </v-row>
        <v-row v-if="this.filmList.length === 0">
            <v-col cols="12">Fin de liste</v-col>
        </v-row>
        </div>
        <div class="btn-wrapper d-flex justify-content-around">
            <div class="btn bg-purple-lighteen-5" :disabled="prevDisabled" @click="changePage(-1)"> Prev</div>
            <div class="btn" :disabled="nextDisabled" @click="changePage(1)">Next </div>
        </div>  
    </v-container>
</template>

<script>

// import { defineComponent } from "vue";
import FilmCard from './FilmCard.vue'

import axios from "axios";




export default{

    components: {
        FilmCard
    },


    data() {
        return {
            perPage: 5,
            currentPage: 1,
            filmList: [],
        }
    },

    methods: {

        getFilms(){
            const Axios = axios.create({
                baseURL: 'https://127.0.0.1:8000'
            });
            const params = {
                'page': this.currentPage,
                'limit': this.perPage
            }

            Axios.get('api/films', { params })
            .then((res) => {
                console.log(res);
                this.filmList = [];
                for( var i in res.data) {
                    this.filmList.push(res.data[i])
                }
            })
            .catch( (err) => {
                if(err.response){
                    console.log(err.response)
                }
            })
        },


        changePage(num){
            console.log('num', num);
            console.log('currentPage', this.currentPage),
            this.currentPage = this.currentPage + num;
            this.getFilms();
        },

        
        

    },

    computed: {
        filteredList(){
            console.log('Current page', this.currentPage);
            const start = (this.currentPage - 1) * this.perPage;
            const end = this.currentPage * this.perPage;
            console.log(start, end);
            console.log('computed', this.filmList);
            console.log('result', this.filmList.slice(start, end));
            const result = this.filmList.slice(start, end);
            return result;
        },

        nextDisabled(){
            console.log('ici');
            return this.filmList.length === 0;
        },

        prevDisabled(){
            return this.currentPage === 1;
        }
        
    },

    mounted(){
        this.getFilms();
    },


}

</script>

<style lang="scss"> 


.hello{
    transform: scale(2);
    margin-top: 3vh;

    path {
    stroke-dasharray: 758px;
    stroke-dasharray: 1700px;
    stroke-dashoffset: 1700px; 
    
    animation: anim 3s ease forwards;
    }
}
 
@keyframes anim {
     to {
         stroke-dashoffset: 0;
     }
 }

 .btn {
  color: white;
  font-size: 20px;
  font-weight: 700;
  background-color: #deafda;
  border: none;
  padding: 14px 28px;
  border-radius: 22px;
  cursor: pointer;

  &-wrapper{
    margin: 20px;
  }

  &:hover{
    background-color: #fdadad;
  }

  &:focus{
    outline: none;
  }

  &:active{
    background-color: #ef8c8c;
  }

  &:disabled{
    background: #dddddd;
  }
}



</style>