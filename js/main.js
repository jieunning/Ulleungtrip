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

// ── 맛집차트 카테고리 필터 ──
(function () {
  var wrap = document.getElementById('mcChips');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    var cat = chip.dataset.cat;
    wrap.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === chip); });
    document.querySelectorAll('.mc-row').forEach(function (r) {
      r.style.display = (cat === '전체' || r.dataset.cat === cat) ? '' : 'none';
    });
  });
})();

// ── 숙소 지역 탭 필터 ──
(function () {
  var wrap = document.getElementById('stayChips');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip || !chip.dataset.stay) return;
    wrap.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('on', c === chip); });
    document.querySelectorAll('.stay-grid').forEach(function (g) {
      g.classList.toggle('on', g.dataset.stay === chip.dataset.stay);
    });
  });
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
        + '<div class="qz-btns"><a class="btn btn-primary" href="planner.html">AI 플래너로 내 코스 만들기 →</a>'
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

// ── AI 동선 플래너 ──
(function () {
  var body = document.getElementById('plBody');
  if (!body) return;
  var stepsEl = document.getElementById('plSteps'), prevBtn = document.getElementById('plPrev'), nextBtn = document.getElementById('plNext');
  var card = document.getElementById('plCard'), resultEl = document.getElementById('plResult');

  var DUR = [{ t: '1박 2일', n: 1, e: '🗓️' }, { t: '2박 3일', n: 2, e: '📅', hot: true }, { t: '3박 4일', n: 3, e: '🗓️' }];
  var COMP = [{ k: 'solo', t: '혼자', e: '🧍' }, { k: 'couple', t: '둘이서', e: '💑' }, { k: 'family', t: '아이와 가족', e: '👨‍👩‍👧' }, { k: 'friends', t: '친구들과', e: '🎒' }];
  var THEMES = [
    { k: '산', t: '산·자연', img: 'images/spot-nari.jpg' },
    { k: '바다', t: '바다·해안', img: 'images/walk-haengnam.jpg' },
    { k: '액티비티', t: '액티비티', img: 'images/hero3.jpg' },
    { k: '미식', t: '미식', img: 'images/food-honghap.jpg' },
    { k: '카페', t: '카페', img: 'images/kids-yerimwon.jpg' },
    { k: '사진', t: '사진 스팟', img: 'images/drive-samseonam.jpg' },
    { k: '섬', t: '섬 속의 섬', img: 'images/hero2.jpg' },
    { k: '가족', t: '가족 체험', img: 'images/kids-cablecar.jpg' }
  ];
  var POIS = [
    { n: '태하향목 모노레일 · 대풍감', type: 'spot', area: '서면', x: 20, y: 41.5, th: ['사진', '바다', '산'], img: 'images/spot-monorail.jpg', fam: 1 },
    { n: '독도전망대 케이블카', type: 'spot', area: '울릉읍 도동', x: 62, y: 64.5, th: ['액티비티', '사진', '가족'], img: 'images/spot-cablecar.jpg', fam: 1 },
    { n: '행남해안산책로', type: 'spot', area: '도동 ↔ 저동', x: 79, y: 61, th: ['바다', '산', '사진'], img: 'images/walk-haengnam.jpg' },
    { n: '관음도', type: 'spot', area: '북면', x: 84.5, y: 19, th: ['섬', '바다', '가족'], img: 'images/spot-gwaneumdo.jpg', fam: 1 },
    { n: '나리분지', type: 'spot', area: '북면', x: 53, y: 41, th: ['산', '가족'], img: 'images/spot-nari.jpg' },
    { n: '성인봉 등반', type: 'spot', area: '나리분지 출발', x: 50, y: 50, th: ['산', '액티비티'], img: 'images/walk-seonginbong.jpg' },
    { n: '봉래폭포', type: 'spot', area: '울릉읍 사동', x: 57.5, y: 52, th: ['산', '가족'], img: 'images/kids-bongnae.jpg', fam: 1 },
    { n: '예림원', type: 'spot', area: '북면', x: 36, y: 36, th: ['사진', '가족'], img: 'images/kids-yerimwon.jpg', fam: 1 },
    { n: '삼선암', type: 'spot', area: '북면', x: 60.5, y: 20.5, th: ['사진', '바다'], img: 'images/drive-samseonam.jpg' },
    { n: '통구미 거북바위', type: 'spot', area: '서면', x: 46.5, y: 79.5, th: ['사진', '바다'], img: 'images/drive-geobuk.jpg' },
    { n: '해양 체험 (스노클링·카약)', type: 'spot', area: '저동 · 천부', x: 72, y: 40, th: ['액티비티', '바다'], img: 'images/hero3.jpg' },
    { n: '독도 (여객선 왕복)', type: 'spot', area: '저동항 출발', x: 87.5, y: 84.5, th: ['섬', '바다'], img: 'images/hero2.jpg', dokdo: 1 },
    { n: '홍합밥 골목', type: 'food', area: '도동', x: 63, y: 66, th: ['미식'], img: 'images/food-honghap.jpg' },
    { n: '따개비칼국수집', type: 'food', area: '저동', x: 74, y: 57, th: ['미식'], img: 'images/food-ttagaebi.jpg' },
    { n: '울릉 약소불고기', type: 'food', area: '도동', x: 61, y: 68, th: ['미식'], img: 'images/food-yakso.jpg' },
    { n: '나리분지 산채식당', type: 'food', area: '나리', x: 52, y: 43, th: ['미식', '산'], img: 'images/food-sanchae.jpg' },
    { n: '저동항 회센터', type: 'food', area: '저동', x: 75.5, y: 58.5, th: ['미식', '바다'] },
    { n: '오션뷰 카페', type: 'cafe', area: '북면 해안', x: 40, y: 24, th: ['카페', '바다', '사진'] },
    { n: '도동 골목 카페', type: 'cafe', area: '도동', x: 62.5, y: 66.5, th: ['카페'] }
  ];
  var STAY_BY = {
    solo: { n: '살로메스테이', type: 'stay', area: '도동', x: 63, y: 65 },
    couple: { n: '코스모스 울릉도', type: 'stay', area: '북면', x: 33, y: 22 },
    family: { n: '울릉 대아리조트', type: 'stay', area: '사동', x: 55, y: 72 },
    friends: { n: '상일펜션', type: 'stay', area: '사동', x: 56, y: 70 }
  };
  var DAY_COLORS = ['#00aebd', '#1c2554', '#f5a623', '#18a558'];
  var TYPE_LABEL = { spot: '여행지', food: '음식점', cafe: '카페', stay: '숙소', port: '항구' };

  var step = 0, sel = { dur: 1, comp: 'couple', themes: [] };

  function renderSteps() {
    stepsEl.innerHTML = [0, 1, 2].map(function (i) {
      return '<b class="' + (i === step ? 'on' : (i < step ? 'done' : '')) + '">0' + (i + 1) + '</b>' + (i < 2 ? '<i></i>' : '');
    }).join('');
  }
  function render() {
    renderSteps();
    prevBtn.style.visibility = step === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = step === 2 ? '완료' : '다음';
    var html = '';
    if (step === 0) {
      html = '<p class="pl-sub">일정이 길수록 섬을 더 깊게 볼 수 있어요.</p><h3 class="pl-q">여행 기간을<br>선택해 주세요.</h3><div class="pl-opts">'
        + DUR.map(function (d, i) {
          return '<button type="button" class="pl-opt' + (sel.dur === i ? ' on' : '') + '" data-i="' + i + '"><span>' + d.e + '</span><b>' + d.t + '</b>' + (d.hot ? '<em>인기</em>' : '') + '</button>';
        }).join('') + '</div>';
    } else if (step === 1) {
      html = '<p class="pl-sub">동행에 따라 동선과 숙소가 달라져요.</p><h3 class="pl-q">누구와 함께<br>떠나시나요?</h3><div class="pl-opts">'
        + COMP.map(function (c) {
          return '<button type="button" class="pl-opt' + (sel.comp === c.k ? ' on' : '') + '" data-k="' + c.k + '"><span>' + c.e + '</span><b>' + c.t + '</b></button>';
        }).join('') + '</div>';
    } else {
      html = '<p class="pl-sub">마지막으로 이번 여행의 테마를 정해볼까요?</p><h3 class="pl-q">원하는 여행 테마를 2개 이상<br>선택해 주세요. (최대 4개)</h3><div class="pl-themes">'
        + THEMES.map(function (t) {
          return '<button type="button" class="pl-theme' + (sel.themes.indexOf(t.k) >= 0 ? ' on' : '') + '" data-k="' + t.k + '"><img src="' + t.img + '" alt="" loading="lazy"><b>' + t.t + '</b></button>';
        }).join('') + '</div>';
    }
    body.innerHTML = html;
    body.querySelectorAll('.pl-opt').forEach(function (b) {
      b.addEventListener('click', function () {
        if (step === 0) sel.dur = parseInt(b.dataset.i, 10);
        else sel.comp = b.dataset.k;
        render();
      });
    });
    body.querySelectorAll('.pl-theme').forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.k, idx = sel.themes.indexOf(k);
        if (idx >= 0) sel.themes.splice(idx, 1);
        else if (sel.themes.length < 4) sel.themes.push(k);
        render();
      });
    });
  }
  prevBtn.addEventListener('click', function () { if (step > 0) { step--; render(); } });
  nextBtn.addEventListener('click', function () {
    if (step < 2) { step++; render(); return; }
    if (sel.themes.length < 2) { alertMsg(); return; }
    showResult();
  });
  function alertMsg() {
    var q = body.querySelector('.pl-q');
    q.innerHTML = '테마를 <em style="color:#e0685f;font-style:normal">2개 이상</em> 선택해 주세요! (최대 4개)';
  }

  function buildCourse() {
    var nights = DUR[sel.dur].n, days = nights + 1, themes = sel.themes, comp = sel.comp;
    var used = {};
    function score(p) {
      var s = 0;
      p.th.forEach(function (t) { if (themes.indexOf(t) >= 0) s += 2; });
      if (comp === 'family' && p.fam) s += 2;
      if (comp === 'couple' && p.th.indexOf('사진') >= 0) s += 1;
      if (comp === 'friends' && p.th.indexOf('액티비티') >= 0) s += 1;
      if (comp === 'solo' && p.th.indexOf('산') >= 0) s += 1;
      return s;
    }
    function pick(type) {
      var c = POIS.filter(function (p) { return p.type === type && !used[p.n] && !p.dokdo; })
        .sort(function (a, b) { return score(b) - score(a); });
      if (c.length) { used[c[0].n] = 1; return c[0]; }
      return null;
    }
    var stay = STAY_BY[comp], plan = [];
    for (var d = 1; d <= days; d++) {
      var items = [];
      if (d === 1) items.push({ n: '도동항 · 사동항 도착', type: 'port', area: '울릉도 입도' });
      if (d === 2 && themes.indexOf('섬') >= 0) {
        var dk = POIS.filter(function (p) { return p.dokdo; })[0];
        used[dk.n] = 1; items.push(dk);
      } else {
        var s1 = pick('spot'); if (s1) items.push(s1);
      }
      var f = pick('food'); if (f) items.push(f);
      var s2 = pick('spot'); if (s2) items.push(s2);
      if (themes.indexOf('카페') >= 0) { var cf = pick('cafe'); if (cf) items.push(cf); }
      if (d <= nights) items.push(Object.assign({}, stay));
      if (d === days) items.push({ n: '도동항 · 사동항 출항', type: 'port', area: '여행 마무리' });
      plan.push(items);
    }
    return plan;
  }

  function showResult() {
    card.style.display = 'none';
    resultEl.innerHTML = '<div class="pl-loading">🤖 AI가 취향과 실시간 변수를 분석해 동선을 계산하고 있어요...</div>';
    setTimeout(function () {
      var plan = buildCourse();
      var compT = COMP.filter(function (c) { return c.k === sel.comp; })[0].t;
      var total = 0, dist = 0;
      plan.forEach(function (day) {
        var prev = null;
        day.forEach(function (it) {
          if (it.type !== 'port') total++;
          if (it.x != null && it.type !== 'port') {
            if (prev) dist += Math.sqrt(Math.pow(it.x - prev.x, 2) + Math.pow(it.y - prev.y, 2));
            prev = it;
          }
        });
      });
      var km = Math.max(10, Math.round(dist * 0.11 + plan.length * 3));
      // 예상 경비 비중 (데모)
      var ex = { t: 40, s: 35, f: 25 };
      if (sel.comp === 'family') { ex.s += 6; ex.t -= 3; ex.f -= 3; }
      if (sel.themes.indexOf('미식') >= 0) { ex.f += 8; ex.t -= 4; ex.s -= 4; }
      if (sel.themes.indexOf('액티비티') >= 0) { ex.t += 6; ex.s -= 3; ex.f -= 3; }

      var daysHtml = '', dayTabs = '';
      plan.forEach(function (day, di) {
        var color = DAY_COLORS[di % DAY_COLORS.length];
        dayTabs += '<button type="button" class="pl-daytab' + (di === 0 ? ' on' : '') + '" data-d="' + di + '" style="--dc:' + color + '"><i></i>Day ' + (di + 1) + '</button>';
        daysHtml += '<div class="pl-day" data-d="' + di + '"><h4><i style="background:' + color + '"></i>Day ' + (di + 1) + '</h4>';
        day.forEach(function (it) {
          var thumb = it.img ? '<img src="' + it.img + '" alt="">' : '<span class="pl-noimg">' + (it.type === 'port' ? '⛴️' : it.type === 'stay' ? '🛏️' : it.type === 'cafe' ? '☕' : '🍚') + '</span>';
          daysHtml += '<div class="pl-item">' + thumb + '<div><span class="pl-type t-' + it.type + '">' + TYPE_LABEL[it.type] + '</span><b>' + it.n + '</b><span class="pl-area">' + it.area + '</span></div></div>';
        });
        daysHtml += '</div>';
      });

      resultEl.innerHTML =
        '<div class="pl-sum"><div><span class="pl-sum-badge">' + DUR[sel.dur].t + '</span><h3>당신을 위한 울릉 여행코스</h3>'
        + '<p>' + compT + ' · 테마 ' + sel.themes.map(function (t) { return '#' + t; }).join(' ') + ' · 총 ' + total + '곳 추천</p></div>'
        + '<button class="btn btn-ghost" id="plRetry" type="button">다시 만들기</button></div>'
        + '<div class="pl-stats">'
        + '<div class="pl-stat"><span>여행 기간</span><b>' + DUR[sel.dur].t + '</b><small>여객선 일정에 맞춰 조정 가능</small></div>'
        + '<div class="pl-stat"><span>동행</span><b>' + compT + '</b><small>동행 맞춤 숙소 포함</small></div>'
        + '<div class="pl-stat"><span>총 이동 거리</span><b>약 ' + km + 'km</b><small>섬 내 이동 기준</small></div>'
        + '<div class="pl-stat pl-exp"><span>예상 경비 비중</span><div class="pl-bubbles">'
        + '<i class="bb1" style="width:' + (ex.t + 40) + 'px;height:' + (ex.t + 40) + 'px">' + ex.t + '%</i>'
        + '<i class="bb2" style="width:' + (ex.s + 40) + 'px;height:' + (ex.s + 40) + 'px">' + ex.s + '%</i>'
        + '<i class="bb3" style="width:' + (ex.f + 40) + 'px;height:' + (ex.f + 40) + 'px">' + ex.f + '%</i></div>'
        + '<small><em class="l1"></em>교통 <em class="l2"></em>숙박 <em class="l3"></em>식사</small></div>'
        + '</div>'
        + '<div class="pl-res"><div class="pl-days">' + daysHtml + '</div>'
        + '<div class="pl-mapwrap"><div class="pl-daytabs">' + dayTabs + '</div>'
        + '<div class="pl-map"><img src="images/map.jpg" alt="울릉도 지도"><svg class="pl-routes" viewBox="0 0 100 100" preserveAspectRatio="none"></svg><div id="plPins"></div></div>'
        + '<p class="pl-maphint">Day 탭을 누르면 그날의 이동 동선이 지도에 표시돼요.</p></div></div>'
        + '<div class="notice">본 동선은 프로토타입 데모입니다. 실제 서비스에서는 날씨·운항·혼잡도 실시간 데이터가 반영됩니다.</div>';

      // ── 지도: 선택한 Day의 동선 라인 + 화살표 ──
      var svg = resultEl.querySelector('.pl-routes'), pinBox = document.getElementById('plPins');
      function drawDay(di) {
        var color = DAY_COLORS[di % DAY_COLORS.length];
        var pts = plan[di].filter(function (it) { return it.x != null && it.type !== 'port'; });
        var lines = '', arrows = '';
        for (var i = 0; i < pts.length - 1; i++) {
          var a = pts[i], b = pts[i + 1];
          lines += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '"/>';
          var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          var ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
          arrows += '<g transform="translate(' + mx + ',' + my + ') rotate(' + ang + ')"><path d="M-0.9,-0.7 L0.7,0 L-0.9,0.7" fill="none" stroke="' + color + '" stroke-width="0.38" stroke-linecap="round" stroke-linejoin="round"/></g>';
        }
        svg.innerHTML = '<g stroke="' + color + '" stroke-width="0.42" stroke-dasharray="1.3 1.1" opacity="0.85" fill="none" class="pl-routeline">' + lines + '</g>' + arrows;
        pinBox.innerHTML = pts.map(function (p, k) {
          return '<span class="pl-pin" style="left:' + p.x + '%;top:' + p.y + '%;background:' + color + '">' + (k + 1) + '</span>';
        }).join('');
        resultEl.querySelectorAll('.pl-daytab').forEach(function (t) { t.classList.toggle('on', parseInt(t.dataset.d, 10) === di); });
        resultEl.querySelectorAll('.pl-day').forEach(function (d) { d.classList.toggle('dim', parseInt(d.dataset.d, 10) !== di); });
      }
      resultEl.querySelectorAll('.pl-daytab').forEach(function (t) {
        t.addEventListener('click', function () { drawDay(parseInt(t.dataset.d, 10)); });
      });
      drawDay(0);

      document.getElementById('plRetry').addEventListener('click', function () {
        card.style.display = ''; resultEl.innerHTML = ''; step = 0; sel.themes = []; render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }, 1100);
  }
  render();
})();

