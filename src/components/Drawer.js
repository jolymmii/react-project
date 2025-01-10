function Drawer({ onClose, onRemove, items = [] }) {
	return (
		<div className='overlay'>
			<div className='drawer'>
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
					<div>
						<div className='cart__itmes'>
							{items.map(obj => (
								<div className='cart__item d-flex align-center mb-20'>
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
									<b>21 498 руб.</b>
								</li>
								<li>
									<span>Налог 5%: </span>
									<div></div>
									<b>1074 руб. </b>
								</li>
							</ul>
							<button className='green__button'>
								Оформить заказ <img src='/img/arrow.svg' alt='arrow' />
							</button>
						</div>
					</div>
				) : (
					<div class='cartEmpty d-flex align-center justify-center flex-column flex'>
						<img
							class='mb-20'
							width='120px'
							height='120px'
							src='/img/empty-cart.svg'
							alt='Empty Cart'
						/>
						<h2>Корзина пустая</h2>
						<p class='opacity-6'>
							Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
						</p>
						<button onClick={onClose} className='green__button'>
							<img src='/img/arrow.svg' alt='arrow' />
							Вернуться назад
						</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default Drawer
