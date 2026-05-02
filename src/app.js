function gt(){var t=[];document.querySelectorAll('#tags input:checked').forEach(function(c){t.push(c.value)});return t}
function tr(){document.getElementById('rtog').classList.toggle('open');document.getElementById('rpv').classList.toggle('visible')}
function ts(m){var t=document.getElementById('tst');t.textContent=m;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2200)}

/* --- 翻译函数 --- */
function t(zh){
  if(!zh||currentLang==='zh')return zh;
  return ZH_TO_EN[zh]||zh;
}

/* ============================================
   创作者画像系统（核心升级）
   ============================================ */
var PROF_KEY='sdcc_profile';       // 画像数据
var PROF_CNT_KEY='sdcc_prof_cnt';  // 反馈轮次计数

// 读取画像
function getProfile(){
  return JSON.parse(localStorage.getItem(PROF_KEY)||'null');
}

// 保存画像
function saveProfileData(data){
  localStorage.setItem(PROF_KEY,JSON.stringify(data));
  renderProfile();
}

// 渲染画像到页面
function renderProfile(){
  var p=getProfile();
  var display=document.getElementById('profileDisplay');
  var rounds=document.getElementById('profileRounds');
  var hint=document.getElementById('profileHint');
  var btns=document.getElementById('profileBtns');
  var cnt=parseInt(localStorage.getItem(PROF_CNT_KEY)||'0');

  if(!p||(!p.like&&!p.avoid&&!p.style&&!p.extra)){
    display.innerHTML='<div style="color:var(--tm)">'+t('还没有画像数据。使用工具生成创意后，在下方写反馈，你的偏好会自动沉淀到这里。')+'</div>';
    rounds.textContent='';
    hint.innerHTML='<strong style="color:var(--cm)">'+t('为什么值得在这里反馈？')+'</strong> '+t('大模型里反馈关窗口就没了，这里的反馈会积累成你的「创作者画像」——一个跨模型、跨会话持久化的偏好档案，每次生成自动带上。');
    hint.style.marginTop='12px';
    btns.style.display='none';
    return;
  }

  btns.style.display='flex';
  rounds.textContent=cnt+' '+t('轮反馈');

  var h='';
  if(p.like)h+='<div><strong style="color:#22d3ee">✅ '+t('偏好：')+'</strong>'+p.like+'</div>';
  if(p.avoid)h+='<div><strong style="color:#f472b6">❌ '+t('避免：')+'</strong>'+p.avoid+'</div>';
  if(p.style)h+='<div><strong style="color:#8b5cf6">🎨 '+t('风格：')+'</strong>'+p.style+'</div>';
  if(p.extra)h+='<div><strong style="color:var(--tm)">📝 '+t('备注：')+'</strong>'+p.extra+'</div>';
  display.innerHTML=h;
  hint.textContent=t('↑ 此画像自动附加到每次生成的 Prompt 末尾，随反馈轮次更新');
}

// 生成画像的提示词片段
function buildProfileSnippet(){
  var p=getProfile();
  if(!p)return '';

  var hasContent=p.like||p.avoid||p.style||p.extra;
  if(!hasContent)return '';

  var cnt=parseInt(localStorage.getItem(PROF_CNT_KEY)||'0');
  var s='## 创作者画像（基于 '+cnt+' 轮反馈沉淀）\n\n';
  if(p.like)s+='偏好方向：'+p.like+'\n';
  if(p.avoid)s+='避免方向：'+p.avoid+'\n';
  if(p.style)s+='风格要求：'+p.style+'\n';
  if(p.extra)s+='补充说明：'+p.extra+'\n';
  s+='\n请根据以上画像调整输出方向，使其更贴合该创作者的审美和偏好。\n';
  return s;
}

// 编辑画像
function editProfile(){
  var p=getProfile()||{};
  document.getElementById('profLike').value=p.like||'';
  document.getElementById('profAvoid').value=p.avoid||'';
  document.getElementById('profStyle').value=p.style||'';
  document.getElementById('profExtra').value=p.extra||'';
  document.getElementById('profileEditor').style.display='block';
  document.getElementById('profileEditor').scrollIntoView({behavior:'smooth',block:'center'});
}

function cancelEditProfile(){
  document.getElementById('profileEditor').style.display='none';
}

// 从编辑区保存画像
function saveProfile(){
  var data={
    like:document.getElementById('profLike').value.trim(),
    avoid:document.getElementById('profAvoid').value.trim(),
    style:document.getElementById('profStyle').value.trim(),
    extra:document.getElementById('profExtra').value.trim()
  };
  saveProfileData(data);
  document.getElementById('profileEditor').style.display='none';
  ts(t('画像已保存'));
}

// 清空画像
function clearProfile(){
  if(!confirm(t('确定清空创作者画像？')))return;
  localStorage.removeItem(PROF_KEY);
  localStorage.removeItem(PROF_CNT_KEY);
  renderProfile();
  ts(t('画像已清空'));
}

/* ============================================
   反馈系统（升级：保存时自动更新画像）
   ============================================ */
var FB_KEY='sdcc_feedback';

// 从反馈中提取关键词，更新画像
function updateProfileFromFeedback(){
  var good=document.getElementById('fbGood').value.trim();
  var bad=document.getElementById('fbBad').value.trim();
  var pref=document.getElementById('fbPref').value.trim();
  if(!good&&!bad&&!pref)return;

  var current=getProfile()||{like:'',avoid:'',style:'',extra:''};

  if(good){
    current.like=current.like?(current.like+'；'+good):good;
    if(current.like.length>200)current.like=current.like.slice(-200);
  }
  if(bad){
    current.avoid=current.avoid?(current.avoid+'；'+bad):bad;
    if(current.avoid.length>200)current.avoid=current.avoid.slice(-200);
  }
  if(pref){
    current.style=current.style?(current.style+'；'+pref):pref;
    if(current.style.length>200)current.style=current.style.slice(-200);
  }

  var cnt=parseInt(localStorage.getItem(PROF_CNT_KEY)||'0');
  localStorage.setItem(PROF_CNT_KEY,String(cnt+1));

  saveProfileData(current);
}

// 生成反馈提示词片段
function buildFbSnippet(){
  var good=document.getElementById('fbGood').value.trim();
  var bad=document.getElementById('fbBad').value.trim();
  var pref=document.getElementById('fbPref').value.trim();
  if(!good&&!bad&&!pref)return null;

  var s='## 本轮反馈\n\n';
  if(good)s+='值得继续：'+good+'\n';
  if(bad)s+='要放弃：'+bad+'\n';
  if(pref)s+='偏好：'+pref+'\n';
  return s;
}

// 预览反馈提示词
function previewFb(){
  var fbSnippet=buildFbSnippet();
  var profileSnippet=buildProfileSnippet();
  if(!fbSnippet&&!profileSnippet){ts(t('请先填写反馈'));return}

  var preview='';
  if(profileSnippet)preview+=profileSnippet;
  if(fbSnippet)preview+=(profileSnippet?'---\n\n':'')+fbSnippet;

  document.getElementById('fbPreviewBox').textContent=preview;
  document.getElementById('fbPreview').style.display='block';
}

/* ============================================
   预设方案
   ============================================ */
var presets={
  '豪门甜宠':{aud:'女频 20-35岁',genre:'豪门甜宠',tags:['甜宠心动','甜宠喜剧','先婚后爱'],ref:''},
  '穿书':{aud:'女频 18-30岁',genre:'穿书',tags:['搞笑解压','奇幻脑洞','穿书反套路'],ref:''},
  '家庭喜剧':{aud:'全年龄 25-45岁',genre:'家庭喜剧',tags:['搞笑解压','治愈亲情','身份反转'],ref:''},
  '女性成长':{aud:'女频 25-40岁',genre:'女性成长',tags:['燃向成长','女性成长','大女主逆袭'],ref:''}
};

function preset(key){
  var p=presets[key];if(!p)return;
  document.getElementById('aud').value=p.aud;
  document.getElementById('genre').value=p.genre;
  document.querySelectorAll('#tags input').forEach(function(c){c.checked=p.tags.indexOf(c.value)>=0});
  document.getElementById('ref').value=p.ref||'';
  document.getElementById('cust').value='';
  ts(t('已加载预设')+'「'+key+'」');
}

/* ============================================
   历史记录
   ============================================ */
var HIST_KEY='sdcc_history';

function saveHist(prompt,modelName){
  var list=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');
  var item={ts:Date.now(),aud:document.getElementById('aud').value,genre:document.getElementById('genre').value,tags:gt(),prompt:prompt,model:modelName||'手动'};
  list.unshift(item);
  if(list.length>10)list=list.slice(0,10);
  localStorage.setItem(HIST_KEY,JSON.stringify(list));
  renderHist();
}

function renderHist(){
  var list=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');
  var sec=document.getElementById('histSection');
  var box=document.getElementById('histList');
  if(!list.length){sec.style.display='none';return}
  sec.style.display='block';
  var h='';
  list.forEach(function(it,i){
    var d=new Date(it.ts);
    var ds=(d.getMonth()+1)+'/'+d.getDate()+' '+d.getHours()+':'+String(d.getMinutes()).padStart(2,'0');
    h+='<div style="background:var(--s);border:1px solid var(--b);border-radius:12px;padding:16px 20px;margin-bottom:10px;cursor:pointer;transition:border-color .2s" onmouseenter="this.style.borderColor=\'var(--bf)\'" onmouseleave="this.style.borderColor=\'var(--b)\'" onclick="loadHist('+i+')">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">';
    h+='<span style="font-size:13px;font-weight:500;color:var(--tp)">'+it.aud+' · '+it.genre+(it.model?' · '+it.model:'')+'</span>';
    h+='<span style="font-size:11px;color:var(--tm)">'+ds+'</span></div>';
    h+='<div style="font-size:12px;color:var(--ts)">'+it.tags.join(' / ')+'</div>';
    h+='</div>';
  });
  box.innerHTML=h;
}

function loadHist(i){
  var list=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');
  var it=list[i];if(!it)return;
  document.getElementById('aud').value=it.aud;
  document.getElementById('genre').value=it.genre;
  document.querySelectorAll('#tags input').forEach(function(c){c.checked=it.tags.indexOf(c.value)>=0});
  document.getElementById('obox').textContent=it.prompt;
  document.getElementById('otitle').textContent='历史记录 · '+it.genre;
  var o=document.getElementById('opanel');
  o.classList.add('v');o.style.animation='none';o.offsetHeight;
  o.style.animation='fu .6s ease forwards';
  o.scrollIntoView({behavior:'smooth',block:'start'});
  ts(t('已加载历史记录'));
}

