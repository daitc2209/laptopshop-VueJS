<template>
	<div>

		<head>
			<title>Admin Page</title>
		</head>
		<div id="toast">
		</div>
		<section class="content-header">
			<div class="container-fluid">
					<div class="row mb-2">
						<div class="col-sm-6">
							<h1>Trang chủ</h1>
						</div>
						<div class="row gy-4 mb-3">
						<!-- Congratulations card -->
						<div class="col-md-12 col-lg-3">
							<div class="card">
								<div class=" card-body">
									<div class="card-circle">
										<i class="card-icon fa-solid fa-calendar"></i>
									</div>
									<div class="card-content">
										<h4 class="card-label">TỔNG ĐƠN</h4>
										<p class="mb-2 pb-1">{{ card.totalOrder }}</p>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-3">
							<div class="card">
								<div class="card-body">
									<div class="card-circle">
										<i class="card-icon fa-solid fa-hand-holding-dollar"></i>
									</div>
									<div class="card-content">
										<h4 class="card-label">TỔNG SẢN PHẨM</h4>
										<p class="mb-2 pb-1">{{ card.totalProduct }}</p>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-3">
							<div class="card">
								<div class="card-body">
									<div class="card-circle">
										<i class="card-icon fa-solid fa-user"></i>
									</div>
									<div class="card-content">
										<h4 class="card-label">Khách hàng</h4>
										<p class="mb-2 pb-1">{{ card.numUser }}</p>
									</div>
								</div>
							</div>
						</div>
						<div class="col-md-12 col-lg-3">
							<div class="card">
								<div class="card-body">
									<div class="card-circle">
										<i class="card-icon fa-solid fa-clipboard"></i>
									</div>
									<div class="card-content">
										<h4 class="card-label">Đơn hàng chờ xử lý</h4>
										<p class="mb-2 pb-1">{{ card.numOrder }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="d-flex">
						<div class="filter-statistical">
							<select class="form-control form-select" v-model="this.select" @change="updateSelect()">
								<option selected="selected" value="1">Thống kê theo tháng</option>
								<option value="2">Thống kê theo khoảng ngày</option>
							</select>
							<ul v-if="this.select == 1">
								<label style="padding-top: 10px;">Thống kê doanh thu theo năm</label>
								<li @click="update(year)" style="cursor: pointer; width: 300px;" v-for="year in years"
									:key="year" :value="year">Năm {{ year }}: {{ formatCurrency(this.revenueWithYear[year]) }}</li>

							</ul>
							<ul v-if="this.select == 2">
								<div class="statistical">
									<label class="statistical-from" for="startDate">Từ ngày:</label>
									<VueDatePicker v-model="startDate" format="yyyy-MM-dd"></VueDatePicker>

									<label class="statistical-from" for="endDate">Đến ngày:</label>
									<VueDatePicker v-model="endDate" format="yyyy-MM-dd"></VueDatePicker>
									<button class="statistical-btn btn btn-primary" @click="thongKe">Thống kê</button>
								</div>
							</ul>
						</div>
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Chart from 'chart.js/auto'
import revenueApi from '../../../service/revenue';
import { showErrorToastMess, showErrorToast } from "../../../assets/web/js/main";
export default {
	components: {
		VueDatePicker
	},
	data() {
		return {
			select: 1,
			years: [],
			revenue: [],
			revenueWithYear: {},
			myChart: null,
			startDate: null,
			endDate: null,
			card:{
				numUser:null,
				numOrder:null,
				totalOrder:null,
				totalProduct:null
			}
		}
	},

	methods: {
		async getRevenue() {
			try {
				const res = await revenueApi.getRevenue()

				this.revenue = res.data.revenue

				this.revenue.forEach(revenue => {
					if (!this.years.includes(revenue.year))
						this.years.push(revenue.year)
				})
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
				});
				this.updateChart(this.revenue, this.years[this.years.length - 1])

			}
			catch (err) {
				console.log("err: " + err)
			}
		},
		async getCard() {
			try {
				const res = await revenueApi.getCard()

				this.card.numUser = res.data.numUser
				this.card.numOrder = res.data.numOrder
				this.card.totalOrder = res.data.totalOrder
				this.card.totalProduct = res.data.totalProduct
			}
			catch (err) {
				console.log("err: " + err)
			}
		},
		init() {
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

			const chart = new Chart(ctx, {
				type: 'bar',
				data: data,
			});
			Object.seal(chart)
			this.myChart = chart
			this.getRevenue(this.myChart)
			this.getCard()
		},
		updateChart(data, year) {
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

		update(year) {
			this.updateChart(this.revenue, year)
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
		async thongKe() {
			let start = this.formatDate(this.startDate)
			let end = this.formatDate(this.endDate)
			let data = { start, end }
			if (start > end) {
				let error = 'Ngày bắt đầu không được lớn hơn ngày kết thúc.';
				showErrorToastMess(error)
			} else {
				try {
					const res = await revenueApi.getStatistical(data)
					this.revenue = res.data.revenueDay
					this.updateChartByDay(this.revenue)

				}
				catch (err) {
					showErrorToastMess("loi r")
					console.log("err: " + err)
				}
			}
		},
		formatDate(date) {
			const formattedDate = new Date(date);
			const hours = ('0' + formattedDate.getHours()).slice(-2);
			const minutes = ('0' + formattedDate.getMinutes()).slice(-2);
			const day = ('0' + formattedDate.getDate()).slice(-2);
			const month = ('0' + (formattedDate.getMonth() + 1)).slice(-2);
			const year = formattedDate.getFullYear();
			return `${year}-${month}-${day} ${hours}:${minutes}`;
		},

		formatCurrency(value) {
			const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
			});
			return formatter.format(value);
		},

		updateChartByDay(data) {
			// Xử lý dữ liệu và cập nhật biểu đồ theo từng ngày
			const startDate = new Date(this.startDate);
			const endDate = new Date(this.endDate);
			// Tính toán số ngày trong khoảng từ startDate đến endDate
			const daysInRange = Math.floor((endDate - startDate) / (24 * 60 * 60 * 1000)) + 1;

			// Tạo mảng labels từ ngày bắt đầu đến ngày kết thúc
			const labels = Array.from({ length: daysInRange }, (_, i) => {
				const date = new Date(startDate);
				date.setDate(date.getDate() + i);
				return date.toLocaleDateString();
			});
			// Tạo mảng data với giá trị 0 cho mỗi ngày
			const dataArr = Array.from({ length: daysInRange }, () => 0);

			// Cập nhật giá trị data dựa trên dữ liệu thống kê
			data.forEach((item) => {
				const year = item.year;
				const month = item.month;
				const day = item.day;

				// Tạo đối tượng Date từ năm, tháng và ngày
				const date = new Date(year, month - 1, day);
				const dayDifference = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
				dataArr[dayDifference] = item.total_money_day;
			});

			const colors = this.generateColors(labels.length);

			// Gán dữ liệu từ khu revenue vào data
			this.myChart.data.datasets[0].data = dataArr;
			this.myChart.data.labels = labels;
			this.myChart.data.datasets[0].backgroundColor = colors;

			// Cập nhật biểu đồ
			this.myChart.update();
		},

		updateSelect() {
			if (this.select == 1) {
				this.getRevenue()
			}
			if (this.select == 2)
				console.log("select: " + this.select)
		}
	},

	mounted() {
		if (!sessionStorage.getItem("login") && sessionStorage.getItem("role") != "ROLE_ADMIN") {
			// window.location.href = "/auth/sign-in"
			this.$router.push("/auth/sign-in")
			sessionStorage.setItem("auth", true)
		}
		if (this.select == 1)
			this.init()
	}
}
</script>

<style>
.statistical {
	margin: 20px 20px 0 0;
}

.statistical-from {
	margin: 4px 0;
}

.statistical-btn {
	margin-top: 8px;
	border-color: #fff;
}
.filter-statistical{
	width: 340px;
	margin-right: 30px;
}

.card-body{
	display: flex;
	border-left: 2px solid blue;
	border-radius: 4px;
}
.card-circle{
	margin-right: 16px;
	width: 65px;
    height: 65px;
    border: 4px solid #A9C7F7;
    border-radius: 50%;
}
.card-content .card-label{
	padding: 4px 0;
	font-size: 19px;
	color: #3C434D;
}
.card-icon{
	width: 100%;
    height: 100%;
	color: #4D91FC;
    font-size: 35px;
    text-align: center;
    margin-top: 10px;
}
</style>