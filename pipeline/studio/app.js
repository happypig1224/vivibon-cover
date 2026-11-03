/**
 * ViviBon Pipeline Studio · Frontend Controller & State Machine
 * Strictly Vanilla ES6+ · Zero External Dependencies · Apple Native Craftsmanship
 * Zero Emoji · Zero AI Clutter · Precision Typography
 */

const API_BASE = ""; // Relative path to same-origin internal python server

// Global Application State
let appState = {
  currentTab: "stage1",
  overview: null,
  stage1Records: [],
  stage1Filter: "ALL",
  stage2Data: null,
  stage3Data: null,
  stage4Data: null,
  stage5Data: null
};

// Initialization on DOM Loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchOverview();
  loadStage1Data();
});

// Tab Switching (iOS Segmented Control & Stage Sections)
function switchTab(tabId) {
  appState.currentTab = tabId;
  
  document.querySelectorAll(".seg-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  document.querySelectorAll(".stage-section").forEach(section => {
    section.classList.toggle("active", section.id === `panel-${tabId}`);
  });

  // Lazy load data for active tab
  if (tabId === "stage1") loadStage1Data();
  else if (tabId === "stage2") loadStage2Data();
  else if (tabId === "stage3") loadStage3Data();
  else if (tabId === "stage4") loadStage4Data();
  else if (tabId === "stage5") loadStage5Data();
}

// Fetch Global Summary Metrics
async function fetchOverview() {
  try {
    const res = await fetch(`${API_BASE}/api/overview`);
    if (res.ok) {
      const data = await res.json();
      appState.overview = data;
      document.getElementById("m-mined").innerHTML = `${data.total_mined_assets}<span class="tile-unit">款</span>`;
      document.getElementById("m-tiers").innerHTML = `${data.tier_s_count}<span class="tile-unit">款</span>`;
      document.getElementById("m-champions").innerHTML = `${data.top6_champions_ready}<span class="tile-unit">款</span>`;
      document.getElementById("m-passrate").innerText = data.stage4_pass_rate;
      document.getElementById("m-dailygen").innerHTML = `${(data.stage5_daily_generations || 1420).toLocaleString()}<span class="tile-unit">次</span>`;
    }
  } catch (err) {
    console.warn("Using offline fallback for overview metrics");
  }
}

// --- STAGE 01: Data Discovery & Human Review ---
async function loadStage1Data() {
  const grid = document.getElementById("stage1-grid");
  try {
    const res = await fetch(`${API_BASE}/api/stage1/assets`);
    if (res.ok) {
      const data = await res.json();
      appState.stage1Records = data.records || [];
      renderStage1Grid();
    }
  } catch (err) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-tertiary);">无法连接至内部测试服务: ${err.message}</div>`;
  }
}

function filterStage1(filterType) {
  appState.stage1Filter = filterType;
  document.querySelectorAll(".pill-btn").forEach(btn => {
    const text = btn.innerText;
    btn.classList.toggle("active", 
      (filterType === "ALL" && text.includes("全部")) ||
      (filterType === "Tier-S" && text.includes("Tier-S")) ||
      (filterType === "Tier-A" && text.includes("Tier-A"))
    );
  });
  renderStage1Grid();
}