function clearHist(){
  localStorage.removeItem(HIST_KEY);
  renderHist();
  ts(t('已清空历史记录'));
}

/* ============================================
   核心 build 函数（画像自动附加）
   ============================================ */
function build(){
  var a=document.getElementById('aud').value.trim();
  var g=document.getElementById('genre').value;
  var e=gt();
  var r=document.getElementById('ref').value.trim();
  var c=document.getElementById('cust').value.trim();
  if(!a){ts(t('请填写目标受众'));return null}
  if(!e.length){ts(t('请至少选择一个核心情绪'));return null}

  var p='';
  p+='# 任务：生成短剧创意概念\n\n';
  p+='你是一个有10年经验的短剧爆款策划。根据以下需求生成3个短剧创意概念。\n';
  p+='所有判断基于2025H2-2026Q1真实爆款数据，不是凭空想象。\n\n';

  p+='## 创作需求\n\n';
  p+='- 目标受众：'+a+'\n';
  p+='- 题材方向：'+g+'\n';
  p+='- 核心情绪：'+e.join('、')+'\n';
  if(r)p+='- 参考爆款：'+r+'\n';
  if(c)p+='- 自定义规则：'+c+'\n';

  p+='\n---\n\n';

  p+='## 数据背景\n\n';
  p+='**受众：** 女性观众占比67%，25-34岁占比近五成，25-44岁占比57%\n';
  p+='**趋势：** 治愈救赎类占比增长6%；奇幻重生穿书占比提升；IP系列化成新爆款密码\n';
  p+='**标题：** 4字标题热力值最高(38.97亿)；高频词从"总裁/夫人/重生"转向"身份+行动"\n\n';
  p+='**2025H2-2026Q1市场四大爆款模式：**\n\n';
  p+='| 模式 | 核心公式 | 典型数据表现 |\n';
  p+='|---|---|---|\n';
  p+='| 豪门甜宠+地域反差 | 女主用鲜明地域性格"整顿"豪门规则 | 头部作品上线3天播放破10亿，热度近9000万 |\n';
  p+='| 大女主逆袭+古装权谋 | 现代思维碾压古代权贵，女主步步为营 | 头部作品开播热度破亿，观看量破10亿 |\n';
  p+='| 家庭喜剧+身份反转 | 极端身份错位制造荒诞喜剧（如18岁外表×长辈灵魂） | 系列化爆款，单部首日热度超5000万 |\n';
  p+='| 女性成长+穿书反套路 | 女性自我觉醒 / 多女主视角 / 穿书打破第四面墙 | 头部作品春节档首播破亿 |\n\n';

  p+='---\n\n';
  p+='## 你必须遵守的规则\n\n';

  // 规则零
  p+='### 规则零：从幻想开始，不从问题开始\n\n';
  p+='短剧是成人童话。观众不是来看自己的苦，是来看自己的苦被解决的。\n';
  p+='不要先想"观众有什么痛点"，先想"观众想成为什么样的人"。\n\n';
  p+='**三种幻想来源：**\n';
  p+='1. 能力幻想——她太强了，碾压所有人（如：用现代思维碾压古代权贵、用地域性格整顿豪门）\n';
  p+='2. 身份幻想——她有秘密，藏着惊人另一面（如：18岁外表长辈灵魂、隐藏的商业天才）\n';
  p+='3. 行动幻想——她先动手了，做了所有人不敢做的事（如：先婚后爱当场反击、重生后步步为营）\n\n';
  p+='**调性检验：**\n';
  p+='- ✅ "天哪她好厉害，我也想这样" → 对了\n';
  p+='- ❌ "唉她好惨，但还好她挺过来了" → 错了，换掉\n';
  p+='- ❌ "她好坚强，我也要加油" → 错了，这是鸡汤不是短剧\n\n';

  // 喜剧公式
  p+='### 喜剧公式（核心方法论）\n\n';
  p+='2025H2-2026Q1的爆款数据显示，带有喜剧元素的短剧更容易出圈。\n';
  p+='喜剧天然自带：意外、反差、放松、爽感、身份悬殊、情境错位。\n\n';
  p+='**公式：奇幻触发器 × 极端身份错位 × 家庭/情感关系 × 喜剧 × 治愈**\n\n';
  p+='| 要素 | 说明 | 案例 |\n';
  p+='|---|---|---|\n';
  p+='| 奇幻触发器 | 荒诞的"扳机"，扣下后故事开始 | 穿越、变年轻、读心、重生 |\n';
  p+='| 极端身份错位 | 身份落差越大越好 | 18岁外表×长辈灵魂、闺蜜双穿书 |\n';
  p+='| 家庭/情感关系 | 荒诞外壳下必须有真实的关系痛点 | 母女、婆媳、夫妻、闺蜜 |\n';
  p+='| 喜剧 | 身份错位制造的笑点每集都有 | 身份反差的日常碰撞 |\n';
  p+='| 治愈 | 笑完之后观众要感受到温暖 | 荒诞外壳下的情感和解 |\n\n';
  p+='**验证：** 用一句话描述概念，检查是否包含至少3个要素。不够3个就补。\n';
  p+='**参考：** "18岁少女成了一家之主，七十多岁的老头喊她太奶奶" → 奇幻触发器✓ 极端身份错位✓ 家庭关系✓ 喜剧✓\n\n';

  // 大女主
  p+='### 大女主原则（贯穿所有规则）\n\n';
  p+='观众追的不是CP，是女主。她是主角，他是观众。\n';
  p+='- 每个关键转折都是她做的决定\n';
  p+='- 他爱上她是因为她太强了，不是命运安排\n';
  p+='- CP是调味料，不是主菜\n';
  p+='- 片名、梗概、钩子，都要让人第一反应是"我也想成为她"\n\n';

  // 规则一
  p+='### 规则一：主引擎是"看她怎么做"\n\n';
  p+='观众追的不是"他俩在一起了吗"，是"她又做了什么"。\n';
  p+='- ✅ 她用现代商业思维碾压古代权贵，步步为营 → 看她怎么做是引擎\n';
  p+='- ✅ 她18岁外表70岁灵魂，用阅历碾压全场 → 她的判断力是引擎\n';
  p+='- ❌ 她遇到了一个很好的男人 → CP成了引擎\n';
  p+='- ❌ 她和前任重逢，误会解开 → 复合成了引擎\n\n';

  // 规则二
  p+='### 规则二：女主三关检验\n\n';
  p+='**配得感：** 她本来就值得，不是逆袭后才值得\n';
  p+='- ✅ 她一出场就是王者，不需要先落魄再逆袭\n';
  p+='- ❌ 她被老公抛弃，净身出户，觉得自己不配\n\n';
  p+='**快意恩仇：** 当场怼回去，不隔夜，不内耗\n';
  p+='- ✅ 婆婆刁难她，她当场掀桌"这规矩从今天起改了"\n';
  p+='- ❌ 她默默承受，等男主来救她\n\n';
  p+='**主体性：** 她做选择，不是被选择\n';
  p+='- ✅ 她选离开、她选回村、她选搞事业、她选他\n';
  p+='- ❌ 他选了她、命运安排了她\n\n';

  // 规则三
  p+='### 规则三：标题5铁律（基于市场爆款标题分析）\n\n';
  p+='1. **有情绪承诺**——观众看到标题就知道会得到什么感受\n';
  p+='   ✅ 标题自带情绪标签（甜宠/爽感/燃/治愈） ❌ 标题含义模糊\n';
  p+='2. **有反差**——至少一个词打破预期\n';
  p+='   ✅ 年龄×身份反差 / 日常×超常反差 ❌ 平铺直叙\n';
  p+='3. **有动词**——让标题有动态感\n';
  p+='   ✅ "谋""掌""专治"等动作词 ❌ 纯名词组合\n';
  p+='4. **4字或长句**——不要6-8字中间地带\n';
  p+='   ✅ 3-4字极简 / 15字以上完整长句 ❌ 6-8字不上不下\n';
  p+='5. **迭代高频词**——"总裁/夫人/重生"已审美疲劳\n';
  p+='   ✅ 用新意象替代旧套路 ❌ 还在用三年前的高频词\n\n';

  // 规则四
  p+='### 规则四：概念3铁律\n\n';
  p+='1. **一句话=情绪过山车**（至少两个情绪转折）\n';
  p+='   ✅ "18岁少女成了一家之主——七十多岁的老头喊她太奶奶" → 好奇→荒诞→笑\n';
  p+='   ✅ "她用东北话整顿了南洋豪门——从假女友变成了真家人" → 好奇→爽→暖\n';
  p+='2. **核心是"她做了什么"不是"她和谁在一起"**\n';
  p+='3. **观众看完必须是兴奋不是沉重**\n\n';

  // 规则五
  p+='### 规则五：CP——他被她吸引因为她太强\n\n';
  p+='磕点来自"差一点就说出口"和"他比所有人都先看到她有多厉害"。\n';
  p+='- ✅ 他在所有人面前单膝跪地，说"我等这一天等了很久"\n';
  p+='- ✅ 他说"我不竞标，我等你选"\n';
  p+='- ❌ 命运安排他们相遇\n';
  p+='- ❌ 他救了她\n\n';

  // 规则六
  p+='### 规则六：搞事业线是燃料\n\n';
  p+='事业线推动情感线和展现她的能力，不能盖过"看她怎么做"的主线。\n\n';

  // 规则七
  p+='### 规则七：常见错误（必须避免）\n\n';
  p+='1. **避免太实的职场戏**——股权、章程、公司治理，观众看短剧是来放松的\n';
  p+='2. **避免电影/文艺片感**——概念必须有每集明确的爽感来源和冲突引擎\n';
  p+='3. **避免自媒体vlog感**——有话题但没有剧情，缺乏爽感、意外、反套路\n';
  p+='4. **避免沉重调性**——"她好惨但挺过来了"不是短剧，是苦情戏\n';
  p+='5. **避免身份只靠"困境"定义**——被裁员、被抛弃是起点，不是身份；观众想看她拿到新牌后怎么打\n\n';

  if(c){p+='### 自定义规则\n\n';c.split('\n').forEach(function(l){l=l.trim();if(l)p+='- '+l+'\n'});p+='\n';}

  // 创作者画像（自动附加）
  var profileSnippet=buildProfileSnippet();
  if(profileSnippet){
    p+='---\n\n';
    p+=profileSnippet+'\n';
  }

  p+='---\n\n';

  // 生成流程
  p+='## 生成流程\n\n';
  p+='### 第一步：前置筛选——"我想成为她吗？"\n\n';
  p+='核心问题：一个25-35岁的女性观众刷到她的第一秒，会不会点进去？\n\n';
  p+='**让观众想点进去的女主特质：**\n';
  p+='- 她身上有"秘密"——看起来普通，但藏着惊人另一面\n';
  p+='- 她手握"底牌"——别人不知道她有多强\n';
  p+='- 她刚获得了某种"超能力"——重生/穿越/读心/变年轻\n';
  p+='- 她先动手了——做了所有人想做但不敢做的事\n';
  p+='- 她在某个圈子里是王者\n\n';
  p+='**关键：用"她能做什么"定义她，不用"别人对她做了什么"定义她。**\n';
  p+='即使她的起点是困境（被抛弃、被裁员），观众想看的不是"她多惨"，而是"她多强"。\n';
  p+='重点永远放在她接下来做了什么惊人的事。\n\n';

  p+='### 第二步：喜剧公式验证\n\n';
  p+='确定身份后，检查概念是否包含至少3/5要素（奇幻触发器/极端身份错位/家庭情感关系/喜剧/治愈）。\n';
  p+='不够3个就补充。缺"奇幻触发器"就加一个荒诞扳机。缺"家庭关系"就加一条亲情线。\n\n';

  p+='### 第三步：生成概念\n\n';
  p+='---\n\n';

  p+='## 输出格式\n\n';
  p+='### 概念X：《片名》（遵循标题5铁律）\n';
  p+='奇幻触发器：（什么荒诞事件扣下了故事的扳机）\n';
  p+='她是谁：（一句话身份。自检：观众想成为她吗？）\n';
  p+='她做什么：（故事主线——她做了什么，不是她和谁在一起）\n';
  p+='极端身份错位：（触发器制造了什么身份落差）\n';
  p+='高概念：（什么和什么撞在一起）\n';
  p+='一句话梗概：（情绪过山车：共情→愤怒→爽 / 好奇→意外→笑 / 荒诞→笑→暖）\n';
  p+='喜剧引擎：（每集的笑点来源是什么——身份错位的哪个维度在制造喜剧）\n';
  p+='家庭/情感线：（荒诞外壳下的真实关系痛点是什么）\n';
  p+='女主三关：配得感✓/✗ | 快意恩仇✓/✗ | 主体性✓/✗\n';
  p+='CP磕点：（他为什么被她吸引——因为她太强，不是命运安排）\n';
  p+='每集结构：（一集的爽感来源和节奏）\n';
  p+='开场钩子：（第一集第一个画面）\n';
  p+='风险提示：（可能踩什么坑）\n\n';

  p+='---\n\n';

  p+='## 最后检查（10项）\n\n';
  p+='输出完3个概念后，逐条检查：\n';
  p+='1. 女主身份通过"我想成为她吗"筛选？不通过直接换掉。\n';
  p+='2. 情绪是兴奋不是沉重？沉重就删掉重写。\n';
  p+='3. 核心是"她做了什么"不是"她和谁在一起"？后者就删掉重写。\n';
  p+='4. 标题通过5铁律？不通过就重写标题。\n';
  p+='5. 一句话梗概是情绪过山车？不是就重写。\n';
  p+='6. 女主通过三关检验？不通过就删掉。\n';
  p+='7. 三个概念有足够差异化？太像就替换一个。\n';
  p+='8. 三个概念覆盖不同情绪类型？缺就补。\n';
  p+='9. 通过喜剧公式验证（至少3/5要素）？不够就补。\n';
  p+='10. 每集有明确结构？没有就补充。\n';

  return p;
}

