import './App.css';
import banner1 from './images/banner/banner-1.jpg';
import jQuery from 'jquery';
import {useState} from 'react';

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
            link: "https://covid19asi.saglik.gov.tr/TR-77707/asi-uygulanacak-grup-siralamasi.html",
            label: "Asi oncelik grup siralamasi"
        }
    ],
    "b":[
        {
            type: "science-article",
            link: "https://dergipark.org.tr/en/download/article-file/833900",
            label: "AŞI KARŞITLIĞI: AŞI KARARSIZLIĞI VE AŞI REDDİ"
        },
        {
            type: "news",
            link: "https://www.sozcu.com.tr/2020/saglik/asi-gonullusu-profesor-asiyla-ilgili-sosyal-medyada-yazilanlara-inanamiyorum-6181051/",
            label: "Aşı gönüllüsü Profesör Ünal: Sosyal medyada yazılanlara inanamıyorum"
        },
        {
            type: "science-article",
            link: "https://www.journalagent.com/cocuk/pdfs/CD_16_1_16_24.pdf",
            label: "Aşı Kabulünü Etkileyen Faktörler"
        }
    ],
    "c":[],
    "d":[],
    "e":[]
};
const suspectedQuestions = [
    {
        choice: "Kişisel Haklar",
        label: "",
        icon: "suspect.svg",
        child: [
            {
                label: "Aşı karşıtlığı neden zararlı?",
                category: "b"
            },
            {
                label: "Aşının yararları",
                category: "b"
            }
        ]
    },
    {
        choice: "Yan etkiler",
        label: "Otoimmün, alüminyum, domuz jelatini, formaldehitin, kısırlık vb.",
        icon:"suspect.svg",
        child: [
            {
                label: "Aşının kimyasal içerikleri nedir?",
                category: "c",
                icon: "suspect.svg"
            },
            {
                label: "Aşı ve Otizm ilişkisi",
                icon: "suspect.svg",
                category: "c"
            }
        ]
    }
];

const questionWorkFlow=[
    {
        choice: "Evet",
        label: "Ancak bazı sorularım var",
        icon: "suspect.svg",
        child: [
            {
                label: "Aşı ne zaman gelecek?",
                icon: "suspect.svg",
                category: "a"
            },
            {  
                label: "Önce kimler aşılanacak?",
                icon: "suspect.svg",
                category: "a"
            }
        ]
    },
    {
        choice: "Evet",
        label: "Hiç tereddütüm yok.",
        icon: "yes-icon.svg",
        child: suspectedQuestions
    },
    {
        choice: "Hayır",
        label: "Ancak bazı sorularım var.",
        icon: "denial.svg",
        child: suspectedQuestions
    }
];
const questionHandler = (setQuestions,setTitle)=>{
    return (question)=>{
        return ()=>{
            if(typeof question.child !== "undefined") {
                setTitle(question.label);
                setQuestions(Object.values(question.child));
            }
        }
    }
}
const linksHandler = (setQuestions,setLinks,setTitle)=>{
    return (question)=>{
        return ()=> {
            setTitle(question.label);
            setQuestions([]); 
            setLinks(links[question.category]);
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
                            <div className="col-sm-10 col-md-6 col-lg-4" onClick={typeof question.category == "undefined" ? questionHandler(setQuestions,setTitle)(question) : linksHandler(setQuestions,setLinks,setTitle)(question)}>
                            <div className="how-search-item">
                                <div className="thumb">
                                    <img src={"./assets/images/"+question.icon} alt={question.label}/>
                                </div>
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
            <div className="row justify-content-center">
                <div className="col-12">
                    <div className="bill-item">
                        <div className="bill-thumb">
                            <img src={"./assets/images/screen-shots/"+link.screen_shot} alt={link.label + " ekran görüntüsü"}/>
                        </div>
                        <div className="bill-content">
                            <h3 className="title">
                            <a rel="noreferrer" href={link.link} target="_blank">{link.label}</a>
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
            <BannerSection/>
            <QuestionsSection/>
        </div>
    );
}

export default App;
