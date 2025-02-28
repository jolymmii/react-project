import React from 'react'
import Card from '../components/Card/Card'

function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddFavorite,
	onAddToCart,
	isLoading,
	favorites,
}) {
	const handleAddFavorite = item => {
		// Вызов onAddFavorite, чтобы добавить/удалить товар из избранного
		onAddFavorite(item)
	}
	console.log('Items:', items)
	const renderItems = () => {
		const filtredItems = items.filter(item =>
			item.title.toLowerCase().includes(searchValue.toLowerCase())
		)

		return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
			<Card
				key={index}
				id={item?.id || index} // Используем index, если item.id нет
				itemId={item?.id} // Используем itemId только если item не undefined
				onPlus={obj => onAddToCart(obj)}
				onFavorite={handleAddFavorite}
				loading={isLoading}
				favorited={favorites && favorites.some(fav => fav.id === item?.id)}
				{...item}
			/>
		))
	}

	return (
		<div className='content p-40'>
			<div className='d-flex align-center mb-40 justify-between'>
				<h1>
					{searchValue ? `Поиск по запросу: ${searchValue}` : `Все кроссовки`}
				</h1>
				<div className='search-block d-flex'>
					{searchValue && (
						<img
							className='clear cu-p'
							onClick={() => setSearchValue('')}
							src='/img/remove.svg'
							alt='close'
						/>
					)}
					<img src='/img/Serach.svg' alt='search' />
					<input
						onChange={onChangeSearchInput}
						value={searchValue}
						placeholder='Поиск..'
						type='text'
					/>
				</div>
			</div>
			<div className='d-flex flex-wrap'>{renderItems()}</div>
		</div>
	)
}

export default Home