// ── 검증된 추천 코스: 카드 선택 전환 ──
(function () {
  var wrap = document.getElementById('crsCards');
  if (!wrap) return;
  wrap.addEventListener('click', function (e) {
    var card = e.target.closest('.crs-card');
    if (!card) return;
    var c = card.dataset.c;
    wrap.querySelectorAll('.crs-card').forEach(function (x) { x.classList.toggle('on', x === card); });
    document.querySelectorAll('.crs-detail').forEach(function (d) { d.classList.toggle('on', d.dataset.c === c); });
  });
})();

// ── 검증된 추천 코스: 지도 위치 보기 토글 ──
(function () {
  document.querySelectorAll('.crs-detail').forEach(function (d) {
    var btn = d.querySelector('.crs-mapbtn');
    var box = d.querySelector('.crs-mapbox');
    if (!btn || !box) return;
    btn.addEventListener('click', function () {
      var open = !box.classList.contains('on');
      box.classList.toggle('on', open);
      btn.classList.toggle('on', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.querySelector('em').textContent = open ? '지도 닫기' : '지도로 위치 보기';
    });
  });
})();

// ── 홈: 다녀온 사람들의 리얼 코스 (카드 + 지도 모달) ──
// 후기 추가/수정은 RVWS 목록에서 하세요. url: 원본 인스타그램 링크
var RVWS = [
  {
    url: 'https://www.instagram.com/p/DaSQV_TD91H/', badge: 'PLACE PICK', img: 'images/drive-samseonam.jpg',
    t: '삼선암부터 꽈배기까지<br>몽땅 추천 리스트', a: 'Instagram 후기',
    pins: [['삼선암',60.5,20.5],['관음도',84.5,19],['천부해중전망대',52,15],['행남해안산책로',79,61]],
    secs: [
      ['👀 가볼만한 곳', ['삼선암','관음도','천부해중전망대','행남해안산책로']],
      ['🍴 맛집 PICK', ['신비섬횟집','아리랑식당','울릉오징어회타운','마루통닭','아리랑김밥','카페울라']],
      ['🍩 간식 PICK', ['행복한꽈배기','명품찹살꽈배기','다와호떡']]
    ]
  },
  {
    url: 'https://www.instagram.com/reel/DZxcrYshGEK/', badge: '입문 가이드', img: 'images/spot-gwaneumdo.jpg',
    t: '배편부터 숙소까지<br>울릉 입문 A to Z', a: 'Instagram 후기',
    pins: [['관음도',84.5,19],['독도전망대',62,64.5],['태하향목 모노레일',20,41.5],['행남해안산책로',79,61],['나리분지',53,41],['내수전 몽돌해변',86,45]],
    secs: [
      ['⛴️ 배편 꿀팁', ['묵호항 — 배가 작아 날씨 영향 큼','포항항 — 큰 배·크루즈, 차량 선적 가능','울릉공항 개항 전엔 배편만 가능 (26년 기준)']],
      ['🗺️ 지역 감 잡기', ['관광은 북면·울릉읍에 집중','서면은 캠핑파 추천']],
      ['🍚 맛집', ['신비섬횟집','나리촌식당','숲크닉커피','현포 교동반점','카페울라','아리랑김밥','카페글림','다애식당','울릉국화','카페너와']],
      ['🏨 숙소', ['스테이너와','휘월','스테이토닥','차경울릉']]
    ]
  },
  {
    url: 'https://www.instagram.com/reel/C-DLPN4Rm22/', badge: '2박 3일', img: 'images/spot-monorail.jpg',
    t: '부모님과 2박3일<br>모노레일·독도 완전정복', a: 'Instagram 후기',
    days: [
      { d: 'DAY 1', stops: [['사동항 도착',55,72],['태하향목 모노레일',20,41.5],['학포해변 스노클링',15,48],['천부 숙소',49,16]] },
      { d: 'DAY 2', stops: [['도동항',75,65],['독도 왕복',87.5,84.5],['행남해안산책로',79,61],['남서일몰전망대',30,74],['통구미 버섯바위',46,79],['저동 오징어회타운',76,55]] },
      { d: 'DAY 3', stops: [['카페울라',50,17],['나리분지',53,41],['독도전망대',62,64.5],['사동항 출항',55,72]] }
    ],
    secs: [
      ['💰 경비 (4인 기준)', ['크루즈 왕복 56만','차량 선적 17.8만','숙소 38만','외식 28만','주유 5만']],
      ['🌇 석양 명소', ['남서일몰전망대','버섯바위','태하등대 향목전망대','천부항']],
      ['✅ 꿀팁', ['입도 전 항구 근처에서 주유 (섬 기름값 비쌈)','주방 있는 숙소 추천','배 탑승 시 신분증 필수','독도 체류는 20~30분','관광지 운영 여부는 울릉알리미 앱 확인']]
    ]
  },
  {
    url: 'https://www.instagram.com/reel/DZuRMhYpor2/', badge: '3박 4일', img: 'images/hero3.jpg',
    t: '117만원으로 둘이서<br>알뜰 3박4일 코스', a: 'Instagram 후기',
    days: [
      { d: 'DAY 1', stops: [['울릉도 도착',55,72],['동백식당',74,65],['학포항 스노클링',15,48],['호텔 체크인',58,70]] },
      { d: 'DAY 2', stops: [['아리랑식당',75,65],['촛대바위',79,57],['저동커피 · 독도문방구',76,56],['행남해안산책로',79,61],['독도 왕복',87.5,84.5]] },
      { d: 'DAY 3', stops: [['관음도',84.5,19],['삼선암',60.5,20.5],['선창선착장 스노클링',57,13]] },
      { d: 'DAY 4', stops: [['독도관리사무소 — 명예주민증 발급',75,64],['사동항 출항',55,72]] }
    ],
    secs: [
      ['💰 경비 (2인 · 총 117만)', ['배 왕복(차량 포함) 38만','숙소 21만','식비 40만','카페·군것질 3만','주유 5만','간식·기념품 10만']],
      ['🍴 들른 맛집', ['동백식당','우진이네','아리랑식당','명가','울릉가','우리식당']]
    ]
  },
  {
    url: 'https://www.instagram.com/reel/DI_CiRxRbqR/', badge: 'BEST 10', img: 'images/walk-haengnam.jpg',
    t: '2박3일 여행지<br>BEST 10 총정리', a: 'Instagram 후기',
    pins: [['관음도',84.5,19],['남서일몰전망대',30,74],['신비섬횟집',59,71],['봉래폭포',57.5,52],['나리분지',53,41],['독도전망대',62,64.5],['카페울라',50,17],['독도문방구',76,56],['삼선암',60.5,20.5],['행남해안산책로',79,61]],
    secs: [
      ['⭐ 별점 5점', ['남서일몰전망대 — 모노레일 4,000원','신비섬횟집 — 물회+전복죽','독도전망대 — 모노레일 7,500원','행남해안산책로 — 날씨 좋을 때 미리']],
      ['⭐ 별점 4점', ['관음도 — 입장 4,000원, 연도교 사진 맛집']],
      ['⭐ 별점 3점', ['봉래폭포 — 입장 2,000원','나리분지 — 6월까지 설산 뷰','독도문방구 — 유일한 소품샵','삼선암 — 차로 지나며 감상']],
      ['✅ 팁', ['울릉도는 5월부터가 최고 시즌','날씨 통제 잦으니 산책로는 맑은 날 먼저']]
    ]
  }
];
(function () {
  var row = document.getElementById('rvRow');
  if (!row) return;
  var modal = document.getElementById('rvModal'), body = document.getElementById('rvBody');
  var countEl = document.getElementById('rvCount');

  RVWS.forEach(function (r, i) {
    var c = document.createElement('button');
    c.type = 'button'; c.className = 'rv-card'; c.dataset.i = i;
    c.innerHTML = '<img src="' + r.img + '" alt="" loading="lazy"><div class="rv-card-txt"><b>' + r.t + '</b><span>' + (r.badge ? '#' + r.badge + ' · ' : '') + r.a + '</span></div>';
    row.appendChild(c);
  });

  function pinsHtml(stops) {
    var poly = stops.map(function (s) { return s[1] + ',' + s[2]; }).join(' ');
    var h = '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points="' + poly + '" fill="none" stroke="#008a97" stroke-width="0.6" stroke-dasharray="2 1.6" opacity="0.8"/></svg>';
    stops.forEach(function (s, k) {
      h += '<b class="crs-pin" style="left:' + s[1] + '%;top:' + s[2] + '%" title="' + s[0] + '">' + (k + 1) + '</b>';
    });
    return h;
  }
  function open(i) {
    var r = RVWS[i];
    var h = '<div class="rv-head"><span class="pill blue">' + (r.badge || '후기') + '</span><h3>' + r.t + '</h3>' +
      '<a href="' + r.url + '" target="_blank" rel="noopener">원본 후기 보기 ↗</a></div><div class="rv-grid"><div class="rv-mapcol">';
    if (r.days) {
      h += '<div class="rv-days">' + r.days.map(function (d, k) {
        return '<button type="button" class="rv-day' + (k === 0 ? ' on' : '') + '" data-d="' + k + '">' + d.d + '</button>';
      }).join('') + '</div>';
    }
    h += '<div class="rv-map"><img src="images/map.jpg" alt="울릉도 지도"><span id="rvLayer"></span></div>' +
      '<p class="rv-mapnote">' + (r.days ? 'DAY를 누르면 그날의 동선이 지도에 표시돼요.' : '후기 속 장소를 지도에 표시했어요.') + '</p></div><div class="rv-cont">';
    if (r.days) {
      r.days.forEach(function (d) {
        h += '<h4>' + d.d + '</h4><ul class="rv-steps">' + d.stops.map(function (s) { return '<li><b>' + s[0] + '</b></li>'; }).join('') + '</ul>';
      });
    }
    (r.secs || []).forEach(function (sec) {
      h += '<h4>' + sec[0] + '</h4><ul class="rv-list">' + sec[1].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>';
    });
    h += '</div></div>';
    body.innerHTML = h;
    var layer = document.getElementById('rvLayer');
    layer.innerHTML = pinsHtml(r.days ? r.days[0].stops : r.pins);
    body.querySelectorAll('.rv-day').forEach(function (btn) {
      btn.addEventListener('click', function () {
        body.querySelectorAll('.rv-day').forEach(function (x) { x.classList.toggle('on', x === btn); });
        layer.innerHTML = pinsHtml(r.days[parseInt(btn.dataset.d, 10)].stops);
      });
    });
    modal.classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function close() { modal.classList.remove('on'); document.body.style.overflow = ''; }

  row.addEventListener('click', function (e) {
    var c = e.target.closest('.rv-card');
    if (c) open(parseInt(c.dataset.i, 10));
  });
  document.getElementById('rvClose').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  var step = 282;
  document.getElementById('rvPrev').addEventListener('click', function () { row.scrollBy({ left: -step * 2, behavior: 'smooth' }); });
  document.getElementById('rvNext').addEventListener('click', function () { row.scrollBy({ left: step * 2, behavior: 'smooth' }); });
  if (countEl) {
    var upd = function () {
      var max = row.scrollWidth - row.clientWidth;
      var idx = max > 0 ? Math.min(RVWS.length, 1 + Math.round(row.scrollLeft / max * (RVWS.length - 1))) : 1;
      countEl.textContent = idx + ' / ' + RVWS.length;
    };
    row.addEventListener('scroll', upd); upd();
  }
})();

// ── 볼거리: 명소 DB (카드·검색·상세 공용) — 수정은 이 목록에서 ──
var SPOT_DB = {
  monorail: { n:'태하향목 모노레일 & 대풍감', eng:'Taeha Monorail & Daepunggam', region:'서면', type:'탈것·체험', img:'images/spot-monorail.jpg', gal:['images/drive-taeha.jpg','images/kids-monorail.jpg'], r:'4.8', tags:['#스카이워크','#인생샷','#필수코스'], x:20, y:41.5,
    desc:'모노레일을 타고 향목 정상에 오르면 스카이워크 전망대가 이어집니다. 천연기념물 대풍감 향나무 자생지와 북서 해안 절벽이 만드는 울릉도 대표 절경을 한눈에 담을 수 있어요.',
    feats:['🚞 모노레일 탑승','🌉 스카이워크 전망대','🌲 향나무 자생지(천연기념물)'],
    hours:'09:00 – 18:00', closed:'기상 악화 시 운행 중단', fee:'모노레일 왕복 4,000원', addr:'경북 울릉군 서면 태하리',
    tips:['오전 일찍 가면 대기 없이 탑승할 수 있어요','바람이 강한 날은 스카이워크가 통제될 수 있어요'],
    revs:[['스카이워크에서 본 대풍감은 말이 안 나오는 절경이에요.','여행자 J']] },
  cablecar: { n:'독도일출전망대 케이블카', eng:'Dokdo Observatory Cable Car', region:'울릉읍', type:'탈것·체험', img:'images/spot-cablecar.jpg', gal:['images/kids-cablecar.jpg','images/hero1.jpg'], r:'4.7', tags:['#독도조망','#일몰맛집','#가족추천'], x:62, y:64.5,
    desc:'약수공원에서 케이블카를 타고 해발 250m 전망대로 오릅니다. 맑은 날엔 87.4km 떨어진 독도가 수평선 위로 보이고, 발아래로는 도동항 전경이 펼쳐져요.',
    feats:['🚡 케이블카 왕복','🔭 독도 조망(맑은 날)','🌇 일몰 명소'],
    hours:'09:00 – 일몰 후(성수기 연장)', closed:'악천후 시 운휴', fee:'성인 왕복 7,500원', addr:'경북 울릉군 울릉읍 약수터길 일대',
    tips:['일몰 1시간 전 탑승이 가장 아름다워요','해무가 끼면 독도 조망이 어려우니 오전도 좋아요'],
    revs:[['해질녘 도동항 야경까지 보고 내려왔어요. 강추!','여행자 K']] },
  haengnam: { n:'행남해안산책로', eng:'Haengnam Coastal Walk', region:'울릉읍', type:'산책·등산', img:'images/walk-haengnam.jpg', gal:['images/crs-stroll.jpg','images/hero1.jpg'], r:'4.8', tags:['#해안절벽','#무료','#도동↔저동'], x:79, y:61,
    desc:'도동항과 저동항을 잇는 약 2.6km 해안 절벽 산책로. 터널과 다리를 지나며 에메랄드빛 바다를 바로 옆에 두고 걷습니다. 국내 최고 수준의 해안 산책로로 꼽혀요.',
    feats:['🌊 절벽 해안 트레일','🌉 해상 다리·터널','📷 포토 스팟 다수'],
    hours:'상시 개방', closed:'풍랑·야간 시 출입 통제', fee:'무료', addr:'경북 울릉군 울릉읍 도동리 ~ 저동리',
    tips:['파도가 높은 날은 통제되니 맑은 날 먼저 다녀오세요','도동 → 저동 방향이 덜 힘들어요'],
    revs:[['바다 위를 걷는 기분! 울릉도 1순위로 추천해요.','여행자 A']] },
  gwaneumdo: { n:'관음도', eng:'Gwaneumdo Island', region:'북면', type:'자연·전망', img:'images/spot-gwaneumdo.jpg', gal:['images/drive-samseonam.jpg','images/hero4.jpg'], r:'4.6', tags:['#섬속의섬','#연도교','#산책'], x:84.5, y:19,
    desc:'울릉도 동북쪽 끝, 보행 연도교를 건너 들어가는 무인도. 동백나무와 억새가 우거진 산책로를 따라 걸으면 죽도와 삼선암 조망이 시원하게 열립니다.',
    feats:['🌉 보행 연도교','🥾 순환 산책로(약 1시간)','🐚 원시 자연'],
    hours:'09:00 – 18:00 (입장 마감 17:00)', closed:'풍랑 시 통제', fee:'입장 4,000원', addr:'경북 울릉군 북면 천부리',
    tips:['다리 위에서 찍는 사진이 특히 예뻐요','그늘이 적으니 여름엔 모자·물 필수'],
    revs:[['다리 건너는 순간부터 그림이에요.','여행자 P']] },
  nari: { n:'나리분지', eng:'Nari Basin', region:'북면', type:'자연·전망', img:'images/spot-nari.jpg', gal:['images/food-sanchae.jpg','images/walk-seonginbong.jpg'], r:'4.7', tags:['#화산분지','#산채요리','#무료'], x:53, y:41,
    desc:'울릉도 유일의 평지이자 화산 칼데라 분지. 너와집·투막집 등 전통 가옥과 울릉국화·섬백리향 군락지가 있으며, 산채비빔밥의 본고장으로도 유명합니다.',
    feats:['🌋 칼데라 분지 지형','🏠 너와집·투막집','🌼 천연기념물 군락지'],
    hours:'상시 개방', closed:'연중무휴', fee:'무료', addr:'경북 울릉군 북면 나리',
    tips:['산채비빔밥·호박막걸리 점심 코스로 최고예요','성인봉 등반 출발점으로도 좋아요'],
    revs:[['6월에도 설산이 보이는 신기한 곳!','여행자 L']] },
  seonginbong: { n:'성인봉', eng:'Seonginbong Peak', region:'북면', type:'산책·등산', img:'images/walk-seonginbong.jpg', gal:['images/spot-nari.jpg','images/hero1.jpg'], r:'4.7', tags:['#최고봉984m','#원시림','#등산'], x:50, y:50,
    desc:'울릉도 최고봉(984m). 원시림 보호구역을 지나 정상에 서면 섬 전체와 동해가 한눈에 들어옵니다. 나리분지 코스와 KBS중계소 코스가 대표적이에요.',
    feats:['⛰️ 정상 파노라마','🌳 원시림 보호구역','🥾 왕복 4~6시간'],
    hours:'상시 개방(일몰 전 하산 권장)', closed:'기상 악화 시 통제', fee:'무료', addr:'나리분지 · KBS중계소 코스 출발',
    tips:['등산화 필수, 물 넉넉히 챙기세요','나리분지 출발 코스가 경사가 완만해요'],
    revs:[['정상에서 본 울릉도 전경, 평생 기억에 남을 거예요.','여행자 S']] },
  bongnae: { n:'봉래폭포', eng:'Bongnae Falls', region:'울릉읍', type:'자연·전망', img:'images/kids-bongnae.jpg', gal:['images/spot-nari.jpg','images/walk-naesujeon.jpg'], r:'4.6', tags:['#3단폭포','#천연에어컨','#가족추천'], x:57.5, y:52,
    desc:'낙차 약 30m, 3단으로 떨어지는 울릉도 대표 폭포. 가는 길의 풍혈(천연 에어컨)은 한여름에도 시원한 바람이 나와 아이들과 함께 가기 좋아요.',
    feats:['💧 3단 폭포','❄️ 풍혈(천연 에어컨)','🚶 매표소에서 도보 10분'],
    hours:'08:00 – 18:00', closed:'기상 악화 시 통제', fee:'입장 2,000원', addr:'경북 울릉군 울릉읍 사동',
    tips:['호박식혜 파는 휴게소도 들러보세요','산책로가 완만해서 부모님과 가기 좋아요'],
    revs:[['풍혈 앞은 진짜 에어컨보다 시원해요.','여행자 M']] },
  yerimwon: { n:'예림원', eng:'Yerimwon Garden', region:'북면', type:'자연·전망', img:'images/kids-yerimwon.jpg', gal:['images/drive-taeha.jpg','images/hero1.jpg'], r:'4.5', tags:['#절벽정원','#오션뷰','#문자조각공원'], x:36, y:36,
    desc:'절벽 위에 조성된 식물원 겸 문자조각공원. 잘 가꾼 정원 너머로 북면 바다가 파노라마로 펼쳐져 사진 찍기 좋은 곳이에요.',
    feats:['🌺 식물원·조각공원','🌊 절벽 오션뷰','📷 포토존'],
    hours:'09:00 – 18:00', closed:'동절기 단축 운영', fee:'입장 5,000원', addr:'경북 울릉군 북면 울릉순환로',
    tips:['전망 카페에서 쉬어가기 좋아요','드라이브 코스 중간에 들르기 딱이에요'],
    revs:[['정원도 바다도 다 예뻐서 사진이 잘 나와요.','여행자 H']] },
  samseonam: { n:'삼선암', eng:'Samseonam Rocks', region:'북면', type:'자연·전망', img:'images/drive-samseonam.jpg', gal:['images/spot-gwaneumdo.jpg','images/drive-iljudoro.jpg'], r:'4.6', tags:['#기암괴석','#드라이브','#무료'], x:60.5, y:20.5,
    desc:'하늘에서 내려온 세 선녀가 바위가 되었다는 전설의 기암. 북면 해안도로에서 차를 세우고 바로 감상할 수 있는 드라이브 명소입니다.',
    feats:['🪨 전설의 3형제 바위','🚗 해안도로 뷰포인트','🅿️ 주차 가능'],
    hours:'상시 개방', closed:'연중무휴', fee:'무료', addr:'경북 울릉군 북면 해안도로',
    tips:['관음도와 묶어서 동선을 짜면 좋아요','오전 순광 때 사진이 잘 나와요'],
    revs:[['지나가다 멈출 수밖에 없는 풍경.','여행자 C']] },
  geobuk: { n:'통구미 거북바위', eng:'Geobuk Rock', region:'서면', type:'자연·전망', img:'images/drive-geobuk.jpg', gal:['images/drive-iljudoro.jpg','images/hero3.jpg'], r:'4.5', tags:['#거북바위','#향나무자생지','#몽돌해변'], x:46.5, y:79.5,
    desc:'거북이가 기어가는 모습을 닮은 바위와 통구미 향나무 자생지(천연기념물)가 함께 있는 남서 해안 명소. 주변 몽돌해변에서 물놀이도 즐길 수 있어요.',
    feats:['🐢 거북 모양 기암','🌲 향나무 자생지','🏖️ 몽돌해변'],
    hours:'상시 개방', closed:'연중무휴', fee:'무료', addr:'경북 울릉군 서면 남양리 통구미',
    tips:['일주도로 드라이브 중 쉬어가기 좋아요','스노클링 포인트로도 인기예요'],
    revs:[['바위 모양이 진짜 거북이! 아이가 좋아했어요.','여행자 Y']] },
  naesujeon: { n:'내수전 옛길', eng:'Naesujeon Old Trail', region:'울릉읍', type:'산책·등산', img:'images/walk-naesujeon.jpg', gal:['images/walk-haengnam.jpg','images/spot-nari.jpg'], r:'4.5', tags:['#숲길','#원시림','#호젓한산책'], x:86, y:44,
    desc:'일주도로가 뚫리기 전 주민들이 오가던 옛길. 내수전에서 석포까지 원시림 사이로 이어지는 호젓한 숲길로, 동백나무와 고비 군락 사이를 걷다 보면 울릉의 속살을 만나게 됩니다.',
    feats:['🌳 원시림 숲길','🚶 편도 약 3시간','🍃 여름에도 시원한 그늘'],
    hours:'상시 개방(일몰 전 하산 권장)', closed:'기상 악화 시 통제', fee:'무료', addr:'경북 울릉군 울릉읍 내수전 ~ 북면 석포',
    tips:['내수전 전망대와 묶어 다녀오기 좋아요','벌레 기피제와 물을 챙기세요'],
    revs:[['그늘이 많아 여름 산책으로 최고예요.','여행자 N']] },
  jukdo: { n:'죽도', eng:'Jukdo Island', region:'섬밖', type:'자연·전망', img:'images/hero4.jpg', gal:['images/spot-gwaneumdo.jpg','images/hero2.jpg'], r:'4.4', tags:['#섬속의섬','#더덕','#나선계단'], x:88, y:31,
    desc:'저동항에서 배로 20분, 대나무가 많아 죽도라 불리는 섬. 365개 나선형 계단을 올라 만나는 섬 한 바퀴 산책로와 더덕밭이 명물입니다.',
    feats:['⛴️ 도선 20분','🌀 나선형 계단(365개)','🌿 더덕 재배지'],
    hours:'도선 운항 시간에 따름', closed:'기상 악화 시 결항', fee:'도선 왕복 유료(선사별 상이) · 입장 무료', addr:'저동항 출발',
    tips:['체류 시간이 배 시간에 묶이니 미리 확인하세요','더덕주스 꼭 마셔보세요'],
    revs:[['계단은 힘들지만 위에서 본 울릉도가 최고예요.','여행자 B']] },
  museum: { n:'독도박물관', eng:'Dokdo Museum', region:'울릉읍', type:'실내·문화', img:'images/hero2.jpg', gal:['images/hero2.jpg','images/spot-cablecar.jpg'], r:'4.5', tags:['#명소소개','#실내관람','#아이·가족추천'], x:63, y:66,
    desc:'독도의 역사·지리·생태 정보를 한눈에 볼 수 있는 울릉도 대표 박물관입니다. 다양한 전시와 영상, 체험 프로그램을 통해 독도의 가치를 쉽고 재미있게 배울 수 있어요. 케이블카를 타는 약수공원 안에 있어 함께 둘러보기 좋습니다.',
    feats:['🏛️ 독도 역사 전시','🎬 미디어 & 영상관','🧩 체험 프로그램'],
    hours:'09:00 – 18:00 (입장 마감 17:30)', closed:'매주 월요일 · 1월 1일 · 설/추석 당일', fee:'관람 무료', addr:'경북 울릉군 울릉읍 약수터길 90-17',
    nv:'https://map.naver.com/p/entry/place/20431449',
    tips:['케이블카·향토사료관과 묶어 반나절 코스로 좋아요','비 오는 날 실내 일정으로 최고예요'],
    revs:[['전시 구성이 잘 되어 있어 아이와 함께 배우기 좋았어요.','Anna'],['독도의 역사를 이해하는 데 큰 도움이 되었습니다.','John']] }
};

// ── 볼거리: 리스팅 + 검색/필터 ──
(function () {
  var grid = document.getElementById('pvGrid');
  if (!grid) return;
  var q = document.getElementById('pvQ'), countEl = document.getElementById('pvCount'), emptyEl = document.getElementById('pvEmpty');
  var f = { region: '', type: '' };
  var keys = Object.keys(SPOT_DB);
  keys.forEach(function (k) {
    var s = SPOT_DB[k];
    var a = document.createElement('a');
    a.className = 'card pv-card'; a.href = 'spot.html?id=' + k; a.dataset.k = k;
    a.innerHTML = '<div class="thumb"><div class="badge">' + s.type + '</div><img src="' + s.img + '" alt="' + s.n + '" loading="lazy"></div>' +
      '<div class="card-body"><h3>' + s.n + '</h3><p>' + s.desc.split('다.')[0] + '다.</p>' +
      '<div class="card-meta"><span>' + (s.region === '섬밖' ? '섬 속의 섬' : s.region) + '</span><span class="rating">★ ' + s.r + '</span></div></div>';
    grid.appendChild(a);
  });
  function apply() {
    var kw = (q.value || '').trim(), shown = 0;
    grid.querySelectorAll('.pv-card').forEach(function (c) {
      var s = SPOT_DB[c.dataset.k];
      var ok = (!f.region || s.region === f.region) && (!f.type || s.type === f.type) && (!kw || s.n.indexOf(kw) > -1);
      c.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });
    countEl.textContent = '총 ' + shown + '곳';
    emptyEl.style.display = shown ? 'none' : '';
  }
  q.addEventListener('input', apply);
  document.querySelectorAll('.pv-filters .ux-opt').forEach(function (o) {
    o.addEventListener('click', function () {
      f[o.closest('.ux-dd').dataset.f] = o.dataset.v || '';
      apply();
    });
  });
  apply();
})();

// ── 명소 상세: 예매·지도검색어·주변 맛집 데이터 ──
var SPOT_BOOK = { monorail:1, cablecar:1, gwaneumdo:1, bongnae:1, yerimwon:1, jukdo:1 };
var SPOT_MQ = { monorail:'태하향목관광모노레일', cablecar:'울릉도 독도전망대케이블카', haengnam:'행남해안산책로', gwaneumdo:'관음도', nari:'나리분지', seonginbong:'성인봉', bongnae:'봉래폭포', yerimwon:'예림원', samseonam:'울릉 삼선암', geobuk:'울릉 거북바위', jukdo:'울릉 죽도', museum:'독도박물관' };
var NEAR_EAT = {
  '울릉읍': { food:[['신비섬횟집','물회 · 전복죽 · 도동','4.6',1],['태양식당','따개비칼국수 · 저동','4.5',0],['아리랑김밥','간편 한 끼 · 도동','4.3',0]], cafe:[['카페글림','디저트 카페 · 도동','4.5',0],['저동커피','독도문방구 옆 · 저동','4.4',1],['울릉 젤라또','수제 젤라또 · 도동','4.4',0]] },
  '북면': { food:[['나리촌식당','산채비빔밥 · 나리분지','4.7',1],['현포 교동반점','중화요리 · 현포','4.4',1],['가송식당','오징어내장탕 · 천부','4.5',1]], cafe:[['카페울라','오션뷰 대형카페 · 천부','4.5',1],['카페너와','베이커리 · 천부','4.4',1],['숲크닉커피','피크닉 카페 · 현포','4.3',1]] },
  '서면': { food:[['다애식당','백반 · 남양','4.4',1],['동백식당','현지 가정식 · 남양','4.3',0],['우진이네','생선구이 · 남양','4.4',0]], cafe:[['카페울라','오션뷰 대형카페 · 천부 방면','4.5',1],['숲크닉커피','피크닉 카페 · 현포 방면','4.3',1]] },
  '섬밖': { food:[['저동항 회센터','물회 · 활어회 · 저동','4.4',1],['태양식당','따개비칼국수 · 저동','4.5',0]], cafe:[['저동커피','저동항','4.4',1],['독도문방구','굿즈 소품샵 · 저동','4.6',0]] }
};

// ── 명소 상세 페이지 렌더 ──
(function () {
  var box = document.getElementById('spotPage');
  if (!box) return;
  var id = new URLSearchParams(location.search).get('id');
  var s = SPOT_DB[id];
  if (!s) { location.replace('places.html'); return; }
  document.title = s.n + ' — 울릉트립';
  var h = '<a class="sp-back" href="places.html">← 볼거리 목록으로</a>' +
    '<div class="sp-crumb">📍 경상북도 울릉군 · ' + (s.region === '섬밖' ? '섬 속의 섬' : s.region) + '</div>' +
    '<div class="sp-headrow"><div><h1>' + s.n + '</h1><span class="sp-eng">' + s.eng + '</span></div>' +
    '<div class="sp-meta"><span class="rating big">★ ' + s.r + '</span>' + s.tags.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div></div>' +
    '<div class="sp-gallery"><div class="sp-g-main"><img src="' + s.img + '" alt="' + s.n + '"></div>' + '<div class="sp-g-side"><img src="' + s.gal[0] + '" alt=""><img src="' + s.gal[1] + '" alt=""></div></div>' +
    '<div class="sp-grid"><div class="sp-maincol">' +
    '<div class="sp-card"><h3>명소 소개</h3><p>' + s.desc + '</p>' +
    '<div class="sp-feats">' + s.feats.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div>' +
    '</div>' +
    '<div class="sp-card"><h3>방문 팁 & 리뷰</h3><ul class="sp-tips">' + s.tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
    (s.revs || []).map(function (rv) { return '<blockquote class="sp-rev"><span>★★★★★</span>' + rv[0] + '<b>— ' + rv[1] + '</b></blockquote>'; }).join('') + '</div>' +
    (function(){ var e = NEAR_EAT[s.region] || NEAR_EAT['울릉읍']; var li = function(x){ return '<li><div class="ne-l"><b>' + x[0] + '</b><span>' + x[1] + '</span></div>' + '<div class="ne-r"><i>★ ' + x[2] + '</i><em class="ne-pk' + (x[3] ? ' on' : '') + '">' + (x[3] ? '🅿️ 주차 가능' : '🚫 주차 불가') + '</em></div></li>'; }; return '<div class="sp-card"><h3>주변 맛집 · 카페</h3>' + '<h4 class="sp-sub">🍚 여행자들이 함께 찾은 맛집</h4><ul class="sp-near">' + e.food.map(li).join('') + '</ul>' + '<h4 class="sp-sub">☕ 이 주변 많이 가는 카페</h4><ul class="sp-near">' + e.cafe.map(li).join('') + '</ul>' + '<p class="rv-mapnote">' + (s.region === '섬밖' ? '저동' : s.region) + ' 근처 인기 리스트예요. 주차 정보는 방문 전 한 번 더 확인을 권장해요.</p></div>'; })() + '</div><aside class="sp-sidecol">' +
    '<div class="sp-card"><h3>운영 정보</h3><ul class="sp-info">' +
    '<li><i>⏰</i><div><b>운영 시간</b><span>' + s.hours + '</span></div></li>' +
    '<li><i>🗓️</i><div><b>휴무</b><span>' + s.closed + '</span></div></li>' +
    '<li><i>💶</i><div><b>요금</b><span>' + s.fee + '</span></div></li>' +
    '<li><i>📍</i><div><b>주소</b><span>' + s.addr + '</span></div></li></ul>' +
    (SPOT_BOOK[id] ? '<div class="sp-price"><b>' + s.fee + '</b><span>예매 필요</span></div><button type="button" class="btn btn-navy sp-book" style="width:100%">예매하기</button>' : '') + '<a class="btn btn-primary" style="width:100%;text-align:center" target="_blank" rel="noopener" href="' + (s.nv || 'https://map.naver.com/p/search/' + encodeURIComponent('울릉도 ' + s.n)) + '">네이버 지도 길찾기 →</a></div>' +
    (function(){ var mq = SPOT_MQ[id] || ('울릉군 ' + s.n); var emb = 'https://maps.google.com/maps?q=' + encodeURIComponent(mq) + '&z=15&hl=ko&output=embed'; return '<div class="sp-card"><h3>위치</h3><div class="sp-gmap"><iframe src="' + emb + '" loading="lazy" allowfullscreen title="지도"></iframe>' + '<button type="button" class="sp-map-zoom" id="spMapZoom" aria-label="지도 크게 보기" title="크게 보기">⛶</button></div>' + '<div class="sp-maplinks"><a target="_blank" rel="noopener" href="' + (s.nv || 'https://map.naver.com/p/search/' + encodeURIComponent(mq)) + '">네이버 지도 ↗</a>' + '<a target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mq) + '">구글 지도 ↗</a></div></div>'; })() +
    '</aside></div>';
  box.innerHTML = h;
  var bookBtn = box.querySelector('.sp-book');
  if (bookBtn) bookBtn.addEventListener('click', function () { alert('아직 준비 중입니다.'); });
  var zoomBtn = document.getElementById('spMapZoom');
  if (zoomBtn) zoomBtn.addEventListener('click', function () {
    var mq = SPOT_MQ[id] || ('울릉군 ' + s.n);
    var m = document.createElement('div');
    m.className = 'rv-modal on sp-mapmodal';
    m.innerHTML = '<div class="rv-box" style="max-width:1020px"><button type="button" class="rv-close" aria-label="닫기">✕</button>' +
      '<h3 style="font-size:18px;font-weight:800;color:var(--navy);margin-bottom:14px">📍 ' + s.n + '</h3>' +
      '<iframe src="https://maps.google.com/maps?q=' + encodeURIComponent(mq) + '&z=16&hl=ko&output=embed" allowfullscreen title="지도 크게 보기"></iframe></div>';
    document.body.appendChild(m);
    document.body.style.overflow = 'hidden';
    function cl() { m.remove(); document.body.style.overflow = ''; }
    m.addEventListener('click', function (e) { if (e.target === m) cl(); });
    m.querySelector('.rv-close').addEventListener('click', cl);
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { cl(); document.removeEventListener('keydown', esc); } });
  });
})();

// ── 인플루언서 팬하기 (데모) ──
document.querySelectorAll('.inf-fan').forEach(function (b) {
  b.addEventListener('click', function () { alert('아직 준비 중입니다.'); });
});

// ── 체험 상세 DB & 렌더 ──
var ACT_DB = {
  snorkel: { n:'스노클링 체험', eng:'Snorkeling', area:'학포 · 선창 · 통구미', img:'images/hero3.jpg', gal:['images/marine-sup.jpg','images/marine-kayak.jpg'], r:'4.8', tags:['#여름한정','#장비대여','#초보환영'],
    desc:'에메랄드빛 울릉 바다는 시야가 좋기로 유명해요. 학포·선창·통구미 일대의 스노클링 포인트에서 열대어 못지않은 바닷속 풍경을 만날 수 있습니다. 장비 대여와 안전 교육이 포함되어 처음이어도 걱정 없어요.',
    feats:['🤿 장비 풀세트 대여','👨‍🏫 안전 교육 포함','📷 수중 사진 촬영'],
    price:'1인 40,000원~', dur:'약 2시간', season:'6월 ~ 9월', meet:'업체별 상이 (학포항 등)', book:'업체 전화 · 네이버 예약',
    items:['수영복 · 여벌 옷','타월','방수팩','아쿠아슈즈'], mq:'울릉도 스노클링',
    tips:['오전 시간대가 물이 맑아요','수온이 낮은 날은 슈트 대여를 추천해요'],
    revs:[['물이 진짜 유리같아요. 울릉 와서 제일 잘한 일!','여행자 S']] },
  kayak: { n:'투명카약', eng:'Clear Kayak', area:'저동 · 천부', img:'images/marine-kayak.jpg', gal:['images/hero3.jpg','images/marine-sup.jpg'], r:'4.7', tags:['#인생샷','#커플추천','#가족추천'],
    desc:'바닥이 투명한 카약을 타고 울릉 바다 위를 미끄러져요. 발밑으로 바닷속이 훤히 들여다보여 아이들과 함께해도 좋고, 드론 촬영 서비스를 운영하는 업체도 있어요.',
    feats:['🛶 2인승 투명카약','🦺 구명조끼 제공','📸 인생샷 스팟'],
    price:'1인 30,000원~', dur:'약 1시간', season:'6월 ~ 9월', meet:'저동 · 천부 해변', book:'업체 전화 · 네이버 예약',
    items:['여벌 옷','방수팩','선크림'], mq:'울릉도 투명카약',
    tips:['바람 없는 오전이 초보자에게 편해요','휴대폰은 방수팩 필수!'],
    revs:[['발 밑이 다 보여서 신기했어요. 사진도 예쁘게 나와요.','여행자 K']] },
  sup: { n:'패들보드(SUP)', eng:'Stand Up Paddle', area:'천부 해변', img:'images/marine-sup.jpg', gal:['images/hero3.jpg','images/marine-kayak.jpg'], r:'4.6', tags:['#초보OK','#어드벤처','#절벽뷰'],
    desc:'보드 위에 서서 노를 저으며 해안 절벽 아래까지 다가가 보세요. 균형 잡는 법부터 차근차근 알려주기 때문에 수영을 못해도 즐길 수 있어요.',
    feats:['🏄 보드 · 패들 대여','👨‍🏫 입문 강습 포함','🌅 절벽 코스 투어'],
    price:'1인 40,000원~', dur:'약 1시간 30분', season:'6월 ~ 9월', meet:'천부 해변', book:'업체 전화 · 네이버 예약',
    items:['수영복 · 여벌 옷','타월','선크림'], mq:'울릉도 패들보드',
    tips:['무릎으로 시작해 천천히 일어서면 쉬워요','일몰 시간대 코스가 특히 아름다워요'],
    revs:[['절벽 밑까지 가는 코스가 압권이에요.','여행자 P']] },
  fishing: { n:'선상 낚시', eng:'Boat Fishing', area:'저동항 · 도동항 출발', img:'images/marine-fishing.jpg', gal:['images/hero4.jpg','images/hero1.jpg'], r:'4.5', tags:['#손맛','#오징어','#야간출조'],
    desc:'울릉 근해에서 즐기는 선상 낚시. 여름 밤에는 오징어 채낚기, 계절에 따라 방어·부시리까지 손맛이 다양해요. 잡은 고기는 회로 떠주는 선사도 있습니다.',
    feats:['🎣 낚시대 · 미끼 제공','🌙 야간 오징어 출조','🔪 현장 손질 가능'],
    price:'1인 60,000원~', dur:'약 3시간', season:'연중 (기상 영향)', meet:'저동항 · 도동항', book:'선사 전화 예약 (예약제)',
    items:['멀미약','바람막이','모자'], mq:'울릉도 선상낚시',
    tips:['출항 30분 전 멀미약을 미리 드세요','밤바다는 여름에도 쌀쌀해요 — 겉옷 필수'],
    revs:[['오징어 배 불빛 아래서 잡는 손맛, 잊을 수 없어요.','여행자 J']] },
  cruise: { n:'독도 크루즈 투어', eng:'Dokdo Cruise', area:'저동항 출발', img:'images/hero2.jpg', gal:['images/deal-cruise.jpg','images/hero4.jpg'], r:'4.6', tags:['#독도','#버킷리스트','#사전예매'],
    desc:'울릉도 여행의 하이라이트, 독도 여객선 투어예요. 왕복 3~4시간 일정으로, 기상이 좋으면 접안해 20~30분간 독도 땅을 밟을 수 있습니다. 접안이 어려운 날엔 선회 관람으로 대체돼요.',
    feats:['⛴️ 왕복 여객선','🏝️ 접안 시 상륙 20~30분','🇰🇷 독도명예주민증 발급 가능'],
    price:'1인 55,000원~', dur:'왕복 3~4시간', season:'연중 (기상 영향 큼)', meet:'저동항 여객터미널', book:'사전 예매 필수 · 신분증 지참',
    items:['신분증(필수)','멀미약','망원경'], mq:'울릉도 독도 여객선',
    tips:['접안 성공률이 높지 않아요 — 일정 중반에 배치하고 예비일을 두세요','독도관리사무소에서 독도명예주민증을 발급받을 수 있어요'],
    revs:[['접안 성공! 독도 땅 밟은 20분이 여행 전체의 하이라이트였어요.','여행자 A']] },
};
(function () {
  var box = document.getElementById('actPage');
  if (!box) return;
  var id = new URLSearchParams(location.search).get('id');
  var s = ACT_DB[id];
  if (!s) { location.replace('experience.html'); return; }
  document.title = s.n + ' — 울릉트립';
  var emb='https://maps.google.com/maps?q='+encodeURIComponent(s.mq)+'&z=13&hl=ko&output=embed';
  box.innerHTML = '<a class="sp-back" href="experience.html">← 즐길거리 목록으로</a>' +
    '<div class="sp-crumb">🏄 울릉도 체험 · ' + s.area + '</div>' +
    '<div class="sp-headrow"><div><h1>' + s.n + '</h1><span class="sp-eng">' + s.eng + '</span></div>' +
    '<div class="sp-meta"><span class="rating big">★ ' + s.r + '</span>' + s.tags.map(function(t){return '<span class="tag">'+t+'</span>';}).join('') + '</div></div>' +
    '<div class="sp-gallery"><div class="sp-g-main"><img src="'+s.img+'" alt="'+s.n+'"></div><div class="sp-g-side"><img src="'+s.gal[0]+'" alt=""><img src="'+s.gal[1]+'" alt=""></div></div>' +
    '<div class="sp-grid"><div class="sp-maincol">' +
    '<div class="sp-card"><h3>체험 소개</h3><p>'+s.desc+'</p><div class="sp-feats">'+s.feats.map(function(x){return '<span>'+x+'</span>';}).join('')+'</div></div>' +
    '<div class="sp-card"><h3>준비물</h3><ul class="rv-list">'+s.items.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul></div>' +
    '<div class="sp-card"><h3>참여 팁 & 리뷰</h3><ul class="sp-tips">'+s.tips.map(function(t){return '<li>'+t+'</li>';}).join('')+'</ul>' +
    (s.revs||[]).map(function(rv){return '<blockquote class="sp-rev"><span>★★★★★</span>'+rv[0]+'<b>— '+rv[1]+'</b></blockquote>';}).join('') + '</div>' +
    '</div><aside class="sp-sidecol">' +
    '<div class="sp-card"><h3>이용 정보</h3><ul class="sp-info">' +
    '<li><i>💶</i><div><b>요금</b><span>'+s.price+'</span></div></li>' +
    '<li><i>⏱️</i><div><b>소요 시간</b><span>'+s.dur+'</span></div></li>' +
    '<li><i>📅</i><div><b>운영 시기</b><span>'+s.season+'</span></div></li>' +
    '<li><i>📍</i><div><b>집합 장소</b><span>'+s.meet+'</span></div></li>' +
    '<li><i>📞</i><div><b>예약 방법</b><span>'+s.book+'</span></div></li></ul>' +
    '<button type="button" class="btn btn-navy sp-book" style="width:100%;margin-bottom:10px">예약하기</button>' +
    '<a class="btn btn-primary" style="width:100%;text-align:center" target="_blank" rel="noopener" href="https://map.naver.com/p/search/'+encodeURIComponent(s.mq)+'">네이버에서 업체 찾기 →</a></div>' +
    '<div class="sp-card"><h3>위치</h3><div class="sp-gmap"><iframe src="'+emb+'" loading="lazy" title="지도"></iframe></div></div>' +
    '</aside></div>';
  var bk = box.querySelector('.sp-book');
  if (bk) bk.addEventListener('click', function(){ alert('아직 준비 중입니다.'); });
})();

// ── 맛집·카페 상세 DB & 렌더 ──
var PLACE_DB = {
  sinbi: { n:'신비섬횟집', cat:'물회 · 전복죽', area:'도동', img:'images/hero3.jpg', r:'4.6',
    desc:'물회가 입맛을 바꿔놓는다는 도동의 횟집. 예능에도 소개된 곳으로, 특물회와 전복죽이 대표 메뉴예요.',
    menu:[['특물회','23,000원'],['전복죽','23,000원'],['모둠회(소)','60,000원']],
    hours:'10:30 – 20:00', brk:'15:00 – 17:00 브레이크타임', closed:'비정기 휴무', feats:['🅿️ 주차 가능','📞 예약 가능'], mq:'울릉도 신비섬횟집',
    tips:['성수기엔 오픈 직후 방문을 추천해요'], revs:[['물회 안 좋아했는데 여기서 입맛이 바뀌었어요.','여행자 L']] },
  narichon: { n:'나리촌식당', cat:'산채요리', area:'나리분지', img:'images/food-sanchae.jpg', r:'4.7',
    desc:'나리분지 산채요리의 대표 주자. 명이·부지깽이·삼나물이 한가득 오르는 산채비빔밥과 호박막걸리 궁합이 유명해요.',
    menu:[['산채비빔밥','12,000원'],['더덕구이 정식','15,000원'],['호박막걸리','8,000원']],
    hours:'09:00 – 18:00', brk:'', closed:'동절기 단축 운영', feats:['🅿️ 주차 가능','👥 단체석 보유'], mq:'울릉도 나리촌식당',
    tips:['성인봉 등반 후 점심 코스로 최고예요'], revs:[['나물 향이 진짜 달라요. 막걸리 꼭 드세요.','여행자 N']] },
  taeyang: { n:'태양식당', cat:'따개비칼국수', area:'저동', img:'images/food-ttagaebi.jpg', r:'4.5',
    desc:'따개비 육수의 시원한 감칠맛으로 유명한 저동의 칼국수집. 뱃길에 지친 속을 달래는 첫 끼로 제격이에요.',
    menu:[['따개비칼국수','10,000원'],['따개비밥','12,000원'],['해물파전','15,000원']],
    hours:'08:00 – 19:00', brk:'', closed:'비정기 휴무', feats:['🥡 포장 가능'], mq:'울릉도 태양식당',
    tips:['아침 일찍 문을 여니 입도 첫 끼로 좋아요'], revs:[['국물이 끝내줘요. 배에서 내리자마자 가세요.','여행자 T']] },
  yakso: { n:'약소불고기 명가', cat:'한우구이', area:'도동', img:'images/food-yakso.jpg', r:'4.6',
    desc:'산나물을 먹고 자란 울릉 약소는 육향이 다르다는 평. 저녁엔 예약이 몰리니 미리 전화해 두세요.',
    menu:[['약소불고기(1인)','35,000원'],['약소육회','40,000원'],['된장찌개','3,000원']],
    hours:'11:30 – 21:30', brk:'15:00 – 17:00 브레이크타임', closed:'비정기 휴무', feats:['📞 예약 필수','👥 단체석 보유'], mq:'울릉도 약소불고기',
    tips:['2인 이상이면 불고기+육회 반반을 추천해요'], revs:[['육질이 달라요. 울릉 오면 무조건 한 번은 먹어야 해요.','여행자 Y']] },
  honghap: { n:'도동 홍합밥집', cat:'향토음식', area:'도동 시가지', img:'images/food-honghap.jpg', r:'4.7',
    desc:'자연산 홍합을 듬뿍 넣어 지은 밥에 간장 양념을 슥슥 비벼 먹는 울릉 대표 향토음식. 도동 골목에 전문점이 모여 있어요.',
    menu:[['홍합밥','15,000원'],['홍합전','12,000원'],['산채모둠','10,000원']],
    hours:'08:00 – 20:00', brk:'', closed:'가게별 상이', feats:['🥡 포장 가능'], mq:'울릉도 홍합밥',
    tips:['홍합전까지 같이 시키면 후회 없어요'], revs:[['간장 비벼 먹는 그 맛… 아직도 생각나요.','여행자 H']] },
  hoecenter: { n:'저동항 회센터', cat:'물회 · 활어회', area:'저동항', img:'images/hero4.jpg', r:'4.4',
    desc:'울릉 근해에서 그날 잡은 오징어와 활어를 바로 맛보는 곳. 오징어물회가 여름 별미예요.',
    menu:[['오징어물회','18,000원'],['모둠회(중)','80,000원'],['매운탕','10,000원']],
    hours:'10:00 – 21:00', brk:'', closed:'기상 악화 시 휴무', feats:['🅿️ 주차 가능','👥 단체석 보유'], mq:'울릉도 저동항 회센터',
    tips:['저녁엔 오징어잡이 배 불빛 뷰는 덤이에요'], revs:[['싱싱함이 다르네요. 물회 강추!','여행자 C']] },
  theham: { n:'오션뷰 카페 더함', cat:'대형카페', area:'북면 죽암', img:'images/drive-taeha.jpg', r:'4.4',
    desc:'북면 바닷가의 전망 카페 겸 펜션. 통창 너머로 펼쳐지는 바다와 포토존이 많아 드라이브 코스 중간에 들르기 좋아요.',
    menu:[['아메리카노','7,000원'],['울릉 소금라떼','8,500원'],['크로플','9,000원']],
    hours:'10:00 – 19:00', brk:'', closed:'비정기 휴무', feats:['🅿️ 주차 가능','📷 포토존'], mq:'울릉도 카페 더함',
    tips:['일몰 시간대 창가 자리가 명당이에요'], revs:[['뷰 하나로 커피값 합니다.','여행자 D']] },
  ulla: { n:'카페울라', cat:'오션뷰 대형카페', area:'천부', img:'images/crs-stroll-card.jpg', r:'4.5',
    desc:'울릉도에서 가장 큰 규모의 오션뷰 카페. 천부 바다가 파노라마로 펼쳐지고, 울릉도 소금라떼가 시그니처예요.',
    menu:[['울릉도소금라떼','8,500원'],['아메리카노','7,000원'],['호박식혜','6,000원']],
    hours:'10:00 – 17:30', brk:'', closed:'비정기 휴무', feats:['🅿️ 주차 가능','🌊 오션뷰'], mq:'울릉도 카페울라',
    tips:['바람 부는 날은 야외석보다 실내 창가를 추천해요'], revs:[['소금라떼 + 바다 뷰 조합 최고.','여행자 U']] },
  jeodong: { n:'저동커피', cat:'로스터리 카페', area:'저동항', img:'images/hero1.jpg', r:'4.4',
    desc:'저동항 앞 로스터리 카페. 독도 굿즈 소품샵 독도문방구와 한 건물이라 커피와 기념품을 한 번에 해결할 수 있어요.',
    menu:[['아메리카노','5,500원'],['오징어먹물라떼','7,000원'],['독도 굿즈','5,000원~']],
    hours:'10:00 – 18:00', brk:'', closed:'비정기 휴무', feats:['🎁 굿즈샵 병설','🥡 테이크아웃'], mq:'울릉도 저동커피',
    tips:['독도문방구 굿즈는 선물용으로 인기예요'], revs:[['커피 마시고 굿즈 쇼핑까지, 동선 낭비가 없어요.','여행자 Z']] },
  glim: { n:'카페글림', cat:'디저트 카페', area:'도동', img:'images/walk-haengnam.jpg', r:'4.5',
    desc:'도동 골목의 아늑한 디저트 카페. 수제 디저트와 호박라떼가 인기라 산책 후 쉬어가기 좋아요.',
    menu:[['아메리카노','5,000원'],['수제 디저트','7,500원'],['호박라떼','6,500원']],
    hours:'11:00 – 20:00', brk:'', closed:'화요일 휴무', feats:['🍰 수제 디저트','☕ 골목 감성'], mq:'울릉도 카페글림',
    tips:['행남산책로 다녀온 뒤 코스로 딱이에요'], revs:[['디저트가 기대 이상! 아늑해요.','여행자 G']] },
  supknick: { n:'숲크닉커피', cat:'피크닉 카페', area:'현포', img:'images/spot-nari.jpg', r:'4.3',
    desc:'숲과 바다 사이에서 즐기는 피크닉 콘셉트 카페. 돗자리·바구니 세트를 빌려 나만의 피크닉 스팟을 만들 수 있어요.',
    menu:[['아메리카노','6,000원'],['피크닉세트 대여','25,000원'],['크림소다','7,500원']],
    hours:'10:00 – 18:00', brk:'', closed:'우천 시 휴무', feats:['🧺 피크닉 세트','🅿️ 주차 가능'], mq:'울릉도 숲크닉',
    tips:['맑은 날 예약하면 명당 스팟을 잡아줘요'], revs:[['사진이 다 화보가 돼요.','여행자 F']] },
};
// 다이닝코드풍 부가 데이터 (랭킹·리뷰수·취향태그·좋았던 점)
var PLACE_DC = {
  sinbi:    { rk:'울릉도 물회 1위', rv:214, moods:['#혼밥','#가족모임','#웨이팅 있음'], likes:[['맛있어요',88],['재료가 신선해요',81],['친절해요',66]] },
  narichon: { rk:'나리분지 맛집 1위', rv:187, moods:['#등산 후','#부모님과','#향토음식'], likes:[['맛있어요',85],['건강한 맛이에요',79],['양이 많아요',62]] },
  taeyang:  { rk:'울릉도 칼국수 1위', rv:156, moods:['#아침식사','#해장','#현지인단골'], likes:[['국물이 시원해요',86],['가성비가 좋아요',72],['빨리 나와요',64]] },
  yakso:    { rk:'울릉도 한식 2위', rv:203, moods:['#기념일','#가족모임','#예약추천'], likes:[['맛있어요',84],['고기 질이 좋아요',82],['친절해요',61]] },
  honghap:  { rk:'울릉도 향토음식 1위', rv:174, moods:['#혼밥','#첫울릉도','#골목맛집'], likes:[['맛있어요',87],['울릉에서만 먹어요',80],['반찬이 알차요',58]] },
  hoecenter:{ rk:'저동 횟집 2위', rv:98, moods:['#술모임','#바다뷰','#단체'], likes:[['재료가 신선해요',83],['양이 많아요',68],['뷰가 좋아요',60]] },
  theham:   { rk:'북면 카페 2위', rv:87, moods:['#드라이브','#포토존','#오션뷰'], likes:[['뷰가 좋아요',89],['사진이 잘 나와요',77],['조용해요',55]] },
  ulla:     { rk:'울릉도 카페 1위', rv:152, moods:['#오션뷰','#대형카페','#소금라떼'], likes:[['뷰가 좋아요',91],['시그니처가 있어요',74],['넓어요',67]] },
  jeodong:  { rk:'저동 카페 1위', rv:76, moods:['#굿즈','#기념품','#테이크아웃'], likes:[['굿즈가 귀여워요',82],['커피가 맛있어요',70],['위치가 편해요',63]] },
  glim:     { rk:'도동 카페 2위', rv:64, moods:['#디저트','#산책후','#아늑함'], likes:[['디저트가 맛있어요',84],['아늑해요',73],['친절해요',65]] },
  supknick: { rk:'울릉도 카페 4위', rv:41, moods:['#피크닉','#커플','#맑은날'], likes:[['컨셉이 좋아요',86],['사진이 잘 나와요',78],['한적해요',59]] }
};
(function () {
  var box = document.getElementById('placePage');
  if (!box) return;
  var id = new URLSearchParams(location.search).get('id');
  var s = PLACE_DB[id];
  if (!s) { location.replace('food.html'); return; }
  var d = PLACE_DC[id] || { rk:'', rv:0, moods:[], likes:[] };
  document.title = s.n + ' — 울릉트립';
  var emb = 'https://maps.google.com/maps?q=' + encodeURIComponent(s.mq) + '&z=15&hl=ko&output=embed';
  box.innerHTML = '<a class="sp-back" href="food.html">← 먹거리 목록으로</a>' +
    '<div class="sp-crumb">🍚 ' + s.cat + ' · ' + s.area + '</div>' +
    '<div class="sp-headrow"><div><h1>' + s.n + '</h1>' +
    (d.rk ? '<span class="dc-rank">🏆 ' + d.rk + '</span>' : '') + '</div>' +
    '<div class="sp-meta"><span class="rating big">★ ' + s.r + '</span><span class="dc-rv">리뷰 ' + d.rv + '</span></div></div>' +
    '<div class="dc-moods">' + d.moods.map(function (m) { return '<span class="dc-mood">' + m + '</span>'; }).join('') +
    s.feats.map(function (t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div>' +
    '<div class="dc-photos"><img src="' + s.img + '" alt="' + s.n + '">' +
    '<div class="dc-ph">📷<span>사진 준비 중</span></div>' +
    '<div class="dc-ph dc-more">＋<span>사진 더보기</span></div></div>' +
    '<div class="sp-grid"><div class="sp-maincol">' +
    '<div class="sp-card"><h3>이런 점이 좋았어요</h3><ul class="dc-likes">' +
    d.likes.map(function (l) {
      return '<li><span>' + l[0] + '</span><div class="dc-bar"><i style="width:' + l[1] + '%"></i></div><b>' + l[1] + '%</b></li>';
    }).join('') + '<p class="rv-mapnote">방문자 리뷰 키워드 통계예요. (데모 데이터)</p></ul></div>' +
    '<div class="sp-card"><h3>대표 메뉴</h3><ul class="menu-tbl">' + s.menu.map(function (m) { return '<li><b>' + m[0] + '</b><i></i><span>' + m[1] + '</span></li>'; }).join('') + '</ul><p class="rv-mapnote">가격은 데모 표기이며 실제와 다를 수 있어요.</p></div>' +
    '<div class="sp-card"><h3>방문자 리뷰 <small class="dc-rvcnt">' + d.rv + '</small></h3>' +
    (s.revs || []).map(function (rv) {
      return '<div class="dc-review"><span class="dc-av">' + rv[1].charAt(rv[1].length - 1) + '</span><div><div class="dc-rhead"><b>' + rv[1] + '</b><em>★★★★★</em></div><p>' + rv[0] + '</p></div></div>';
    }).join('') +
    '<ul class="sp-tips" style="margin-top:14px">' + s.tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>' +
    '</div><aside class="sp-sidecol">' +
    '<div class="sp-card"><h3>영업 정보</h3><ul class="sp-info">' +
    '<li><i>⏰</i><div><b>영업 시간</b><span>' + s.hours + '</span></div></li>' +
    (s.brk ? '<li><i>☕</i><div><b>브레이크타임</b><span>' + s.brk + '</span></div></li>' : '') +
    '<li><i>🗓️</i><div><b>휴무</b><span>' + s.closed + '</span></div></li>' +
    '<li><i>📍</i><div><b>위치</b><span>경북 울릉군 ' + s.area + '</span></div></li></ul>' +
    '<a class="ct-book" style="width:100%;justify-content:center;padding:13px 0;margin-bottom:10px" target="_blank" rel="noopener" href="https://map.naver.com/p/search/' + encodeURIComponent(s.mq) + '"><b>N</b> 네이버 플레이스 예약</a>' +
    '<a class="btn btn-primary" style="width:100%;text-align:center" target="_blank" rel="noopener" href="https://map.naver.com/p/search/' + encodeURIComponent(s.mq) + '">길찾기 →</a></div>' +
    '<div class="sp-card"><h3>위치</h3><div class="sp-gmap"><iframe src="' + emb + '" loading="lazy" title="지도"></iframe></div></div>' +
    '</aside></div>';
})();
