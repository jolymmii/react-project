import React from 'react'
import ContentLoader from 'react-content-loader'
import { AppContext } from '../../App'
import styles from './Card.module.scss'

function Card({
	id,
	itemId,
	onFavorite,
	title,
	imageUrl,
	price,
	onPlus,
	loading = false,
}) {
	const { isItemAdded, isItemFavorited } = React.useContext(AppContext)

	const onClickPlus = () => {
		onPlus({ id, title, imageUrl, price })
	}

	const onClickFavorite = async () => {
		try {
			await onFavorite({ id, title, imageUrl, price })
		} catch (error) {
			console.error('Ошибка добавления в избранное:', error)
		}
	}

	// Проверяем, является ли товар в избранном
	const isFavorited = isItemFavorited(itemId)

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={187}
					viewBox='0 0 150 187'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='0' rx='10' ry='10' width='150' height='90' />
					<rect x='0' y='103' rx='10' ry='10' width='150' height='15' />
					<rect x='0' y='124' rx='10' ry='10' width='93' height='15' />
					<rect x='0' y='158' rx='10' ry='10' width='80' height='24' />
					<rect x='113' y='150' rx='10' ry='10' width='32' height='32' />
				</ContentLoader>
			) : (
				<>
					{onFavorite && (
						<div className='fav' onClick={onClickFavorite}>
							<img
								src={isFavorited ? '/img/liked.svg' : '/img/unliked.svg'}
								alt={isFavorited ? 'liked' : 'unliked'}
							/>
						</div>
					)}
					<img width={133} height={112} src={imageUrl} alt={title} />
					<h5>{title}</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						{onPlus && (
							<img
								className={styles.plus}
								onClick={onClickPlus}
								src={
									isItemAdded(id)
										? '/img/btn-checked.svg'
										: '/img/btn-not-checked.svg'
								}
								alt='Добавить в корзину'
							/>
						)}
					</div>
				</>
			)}
		</div>
	)
}

export default Card
