import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
  orderBy,
  where,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase/index";
import { useEffect, useRef, useState } from "react";
import Message from "../components/Message";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

const ChatPage = ({ room, setRoom }) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  // JSX elementlerine erişimi, useRef kullanarak sağlıyoruz.
  // Böylece, DOM elemanlarına referans alabilir ve dinamik olarak işlemler yapabiliriz.
  const lastMsg = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // mesaj document'inin kaydelicegi koleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // referansı alınan koleksiyonu document'i ekle
    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        photo: auth.currentUser.photoURL,
      },
      createdAt: serverTimestamp(),
    });

    // Formu temizle
    setText("");
  };

  // Mevcut odada gönderilen mesajları anlık olarak al
  useEffect(() => {
    // 1) Abone olunucak kolleksiyonun referansını al
    const messagesCol = collection(db, "messages");

    // 2) Sorgu ayarlarını yap
    const q = query(
      messagesCol,
      where("room", "==", room),
      orderBy("createdAt", "asc")
    );

    // 3) onSnapShot: Anlık olarak kolleksiyondaki değişimleri izler
    // Her değiştiğinde callback fonksiyonu tetiklenir ve güncellemeri alır
    const unsub = onSnapshot(q, (snapshot) => {
      let temp = [];

      // data methodu ile dökümanların içerisindeki veriye erişip diziye aktardık
      snapshot.docs.forEach((doc) => {
        temp.push(doc.data());
      });

      // Yeni mesaj gönderildiğinde en sona gelen mesaja odaklanmak için `scrollIntoView` kullanıyoruz.
      lastMsg.current.scrollIntoView({ behavior: "smooth" });

      setMessages(temp);
    });

    // 4) Kullanıcı sayfadan ayırıldıgı anda dinlemeyi durdur
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="chat-page">
      <header>
        <p className="Name">{auth.currentUser?.displayName}</p>
        <p className="Room">{room}</p>
        <button onClick={() => setRoom(null)}>Farklı Oda</button>
      </header>

      <main>
        {messages < 1 ? (
          <div className="warn">
            <p>Sohbete ilk mesajı gönderin</p>
          </div>
        ) : (
          messages.map((data, key) => <Message data={data} key={key} />)
        )}

        {/*  Burası return satırının içinde kaydırmak istediğimiz yerde olucak */}
        <div ref={lastMsg} />
      </main>

      <form className="relative" onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Mesajınızı Giriniz"
        />
        <div>
          <EmojiPicker
            onEmojiClick={(e) => {
              setText(text + e.emoji, setIsOpen(false));
            }}
            open={isOpen}
            skinTonesDisabled
            style={{
              position: "absolute",
              bottom: "400px",
            }}
          />

          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            <MdOutlineEmojiEmotions className="emoji" />
          </button>
        </div>
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ChatPage;
