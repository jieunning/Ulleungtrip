// 울릉트립 공용 스크립트

// ── 홈 히어로 사진 슬라이드 (5초 간격) ──
(function () {
  var slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;
  var dots = document.querySelectorAll('.hero-dots span'), i = 0;
  setInterval(function () {
    i = (i + 1) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('show', k === i); });
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
  }, 5000);
})();

// ── AI 비서 카드 ──
function aiAsk(q) {
  var input = document.getElementById('aiInput');
  if (!input) return;
  q = q || input.value.trim();
  if (!q) return;
  input.value = q;
  var box = document.getElementById('aiAnswer'), t = document.getElementById('aiAnswerText'), html;
  if (/코스|일정|여행지|어디/.test(q)) {
    html = '처음이시라면 <b>2박 3일 핵심 일주 코스</b>를 추천드려요. 모노레일·케이블카·관음도·나리분지까지 담겨 있어요. <a href="courses.html">추천 코스 보러 가기 →</a>';
  } else if (/배|뱃|선박|시간표|결항|출항|여객/.test(q)) {
    html = '포항·강릉·묵호·후포에서 울릉도행 여객선이 출발해요. 포항 쾌속선 기준 약 3시간 30분이에요. 운항 여부는 기상에 따라 달라지니 예매 전 선사 공지를 확인하세요. <a href="info.html">뱃길 안내 →</a>';
  } else if (/독도/.test(q)) {
    html = '독도 여객선은 울릉도(저동항)에서 출발해요. 기상 조건에 따라 접안이 어려울 수 있어 일정 중반 배치를 추천드려요. <a href="info.html">자세히 보기 →</a>';
  } else if (/맛집|먹|음식|식당|홍합|칼국수|특산/.test(q)) {
    html = '울릉도에 오셨다면 <b>홍합밥</b>, <b>따개비칼국수</b>, <b>약소불고기</b>는 꼭 드셔보세요. <a href="food.html">먹거리·특산물 →</a>';
  } else if (/숙소|호텔|펜션|민박|잘 곳/.test(q)) {
    html = '도동·저동 시가지 숙소는 이동이 편하고, 북면 오션뷰 펜션은 전망이 좋아요. <a href="stay.html">숙박 가이드 →</a>';
  } else if (/날씨|기상|파고/.test(q)) {
    html = '울릉도 날씨는 변덕이 심해요. 여행 전 기상청 해상예보와 선사 운항 공지를 함께 확인하는 걸 추천드려요. <a href="info.html">여행 정보 →</a>';
  } else {
    html = '지금은 프로토타입이라 간단한 안내만 가능해요. <b>코스·배편·독도·맛집·숙소</b>에 대해 물어봐 주세요!';
  }
  t.innerHTML = html;
  box.classList.add('show');
}
(function () {
  var input = document.getElementById('aiInput');
  if (!input) return;
  input.addEventListener('keydown', function (e) { if (e.key === 'Enter') aiAsk(); });
})();

// ── 액티비티 영상 슬라이더 ──
(function () {
  var v = document.getElementById('actPlayer');
  if (!v) return;
  var VIDEOS = [
    { src: 'videos/activity.mp4',  t: '여기가 울릉 국민 수영장', s: '바위에서 퐁당! 에메랄드 천연 풀장' },
    { src: 'videos/activity2.mp4', t: '튜브 하나면 준비 끝',     s: '발 아래가 다 보이는 유리알 바다' },
    { src: 'videos/activity3.mp4', t: '바닷속은 더 난리남',      s: '수경 쓰고 만나는 울릉 수중 세상' },
    { src: 'videos/activity4.mp4', t: '3초 망설이고, 풍덩',      s: '심장이 먼저 시원해지는 다이빙 포인트' },
    { src: 'videos/activity5.mp4', t: '오늘 일정: 둥둥 떠 있기', s: '파도에 맡기는 완벽한 물멍 타임' }
  ];
  var i = 0;
  var capT = document.getElementById('actCapT'), capS = document.getElementById('actCapS');
  var prog = document.getElementById('actProg'), tog = document.getElementById('actToggle');
  function setTog(playing) { tog.textContent = playing ? '❚❚' : '▶'; }
  function load(n) {
    i = (n + VIDEOS.length) % VIDEOS.length;
    v.src = VIDEOS[i].src;
    capT.textContent = VIDEOS[i].t;
    capS.textContent = VIDEOS[i].s;
    prog.style.width = '0%';
    v.play(); setTog(true);
  }
  v.addEventListener('timeupdate', function () {
    if (v.duration) prog.style.width = (v.currentTime / v.duration * 100) + '%';
  });
  v.addEventListener('ended', function () { load(i + 1); });
  document.getElementById('actPrev').addEventListener('click', function () { load(i - 1); });
  document.getElementById('actNext').addEventListener('click', function () { load(i + 1); });
  tog.addEventListener('click', function () {
    if (v.paused) { v.play(); setTog(true); } else { v.pause(); setTog(false); }
  });
  load(0);
})();

