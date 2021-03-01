import './App.css';
import banner1 from './images/banner/banner-1.jpg';
import jQuery from 'jquery';
import {useState} from 'react';
import ReactGA from 'react-ga';
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
const links = {
    "a":[
        {
            type: "official",
            label: "Aşı grubu öncelik sıralaması",
            link: "https://covid19asi.saglik.gov.tr/TR-77707/asi-uygulanacak-grup-siralamasi.html"
        }
    ],
    "b":[
        {
            type: "science-article",
            label: "AŞI KARŞITLIĞI: AŞI KARARSIZLIĞI VE AŞI REDDİ",
            link: "https://dergipark.org.tr/en/download/article-file/833900"
        },
        {
            type: "news",
            label: "Aşı gönüllüsü Profesör Ünal: Sosyal medyada yazılanlara inanamıyorum",
            link: "https://www.sozcu.com.tr/2020/saglik/asi-gonullusu-profesor-asiyla-ilgili-sosyal-medyada-yazilanlara-inanamiyorum-6181051/"
        },
        {
            type: "science-article",
            label: "Aşı Kabulünü Etkileyen Faktörler",
            link: "https://www.journalagent.com/cocuk/pdfs/CD_16_1_16_24.pdf"
        },
        {
            type: "official",
            label: "Aşı hakkında yanlış bilinen gerçekler.",
            link: "https://asi.saglik.gov.tr/asi-gercekleri"
        },
        {
            type: "popular-science-news",
            link: "https://sarkac.org/2018/10/neden-asi-olmaliyiz/",
            label: "Neden aşı olmalıyız?",
        },
        {
            type: "video",
            link: "https://www.youtube.com/watch?v=hrmj49jv3Hw&ab_channel=GaziTv",
            label: "Aşı Karşıtlığı Videosu",
        },
        {
            type: "video",
            link: "https://www.youtube.com/watch?v=Q9EBxxhn3IU&ab_channel=GZT",
            label: "Tarihte ilk aşı karşıtlığı nasıl başladı?"
        },
        {
            type: "documentary",
            link: "https://www.youtube.com/watch?v=Al5OE6mN7z4&ab_channel=BBCNewsT%C3%BCrk%C3%A7e",
            label: "Aşı Belgeseli 1. Bölüm"
        },
        {
            type: "documentary",
            link: "https://www.youtube.com/watch?v=vNVcpCvF9-4&ab_channel=BBCNewsT%C3%BCrk%C3%A7e",
            label: "Aşı Belgeseli 2. Bölüm"
        },
        {
            type: "documentary",
            link: "https://www.youtube.com/watch?v=EQCGMyss4w8&t=0s&ab_channel=BBCNewsT%C3%BCrk%C3%A7e",
            label: "Aşı Belgeseli 3. Bölüm"
        }
    ],
    "c":[
        {
            type: "official",
            link: "https://asi.saglik.gov.tr/asi-gercekleri",
            label: "Aşı hakkında yanlış bilinen gerçekler.",
        },
        {
            type: "documentary",
            link: "https://www.youtube.com/watch?v=Al5OE6mN7z4&ab_channel=BBCNewsT%C3%BCrk%C3%A7e",
            label: "Aşı Belgeseli 1. Bölüm"
        },
        {
            type: "documentary",
            link: "https://www.youtube.com/watch?v=vNVcpCvF9-4&ab_channel=BBCNewsT%C3%BCrk%C3%A7e",
            label: "Aşı Belgeseli 2. Bölüm"
        },
        {
            type: "documentary",
            link: "https://www.youtube.com/watch?v=EQCGMyss4w8&t=0s&ab_channel=BBCNewsT%C3%BCrk%C3%A7e",
            label: "Aşı Belgeseli 3. Bölüm"
        },
        {
            type: "official",
            link: "https://covid19asi.saglik.gov.tr/TR-77715/covid-19-asisi-sonrasi-yan-etkiler.html",
            label: "Covid-19 aşısı sonrası yan etkiler"
        },
        {
            type: "news",
            link: "https://www.bbc.com/turkce/haberler-dunya-55254195",
            label: "Covid için geliştirilen aşılar ne kadar güvenli?",
        }
    ],
    "d":[
        {
            type: "news",
            link: "https://www.bbc.com/turkce/haberler-dunya-55254195",
            label: "Covid için geliştirilen aşılar ne kadar güvenli?"
        }
    ],
    "e":[
        {
            type: "official",
            link: "https://asi.saglik.gov.tr/asi-gercekleri",
            label: "Aşı hakkında yanlış bilinen gerçekler."
        },
                {
            type: "documentary",
            link: "https://www.youtube.com/watch?v=EQCGMyss4w8&t=0s&ab_channel=BBCNewsT%C3%BCrk%C3%A7e",
            label: "Aşı Belgeseli 3. Bölüm"
        },
        {
            type: "video",
            link: "https://www.youtube.com/watch?v=EJJ1QicWQhk&ab_channel=NP%C4%B0STANBULBeyinHastanesi",
            label: "Covid-19 aşısı hakkında bilgiler"
        }
    ]
};
const suspectedQuestions = [
    {
        choice: "Aşıların otizm yaptığını düşünüyorum.",
        label: "",
        categories: ["c"]
    },
    {
        choice: "Aşı içinde çip olduğunu düşünüyorum.",
        label: "",
        categories: ["d"]
    },
    {
        choice: "Aşının yeterli Faz 3 çalışması yok.",
        label: "",
        categories: ["e"]
    },
    {
        choice: "İtalyan doktor bu aşının faydasız olduğunu söyledi.",
        categories: ["e"]
    },
    {
        choice: "Aşı otoimmun hastalıklara sebep olduğunu düşünüyorum.",
        categories: ["c"]
    },
    {
        choice: "Aşıda civa kullanıldığını düşünüyorum.",
        categories: ["c"]
    },
    {
        choice: "Aşıların içinde alüminyum bileşikleri olduğunu düşünüyorum.",
        categories: ["c"]
    },
    {
        choice: "Aşılarda domuz jelatini olduğunu düşünüyorum.",
        categories: ["c"]
    },
    {
        choice: "Aşıda formaldehitin olduğunu düşünüyorum.",
        categories: ["c"]
    },
    {
        choice: "Aşıların kısırlık yaptığını düşünüyorum.",
        categories: ["c"]
    },
    {
        choice: "Aşıların ilaç firmalarının yalanı olduğunu düşünüyorum.",
        categories: ["c"]
    }
];
const negativeSuspectedQuestions=[
    {
        choice: "Aşının küresel güç odaklarının aldatmacası olduğunu düşünüyorum",
        categories: ["d"]
    },
    {
        choice: "Covid diye bir hastalık olduğunu düşünmüyorum, aşısı da yok bence.",
        categories: ["d"]
    },
    {
        choice: "Aşı yaptırmamanın kişisel bir hak olduğunu düşünüyorum.",
        categories: ["b"]
    }
];

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
        }
    }
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
        <section className="banner-1 bg_img" style={{backgroundImage: "url('/assets/images/banner/banner-1.jpg')"}}>
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
    return (
        <div>
            <QuestionsSection/>
        </div>
    );
}

export default App;
