<template>
  <div>
    <head><title>Trang chi tiết tin tức</title></head>
    <section>
        <div class="container">
            <div class="breadcrumbs d-flex flex-row align-items-center col-12 mt-3 ">
                <ul>
                    <li><a href="/home">Trang chủ</a></li>
                    <li><a @click="submitFormNew()"><i class="fa fa-angle-right" aria-hidden="true"></i>Tin tức</a></li>
                    <li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>{{newItem.title}}</a></li>
                </ul>
            </div>
            <form id="formNew" action="/news" method="post">
                <input hidden="" id="page"  name="page" :value="currentPage"/>
            </form>
            <div>{{newItem.content}}</div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
    data(){
        return {
            newItem: {
                title:"",
                content: ""
            }
        }
    },
    methods: {
        submitFormNew(){
            $('formNew').submit()
        }
    }
}
</script>

<style>

</style>