// ── 여행자 콘텐츠 큐레이션 캐러셀 ──
// 카드 추가/수정은 이 목록에서 하세요. yt: 유튜브ID / blog·insta: url
var CURATION = [
  { type: 'yt', id: 'cNJbW8zefxk', t: '울릉도 EP1. 울릉도민과 함께하는 울렁울렁 울릉도 여행!', a: '89헤르츠 89HERTZ' },
  { type: 'blog', url: 'https://blog.naver.com/hyang7845/224282528030', t: '울릉도 여행 후기', a: '@hyang7845' },
  { type: 'insta', url: 'https://www.instagram.com/p/DaSQV_TD91H/', t: '사진으로 보는 울릉의 순간', a: 'Instagram 포토' },
  { type: 'yt', id: 'Jr_ju4HWs0E', t: '올여름 최고의 여행지, 울릉도 백패킹·스노클링·맛집', a: '장쌤생 jangteacher' },
  { type: 'blog', url: 'https://blog.naver.com/younineagain/224367739268', t: '울릉도 여행 코스 기록', a: '@younineagain' },
  { type: 'insta', url: 'https://www.instagram.com/reel/C-DLPN4Rm22/', t: '릴스로 보는 울릉 바다', a: 'Instagram 릴스' },
  { type: 'yt', id: 'THpli2pRQ5E', t: '빛나는 울릉도 바닷속으로, 프리다이빙과 야생 돌고래', a: '촉촉한 초록칩' },
  { type: 'blog', url: 'https://blog.naver.com/goil2005/224366816550', t: '울릉도 먹고 보고 걷기', a: '@goil2005' },
  { type: 'insta', url: 'https://www.instagram.com/reel/DZuRMhYpor2/', t: '울릉 여행 하이라이트', a: 'Instagram 릴스' },
  { type: 'yt', id: 'KF7vFuuh1e8', t: '울릉도 여행 브이로그', a: 'YouTube' },
  { type: 'blog', url: 'https://blog.naver.com/all_kiki/224361105067', t: '울릉도 여행 일기', a: '@all_kiki' },
  { type: 'insta', url: 'https://www.instagram.com/p/DMezCjpv2Tv/', t: '울릉 감성 한 컷', a: 'Instagram 포토' },
  { type: 'yt', id: 'cJKmZb7EqUg', t: '오랜만에 울릉도를 다시 찾아간 두 남자 【울릉도 1】', a: '빠니보틀 Pani Bottle' },
  { type: 'insta', url: 'https://www.instagram.com/reel/DI_CiRxRbqR/', t: '울릉의 순간들', a: 'Instagram 릴스' }
];
(function () {
  var stage = document.getElementById('cvStage');
  if (!stage) return;
  var N = CURATION.length, active = 0;
  var dotsBox = document.getElementById('cvDots');
  CURATION.forEach(function (c, i) {
    var el = document.createElement('div');
    el.className = 'cv-slide cv-' + c.type;
    el.dataset.i = i;
    if (c.type === 'yt') {
      el.dataset.url = 'https://youtu.be/' + c.id;
      el.innerHTML = '<div class="cv-thumb"><img src="https://i.ytimg.com/vi/' + c.id + '/hqdefault.jpg" alt="" loading="lazy"><span class="cv-play">▶</span></div>'
        + '<div class="cv-info"><span class="cv-badge b-yt">▶ YouTube</span><b>' + c.t + '</b><span class="cv-author">' + c.a + '</span></div>';
    } else {
      el.dataset.url = c.url;
      el.innerHTML = '<div class="cv-quote">' + (c.type === 'blog' ? '“' : '📷') + '</div>'
        + '<div class="cv-fill"><span class="cv-badge ' + (c.type === 'blog' ? 'b-blog">✍️ 네이버 블로그' : 'b-insta">📷 Instagram') + '</span>'
        + '<b>' + c.t + '</b><span class="cv-author">' + c.a + '</span></div>'
        + '<span class="cv-go">보러 가기 →</span>';
    }
    el.addEventListener('click', function () {
      if (parseInt(el.dataset.i, 10) === active) window.open(el.dataset.url, '_blank');
      else { active = parseInt(el.dataset.i, 10); render(); }
    });
    stage.appendChild(el);
    var d = document.createElement('span');
    d.addEventListener('click', function () { active = i; render(); });
    dotsBox.appendChild(d);
  });
  function render() {
    var slides = stage.children;
    for (var i = 0; i < N; i++) {
      var d = i - active;
      if (d > N / 2) d -= N;
      if (d < -N / 2) d += N;
      var cls = 'cv-slide cv-' + CURATION[i].type + ' ';
      cls += (Math.abs(d) > 2) ? 'p-hide' : 'p' + (d < 0 ? 'm' : '') + Math.abs(d);
      slides[i].className = cls;
    }
    Array.prototype.forEach.call(dotsBox.children, function (dot, k) {
      dot.className = k === active ? 'on' : '';
    });
  }
  document.getElementById('cvPrev').addEventListener('click', function () { active = (active - 1 + N) % N; render(); });
  document.getElementById('cvNext').addEventListener('click', function () { active = (active + 1) % N; render(); });
  render();
})();

