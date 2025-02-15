import HomeCard from "../UI/HomeCard";
import Header from "../UI/Header";
import Footer from "../UI/Footer";
import styles from '/public/styles/home.module.css';


const streets = [
  { streetName: "الاباصيري", color: "#e57373", imgurl: "images/street1.jpeg" },
  { streetName: "علي الصباغ", color: "#64b5f6", imgurl: "images/street2.jpeg" },
  { streetName: "علي يونس", color: "#81c784", imgurl: "images/street3.jpeg" },
  { streetName: "مصطفي خاطر", color: "#ffb74d", imgurl: "images/street4.jpeg" },
  {
    streetName: "الشيخ محمود",
    color: "#261d66",
    imgurl: "images/street5.jpeg",
  },
  { streetName: "القلايه", color: "#c62828", imgurl: "images/street5.jpeg" },
  { streetName: "ابو حافظ", color: "#1565c0", imgurl: "images/street5.jpeg" },
  { streetName: "الترجمان", color: "#2e7d32", imgurl: "images/street5.jpeg" },
  {
    streetName: "عبد الحفيظ الفران",
    color: "#ef6c00",
    imgurl: "images/street5.jpeg",
  },
  {
    streetName: "كنيسة قديمة",
    color: "#6a1b9a",
    imgurl: "images/street5.jpeg",
  },
  { streetName: "الازاز", color: "#931849", imgurl: "images/street5.jpeg" },
];

function Home() {
  return (
    <>
      <Header caller="home" />
      <section className={styles.cards_container}>
        {streets.map(({ streetName, color, imgurl }, index) => (
          <HomeCard
            streetName={streetName}
            color={color}
            key={index}
            imgurl={imgurl}
          />
        ))}
      </section>    
      <Footer />
    </>
  );
}

export default Home;
