    // Database Simulasi Platform Luar (Real-Time Dynamic Data)
        let ticketData = [
            {
                id: 1,
                operator: "Sinar Jaya Executive",
                category: "bus",
                origin: "Jakarta",
                dest: "Yogyakarta",
                depTime: "07:30 WIB",
                arrTime: "16:30 WIB",
                price: "Rp 480.000",
                platform: "Traveloka",
                platformColor: "bg-blue-600 text-white",
                btnBg: "bg-blue-600 hover:bg-blue-700 text-white",
                link: "https://www.traveloka.com/id-id/bus-and-shuttle",
                available: true,
                seats: 4
            },
            {
                id: 2,
                operator: "Argo Lawu Executive",
                category: "train",
                origin: "Jakarta",
                dest: "Yogyakarta",
                depTime: "08:00 WIB",
                arrTime: "14:00 WIB",
                price: "Rp 650.000",
                platform: "KAI Access",
                platformColor: "bg-orange-600 text-white",
                btnBg: "bg-orange-600 hover:bg-orange-700 text-white",
                link: "https://booking.kai.id",
                available: false,
                seats: 0
            },
            {
                id: 3,
                operator: "Sumber Alam Sleeper Bus",
                category: "bus",
                origin: "Jakarta",
                dest: "Yogyakarta",
                depTime: "18:30 WIB",
                arrTime: "04:00 WIB",
                price: "Rp 520.000",
                platform: "Tiket.com",
                platformColor: "bg-amber-400 text-slate-950",
                btnBg: "bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold",
                link: "https://www.tiket.com/bus-travel",
                available: true,
                seats: 2
            },
            {
                id: 4,
                operator: "DayTrans Executive Shuttle",
                category: "shuttle",
                origin: "Bandung",
                dest: "Surabaya",
                depTime: "10:00 WIB",
                arrTime: "21:00 WIB",
                price: "Rp 350.000",
                platform: "RedBus",
                platformColor: "bg-rose-600 text-white",
                btnBg: "bg-rose-600 hover:bg-rose-700 text-white",
                link: "https://www.redbus.id",
                available: true,
                seats: 7
            },
            {
                id: 5,
                operator: "Taksaka Luxury Train",
                category: "train",
                origin: "Jakarta",
                dest: "Yogyakarta",
                depTime: "21:00 WIB",
                arrTime: "03:30 WIB",
                price: "Rp 1.200.000",
                platform: "Pegipegi / KAI",
                platformColor: "bg-teal-600 text-white",
                btnBg: "bg-teal-600 hover:bg-teal-700 text-white",
                link: "https://booking.kai.id",
                available: false,
                seats: 0
            }
        ];

        let selectedCategory = 'all';

        function setMode(cat) {
            selectedCategory = cat;
            document.querySelectorAll('.mode-tab').forEach(btn => {
                btn.classList.remove('bg-brand-600', 'text-white');
                btn.classList.add('bg-slate-800', 'text-slate-400');
            });
            event.currentTarget.classList.remove('bg-slate-800', 'text-slate-400');
            event.currentTarget.classList.add('bg-brand-600', 'text-white');
            renderTickets();
        }

        function renderTickets() {
            const container = document.getElementById('tickets-container');
            const origin = document.getElementById('origin-select').value;
            const dest = document.getElementById('dest-select').value;
            const statusFilter = document.getElementById('status-select').value;

            let filtered = ticketData.filter(t => {
                const matchCat = (selectedCategory === 'all' || t.category === selectedCategory);
                const matchOrigin = (origin === 'all' || t.origin.toLowerCase().includes(origin.toLowerCase()));
                const matchDest = (dest === 'all' || t.dest.toLowerCase().includes(dest.toLowerCase()));
                const matchStatus = (statusFilter === 'all' || (statusFilter === 'available' && t.available) || (statusFilter === 'soldout' && !t.available));
                return matchCat && matchOrigin && matchDest && matchStatus;
            });

            // Update stats
            const countAvailable = ticketData.filter(t => t.available).length;
            const countSoldOut = ticketData.filter(t => !t.available).length;
            document.getElementById('stat-available').innerText = `${countAvailable} Rute`;
            document.getElementById('stat-soldout').innerText = `${countSoldOut} Rute`;
            document.getElementById('total-count-badge').innerText = `${filtered.length} Rute Ditemukan`;

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-2">
                        <i class="fa-solid fa-folder-open text-3xl text-slate-600"></i>
                        <p class="text-sm font-bold text-slate-300">Tidak ada rute yang cocok dengan filter Anda.</p>
                        <p class="text-xs text-slate-500">Coba ubah opsi kota asal, tujuan, atau kategori transportasi.</p>
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(t => {
                if (t.available) {
                    return `
                        <div class="bg-slate-900 hover:bg-slate-850 border-2 border-emerald-500/40 hover:border-emerald-500 rounded-2xl p-5 transition shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div class="space-y-2">
                                <div class="flex flex-wrap items-center gap-2">
                                    <span class="${t.platformColor} text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">Ref: ${t.platform}</span>
                                    <span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1.5">
                                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> TERSEDIA (${t.seats} KURSI SISA)
                                    </span>
                                </div>
                                <h3 class="font-bold text-lg text-white font-['Space_Grotesk']">${t.operator}</h3>
                                <p class="text-xs text-slate-400 flex items-center gap-2">
                                    <span><i class="fa-regular fa-clock text-brand-500 mr-1"></i> Keberangkatan: <b>${t.depTime}</b></span>
                                    <span>•</span>
                                    <span>${t.origin} &rarr; ${t.dest}</span>
                                </p>
                            </div>
                            <div class="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800 justify-between md:justify-end">
                                <div class="text-left md:text-right">
                                    <span class="text-[10px] text-slate-400 block">Harga di ${t.platform}:</span>
                                    <span class="text-xl font-extrabold text-brand-400 font-['Space_Grotesk']">${t.price}</span>
                                </div>
                                <a href="${t.link}" target="_blank" class="${t.btnBg} text-xs px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2 shrink-0">
                                    <span>Buka di ${t.platform}</span>
                                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                                </a>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="bg-slate-950/60 border border-rose-500/30 rounded-2xl p-5 transition opacity-75 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div class="space-y-2">
                                <div class="flex flex-wrap items-center gap-2">
                                    <span class="bg-slate-800 text-slate-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Ref: ${t.platform}</span>
                                    <span class="bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                                        🔴 HABIS (SOLD OUT)
                                    </span>
                                </div>
                                <h3 class="font-bold text-lg text-slate-400 line-through font-['Space_Grotesk']">${t.operator}</h3>
                                <p class="text-xs text-slate-500 flex items-center gap-2">
                                    <span><i class="fa-regular fa-clock text-slate-600 mr-1"></i> Keberangkatan: ${t.depTime}</span>
                                    <span>•</span>
                                    <span>${t.origin} &rarr; ${t.dest}</span>
                                </p>
                            </div>
                            <div class="flex items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800/50 justify-between md:justify-end">
                                <div class="text-left md:text-right">
                                    <span class="text-[10px] text-slate-500 block">Harga Terakhir:</span>
                                    <span class="text-xl font-bold text-slate-500 font-['Space_Grotesk']">${t.price}</span>
                                </div>
                                <button disabled class="bg-slate-800 text-slate-500 font-bold text-xs px-5 py-3 rounded-xl cursor-not-allowed flex items-center gap-1.5 shrink-0">
                                    <i class="fa-solid fa-ban text-xs"></i>
                                    <span>HABIS / SOLD OUT</span>
                                </button>
                            </div>
                        </div>
                    `;
                }
            }).join('');
        }

        // SIMULATOR AUTO-SYNC REAL-TIME DATA (Setiap 7 Detik)
        function startRealTimeSync() {
            setInterval(() => {
                // Pick random item to change status or seat count
                const randomIndex = Math.floor(Math.random() * ticketData.length);
                const item = ticketData[randomIndex];

                if (item.available) {
                    if (item.seats > 1) {
                        item.seats -= 1;
                    } else {
                        item.available = false;
                        item.seats = 0;
                    }
                } else {
                    // Coba buka kembali (simulasi ada pemudik yang batal/refund)
                    item.available = true;
                    item.seats = Math.floor(Math.random() * 3) + 1;
                }

                // Update UI timestamp & tickets
                const now = new Date();
                const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';
                document.getElementById('last-sync-time').innerText = timeStr;

                renderTickets();
            }, 7000);
        }

        // Initial Render
        renderTickets();
        startRealTimeSync();