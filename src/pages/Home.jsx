import HomeCard from "../UI/HomeCard";
import Header from "../UI/Header";

// import "./home.css";
import styles from '/public/styles/home.module.css'


const streets = [
  {streetName:"الاباصيري",color:'#e57373'},
  {streetName:"علي الصباغ",color:'#64b5f6'},
  {streetName:"علي يونس",color:'#81c784'},
  {streetName:"مصطفي خاطر",color:'#ffb74d'},
  {streetName:"الشيخ محمود",color:'#261d66'},
  {streetName:"القلايه",color:'#c62828'},
  {streetName:"ابو حافظ",color:'#1565c0'},
  {streetName:"الترجمان",color:'#2e7d32'},
  {streetName:"عبد الحفيظ الفران",color:'#ef6c00'},
  {streetName:"كنيسة قديمة",color:'#6a1b9a'},
  {streetName:"الازاز",color:'#931849'},
];

function Home() {
  return (
    <>
      <Header caller = 'home'/>
      <section className={styles.cards_container}>
        {streets.map(({streetName,color},index) => (
          <HomeCard streetName={streetName} color={color} key={index} />
        ))}
      </section>    
    </>
  );
}

export default Home;