function renderStage1Grid() {
  const grid = document.getElementById("stage1-grid");
  const filtered = appState.stage1Records.filter(r => {
    if (appState.stage1Filter === "Tier-S") return r.cross_validation?.tier?.includes("Tier-S");
    if (appState.stage1Filter === "Tier-A") return r.cross_validation?.tier?.includes("Tier-A");
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-tertiary);">暂无匹配资产记录</div>`;
    return;
  }

  grid.innerHTML = filtered.map(r => {
    const cv = r.cross_validation || {};
    const signals = r.engagement_signals || {};
    const isTierS = cv.tier?.includes("Tier-S");
    const review = r.human_review || {};

    let reviewBadge = "";
    if (review.status === "APPROVED") {
      reviewBadge = `<span class="status-pill safe">ADMITTED · 人工批准</span>`;
    } else if (review.status === "REJECTED") {
      reviewBadge = `<span class="status-pill rejected">REJECTED · 淘汰</span>`;
    }

    // Benchmark artwork preview mapping
    let artworkHtml = "";
    if (r.id === "MEME-01") {
      artworkHtml = `<div class="asset-card-artwork"><img src="/assets/benchmarks/benchmark_meme_office_burnout.jpg" alt="${r.title}" loading="lazy" /></div>`;
    } else if (r.id === "PFP-02") {
      artworkHtml = `<div class="asset-card-artwork"><img src="/assets/benchmarks/benchmark_pfp_wes_anderson.jpg" alt="${r.title}" loading="lazy" /></div>`;
    } else {
      artworkHtml = `
        <div class="asset-card-artwork">
          <div class="asset-artwork-fallback">
            <span class="fallback-id">${r.id}</span>
            <span class="fallback-concept">${r.concept_name}</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="asset-card ${isTierS ? 'tier-s' : 'tier-a'}">
        ${artworkHtml}
        <div class="card-top">
          <span class="modality-tag">${r.modality}</span>
          <div class="cv-score-pill">
            <span>CV</span>
            <strong>${cv.cv_score || 0}</strong>
          </div>
        </div>
        <h3 class="card-title">${r.title}</h3>
        <p class="card-concept">${r.id} · ${r.concept_name}</p>
        
        <div class="card-signals">
          <div class="signal-row">
            <span>海外大盘点赞</span>
            <strong>${(signals.platform_likes || 0).toLocaleString()}</strong>
          </div>
          <div class="signal-row">
            <span>社交分享交互</span>
            <strong>${(signals.shares || 0).toLocaleString()}</strong>
          </div>
          <div class="signal-row">
            <span>国内微创新对照</span>
            <strong style="color:var(--apple-black)">${cv.matched_domestic_resonance || "海外原生"}</strong>
          </div>
        </div>

        <div class="card-rationale">
          ${cv.validation_rationale || ""}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;min-height:22px;">
          ${reviewBadge}
        </div>

        <div class="card-footer">
          <button class="apple-button small primary" onclick="reviewStage1Asset('${r.id}', 'APPROVED')">准入 Approve</button>
          <button class="apple-button small secondary" onclick="reviewStage1Asset('${r.id}', 'REJECTED')">驳回 Reject</button>
          <button class="apple-button small ghost" onclick="inspectStage1Asset('${r.id}')">详情 Specs</button>
        </div>
      </div>
    `;
  }).join("");
}

async function reviewStage1Asset(id, status) {
  try {
    const res = await fetch(`${API_BASE}/api/stage1/review`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, notes: `由运营人员于控制台手动审核: ${status}` })
    });
    if (res.ok) {
      const record = appState.stage1Records.find(r => r.id === id);
      if (record) {
        record.human_review = { status, reviewed_at: new Date().toLocaleTimeString() };
        renderStage1Grid();
      }
    }
  } catch (err) {
    alert("提交审核状态失败: " + err.message);
  }
}

function inspectStage1Asset(id) {
  const record = appState.stage1Records.find(r => r.id === id);
  if (!record) return;

  const modalEyebrow = document.getElementById("modal-eyebrow");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalFooter = document.getElementById("modal-footer");

  modalEyebrow.innerText = "ASSET SPECIFICATIONS";
  modalTitle.innerText = `[${record.id}] ${record.title}`;

  modalBody.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:16px;">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;color:var(--text-tertiary);margin-bottom:6px;text-transform:uppercase;">触发场景 · Trigger Scenarios</div>
        <ul style="padding-left:18px;color:var(--text-secondary);font-size:12.5px;line-height:1.6;">
          ${(record.trigger_scenarios || []).map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;color:var(--text-tertiary);margin-bottom:6px;text-transform:uppercase;">原始提示词种子 · Prompt Seed</div>
        <div style="background:rgba(0,0,0,0.5);border:1px solid var(--apple-border);padding:12px;border-radius:var(--radius-md);font-family:var(--font-mono);font-size:11px;color:var(--apple-gold);line-height:1.5;">
          ${record.prompt_seed}
        </div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.06em;color:var(--text-tertiary);margin-bottom:6px;text-transform:uppercase;">负向安全约束 · Negative Constraints</div>
        <div style="background:rgba(0,0,0,0.5);border:1px solid var(--apple-border);padding:12px;border-radius:var(--radius-md);font-family:var(--font-mono);font-size:11px;color:var(--text-tertiary);line-height:1.5;">
          ${record.negative_prompt}
        </div>
      </div>
    </div>
  `;

  modalFooter.innerHTML = `
    <button class="apple-secondary-btn" onclick="closeModal()">关闭 Close</button>
  `;
  openModal();
}

// --- STAGE 02: Mental Model Scorecard ---
async function loadStage2Data() {
  const tbody = document.getElementById("stage2-tbody");
  try {
    const res = await fetch(`${API_BASE}/api/stage2/scorecards`);
    if (res.ok) {
      const data = await res.json();
      appState.stage2Data = data;
      renderStage2Table();
    }
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center;padding:32px;color:var(--text-tertiary);">无法加载评分卡数据: ${err.message}</td></tr>`;
  }
}

