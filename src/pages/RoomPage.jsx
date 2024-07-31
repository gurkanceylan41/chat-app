import React from "react";

const RoomPage = ({ setIsAuth, setRoom }) => {
  const logout = () => {
    // Yetki state'ini false çek
    setIsAuth(false);

    // Local'deki tokeni kaldır
    localStorage.removeItem("token");
  };

  function handleSubmit(e) {
    e.preventDefault();
    const room = e.target[0].value.toLocaleLowerCase();

    setRoom(room);
  }
  return (
    <form onSubmit={handleSubmit} className="room-page">
      <h2>Chat Odası</h2>
      <p>Hangi Odaya Giriceksiniz</p>

      <input placeholder="ör:haftaiçi" type="text" />

      <button type="submit">Odaya Gir</button>
      <button onClick={logout} type="button">
        Çıkış yap
      </button>
    </form>
  );
};

export default RoomPage;
