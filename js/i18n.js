/* RED2 languages. HTML is Spanish (default). EN and RU need a native proofread. */
(()=>{
const EN={
'nav.gallery':'Auto Gallery','nav.service':'Car Service','nav.club':'Auto Club','nav.sourcing':'Sourcing','nav.contacts':'Contact',
'mega.stock':'In stock','mega.prices':'Prices','mega.book':'Book a visit','mega.how':'How it works',
'ft.tel':'Phones','phone.g':'Auto Gallery','phone.s':'Car Service','wa.write':'Message on WhatsApp','wa.ask':'Ask on WhatsApp','testdrive':'Book a test drive',
'mnav.home':'Home','burger':'Menu',
'hero.1':'Faster','hero.2':'than all','hero.3':'in Marbella.','hero.sub':'Auto Gallery and car service in Marbella.','hero.side':'Gallery and workshop of Spain’s two-time drag champion.',
'lane.buy':'Buy a car','lane.buy.s':'46 in stock','lane.svc':'Service','lane.svc.s':'Booked within 24 h',
'duo.h':'Buy here — <em>serviced</em> here.','duo.k':'Two lanes','duo.n1':'Lane 1','duo.n1b':'Auto Gallery','duo.n2':'Lane 2','duo.n2b':'Car Service',
'duo.gh':'<em>Auto</em> gallery','duo.g1':'46 cars in stock','duo.g2':'12-month warranty','duo.g3':'Finance','duo.g4':'Trade-in','duo.go':'Showroom · Calle Fragua 20',
'duo.sh':'Service','duo.s1':'Servicing and mechanics','duo.s2':'PPF and detailing','duo.s3':'3D alignment · from 90 €','duo.s4':'Electrics','duo.s5':'Tuning','duo.so':'Workshop · C. Platino 1',
'owner.k':'Owner','owner.name':'Vitalii<br>Boiko','owner.t':'Champion<br>of <em>Spain</em>','owner.s':'drag racing','owner.p':'Vitalii Boiko, two-time Spanish drag champion. Client cars are prepared by the same people who line up at the start.',
'slip.g':'Auto gallery','slip.s':'Workshop','slip.l':'Lifts, alignment included','slip.c':'Cars in stock','slip.lang':'Languages',
'why.k':'Why RED2','why.h':'Calm <em>at speed</em>',
'why.1h':'Our own workshop next door','why.1p':'Showroom and workshop are one team. Before you buy, our mechanics can look at the car.',
'why.2h':'12-month warranty','why.2p':'On cars from the showroom, under RED2 Auto Gallery terms.',
'why.3h':'Finance and trade-in','why.3p':'Finance, purchase and part-exchange in one place.',
'why.lang':'languages: ES · EN · RU','why.rev':'Google reviews · Auto Gallery','why.m':'m² of site','why.book':'service booking',
'box.k':'Workshop','box.h':'RED2 <em>bays</em>','box.a':'All services',
'box.1h':'PPF and detailing','box.1p':'Priority: Costa del Sol sun and salt eat the clear coat.',
'box.2h':'Servicing and mechanics','box.2p':'Manufacturer schedule, OEM diagnostics ODIS · PIWIS · ISTA.',
'box.3h':'3D alignment · from 90 €','box.3p':'Done in 40–90 minutes.',
'box.4h':'Auto electrics','box.4p':'Wiring, control units, ADAS, CarPlay. Electrical diagnosis from 50 €.',
'box.5h':'Tuning and exhaust','box.5p':'Stage 1–3, custom exhaust, track and drag prep. From 500 €.',
'club.k':'Auto Club','club.h':'An auto club for people who <em>race</em>.','club.lead':'RED2’s drag club: launch prep, track days, and the same mechanics who look after the showroom cars.','club.more':'Full auto club',
'club.a.k':'Track days','club.a.h':'Almería, with marshals and catering','club.a.p':'Closed track outings for RED2 clients.',
'club.b.k':'Drag · RED2 Racing','club.b.h':'Built to leave the line','club.b.p':'Suspension, tyres, calibration, clutch — what we do on our own cars.',
'club.1b':'Dyno','club.1s':'A separate page. Coming soon to Marbella.','club.2b':'Storage','club.2s':'Closed, guarded parking','club.3b':'Events','club.3s':'Club meetings in the showroom','club.4b':'Padel','club.4s':'Under the RED2 name',
'dyno.k':'Dyno','dyno.h':'Coming soon <em>to Marbella</em>','dyno.p':'A roller dyno for power figures before and after tuning and race prep. Opening in Marbella.','dyno.a':'Dyno page','dyno.cap':'Dyno',
'ct.k':'Contacts','ct.h':'Where to <em>find</em> us','ct.sub':'Auto Gallery and car service in Marbella.',
'ct.gh':'Auto Gallery','ct.gp':'Calle Fragua 20, corner of C. Granito<br>San Pedro de Alcántara, Marbella','ct.gw':'WhatsApp',
'ct.sh':'Car Service','ct.sp':'C. Platino 1, 29603<br>Mon–Fri 9–19 · Sat 10–14','ct.sw':'WhatsApp',
'ct.note':'Phone numbers are TODO. We do not invent them.',
'ft.h':'The finish is here.<br>The <em>start</em> is yours.','ft.g':'Auto gallery','ft.s':'Service','ft.hours':'Hours','ft.soc':'Social',
'ft.h1':'Mon–Fri 9:00–19:00','ft.h2':'Sat 10:00–14:00',
'ft.legal':'© 2026 RED2 · San Pedro de Alcántara, Marbella','ft.demo':'NetWorX demo · not indexed',
'ft.proof':'ES and EN copy is a draft and still needs a native proofread.',
'dock.pick':'Choose a car','dock.book':'Book',
'gal.k':'RED2 Auto Gallery · Showroom','gal.h':'Cars that <em>start something.</em>','gal.cta':'See 46 cars','gal.bot':'Choose with the assistant',
'gal.m1':'in stock','gal.m2':'warranty','gal.m3n':'Workshop','gal.m3':'under the same roof',
'gal.sort':'Sort','gal.f':'Filters','gal.mo':'months','gal.all':'All','gal.note':'Showing 12 of 46 cars from red2.es as of 21.10.2026. In the full version the catalogue and the Reserved / Sold states come from Dealcar.','flt.clear':'Clear all','flt.show':'Show','flt.cars':'cars','flt.brand':'Brand','flt.body':'Body','flt.fuel':'Fuel','flt.budget':'Budget','flt.year':'Year','flt.suv':'SUV','flt.sedan':'Saloon','flt.cab':'Convertible','flt.coupe':'Coupe','flt.gas':'Petrol','flt.phev':'Plug-in hybrid','flt.hyb':'Hybrid','flt.p1':'up to €80k','flt.p2':'€80–120k','flt.p3':'€120–200k','flt.p4':'from €200k','flt.y1':'2024 or later','flt.y2':'2022 or later','flt.y3':'2018 or later','sp.phev':'Plug-in hybrid','sp.gas':'Petrol','sp.hyb':'Hybrid','sp.suv':'SUV','sp.sedan':'Saloon','sp.cab':'Convertible','sp.road':'Roadster','sp.coupe':'Coupe','sp.lift':'Liftback','sp.auto':'Automatic','sell.lead':'No-obligation valuation. We buy the car in any condition and mileage, or take it off the price of one from our stock.','sell.brand':'Make and model','sell.year':'Year','sell.km':'Mileage, km','sell.want':'What you want','sell.trade':'Part-exchange','sell.cash':'Sell','sell.btn':'Ask for a valuation','sell.free':'free',
'sort.def':'Recommended','sort.pd':'Price ↓','sort.pa':'Price ↑','sort.y':'Newest first','sort.km':'Lowest mileage','sort.cv':'Power ↓',
'empty.h':'That car is not on the floor right now.','empty.p':'Sourcing has its own page, with a draft of the Marbella car-search service.','empty.a':'Sourcing','empty.r':'Reset filters','rail.end':'The whole<br><em style="color:#fff">showroom</em> →',
'step.h':'From the call to the keys — <em>four steps</em>','step.k':'How it works',
'step.1h':'Choice','step.1p':'Showroom or a video walkaround on WhatsApp — in Spanish, English or Russian.',
'step.2h':'Check','step.2p':'Diagnostics in our own workshop and the service history.',
'step.3h':'Money','step.3p':'Finance, trade-in of your car, paperwork. No calculator on the card.',
'step.4h':'Keys','step.4p':'12-month warranty and our workshop — where you bought the car.',
'sell.k':'Sell or trade','sell.h':'Your car — <em>part of the payment.</em>',
'sell.ok':'Request ready. Gallery WhatsApp is TODO, so nothing is sent.',
'card.more':'See the details','card.km':'Mileage','card.year':'Year','card.eng':'Engine','card.pow':'Power','lead.btn':'See the details…','show.k':'Showroom','show.h':'Now <em>on the floor</em>','show.a':'All 46','rail.more':'38 more in stock','slip.q':'One team: from purchase to every service.','slip.by':'— Vitalii Boiko','rev.h':'<em>Reviews</em>','rev.k':'Reviews','rev.note':'Read our clients’ reviews on Google.','rev.ph':'A Google review will appear here.','rev.btn':'Reviews on Google','rev.all':'All reviews on Google','rev.more':'more','rev.less':'less','rev.orig':'Show original','rev.tr':'Show translation','rail.hint':'← SWIPE →','hero.tag':'FIG. 01 — RED2 · MARBELLA','hero.staged':'STAGED','rev.prev':'Previous','rev.next':'Next','slip.h':'RED2 · TIME SLIP','slip.lane':'LANE 2','mq.1':'Drag','mq.2':'Track days','mq.3':'Dyno','mq.4':'Storage','mq.5':'Autoclub RED2',
'lead.title':'See the <em>details</em>','lead.p':'Tell us what you want to know. Gallery WhatsApp is still TODO: this form does not leave the browser.','lead.todo':'TODO: gallery WhatsApp number. We are not inventing a phone number.','lead.name':'Name','lead.tel':'Phone','lead.cm':'Comment',
'lead.ok':'Received. WhatsApp is TODO, so the request stays in the browser.',
'svc.k':'RED2 Auto Space · Workshop · Marbella','svc.h':'Pit lane<br>for <em>your</em><br>horses.','svc.one':'Multi-brand workshop for premium cars. Booked within 24 hours.',
'svc.book':'Book','svc.what':'What’s wrong?',
'pick.k':'In 10 seconds','pick.h':'What <em>worries you?</em>','pick.ph':'Pick a symptom — we’ll say what it needs and how long it takes.',
'pr.k':'From prices','pr.h':'From prices, <em>in euros</em>','pr.assume':'“From” amounts are in euros — the currency is assumed, not confirmed. Electrical diagnosis is the diagnosis price, not a full electrical repair. Every job gets a written fixed estimate before work starts.',
'pre.h':'A fixed estimate on every job','pre.p':'Presupuesto fijo before we start. Nothing extra without your yes. Each job is quoted on its own.',
'lift.p':'lifts, alignment included',
'book.k':'Online booking','book.h':'A booking <em>in 30 seconds</em>','book.p':'Service, day and time. A manager will confirm on WhatsApp, in your language, once the number exists.',
'book.note':'Demo: the form does not send data anywhere.','book.todo':'Service WhatsApp: TODO. The request does not leave the browser.','book.ok':'request','book.wa':'Duplicate on WhatsApp',
'rec.k':'We suggest','rec.time':'Time','rec.price':'Price','rec.book':'Book this','rec.more':'More',
'faq.h':'The short <em>version</em>',
'dyno.page':'Power <em>bench</em>','club.page':'Auto<em>club</em>',
'bot.open':'Ask RED2','bot.hi':'Hi! I\'m the RED2 concierge 👋 Ask me about cars in stock, service and prices.',
'pod.k':'Car sourcing','pod.h':'A car <em>found</em> for you','pod.lead':'If it is not on the gallery floor, we look for it. RED2 finds a specific car in Spain or elsewhere in Europe, checks it in our Marbella workshop, and agrees a closed figure before money moves.',
'pod.what.h':'What <em>it is</em>','pod.what.p':'A search for someone who already knows the car: brand, year, mileage and how they will use it on the Costa del Sol. This is not a generic “we import from the EU” banner. It is a brief, a shortlist, an inspection and a handover in San Pedro.',
'pod.how.h':'How it <em>works</em>','pod.s1':'Brief. Budget, body, fuel and what the car is for.','pod.s2':'Shortlist. Within a few days: options with photos, history and an estimated price, landed in Marbella when transport applies.','pod.s3':'Inspection. At origin when we can, and always a check in RED2 Auto Space before you keep the car.','pod.s4':'Closed estimate. Purchase, transport, paperwork and ITV if needed, in writing, before you pay.','pod.s5':'Handover. At the gallery, Calle Fragua 20, or wherever we agree. The workshop stays at C. Platino 1 for whatever comes next.',
'pod.who.h':'Who it is <em>for</em>','pod.who.p':'People who live in Marbella, or who buy from abroad and do not want to tour dealerships. We speak Spanish, English and Russian. The gallery phone is still TODO: leave yours on the form.',
'pod.note':'Draft copy for the client to edit. The 12-month warranty is the gallery’s warranty on showroom cars, not an automatic promise on every car found outside. Sourcing fees are not published until the client confirms them. Amounts on the workshop page are in euros until the currency is confirmed.',
'pod.ask.h':'Ask for a <em>search</em>','pod.ph':'Brand, budget, year',
'pod.slot':'Photo slot · swap the file, keep data-photo'
};
const RU={
'nav.gallery':'Автогалерея','nav.service':'Автосервис','nav.club':'Автоклуб','nav.sourcing':'Автоподбор','nav.contacts':'Контакты',
'mega.stock':'В наличии','mega.prices':'Цены','mega.book':'Записаться','mega.how':'Как это устроено',
'ft.tel':'Телефоны','phone.g':'Автогалерея','phone.s':'Автосервис','wa.write':'Написать в WhatsApp','wa.ask':'Спросить в WhatsApp','testdrive':'Записаться на тест-драйв',
'mnav.home':'Главная','burger':'Меню',
'hero.1':'Быстрее','hero.2':'всех','hero.3':'в Марбелье.','hero.sub':'Автогалерея и автосервис в Марбелье.','hero.side':'Автогалерея и автосервис команды чемпиона Испании по драгу.',
'lane.buy':'Купить авто','lane.buy.s':'46 в наличии','lane.svc':'Автосервис','lane.svc.s':'Запись за 24 ч',
'duo.h':'Купили у нас — <em>обслуживаетесь</em> у нас.','duo.k':'Две полосы','duo.n1':'Полоса 1','duo.n1b':'Автогалерея','duo.n2':'Полоса 2','duo.n2b':'Автосервис',
'duo.gh':'Автогалерея','duo.g1':'46 авто в наличии','duo.g2':'Гарантия 12 мес.','duo.g3':'Финансирование','duo.g4':'Трейд‑ин','duo.go':'Шоурум · Calle Fragua 20',
'duo.sh':'Автосервис','duo.s1':'ТО и механика','duo.s2':'PPF и детейлинг','duo.s3':'Развал 3D · от 90 €','duo.s4':'Электрика','duo.s5':'Тюнинг','duo.so':'Автосервис · C. Platino 1',
'owner.k':'Владелец','owner.name':'Виталий<br>Бойко','owner.t':'Чемпион<br><em>Испании</em>','owner.s':'драг-рейсинг','owner.p':'Виталий Бойко — двукратный чемпион Испании по драг-рейсингу. Машины клиентов готовят те же люди, которые сами выходят на старт.',
'slip.g':'Автогалерея','slip.s':'Автосервис','slip.l':'Подъёмники, включая развал','slip.c':'Авто в наличии','slip.lang':'Языки',
'why.k':'Почему RED2','why.h':'Спокойствие <em>на скорости</em>',
'why.1h':'Свой сервис рядом','why.1p':'Шоурум и техцентр — одна команда. Перед покупкой машину можно показать нашим механикам.',
'why.2h':'Гарантия 12 месяцев','why.2p':'На автомобили из шоурума — по условиям RED2 Auto Gallery.',
'why.3h':'Финансирование и трейд‑ин','why.3p':'Кредит, выкуп и зачёт вашего автомобиля — в одном месте.',
'why.lang':'языка: ES · EN · RU','why.rev':'отзыва Google · Auto Gallery','why.m':'м² территории','why.book':'запись в сервис',
'box.k':'Техцентр','box.h':'Боксы <em>RED2</em>','box.a':'Все услуги',
'box.1h':'PPF и детейлинг','box.1p':'Приоритет: солнце и солёный воздух Коста-дель-Соль съедают лак.',
'box.2h':'ТО и механика','box.2p':'Регламент производителя, OEM-диагностика ODIS · PIWIS · ISTA.',
'box.3h':'Развал 3D · от 90 €','box.3p':'Развал за 40–90 минут.',
'box.4h':'Автоэлектрика','box.4p':'Проводка, блоки, ADAS, CarPlay. Диагностика электрики от 50 €.',
'box.5h':'Тюнинг и выхлоп','box.5p':'Stage 1–3, выхлоп на заказ, подготовка к треку и драгу. От 500 €.',
'club.k':'Автоклуб','club.h':'Автоклуб для тех, кто <em>ездит</em>.','club.lead':'Драг-клуб RED2: подготовка к старту, трек-дни и те же механики, что смотрят автомобили в шоуруме.','club.more':'Весь автоклуб',
'club.a.k':'Трек-дни','club.a.h':'Альмерия, с маршалами и кейтерингом','club.a.p':'Закрытые выезды на трек для клиентов RED2.',
'club.b.k':'Драг · RED2 Racing','club.b.h':'Подготовка к старту','club.b.p':'Подвеска, резина, прошивка, сцепление — то, что мы делаем для своих машин.',
'club.1b':'Диностенд','club.1s':'Отдельная страница. Скоро в Марбелье.','club.2b':'Хранение','club.2s':'Закрытая охраняемая парковка','club.3b':'События','club.3s':'Встречи клуба в шоуруме','club.4b':'Падел','club.4s':'Под брендом RED2',
'dyno.k':'Диностенд','dyno.h':'Скоро <em>в Марбелье</em>','dyno.p':'Роликовый стенд для замера мощности до и после тюнинга и гоночной подготовки. Открываем в Марбелье.','dyno.a':'Страница стенда','dyno.cap':'Диностенд',
'ct.k':'Контакты','ct.h':'Где нас <em>найти</em>','ct.sub':'Автогалерея и автосервис в Марбелье.',
'ct.gh':'Автогалерея','ct.gp':'Calle Fragua 20, угол C. Granito<br>Сан-Педро-де-Алькантара, Марбелья','ct.gw':'WhatsApp',
'ct.sh':'Автосервис','ct.sp':'C. Platino 1, 29603<br>Пн–Пт 9–19 · Сб 10–14','ct.sw':'WhatsApp',
'ct.note':'Телефоны — TODO. Номера не выдумываем.',
'ft.h':'Финиш здесь.<br><em>Старт</em> — за вами.','ft.g':'Автогалерея','ft.s':'Автосервис','ft.hours':'Часы','ft.soc':'Соцсети',
'ft.h1':'Пн–Пт 9:00–19:00','ft.h2':'Сб 10:00–14:00',
'ft.legal':'© 2026 RED2 · Сан-Педро-де-Алькантара, Марбелья','ft.demo':'Демо NetWorX · не индексируется',
'ft.proof':'Тексты ES и EN — черновик, нужна вычитка носителем.',
'dock.pick':'Подобрать авто','dock.book':'Записаться',
'gal.k':'RED2 Auto Gallery · Шоурум','gal.h':'Машины, которые <em>заводят.</em>','gal.cta':'Смотреть 46 авто','gal.bot':'Подобрать с ассистентом',
'gal.m1':'в наличии','gal.m2':'гарантия','gal.m3n':'Сервис','gal.m3':'в том же доме',
'gal.sort':'Сортировка','gal.f':'Фильтры','gal.mo':'мес.','gal.all':'Все','gal.note':'Показаны 12 из 46 авто с red2.es на 21.10.2026. В полной версии каталог и статусы «Резерв / Продано» приходят из Dealcar.','flt.clear':'Сбросить всё','flt.show':'Показать','flt.cars':'авто','flt.brand':'Марка','flt.body':'Кузов','flt.fuel':'Топливо','flt.budget':'Бюджет','flt.year':'Год','flt.suv':'Внедорожник','flt.sedan':'Седан','flt.cab':'Кабриолет','flt.coupe':'Купе','flt.gas':'Бензин','flt.phev':'Плагин-гибрид','flt.hyb':'Гибрид','flt.p1':'до 80 тыс. €','flt.p2':'80–120 тыс. €','flt.p3':'120–200 тыс. €','flt.p4':'от 200 тыс. €','flt.y1':'2024 и новее','flt.y2':'2022 и новее','flt.y3':'2018 и новее','sp.phev':'Плагин-гибрид','sp.gas':'Бензин','sp.hyb':'Гибрид','sp.suv':'Внедорожник','sp.sedan':'Седан','sp.cab':'Кабриолет','sp.road':'Родстер','sp.coupe':'Купе','sp.lift':'Лифтбек','sp.auto':'Автомат','sell.lead':'Оценка без обязательств. Выкупаем машину в любом состоянии и с любым пробегом или засчитываем её в стоимость авто из наличия.','sell.brand':'Марка и модель','sell.year':'Год','sell.km':'Пробег, км','sell.want':'Что хотите','sell.trade':'В зачёт','sell.cash':'Продать','sell.btn':'Запросить оценку','sell.free':'бесплатно',
'sort.def':'Рекомендуем','sort.pd':'Цена ↓','sort.pa':'Цена ↑','sort.y':'Сначала новые','sort.km':'Меньше пробег','sort.cv':'Мощность ↓',
'empty.h':'Такой машины сейчас нет в зале.','empty.p':'Автоподбор — отдельная страница, с черновиком услуги поиска автомобиля в Марбелье.','empty.a':'Автоподбор','empty.r':'Сбросить фильтры','rail.end':'Весь<br><em style="color:#fff">шоурум</em> →',
'step.h':'От звонка до ключей — <em>четыре шага</em>','step.k':'Как это работает',
'step.1h':'Выбор','step.1p':'Шоурум или видеообзор в WhatsApp — на испанском, английском или русском.',
'step.2h':'Проверка','step.2p':'Диагностика в собственном техцентре и история обслуживания.',
'step.3h':'Финансы','step.3p':'Финансирование, трейд‑ин, документы. Калькулятора на карточке нет.',
'step.4h':'Ключи','step.4p':'Гарантия 12 месяцев и свой сервис — там же, где купили.',
'sell.k':'Продать или обменять','sell.h':'Ваша машина — <em>часть оплаты.</em>',
'sell.ok':'Заявка подготовлена. WhatsApp галереи — TODO, ничего не отправляется.',
'card.more':'Узнать детали','card.km':'Пробег','card.year':'Год','card.eng':'Двигатель','card.pow':'Мощность','lead.btn':'Узнать детали…','show.k':'Шоурум','show.h':'Сейчас <em>в зале</em>','show.a':'Все 46','rail.more':'Ещё 38 в наличии','slip.q':'Одна команда: от покупки авто до каждого ТО.','slip.by':'— Виталий Бойко','rev.h':'<em>Отзывы</em>','rev.k':'Отзывы','rev.note':'Читайте отзывы наших клиентов в Google.','rev.ph':'Отзыв из Google появится здесь.','rev.btn':'Отзывы в Google','rev.all':'Все отзывы в Google','rev.more':'ещё','rev.less':'свернуть','rev.orig':'Показать оригинал','rev.tr':'Показать перевод','rail.hint':'← ЛИСТАЙТЕ →','hero.tag':'FIG. 01 — RED2 · МАРБЕЛЬЯ','hero.staged':'STAGED','rev.prev':'Назад','rev.next':'Дальше','slip.h':'RED2 · ПРОТОКОЛ','slip.lane':'ПОЛОСА 2','mq.1':'Драг','mq.2':'Трек-дни','mq.3':'Диностенд','mq.4':'Хранение','mq.5':'Автоклуб RED2',
'lead.title':'Узнать <em>детали</em>','lead.p':'Напишите, что хотите узнать. WhatsApp галереи всё ещё TODO: форма не уходит из браузера.','lead.todo':'TODO: номер WhatsApp галереи. Телефон не выдумываем.','lead.name':'Имя','lead.tel':'Телефон','lead.cm':'Комментарий',
'lead.ok':'Принято. Номер WhatsApp — TODO, заявка остаётся в браузере.',
'svc.k':'RED2 Auto Space · Автосервис · Марбелья','svc.h':'Пит-лейн<br>для <em>ваших</em><br>лошадей.','svc.one':'Мультибрендовый техцентр премиум-авто. Запись за 24 часа.',
'svc.book':'Записаться','svc.what':'Что с машиной?',
'pick.k':'За 10 секунд','pick.h':'Что <em>беспокоит?</em>','pick.ph':'Выберите симптом — подскажем, что нужно и сколько это занимает.',
'pr.k':'Цены от','pr.h':'Цены <em>от</em>, в евро','pr.assume':'Суммы «от» указаны в евро — валюту предполагаем, клиент её ещё не подтвердил. «Электрика (диагностика)» — это цена диагностики, не полного ремонта электрики. На каждую работу — фиксированная смета до старта.',
'pre.h':'Фиксированная смета на каждую работу','pre.p':'Presupuesto fijo до начала работ. Ничего лишнего без вашего «да». Смета своя на каждое обращение.',
'lift.p':'подъёмников, включая развал',
'book.k':'Онлайн-запись','book.h':'Запись <em>за 30 секунд</em>','book.p':'Услуга, день и время. Менеджер подтвердит в WhatsApp на вашем языке, когда номер будет.',
'book.note':'Демо: форма никуда не отправляет данные.','book.todo':'WhatsApp сервиса: TODO. Заявка не уходит из браузера.','book.ok':'заявка','book.wa':'Продублировать в WhatsApp',
'rec.k':'Рекомендуем','rec.time':'Срок','rec.price':'Цена','rec.book':'Записаться на это','rec.more':'Подробнее',
'faq.h':'Коротко <em>о главном</em>',
'dyno.page':'Дино<em>стенд</em>','club.page':'Авто<em>клуб</em>',
'bot.open':'Спросить RED2','bot.hi':'Привет! Я консьерж RED2 👋 Подскажу по авто в наличии, сервису и ценам — спрашивайте!',
'pod.k':'Автоподбор','pod.h':'Машина <em>под вас</em>','pod.lead':'Если её нет в зале, ищем. RED2 находит конкретный автомобиль в Испании или в Европе, проверяет его в своём техцентре в Марбелье и согласует закрытую сумму до того, как двигаются деньги.',
'pod.what.h':'Что <em>это</em>','pod.what.p':'Подбор для того, кто уже знает машину: марка, год, пробег и как её будут использовать на Коста-дель-Соль. Это не общая вывеска «привезём из ЕС». Это бриф, шорт-лист, осмотр и выдача в Сан-Педро.',
'pod.how.h':'Как это <em>идёт</em>','pod.s1':'Бриф. Бюджет, кузов, топливо и задача машины.','pod.s2':'Шорт-лист. За несколько дней: варианты с фото, историей и оценкой цены, с доставкой в Марбелью, если нужен перевоз.','pod.s3':'Осмотр. На месте, когда это возможно, и всегда проверка в RED2 Auto Space до того, как машина остаётся у вас.','pod.s4':'Закрытая смета. Покупка, перевоз, документы и ITV, если нужна, письменно, до оплаты.','pod.s5':'Выдача. В галерее, Calle Fragua 20, или где договоримся. Сервис остаётся на C. Platino 1.',
'pod.who.h':'Для <em>кого</em>','pod.who.p':'Кто живёт в Марбелье или покупает издалека и не хочет объезжать салоны. Говорим по-испански, по-английски и по-русски. Телефон галереи всё ещё TODO: оставьте свой в форме.',
'pod.note':'Черновик текста, клиент может заменить. Гарантия 12 месяцев — это гарантия галереи на машины из зала, не автоматическое обещание на каждый найденный снаружи автомобиль. Гонорар подбора не публикуем, пока клиент его не подтвердит. Суммы сервиса — в евро, пока валюта не подтверждена.',
'pod.ask.h':'Запросить <em>подбор</em>','pod.ph':'Марка, бюджет, год',
'pod.slot':'Слот фото · меняется файл, data-photo остаётся'
};
const DICT={en:EN,ru:RU};
function lang(){try{const v=localStorage.getItem('r2lang');if(v==='en'||v==='ru'||v==='es')return v;}catch(e){}
  return 'es';}
window.R2T=function(k,fb){const l=lang();if(l==='es'||!DICT[l])return fb==null?'':fb;const v=DICT[l][k];return v==null?(fb==null?'':fb):v;};
function apply(){
  let l=lang();
  document.documentElement.lang=l;
  if(l!=='es'){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const v=DICT[l][el.getAttribute('data-i18n')];
      if(v==null)return;
      if(el.hasAttribute('data-i18n-html'))el.innerHTML=v;else el.textContent=v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el=>{
      const v=DICT[l][el.getAttribute('data-i18n-aria')];
      if(v!=null)el.setAttribute('aria-label',v);
    });
  }
  document.querySelectorAll('.lang button').forEach(b=>{
    b.classList.toggle('on',b.dataset.lang===l);
    if(b.dataset.bound)return;b.dataset.bound='1';
    b.addEventListener('click',()=>{try{localStorage.setItem('r2lang',b.dataset.lang);}catch(e){}location.reload();});
  });
  document.documentElement.classList.remove('i18n-wait');
}
apply();
})();
