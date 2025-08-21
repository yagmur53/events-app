import React from "react";
import icon1 from "../assets/1.png";
import icon2 from "../assets/2.png";
import icon3 from "../assets/3.png";
import icon4 from "../assets/4.png";
import icon5 from "../assets/all.png";
import icon6 from "../assets/5.png";
import { FaTimes } from "react-icons/fa"; // Silme butonu için eklendi
import "./events.css";

export default function Product({
  id,
  ad,
  ulusal,
  tur,
  kalkinmaAraci,
  tema,
  baslama,
  url,
  katilimci,
  katilimTur,
  kaliteKulturu,
  faaliyetKulturu,
  duzenleyenBirim,
  faaliyetYurutucusu,
  kariyerMerkezi,
  bagimlilik,
  dezavantajli,
  sektorIsbirligi,
  yarisma,
  visibleFields = [],
  allFieldMapping = {}, // Tüm alan eşleştirmelerini içerir
  customFields,
  onDelete, // Silme fonksiyonu için eklendi
  ...customProps // Custom fieldlar ve Excel alanları için
}) {
  const kalkinmaGorselleri = {
    "Yoksulluğa Son": "/yoksulluk.png",
    "Açlığa Son": "/aclik.png",
    "Sağlık ve Kaliteli Yaşam": "/saglik.png",
    "Nitelikli Eğitim": "/egitim.png",
    "Toplumsal Cinsiyet Eşitliği": "/cinsiyet.png",
    "Temiz Su ve Sanitasyon": "/su.png",
    "Erişilebilir ve Temiz Enerji": "/enerji.png",
    "İnsana Yakışır İş ve Ekonomik Büyüme": "/insan.png",
    "Sanayi, Yenilikçilik ve Altyapı": "/sanayi.png",
    "Eşitsizliklerin Azaltılması": "/esitsizlik.png",
    "Sürdürülebilir Şehirler ve Topluluklar": "/sehir.png",
    "Sorumlu Üretim ve Tüketim": "/uretim.png",
    "İklim Eylemi": "/iklim.png",
    "Sudaki Yaşam": "/sudakiyasam.png",
    "Karasal Yaşam": "/karasal.png",
    "Barış, Adalet ve Güçlü Kurumlar": "/baris.png",
    "Amaçlar İçin Ortaklıklar": "/amac.png",
  };

  // Alan icon mapping
  const fieldIcons = {
    tema: icon1,
    tur: icon2,
    duzenleyenBirim: icon3,
    faaliyetYurutucusu: icon4,
    ulusal: icon6,
    kalkinmaAraci: icon5,
    // Custom ve Excel alanları için varsayılan icon
    default: icon1,
  };

  const kalkinmaListesi = Array.isArray(kalkinmaAraci)
    ? kalkinmaAraci
    : kalkinmaAraci?.split(",") || [];

  // Tarihi okunabilir formata çevir
  const formattedDate = baslama
    ? new Date(baslama).toLocaleDateString("tr-TR")
    : "";

  // Tüm props'ları birleştir (hem sabit hem custom hem excel alanları)
  const allProps = {
    id,
    ad,
    ulusal,
    tur,
    kalkinmaAraci,
    tema,
    baslama,
    url,
    katilimci,
    katilimTur,
    kaliteKulturu,
    faaliyetKulturu,
    duzenleyenBirim,
    faaliyetYurutucusu,
    kariyerMerkezi,
    bagimlilik,
    dezavantajli,
    sektorIsbirligi,
    yarisma,
    ...customFields,
    ...customProps,
  };

  // Değeri render et
  const renderFieldValue = (field, value) => {
    if (!value) return null;

    // Özel durumlar
    if (field === "baslama") {
      return formattedDate;
    }

    if (field === "kalkinmaAraci" && kalkinmaListesi.length > 0) {
      return (
        <div className="kalkinma-listesi">
          {kalkinmaListesi.map((arac, index) => (
            <div key={index} className="kalkinma-item">
              <img
                src={kalkinmaGorselleri[arac]}
                alt={arac}
                className="kalkinma-image"
              />
              <span className="product-tema">{arac}</span>
            </div>
          ))}
        </div>
      );
    }

    // Array değerler için
    if (Array.isArray(value)) {
      return value.join(", ");
    }

    return value;
  };

  // Alanın label'ını al
  const getFieldLabel = (field) => {
    // allFieldMapping'den label'ı al
    if (allFieldMapping[field]) {
      return allFieldMapping[field];
    }

    // Fallback olarak field adını formatla
    return field
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <article className="product">
      <div className="product-content">
        <div id="cizgi">
          {/* Başlık */}
          {visibleFields.includes("ad") && (
            <h3>
              {ad}
              {baslama &&
                new Date(baslama) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                  <span className="badge-new">YENİ</span>
                )}
            </h3>
          )}

          {/* Görünür alanları render et */}
          {visibleFields.map((field) => {
            if (field === "ad") return null; // Başlık zaten yukarıda

            const value = allProps[field];
            if (!value) return null;

            const label = getFieldLabel(field);
            const icon = fieldIcons[field] || fieldIcons.default;

            // Kalkınma amaçları özel render
            if (field === "kalkinmaAraci" && kalkinmaListesi.length > 0) {
              return (
                <div key={field} className="product-tema">
                  <div className="siralama">
                    <img className="resim kalkinma" src={icon5} alt="" />
                    <span className="ana-baslik">{label}:</span>
                  </div>
                  {renderFieldValue(field, value)}
                </div>
              );
            }

            // Tarih özel render
            if (field === "baslama") {
              return (
                <div key={field} className="baslangic">
                  <p className="product-tema">
                    <span className="ana-baslik">{label}: </span>
                    {renderFieldValue(field, value)}
                  </p>
                </div>
              );
            }

            // Normal alanlar - başlık ve içerik şeklinde göster
            return (
              <div key={field} className="siralama">
                <img className="resim" src={icon} alt="" />
                <p className="product-tema">
                  <span className="ana-baslik">{label}: </span>
                  {renderFieldValue(field, value)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
