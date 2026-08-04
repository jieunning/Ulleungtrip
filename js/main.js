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
