# Çare Aşı!

Kolera, Kızamık, Çiçek - hepsini AŞIYLA yendik! Yendikçe zafere alıştık, aşıların gücünü unuttuk...

COVID-19'u yenmek için bu gücü yeniden hatırlama ve yanlış bilgilerle mücadele etme zamanı! 
Bunu beraber başarmak için careasi.org'u takip edin, beğenin, paylaşın, ve bize katılın!


## Katkı

Basit react uygulaması olarak ve src/App.js üzerinde tek dosya olarak hazırlanmıştır. 

Site tasarımı bir themeforest.net ürünüdür. Şablonun tamamı jsx'e çevrilmek yerine yalnızca gereken kısımları js/App.js içerisinde dönüştürülüp geri kalan kısımlar public/index.html üzerinde bırakılmıştır. Çok elzem değil ancak tüm şablonu react componentlerine dönüştürmek isteyen olursa kabulümüzdür.

Tüm componentler src/App.js içerisinde bulunmaktadır.

İçerikler json dosyaları içerisinde src/data klasöründe bulunmaktadır. Veri yapısı basitçe aşağıdaki gibidir;

Aşı olmak istiyor musunuz?
  
  - Evet hiç tereddütüm yok.
    - `A` kategorisindeki linkler listelenir. 
  - Evet ancak bazı sorularım var.
    - `suspected-questions.json` içerisindeki veriler listelenir.
  - Hayır ancak bazı sorularım var.
    - `suspected-question.json` ve `negative-suspected-questions.json` dosyaları birleştirilip listelenir.


Tüm bağlantılar, kategorize edilmiş olarak `src/data/links.json` dosyası içerisinde yer almaktadır. JSON formatındaki verinin ilk boyutun anahtarları `a`,`b`,`c`,`d`,`e`,`g` olmak üzere linklerin kategorilerini belirler. Buradaki kategoriler sorularla bağlanıyor. `Evet hiç tereddütüm yok` sorusunun `a` kategorisiyle bağlandığı gibi.

links.json dosyasında yer alan alanların tanımları şöyledir;

  - `type` sadece tanımlama için mevcuttur `video`,`official`,`news`,`popular-science-news`,`documentary` vb olarak ayarlanabilir. 
  - `label` bağlantının tıklanabilir alanında görünecek olan metni ifade eder. Bağlantıdaki makalenin veya videonun başlığı olabilir.
  - `link` bağlantı adresini içerir.
  - `screen_shot` bağlantının önizleme resmini içerebilir. Zorunlu değildir. 250x250 boyutunda bir önizleme resmi `assets/images/screen-shots/` klasörüne yerleştirilip, sadece dosya adı (uzantıyla birlikte) bu alanda belirtilerek bu özellik açılabilir. 

`suspected-questions.json` ve `negative-suspected-questions.json` dosyalarında yer alan alanların tanımları şöyledir;

  - `choice` soru başlığı, h4 içerisinde görüntülenir.
  - `label` soru alt başlığı, p içerisinde görüntülenir. Zorunlu değildir.
  - `categories` soruya ait link kategorileri. Birden fazla kategori alabilir. links.json içerisine yeni kategori eklenerek de kullanılabilir.
  - `icon` soruya simge eklemek için kullanılabilir. `assets/images/` klasörüne simge dosyası eklenip buraya dosya adı (uzantısıyla) verilerek kullanılabilir. Zorunlu değildir.


### Nasıl fayda sağlarım?

  - Eğer bilim insanı iseniz ve konu hakkında kaynaklara sahipseniz bunları issues kısmından veya bilgi@careasi.org adresinden bize iletebilirsiniz.
  - Eğer yazılımcıysanız kaynak kodu forklarayak
    - issues kısmında yer alan maddelerden birini seçebilir
    - kendi bulduğunuz sorunları issue açarak bildirebilir
    - test yazabilir
    - kodda iyileştirmeler yapabilirsiniz. 
  - Diğer herkes bu dökümanda olabilir, site genelinde olabilir her türlü hata bildirimi için issues kısmını kullanabilir. 

Katkı sürecinde github yolunu kullanıyoruz. Forklayın, yeni branch açın, kodlayın, pr gönderin, review edelim, merge edelim, yayına alalım. 

  lütfen issues kısmından konuşmadan herhangi bir problem çözümü ve geliştirme yapmaya başlamayın. Eş zamanlı olarak başka birisi de aynı şey ile ilgileniyor ise birinizin emeği boşa gitmiş olacak. 


Teknik veya değil her sorun için issues kısmı kullanılabilir. Alternatif olarak bilgi@careasi.org adresine eposta atarak ekibe ulaşabilirsiniz.




## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!




### Deployment

We are always using best deployment approach of course; `rsync -rv build/* user@server:/var/www/` 

