import './App.css';
import banner1 from './images/banner/banner-1.jpg';
import jQuery from 'jquery';
import {useState,useEffect} from 'react';
import ReactGA from 'react-ga';
import CookieConsent from "react-cookie-consent";
import links from './data/links.json';
import suspectedQuestions from './data/suspected-questions.json';
import negativeSuspectedQuestions from './data/negative-suspected-questions.json';

let trackingID = "UA-116566614-6";
let createUUID = () =>{
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

let generateAndStoreUserID = ()=>{
    let userID = localStorage.getItem('userid');
    if(userID !==null ){
        return userID;
    }
    userID = createUUID();
    localStorage.setItem('userid',userID);
    return userID;
}

ReactGA.initialize(trackingID,{debug:false});
ReactGA.set({
    userId: generateAndStoreUserID()
});
ReactGA.pageview(window.location.pathname + window.location.search);


function ViewEf($) {
    "user strict";
    // Preloader Js
    $(window).on('load', function () {
        $('#overlayer').fadeOut(1000);
        var img = $('.bg_img');
        img.css('background-image', function () {
            var bg = ('url(' + banner1 + ')');
            return bg;
        });
    });
    $(document).ready(function () {
        // Scroll To Top 
        var scrollTop = $(".scrollToTop");
        $(window).on('scroll', function () {
            if ($(this).scrollTop() < 500) {
                scrollTop.removeClass("active");
            } else {
                scrollTop.addClass("active");
            }
        });
        //Click event to scroll to top
        $('.scrollToTop').on('click', function () {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
            return false;
        });
        //Header Bar
        $('.header-bar').on('click', function () {
            $(this).toggleClass('active');
            $('.overlay').toggleClass('active');
            $('.menu').toggleClass('active');
        })
        $('.overlay').on('click', function () {
            $(this).removeClass('active');
            $('.header-bar').removeClass('active');
            $('.menu').removeClass('active');
        })
        // Header Sticky Herevar prevScrollpos = window.pageYOffset;
        var scrollPosition = window.scrollY;
        if (scrollPosition >= 1) {
            $(".header-section").addClass('active');
        }
        var header = $(".header-section");
        $(window).on('scroll', function () {
            if ($(this).scrollTop() < 1) {
                header.removeClass("active");
            } else {
                header.addClass("active");
            }
        });
    });
};

const questionWorkFlow=[
    {
        choice: "Evet",
        label: "Hiç tereddütüm yok.",
        icon: "yes-icon.svg",
        categories: ["a"]
    },
    {
        choice: "Evet",
        label: "Ancak bazı sorularım var.",
        icon: "suspect.svg",
        child: suspectedQuestions
    },
    {
        choice: "Hayır",
        label: "Ancak bazı sorularım var.",
        icon: "denial.svg",
        child: suspectedQuestions.concat(negativeSuspectedQuestions)
    }
];
const questionHandler = (setQuestions,setTitle)=>{
    return (question)=>{
        return ()=>{
            ReactGA.event({
                category: "Question",
                action: (question.choice?question.choice:"") + " " + question.label
            });
            if(typeof question.child !== "undefined") {
                setTitle(question.label?question.label:question.choice);
                setQuestions(Object.values(question.child));
            }
            window.location = "#root";
        }
    }
}

const linksHandler = (setQuestions,setLinks,setTitle)=>{
    return (question)=>{
        return ()=> {
            ReactGA.event({
                category:"Question Links",
                action: (question.choice?question.choice:"") + " " + question.label
            });
            let concatinatedLinks = [];
            concatinatedLinks = question.categories.map(c=>links[c]).reduce((acc,cur)=>acc.concat(cur),[]);
            setTitle(question.label?question.label:question.choice);
            setQuestions([]); 
            setLinks(concatinatedLinks);
            window.location = "#root";
        }
    }
}
function Header({page,setPage}) {
    let [menuClasses,setMenuClasses] = useState("");
    useEffect(()=>{
        setMenuClasses("menu");
    },[]);
    return <header className="header-section">
        <div className="container">
            <div className="header-wrapper">
                <div className="logo-area">
                    <div className="logo">
                        <a href="index.html">
                            <img src="/assets/images/default-monochrome-white.svg" alt="logo"/>
                        </a>
                    </div>
                </div>
                <ul className={menuClasses}>
                    <li>
                        <a href="/">Anasayfa</a>
                    </li>
                    <li>
                        <a onClick={()=>{
                        setPage(<AboutUs/>);
                        setMenuClasses(classes=>"menu");
                        document.querySelector(".overlay").classList.remove("active");
                        }} href="#">Hakkımızda</a>
                    </li>
                </ul>
                <div className="header-bar d-lg-none" onClick={()=>{
                    if(document.querySelector(".overlay").classList.contains("active")) {
                        setMenuClasses(classes=>"menu");
                        document.querySelector(".overlay").classList.remove("active");
                    }else{
                        setMenuClasses(classes=>"menu active");
                        document.querySelector(".overlay").classList.add("active");
                    }
                    }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </header>;
}
function QuestionsSection() {
    const [questions,setQuestions] = useState(questionWorkFlow);
    const [links,setLinks] = useState([]);
    const [title,setTitle] = useState("Aşı olmak istiyor musunuz?");
    if(links.length) {
        return <>
            <BannerSection title={title}/>
            <LinksSection links={links}/>
        </>
    }
    return (
        <>
            <BannerSection title={title}/>
            <div className="how-search-section padding-bottom mt--83">
                <div className="container">
                    <div className="how-search-wrapper">
                        <div className="row mb-30-none justify-content-center">
                            {questions.map(question=>{ return ( 
                                <div className="col-sm-10 col-md-6 col-lg-4" onClick={typeof question.categories == "undefined" ? questionHandler(setQuestions,setTitle)(question) : linksHandler(setQuestions,setLinks,setTitle)(question)} key={"question"+question.label+question.choice}>
                                    <div className="how-search-item">
                                        {question.icon &&
                                        <div className="thumb">
                                            <img src={"./assets/images/"+question.icon} alt={question.label}/>
                                        </div>
                                        }
                                        <div className="content">
                                            <h4 className="title"><a href="#0">{question.choice}</a></h4>
                                            <p>{question.label}</p>
                                        </div>
                                    </div>
                                </div>);
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
function AboutUs() {
            ReactGA.event({
                category:"Pageview",
                action: "Hakkımızda",
                label: "Hakkımızda"
            });
    return <>
        <BannerSection title="Hakkımızda"/>
        <div className="billing-section padding-bottom" style={{marginTop: "-83px"}}>
            <div className="container">
                <div className="how-search-wrapper">
                    <p><b>Covid-19</b> mücadelesinde aşının önemini ve aşıyla ilgili bilgi karmaşasını gördüğümüz için <a href="https://www.smallscaled.com" target="_blank"> Burcu Tepekule</a>, <a href="https://emre.xyz" target="_blank">Emre Yılmaz</a> ve <a href="https://elcineksi.com" target="_blank">Elçin Ekşi</a> olarak, bir araya gelip, <a href="https://www.bilimma.com" target="_blank" title="Bilimsel Haber Sitesi">bilimma.com</a>’un desteğiyle <i>Çare Aşı</i> projesini hayata geçirdik.</p>
                    <p>
                        Covid-19 mücadelesi küresel olarak sürüyor. Bu mücadelede sağlık çalışanlarının elindeki en büyük mücadele aracı ise kısa sürede ve yüksek maliyetlerle geliştirilen Covid-19 aşıları. Küresel olarak hızla devam eden aşılama çalışmalarının ilerlemesi önünde çeşitli engeller bulunuyor. Bunlardan birisi insanları yanlış bilgilendiren ve komplo teorileriyle insanları yanlış yönlendirmekten hoşlananların yaptığı kampanyalar.</p>
                    <p>Bu yanlış bilgilendirme kampanyalarıyla mücadeleye yardımcı olması için bir araya gelerek çeşitli kaynaklara kolay erişim sağlayacak bir platform geliştirdik. Amacımız insanların aklına takılan sorulara kolay ve hızlı yanıt bulmasını sağlamak oldu. Böylece yanlış bilgi hızlı yayılsa da biz de doğru bilginin kolay erişilebilir olmasını istedik.</p>
                    <p>Çevrenizde farklı yaş gruplarında ve çeşitli topluluklarda bu siteyi paylaşarak daha fazla kişiye ulaştırabilir bu çalışmalarda siz de bize katılabilirsiniz. Sitedeki içerikler ve bağlantılarla ilgili tavsiye, iyileştirme ve diğer önerileriniz için bize <a href="mailto:bilgi@careasi.org">bilgi@careasi.org</a> adresine e-posta göndererek ulaşabilirsiniz.</p>
                    <br/>
                    <p>
                        Bizimle olduğunuz için teşekkürler.
                    </p>
                </div>

                <div className="how-search-wrapper" style={{marginTop:"20px"}}>
                    <h4>Burcu Tepekule Kimdir?</h4>
                    <br/>
                    <p>Antibiyotik direnci evrimi, epidemiyoloji, mikrobiyom modellemesi, zaman serileri analizi ve sinyal işleme ve son dönemde Covid-19 epidemiyolojik modelleme alanında çalışmalar yapan Zürih Üniversite Hastanesi’nde doktora sonra araştırmacı.</p>
                    <ul className="social-icons" style={{backgroundColor:"#372c7a",borderRadius:"6px"}}>
                        <li>
                            <a href="https://www.smallscaled.com" title="Burcu Tepekule kişisel web sayfası" target="_blank"><i className="fas fa-globe-asia"></i></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/burcutepekule/" title="Burcu Tepekule linkedin hesabı" target="_blank"><i className="fab fa-linkedin"></i></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/burcutepekule" target="_blank" title="Burcu Tepekule twitter hesabı"><i className="fab fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="https://scholar.google.com/citations?user=mNuCT7MAAAAJ&hl=en" title="Burcu Tepekule Schoolar profili"><i className="fas fa-graduation-cap"></i></a>
                        </li>
                        <li>
                            <a href="https://github.com/burcutepekule" target="_blank" title="Burcu Tepekule github adresi"><i className="fab fa-github"></i></a>
                        </li>
                    </ul>
                </div>
                <div className="how-search-wrapper" style={{marginTop:"20px"}}>
                    <h4>Elçin Ekşi Kimdir?</h4>
                    <br/>
                    <p>Ekoloji ve evrimle ilgilenen biyolog. Orta Doğu Teknik Üniversitesi’nde arkeometri alanında yüksek lisansına devam ediyor. Anadolu’nun holosen dönemi faunasını inceliyor. <a href="https://www.eresbiotech.com" target="_blank"> ERES Biyoteknoloji</a>’de Emre ile birlikte projelerine devam ediyor.  <a href="https://bilimkutusu.com" target="_blank" title="Bilimsel Aktivite Kutusu">Bilim Kutusu</a> ve <a href="https://bilimma.com" title="Bilimsel haber platformu" target="_blank">Bilimma.com</a> projelerinde ise kurucu, içerik ve ürün geliştirici.</p>
                    <ul className="social-icons" style={{backgroundColor:"#372c7a",borderRadius:"6px"}}>
                        <li>
                            <a href="https://elcineksi.com" title="Elçin Ekşi kişisel web sayfası" target="_blank"><i className="fas fa-globe-asia"></i></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/el%C3%A7in-ek%C5%9Fi/" title="Elçin Ekşi linkedin hesabı" target="_blank"><i className="fab fa-linkedin"></i></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/amaeksi" target="_blank" title="Elçin Ekşi twitter hesabı"><i className="fab fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="https://scholar.google.com.tr/citations?user=WNhtRggAAAAJ&hl=tr" title="Elçin Ekşi Schoolar profili"><i className="fas fa-graduation-cap"></i></a>
                        </li>
                        <li>
                            <a href="https://github.com/amaeksi" target="_blank" title="Elçin Ekşi github adresi"><i className="fab fa-github"></i></a>
                        </li>
                    </ul>
                </div>

                                <div className="how-search-wrapper" style={{marginTop:"20px"}}>
                    <h4>Emre Yılmaz Kimdir?</h4>
                    <br/>
                                    <p>Web uygulamaları geliştiricisi. <a href="https://bilimkutusu.com" target="_blank" title="Bilimsel Aktivite Kutusu">Bilim Kutusu</a> ve <a href="https://bilimma.com" title="Bilimsel haber platformu" target="_blank">Bilimma.com</a> projelerinde kurucu, <a href="https://www.eresbiotech.com" target="_blank" title="Eres Biyoteknoloji web sayfası">ERES Biyoteknoloji</a>’de ortak.</p>
                    <ul className="social-icons" style={{backgroundColor:"#372c7a",borderRadius:"6px"}}>
                        <li>
                            <a href="https://emre.xyz" title="Emre Yılmaz kişisel web sayfası" target="_blank"><i className="fas fa-globe-asia"></i></a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/delirehberi/" title="Emre Yılmaz linkedin hesabı" target="_blank"><i className="fab fa-linkedin"></i></a>
                        </li>
                        <li>
                            <a href="https://twitter.com/delirehberi" target="_blank" title="Emre Yılmaz twitter hesabı"><i className="fab fa-twitter"></i></a>
                        </li>
                        <li>
                            <a href="https://github.com/delirehberi" target="_blank" title="Emre Yılmaz github adresi"><i className="fab fa-github"></i></a>
                        </li>
                    </ul>
                </div>


            </div>
        </div>
    </>;
}
function LinksSection({links}) {

    return     <div className="billing-section padding-bottom" style={{marginTop: "-83px"}}>
        <div className="container">
            {links.map(link=>{ return (
                <div className="row justify-content-center" key={"link"+link.label}>
                    <div className="col-12">
                        <div className="bill-item">
                            {link.screen_shot &&
                            <div className="bill-thumb">
                                <img src={"./assets/images/screen-shots/"+link.screen_shot} alt={link.label + " ekran görüntüsü"}/>
                            </div>
                            }
                            <div className="bill-content">
                                <h3 className="title">
                                    <ReactGA.OutboundLink
                                        eventLabel={link.label}
                                        to={link.link}
                                        target="_blank">
                                        {link.label}
                                    </ReactGA.OutboundLink>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>); }
            )}
        </div>
    </div>
}

function BannerSection({title}) {
    return (
        <section className="banner-1 bg_img" style={{backgroundImage: "url("+banner1+")"}}>
            <div className="container">
                <div className="banner-content cl-white">
                    <h1 className="title">{title}</h1>
                    <p></p>
                </div>
            </div>
        </section>
    );
} 

function App() {
    ViewEf(jQuery);
    let [page,setPage] = useState(<></>);
    useEffect(()=>{
        setPage(<QuestionsSection/>);
    },[]);
    useEffect(()=>{
            window.location = "#root";
    },[page])

    return (
        <div>
            <Header setPage={setPage} page={page}/>
            {page}
            <CookieConsent  style={{ background: "#372c7a" }} buttonText="Anladım" buttonStyle={{marginRight: "20px"}}>Bu web sayfası yalnızca <a href="https://policies.google.com/technologies/partner-sites" target="_blank">Google Analytics</a>'in ihtiyaç duyduğu çerezleri kullanılır.</CookieConsent>
        </div>
    );
}

export default App;
