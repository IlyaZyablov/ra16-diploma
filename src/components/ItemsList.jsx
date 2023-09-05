import Item from './Item';

function ItemsList(data) {
  const { list } = data;

  return (
    <div className="row">
      {list.length > 0 ? (
        list.map(elem =>
          <Item key={elem.id} itemData={elem} />
        )
      ) : (
        <p>Данные для просмотра отсутствуют!</p>
      )}
    </div>
  )
}

export default ItemsList;