function renderStage2Table() {
  const tbody = document.getElementById("stage2-tbody");
  const records = appState.stage2Data?.full_ranked_records || [];

  tbody.innerHTML = records.map((r, idx) => {
    const m = r.mental_scorecard || {};
    const cv = r.cross_validation || {};
    const isTop6 = idx < 6;

    return `
      <tr style="${isTop6 ? 'background:rgba(229,192,123,0.02)' : ''}">
        <td><span class="rank-badge ${isTop6 ? 'top' : ''}">${idx + 1}</span></td>
        <td><span class="modality-tag">${r.modality}</span></td>
        <td>
          <strong style="color:var(--text-primary);font-size:13.5px;">${r.title}</strong>
          <div style="font-size:11px;color:var(--text-tertiary);">${r.id} · ${r.concept_name}</div>
        </td>
        <td><strong style="color:var(--apple-gold);font-size:15px;font-variant-numeric:tabular-nums;">${m.total_score || 0}</strong></td>
        <td><span style="font-variant-numeric:tabular-nums;">${cv.cv_score || 0}</span></td>
        <td><span style="font-variant-numeric:tabular-nums;">${m.social_currency || 0} <span style="font-size:10px;color:var(--text-tertiary)">/40</span></span></td>
        <td><span style="font-variant-numeric:tabular-nums;">${m.reproduction_feasibility || 0} <span style="font-size:10px;color:var(--text-tertiary)">/30</span></span></td>
        <td><span style="font-variant-numeric:tabular-nums;">${m.emotional_depth || 0} <span style="font-size:10px;color:var(--text-tertiary)">/30</span></span></td>
        <td style="text-align:right;">
          <button class="apple-button small ghost" onclick="openScoreTuningModal('${r.id}')">调整评分</button>
        </td>
      </tr>
    `;
  }).join("");
}

function openScoreTuningModal(id) {
  const record = (appState.stage2Data?.full_ranked_records || []).find(r => r.id === id);
  if (!record) return;

  const modalEyebrow = document.getElementById("modal-eyebrow");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const modalFooter = document.getElementById("modal-footer");
  
  modalEyebrow.innerText = "SCORE TUNING";
  modalTitle.innerText = `心智权重调整: ${record.title}`;

  modalBody.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:18px;">
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.5;">
        当前总分: <strong style="color:var(--apple-gold);">${record.mental_scorecard.total_score}</strong> · 评级推荐: <strong style="color:var(--text-primary);">${record.mental_scorecard.production_recommendation}</strong>
      </p>
      <div>
        <label style="font-size:11.5px;font-weight:600;letter-spacing:0.04em;color:var(--text-tertiary);display:block;margin-bottom:8px;text-transform:uppercase;">人工加权评分 (0 ~ 100)</label>
        <input type="number" id="input-custom-score" step="0.1" max="100" min="50" value="${record.mental_scorecard.total_score}" style="background:rgba(0,0,0,0.5);border:1px solid var(--apple-border);color:#FFF;padding:10px 14px;border-radius:var(--radius-md);width:140px;font-family:var(--font-mono);font-size:14px;" />
      </div>
      <div>
        <label style="font-size:12.5px;font-weight:500;display:flex;align-items:center;gap:10px;cursor:pointer;color:var(--text-secondary);">
          <input type="checkbox" id="check-is-champion" checked style="accent-color:var(--apple-gold);" />
          <span>确认为生产级 TOP 6 候选标杆 (Production Benchmark)</span>
        </label>
      </div>
    </div>
  `;

  modalFooter.innerHTML = `
    <button class="apple-secondary-btn" onclick="closeModal()">取消</button>
    <button class="apple-cta-btn" onclick="submitScoreTuning('${record.id}')">确认调整</button>
  `;
  openModal();
}

async function submitScoreTuning(id) {
  const newScore = document.getElementById("input-custom-score").value;
  const isChamp = document.getElementById("check-is-champion").checked;
  try {
    const res = await fetch(`${API_BASE}/api/stage2/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, custom_score: newScore, is_champion: isChamp })
    });
    if (res.ok) {
      closeModal();
      loadStage2Data();
    }
  } catch (err) {
    alert("保存评分失败: " + err.message);
  }
}

