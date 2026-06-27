/*
Purpose: Shared NOIR storefront behavior.
Callers: HTML pages via type="module".
Deps: DOM nodes from current page.
API: Window-bound handlers for inline markup.
Side effects: Cart state, page routing, overlays, checkout UI.
*/
/* ════ PAGE SYSTEM ════ */
        const PAGES = { home: 'index.html', koleksi: 'koleksi.html', sale: 'sale.html', ulasan: 'ulasan.html', instagram: 'instagram.html', detail: 'detail.html' };
        const currentPage = document.body.dataset.page;

        function goPage(id) {
            const target = document.getElementById('page-' + id);
            if (!target && PAGES[id]) {
                window.location.href = PAGES[id];
                return;
            }
            document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
            if (target) {
                target.classList.add('active');
                const inner = target.querySelector('.page-inner');
                if (inner) { inner.style.animation = 'none'; requestAnimationFrame(() => { inner.style.animation = ''; }); }
            }
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.page === id));
            document.querySelectorAll('[data-mob]').forEach(a => a.classList.toggle('active', a.dataset.mob === id));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.dataset.page === currentPage));
        document.querySelectorAll('[data-mob]').forEach(a => a.classList.toggle('active', a.dataset.mob === currentPage));

        function goPageFilter(cat) {
            document.querySelectorAll('.flt').forEach(b => {
                b.classList.toggle('on', b.dataset.f === cat);
            });
            renderProds(cat);
            goPage('koleksi');
        }

        /* LOADER */
        const loader = document.getElementById('loader');
        const hideLoader = () => loader?.classList.add('hide');
        if (sessionStorage.getItem('introSeen')) {
            hideLoader();
        } else {
            sessionStorage.setItem('introSeen', '1');
            window.addEventListener('load', () => setTimeout(hideLoader, 1900));
            setTimeout(hideLoader, 2600);
        }

        /* CURSOR */
        const cur = document.getElementById('cursor'), ring = document.getElementById('cursorRing');
        document.addEventListener('mousemove', e => {
            cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px';
            setTimeout(() => { ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px'; }, 60);
        });
        document.querySelectorAll('button,a,.pcard,.bento-card,.ig-item,.ed-img').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
        });

        /* HAMBURGER */
        document.getElementById('hamburger').addEventListener('click', () => {
            document.getElementById('mobNav').classList.toggle('on');
        });
        function closeMobNav() { document.getElementById('mobNav').classList.remove('on'); }

        /* ════ PRODUCTS DATA ════ */
        const PRODS = [
            {
                id: 1, name: 'Minimal White Shirt', sub: 'Cotton Blend', cat: 'blouse', price: 165000, ori: 0, flag: 'new',
                col: ['#fff', '#e8e8e8', '#1a1a1a'], colNames: ['White', 'Light Grey', 'Charcoal'],
                stars: 4.8, sold: 1820,
                img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=85',
                imgs: [
                    'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=85',
                    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85',
                    'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=85',
                    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=85',
                ],
                sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                soldout: ['XXL'],
                stock: 42,
                desc: 'Kemeja putih minimalis yang menjadi wardrobe essential setiap wanita modern. Dibuat dari cotton blend berkualitas tinggi yang nyaman dipakai seharian — breathable, tidak mudah kusut, dan tetap tampak fresh.',
                material: '100% Cotton Blend, 180 GSM',
                care: 'Cuci tangan atau mesin 30°C. Jangan diperas. Setrika suhu sedang.',
                fit: 'Regular fit. Model 168cm memakai ukuran S.',
                sku: 'NR-BL-001-2026',
                reviews: [{ name: 'Reza A.', loc: 'Jakarta', text: 'Bahannya adem banget, gak panas sama sekali. Fit-nya perfect!', stars: 5 },
                { name: 'Mira S.', loc: 'Surabaya', text: 'Warnanya bersih, jahitan rapi. Udah repeat order 3x.', stars: 5 },
                { name: 'Dian P.', loc: 'Palembang', text: 'Cocok banget buat kerja, simple tapi tetap elegan.', stars: 4 }]
            },
            {
                id: 2, name: 'Structured Blazer', sub: 'Premium Wool', cat: 'outer', price: 385000, ori: 550000, flag: 'sale',
                col: ['#0a0a0a', '#555', '#fff'], colNames: ['Black', 'Charcoal', 'Ivory'],
                stars: 4.9, sold: 640,
                img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85',
                imgs: [
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85',
                    'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=85',
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85',
                    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85',
                ],
                sizes: ['XS', 'S', 'M', 'L', 'XL'],
                soldout: ['XS'],
                stock: 18,
                desc: 'Blazer structured dengan potongan tailored yang mempertegas siluet. Bahan premium wool blend memberikan kesan mewah sekaligus nyaman. Cocok untuk meeting, acara formal, hingga casual day out.',
                material: '65% Wool, 35% Polyester Blend',
                care: 'Dry clean only. Simpan dengan hanger untuk menjaga bentuk.',
                fit: 'Slim fit. Model 168cm memakai ukuran S.',
                sku: 'NR-OT-002-2026',
                reviews: [{ name: 'Sandra K.', loc: 'Bandung', text: 'Blazer paling worth it yang pernah saya beli. Bahannya berat di tangan, sangat premium.', stars: 5 },
                { name: 'Lina M.', loc: 'Jakarta', text: 'Fit-nya sempurna, jahitannya sangat detail. Puas banget!', stars: 5 },
                { name: 'Citra R.', loc: 'Semarang', text: 'Sedikit mahal tapi worth it untuk kualitas segini.', stars: 4 }]
            },
            {
                id: 3, name: 'Flowy Midi Dress', sub: 'Linen Rayon', cat: 'dress', price: 275000, ori: 0, flag: 'hot',
                col: ['#fff', '#c8c8c8', '#2d2d2d'], colNames: ['White', 'Grey', 'Dark'],
                stars: 4.9, sold: 2100,
                img: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=85',
                imgs: [
                    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=85',
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85',
                    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=85',
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85',
                ],
                sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                soldout: [],
                stock: 87,
                desc: 'Midi dress dengan siluet flowy yang anggun. Bahan linen rayon terasa ringan dan breathable — ideal untuk cuaca tropis Indonesia. Detail potongan A-line memberikan kesan feminin sempurna untuk berbagai kesempatan.',
                material: '55% Linen, 45% Rayon, 140 GSM',
                care: 'Cuci tangan atau mesin delicate 30°C. Angin-anginkan, jangan dijemur langsung di bawah matahari.',
                fit: 'Regular fit. Model 168cm memakai ukuran M.',
                sku: 'NR-DR-003-2026',
                reviews: [{ name: 'Putri W.', loc: 'Palembang', text: 'Baju favoritku! Adem banget dan jatuhnya bagus di badan.', stars: 5 },
                { name: 'Maya L.', loc: 'Yogyakarta', text: 'Best dress ever! Udah dipakai ke kondangan dan dapet banyak pujian.', stars: 5 },
                { name: 'Rina T.', loc: 'Medan', text: 'Bahannya tipis tapi tidak transparan, sangat nyaman.', stars: 5 }]
            },
            {
                id: 4, name: 'Wide Leg Trousers', sub: 'High Waist', cat: 'celana', price: 245000, ori: 320000, flag: 'sale',
                col: ['#0a0a0a', '#888', '#fff'], colNames: ['Black', 'Grey', 'Cream'],
                stars: 4.7, sold: 980,
                img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85',
                imgs: [
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85',
                    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85',
                    'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=85',
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85',
                ],
                sizes: ['XS', 'S', 'M', 'L', 'XL'],
                soldout: ['XS', 'XL'],
                stock: 24,
                desc: 'Wide leg trousers high waist yang memberikan kesan kaki lebih panjang dan ramping. Potongan modern yang versatile — bisa dipadukan dengan blouse tucked in, crop top, hingga oversized shirt untuk berbagai tampilan.',
                material: '70% Polyester, 30% Viscose, Wrinkle-resistant',
                care: 'Cuci mesin 30°C. Setrika suhu sedang dari bagian dalam.',
                fit: 'High waist, wide leg. Model 168cm memakai ukuran S.',
                sku: 'NR-CL-004-2026',
                reviews: [{ name: 'Dini A.', loc: 'Jakarta', text: 'Bikin kaki keliatan jenjang! Bahannya gak panas dan gak gampang kusut.', stars: 5 },
                { name: 'Sari M.', loc: 'Surabaya', text: 'Jahitannya rapi, warnanya hitam pekat. Satisfied!', stars: 4 },
                { name: 'Winda R.', loc: 'Makassar', text: 'Cukup oke, tapi ukurannya agak besar dari ekspektasi.', stars: 4 }]
            },
            {
                id: 5, name: 'Wrap Mini Skirt', sub: 'Satin Finish', cat: 'dress', price: 185000, ori: 0, flag: 'new',
                col: ['#0a0a0a', '#1a1a1a', '#fff'], colNames: ['Black', 'Dark', 'White'],
                stars: 4.8, sold: 755,
                img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85',
                imgs: [
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85',
                    'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=85',
                    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=85',
                    'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=85',
                ],
                sizes: ['XS', 'S', 'M', 'L', 'XL'],
                soldout: [],
                stock: 55,
                desc: 'Mini skirt model wrap dengan finishing satin yang elegan. Detail ikatan di samping memberikan fleksibilitas ukuran dan sentuhan feminin. Cocok dipadukan dengan fitted top atau tuck-in blouse untuk tampilan chic.',
                material: '100% Polyester Satin, 120 GSM',
                care: 'Cuci tangan dengan air dingin. Setrika suhu rendah dari bagian dalam.',
                fit: 'Adjustable wrap. One size fits S-L.',
                sku: 'NR-SK-005-2026',
                reviews: [{ name: 'Hana P.', loc: 'Bali', text: 'Bahannya mewah banget, jatuhnya bagus! Banyak yang nanya beli di mana.', stars: 5 },
                { name: 'Amel S.', loc: 'Palembang', text: 'Cantik banget, cocok buat date night!', stars: 5 },
                { name: 'Tara L.', loc: 'Bandung', text: 'Satin-nya tidak mudah kusut, good quality.', stars: 4 }]
            },
            {
                id: 6, name: 'Puff Sleeve Blouse', sub: 'Cotton Voile', cat: 'blouse', price: 155000, ori: 210000, flag: 'sale',
                col: ['#fff', '#e8e8e8', '#0a0a0a'], colNames: ['White', 'Off White', 'Black'],
                stars: 4.7, sold: 1240,
                img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=85',
                imgs: [
                    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=85',
                    'https://images.unsplash.com/photo-1551803091-e20673f15770?w=800&q=85',
                    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85',
                    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85',
                ],
                sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                soldout: ['XXL'],
                stock: 33,
                desc: 'Blouse dengan detail lengan puff yang memberikan kesan feminin dan playful. Bahan cotton voile yang ringan dan transparan — dipadukan dengan inner untuk tampilan yang lebih versatile.',
                material: '100% Cotton Voile, 80 GSM',
                care: 'Cuci tangan. Setrika suhu rendah.',
                fit: 'Loose fit. Model 168cm memakai ukuran S.',
                sku: 'NR-BL-006-2026',
                reviews: [{ name: 'Bella K.', loc: 'Jakarta', text: 'Imut banget! Lengan puff-nya kembang tapi tetap rapi.', stars: 5 },
                { name: 'Sinta M.', loc: 'Yogyakarta', text: 'Bahannya tipis tapi lembut, cocok buat udara panas.', stars: 4 },
                { name: 'Fanny T.', loc: 'Surabaya', text: 'Wajib beli! Banyak yang request minta foto outfit ini.', stars: 5 }]
            },
            {
                id: 7, name: 'Knit Turtleneck', sub: 'Wool Mix', cat: 'blouse', price: 220000, ori: 0, flag: 'new',
                col: ['#0a0a0a', '#444', '#888'], colNames: ['Black', 'Dark Grey', 'Grey'],
                stars: 4.9, sold: 430,
                img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85',
                imgs: [
                    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85',
                    'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=85',
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85',
                    'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=85',
                ],
                sizes: ['XS', 'S', 'M', 'L', 'XL'],
                soldout: ['XS'],
                stock: 29,
                desc: 'Knit turtleneck dengan bahan wool mix yang hangat dan nyaman. Rajutan halus dengan stretch sedikit untuk kenyamanan maksimal. Cocok dipadukan dengan wide leg trousers atau rok midi untuk tampilan editorial.',
                material: '50% Wool, 50% Acrylic Knit',
                care: 'Cuci tangan dengan air dingin. Jemur mendatar agar tidak melar.',
                fit: 'Fitted. Model 168cm memakai ukuran S.',
                sku: 'NR-KN-007-2026',
                reviews: [{ name: 'Nanda W.', loc: 'Bandung', text: 'Quality knit-nya bagus, tidak mudah bulu-bulu. Worth it!', stars: 5 },
                { name: 'Lisa T.', loc: 'Jakarta', text: 'Hangat tapi tidak gerah, cocok untuk AC kantor.', stars: 5 },
                { name: 'Rizka M.', loc: 'Palembang', text: 'Elegan banget dipadupadankan, puas banget beli ini.', stars: 4 }]
            },
            {
                id: 8, name: 'Tailored Coat', sub: 'Classic Cut', cat: 'outer', price: 520000, ori: 680000, flag: 'sale',
                col: ['#0a0a0a', '#1a1a1a', '#888'], colNames: ['Black', 'Midnight', 'Charcoal'],
                stars: 5.0, sold: 310,
                img: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=85',
                imgs: [
                    'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&q=85',
                    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=85',
                    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=85',
                    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=85',
                ],
                sizes: ['XS', 'S', 'M', 'L', 'XL'],
                soldout: [],
                stock: 12,
                desc: 'Tailored coat dengan potongan klasik yang tidak pernah lekang oleh waktu. Bahan tebal premium dengan lining satin di bagian dalam untuk kenyamanan ekstra. Investasi fashion terbaik yang dapat dipakai selama bertahun-tahun.',
                material: '70% Wool, 30% Cashmere Blend, Satin Lining',
                care: 'Dry clean only. Simpan dalam dust bag dan gantung dengan hanger tebal.',
                fit: 'Semi-fitted. Model 168cm memakai ukuran S.',
                sku: 'NR-OT-008-2026',
                reviews: [{ name: 'Veronica S.', loc: 'Jakarta Selatan', text: 'Coat terbaik yang pernah saya miliki. Bahannya sangat mewah dan jahitannya sempurna.', stars: 5 },
                { name: 'Priska A.', loc: 'Surabaya', text: 'Investasi fashion paling worth it! Sudah 2 musim masih terlihat baru.', stars: 5 },
                { name: 'Mega L.', loc: 'Bali', text: 'Pelayanan dan produknya excellent, packing juga sangat bagus!', stars: 5 }]
            },
        ];

        const FILTERS2 = [{ f: 'all', l: 'All' }, { f: 'dress', l: 'Dress' }, { f: 'blouse', l: 'Blouse' }, { f: 'celana', l: 'Celana' }, { f: 'outer', l: 'Outer' }];
        const fmt = n => 'Rp ' + n.toLocaleString('id-ID');

        /* FILTER BAR */
        const fb = document.getElementById('filterBar');
        if (fb) FILTERS2.forEach(({ f, l }) => {
            const b = document.createElement('button');
            b.className = 'flt' + (f === 'all' ? ' on' : '');
            b.dataset.f = f; b.textContent = l;
            b.addEventListener('click', () => {
                document.querySelectorAll('.flt').forEach(x => x.classList.remove('on'));
                b.classList.add('on'); renderProds(f);
            });
            fb.appendChild(b);
        });

        function starSVG(filled = true) { return `<svg viewBox="0 0 24 24" style="fill:${filled ? '#f0b429' : '#ddd'};stroke:none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`; }
        function starsHTML(rating) {
            let h = '';
            for (let i = 1; i <= 5; i++) h += starSVG(i <= Math.round(rating));
            return h;
        }

        function renderProds(f = 'all') {
            const g = document.getElementById('prodGrid');
            const list = f === 'all' ? PRODS : PRODS.filter(p => p.cat === f);
            if (!list.length) { g.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#888">Belum ada produk.</div>'; return; }
            g.innerHTML = list.map(p => {
                const disc = p.ori ? Math.round((1 - p.price / p.ori) * 100) : 0;
                const flagCls = p.flag === 'new' ? 'new' : p.flag === 'sale' ? 'sale' : 'hot';
                return `<div class="pcard" onclick="openProductDetail(${p.id})">
  <div class="p-imgwrap">
    <span class="p-flag ${flagCls}">${p.flag === 'new' ? 'New' : p.flag === 'sale' ? 'Sale' : 'Hot'}</span>
    <button class="p-wish" onclick="event.stopPropagation();wishIt(this)"><svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" stroke-width="1.8" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
    <img src="${p.img}" alt="${p.name}" loading="lazy"/>
    <div class="p-hoverbar">
      <button class="p-add-cart" onclick="event.stopPropagation();openProductDetail(${p.id})">Lihat Detail</button>
      <button class="p-quickview" onclick="event.stopPropagation();addToCartDirect(${p.id})"><svg viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></button>
    </div>
  </div>
  <div class="p-info">
    <div class="p-swatches">${p.col.map(c => `<span class="p-swatch" style="background:${c}"></span>`).join('')}</div>
    <div class="p-name">${p.name}</div>
    <div class="p-sub">${p.sub}</div>
    <div class="p-pr"><span class="p-price">${fmt(p.price)}</span>${p.ori ? `<span class="p-ori">${fmt(p.ori)}</span><span class="p-pct">-${disc}%</span>` : ''}</div>
    <div class="p-stars"><div class="p-star-icons">${starsHTML(p.stars)}</div><span class="p-sold">${p.sold.toLocaleString('id-ID')} terjual</span></div>
  </div>
</div>`;
            }).join('');
        }
        if (document.getElementById('prodGrid')) renderProds();

        /* ════ PRODUCT DETAIL ════ */
        let currentProd = null;
        let detailQty = 1;
        let detailSelColor = 0;
        let detailSelSize = null;
        let detailWishlisted = false;

        function openProductDetail(id) {
            const p = PRODS.find(x => x.id === id);
            if (!p) return;
            if (!document.getElementById('detailInner')) { window.location.href = `detail.html?id=${id}`; return; }
            currentProd = p;
            detailQty = 1;
            detailSelColor = 0;
            detailSelSize = null;
            detailWishlisted = false;

            const disc = p.ori ? Math.round((1 - p.price / p.ori) * 100) : 0;
            const flagCls = p.flag === 'new' ? 'new' : p.flag === 'sale' ? 'sale' : 'hot';
            const related = PRODS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);

            const thumbsHTML = p.imgs.map((img, i) => `
        <div class="pd-thumb${i === 0 ? ' active' : ''}" onclick="switchImg(this,'${img}')" id="thumb-${i}">
            <img src="${img}" alt="" loading="lazy"/>
        </div>`).join('');

            const colorsHTML = p.col.map((c, i) => `
        <button class="pd-color-btn${i === 0 ? ' active' : ''}" 
            style="background:${c};border-color:${i === 0 ? 'var(--b)' : 'transparent'}"
            onclick="selectColor(this,${i},'${p.colNames[i]}')"
            title="${p.colNames[i]}"></button>`).join('');

            const sizesHTML = p.sizes.map(s => {
                const so = p.soldout.includes(s);
                return `<button class="pd-size-btn${so ? ' soldout' : ''}" 
            onclick="${so ? '' : ` selectSize(this,'${s}')`}" 
            ${so ? 'disabled' : ''}>${s}${so ? '<br><span style="font-size:.55rem;color:var(--w4)">Habis</span>' : ''}</button>`;
            }).join('');

            const revHTML = p.reviews.map(r => `
        <div style="padding:1rem 0;border-bottom:1px solid var(--w3)">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.4rem">
                <div>
                    <span style="font-weight:600;font-size:.88rem">${r.name}</span>
                    <span style="color:var(--b4);font-size:.75rem;margin-left:.5rem">· ${r.loc}</span>
                </div>
                <div style="display:flex;gap:2px">${starsHTML(r.stars)}</div>
            </div>
            <p style="font-size:.84rem;color:var(--b2);line-height:1.65;font-style:italic">"${r.text}"</p>
        </div>`).join('');

            const relatedHTML = related.map(rp => {
                const rdisc = rp.ori ? Math.round((1 - rp.price / rp.ori) * 100) : 0;
                return `<div class="pcard" onclick="openProductDetail(${rp.id})" style="cursor:pointer">
            <div class="p-imgwrap">
                <img src="${rp.img}" alt="${rp.name}" loading="lazy" style="height:220px"/>
            </div>
            <div class="p-info">
                <div class="p-name" style="font-size:.9rem">${rp.name}</div>
                <div class="p-pr"><span class="p-price" style="font-size:.88rem">${fmt(rp.price)}</span>${rp.ori ? `<span class="p-ori" style="font-size:.75rem">${fmt(rp.ori)}</span>` : ''}</div>
            </div>
        </div>`;
            }).join('');

            const stockColor = p.stock < 20 ? 'color:#c4555a' : 'color:#3d5c45';
            const stockText = p.stock < 20 ? `Sisa ${p.stock} pcs` : `Stok tersedia`;

            document.getElementById('detailInner').innerHTML = `
        <div class="pd-breadcrumb">
            <a onclick="goPage('home')">Home</a>
            <span>›</span>
            <a onclick="goPage('koleksi')">Koleksi</a>
            <span>›</span>
            <a onclick="goPageFilter('${p.cat}')">${p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</a>
            <span>›</span>
            <span style="color:var(--b)">${p.name}</span>
        </div>

        <div class="pd-main">
            <!-- GALLERY -->
            <div class="pd-gallery">
                <div class="pd-main-img" id="pdMainImg">
                    <img src="${p.imgs[0]}" alt="${p.name}" id="pdMainImgEl"/>
                    <span class="pd-flag ${flagCls}">${p.flag === 'new' ? 'New' : p.flag === 'sale' ? 'Sale' : 'Hot'}</span>
                </div>
                <div class="pd-thumbs" id="pdThumbs">${thumbsHTML}</div>
            </div>

            <!-- INFO -->
            <div class="pd-info">
                <div class="pd-brand">NOIR. Collection 2026</div>
                <h1 class="pd-name">${p.name}</h1>
                <div class="pd-sub">${p.sub}</div>

                <div class="pd-rating-row">
                    <div class="pd-stars-wrap">${starsHTML(p.stars)}</div>
                    <span class="pd-rating-num">${p.stars}</span>
                    <span class="pd-review-link">${p.reviews.length} ulasan</span>
                    <span class="pd-sold-badge">${p.sold.toLocaleString('id-ID')} terjual</span>
                </div>

                <div class="pd-price-row">
                    <span class="pd-price">${fmt(p.price)}</span>
                    ${p.ori ? `<span class="pd-ori-price">${fmt(p.ori)}</span><span class="pd-disc-badge">-${disc}%</span>` : ''}
                </div>

                <!-- COLOR -->
                <div class="pd-section-label">Warna <span id="selColorName">${p.colNames[0]}</span></div>
                <div class="pd-colors">${colorsHTML}</div>

                <!-- SIZE -->
                <div class="pd-section-label">Ukuran 
                    <span id="selSizeName" style="color:var(--b4)">Pilih ukuran</span>
                </div>
                <div class="pd-sizes">${sizesHTML}</div>
                <div style="margin-top:-.8rem;margin-bottom:1.4rem">
                    <button onclick="toggleAccord('accord-size')" style="background:none;border:none;font-size:.72rem;color:var(--b4);text-decoration:underline;cursor:pointer;padding:0">📏 Panduan ukuran</button>
                </div>

                <!-- QTY -->
                <div class="pd-section-label">Jumlah</div>
                <div class="pd-qty-row">
                    <div class="pd-qty-wrap">
                        <button class="pd-qty-btn" onclick="changeQty(-1)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <span class="pd-qty-num" id="pdQtyNum">1</span>
                        <button class="pd-qty-btn" onclick="changeQty(1)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                    </div>
                    <span class="pd-stock" style="${stockColor}">${stockText}</span>
                </div>

                <!-- CTA -->
                <button class="pd-btn-cart" onclick="addToCartFromDetail()">
                    <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    Tambah ke Keranjang
                </button>
                <button class="pd-btn-wish" id="pdWishBtn" onclick="toggleDetailWish()">
                    <svg viewBox="0 0 24 24" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    Tambah ke Wishlist
                </button>

                <!-- GUARANTEES -->
                <div class="pd-guarantees">
                    <div class="pd-guar"><div class="pd-guar-icon">🚚</div><div class="pd-guar-label">Free Ongkir</div></div>
                    <div class="pd-guar"><div class="pd-guar-icon">↩</div><div class="pd-guar-label">Return 7 Hari</div></div>
                    <div class="pd-guar"><div class="pd-guar-icon">✓</div><div class="pd-guar-label">100% Original</div></div>
                </div>

                <!-- ACCORDION -->
                <div class="pd-accord">
                    <div class="pd-accord-item open">
                        <button class="pd-accord-head" onclick="toggleAccord('accord-desc')">
                            Deskripsi Produk
                            <svg viewBox="0 0 24 24" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <div class="pd-accord-body" id="accord-desc">
                            <div class="pd-accord-content">
                                <p>${p.desc}</p>
                                <ul style="margin-top:.8rem">
                                    <li>Material: ${p.material}</li>
                                    <li>SKU: ${p.sku}</li>
                                    <li>Kategori: ${p.cat.charAt(0).toUpperCase() + p.cat.slice(1)}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="pd-accord-item">
                        <button class="pd-accord-head" onclick="toggleAccord('accord-care')">
                            Cara Perawatan
                            <svg viewBox="0 0 24 24" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <div class="pd-accord-body" id="accord-care">
                            <div class="pd-accord-content">
                                <p>${p.care}</p>
                                <ul style="margin-top:.8rem">
                                    <li>Jangan menggunakan pemutih</li>
                                    <li>Cuci terpisah dengan pakaian berwarna</li>
                                    <li>Simpan di tempat yang kering dan sejuk</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="pd-accord-item" id="accord-size-wrap">
                        <button class="pd-accord-head" onclick="toggleAccord('accord-size')">
                            Panduan Ukuran
                            <svg viewBox="0 0 24 24" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <div class="pd-accord-body" id="accord-size">
                            <div class="pd-accord-content">
                                <p style="margin-bottom:.8rem">${p.fit}</p>
                                <table class="size-table">
                                    <thead><tr><th>Ukuran</th><th>Lingkar Dada</th><th>Lingkar Pinggang</th><th>Panjang</th></tr></thead>
                                    <tbody>
                                        <tr><td>XS</td><td>80–84 cm</td><td>60–64 cm</td><td>sesuai produk</td></tr>
                                        <tr><td>S</td><td>84–88 cm</td><td>64–68 cm</td><td>sesuai produk</td></tr>
                                        <tr class="highlight"><td>M</td><td>88–92 cm</td><td>68–72 cm</td><td>sesuai produk</td></tr>
                                        <tr><td>L</td><td>92–96 cm</td><td>72–76 cm</td><td>sesuai produk</td></tr>
                                        <tr><td>XL</td><td>96–100 cm</td><td>76–80 cm</td><td>sesuai produk</td></tr>
                                        <tr><td>XXL</td><td>100–104 cm</td><td>80–84 cm</td><td>sesuai produk</td></tr>
                                    </tbody>
                                </table>
                                <p style="margin-top:.7rem;font-size:.76rem;color:var(--b4)">Jika ragu antara dua ukuran, kami sarankan memilih ukuran yang lebih besar.</p>
                            </div>
                        </div>
                    </div>
                    <div class="pd-accord-item">
                        <button class="pd-accord-head" onclick="toggleAccord('accord-reviews')">
                            Ulasan Pelanggan (${p.reviews.length})
                            <svg viewBox="0 0 24 24" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        </button>
                        <div class="pd-accord-body" id="accord-reviews">
                            <div class="pd-accord-content">
                                <div style="display:flex;align-items:center;gap:1rem;padding:.5rem 0 1rem;border-bottom:1px solid var(--w3);margin-bottom:.5rem">
                                    <div style="text-align:center">
                                        <div style="font-family:var(--fn-d);font-size:3rem;font-weight:700;line-height:1">${p.stars}</div>
                                        <div style="display:flex;gap:2px;justify-content:center;margin:.3rem 0">${starsHTML(p.stars)}</div>
                                        <div style="font-size:.72rem;color:var(--b4)">${p.reviews.length} ulasan</div>
                                    </div>
                                </div>
                                ${revHTML}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- RELATED -->
        ${related.length > 0 ? `
        <div class="pd-related">
            <div style="padding:0 0 2rem">
                <span class="sec-eyebrow">Mungkin Kamu Suka</span>
                <h2 class="sec-h">Produk <em>Serupa</em></h2>
            </div>
            <div class="pd-related-grid">${relatedHTML}</div>
        </div>` : ''}
    `;

            goPage('detail');
        }

        function switchImg(thumb, src) {
            document.getElementById('pdMainImgEl').src = src;
            document.querySelectorAll('.pd-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        }

        function selectColor(btn, idx, name) {
            detailSelColor = idx;
            document.querySelectorAll('.pd-color-btn').forEach(b => {
                b.classList.remove('active');
                b.style.borderColor = 'transparent';
            });
            btn.classList.add('active');
            btn.style.borderColor = 'var(--b)';
            document.getElementById('selColorName').textContent = name;
        }

        function selectSize(btn, size) {
            detailSelSize = size;
            document.querySelectorAll('.pd-size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('selSizeName').textContent = size;
            document.getElementById('selSizeName').style.color = 'var(--b)';
        }

        function changeQty(delta) {
            detailQty = Math.max(1, Math.min(10, detailQty + delta));
            document.getElementById('pdQtyNum').textContent = detailQty;
        }

        function toggleAccord(id) {
            const body = document.getElementById(id);
            if (!body) return;
            const item = body.closest('.pd-accord-item');
            const isOpen = item.classList.contains('open');
            item.classList.toggle('open', !isOpen);
        }

        function addToCartFromDetail() {
            if (!detailSelSize) { showToast('⚠ Pilih ukuran terlebih dahulu!'); return; }
            const p = currentProd;
            const colorName = p.colNames[detailSelColor];
            const key = `${p.name}|${detailSelSize}|${colorName}`;
            const ex = cart.find(i => i.key === key);
            if (ex) { ex.qty += detailQty; }
            else { cart.push({ key, name: p.name, price: fmt(p.price), img: p.img, qty: detailQty, variant: `${colorName} · ${detailSelSize}` }); }
            renderCart();
            showToast(`✓ ${p.name} (${colorName}, ${detailSelSize}) ×${detailQty} ditambahkan`);
        }

        function addToCartDirect(id) {
            const p = PRODS.find(x => x.id === id);
            if (!p) return;
            if (!document.getElementById('detailInner')) { window.location.href = `detail.html?id=${id}`; return; }
            const key = `${p.name}|S|${p.colNames[0]}`;
            const ex = cart.find(i => i.key === key);
            ex ? ex.qty++ : cart.push({ key, name: p.name, price: fmt(p.price), img: p.img, qty: 1, variant: `${p.colNames[0]} · S` });
            renderCart();
            showToast(`✓ ${p.name} ditambahkan`);
        }

        function toggleDetailWish() {
            detailWishlisted = !detailWishlisted;
            const btn = document.getElementById('pdWishBtn');
            if (btn) {
                btn.classList.toggle('wishlisted', detailWishlisted);
                btn.querySelector('svg path').setAttribute('fill', detailWishlisted ? 'var(--b)' : 'none');
            }
            showToast(detailWishlisted ? '♥ Ditambahkan ke wishlist' : '♡ Dihapus dari wishlist');
        }

        /* ════ SEARCH ════ */
        function openSearchFn() {
            document.getElementById('searchOverlay').classList.add('on');
            document.getElementById('searchInput').focus();
            renderSearchResults('');
        }
        function closeSearch() {
            document.getElementById('searchOverlay').classList.remove('on');
            document.getElementById('searchInput').value = '';
        }
        document.getElementById('openSearch').addEventListener('click', openSearchFn);
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSearch(); });
        document.getElementById('searchInput').addEventListener('input', function () {
            renderSearchResults(this.value.trim().toLowerCase());
        });
        function renderSearchResults(query) {
            const container = document.getElementById('searchResults');
            if (!query) { container.innerHTML = `<div class="sr-empty">Mulai ketik untuk mencari produk…</div>`; return; }
            const results = PRODS.filter(p =>
                p.name.toLowerCase().includes(query) || p.sub.toLowerCase().includes(query) ||
                p.cat.toLowerCase().includes(query)
            );
            if (!results.length) { container.innerHTML = `<div class="sr-empty">Produk "${query}" tidak ditemukan</div>`; return; }
            container.innerHTML = results.map(p => `
    <div class="sr-card" onclick="closeSearch();openProductDetail(${p.id})">
      <div class="sr-card-img"><img src="${p.img}" alt="${p.name}" loading="lazy"/></div>
      <div class="sr-card-info">
        <div class="sr-card-name">${p.name}</div>
        <div class="sr-card-price">${fmt(p.price)}${p.ori ? ` · <span style="text-decoration:line-through;opacity:.5">${fmt(p.ori)}</span>` : ''}</div>
      </div>
    </div>`).join('');
        }

        /* ════ CART ════ */
        let cart = [], promo = 0, selPayMethod = 'gopay';

        function renderCart() {
            document.getElementById('cartCount').textContent = cart.reduce((s, i) => s + i.qty, 0);
            const body = document.getElementById('cartBody'), foot = document.getElementById('cartFoot');
            if (!cart.length) {
                body.innerHTML = `<div class="cd-empty"><div class="cd-empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></div><p>Your bag is empty</p><p>Discover our collection</p></div>`;
                foot.style.display = 'none'; return;
            }
            body.innerHTML = cart.map((it, i) => `
  <div class="ci">
    <div class="ci-img"><img src="${it.img}" alt="${it.name}"/></div>
    <div class="ci-info">
      <div class="ci-name">${it.name}</div>
      <div class="ci-var">${it.variant || 'Size: M · Black'}</div>
      <div class="ci-price">${it.price}</div>
      <div class="ci-ctrl">
        <button class="ci-qbtn" onclick="chQ(${i},-1)"><svg viewBox="0 0 24 24" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
        <span class="ci-qty">${it.qty}</span>
        <button class="ci-qbtn" onclick="chQ(${i},1)"><svg viewBox="0 0 24 24" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
        <button class="ci-del" onclick="rmI(${i})"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg></button>
      </div>
    </div>
  </div>`).join('');
            foot.style.display = 'block';
            const sub = calcSub(), total = Math.max(0, sub - promo);
            document.getElementById('cSub').textContent = fmt(sub);
            document.getElementById('cTotal').textContent = fmt(total);
            const dr = document.getElementById('discRow');
            if (promo) { dr.style.display = 'flex'; document.getElementById('discAmt').textContent = '-' + fmt(promo); } else dr.style.display = 'none';
        }

        function calcSub() { return cart.reduce((s, it) => { const n = parseInt((it.price || '0').replace(/[^0-9]/g, '')); return s + n * it.qty; }, 0); }
        function chQ(i, d) { cart[i].qty += d; if (cart[i].qty < 1) cart.splice(i, 1); renderCart(); }
        function rmI(i) { cart.splice(i, 1); renderCart(); }
        function applyPromo() {
            const code = document.getElementById('promoIn').value.trim().toUpperCase();
            const map = { 'NOIR10': 50000, 'SALE25': 75000, 'VIP50': 120000 };
            if (map[code]) { promo = map[code]; renderCart(); showToast('🎉 Promo aktif! Hemat ' + fmt(promo)); }
            else showToast('✕ Kode promo tidak valid');
        }
        function openCart() { document.getElementById('cartDrawer').classList.add('on'); document.getElementById('veil').classList.add('on'); }
        function closeCart() { document.getElementById('cartDrawer').classList.remove('on'); document.getElementById('veil').classList.remove('on'); }
        document.getElementById('openCart').addEventListener('click', openCart);

        /* ════ CHECKOUT ════ */
        function selPay(el) { document.querySelectorAll('.popt').forEach(x => x.classList.remove('on')); el.classList.add('on'); selPayMethod = el.dataset.p; }
        function openCheckout() {
            if (!cart.length) { showToast('🛒 Keranjang masih kosong!'); return; }
            closeCart();
            const sub = calcSub(), total = Math.max(0, sub - promo);
            document.getElementById('mSub').textContent = fmt(sub);
            document.getElementById('mTotal').textContent = fmt(total);
            const mdr = document.getElementById('mDiscRow');
            if (promo) { mdr.style.display = 'flex'; document.getElementById('mDisc').textContent = '-' + fmt(promo); } else mdr.style.display = 'none';
            document.getElementById('sumItems').innerHTML = cart.map(it => `<div class="sum-item"><span>${it.name} ×${it.qty}</span><span>${it.price}</span></div>`).join('');
            document.getElementById('checkoutModal').classList.add('on');
        }
        function closeCheckout() { document.getElementById('checkoutModal').classList.remove('on'); }

        /* ════ PLACE ORDER ════ */
        function placeOrder() {
            const name = document.getElementById('cName').value.trim();
            const phone = document.getElementById('cPhone').value.trim();
            const email = document.getElementById('cEmail').value.trim();
            const addr = document.getElementById('cAddr').value.trim();
            const city = document.getElementById('cCity').value.trim();
            const zip = document.getElementById('cZip').value.trim();
            const eksp = document.getElementById('cEksp').value;
            if (!name || !phone || !addr || !city) { showToast('⚠ Lengkapi data pengiriman!'); return; }
            const oid = 'NR' + Date.now().toString().slice(-8);
            const now = new Date();
            const dstr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
            const tstr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
            const sub = calcSub(), total = Math.max(0, sub - promo);
            const ekspMap = { jne: 'JNE Regular', jnt: 'J&T Express', sicepat: 'SiCepat', sameday: 'Same Day' };
            const payMap = { gopay: 'GoPay', ovo: 'OVO', dana: 'Dana', bca: 'Transfer BCA', mandiri: 'Mandiri', cod: 'COD' };
            const widths = [2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 3, 2, 1, 1, 3, 2, 1, 2, 3, 1, 2, 1, 1, 3, 2, 3, 1, 2, 1, 3, 2, 1, 2, 1, 3];
            const bars = widths.map(w => `<div class="s-bar" style="width:${w + 1}px;height:${32 + Math.floor(Math.random() * 14)}px;opacity:${.65 + Math.random() * .35}"></div>`).join('');
            document.getElementById('strukInner').innerHTML = `
  <div class="s-brand"><div class="s-brand-name">NOIR<em>.</em></div><div class="s-brand-sub">Premium Fashion Store · Est. 2018</div></div>
  <div class="s-dash"></div>
  <div class="s-meta">
    <div class="s-meta-row"><span>No. Order</span><span><strong>${oid}</strong></span></div>
    <div class="s-meta-row"><span>Tanggal</span><span>${dstr}</span></div>
    <div class="s-meta-row"><span>Waktu</span><span>${tstr} WIB</span></div>
    <div class="s-meta-row"><span>Pembayaran</span><span>${payMap[selPayMethod] || selPayMethod}</span></div>
    <div class="s-meta-row"><span>Ekspedisi</span><span>${ekspMap[eksp] || eksp}</span></div>
  </div>
  <div class="s-dash"></div>
  <div class="s-meta">
    <div class="s-meta-row"><span>Penerima</span><span><strong>${name}</strong></span></div>
    <div class="s-meta-row"><span>WhatsApp</span><span>${phone}</span></div>
    ${email ? `<div class="s-meta-row"><span>Email</span><span>${email}</span></div>` : ''}
    <div style="margin-top:.4rem;font-size:.72rem;color:#666;line-height:1.65;">${addr}, ${city} ${zip || ''}</div>
  </div>
  <div class="s-dash"></div>
  <div class="s-section-label">Detail Produk</div>
  ${cart.map(it => { const pn = parseInt((it.price || '0').replace(/[^0-9]/g, '')); return `<div class="s-item"><span class="s-item-name">${it.name}${it.variant ? ` (${it.variant})` : ''}</span><span class="s-item-qty">×${it.qty}</span><span class="s-item-price">${fmt(pn * it.qty)}</span></div>`; }).join('')}
  <div class="s-solid"></div>
  <div class="s-sub-row"><span>Subtotal</span><span>${fmt(sub)}</span></div>
  <div class="s-sub-row"><span>Ongkos kirim</span><span style="font-weight:700;color:#3d5c45;">GRATIS</span></div>
  ${promo ? `<div class="s-sub-row" style="color:#c4555a;"><span>Diskon Promo</span><span>-${fmt(promo)}</span></div>` : ''}
  <div class="s-total-band"><span class="lbl">Total Bayar</span><span class="amt">${fmt(total)}</span></div>
  <div class="s-dash"></div>
  <div class="s-barcode"><div class="s-bars">${bars}</div><div class="s-barnum">${oid} · ${dstr.replace(/ /g, '-')}</div></div>
  <div class="s-dash"></div>
  <div class="s-thanks"><strong>Thank You ✦</strong><p>Pesananmu sedang diproses.<br>Kami akan konfirmasi via WhatsApp.<br>Happy Shopping!</p></div>`;
            closeCheckout();
            document.getElementById('strukVeil').classList.add('on');
            cart = []; promo = 0; renderCart();
        }
        function closeStruk() { document.getElementById('strukVeil').classList.remove('on'); }

        /* ════ MISC ════ */
        function wishIt(btn) {
            const svg = btn.querySelector('svg path');
            const isLiked = svg.getAttribute('fill') === '#0a0a0a';
            svg.setAttribute('fill', isLiked ? 'none' : '#0a0a0a');
            showToast(isLiked ? '♡ Dihapus dari wishlist' : '♥ Ditambahkan ke wishlist');
        }
        function showToast(msg) {
            const t = document.getElementById('toastEl');
            t.textContent = msg; t.classList.add('on');
            clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('on'), 2800);
        }

        /* COUNTDOWN */
        (() => {
            const e = new Date(); e.setDate(e.getDate() + 3); e.setHours(14, 28, 45, 0);
            const p = n => String(Math.floor(n)).padStart(2, '0');
            function tick() {
                const d = e - new Date(); if (d <= 0) return;
                const dEl = document.getElementById('cdD');
                const hEl = document.getElementById('cdH');
                const mEl = document.getElementById('cdM');
                const sEl = document.getElementById('cdS');
                if (dEl) dEl.textContent = p(d / 86400000);
                if (hEl) hEl.textContent = p(d % 86400000 / 3600000);
                if (mEl) mEl.textContent = p(d % 3600000 / 60000);
                if (sEl) sEl.textContent = p(d % 60000 / 1000);
            }
            tick(); setInterval(tick, 1000);
        })();

        /* NAVBAR SCROLL */
        window.addEventListener('scroll', () => document.getElementById('nav').classList.toggle('up', scrollY > 30));

        /* NEWSLETTER */
        const newsBtn = document.getElementById('newsBtn');
        if (newsBtn) newsBtn.addEventListener('click', () => {
            const newsEmail = document.getElementById('newsEmail');
            const v = newsEmail.value.trim();
            if (!v || !v.includes('@')) { showToast('⚠ Email tidak valid'); return; }
            showToast('🎉 Voucher Rp 50.000 terkirim ke ' + v);
            newsEmail.value = '';
        });

        renderCart();

        const detailId = Number(new URLSearchParams(window.location.search).get('id'));
        if (currentPage === 'detail' && detailId) openProductDetail(detailId);

        Object.assign(window, { goPage, goPageFilter, closeSearch, openSearchFn, closeMobNav, openProductDetail, showToast, closeCart, openCart, addToCartDirect, wishIt, switchImg, selectColor, selectSize, toggleAccord, changeQty, addToCartFromDetail, toggleDetailWish, applyPromo, openCheckout, closeCheckout, selPay, placeOrder, closeStruk });