/* ============================================
   gen / pv / cp / dl
   ============================================ */
function gen(){
  var p=build();if(!p)return;
  document.getElementById('obox').textContent=p;
  document.getElementById('otitle').textContent='创意激发';
  var o=document.getElementById('opanel');
  o.classList.add('v');o.style.animation='none';o.offsetHeight;
  o.style.animation='fu .6s ease forwards';
  o.scrollIntoView({behavior:'smooth',block:'start'});
}

function pv(){
  var p=build();if(!p)return;
  var s=p.indexOf('## 你必须遵守的规则');
  var e=p.indexOf('## 生成流程');
  document.getElementById('obox').textContent=p.substring(s,e);
  document.getElementById('otitle').textContent='方法论';
  var o=document.getElementById('opanel');
  o.classList.add('v');o.style.animation='none';o.offsetHeight;
  o.style.animation='fu .6s ease forwards';
  o.scrollIntoView({behavior:'smooth',block:'start'});
}

function cp(){
  var t=document.getElementById('obox').textContent;
  navigator.clipboard.writeText(t).then(function(){ts(t('已复制'))}).catch(function(){
    var r=document.createRange();r.selectNodeContents(document.getElementById('obox'));
    var s=window.getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('copy');s.removeAllRanges();ts(t('已复制'));
  });
}

function dl(){
  var t=document.getElementById('obox').textContent;
  var b=new Blob([t],{type:'text/plain;charset=utf-8'});
  var u=URL.createObjectURL(b);var a=document.createElement('a');
  a.href=u;a.download='短剧策划_v9_'+new Date().toISOString().slice(0,10)+'.txt';
  a.click();URL.revokeObjectURL(u);ts(t('已下载'));
}


/* ============================================
   新增功能模块
   ============================================ */

/* --- API 设置（多模型预设） --- */
var PRESETS_KEY='sdcc_model_presets';
var API_KEY_KEY='sdcc_api_key';  // Key 存储在 sessionStorage（关闭页面自动清空）
var ACTIVE_KEY='sdcc_active_model';

var defaultPresets=[
  {id:'mimo',name:'MiMo v2.5 Pro',endpoint:'https://api.mimo.ai/v1/chat/completions',model:'mimo-v2.5-pro'},
  {id:'claude',name:'Claude',endpoint:'https://api.anthropic.com/v1/messages',model:'claude-sonnet-4-20250514'},
  {id:'gpt',name:'GPT-4o',endpoint:'https://api.openai.com/v1/chat/completions',model:'gpt-4o'},
  {id:'deepseek',name:'DeepSeek',endpoint:'https://api.deepseek.com/v1/chat/completions',model:'deepseek-chat'}
];

function getPresets(){
  var saved=JSON.parse(localStorage.getItem(PRESETS_KEY)||'null');
  if(!saved){saved=defaultPresets;localStorage.setItem(PRESETS_KEY,JSON.stringify(saved))}
  return saved;
}

function savePresets(presets){
  localStorage.setItem(PRESETS_KEY,JSON.stringify(presets));
}

function getActivePresetId(){
  return localStorage.getItem(ACTIVE_KEY)||'mimo';
}

function setActivePresetId(id){
  localStorage.setItem(ACTIVE_KEY,id);
}

function getActivePreset(){
  var presets=getPresets();
  var id=getActivePresetId();
  return presets.find(function(p){return p.id===id})||presets[0];
}

