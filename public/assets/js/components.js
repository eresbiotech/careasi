'use strict';

function QuestionsSection() {
    return (
        <div className="how-search-section padding-bottom mt--83">
            <div className="container">
                <div className="how-search-wrapper">
                    <div className="row mb-30-none justify-content-center">
                        <div className="col-sm-10 col-md-6 col-lg-4">
                            <div className="how-search-item">
                                <div className="thumb">
                                    <img src="./assets/images/suspect.svg" alt="how"/>
                                </div>
                                <div className="content">
                                    <h4 className="title"><a href="#0">Evet</a></h4>
                                    <p>Ancak bazı sorularım var.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-10 col-md-6 col-lg-4">
                            <div className="how-search-item">
                                <div className="thumb">

                                    <img src="./assets/images/yes-icon.svg" alt="how"/>
                                </div>
                                <div className="content">
                                    <h4 className="title"><a href="#0">Evet</a></h4>
                                    <p>Hiç bir tereddütüm yok.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-10 col-md-6 col-lg-4">
                            <div className="how-search-item">
                                <div className="thumb">
                                    <img src="./assets/images/denial.svg" alt="how"/>
                                </div>
                                <div className="content">
                                    <h4 className="title"><a href="#0">Hayır</a></h4>
                                    <p>Ancak bazı sorularım var.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function BannerSection() {
    return (
        <section className="banner-1 bg_img" style={{backgroundImage: "url('/assets/images/banner/banner-1.jpg')"}}>
            <div className="container">
                <div className="banner-content cl-white">
                    <h1 className="title">Aşı olmak istiyor musunuz?</h1>
                    <p></p>
                </div>
            </div>
        </section>
    );
} 

function AppSection() {
    return (<div>
            <BannerSection/>
            <QuestionsSection/>
        <div/>);
}

const domContainer = document.querySelector('#domContainer');

ReactDOM.render(<AppSection/>,domContainer);

