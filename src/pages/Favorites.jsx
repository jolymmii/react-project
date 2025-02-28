import axios from 'axios'
import React from 'react'
import { AppContext } from '../App'
import Card from '../components/Card/Card'
import InfoEmpty from '../components/InfoEmpty'

function Favorites() {
	const { favorites, setFavorites, onAddToFavorite } =
		React.useContext(AppContext)

	React.useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const { data } = await axios.get(
					'https://677adecc671ca030683509e5.mockapi.io/favorites'
				)
				setFavorites(data)
			} catch (error) {
				console.error('Не удалось загрузить избранные:', error)
				alert('Не удалось загрузить избранные!')
			}
		}

		fetchFavorites()
	}, [setFavorites])

	const handleRemoveFavorite = async id => {
		try {
			// Удаляем из MockAPI
			await axios.delete(
				`https://677adecc671ca030683509e5.mockapi.io/favorites/${id}`
			)
			// Обновляем состояние локально
			setFavorites(prevFavorites =>
				prevFavorites.filter(item => item.id !== id)
			)
		} catch (error) {
			console.error('Ошибка при удалении из избранного:', error)
			alert('Не удалось удалить элемент из закладок!')
		}
	}

	return (
		<div className='content p-40'>
			{favorites.length > 0 && <h1>Мои закладки</h1>}
			{favorites.length > 0 ? (
				<div className='d-flex flex-wrap'>
					{favorites.map(item => (
						<Card
							key={item.id}
							id={item.id}
							itemId={item.itemId}
							title={item.title}
							imageUrl={item.imageUrl}
							price={item.price}
							onFavorite={() => handleRemoveFavorite(item.id)}
						/>
					))}
				</div>
			) : (
				<InfoEmpty
					title='Закладок нет :('
					description='Вы ничего не добавляли в закладки.'
					image='/react-project/img/empty-favorites.png'
				/>
			)}
		</div>
	)
}

export default Favorites
