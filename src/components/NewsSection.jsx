import "../styles/news.css";

const newsItems = [
  { 
    img: "/news1.jpg", 
    title: "የመንግስት አገልግሎትና አስተዳደር የሪፎርም ሥራው ባለቤት ሠራተኛው ነው። ክብርት ወ/ሮ ሙፈሪሃት ካሚል የሥራና ክህሎት ሚኒስትር",
    bottomText: "FEBRUARY 12, 2026" 
  },
  { 
    img: "/news2.jpg", 
    title: "የመንግስት አገልግሎትና አስተዳደር ሪፎርና ትግበራ ...",
    bottomText: "FEBRUARY 12, 2026" 
  },
  { 
    img: "/news3.jpg", 
    title: "ብሩህ ሀገር አገፍ የፈጠራ ሃሳብ ውድድር መካሄድ ጀመረ",
    bottomText: "FEBRUARY 12, 2026" 
  },
  { 
    img: "/news4.jpg", 
    title: "የሀገር ብልጽግናን የሚያፋጥኑ አዳዲስ የፈጠራ ሃሳቦች ለመደገፍና ኮትኩቶ ወደ ውጤት ለመቀየር ተቀናጅቶ መስራት ይገባል። ከቡር ኢቶ ዝኸውን ሶካ የሥራና ክህሎት ሚኒስቴርሚኒስትር ዴኤታ",
    bottomText: "FEBRUARY 12, 2026" 
  },
];

export default function NewsSection() {
  return (
    <section className="news-section">
      <h2 className="section-title">News</h2>
      <div className="news-container">
        {newsItems.map((item, index) => (
          <div className="news-card" key={index}>
            <img src={item.img} alt={item.title} />
            <div className="news-text-center">
              <h3>{item.title}</h3>
            </div>
            <div className="news-bottom-bar">
              <p>{item.bottomText}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
