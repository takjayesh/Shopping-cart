function Controls({ onLogout, onRefresh }) {
  return (
    <div className="controls">
      <button onClick={onRefresh} className="btn-ctrl-login">Refresh</button>
      <button onClick={onLogout} className="btn-ctrl-logout">Logout</button>
    </div>
  );
}

export default Controls;
