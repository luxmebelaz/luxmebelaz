import { unsplash } from '@/lib/images';
import type { Post } from './types';

export const posts: Post[] = [
  {
    slug: 'qonaq-otagi-ucun-divan-secimi',
    category: 'Mebel Bələdçisi',
    date: '2026-07-31',
    dateLabel: '31 İyul 2026',
    title: 'Qonaq Otağı Üçün Divan Seçimi: İdeal Formanı Necə Tapmalı?',
    excerpt: 'Ölçü, parça növü və rəng uyğunluğu — evinizin ab-havasını dəyişdirəcək üç vacib addım.',
    image: unsplash('1493663284031-b7e3aefcae8e'),
    imageAlt: 'Qonaq otağında boz divan',
    readMinutes: 4,
    sections: [
      {
        heading: 'Əvvəlcə otağı ölçün',
        paragraphs: [
          'Divan seçməzdən əvvəl otağın ölçülərini və divanın yerləşəcəyi divarın uzunluğunu dəqiq ölçün. Divan ilə qarşısındakı stolun arasında ən azı bir addım boşluq qalmalıdır ki, hərəkət rahat olsun.',
          'Kiçik otaqlarda iki nəfərlik kompakt modellər, geniş məkanlarda isə künc divanlar daha yaxşı işləyir.',
        ],
      },
      {
        heading: 'Parça: gündəlik istifadəyə uyğun seçin',
        paragraphs: [
          'Uşaqlı ailələr və ev heyvanı olanlar üçün asan təmizlənən, aşınmaya davamlı parçalar məsləhətdir. Məxmər zərif görünür, lakin qulluq tələb edir; dəri isə uzun ömürlüdür və zamanla gözəlləşir.',
        ],
      },
      {
        heading: 'Rəng və üslub',
        paragraphs: [
          'Neytral tonlar (boz, bej) istənilən interyerə uyğunlaşır və yastıqlar vasitəsilə rəng əlavə etməyə imkan verir. Cəsarətli rəng, məsələn zümrüd yaşıl, otağın əsas aksentinə çevrilə bilər.',
          'Divanı seçərkən otaqdakı digər mebelin və divar rənginin ton uyğunluğuna diqqət yetirin.',
        ],
      },
    ],
  },
  {
    slug: 'muasir-ve-klassik-uslub',
    category: 'İnteryer Dizayn',
    date: '2026-07-29',
    dateLabel: '29 İyul 2026',
    title: 'Modern və Klassik Üslub: Fərqlər və Uyğunluqlar',
    excerpt: 'Məkanınızı necə tərzə uyğunlaşdırmaq olar — praktik bələdçi və məsləhətlər.',
    image: unsplash('1631679706909-1844bbd07221'),
    imageAlt: 'Güzgülər və təbii tonlarla bəzədilmiş qonaq otağı',
    readMinutes: 5,
    sections: [
      {
        heading: 'Klassik üslubun əsas əlamətləri',
        paragraphs: [
          'Klassik interyerdə simmetriya, oyma detallar, kapitone səthlər və isti rənglər üstünlük təşkil edir. Mebel adətən ağır, təmtəraqlı və detallı olur.',
        ],
      },
      {
        heading: 'Müasir üslubun əsas əlamətləri',
        paragraphs: [
          'Müasir interyer sadə xətlər, açıq məkan və az sayda, lakin düşünülmüş mebellə seçilir. Neytral palitra və funksionallıq əsas prinsiplərdir.',
        ],
      },
      {
        heading: 'Hər ikisini necə birləşdirmək olar?',
        paragraphs: [
          'Ən uğurlu üsul klassik bir əsas parçanı (məsələn, kapitone divan) müasir aksesuarlarla tamamlamaqdır. Rəng palitrasını məhdud saxlayın və hər otaqda yalnız bir dominant üslub seçin.',
        ],
      },
    ],
  },
  {
    slug: 'tebii-agac-mebelin-ustunlukleri',
    category: 'Stil və Dekor',
    date: '2026-07-26',
    dateLabel: '26 İyul 2026',
    title: 'Evinizə Təbiilik Qatın: Taxta Mebellərin Üstünlükləri',
    excerpt: 'Təbii materialların interyerdə yaratdığı isti və rahat mühit barədə bilmədikləriniz.',
    image: unsplash('1505693416388-ac5ce068fe85'),
    imageAlt: 'İsti tonlu yataq otağı interyeri',
    readMinutes: 4,
    sections: [
      {
        heading: 'Uzunömürlülük',
        paragraphs: [
          'Təbii ağac düzgün qulluqla onilliklərlə xidmət edir. Cızıqlar və yüngül izlər lazım olduqda yenilənə bilər, bu da ağacı ən davamlı materiallardan biri edir.',
        ],
      },
      {
        heading: 'İsti mühit',
        paragraphs: [
          'Ağacın təbii toxuması və rəngi otağa rahatlıq gətirir. Müxtəlif ağac növləri interyerə fərqli xarakter verir: palıd möhkəm və ciddi, fıstıq isə yüngül görünür.',
        ],
      },
      {
        heading: 'Qulluq qaydaları',
        paragraphs: [
          'Mebeli birbaşa günəş şüasından və istilik mənbələrindən uzaq tutun, yumşaq və yüngül nəm parça ilə silin. Aqressiv kimyəvi təmizləyicilərdən çəkinin.',
        ],
      },
    ],
  },
  {
    slug: 'kicik-menzil-ucun-mebel-secimi',
    category: 'Mebel Bələdçisi',
    date: '2026-07-22',
    dateLabel: '22 İyul 2026',
    title: 'Kiçik Mənzil Üçün Mebel: Məkanı Genişləndirən 5 Qayda',
    excerpt: 'Az sahədə çox rahatlıq: düzgün mebel seçimi ilə kiçik mənzili necə geniş göstərmək olar.',
    image: unsplash('1600210492486-724fe5c67fb0'),
    imageAlt: 'İşıqlı və sadə qonaq otağı',
    readMinutes: 4,
    sections: [
      {
        heading: 'Açıq rənglərə üstünlük verin',
        paragraphs: ['Açıq rəngli mebel və divarlar işığı əks etdirir, otağı daha geniş göstərir.'],
      },
      {
        heading: 'Çoxfunksiyalı mebel',
        paragraphs: [
          'Saxlama yeri olan çarpayı, açılan masa və ya rəfli komod kiçik sahədə həyati əhəmiyyət daşıyır.',
        ],
      },
      {
        heading: 'Yerə deyil, hündürlüyə baxın',
        paragraphs: [
          'Hündür şkaf və rəflər yeri qənaətlə istifadə etməyə imkan verir. Ayaqları olan mebel (divan, komod) döşəməni daha açıq göstərir.',
        ],
      },
    ],
  },
  {
    slug: 'yataq-otagi-ucun-isiq-ve-mebel',
    category: 'İnteryer Dizayn',
    date: '2026-07-18',
    dateLabel: '18 İyul 2026',
    title: 'Yataq Otağı: Yuxu Keyfiyyətini Artıran Mebel və Düzülüş',
    excerpt: 'Çarpayının yerləşməsi, tumba seçimi və rənglər yuxunun keyfiyyətinə necə təsir edir.',
    image: unsplash('1522771739844-6a9f6d5f14af'),
    imageAlt: 'Tumba ilə sadə yataq otağı',
    readMinutes: 5,
    sections: [
      {
        heading: 'Çarpayının yeri',
        paragraphs: [
          'Çarpayını pəncərə və qapıdan birbaşa küləyin dəyməyəcəyi yerdə yerləşdirin. Baş tərəfin divara söykənməsi sakitlik hissi yaradır.',
        ],
      },
      {
        heading: 'Rənglər',
        paragraphs: ['Sakit tonlar — bej, boz, yumşaq yaşıl — yuxuya hazırlaşmağa kömək edir.'],
      },
      {
        heading: 'Saxlama',
        paragraphs: [
          'Tumba və kiçik komodlar gecə lazım olan əşyaları əlçatan edir, otağı səliqəli saxlayır.',
        ],
      },
    ],
  },
  {
    slug: 'nahar-masasi-secimi',
    category: 'Stil və Dekor',
    date: '2026-07-12',
    dateLabel: '12 İyul 2026',
    title: 'Nahar Masası Necə Seçilir: Forma, Ölçü və Material',
    excerpt: 'Ailənizin sayına, otağın formasına və gündəlik ehtiyaclara uyğun masa seçimi bələdçisi.',
    image: unsplash('1618221195710-dd6b41faaea6'),
    imageAlt: 'Geniş qonaq və yemək otağı',
    readMinutes: 4,
    sections: [
      {
        heading: 'Ölçü qaydası',
        paragraphs: [
          'Hər nəfər üçün masa kənarında rahat oturmaq üçün kifayət qədər yer olmalıdır. Masanın ətrafında stulların çəkilməsi üçün də boşluq qoyun.',
        ],
      },
      {
        heading: 'Forma',
        paragraphs: [
          'Düzbucaqlı masalar uzun otaqlara, dairəvi və oval masalar isə kvadrat otaqlara və ünsiyyətə daha yaxşı uyğundur.',
        ],
      },
      {
        heading: 'Material',
        paragraphs: [
          'Təbii ağac isti görünüş verir, şüşə və metal isə müasir interyerə uyğundur. Qoruyucu örtük masanı suya və ləkələrə qarşı müdafiə edir.',
        ],
      },
    ],
  },
];
