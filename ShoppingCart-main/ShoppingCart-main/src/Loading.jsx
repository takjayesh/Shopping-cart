function Loading({ className='loading', children=''}) {
  return (
    <div>
      <div className={className}></div>
      {children}
    </div>
  );
}

export default Loading;