// ── 여행 준비 체크리스트 (브라우저 저장) ──
(function () {
  var items = document.querySelectorAll('.prep-item input');
  if (!items.length) return;
  var KEY = 'ulleung_prep';
  var saved = {};
  try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) {}
  items.forEach(function (c) {
    if (saved[c.dataset.prep]) c.checked = true;
    c.addEventListener('change', function () {
      saved[c.dataset.prep] = c.checked;
      try { localStorage.setItem(KEY, JSON.stringify(saved)); } catch (e) {}
    });
  });
})();

// ── 울릉 여행 유형 테스트 ──
(function () {
  var card = document.getElementById('quizCard');
  if (!card) return;
  var QS = [
    { q: '울릉에 도착하면 제일 먼저 하고 싶은 건?', o: [['🌊 바다로 풍덩! 물놀이부터', 'active'], ['☕ 전망 좋은 곳에서 커피 한 잔', 'heal'], ['🍢 시장 구경하며 주전부리', 'food']] },
    { q: '여행 사진첩에 제일 많은 건?', o: [['💪 땀나는 액티비티 인증샷', 'active'], ['🌅 하늘·바다·풍경 사진', 'heal'], ['🍽️ 오늘 먹은 음식 사진', 'food']] },
    { q: '나의 여행 일정 스타일은?', o: [['⏰ 아침부터 꽉 채운 알찬 일정', 'active'], ['🐢 발길 닿는 대로 느긋하게', 'heal'], ['🗺️ 맛집 중심으로 동선 짜기', 'food']] }
  ];
  var RESULTS = {
    active: { e: '🔥', name: '에너지 폭발 액티브 탐험가', desc: '가만히 있으면 좀이 쑤시는 타입! 케이블카·모노레일·해양 체험까지 몸으로 즐기는 울릉이 딱이에요.', course: '액티브 울릉' },
    heal: { e: '🌿', name: '느긋한 물멍 힐링러', desc: '바다 보며 멍때리는 게 최고의 일정. 행남산책로를 걷고 오션뷰 카페에서 마무리하는 하루를 추천해요.', course: '뚜벅이 힐링 코스' },
    food: { e: '🍚', name: '맛따라 길따라 미식가', desc: '여행의 기억은 혀끝에 남는 법. 홍합밥부터 저동항 회센터까지, 맛으로 도는 울릉을 추천해요.', course: '미식 탐방 코스' },
    photo: { e: '📸', name: '인생샷 감성 수집가', desc: '취향이 골고루 균형 잡힌 타입! 어딜 가든 그림이 되는 대풍감·삼선암 사진 코스로 다 담아가세요.', course: '인생샷 사진 코스' }
  };
  var step, score;
  function start() { step = 0; score = { active: 0, heal: 0, food: 0 }; render(); }
  function render() {
    if (step < QS.length) {
      var q = QS[step];
      var html = '<div class="qz-step">Q' + (step + 1) + ' <span>/ ' + QS.length + '</span></div><h3 class="qz-q">' + q.q + '</h3><div class="qz-opts">';
      q.o.forEach(function (o, k) { html += '<button type="button" class="qz-opt" data-k="' + k + '">' + o[0] + '</button>'; });
      html += '</div><div class="qz-dots">' + QS.map(function (_, k) { return '<span class="' + (k <= step ? 'on' : '') + '"></span>'; }).join('') + '</div>';
      card.innerHTML = html;
      card.querySelectorAll('.qz-opt').forEach(function (b) {
        b.addEventListener('click', function () {
          score[QS[step].o[b.dataset.k][1]]++;
          step++; render();
        });
      });
    } else {
      var win = 'photo';
      if (score.active > score.heal && score.active > score.food) win = 'active';
      else if (score.heal > score.active && score.heal > score.food) win = 'heal';
      else if (score.food > score.active && score.food > score.heal) win = 'food';
      var r = RESULTS[win];
      card.innerHTML = '<div class="qz-result"><div class="qz-emoji">' + r.e + '</div>'
        + '<span class="qz-badge">AI 진단 결과</span><h3>' + r.name + '</h3><p>' + r.desc + '</p>'
        + '<div class="qz-course">추천 테마 · <b>' + r.course + '</b></div>'
        + '<div class="qz-btns"><a class="btn btn-primary" href="courses.html">추천 코스 보러 가기 →</a>'
        + '<button type="button" class="btn btn-ghost" id="qzRetry">다시 하기</button></div></div>';
      document.getElementById('qzRetry').addEventListener('click', start);
    }
  }
  start();
})();