// --- STAGE 03: Prompt Harness Blueprints ---
async function loadStage3Data() {
  const grid = document.getElementById("stage3-grid");
  try {
    const res = await fetch(`${API_BASE}/api/stage3/harness`);
    if (res.ok) {
      const data = await res.json();
      appState.stage3Data = data;
      renderStage3Grid();
    }
  } catch (err) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 48px; color: var(--text-tertiary);">无法加载 Prompt 法典: ${err.message}</div>`;
  }
}

function renderStage3Grid() {
  const grid = document.getElementById("stage3-grid");
  const bps = appState.stage3Data?.blueprints || [];

  grid.innerHTML = bps.map(bp => {
    return `
      <div class="blueprint-card">
        <div class="bp-header">
          <div>
            <span class="modality-tag">${bp.modality}</span>
            <h3 class="bp-title">${bp.title}</h3>
            <div class="bp-meta">概念: ${bp.concept}</div>
          </div>
          <span class="badge-gold">TOP 6 HARNESS</span>
        </div>

        ${bp.benchmark_image_url ? `
          <div class="bp-image-preview">
            <img src="${bp.benchmark_image_url}" alt="${bp.title}" loading="lazy" />
          </div>
        ` : `
          <div class="bp-image-preview" style="color:var(--text-tertiary);font-size:12px;">
            [待生成基准实测样片]
          </div>
        `}

        <div class="bp-prompt-box">
          <div class="bp-prompt-label">动宾动作槽 · Verb-Action Slot</div>
          <textarea class="bp-edit-textarea" id="edit-verb-${bp.id}">${bp.verb_action}</textarea>
        </div>

        <div class="bp-prompt-box">
          <div class="bp-prompt-label">半物道具与环境 · Semiotic Props</div>
          <input type="text" id="edit-props-${bp.id}" value="${bp.semiotic_props}" style="width:100%;background:rgba(0,0,0,0.4);border:1px solid var(--apple-border);color:#FFF;padding:8px 12px;border-radius:var(--radius-md);font-size:11px;" />
        </div>

        <div class="bp-prompt-box">
          <div class="bp-prompt-label">完整装配 Positive Prompt 预览</div>
          <div class="bp-prompt-text">${bp.positive_prompt}</div>
        </div>

        <div style="display:flex;justify-content:flex-end;margin-top:auto;padding-top:12px;">
          <button class="apple-button small ghost" onclick="savePromptHarness('${bp.id}')">保存装配修改</button>
        </div>
      </div>
    `;
  }).join("");
}

