<template>
  <div>
    <head><title>Trang chi tiết tin tức</title></head>
    <section>
        <div class="container">
            <div class="breadcrumbs d-flex flex-row align-items-center col-12 mt-3 ">
                <ul>
                    <li><a href="/home">Trang chủ</a></li>
                    <li><a href="/news"><i class="fa fa-angle-right" aria-hidden="true"></i>Tin tức</a></li>
                    <li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>{{newsItem.title}}</a></li>
                </ul>
            </div>
            <div v-html="newsItem.content"></div>
        </div>
    </section>
  </div>
</template>

<script>
import News from '../../../service/News';
export default {
    data(){
        return {
            newsItem: {
                title:'',
                content:''
            }
        }
    },
    methods: {
        getDetailNews(){
            var url = new URL(window.location.href)
            if(url.searchParams.has("id") && url.searchParams.has("page"))
            {
                News.getDetailNews(url.searchParams.get("id"), url.searchParams.get("page"))
                    .then(res =>{
                        this.newsItem = res.data.data.NewsItem
                    })
                    .catch(err =>{
                        console.log("err: "+err)
                    })
            }
            else
                window.location.href='/news'
        }
    },
    mounted(){
        this.getDetailNews()
    }
}
</script>

<style>

</style>