// ── 독도 접안정보 위젯 ──
// 매일 전망을 여기서 수정하세요: 'good'(가능성 높음) / 'mid'(보통) / 'bad'(접안 어려움)
var DOKDO_FORECAST = [['09', 'good'], ['15', 'mid']];
(function () {
  var box = document.getElementById('dokdoSlots');
  if (!box) return;
  var LABEL = {
    good: ['😊', '접안 가능성 높음'],
    mid:  ['😐', '상황에 따라 가능'],
    bad:  ['☹️', '접안 어려움'],
    done: ['🕐', '오늘의 전망 종료']
  };
  var nowHour = new Date().getHours();
  var html = '';
  DOKDO_FORECAST.forEach(function (pair) {
    var t = pair[0], state = nowHour >= parseInt(t, 10) + 1 ? 'done' : pair[1];
    var l = LABEL[state] || LABEL.done;
    html += '<div class="dl-slot"><b>' + t + '시</b><span class="dl-face">' + l[0] + '</span><span>' + l[1] + '</span></div>';
  });
  box.innerHTML = html;
})();

// ── 독도 접안정보 플로팅 버튼 ──
(function () {
  var fab = document.getElementById('dokdoFab'), pop = document.getElementById('dokdoPop');
  if (!fab || !pop) return;
  fab.addEventListener('click', function (e) {
    e.stopPropagation();
    pop.classList.toggle('open');
  });
  document.addEventListener('click', function (e) {
    if (!pop.contains(e.target)) pop.classList.remove('open');
  });
})();

