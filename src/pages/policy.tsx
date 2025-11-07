import { Button } from "primereact/button";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const logo = require("../assets/logo/logo.png");
export default function PolicyPage() {
  return (
    <>
      <Helmet>
        <title>ChÃ­nh sÃ¡ch ná»n táº£ng</title>
        <meta
          name="description"
          content="ChÃ­nh sÃ¡ch ná»n táº£ng cá»§a chÃºng tÃ´i giÃºp báº¡n hiá»ƒu rÃµ hÆ¡n vá» cÃ¡ch chÃºng tÃ´i thu tháº­p, sá»­ dá»¥ng dá»¯ liá»‡u vÃ  cÃ¡c cam káº¿t mÃ  báº¡n pháº£i cháº¥p nháº­n khi sá»­ dá»¥ng há»‡ thá»‘ng cá»§a chÃºng tÃ´i."
        />
      </Helmet>
      <div className="err-page-container flex align-items-center justify-content-center min-h-screen overflow-hidden">
        <div className="flex flex-column align-items-center justify-content-center">
          <img src={logo} alt="Artwokia logo" className="mb-5 w-6rem flex-shrink-0" />
          <div
            style={{
              borderRadius: "56px",
              padding: "0.3rem",
              background:
                "linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%)",
            }}
          >
            <div
              className="w-full surface-card py-8 px-5 sm:px-8 flex flex-column align-items-center"
              style={{ borderRadius: "53px" }}
            >
              <span className="text-blue-500 font-bold text-3xl">Chi tiáº¿t</span>
              <h1 className="text-900 font-bold text-5xl mb-2">ChÃ­nh sÃ¡ch ná»n táº£ng</h1>
              <p className="text-800 text-base">
                ChÃ o má»«ng báº¡n Ä‘áº¿n vá»›i Artlink! Vui lÃ²ng Ä‘á»c ká»¹ vÃ  hiá»ƒu rÃµ cÃ¡c Ä‘iá»u khoáº£n vÃ  Ä‘iá»u
                kiá»‡n sau khi sá»­ dá»¥ng dá»‹ch vá»¥ cá»§a chÃºng tÃ´i. Báº±ng cÃ¡ch truy cáº­p hoáº·c sá»­ dá»¥ng dá»‹ch vá»¥
                cá»§a chÃºng tÃ´i, báº¡n Ä‘á»“ng Ã½ tuÃ¢n theo cÃ¡c Ä‘iá»u khoáº£n vÃ  Ä‘iá»u kiá»‡n sau Ä‘Ã¢y:
              </p>
              <div className="detail-policy-container">
                <h4 className="text-900 font-bold text-xl mb-2">1. ChÃ­nh sÃ¡ch báº£o máº­t</h4>
                <p className="text-800 text-base">
                  ChÃ­nh sÃ¡ch báº£o máº­t cá»§a chÃºng tÃ´i giÃºp báº¡n hiá»ƒu rÃµ cÃ¡ch chÃºng tÃ´i thu tháº­p, sá»­ dá»¥ng
                  vÃ  báº£o vá»‡ thÃ´ng tin cÃ¡ nhÃ¢n cá»§a báº¡n khi báº¡n sá»­ dá»¥ng dá»‹ch vá»¥ cá»§a chÃºng tÃ´i.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">1. TÃ i Khoáº£n vÃ  ÄÄƒng KÃ½</h4>
                <p className="text-800 text-base">
                  1.1 ÄÄƒng kÃ½: Äá»ƒ sá»­ dá»¥ng má»™t sá»‘ tÃ­nh nÄƒng nháº¥t Ä‘á»‹nh cá»§a Artlink, báº¡n cáº§n táº¡o tÃ i
                  khoáº£n. Khi táº¡o tÃ i khoáº£n, báº¡n pháº£i cung cáº¥p thÃ´ng tin chÃ­nh xÃ¡c vÃ  Ä‘áº§y Ä‘á»§. Báº¡n
                  chá»‹u trÃ¡ch nhiá»‡m cho táº¥t cáº£ cÃ¡c hoáº¡t Ä‘á»™ng xáº£y ra trÃªn tÃ i khoáº£n cá»§a mÃ¬nh.
                </p>
                <p className="text-800 text-base">
                  1.2 Báº£o máº­t: Báº¡n pháº£i giá»¯ bÃ­ máº­t máº­t kháº©u cá»§a mÃ¬nh vÃ  khÃ´ng Ä‘Æ°á»£c tiáº¿t lá»™ cho báº¥t
                  ká»³ ai khÃ¡c. Báº¡n chá»‹u trÃ¡ch nhiá»‡m cho táº¥t cáº£ cÃ¡c hoáº¡t Ä‘á»™ng xáº£y ra trÃªn tÃ i khoáº£n
                  cá»§a mÃ¬nh.
                </p>
                <p className="text-800 text-base">
                  1.3 Há»§y tÃ i khoáº£n: Báº¡n cÃ³ thá»ƒ há»§y tÃ i khoáº£n cá»§a mÃ¬nh báº¥t cá»© lÃºc nÃ o. Artlink cÃ³
                  thá»ƒ há»§y tÃ i khoáº£n cá»§a báº¡n náº¿u báº¡n vi pháº¡m cÃ¡c Ä‘iá»u khoáº£n vÃ  Ä‘iá»u kiá»‡n nÃ y.
                </p>
                {/* ------- */}
                <h4 className="text-900 font-bold text-xl mb-2">2: Quyá»n sá»Ÿ há»¯u trÃ­ tuá»‡</h4>
                <p className="text-800 text-base">
                  2.1 Ná»™i dung cá»§a báº¡n: Báº¡n sá»Ÿ há»¯u táº¥t cáº£ quyá»n Ä‘á»‘i vá»›i ná»™i dung mÃ  báº¡n Ä‘Äƒng táº£i lÃªn
                  Artlink. Tuy nhiÃªn, báº¡n cáº¥p cho Artlink má»™t giáº¥y phÃ©p phi Ä‘á»™c quyá»n, toÃ n cáº§u,
                  miá»…n phÃ­ sá»­ dá»¥ng, tÃ¡i táº¡o, sá»­a Ä‘á»•i, phÃ¢n phá»‘i vÃ  hiá»ƒn thá»‹ ná»™i dung cá»§a báº¡n trÃªn
                  Artlink vÃ  cÃ¡c dá»‹ch vá»¥ khÃ¡c cá»§a Artlink.
                </p>
                <p className="text-800 text-base">
                  2.2 Ná»™i dung cá»§a Artlink: Artlink sá»Ÿ há»¯u táº¥t cáº£ quyá»n Ä‘á»‘i vá»›i ná»™i dung cá»§a
                  Artlink, bao gá»“m logo, hÃ¬nh áº£nh, vÄƒn báº£n vÃ  thiáº¿t káº¿. Báº¡n khÃ´ng Ä‘Æ°á»£c phÃ©p sá»­
                  dá»¥ng ná»™i dung cá»§a Artlink mÃ  khÃ´ng cÃ³ sá»± Ä‘á»“ng Ã½ báº±ng vÄƒn báº£n trÆ°á»›c cá»§a
                  Artlink.
                </p>
                <p className="text-800 text-base">
                  2.3. Artwork cÃ³ Ä‘Ã­nh kÃ¨m assets tráº£ phÃ­ pháº£i Ä‘Æ°á»£c duyá»‡t bá»Ÿi moderator trÆ°á»›c khi
                  hiá»ƒn thá»‹ cÃ´ng khai trÃªn trang chá»§.
                </p>
                <p className="text-800 text-base">
                  2.4. Artwork cÃ³ privacy lÃ  private chá»‰ hiá»ƒn thá»‹ vá»›i creator Ä‘Ã£ Ä‘Äƒng nÃ³.
                </p>
                <p className="text-800 text-base">
                  2.5. Khi artwork bá»‹ xÃ³a, cÃ¡c assets tráº£ phÃ­ Ä‘Ã­nh kÃ¨m sáº½ khÃ´ng hiá»ƒn thá»‹ cÃ´ng khai
                  ná»¯a.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">3. Giao Dá»‹ch vÃ  VÃ­ NgÆ°á»i DÃ¹ng</h4>
                <p className="text-800 text-base">
                  3.1. GiÃ¡ cáº£: Artlink cÃ³ thá»ƒ tÃ­nh phÃ­ cho má»™t sá»‘ dá»‹ch vá»¥ nháº¥t Ä‘á»‹nh. GiÃ¡ cáº£ cho
                  cÃ¡c dá»‹ch vá»¥ nÃ y Ä‘Æ°á»£c hiá»ƒn thá»‹ trÃªn Artlink.
                </p>
                <p className="text-800 text-base">
                  3.2. Thanh toÃ¡n: Báº¡n cÃ³ thá»ƒ thanh toÃ¡n cho cÃ¡c dá»‹ch vá»¥ cá»§a Artlink báº±ng tháº» tÃ­n
                  dá»¥ng, tháº» ghi ná»£ hoáº·c ZaloPay.
                </p>
                <p className="text-800 text-base">
                  3.3. Äá»ƒ má»Ÿ khÃ³a 1 asset, ngÆ°á»i dÃ¹ng pháº£i chÆ°a tá»«ng má»Ÿ khÃ³a asset nÃ y trÆ°á»›c Ä‘Ã³.
                </p>
                <p className="text-800 text-base">
                  3.4. NgÆ°á»i dÃ¹ng pháº£i cÃ³ Ã­t nháº¥t 1 public artwork Ä‘Ã£ Ä‘Æ°á»£c duyá»‡t Ä‘á»ƒ táº¡o service.
                </p>
                <p className="text-800 text-base">
                  3.5. NgÆ°á»i dÃ¹ng chá»‰ Ä‘Æ°á»£c update vÃ  delete service cá»§a chÃ­nh mÃ¬nh.
                </p>
                <p className="text-800 text-base">
                  3.6. Khi delete service, cÃ¡c requests vÃ  proposals liÃªn quan sáº½ khÃ´ng bá»‹ máº¥t Ä‘i.
                </p>
                <p className="text-800 text-base">
                  3.7. Request pháº£i Ä‘Æ°á»£c táº¡o dá»±a trÃªn 1 service Ä‘Ã£ cÃ³ cá»§a creator khÃ¡c.
                </p>
                <p className="text-800 text-base">
                  3.8. Chá»‰ cÃ³ creator Ä‘Ã£ táº¡o service má»›i Ä‘Æ°á»£c quyá»n update status cá»§a request liÃªn
                  quan Ä‘áº¿n service Ä‘Ã³.
                </p>
                <p className="text-800 text-base">
                  3.9. Chá»‰ cÃ³ creator Ä‘Ã£ táº¡o service má»›i Ä‘Æ°á»£c quyá»n táº¡o proposal cho service Ä‘Ã³.
                </p>
                <p className="text-800 text-base">
                  3.10. Trong thá»a thuáº­n pháº£i quy Ä‘á»‹nh rÃµ thá»i háº¡n giao ná»™p sáº£n pháº©m cuá»‘i cÃ¹ng vÃ 
                  cÃ¡c rÃ ng buá»™c vá» thanh toÃ¡n.
                </p>
                <p className="text-800 text-base">
                  3.11. NgÆ°á»i dÃ¹ng chá»‰ Ä‘Æ°á»£c update vÃ  delete proposal cá»§a chÃ­nh mÃ¬nh.
                </p>
                <p className="text-800 text-base">
                  3.12. Creator chá»‰ Ä‘Æ°á»£c update hoáº·c delete proposal khi proposal Ä‘Ã³ chÆ°a Ä‘Æ°á»£c cháº¥p
                  nháº­n bá»Ÿi audience.
                </p>
                <p className="text-800 text-base">
                  3.13. Chá»‰ ngÆ°á»i Ä‘Ã£ Ä‘áº·t yÃªu cáº§u vá» proposal má»›i Ä‘Æ°á»£c cháº¥p nháº­n hoáº·c tá»« chá»‘i
                  proposal Ä‘Ã³.
                </p>
                <p className="text-800 text-base">
                  3.14. NgÆ°á»i dÃ¹ng thá»±c hiá»‡n Ä‘áº·t cá»c cho proposal chá»‰ khi há» Ä‘Ã£ accept proposal Ä‘Ã³.
                </p>
                <p className="text-800 text-base">
                  3.15. NgÆ°á»i dÃ¹ng chá»‰ cÃ³ thá»ƒ hoÃ n táº¥t thanh toÃ¡n cho 1 proposal khi nÃ³ Ä‘Ã£ Ä‘Æ°á»£c cáº­p
                  nháº­t final assets vÃ  cÃ³ tráº¡ng thÃ¡i lÃ  "Completed".
                </p>
                <p className="text-800 text-base">
                  3.16. Sá»‘ xu Ä‘Ã£ thanh toÃ¡n cho assets hoáº·c proposal sáº½ khÃ´ng Ä‘Æ°á»£c hoÃ n láº¡i trá»« khi
                  cÃ³ váº¥n Ä‘á» xáº£y ra vÃ  ngÆ°á»i dÃ¹ng gá»­i khiáº¿u náº¡i lÃªn há»‡ thá»‘ng.
                </p>
                <p className="text-800 text-base">
                  3.17. NgÆ°á»i dÃ¹ng pháº£i nháº­p sá»‘ Ä‘iá»‡n thoáº¡i há»£p lá»‡ Ä‘Ã£ liÃªn káº¿t vá»›i Zalopay Ä‘á»ƒ
                  activate wallet.
                </p>
                <p className="text-800 text-base">
                  3.18. NgÆ°á»i dÃ¹ng pháº£i liÃªn káº¿t tÃ i khoáº£n vá»›i vÃ­ Ä‘iá»‡n tá»­ há»£p lá»‡ Ä‘á»ƒ thá»±c hiá»‡n cÃ¡c
                  thao tÃ¡c rÃºt náº¡p tiá»n trÃªn há»‡ thá»‘ng.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">4. Xu vÃ  giao dá»‹ch liÃªn quan</h4>
                <p className="text-800 text-base">
                  4.1. Há»‡ thá»‘ng Artlink sá»­ dá»¥ng in-app currency lÃ  "Coins" vá»›i tá»‰ lá»‡ quy Ä‘á»•i lÃ  1
                  - 1.
                </p>
                <p className="text-800 text-base">
                  4.2. Má»‡nh giÃ¡ náº¡p tiá»n tá»‘i thiá»ƒu cho 1 láº§n náº¡p lÃ  40.000 VND.
                </p>
                <p className="text-800 text-base">
                  4.3. Má»‡nh giÃ¡ rÃºt tiá»n tá»‘i thiá»ƒu cho 1 láº§n rÃºt lÃ  50.000 VND.
                </p>
                <p className="text-800 text-base">
                  4.4. Má»‡nh giÃ¡ rÃºt, náº¡p tiá»n tá»‘i Ä‘a lÃ  10.000.000 VND.
                </p>
                <p className="text-800 text-base">
                  4.5. Ná»n táº£ng Artlink thu phÃ­ 5% trÃªn má»—i giao dá»‹ch xu trong há»‡ thá»‘ng.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">
                  5. Quáº£n LÃ½ BÃ¬nh Luáº­n vÃ  Collection
                </h4>
                <p className="text-800 text-base">
                  5.1. NgÆ°á»i dÃ¹ng chá»‰ Ä‘Æ°á»£c xÃ³a comment cá»§a chÃ­nh mÃ¬nh.
                </p>
                <p className="text-800 text-base">
                  5.2. Khi comment bá»‹ xÃ³a, cÃ¡c comments pháº£n há»“i cá»§a nÃ³ sáº½ bá»‹ áº©n Ä‘i nhÆ°ng khÃ´ng bá»‹
                  xÃ³a.
                </p>
                <p className="text-800 text-base">
                  5.3. NgÆ°á»i dÃ¹ng chá»‰ Ä‘Æ°á»£c xÃ³a collection cá»§a chÃ­nh mÃ­nh.
                </p>
                <p className="text-800 text-base">5.4. NgÆ°á»i dÃ¹ng khÃ´ng thá»ƒ follow chÃ­nh mÃ¬nh.</p>
                <p className="text-800 text-base">5.5. NgÆ°á»i dÃ¹ng khÃ´ng thá»ƒ block chÃ­nh mÃ¬nh.</p>
                <h4 className="text-900 font-bold text-xl mb-2">6. Quy táº¯c á»©ng xá»­</h4>
                <p className="text-800 text-base">
                  6.1 HÃ nh vi há»£p phÃ¡p: Báº¡n pháº£i tuÃ¢n theo táº¥t cáº£ cÃ¡c luáº­t phÃ¡p vÃ  quy Ä‘á»‹nh hiá»‡n
                  hÃ nh khi sá»­ dá»¥ng Artlink.
                </p>
                <p className="text-800 text-base">
                  6.2 TÃ´n trá»ng: Báº¡n pháº£i tÃ´n trá»ng táº¥t cáº£ ngÆ°á»i dÃ¹ng khÃ¡c cá»§a Artlink. Báº¡n khÃ´ng
                  Ä‘Æ°á»£c Ä‘Äƒng táº£i hoáº·c chia sáº» ná»™i dung cÃ³ tÃ­nh cháº¥t xÃºc pháº¡m, Ä‘e dá»a, lÄƒng máº¡ hoáº·c
                  quáº¥y rá»‘i.
                </p>
                <p className="text-800 text-base">
                  6.3 Ná»™i dung khÃ´ng phÃ¹ há»£p: Báº¡n khÃ´ng Ä‘Æ°á»£c Ä‘Äƒng táº£i hoáº·c chia sáº» ná»™i dung cÃ³ tÃ­nh
                  cháº¥t khiÃªu dÃ¢m, báº¡o lá»±c hoáº·c báº¥t há»£p phÃ¡p.
                </p>
                <p className="text-800 text-base">
                  6.4 Spam: Báº¡n khÃ´ng Ä‘Æ°á»£c gá»­i spam hoáº·c tin nháº¯n rÃ¡c cho ngÆ°á»i dÃ¹ng khÃ¡c cá»§a
                  Artlink.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">7. Quyá»n riÃªng tÆ°</h4>
                <p className="text-800 text-base">
                  7.1 Thu tháº­p thÃ´ng tin: Artlink thu tháº­p thÃ´ng tin tá»« báº¡n khi báº¡n Ä‘Äƒng kÃ½ tÃ i
                  khoáº£n, sá»­ dá»¥ng dá»‹ch vá»¥ cá»§a Artlink hoáº·c liÃªn há»‡ vá»›i Artlink.
                </p>
                <p className="text-800 text-base">
                  7.2 Sá»­ dá»¥ng thÃ´ng tin: Artlink sá»­ dá»¥ng thÃ´ng tin cá»§a báº¡n Ä‘á»ƒ cung cáº¥p dá»‹ch vá»¥ cho
                  báº¡n, cáº£i thiá»‡n Artlink vÃ  liÃªn há»‡ vá»›i báº¡n vá» cÃ¡c dá»‹ch vá»¥ vÃ  sáº£n pháº©m khÃ¡c cá»§a
                  Artlink.
                </p>
                <p className="text-800 text-base">
                  7.3 Chia sáº» thÃ´ng tin: Artlink cÃ³ thá»ƒ chia sáº» thÃ´ng tin cá»§a báº¡n vá»›i cÃ¡c bÃªn thá»©
                  ba cung cáº¥p dá»‹ch vá»¥ cho Artlink. Artlink cÅ©ng cÃ³ thá»ƒ chia sáº» thÃ´ng tin cá»§a báº¡n
                  náº¿u Ä‘Æ°á»£c yÃªu cáº§u bá»Ÿi phÃ¡p luáº­t.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">8. Thay Ä‘á»•i</h4>
                <p className="text-800 text-base">
                  Artlink cÃ³ thá»ƒ thay Ä‘á»•i cÃ¡c Ä‘iá»u khoáº£n vÃ  Ä‘iá»u kiá»‡n nÃ y báº¥t cá»© lÃºc nÃ o.
                  Artlink sáº½ thÃ´ng bÃ¡o cho báº¡n vá» báº¥t ká»³ thay Ä‘á»•i nÃ o báº±ng cÃ¡ch Ä‘Äƒng táº£i cÃ¡c Ä‘iá»u
                  khoáº£n vÃ  Ä‘iá»u kiá»‡n sá»­a Ä‘á»•i trÃªn Artlink.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">9. ToÃ n bá»™ thá»a thuáº­n</h4>
                <p className="text-800 text-base">
                  CÃ¡c Ä‘iá»u khoáº£n vÃ  Ä‘iá»u kiá»‡n nÃ y cáº¥u thÃ nh toÃ n bá»™ thá»a thuáº­n giá»¯a báº¡n vÃ  Artlink
                  vá» viá»‡c sá»­ dá»¥ng Artlink.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">10. Luáº­t phÃ¡p chi phá»‘i</h4>
                <p className="text-800 text-base">
                  CÃ¡c Ä‘iá»u khoáº£n vÃ  Ä‘iá»u kiá»‡n nÃ y Ä‘Æ°á»£c chi phá»‘i vÃ  giáº£i thÃ­ch theo luáº­t phÃ¡p Viá»‡t
                  Nam.
                </p>
                <h4 className="text-900 font-bold text-xl mb-2">11. Giáº£i quyáº¿t tranh cháº¥p</h4>
                <p className="text-800 text-base">
                  Äá»‘i á»›i báº¥t ká»³ tranh cháº¥p nÃ o phÃ¡t sinh tá»« hoáº·c liÃªn quan Ä‘áº¿n cÃ¡c Ä‘iá»u khoáº£n vÃ 
                  Ä‘iá»u kiá»‡n nÃ y, quyáº¿t Ä‘á»‹nh cuá»‘i cÃ¹ng thuá»™c vá» Artlink trá»ng tÃ i theo luáº­t phÃ¡p
                  Viá»‡t Nam.
                </p>
              </div>

              <Link
                to="/"
                className="w-full flex align-items-center py-5 border-300 border-bottom-1"
              >
                <span
                  className="flex justify-content-center align-items-center bg-cyan-400 border-round"
                  style={{ height: "3.5rem", width: "3.5rem" }}
                >
                  <i className="text-50 pi pi-fw pi-table text-2xl"></i>
                </span>
                <span className="ml-4 flex flex-column">
                  <span className="text-900 lg:text-xl font-medium mb-1">CÃ¢u há»i thÆ°á»ng gáº·p</span>
                  <span className="text-600 lg:text-lg">
                    CÃ³ láº½ báº¡n sáº½ cáº§n biáº¿t nhá»¯ng Ä‘iá»u quen thuá»™c.
                  </span>
                </span>
              </Link>
              <Link
                to="/"
                className="w-full flex align-items-center py-5 border-300 border-bottom-1"
              >
                <span
                  className="flex justify-content-center align-items-center bg-orange-400 border-round"
                  style={{ height: "3.5rem", width: "3.5rem" }}
                >
                  <i className="pi pi-fw pi-question-circle text-50 text-2xl"></i>
                </span>
                <span className="ml-4 flex flex-column">
                  <span className="text-900 lg:text-xl font-medium mb-1">LiÃªn há»‡ trá»£ giÃºp</span>
                  <span className="text-600 lg:text-lg">
                    Artlink luÃ´n cÃ³ bá»™ pháº­n trá»£ giÃºp sáºµn sÃ ng há»— trá»£ báº¡n.
                  </span>
                </span>
              </Link>
              <Link
                to="/"
                className="w-full flex align-items-center justify-content-center mb-5 py-5 border-300 border-bottom-1"
              >
                <Button>Trang chá»§</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
