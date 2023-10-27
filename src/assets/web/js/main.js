
let dec = document.querySelector(".quantity .pro-qty .dec");
let inc = document.querySelector(".quantity .pro-qty .inc");

export function decFunction(id){
	let textInput = document.querySelector(".quantity .pro-qty .id-"+id);
	let quanty = parseInt(textInput.value);
	textInput.value = quanty<=1 ? 1 : quanty-1;
}
export function incFunction(id){
	let textInput = document.querySelector(".quantity .pro-qty .id-"+id);
	let quanty = parseInt(textInput.value);
	textInput.value = quanty+1;
}
$(function () {
 	const firstPath = location.pathname.split('/')[1];
	$("#inputSearch").autocomplete({
		source: `/${firstPath}/search`,
		create: function() {
			$(this).data('ui-autocomplete')._renderItem = function(ul, item) {
			var price = item.price;
			price = price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
		    	return $('<li>').append(
									`<a href="/${firstPath}/store/${item.id}" style="display:flex;justify-content: left;align-items: center;">
					        		 	<div style="width:33%">
					        		  		<img style="height: 100px;width: 100px;" class="icon" src="/${firstPath}/images/product/${item.img}" />
					        		  	</div>
					        		  	<div style="margin-left: 20px;font-size: 16px;width:33%">
					        		  		${item.name}
					        		  	</div>
					        		  	<div style="margin-left: 20px;font-size: 16px;width:33%">
					        		  		${price}
					        		  	</div>
					        		 </a>`
					        		  )
		        	  			.appendTo(ul);
		     };
		 }
	});
});


export function toast({ title = '',
            message = '',
            type = 'info',
            duration = 3000
        }) {
            const main = document.getElementById('toast')
            const delay = (duration / 1000).toFixed(2)  //lấy ra 2 số thập phân 
            const icons = {
                success: 'fas fa-check-circle',
                info: 'fas fa-info-circle',
                warning: 'fas fa-exclamation-circle',
                error: 'fa-solid fa-circle-xmark',
            }
            const toast = document.createElement('div')
            toast.classList.add('toast', `toast--${type}`)

            // auto remove toast
            const autoRemoveId = setTimeout(() => {
                    main.removeChild(toast)
                }, duration + 1000);

            //remove toast when click
            toast.onclick = function(e){
                if(e.target.closest('.toast__close'))   //closest: tìm class của chính nó, ko thấy thì nó sẽ tìm ra cha nó
                {
                    main.removeChild(toast)
                    clearTimeout(autoRemoveId)
                }
            }


            const icon = icons[type]    //truyền type của object vào 
            toast.style.animation = ` slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`

            if (main) {
                toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
    
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                         <i class="fas fa-times"></i>
                    </div>
                `;
                main.appendChild(toast); //truyền toast vào main

            }
        }

export function showSuccessToast() {
    toast({
        title: 'Success',
        message: 'Thêm vào giỏ hàng thành công',
        type: 'success',
        duration: 1000
    })
}

export function showWarnToast() {
    toast({
        title: 'Warning',
        message: 'Cảnh báo !!!',
        type: 'warning',
        duration: 1000
    })
}
export function showErrorToast() {
    toast({
        title: 'Error',
        message: 'Có lỗi rồi bro !!!',
        type: 'error',
        duration: 1000
    })
}

export function showInforToast() {
    toast({
        title: 'Info',
        message: 'Cập nhật thành công !!!',
        type: 'info',
        duration: 1000
    })
}