// ── 테마 배너 커스텀 드롭다운 & 달력 ──
(function () {
  var dds = document.querySelectorAll('.ux-dd');
  if (!dds.length) return;
  function closeAll(except) { dds.forEach(function (d) { if (d !== except) d.classList.remove('open'); }); }
  document.addEventListener('click', function (e) { if (!e.target.closest('.ux-dd')) closeAll(); });
  dds.forEach(function (dd) {
    dd.querySelector('.ux-value').addEventListener('click', function (e) {
      e.stopPropagation(); closeAll(dd); dd.classList.toggle('open');
    });
  });
  // 옵션형 드롭다운 (테마, 인원)
  document.querySelectorAll('.ux-panel .ux-opt').forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = opt.closest('.ux-dd');
      dd.querySelectorAll('.ux-opt').forEach(function (o) { o.classList.toggle('on', o === opt); });
      dd.querySelector('.ux-value span').textContent = opt.textContent;
      dd.classList.remove('open');
    });
  });
  // 달력 (출발, 도착)
  var sel = { dep: null, ret: null };
  function fmt(d) { return d.getFullYear() + '.' + String(d.getMonth() + 1).padStart(2, '0') + '.' + String(d.getDate()).padStart(2, '0'); }
  function buildCal(key) {
    var dd = document.querySelector('.ux-dd[data-dd=' + key + ']');
    if (!dd) return;
    var panel = dd.querySelector('.ux-cal');
    var view = new Date(); view.setDate(1);
    function minDate() {
      var t = new Date(); t.setHours(0, 0, 0, 0);
      return (key === 'ret' && sel.dep && sel.dep > t) ? sel.dep : t;
    }
    function render() {
      var y = view.getFullYear(), m = view.getMonth();
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var html = '<div class="cal-head"><button type="button" class="cal-nav" data-n="-1">‹</button><b>' + y + '년 ' + (m + 1) + '월</b><button type="button" class="cal-nav" data-n="1">›</button></div><div class="cal-grid">';
      ['일', '월', '화', '수', '목', '금', '토'].forEach(function (w) { html += '<span class="cal-dow">' + w + '</span>'; });
      var first = new Date(y, m, 1).getDay(), days = new Date(y, m + 1, 0).getDate(), mn = minDate();
      for (var i = 0; i < first; i++) html += '<span></span>';
      for (var d = 1; d <= days; d++) {
        var dt = new Date(y, m, d);
        var dis = dt < mn;
        var isSel = sel[key] && dt.getTime() === sel[key].getTime();
        var isToday = dt.getTime() === today.getTime();
        html += '<button type="button" class="cal-day' + (dis ? ' dis' : '') + (isSel ? ' sel' : '') + (isToday ? ' today' : '') + '" data-d="' + d + '"' + (dis ? ' disabled' : '') + '>' + d + '</button>';
      }
      panel.innerHTML = html + '</div>';
      panel.querySelectorAll('.cal-nav').forEach(function (b) {
        b.addEventListener('click', function (e) { e.stopPropagation(); view.setMonth(view.getMonth() + parseInt(b.dataset.n, 10)); render(); });
      });
      panel.querySelectorAll('.cal-day:not(.dis)').forEach(function (b) {
        b.addEventListener('click', function (e) {
          e.stopPropagation();
          sel[key] = new Date(y, m, parseInt(b.dataset.d, 10));
          dd.querySelector('.ux-value span').textContent = fmt(sel[key]);
          if (key === 'dep' && sel.ret && sel.ret < sel.dep) {
            sel.ret = null;
            var rv = document.querySelector('.ux-dd[data-dd=ret] .ux-value span');
            if (rv) rv.textContent = '날짜 선택';
          }
          dd.classList.remove('open');
        });
      });
    }
    dd.querySelector('.ux-value').addEventListener('click', render);
    render();
  }
  buildCal('dep'); buildCal('ret');
})();

