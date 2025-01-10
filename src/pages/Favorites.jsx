import Card from '../components/Card/Card'

function Favorites({ items, onAddToFavorite }) {
	// Проверка, чтобы убедиться, что items — это массив
	if (!Array.isArray(items)) {
		return <div>Loading...</div> // Пока данные не загрузятся, показываем индикатор
	}

	return (
		<div className='content p-40'>
			<h1>Мои закладки</h1>
			<div className='d-flex flex-wrap'>
				{items.map((item, index) => (
					<Card
						key={index}
						favorited={true}
						onFavorite={onAddToFavorite}
						{...item}
					/>
				))}
			</div>
		</div>
	)
}
export default Favorites
