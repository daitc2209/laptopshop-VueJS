<template>
  <div>
    <head><title>Admin Home Page</title></head>
    <section class="content-header">
			<div class="container-fluid">
				<div class="row mb-2">
					<div class="col-sm-6">
						<h1>Admin</h1>
					</div>
					<div class="col-sm-6">
						<ol class="breadcrumb float-sm-right">
							<li class="breadcrumb-item"><a href="#">Home</a></li>
						</ol>
					</div>
					<div class="d-flex">
						<ul>
							<label for="">Thống kê doanh thu theo năm</label>
							<li @click="update(year)" style="cursor: pointer; width: 300px;" v-for="year in years" :key="year" :value="year">Năm {{ year }}: {{ this.revenueWithYear[year] }}</li>
						</ul>
						<div style="width: 1000px; height: 600px;">
							<canvas id="myChart"></canvas>
						</div>
					</div>
				</div>
			</div>
		</section>
</div>
</template>

<script>
import Chart from 'chart.js/auto'
import revenueApi from '../../../service/revenue';
export default {
	data(){
		return {
      		years: [],
			revenue: [],
			revenueWithYear: {},
			myChart: null
		}
	},

	methods: {
		async getRevenue() {
            try{
                const res = await revenueApi.getRevenue()

                this.revenue = res.data.revenue
				this.revenue.forEach(revenue => {
					if(!this.years.includes(revenue.year))
						this.years.push(revenue.year)
						console.log("revenue.year: "+revenue.year)
				})

				this.years.forEach(r=> console.log("year: "+r))
				this.revenue.forEach(r => {
					const year = r.year;
					const totalMoney = r.total_money_month;

					// Kiểm tra xem năm đã tồn tại trong đối tượng/mảng chưa
					if (this.revenueWithYear.hasOwnProperty(year)) {
						// Nếu năm đã tồn tại, cộng tổng tiền với giá trị hiện tại
						this.revenueWithYear[year] += totalMoney;
					} else {
						// Nếu năm chưa tồn tại, khởi tạo tổng tiền cho năm đó
						this.revenueWithYear[year] = totalMoney;
					}

					console.log("eda: "+this.revenueWithYear)
				});

                this.updateChart(this.revenue, this.years[this.years.length-1])
            }
            catch(err){
                console.log("err: "+err)
            }
        },
		init(){
            const ctx = document.getElementById("myChart")

			if (!ctx) {
				console.error("Không tìm thấy phần tử có ID là 'myChart'.");
				return;
			}

            const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
			const data = {
				labels: labels,
				datasets: [{
					label: 'Tổng doanh thu',
					data: [65, 59, 80, 81, 56, 55, 40],
					backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					],
					borderColor: [
					'rgb(255, 99, 132)',
					'rgb(255, 159, 64)',
					],
					borderWidth: 1
				}]
			};

            const chart = new Chart(ctx ,{
                type: 'bar',
                data: data,
            });
			Object.seal(chart)
			this.myChart = chart
            this.getRevenue(this.myChart)
        },
		updateChart(data, year){
            const revenueData = new Array(12).fill(0);
			for (let i = 0; i < data.length; i++) {
				if (data[i] == null || data[i] === "") {
					continue;
				} else {
					if (data[i].year === year) {
						revenueData[data[i].month - 1] += data[i].total_money_month;
					}
				}
			}
			// Tạo một mảng màu sắc tương ứng với số lượng label
			const colors = this.generateColors(this.myChart.data.labels.length);

			// Gán dữ liệu từ khu revenue vào data
			this.myChart.data.datasets[0].data = revenueData;
			this.myChart.data.labels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
			this.myChart.data.datasets[0].backgroundColor = colors;

			// Cập nhật biểu đồ
			this.myChart.update();
        },

		update(year){
			this.updateChart(this.revenue,year)
		},

        generateColors(count) {
            const colors = [];

            for (let i = 0; i < count; i++) {
                const color = `rgb(${this.getRandomValue(0, 255)}, ${this.getRandomValue(0, 255)}, ${this.getRandomValue(0, 255)})`;
                colors.push(color);
            }

            return colors;
        },
        getRandomValue(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
	},


	mounted(){
		if(!sessionStorage.getItem("login") && sessionStorage.getItem("role")!="ROLE_ADMIN")
		{
			// window.location.href = "/auth/sign-in"
			this.$router.push("/auth/sign-in")
			sessionStorage.setItem("auth",true)
		}
		else
			this.init()
	}
}
</script>

<style>

</style>