// ── AI 추천 받기 (테마 배너) ──
// 실시간 현황 값과 추천 문구는 여기서 수정하세요.
var AI_RECO = {
  '자연 생태 코스': '나리분지 → 성인봉 초입 숲길 → 예림원 동선을 추천해요. 지금 북면 혼잡도가 낮아 여유롭게 둘러보기 좋아요.',
  '액티브 울릉': '케이블카 → 행남해안산책로 → 해양 체험 순서를 추천해요. 오후 바람 예보가 있어 해양 체험은 오전에 배치했어요.',
  '독도 뱃길 코스': '오늘 파고 기준 독도 접안 가능성이 양호해요. 오전 독도 왕복 후 오후 봉래폭포 일정을 추천해요.',
  '뚜벅이 힐링 코스': '행남해안산책로 → 도동 골목 → 오션뷰 카페 동선이에요. 혼잡도 45%, 걷기 딱 좋은 날이에요.',
  '미식 탐방 코스': '점심 홍합밥 → 저녁 저동항 회센터 동선을 추천해요. 나리분지 산채식당은 재료 소진 전 이른 방문 추천!',
  '인생샷 사진 코스': '역광을 피해 오전 대풍감 → 오후 삼선암·거북바위 순서로 추천해요. 흐린 날엔 파스텔톤 사진이 잘 나와요.'
};
(function () {
  var btn = document.getElementById('aiRecBtn');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var get = function (dd) { var el = document.querySelector('.ux-dd[data-dd=' + dd + '] .ux-value span'); return el ? el.textContent : ''; };
    var theme = get('theme'), dep = get('dep'), ret = get('ret'), pax = get('pax');
    var box = document.getElementById('tbResult');
    var title = document.getElementById('tbrTitle'), text = document.getElementById('tbrText');
    box.classList.add('show');
    title.textContent = 'AI가 실시간 변수를 분석하고 있어요...';
    text.textContent = '날씨 · 혼잡도 · 선박 운항 정보를 확인하는 중';
    setTimeout(function () {
      var when = (dep !== '날짜 선택') ? dep + ' 출발 · ' : '';
      title.textContent = '「' + theme + '」 ' + when + pax + ' 기준 추천 동선';
      text.textContent = AI_RECO[theme] || AI_RECO['자연 생태 코스'];
    }, 900);
  });
})();

// ── 권역별 절경 탭 (지도 연동) ──
(function () {
  var tabs = document.querySelectorAll('.rg-tab');
  if (!tabs.length) return;
  function apply(region) {
    tabs.forEach(function (t) { t.classList.toggle('on', t.dataset.region === region); });
    document.querySelectorAll('.rg-grid').forEach(function (g) { g.classList.toggle('on', g.dataset.region === region); });
    document.querySelectorAll('.map-pin').forEach(function (p) { p.classList.toggle('dim', p.dataset.region !== region); });
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { apply(t.dataset.region); }); });
  apply('eup');

  // 핀 호버 → 레이어 팝업
  var tip = document.getElementById('mapTip');
  document.querySelectorAll('.map-pin').forEach(function (p) {
    function show() {
      tip.innerHTML = '<img src="' + p.dataset.img + '" alt=""><div><span class="rg-chip">' + p.dataset.rname + '</span><b>' + p.dataset.name + '</b></div>';
      tip.style.left = p.style.left;
      tip.style.top = p.style.top;
      tip.classList.add('show');
    }
    p.addEventListener('mouseenter', show);
    p.addEventListener('focus', show);
    p.addEventListener('click', function (e) { e.stopPropagation(); show(); apply(p.dataset.region); });
    p.addEventListener('mouseleave', function () { tip.classList.remove('show'); });
    p.addEventListener('blur', function () { tip.classList.remove('show'); });
  });
})();

// ── '지금 뜨는 울릉 명소' 태그 필터 ──
(function () {
  var wrap = document.getElementById('destChips');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip || !chip.dataset.tag) return;
    var tag = chip.dataset.tag;
    wrap.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === chip); });
    document.querySelectorAll('.dest-grid').forEach(function (g) {
      g.classList.toggle('on', g.dataset.tag === tag);
    });
  });
})();