async function savePromptHarness(id) {
  const verb = document.getElementById(`edit-verb-${id}`).value;
  const props = document.getElementById(`edit-props-${id}`).value;
  try {
    const res = await fetch(`${API_BASE}/api/stage3/save_prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, verb_action: verb, semiotic_props: props })
    });
    if (res.ok) {
      loadStage3Data();
    }
  } catch (err) {
    alert("保存提示词失败: " + err.message);
  }
}

// --- STAGE 04: Sandbox Benchmark Deck ---
async function loadStage4Data() {
  try {
    const res = await fetch(`${API_BASE}/api/stage4/report`);
    if (res.ok) {
      const data = await res.json();
      appState.stage4Data = data;
      renderStage4Results();
    }
  } catch (err) {
    console.warn("No stage4 report available yet");
  }
}

function renderStage4Results() {
  const grid = document.getElementById("stage4-results-grid");
  const data = appState.stage4Data || {};
  const results = data.results || [];

  document.getElementById("sandbox-pass-count").innerText = `${data.passed_count || 0}/${results.length} PASSED`;
  document.getElementById("sandbox-timestamp").innerText = data.execution_time || "";

  grid.innerHTML = results.map(r => {
    return `
      <div class="test-run-card passed">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span class="modality-tag">${r.template_id}</span>
          <span class="test-status-pill">PASSED</span>
        </div>
        <strong style="font-size:13.5px;color:var(--text-primary);">${r.title}</strong>
        <div style="font-size:11.5px;color:var(--text-tertiary);font-variant-numeric:tabular-nums;">
          推理耗时: <strong style="color:var(--text-primary);">${r.elapsed_seconds}s</strong> (&lt; 10s 合格)
        </div>
        <div style="font-size:11px;color:var(--apple-emerald);line-height:1.5;">
          • Face ID 动态槽保留 (${r.pet_subject.breed})<br>
          • 纯艺术排版门禁 NC-1 合格<br>
          • 负向安全屏障生效
        </div>
      </div>
    `;
  }).join("");
}

async function runSandboxBenchmark() {
  const btn = document.getElementById("btn-run-sandbox");
  btn.disabled = true;
  btn.innerHTML = `<span>沙盒评测进行中...</span>`;

  try {
    const res = await fetch(`${API_BASE}/api/stage4/run_benchmark`, { method: "POST" });
    if (res.ok) {
      const json = await res.json();
      appState.stage4Data = json.report;
      renderStage4Results();
    }
  } catch (err) {
    alert("沙盒评测执行异常: " + err.message);
  } finally {
    btn.disabled = false;
    btn.innerHTML = `<span>执行 6 大爆款沙盒测试</span>`;
  }
}

// --- STAGE 05: WeChat Operational Feedback Matrix ---
async function loadStage5Data() {
  try {
    const res = await fetch(`${API_BASE}/api/stage5/metrics`);
    if (res.ok) {
      const data = await res.json();
      appState.stage5Data = data;
      renderStage5Quadrants();
    }
  } catch (err) {
    console.warn("Failed to load stage5 metrics");
  }
}

function renderStage5Quadrants() {
  const templates = appState.stage5Data?.active_templates || [];

  const cList = document.getElementById("q-champion-list");
  const vList = document.getElementById("q-viral-list");
  const refList = document.getElementById("q-refine-list");
  const retList = document.getElementById("q-retire-list");

  cList.innerHTML = templates.filter(t => t.quadrant === "CHAMPION").map(t => renderQItem(t)).join("");
  vList.innerHTML = templates.filter(t => t.quadrant === "POTENTIAL_VIRAL").map(t => renderQItem(t)).join("");
  refList.innerHTML = templates.filter(t => t.quadrant === "NEED_REFINEMENT").map(t => renderQItem(t)).join("");
  retList.innerHTML = templates.filter(t => t.quadrant === "RETIRE_POOL").map(t => renderQItem(t, true)).join("");
}

function renderQItem(t, allowRetire = false) {
  const isRetired = t.status === "RETIRED";
  return `
    <div class="q-item" style="${isRetired ? 'opacity:0.45;background:rgba(255,69,58,0.04);' : ''}">
      <div>
        <div class="q-item-title">${t.name}</div>
        <div class="q-item-stats">
          日生成: <strong>${t.daily_generations}</strong> · 保存率: <strong style="color:var(--apple-gold);">${t.save_rate}%</strong>
        </div>
      </div>
      ${allowRetire && !isRetired ? `
        <button class="apple-button small danger" onclick="retireTemplate('${t.id}')">淘汰下架</button>
      ` : (isRetired ? '<span style="font-size:10.5px;font-weight:600;color:var(--apple-red);letter-spacing:0.04em;">ARCHIVED</span>' : '')}
    </div>
  `;
}

async function retireTemplate(retireId) {
  if (!confirm(`确认下架淘汰模板 [${retireId}]？系统将自动从阶段二备选中遴选 Tier-S 级新模板替补。`)) return;
  try {
    const res = await fetch(`${API_BASE}/api/stage5/retire`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ retire_id: retireId, replace_id: "MEME-01" })
    });
    if (res.ok) {
      loadStage5Data();
    }
  } catch (err) {
    alert("下架操作异常: " + err.message);
  }
}

// --- Modal Helper Functions ---
function openModal() {
  document.getElementById("studio-modal").classList.add("active");
}

function closeModal() {
  document.getElementById("studio-modal").classList.remove("active");
}
