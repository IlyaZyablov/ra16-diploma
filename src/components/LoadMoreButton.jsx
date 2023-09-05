function LoadMoreButton(data) {
  const { handleMore, loadMoreButton } = data;

  return (
    <div className="text-center" ref={loadMoreButton}>
      <button className="btn btn-outline-primary" onClick={handleMore}>Загрузить ещё</button>
    </div>
  )
}

export default LoadMoreButton;