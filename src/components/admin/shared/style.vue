<template>
    <div>
            <!-- <link rel="shortcut icon" type="image" href="#" /> -->

                <!-- font awesome -->
                <component :is="style" src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></component> 
                <!-- <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" /> -->
                <!-- font awesome -->
                
                <!-- bootstrap 5 -->
                <component :is="style" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"></component> 
                <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" /> -->
                <!-- bootstrap 5 -->
                
                <component :is="style" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"></component> 
                <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css" /> -->

                <!-- Theme style -->
                <component :is="style" src="../../../assets/admin/css/adminlte.min.css"></component> 
                <component :is="style" src="../../../assets/admin/css/style.css"></component>
                <!-- <link href="../../../assets/admin/css/adminlte.min.css" rel="stylesheet" />
                <link href="../../../assets/admin/css/style.css" rel="stylesheet" /> -->
            
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>