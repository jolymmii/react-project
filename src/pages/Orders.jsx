import axios from 'axios'
import React from 'react'
import Card from '../components/Card/Card'
import InfoEmpty from '../components/InfoEmpty'

function Orders() {
	const [orders, setOrders] = React.useState([])
	const [isLoading, setisLoading] = React.useState(true)
	React.useEffect(() => {
		;(async () => {
			try {
				const { data } = await axios.get(
					'https://677adecc671ca030683509e5.mockapi.io/orders'
				)
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
				setisLoading(false)
			} catch (error) {
				alert('Не удалось загрузить покупки!')
				console.error(error)
			}
		})()
	}, [])

	return (
		<div className='content p-40'>
			{orders.length > 0 && <h1>Мои заказы</h1>}
			{orders.length > 0 ? (
				<div className='d-flex flex-wrap'>
					{(isLoading ? [...Array(8)] : orders).map((item, index) => (
						<Card key={index} loading={isLoading} {...item} />
					))}
				</div>
			) : (
				<InfoEmpty
					title='У вас нет заказов'
					description='Оформите хотя бы один заказ..'
					image='/react-project/img/emptyOrder.png'
					className='favorites-info'
				/>
			)}
		</div>
	)
}

export default Orders
