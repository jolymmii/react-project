import axios from 'axios'
import React from 'react'
import { AppContext } from '../../App'
import Info from '../Info'
import styles from './Drawer.module.scss'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
function Drawer({ onClose, onRemove, items = [], opened }) {
	const [isOrderCompleted, setisOrderCompleted] = React.useState(false)
	const [orderId, setOrderId] = React.useState(null)
	const [isLoading, setIsLoading] = React.useState(false)
	const { Cartitems, setCartitems } = React.useContext(AppContext)
	const totalPrice = Cartitems.reduce((sum, obj) => obj.price + sum, 0)

	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const { data } = await axios.post(
				'https://677adecc671ca030683509e5.mockapi.io/orders',
				{ items: Cartitems }
			)
			setOrderId(data.id)
			setisOrderCompleted(true)

			for (let i = 0; i < Cartitems.length; i++) {
				const item = Cartitems[i]
				console.log(`Удаление элемента с id: ${item.id}`)

				if (!item.id) {
					console.error(`Элемент без id:`, item)
					continue
				}
				await axios.delete(
					`https://677900f8482f42b62e902661.mockapi.io/cart/${item.id}`
				)
				await delay(1000)
			}
			setCartitems([])
		} catch (error) {
			console.error('Ошибка при оформлении заказа:', error.response || error)
		}
	}
	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
			<div className={styles.drawer}>
				<h2 className='mb-30 d-flex justify-between'>
					Корзина{' '}
					<img
						onClick={onClose}
						className='remove__btn cu-p'
						src='/img/remove.svg'
						alt='remove'
					/>
				</h2>

				{items.length > 0 ? (
					<div className='d-flex flex-column flex'>
						<div className='cart__itmes'>
							{items.map(obj => (
								<div
									key={obj.id}
									className='cart__item d-flex align-center mb-20'
								>
									<div
										className='cartitemimg d-flex'
										style={{ backgroundImage: `url(${obj.imageUrl})` }}
									></div>
									<div className='mr-20 flex'>
										<p className='mb-5'>{obj.title}</p>
										<b>{obj.price} руб.</b>
									</div>
									<img
										onClick={() => onRemove(obj.id)}
										className='remove__btn'
										src='/img/remove.svg'
										alt='remove'
									/>
								</div>
							))}
						</div>
						<div className='cart__totalblock'>
							<ul>
								<li>
									<span>Итого:</span>
									<div></div>
									<b>{totalPrice} руб.</b>
								</li>
								<li>
									<span>Налог 5%: </span>
									<div></div>
									<b>{(totalPrice / 100) * 5} руб. </b>
								</li>
							</ul>
							<button
								disabled={isLoading}
								onClick={onClickOrder}
								className='green__button'
							>
								Оформить заказ <img src='/img/arrow.svg' alt='arrow' />
							</button>
						</div>
					</div>
				) : (
					<Info
						title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
						description={
							isOrderCompleted
								? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
								: 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
						}
						image={
							isOrderCompleted
								? '/img/complete-order.svg'
								: '/img/empty-cart.svg'
						}
					/>
				)}
			</div>
		</div>
	)
}

export default Drawer
