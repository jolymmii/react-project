import Card from '../components/Card/Card'

function Home({
	items,
	searchValue,
	setSearchValue,
	onChangeSearchInput,
	onAddFavorite,
	onAddToCart,
}) {
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
			<div className='d-flex flex-wrap'>
				{items
					.filter(item =>
						item.title.toLowerCase().includes(searchValue.toLowerCase())
					)
					.map((item, index) => (
						<Card
							key={index}
							onPlus={obj => onAddToCart(obj)}
							onFavorite={obj => onAddFavorite(obj)}
							{...item}
						/>
					))}
			</div>
		</div>
	)
}

export default Home