function renderPresetList(){
  var presets=getPresets();
  var activeId=getActivePresetId();
  var h='';
  presets.forEach(function(p){
    var isActive=p.id===activeId;
    h+='<div style="display:flex;align-items:center;justify-content:space-between;background:'+(isActive?'var(--as)':'var(--s)')+';border:1px solid '+(isActive?'var(--a)':'var(--b)')+';border-radius:10px;padding:10px 14px;margin-bottom:6px;cursor:pointer;transition:all .2s" onclick="selectPreset(\''+p.id+'\')">';
    h+='<div><div style="font-size:13px;font-weight:500;color:'+(isActive?'var(--a)':'var(--tp)')+'">'+p.name+'</div>';
    h+='<div style="font-size:10px;color:var(--tm)">'+p.model+' · '+p.endpoint.replace(/https?:\/\//,'').split('/')[0]+'</div></div>';
    h+='<div style="display:flex;gap:6px">';
    if(!isActive)h+='<button onclick="event.stopPropagation();editPreset(\''+p.id+'\')" style="font-size:10px;padding:3px 10px;border-radius:6px;border:1px solid var(--b);background:transparent;color:var(--ts);cursor:pointer">编辑</button>';
    if(p.id!=='mimo')h+='<button onclick="event.stopPropagation();deletePreset(\''+p.id+'\')" style="font-size:10px;padding:3px 10px;border-radius:6px;border:1px solid var(--b);background:transparent;color:var(--tm);cursor:pointer">×</button>';
    h+='</div></div>';
  });
  document.getElementById('presetList').innerHTML=h;
  updateModelSelector();
  updateActiveModelInfo();
}

function selectPreset(id){
  setActivePresetId(id);
  renderPresetList();
  ts(t('已切换到')+' '+getPresets().find(function(p){return p.id===id}).name);
}

function savePreset(){
  var name=document.getElementById('spName').value.trim();
  var endpoint=document.getElementById('spEndpoint').value.trim();
  var model=document.getElementById('spModel').value.trim();
  if(!name||!endpoint||!model){ts(t('请填写完整信息'));return}
  var presets=getPresets();
  var existingIdx=presets.findIndex(function(p){return p.name===name||p.model===model});
  var id=existingIdx>=0?presets[existingIdx].id:'custom_'+Date.now();
  var preset={id:id,name:name,endpoint:endpoint,model:model};
  if(existingIdx>=0)presets[existingIdx]=preset;else presets.push(preset);
  savePresets(presets);
  document.getElementById('spName').value='';
  document.getElementById('spEndpoint').value='';
  document.getElementById('spModel').value='';
  renderPresetList();
  ts(t('模型已保存')+' '+name);
}

function editPreset(id){
  var presets=getPresets();
  var p=presets.find(function(x){return x.id===id});
  if(!p)return;
  document.getElementById('spName').value=p.name;
  document.getElementById('spEndpoint').value=p.endpoint;
  document.getElementById('spModel').value=p.model;
  document.getElementById('spName').scrollIntoView({behavior:'smooth',block:'center'});
}

function deletePreset(id){
  if(!confirm('确定删除此模型？'))return;
  var presets=getPresets().filter(function(p){return p.id!==id});
  savePresets(presets);
  if(getActivePresetId()===id)setActivePresetId('mimo');
  renderPresetList();
  ts(t('已删除'));
}

function saveApiKey(){
  var key=document.getElementById('spKey').value.trim();
  if(!key){ts(t('请填写 API Key'));return}
  sessionStorage.setItem(API_KEY_KEY,key);
  document.getElementById('spKey').value='';
  ts(t('API Key 已保存'));
}

function updateModelSelector(){
  var presets=getPresets();
  var activeId=getActivePresetId();
  var sel=document.getElementById('modelSelector');
  if(!sel)return;
  var h='';
  presets.forEach(function(p){
    h+='<option value="'+p.id+'"'+(p.id===activeId?' selected':'')+'>'+p.name+'</option>';
  });
  sel.innerHTML=h;
  sel.onchange=function(){
    setActivePresetId(this.value);
    renderPresetList();
  };
}

function updateActiveModelInfo(){
  var p=getActivePreset();
  var key=sessionStorage.getItem(API_KEY_KEY)||'';
  var el=document.getElementById('activeModelInfo');
  if(!el)return;
  el.innerHTML=t('当前模型：')+'<strong style="color:var(--tp)">'+p.name+'</strong> ('+p.model+') · Key: '+(key?t('已配置'):t('未配置'))+' · <a href="javascript:void(0)" onclick="toggleSettings()" style="color:var(--d)">'+t('切换')+'</a>';
}

function toggleSettings(){
  var p=document.getElementById('settingsPanel');
  p.classList.toggle('visible');
  if(p.classList.contains('visible')){
    renderPresetList();
    var key=sessionStorage.getItem(API_KEY_KEY)||'';
    document.getElementById('spKey').value=key;
  }
}

async function testConnection(){
  var p=getActivePreset();
  var key=sessionStorage.getItem(API_KEY_KEY)||'';
  if(!key){document.getElementById('spStatus').textContent='✗ '+t('请先保存 API Key');document.getElementById('spStatus').style.color='#ef4444';return}
  document.getElementById('spStatus').textContent=t('连接')+' '+p.name+' '+t('中...');document.getElementById('spStatus').style.color='var(--d)';
  try{
    var isAnthropic=p.endpoint.indexOf('anthropic')>=0;
    var headers=isAnthropic?
      {'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'}:
      {'Content-Type':'application/json','Authorization':'Bearer '+key};
    var body=isAnthropic?
      JSON.stringify({model:p.model,max_tokens:10,messages:[{role:'user',content:'说"连接成功"'}]}):
      JSON.stringify({model:p.model,messages:[{role:'user',content:'说"连接成功"'}],max_tokens:10});
    var r=await fetch(p.endpoint,{method:'POST',headers:headers,body:body});
    if(r.ok){document.getElementById('spStatus').textContent='✓ '+p.name+' '+t('连接成功');document.getElementById('spStatus').style.color='#22c55e'}
    else{var errText=await r.text();document.getElementById('spStatus').textContent='✗ '+r.status+' '+errText.slice(0,80);document.getElementById('spStatus').style.color='#ef4444'}
  }catch(e){document.getElementById('spStatus').textContent='✗ '+t('网络错误:')+' '+e.message;document.getElementById('spStatus').style.color='#ef4444'}
}

/* --- 发送到模型（多模型支持） --- */
var generating=false;

async function genAI(){
  if(generating)return;
  var preset=getActivePreset();
  var key=sessionStorage.getItem(API_KEY_KEY)||'';
  if(!key){ts(t('请先在设置中配置 API Key'));toggleSettings();return}
  var p=build();if(!p)return;
  generating=true;
  var btn=document.getElementById('genAIBtn');
  btn.textContent=t('生成中...');btn.style.opacity='.6';
  var obox=document.getElementById('obox');
  obox.textContent='⏳ '+t('正在调用')+' '+preset.name+' ('+preset.model+') '+t('生成创意...')+'\n\n';
  obox.classList.add('gen-streaming');
  var opanel=document.getElementById('opanel');
  opanel.classList.add('v');opanel.style.animation='none';opanel.offsetHeight;
  opanel.style.animation='fu .6s ease forwards';
  opanel.scrollIntoView({behavior:'smooth',block:'start'});

  try{
    var isAnthropic=preset.endpoint.indexOf('anthropic')>=0;
    var headers,body;
    if(isAnthropic){
      headers={'Content-Type':'application/json','x-api-key':key,'anthropic-version':'2023-06-01'};
      body=JSON.stringify({
        model:preset.model,
        max_tokens:8192,
        system:'你是一个有10年经验的短剧爆款策划。严格按照用户的要求格式输出，不要添加额外的解释或说明。',
        messages:[{role:'user',content:p}]
      });
    }else{
      headers={'Content-Type':'application/json','Authorization':'Bearer '+key};
      body=JSON.stringify({
        model:preset.model,
        messages:[
          {role:'system',content:'你是一个有10年经验的短剧爆款策划。严格按照用户的要求格式输出，不要添加额外的解释或说明。'},
          {role:'user',content:p}
        ],
        stream:true
      });
    }

    var resp=await fetch(preset.endpoint,{method:'POST',headers:headers,body:body});
    if(!resp.ok){var errText=await resp.text();throw new Error('API 返回 '+resp.status+': '+errText.slice(0,200))}

    var fullText='';

    if(isAnthropic){
      // Anthropic non-streaming
      var data=await resp.json();
      fullText=data.content&&data.content[0]?data.content[0].text:'';
      obox.textContent=fullText;
    }else{
      // OpenAI-compatible streaming
      var reader=resp.body.getReader();
      var decoder=new TextDecoder();
      var buffer='';
      while(true){
        var result=await reader.read();
        if(result.done)break;
        buffer+=decoder.decode(result.value,{stream:true});
        var lines=buffer.split('\n');
        buffer=lines.pop();
        for(var i=0;i<lines.length;i++){
          var line=lines[i].trim();
          if(!line||!line.startsWith('data:'))continue;
          var data=line.slice(5).trim();
          if(data==='[DONE]')continue;
          try{
            var json=JSON.parse(data);
            var delta=json.choices&&json.choices[0]&&json.choices[0].delta;
            if(delta&&delta.content){
              fullText+=delta.content;
              obox.textContent=fullText;
              obox.scrollTop=obox.scrollHeight;
            }
          }catch(e){}
        }
      }
    }

    if(!fullText)throw new Error('API 返回空内容');
    obox.textContent=fullText;
    saveHist(fullText,preset.name);
    document.getElementById('otitle').textContent='创意激发（'+preset.name+'）';
    // 显示粘贴区（方便用户把结果粘到别的模型对比，或手动质检）
    document.getElementById('workflowHint').style.display='block';
    document.getElementById('pasteArea').style.display='block';
    document.getElementById('pasteInput').value=fullText;
    document.getElementById('qcResults').innerHTML='';
    // 反馈区
    document.getElementById('fbSection').style.display='block';
    document.getElementById('fbSaved').style.display='none';
    document.getElementById('fbPreview').style.display='none';
    initFeedbackCards(fullText);
    ts(preset.name+' '+t('生成完成'));
  }catch(e){
    obox.textContent='❌ '+t('生成失败:')+' '+e.message+'\n\n'+t('请检查 API 设置是否正确。');
    ts(t('生成失败'));
  }finally{
    generating=false;
    btn.textContent=t('发送到模型');btn.style.opacity='1';
    obox.classList.remove('gen-streaming');
  }
}

/* --- 质检（从粘贴区读取） --- */
function scrollToPaste(){
  var pa=document.getElementById('pasteArea');
  if(pa.style.display==='none'){
    // 还没生成过 Prompt，先提示
    ts(t('请先点击「生成创意 Prompt」'));
    return;
  }
  pa.scrollIntoView({behavior:'smooth',block:'center'});
  document.getElementById('pasteInput').focus();
}

function runQC(){
  var text=document.getElementById('pasteInput').value.trim();
  if(!text){ts(t('请先将大模型的输出结果粘贴到上方文本框'));return}
  var results=parseAndCheck(text);
  renderQCResults(results);
}

function parseAndCheck(text){
  var concepts=[];
  var placeholders=['片名','概念X','标题'];
  var conceptRegex=/###?\s*概念[一二三四五12345][：:]\s*《([^》]+)》/g;
  var match;
  var indices=[];
  while((match=conceptRegex.exec(text))!==null){
    if(placeholders.indexOf(match[1])<0)indices.push({idx:match.index,title:match[1]});
  }
  if(indices.length===0){
    var titleRegex=/《([^》]{1,20})》/g;
    var tm;
    while((tm=titleRegex.exec(text))!==null){
      if(placeholders.indexOf(tm[1])<0&&indices.length<5)indices.push({idx:tm.index,title:tm[1]});
    }
  }
  if(indices.length===0){
    concepts.push({title:'未识别到概念',text:text});
  }else{
    for(var i=0;i<indices.length;i++){
      var end=i+1<indices.length?indices[i+1].idx:text.length;
      concepts.push({title:indices[i].title,text:text.substring(indices[i].idx,end)});
    }
  }
  return concepts.map(function(c){return checkOneConcept(c)});
}

function checkOneConcept(concept){
  var r={title:concept.title,checks:[],level:'pass'};
  var t=concept.text;

  // 标题检查
  var titleLen=concept.title.length;
  var titleOk=titleLen<=4||titleLen>=15;
  r.checks.push({name:'标题长度',pass:titleOk,detail:titleLen+'字'+(titleOk?' ✓':' ⚠️ 建议改为4字或15字以上')});

  // 喜剧公式
  var comedyElements=[
    {name:'奇幻触发器',keywords:['奇幻','穿越','重生','穿书','读心','变年轻','系统','金手指','猝后','意外','觉醒']},
    {name:'身份错位',keywords:['身份错位','身份落差','身份反转','外表','灵魂','假扮','冒充','老祖宗','后妈','丫鬟','配角']},
    {name:'家庭关系',keywords:['母女','婆媳','夫妻','闺蜜','家庭','父女','父子','继子','继女','女儿','儿子','家人']},
    {name:'喜剧',keywords:['笑','喜剧','搞笑','解压','荒诞','反差','吐槽','幽默','欢乐']},
    {name:'治愈',keywords:['治愈','温暖','和解','感动','亲情','成长','拥抱','团圆']}
  ];
  var comedyCount=0;
  var comedyDetails=[];
  comedyElements.forEach(function(el){
    var found=el.keywords.some(function(k){return t.indexOf(k)>=0});
    if(found)comedyCount++;
    comedyDetails.push(found?'✓':'✗');
  });
  r.checks.push({name:'喜剧公式',pass:comedyCount>=3,detail:comedyCount+'/5 ('+comedyDetails.join(' ')+')'+(comedyCount>=3?' ✓':' ⚠️ 不足3个要素')});
  if(comedyCount<3)r.level='warn';

  // 女主三关
  var sanCheck=['配得感','快意恩仇','主体性'].map(function(k){
    var has=t.indexOf(k)>=0;
    var hasCheck=(t.indexOf(k+'✓')>=0)||(t.indexOf(k+'：✓')>=0)||(t.indexOf(k+': ✓')>=0);
    return has&&hasCheck?true:has?null:false;
  });
  var sanPass=sanCheck.filter(function(x){return x===true}).length;
  var sanTotal=sanCheck.filter(function(x){return x!==false}).length;
  r.checks.push({name:'女主三关',pass:sanPass>=3,detail:sanPass+'/3'+(sanPass>=3?' ✓':' ⚠️ 部分未通过')});

  // 调性检查
  var negativeWords=['惨','悲','沉重','可怜','凄惨','痛苦','悲哀'];
  var negCount=0;
  negativeWords.forEach(function(w){var idx=0;while((idx=t.indexOf(w,idx))!==-1){negCount++;idx+=w.length}});
  var positiveWords=['爽','厉害','强','碾压','逆袭','掌控','笑','燃'];
  var posCount=0;
  positiveWords.forEach(function(w){var idx=0;while((idx=t.indexOf(w,idx))!==-1){posCount++;idx+=w.length}});
  r.checks.push({name:'调性',pass:negCount<=posCount,detail:'正面词'+posCount+' / 负面词'+negCount+(negCount<=posCount?' ✓':' ⚠️ 负面情绪偏重')});
  if(negCount>posCount+2)r.level='warn';

  // 主引擎检查
  var maleWords=['男主','男主','他被','他爱上','命运安排'];
  var femaleWords=['女主','她做','她选','她用','她的决定','她太强'];
  var mCount=0,fCount=0;
  maleWords.forEach(function(w){if(t.indexOf(w)>=0)mCount++});
  femaleWords.forEach(function(w){if(t.indexOf(w)>=0)fCount++});
  r.checks.push({name:'主引擎',pass:fCount>=mCount,detail:'女主驱动 '+fCount+' / 男主驱动 '+mCount+(fCount>=mCount?' ✓':' ⚠️ CP可能抢了主线')});
  if(fCount<mCount)r.level='fail';

  // 规则七：常见错误
  var risks=[];
  if(t.indexOf('金手指')>=0&&(t.indexOf('太强')>=0||t.indexOf('预知')>=0))risks.push('金手指可能太强');
  if(t.indexOf('股权')>=0||t.indexOf('章程')>=0||t.indexOf('公司治理')>=0)risks.push('职场戏太实');
  if(t.indexOf('七零')>=0&&t.indexOf('随身空间')>=0)risks.push('七零+随身空间组合已用烂');
  if(risks.length>0){r.checks.push({name:'规则七风险',pass:false,detail:'⚠️ '+risks.join('；')});r.level='warn'}

  var failCount=r.checks.filter(function(c){return !c.pass}).length;
  if(failCount>=3)r.level='fail';
  return r;
}

function renderQCResults(results){
  var box=document.getElementById('qcResults');
  var h='';
  results.forEach(function(r){
    var cls=r.level==='pass'?'pass':r.level==='warn'?'warn':'fail';
    var icon=r.level==='pass'?'✅':r.level==='warn'?'⚠️':'❌';
    h+='<div class="qc-card '+cls+'">';
    h+='<div class="qc-title">'+icon+' 《'+r.title+'》</div>';
    r.checks.forEach(function(c){
      var ci=c.pass?'✓':c.pass===false?'✗':'?';
      h+='<div class="qc-line"><span class="qc-icon">'+ci+'</span> '+c.name+': '+c.detail+'</div>';
    });
    h+='</div>';
  });
  box.innerHTML=h;
}

/* --- 结构化反馈系统 --- */
var FB_CONCEPTS_KEY='sdcc_fb_concepts';
var TAG_WEIGHTS_KEY='sdcc_tag_weights';
var fbConcepts=[];
var fbMode='quick';

function switchFbMode(mode){
  fbMode=mode;
  document.getElementById('fbQuickMode').style.display=mode==='quick'?'block':'none';
  document.getElementById('fbProMode').style.display=mode==='pro'?'block':'none';
  document.querySelectorAll('.fb-mode-btn').forEach(function(b){
    b.classList.toggle('active',b.dataset.mode===mode);
  });
}

function initFeedbackCards(text){
  fbConcepts=[];
  // 过滤掉模板占位符
  var placeholders=['片名','概念X','标题'];
  var conceptRegex=/###?\s*概念[一二三四五12345][：:]\s*《([^》]+)》/g;
  var match;
  var indices=[];
  while((match=conceptRegex.exec(text))!==null){
    if(placeholders.indexOf(match[1])<0)indices.push({idx:match.index,title:match[1]});
  }
  if(indices.length===0){
    var titleRegex=/《([^》]{1,20})》/g;
    var tm;
    while((tm=titleRegex.exec(text))!==null){
      if(placeholders.indexOf(tm[1])<0&&indices.length<5)indices.push({idx:tm.index,title:tm[1]});
    }
  }
  indices.forEach(function(c){
    fbConcepts.push({title:c.title,decision:null,goodTags:[],badTags:[]});
  });
  renderFeedbackCards();
}

function initFeedbackFromPaste(){
  var text=document.getElementById('pasteInput').value.trim();
  if(!text){ts(t('请先将大模型的输出粘贴到上方文本框'));return}
  initFeedbackCards(text);
  document.getElementById('fbSection').style.display='block';
  document.getElementById('fbSaved').style.display='none';
  document.getElementById('fbPreview').style.display='none';
  document.getElementById('fbSection').scrollIntoView({behavior:'smooth',block:'start'});
  ts(t('已从粘贴内容识别出')+' '+fbConcepts.length+' '+t('个概念'));
}

var GOOD_TAGS=['身份错位','喜剧引擎','CP线','题材新鲜','标题好','情绪过山车','地域特色','女性力量','反套路','治愈感','每集有爽点'];
var BAD_TAGS=['金手指太强','标题不好','调性偏沉重','太平面','用烂了','CP抢主线','职场戏太实','缺喜剧','身份由困境定义','vlog感','缺差异'];

function renderFeedbackCards(){
  var box=document.getElementById('fbConceptCards');
  if(fbConcepts.length===0){box.innerHTML='<div style="font-size:12px;color:var(--tm)">请先生成创意（点击「生成创意 Prompt」或「发送到模型」）</div>';return}
  var h='';
  fbConcepts.forEach(function(c,i){
    h+='<div class="fb-concept-card">';
    h+='<div class="fb-concept-title">《'+c.title+'》</div>';
    h+='<div class="fb-decision-row">';
    h+='<button class="fb-dec-btn'+(c.decision==='continue'?' sel-continue':'')+'" onclick="setFbDecision('+i+',\'continue\')">✅ 继续</button>';
    h+='<button class="fb-dec-btn'+(c.decision==='polish'?' sel-polish':'')+'" onclick="setFbDecision('+i+',\'polish\')">🔧 打磨</button>';
    h+='<button class="fb-dec-btn'+(c.decision==='drop'?' sel-drop':'')+'" onclick="setFbDecision('+i+',\'drop\')">❌ 放弃</button>';
    h+='</div>';
    if(c.decision){
      if(c.decision==='continue'||c.decision==='polish'){
        h+='<div style="font-size:11px;color:var(--tm);margin-bottom:4px">值得继续的点：</div><div class="fb-tag-chips">';
        GOOD_TAGS.forEach(function(t){
          h+='<span class="fb-chip'+(c.goodTags.indexOf(t)>=0?' selected':'')+'" onclick="toggleFbTag('+i+',\'good\',\''+t+'\')">'+t+'</span>';
        });
        h+='</div>';
      }
      if(c.decision==='polish'||c.decision==='drop'){
        h+='<div style="font-size:11px;color:var(--tm);margin-bottom:4px;margin-top:8px">问题点：</div><div class="fb-tag-chips">';
        BAD_TAGS.forEach(function(t){
          h+='<span class="fb-chip neg'+(c.badTags.indexOf(t)>=0?' selected':'')+'" onclick="toggleFbTag('+i+',\'bad\',\''+t+'\')">'+t+'</span>';
        });
        h+='</div>';
      }
    }
    h+='</div>';
  });
  h+='<div class="fg" style="margin-top:12px"><label>补充说明（选填）</label><textarea id="fbNote" placeholder="自由补充..." rows="2"></textarea></div>';
  box.innerHTML=h;
}

function setFbDecision(idx,decision){
  fbConcepts[idx].decision=decision;
  fbConcepts[idx].goodTags=[];
  fbConcepts[idx].badTags=[];
  renderFeedbackCards();
}

function toggleFbTag(idx,type,tag){
  var arr=type==='good'?fbConcepts[idx].goodTags:fbConcepts[idx].badTags;
  var pos=arr.indexOf(tag);
  if(pos>=0)arr.splice(pos,1);else arr.push(tag);
  renderFeedbackCards();
}

function saveStructuredFeedback(){
  var hasDecision=fbConcepts.some(function(c){return c.decision});
  if(!hasDecision){ts(t('请至少对一个概念做出判断'));return}

  var list=JSON.parse(localStorage.getItem(FB_CONCEPTS_KEY)||'[]');
  list.unshift({
    ts:Date.now(),
    genre:document.getElementById('genre').value,
    tags:gt(),
    concepts:fbConcepts.map(function(c){return{title:c.title,decision:c.decision,goodTags:c.goodTags,badTags:c.badTags}}),
    note:(document.getElementById('fbNote')||{}).value||''
  });
  if(list.length>50)list=list.slice(0,50);
  localStorage.setItem(FB_CONCEPTS_KEY,JSON.stringify(list));

  // 更新标签权重
  var weights=JSON.parse(localStorage.getItem(TAG_WEIGHTS_KEY)||'{}');
  fbConcepts.forEach(function(c){
    if(c.decision==='continue'){
      c.goodTags.forEach(function(t){weights[t]=(weights[t]||0)+1});
    }else if(c.decision==='drop'){
      c.badTags.forEach(function(t){weights[t]=(weights[t]||0)-1});
    }else if(c.decision==='polish'){
      c.goodTags.forEach(function(t){weights[t]=(weights[t]||0)+0.5});
      c.badTags.forEach(function(t){weights[t]=(weights[t]||0)-0.5});
    }
  });
  localStorage.setItem(TAG_WEIGHTS_KEY,JSON.stringify(weights));

  // 同时更新文本画像
  updateProfileFromStructured();

  var cnt=parseInt(localStorage.getItem(PROF_CNT_KEY)||'0');
  localStorage.setItem(PROF_CNT_KEY,String(cnt+1));

  document.getElementById('fbSaved').innerHTML='✓ '+t('结构化反馈已保存，画像已更新')+'（第 '+(cnt+1)+' '+t('轮）')+'）';
  document.getElementById('fbSaved').style.display='block';
  ts(t('反馈已保存'));
  renderProfile();
}

function updateProfileFromStructured(){
  var weights=JSON.parse(localStorage.getItem(TAG_WEIGHTS_KEY)||'{}');
  var current=getProfile()||{like:'',avoid:'',style:'',extra:''};
  var positives=[];
  var negatives=[];
  Object.keys(weights).forEach(function(k){
    if(weights[k]>0)positives.push(k+'('+weights[k]+')');
    if(weights[k]<0)negatives.push(k+'('+weights[k]+')');
  });
  if(positives.length)current.like='标签偏好：'+positives.join('、');
  if(negatives.length)current.avoid='标签避免：'+negatives.join('、');
  saveProfileData(current);
}

function saveFb(){
  if(fbMode==='quick'){
    saveStructuredFeedback();
  }else{
    // Pro mode: save text + update profile from text
    var good=document.getElementById('fbGood').value.trim();
    var bad=document.getElementById('fbBad').value.trim();
    var pref=document.getElementById('fbPref').value.trim();
    if(!good&&!bad&&!pref){ts(t('请填写反馈'));return}
    var list=JSON.parse(localStorage.getItem(FB_KEY)||'[]');
    list.unshift({ts:Date.now(),good:good,bad:bad,pref:pref,genre:document.getElementById('genre').value,tags:gt()});
    if(list.length>20)list=list.slice(0,20);
    localStorage.setItem(FB_KEY,JSON.stringify(list));
    updateProfileFromFeedback();
    document.getElementById('fbGood').value='';
    document.getElementById('fbBad').value='';
    document.getElementById('fbPref').value='';
    var cnt=parseInt(localStorage.getItem(PROF_CNT_KEY)||'0');
    document.getElementById('fbSaved').innerHTML='✓ '+t('反馈已保存，创作者画像已更新')+'（第 '+cnt+' '+t('轮）')+'）';
    document.getElementById('fbSaved').style.display='block';
    ts(t('反馈已保存，画像已更新'));
  }
}

/* --- 数据看板 --- */
function toggleDashboard(){
  var d=document.getElementById('dashboard');
  d.classList.toggle('visible');
  if(d.classList.contains('visible'))renderDashboard();
}

function renderDashboard(){
  var hist=JSON.parse(localStorage.getItem(HIST_KEY)||'[]');
  var fbList=JSON.parse(localStorage.getItem(FB_CONCEPTS_KEY)||'[]');
  var fbText=JSON.parse(localStorage.getItem(FB_KEY)||'[]');
  var weights=JSON.parse(localStorage.getItem(TAG_WEIGHTS_KEY)||'{}');
  var totalFb=fbList.length+fbText.length;

  // 概览数字
  document.getElementById('dashGen').textContent=hist.length;
  document.getElementById('dashFb').textContent=totalFb;
  document.getElementById('dashProfile').textContent=parseInt(localStorage.getItem(PROF_CNT_KEY)||'0');

  // 题材统计
  var genreCount={};
  hist.forEach(function(h){genreCount[h.genre]=(genreCount[h.genre]||0)+1});
  var genreSorted=Object.keys(genreCount).sort(function(a,b){return genreCount[b]-genreCount[a]});
  var genreMax=genreSorted.length>0?genreCount[genreSorted[0]]:1;
  var genreHtml='';
  genreSorted.slice(0,5).forEach(function(g){
    var pct=Math.round(genreCount[g]/genreMax*100);
    genreHtml+='<div class="dash-bar-row"><span class="dash-bar-label">'+g+'</span><div class="dash-bar-track"><div class="dash-bar-fill" style="width:'+pct+'%;background:var(--a)">'+genreCount[g]+'</div></div></div>';
  });
  document.getElementById('dashGenreBars').innerHTML=genreHtml||'<div style="font-size:12px;color:var(--tm)">'+t('暂无数据')+'</div>';

  // 标签权重
  var posTags=Object.keys(weights).filter(function(k){return weights[k]>0}).sort(function(a,b){return weights[b]-weights[a]});
  var negTags=Object.keys(weights).filter(function(k){return weights[k]<0}).sort(function(a,b){return weights[a]-weights[b]});
  var posHtml='';
  posTags.slice(0,5).forEach(function(t){
    var pct=Math.min(100,Math.round(weights[t]/(posTags.length>0?weights[posTags[0]]:1)*100));
    posHtml+='<div class="dash-bar-row"><span class="dash-bar-label">'+t+'</span><div class="dash-bar-track"><div class="dash-bar-fill" style="width:'+pct+'%;background:#22c55e">+'+weights[t]+'</div></div></div>';
  });
  document.getElementById('dashPosTags').innerHTML=posHtml||'<div style="font-size:12px;color:var(--tm)">'+t('暂无正面标签数据')+'</div>';
  var negHtml='';
  negTags.slice(0,5).forEach(function(t){
    var pct=Math.min(100,Math.round(Math.abs(weights[t])/Math.abs(negTags.length>0?weights[negTags[0]]:1)*100));
    negHtml+='<div class="dash-bar-row"><span class="dash-bar-label">'+t+'</span><div class="dash-bar-track"><div class="dash-bar-fill" style="width:'+pct+'%;background:#ef4444">'+weights[t]+'</div></div></div>';
  });
  document.getElementById('dashNegTags').innerHTML=negHtml||'<div style="font-size:12px;color:var(--tm)">'+t('暂无负面标签数据')+'</div>';

  // 情绪标签统计
  var tagCount={};
  hist.forEach(function(h){(h.tags||[]).forEach(function(t){tagCount[t]=(tagCount[t]||0)+1})});
  var tagSorted=Object.keys(tagCount).sort(function(a,b){return tagCount[b]-tagCount[a]});
  var tagMax=tagSorted.length>0?tagCount[tagSorted[0]]:1;
  var tagHtml='';
  tagSorted.slice(0,5).forEach(function(t){
    var pct=Math.round(tagCount[t]/tagMax*100);
    tagHtml+='<div class="dash-bar-row"><span class="dash-bar-label">'+t+'</span><div class="dash-bar-track"><div class="dash-bar-fill" style="width:'+pct+'%;background:var(--cm)">'+tagCount[t]+'</div></div></div>';
  });
  document.getElementById('dashEmotionTags').innerHTML=tagHtml||'<div style="font-size:12px;color:var(--tm)">'+t('暂无数据')+'</div>';
}

/* --- 方法论实验室 --- */
var labRules={
  rule0:{on:true,name:'规则零：从幻想开始',desc:'不从痛点出发，从"观众想成为什么样的人"出发'},
  rule1:{on:true,name:'规则一：主引擎是"看她怎么做"',desc:'观众追的是她又做了什么'},
  rule2:{on:true,name:'规则二：女主三关',desc:'配得感 / 快意恩仇 / 主体性'},
  rule3:{on:true,name:'规则三：标题5铁律',desc:'有情绪承诺/有反差/有动词/4字或长句/迭代高频词'},
  rule4:{on:true,name:'规则四：概念3铁律',desc:'一句话=情绪过山车 / 核心是她做了什么 / 兴奋不是沉重'},
  rule5:{on:true,name:'规则五：CP规则',desc:'他被她吸引因为她太强'},
  rule6:{on:true,name:'规则六：搞事业线是燃料',desc:'事业线推动情感线'},
  rule7:{on:true,name:'规则七：常见错误',desc:'避免太实的职场戏/文艺片感/vlog感/沉重调性'}
};

function toggleLab(){
  var p=document.getElementById('labPanel');
  p.classList.toggle('visible');
  if(p.classList.contains('visible'))renderLab();
}

function renderLab(){
  var box=document.getElementById('labRules');
  var h='';
  Object.keys(labRules).forEach(function(k){
    var r=labRules[k];
    h+='<div class="lab-rule"><div><div class="lab-rule-name">'+r.name+'</div><div class="lab-rule-desc">'+r.desc+'</div></div>';
    h+='<label class="toggle"><input type="checkbox" '+(r.on?'checked':'')+' onchange="toggleLabRule(\''+k+'\')"><span class="slider"></span></label></div>';
  });
  box.innerHTML=h;
  updateLabDiff();
}

function toggleLabRule(key){
  labRules[key].on=!labRules[key].on;
  updateLabDiff();
}

function updateLabDiff(){
  var offRules=Object.keys(labRules).filter(function(k){return !labRules[k].on});
  var box=document.getElementById('labDiff');
  if(offRules.length===0){
    box.innerHTML='<div style="color:var(--d)">'+t('所有规则均已开启。生成的 Prompt 将包含完整的方法论体系。')+'</div>';
    return;
  }
  var h='<div style="color:var(--a);font-weight:500;margin-bottom:8px">'+t('已关闭')+' '+offRules.length+' '+t('条规则：')+'</div>';
  var impacts={
    rule0:t('将从痛点出发而非幻想出发，创意可能偏"苦情"'),
    rule1:t('可能生成以 CP 为主线而非女主为主线的概念'),
    rule2:t('不再检验女主的配得感、快意恩仇、主体性'),
    rule3:t('标题不再受5铁律约束，可能出现6-8字中间地带'),
    rule4:t('概念不再要求"一句话=情绪过山车"'),
    rule5:t('CP 可能回到"命运安排"的老套路'),
    rule6:t('搞事业线可能盖过主线'),
    rule7:t('不再规避职场戏太实、文艺片感等常见错误')
  };
  offRules.forEach(function(k){
    h+='<div style="margin-bottom:4px">· <strong>'+labRules[k].name+'</strong>：'+impacts[k]+'</div>';
  });
  h+='<div style="margin-top:12px;color:var(--tm)">'+t('关闭规则后点击「生成创意 Prompt」查看变化。')+'</div>';
  box.innerHTML=h;
}

function isLabRuleOn(key){return labRules[key]?labRules[key].on:true}

/* --- 扩展 build() 支持实验室规则开关 --- */
var _originalBuild=build;
build=function(){
  var p=_originalBuild();
  if(!p)return null;

  // 根据实验室规则过滤内容
  if(!isLabRuleOn('rule0')){
    p=p.replace(/### 规则零：从幻想开始，不从问题开始[\s\S]*?(?=### )/,'');
  }
  if(!isLabRuleOn('rule1')){
    p=p.replace(/### 规则一：主引擎是"看她怎么做"[\s\S]*?(?=### )/,'');
  }
  if(!isLabRuleOn('rule2')){
    p=p.replace(/### 规则二：女主三关检验[\s\S]*?(?=### )/,'');
  }
  if(!isLabRuleOn('rule3')){
    p=p.replace(/### 规则三：标题5铁律[\s\S]*?(?=### )/,'');
  }
  if(!isLabRuleOn('rule4')){
    p=p.replace(/### 规则四：概念3铁律[\s\S]*?(?=### )/,'');
  }
  if(!isLabRuleOn('rule5')){
    p=p.replace(/### 规则五：CP——他被她吸引因为她太强[\s\S]*?(?=### )/,'');
  }
  if(!isLabRuleOn('rule6')){
    p=p.replace(/### 规则六：搞事业线是燃料[\s\S]*?(?=### )/,'');
  }
  if(!isLabRuleOn('rule7')){
    p=p.replace(/### 规则七：常见错误（必须避免）[\s\S]*?(?=---)/,'');
  }
  return p;
};

/* --- 覆盖 gen() 支持结构化反馈 --- */
var _v9Gen=gen;
gen=function(){
  var p=build();if(!p)return;
  document.getElementById('obox').textContent=p;
  document.getElementById('otitle').textContent='创意激发';
  var o=document.getElementById('opanel');
  o.classList.add('v');o.style.animation='none';o.offsetHeight;
  o.style.animation='fu .6s ease forwards';
  o.scrollIntoView({behavior:'smooth',block:'start'});
  saveHist(p);
  // 显示流程指引和粘贴区
  document.getElementById('workflowHint').style.display='block';
  document.getElementById('pasteArea').style.display='block';
  document.getElementById('pasteInput').value='';
  document.getElementById('qcResults').innerHTML='';
  // 反馈区先隐藏，等用户粘贴大模型输出后再显示
  document.getElementById('fbSection').style.display='none';
  document.getElementById('fbSaved').style.display='none';
  document.getElementById('fbPreview').style.display='none';
};

/* ============================================
   i18n 中英文切换
   ============================================ */
var ZH_TO_EN={"短剧创意炼金坊 — 创意方法论引擎":"Short Drama Creative Alchemy — Creative Methodology Engine","短剧创意炼金坊":"Short Drama Creative Alchemy","基于2025H2-2026Q1短剧市场观察的":"Based on 2025H2-2026Q1 short drama market research","结构化创意方法论引擎":"Structured Creative Methodology Engine","，帮助创作者/制片人从受众需求出发，系统化激发高质量短剧创意。":", helping creators/producers systematically inspire high-quality short drama concepts starting from audience needs.","这个工具想解决的问题":"Problems this tool aims to solve","市场规律":"Market Patterns","和":"and","创作者个人特质":"Creator Personal Traits","AI 做执行，你做判断。画像跟着你一起成长。":"AI executes, you judge. The profile grows with you.","——帮你把方法论变成可操作的规则链，交给大模型跑出有亮点的半成品。":"— Turns methodology into actionable rule chains, letting the LLM produce a semi-finished product with highlights.","——观察哪些题材受欢迎、哪些模式具备爆款潜质，找到背后的结构性规律。":"— Observe which genres are popular, which patterns have hit potential, and uncover underlying structural patterns.","——通过持续的反馈沉淀，逐渐了解你的审美偏好、能力范围、兴趣方向，让每次激发都更贴合你这个人。":"— Through continuous feedback accumulation, gradually understand your aesthetic preferences, skill range, and interests, making each inspiration more tailored to you.","↓ 下一步：把大模型生成的结果粘贴回来":"↓ Next: Paste the LLM output back here","① 选参数 → ② 生成创意 Prompt → ③ 拿到大模型跑 → ④ 挑出亮点，写下反馈":"① Set Parameters → ② Generate Creative Prompt → ③ Run with LLM → ④ Pick highlights, write feedback","⑤ 画像自动更新 → ⑥ 调整参数再激发 →":"⑤ Profile auto-updates → ⑥ Adjust parameters, re-inspire →","⚙ 模型配置":"⚙ Model Configuration","同一个创意简报发给不同模型，对比输出差异。":"Send the same creative brief to different models, compare output differences.","创作不像代码——大纲、台词、人物无法拆分给不同模型拼装，需要整体交付、整体评估。":"Creation isn't like code — outlines, dialogue, and characters can't be split across models; it requires holistic delivery and evaluation.","添加 / 编辑模型":"Add / Edit Model","模型名称":"Model Name","模型 ID":"Model ID","保存模型":"Save Model","测试连接":"Test Connection","API Key（所有模型共享）":"API Key (Shared Across All Models)","保存 Key":"Save Key","⚠️ Key 仅临时存储（sessionStorage），关闭标签页后自动清空，需重新输入。":"⚠️ Keys are stored temporarily (sessionStorage) and cleared when you close the tab. Re-enter required.","⚡ 点选模式":"⚡ Point Mode","✅ 值得继续的方向":"✅ Worth Continuing","✅ 我喜欢的元素":"✅ Elements I Like","✅ 正向标签权重（反馈中「继续」的元素）":"✅ Positive Tag Weight (elements to continue)","✎ 写反馈":"✎ Write Feedback","✏️ 文本模式":"✏️ Text Mode","❌ 我不要的方向":"❌ Directions I Don't Want","❌ 要放弃的方向":"❌ Directions to Abandon","❌ 负向标签权重（反馈中「放弃」的原因）":"❌ Negative Tag Weight (reasons for abandoning)","一、提炼市场规律":"1. Extract Market Patterns","不从痛点出发，从\"观众想成为什么样的人\"出发。三种幻想：能力/身份/行动":"Not from pain points, but from \"who viewers want to become.\" Three fantasies: ability/identity/action","二、适配创作者":"2. Adapt to Creator","他被她吸引因为她太强":"He's drawn to her because she's too strong","参考爆款（选填）":"Reference hits (optional)","反馈轮次":"Feedback Rounds","创作":"Creation","创作者画像":"Creator Profile","创意激发":"Creative Inspiration","创意激发引擎":"Creative Inspiration Engine","参考与补充":"References & Supplements","数据":"Data","数据看板":"Dashboard","方法论实验室":"Methodology Lab","快速示例：":"Quick Example:","目标不是让你去追市场热点，而是帮你在市场机会和你的个人特质之间，":"Goal isn't to chase trending topics, but to help you find the intersection between market opportunities and your personal traits,","找到那个只属于你的交汇点。":"Find the intersection that belongs only to you.","这个工具做两件事：":"This tool does two things:","避免太实的职场戏 / 避免电影文艺片感 / 避免自媒体vlog感":"Avoid overly realistic workplace drama / avoid arthouse film feel / avoid vlog feel","生成创意 Prompt":"Generate Creative Prompt","质检":"Quality Check","预览反馈提示词":"Preview Feedback Prompt","查看完整规则与数据":"View Full Rules & Data","查看方法论":"View Methodology","保存反馈 & 更新画像":"Save Feedback & Update Profile","保存结构化反馈 & 更新画像":"Save Structured Feedback & Update Profile","发送到模型":"Send to Model","下载 .txt":"Download .txt","复制上方 Prompt → 发给大模型（MiMo / Claude / GPT 等）→ 将结果粘贴到下方 → 点击「质检」自动分析":"Copy prompt above → send to LLM (MiMo/Claude/GPT etc.) → paste result below → click \"QC\" for auto-analysis","配得感 / 快意恩仇 / 主体性":"Worthiness / Immediate Vengeance / Agency","大女主原则：":"Strong Heroine Principle:","观众追的是女主不是CP · 每个转折是她的决定 · CP是调味料":"Audiences follow the heroine, not the CP · Every turn is her decision · CP is seasoning","规则一 · 主引擎是\"看她怎么做\"":"Rule 1 · Main Engine: \"Watch What She Does\"","规则二 · 女主三关：":"Rule 2 · Heroine's Three Tests:","规则三 · 标题5铁律：":"Rule 3 · Title's 5 Iron Laws:","规则四 · 概念3铁律：":"Rule 4 · Concept's 3 Iron Laws:","规则五 · CP：":"Rule 5 · CP:","规则六 · 搞事业是燃料":"Rule 6 · The Career Arc is Fuel","规则七 · 常见错误：":"Rule 7 · Common Pitfalls:","规则零 · 从幻想开始":"Rule 0 · Start from Fantasy","甜宠喜剧":"Sweet Romance Comedy","复仇爽感":"Revenge Satisfaction","年代怀旧":"Era Nostalgia","现代都市":"Modern Urban","古装喜剧":"Period Comedy","古装权谋":"Period Political Intrigue","乡村田园":"Rural Pastoral","仙侠虐恋":"Fantasy Romance Tragic","奇幻穿越":"Fantasy Transmigration","奇幻脑洞":"Fantasy Imagination","穿书":"Book Transmigration","穿书反套路":"Book Transmigration Subversion","大女主逆袭":"Strong Heroine Counterattack","家庭喜剧":"Family Comedy","女性成长":"Female Growth","搞笑解压":"Comedy Stress Relief","悬疑复仇":"Suspense Revenge","甜宠心动":"Sweet Romance Heartflutter","豪门甜宠":"Wealthy Romance","闺蜜情":"Best Friend Bond","重生宅斗":"Rebirth Mansion Struggle","一句话=情绪过山车 / 核心是她做了什么 / 兴奋不是沉重":"One-liner = emotional rollercoaster / Core = what she did / Excitement not heaviness","至少包含3/5要素才算通过":"Must contain at least 3/5 elements to pass","中。":"Medium.","版本更新":"Version Update","v6新增":"v6 New","· 首版发布：7大规则体系 + 自动质检 + 创作者画像 + 多模型对比 + 数据看板":"· Initial release: 7 rule system + auto QC + creator profile + multi-model comparison + dashboard","系列化成新爆款密码 · 喜剧元素出圈率显著提升 · 地域特色题材崛起":"Series format becomes new hit code · Comedy elements breakout rate significantly up · Region-specific genres rising","本工具为单文件零依赖，无第三方脚本，无网络请求（除你主动调用的模型 API）。Key 不会上传到任何第三方服务器。":"This tool is single-file zero-dependency, no third-party scripts, no network requests (except your LLM API calls). Keys never uploaded.","我的创作者画像":"My Creator Profile","题材偏好":"Genre Preference","题材方向":"Genre Direction","目标受众":"Target Audience","核心情绪":"Core Emotion","🎨 我的风格偏好":"🎨 My Style Preferences","🏠 豪门甜宠":"🏠 Wealthy Family Sweet Romance","👨‍👩‍👧 家庭喜剧":"👨‍👩‍👧 Family Comedy","👩‍👩‍👩 女性成长":"👩‍👩‍👩 Female Growth","💡 使用方式":"💡 How to Use","📋 历史记录":"📋 History","📋 粘贴大模型的输出结果":"📋 Paste LLM Output","📖 穿书穿越":"📖 Book Transmigration","📝 补充说明（选填）":"📝 Additional Notes (Optional)","🔍 自动质检":"🔍 Auto QC","点选标签或自由书写 → 更新创作者画像 → 下次激发更精准":"Select tags or freewrite → update creator profile → more precise next inspiration","画像迭代":"Profile Iteration","生成次数":"Generation Count","生成 Prompt":"Generate Prompt","提示词片段":"Prompt Snippet","以下为反馈 + 画像生成的提示词片段：":"Here's a snippet of the prompt for feedback + profile generation:","你的判断标准、审美偏好、经验积累，都会沉淀到":"Your judgment criteria, aesthetic preferences, and experience will all precipitate into","先婚后爱":"Marriage First, Love Later","性别互换":"Gender Swap","身份反转":"Identity Reversal","武林高手在校园":"Martial Arts Master in School","-select-":"- Select -","以下是反馈 + 画像生成的提示词片段：":"Prompt snippet for feedback + profile generation:","保存画像":"Save Profile","反馈沉淀":"Feedback Accumulation","取消":"Cancel","受众与题材":"Audience & Genre","喜剧公式":"Comedy Engine Formula","地域烟火气":"Local Atmosphere & Flavor","地域特色":"Regional Characteristics","基于2025H2-2026Q1短剧市场爆款观察 · 女性观众占比67% · 25-34岁占比近五成":"Based on 2025H2-2026Q1 short drama hit observation · Female audience 67% · 25-34 age group ~50%","复制":"Copy","奇幻触发器 × 极端身份错位 × 家庭/情感关系 × 喜剧 × 治愈":"Fantasy Trigger × Extreme Identity Misplacement × Family/Emotional Line × Comedy × Healing","好的创意不是凭空生成的，也不是简单复制市场爆款。好的创意来自":"Good ideas aren't conjured from thin air, nor simple copies of hits. Good ideas come from","完整循环：":"Complete Loop:","实验室":"Lab","将此 Prompt 拿到大模型中跑出结果，挑出你感兴趣的亮点，再回来调整参数重新激发。好的创意是迭代出来的。":"Run this prompt through the LLM, pick highlights of interest, then return to adjust and re-inspire. Good ideas are iterated.","开关规则，观察 Prompt 变化":"Toggle rules, observe prompt changes","循环往复，越来越好":"Cycle and repeat, getting better","情绪标签使用":"Emotion Label Usage","数据基础":"Data Foundation","有情绪承诺 / 有反差 / 有动词 / 4字或长句 / 迭代高频词":"Has emotional promise / Has contrast / Has action verb / 4-char or long phrase / Iterative high-frequency words","核心":"Core","治愈亲情":"Healing Family Bond","清空":"Clear","燃向成长":"Passionate Growth","的交汇点。":"intersection.","编辑":"Edit","编辑创作者画像":"Edit Creator Profile","自定义规则（选填）":"Custom Rules (Optional)","这不是一键生成工具。它是一个":"This is not a one-click generator. It's a","（可多选）":"(multiple select allowed)","已加载预设":"Loaded preset","已加载历史记录":"History loaded","已清空历史记录":"History cleared","已切换到":"Switched to","请填写完整信息":"Please fill in all fields","模型已保存":"Model saved","请先保存 API Key":"Please save your API Key first","连接":"Connecting","中...":"...","连接成功":"Connected","网络错误:":"Network error:","请先在设置中配置 API Key":"Please configure an API Key in settings first","生成中...":"Generating...","正在调用":"Calling","生成创意...":"generating ideas...","生成完成":"completed","生成失败:":"Generation failed:","请检查 API 设置是否正确。":"Please check your API settings.","请先点击「生成创意 Prompt」":"Please click \"Generate Creative Prompt\" first","请先将大模型的输出结果粘贴到上方文本框":"Please paste the LLM output in the text box above","请先将大模型的输出粘贴到上方文本框":"Please paste the LLM output in the text box above","已从粘贴内容识别出":"Identified","个概念":"concepts from pasted content","请至少对一个概念做出判断":"Please make a judgment on at least one concept","反馈已保存":"Feedback saved","请填写反馈":"Please fill in feedback","反馈已保存，画像已更新":"Feedback saved, profile updated","已复制":"Copied","已下载":"Downloaded","请填写目标受众":"Please fill in target audience","请至少选择一个核心情绪":"Please select at least one core emotion","已删除":"Deleted","请填写 API Key":"Please fill in API Key","API Key 已保存":"API Key saved","画像已保存":"Profile saved","画像已清空":"Profile cleared","已清空":"Cleared","暂无数据":"No data yet","暂无正面标签数据":"No positive tag data yet","暂无负面标签数据":"No negative tag data yet","所有规则均已开启。生成的 Prompt 将包含完整的方法论体系。":"All rules enabled. The generated prompt will include the complete methodology system.","已关闭":"Disabled","条规则：":"rules:","将从痛点出发而非幻想出发，创意可能偏\"苦情\"":"Will start from pain points instead of fantasy, ideas may become \"melodrama\"","可能生成以 CP 为主线而非女主为主线的概念":"May generate concepts where CP is the main thread instead of the heroine","不再检验女主的配得感、快意恩仇、主体性":"No longer checks heroine worthiness, immediate vengeance, agency","标题不再受5铁律约束，可能出现6-8字中间地带":"Title no longer bound by 5 iron laws, may fall in the 6-8 char dead zone","概念不再要求\"一句话=情绪过山车\"":"Concept no longer requires \"one-liner = emotional rollercoaster\"","CP 可能回到\"命运安排\"的老套路":"CP may revert to the \"fate arranged\" trope","搞事业线可能盖过主线":"Career arc may overshadow the main story","不再规避职场戏太实、文艺片感等常见错误":"No longer avoids common pitfalls like overly realistic workplace drama, arthouse feel","关闭规则后点击「生成创意 Prompt」查看变化。":"Click \"Generate Creative Prompt\" after disabling rules to see changes.","结构化反馈已保存，画像已更新":"Structured feedback saved, profile updated","反馈已保存，创作者画像已更新":"Feedback saved, creator profile updated","还没有画像数据。使用工具生成创意后，在下方写反馈，你的偏好会自动沉淀到这里。":"No profile data yet. After generating ideas, write feedback below and your preferences will accumulate here.","为什么值得在这里反馈？":"Why give feedback here?","大模型里反馈关窗口就没了，这里的反馈会积累成你的「创作者画像」——一个跨模型、跨会话持久化的偏好档案，每次生成自动带上。":"Feedback in LLMs disappears when you close the window. Here it accumulates into your Creator Profile — a persistent preference file across models and sessions, auto-attached to every generation.","轮反馈":"rounds of feedback","偏好：":"Preferences:","避免：":"Avoid:","风格：":"Style:","备注：":"Notes:","↑ 此画像自动附加到每次生成的 Prompt 末尾，随反馈轮次更新":"↑ This profile is auto-appended to every generated prompt, updated with each feedback round","当前模型：":"Current model:","已配置":"Configured","未配置":"Not configured","切换":"Switch","确定清空创作者画像？":"Clear creator profile?","请先生成创意（点击「生成创意 Prompt」或「发送到模型」）":"Generate ideas first (click \"Generate Creative Prompt\" or \"Send to Model\")","值得继续的点：":"Points worth continuing:","问题点：":"Issues:","自由补充...":"Free notes...","轮）":"rounds)"};

var EN_TO_ZH={};
Object.keys(ZH_TO_EN).forEach(function(k){EN_TO_ZH[ZH_TO_EN[k]]=k});

var currentLang=localStorage.getItem('sdcc-lang')||'zh';
var applied=false;
var originalTexts=new Map();

function snapshotPage(){
  var container=document.querySelector('.app')||document.body;
  var walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);
  var node;
  while(node=walker.nextNode()){
    var tag=(node.parentElement&&node.parentElement.tagName||'').toLowerCase();
    if(['script','style','textarea','noscript','option','code','pre','svg','canvas','img','link','meta'].indexOf(tag)>=0)continue;
    if(node.parentElement&&node.parentElement.hasAttribute('contenteditable'))continue;
    var txt=node.textContent.trim();
    if(txt in ZH_TO_EN)originalTexts.set(node,txt);
  }
}

function toggleLang(){
  currentLang=currentLang==='zh'?'en':'zh';
  localStorage.setItem('sdcc-lang',currentLang);
  applyLang();
  updateLangButton();
}

function updateLangButton(){
  var btn=document.getElementById('langToggle');
  if(btn){
    btn.textContent=currentLang==='zh'?'English':'中文';
  }
}

function applyLang(){
  document.documentElement.setAttribute('data-lang',currentLang);
  if(currentLang==='zh'){
    originalTexts.forEach(function(orig,node){node.textContent=orig});
    var container=document.querySelector('.app')||document.body;
    var walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);
    var node2;
    while(node2=walker.nextNode()){
      var tag=(node2.parentElement&&node2.parentElement.tagName||'').toLowerCase();
      if(['script','style','textarea','noscript','option','code','pre','svg','canvas','img','link','meta'].indexOf(tag)>=0)continue;
      var txt=node2.textContent.trim();
      if(EN_TO_ZH[txt])node2.textContent=EN_TO_ZH[txt];
    }
    // restore <option> tags
    document.querySelectorAll('select option').forEach(function(opt){
      var orig=opt.getAttribute('data-zh');
      if(orig){opt.textContent=orig;opt.removeAttribute('data-zh')}
    });
    applied=false;
    snapshotPage();
    return;
  }
  if(applied)return;
  originalTexts.forEach(function(orig,node){node.textContent=ZH_TO_EN[orig]});
  // translate <option> tags
  document.querySelectorAll('select option').forEach(function(opt){
    var zh=opt.textContent.trim();
    if(ZH_TO_EN[zh]){
      opt.setAttribute('data-zh',zh);
      opt.textContent=ZH_TO_EN[zh];
    }
  });
  applied=true;
}

window.addEventListener('load',function(){
  snapshotPage();
  applyLang();
  updateLangButton();
});


/* ============================================
   初始化
   ============================================ */
renderHist();
renderProfile();
renderPresetList();

/* --- Tab 切换 --- */
function switchTab(tab){
  document.querySelectorAll('.nav-tab').forEach(function(b){b.classList.remove('active')});
  event.target.classList.add('active');
  document.getElementById('dashboard').classList.remove('visible');
  document.getElementById('labPanel').classList.remove('visible');
  if(tab==='dashboard')toggleDashboard();
  if(tab==='lab')toggleLab();
  if(tab==='create'){/* show default sections */}
}


document.addEventListener('click',function(e){
  var sp=document.getElementById('settingsPanel');
  var btn=document.querySelector('.settings-btn');
  if(sp&&!sp.contains(e.target)&&!btn.contains(e.target))sp.classList.remove('visible');
});

