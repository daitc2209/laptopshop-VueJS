<template>
  <block v-if="product">
        <form id="formProduct" action="/admin/product" method="post" >
            <ul class="pagination mt-4" id="pagination"></ul>
            <input hidden="" id="page" name="page" :value="formSearchProduct.currentPage" /> 
            <input hidden="" id="totalPage" name="totalPage" :value="formSearchProduct.totalPage" />

            <input hidden="" v-model="formSearchProduct.name" /> 
            <input hidden="" v-model="formSearchProduct.price" /> 
            <input hidden="" v-model="formSearchProduct.quantity" /> 
            <input hidden="" v-model="formSearchProduct.discount" /> 
            <input hidden="" v-model="formSearchProduct.categoryName" /> 
            <input hidden="" v-model="formSearchProduct.brandName" />
        </form>
    </block>
</template>

<script>
export default {
    data(){
        return{
            formSearchProduct:[]
        }
    }
}
</script>

<style>

</style>