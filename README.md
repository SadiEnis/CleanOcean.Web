# CleanOceans

CleanOceans proje tanıtım sitesi. Alan adı: **oceanclean.com.tr**.

## Teknolojiler

Next.js 16.4.2 (App Router), React 19.2.6, TypeScript 5.7.3 ve düz CSS. `output: 'export'` ile tamamen statik HTML üretilir. Sunucu veya veri tabanı gerektirmez. Node.js **24** kullanılır (`.nvmrc`).

## Yerel geliştirme

```sh
npm ci
npm run dev
```

Önizleme: http://127.0.0.1:3200 — İngilizce: http://127.0.0.1:3200/en/

```sh
npm run typecheck
npm run build
```

Statik çıktı `out/` dizinine yazılır. Türkçe ve İngilizce sayfalar ayrı HTML belgeleri ve doğru `lang` değerleriyle üretilir.

Windows PowerShell ortamında aynı komutları `npm.cmd ci`, `npm.cmd run dev` ve `npm.cmd run build` olarak çalıştırabilirsiniz. `package-lock.json` sürüm kontrolünde tutulur; CI kurulumu `npm ci` ile yapılır.

## İçerik ve medya

- Metinler ve iletişim: `src/app/content.ts`.
- Sayfa yerleşimi: `src/app/site.tsx`.
- Görsel tasarım: `src/app/globals.css`.
- Görseller: `public/media/` (kullanıcının sağladığı ekran görüntülerinden optimize edilmiş WebP dosyaları).
- Video eklemek için kaydı `public/media/gameplay.mp4` konumuna koyun ve `project.gameplayVideo` değerini `/media/gameplay.mp4` yapın. Galeri yerine kullanıcı tarafından başlatılan, kontrollü video gösterilir. Dosya yolunu ayarlamadan önce gerçek videoyu ekleyin. Sessiz izlenebilen kısa ekran yazıları tercih edin; anlatım varsa altyazı da ekleyin.
- Marka **CleanOceans** olarak korunur. SKH anlatımı **14 ve 17** üzerinedir. Eğitimsel etki bir hedef olarak ifade edilir.
- Orijinal raporlar yayın dosyalarına dahil değildir; rapordaki SKH düzeltmesi ve kamusal sürüm hazırlığı tamamlandıktan sonra eklenebilir.

## GitHub Pages (henüz yayınlanmadı)

`.github/workflows/deploy.yml`, pull request'lerde tip kontrolü ve statik derleme yapar. `main` dalına gönderimlerde veya elle başlatıldığında çıktıyı GitHub Pages'e yayınlar. Yayın adımı otomatik olarak GitHub'ın sağladığı token ile çalışır; repo içine erişim anahtarı eklenmez.

1. Hedef GitHub reposunu oluşturun ve **Settings → Pages → Build and deployment → Source** ayarını **GitHub Actions** seçin.
2. Yerel projeyi hedef repoya bağlayıp `main` dalını gönderin.
3. Pages özel alan adını **oceanclean.com.tr** olarak ayarlayın. `public/CNAME` aynı alan adını içerir.
4. Alan adı DNS kayıtlarını hedef GitHub Pages hesabına bağlayın; mevcut diğer servislerin kayıtlarını koruyun. Doğrulama sonrası HTTPS'i etkinleştirin.
5. Actions içindeki **Publish CleanOceans** iş akışını kontrol edin veya elle çalıştırın.

Bu yapı özel alan adının kökünde yayın için ayarlanmıştır; `/repo-name/` alt yolunda yayın için basePath ve asset yolları ayrıca uyarlanmalıdır.

## Cloudflare Web Analytics

Site GitHub Pages üzerinde kalır; DNS veya nameserver değişikliği gerekmez.

1. Cloudflare panelinde **Web Analytics → Add a site** üzerinden `oceanclean.com.tr` ekleyin.
2. **Manage site** altında verilen JavaScript kodundaki `data-cf-beacon` içindeki `token` değerini alın. Bu, tarayıcıya gönderilen site ölçüm kimliğidir; hesap API anahtarı değildir.
3. CleanOceans site kimliği entegrasyona eklenmiştir; mevcut kurulum için ek GitHub ayarı gerekmez. Başka bir kimlik kullanmak isterseniz **Settings → Secrets and variables → Actions → Variables → New repository variable** üzerinden `CLOUDFLARE_WEB_ANALYTICS_TOKEN` değişkenini oluşturun.
4. **Publish CleanOceans** iş akışını tekrar çalıştırın. Değişken statik derleme sırasında kullanılır; sonradan değiştirmek yeniden derleme gerektirir.
5. Site ziyaretleri sonrası Cloudflare Web Analytics panelindeki sonuçları kontrol edin. Veriler yalnızca entegrasyon yayına alındıktan sonra toplanır; geçmiş ziyaretler alınamaz.

Entegrasyon tüm TR/EN sayfalarda ortaktır, `npm run dev` sırasında kapalıdır. Yerel üretim derlemesinde ortam değişkenini açıkça boş bırakmak script'i kapatır; değişken tanımlanmamışsa projedeki site kimliği kullanılır. Actions boş değişken için mevcut site kimliğine döner. Cloudflare tarafında otomatik script eklemeyi ayrıca etkinleştirmeyin; bu projede elle ekleme kullanılır. Tarayıcı engelleyicileri veya JavaScript'in kapalı olması nedeniyle ölçümler tüm ziyaretleri kapsamayabilir.

## İlk gönderim adımları

GitHub reposu oluşturulduktan sonra, `REPOSITORY_URL` yerine gerçek repo adresini kullanın:

```sh
git add .
git commit -m "Create CleanOceans project website"
git remote add origin REPOSITORY_URL
git push -u origin main
```

`node_modules/`, `.next/`, `out/`, yerel ortam dosyaları ve geçici dosyalar Git'e dahil edilmez. GitHub Actions statik çıktıyı kaynaklardan yeniden üretir. Repo görünürlüğü, oyun görselleri ve diğer medya için otomatik bir kullanım lisansı sağlamaz; bu projeye bir açık kaynak lisansı eklenmemiştir.

## Sayfa yapısı

- `/`: proje, amaçlar, oynanış ve sürdürülebilirlik hedefleri.
- `/teknik/`: sistem mimarisi, teknoloji tercihleri ve yönetim paneli.
- `/iletisim/`: proje ekibi ve iletişim bağlantıları.
- İngilizce karşılıkları: `/en/`, `/en/technical/`, `/en/contact/`.
- Ortak menü aşağı kaydırırken gizlenir, yukarı kaydırırken görünür; mobilde üç çizgili düğmeyle açılır; dil değiştirme bulunduğunuz sayfanın karşılığına yönlendirir.
- Sayfa bileşenleri `src/app/detail-pages.tsx`, ortak menü ve alt bilgi `src/app/site.tsx` içindedir.
