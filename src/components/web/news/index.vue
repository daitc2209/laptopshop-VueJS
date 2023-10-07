<template>
  <div>
    <head>
        <title>Trang tin tức</title>
    </head>
    <section>
			<div class="container">
				<div class="row">
					<div class="breadcrumbs d-flex flex-row align-items-center col-12 mt-3 mx-3">
						<ul>
							<li><a href="/home">Trang chủ</a></li>
							<li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Tin tức</a></li>
						</ul>
					</div>
					<div class="col-12">
						<div class="box-news">
							<div class="box-new-item" v-for="item in news" :key="item.id">
								<div class="row">
									<div class="col-3">
										<img alt="" :src="item.thumbnail">
									</div>
									<div class="col-9">
										<div class="new-content">
											<h5><a @click="submitFormNewDetail(item.id)">{{item.title}}</a></h5>
											<p>{{item.shortDescription}}</p>
										</div>
									</div>
									<form :id="'formNewDetail' + item.id" action="/news/detail" method="post">
										<input hidden="" name="page" :value="currentPage"/>
										<input hidden="" name="id" :value="item.id"/>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="news">
					<form class="mx-3" id="formNew" action="/news" method="post">
						<ul class="pagination mt-4" id="pagination"></ul>
						<input hidden=""  id="page"  name="page" :value="currentPage"/>
					</form>
				</div>
			</div>
		</section>
  </div>
</template>

<script>
export default {
    data(){
        return {
            currentPage: "",
            news: [{id:1, title: "123", shortDescription:"1234123"}],
        }
    },
    methods: {
        submitFormNewDetail(id){
            $("#formNewDetail"+id).submit()
        }
    }
}
</script>

<style>

</style>