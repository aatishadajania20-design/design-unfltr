'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { videoToThumbnail } from '@/lib/utils';
import {
  DndContext, closestCenter,
  KeyboardSensor, PointerSensor,
  useSensor, useSensors,
} from '@dnd-kit/core';
import {
  SortableContext, sortableKeyboardCoordinates,
  verticalListSortingStrategy, useSortable, arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// ─── API client ───────────────────────────────────────────────────────────────
const req = (url, opts = {}) =>
  fetch(url, { headers: { 'Content-Type': 'application/json' }, cache: 'no-store', ...opts }).then(r => r.json());

const api = {
  session:      ()         => req('/api/auth/session'),
  login:        body       => req('/api/auth/login',        { method: 'POST', body: JSON.stringify(body) }),
  logout:       ()         => fetch('/api/auth/logout',     { method: 'POST' }),
  getWorks:     ()         => req('/api/works'),
  createWork:   body       => req('/api/works',             { method: 'POST', body: JSON.stringify(body) }),
  updateWork:   (id, body) => req(`/api/works/${id}`,       { method: 'PUT',  body: JSON.stringify(body) }),
  deleteWork:   id         => fetch(`/api/works/${id}`,     { method: 'DELETE' }),
  getClients:   ()         => req('/api/clients'),
  createClient: body       => req('/api/clients',           { method: 'POST', body: JSON.stringify(body) }),
  updateClient: (id, body) => req(`/api/clients/${id}`,     { method: 'PUT',  body: JSON.stringify(body) }),
  deleteClient: id         => fetch(`/api/clients/${id}`,   { method: 'DELETE' }),
};

const WORK_BLANK   = { title:'', slug:'', category:'', desc:'', image:'', video:'', client:'', services:'', order:0 };
const CLIENT_BLANK = { name:'', subtitle:'', logo:'', gridPosition:0, featured:false };
const toSlug = s => s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [view, setView]           = useState('loading');
  const [authUser, setAuthUser]   = useState('');
  const [tab, setTab]             = useState('works');
  const [works, setWorks]         = useState([]);
  const [clients, setClients]     = useState([]);
  const [busy, setBusy]           = useState(false);
  const [modal, setModal]         = useState(null);
  const [creds, setCreds]         = useState({ username: '', password: '' });
  const [loginErr, setLoginErr]   = useState('');
  const [loginBusy, setLoginBusy] = useState(false);
  const [seedBusy, setSeedBusy]   = useState(false);
  const [seedToast, setSeedToast] = useState(null);

  useEffect(() => {
    api.session()
      .then(d => { if (d.authenticated) { setAuthUser(d.user); setView('dashboard'); } else setView('login'); })
      .catch(() => setView('login'));
  }, []);

  const refreshAll = useCallback(async () => {
    setBusy(true);
    const [w, c] = await Promise.all([api.getWorks(), api.getClients()]);
    setWorks(Array.isArray(w) ? w : []);
    setClients(Array.isArray(c) ? c : []);
    setBusy(false);
  }, []);

  useEffect(() => {
    if (view !== 'dashboard') return;
    Promise.all([api.getWorks(), api.getClients()]).then(([w, c]) => {
      setWorks(Array.isArray(w) ? w : []);
      setClients(Array.isArray(c) ? c : []);
    });
  }, [view]);

  const handleLogin = async e => {
    e.preventDefault();
    setLoginBusy(true); setLoginErr('');
    const res = await api.login(creds);
    setLoginBusy(false);
    if (res.ok) { setAuthUser(res.user); setView('dashboard'); }
    else setLoginErr(res.error || 'Invalid credentials');
  };

  const handleLogout = async () => {
    await api.logout();
    setView('login'); setAuthUser(''); setWorks([]); setClients([]);
  };

  const handleSeed = async () => {
    if (!confirm(
      'Restore Database?\n\n' +
      'This will insert all 25 works + 36 clients that are missing from MongoDB.\n\n' +
      'Existing records are NEVER overwritten — completely safe to run multiple times.'
    )) return;
    setSeedBusy(true);
    setSeedToast(null);
    try {
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setSeedToast({ ok: false, error: data.error || `HTTP ${res.status}` });
      } else {
        setSeedToast({ ok: true, data });
        setTimeout(() => setSeedToast(null), 10000);
        await refreshAll();
      }
    } catch (e) {
      setSeedToast({ ok: false, error: e.message });
    }
    setSeedBusy(false);
  };

  const handleSaveOrder = useCallback((type, reorderedItems) => {
    if (type === 'projects') {
      setWorks(reorderedItems.map((item, i) => ({ ...item, order: i })));
    } else {
      setClients(reorderedItems.map((item, i) => ({ ...item, order: i })));
    }
  }, []);

  const deleteWork = async id => {
    if (!confirm('Delete this work? This cannot be undone.')) return;
    await api.deleteWork(id);
    setWorks(p => p.filter(w => w._id !== id));
  };

  const deleteClient = async id => {
    if (!confirm('Delete this client? This cannot be undone.')) return;
    await api.deleteClient(id);
    setClients(p => p.filter(c => c._id !== id));
  };

  const handleSave = async (type, data) => {
    if (type === 'work') {
      const payload = {
        ...data,
        services: typeof data.services === 'string'
          ? data.services.split(',').map(s => s.trim()).filter(Boolean)
          : data.services,
      };
      const res = data._id ? await api.updateWork(data._id, payload) : await api.createWork(payload);
      if (res.error) { alert(res.error); return; }
      setWorks(p => data._id ? p.map(w => w._id === data._id ? res : w) : [...p, res]);
    } else {
      const res = data._id ? await api.updateClient(data._id, data) : await api.createClient(data);
      if (res.error) { alert(res.error); return; }
      setClients(p => data._id ? p.map(c => c._id === data._id ? res : c) : [...p, res]);
    }
    setModal(null);
  };

  if (view === 'loading') return <Loader />;
  if (view === 'login')
    return <LoginView creds={creds} onChange={setCreds} onSubmit={handleLogin} error={loginErr} busy={loginBusy} />;

  return (
    <Dashboard
      user={authUser} tab={tab} setTab={setTab}
      works={works} clients={clients} loading={busy}
      onAddWork={()  => setModal({ type: 'work',   data: { ...WORK_BLANK } })}
      onEditWork={w  => setModal({ type: 'work',   data: { ...w, services: Array.isArray(w.services) ? w.services.join(', ') : (w.services || '') } })}
      onDeleteWork={deleteWork}
      onAddClient={()  => setModal({ type: 'client', data: { ...CLIENT_BLANK } })}
      onEditClient={c  => setModal({ type: 'client', data: { ...c } })}
      onDeleteClient={deleteClient}
      onLogout={handleLogout} onRefresh={refreshAll}
      onSeed={handleSeed} seedBusy={seedBusy} seedToast={seedToast}
      onSaveOrder={handleSaveOrder}
    >
      {modal && (
        <Modal onClose={() => setModal(null)}>
          {modal.type === 'work'
            ? <WorkForm   data={modal.data} onChange={d => setModal(m => ({ ...m, data: d }))} onSave={() => handleSave('work',   modal.data)} onCancel={() => setModal(null)} />
            : <ClientForm data={modal.data} onChange={d => setModal(m => ({ ...m, data: d }))} onSave={() => handleSave('client', modal.data)} onCancel={() => setModal(null)} />
          }
        </Modal>
      )}
    </Dashboard>
  );
}

// ─── LOADER ───────────────────────────────────────────────────────────────────
function Loader() {
  return (
    <div style={{ background: '#060606', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`@keyframes adm-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.2;transform:scale(.4)}}`}</style>
      <div style={{ display: 'flex', gap: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 1 ? '#f97316' : '#222', animation: `adm-pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN VIEW ───────────────────────────────────────────────────────────────
function LoginView({ creds, onChange, onSubmit, error, busy }) {
  return (
    <div style={{ background: '#060606', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif", padding: '20px' }}>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
        .adm-inp {
          width: 100%; background: #0e0e0e; border: 1px solid #1e1e1e; color: #f0f0f0;
          padding: 16px 18px; font-size: .95rem; letter-spacing: .02em; outline: none;
          font-family: inherit; transition: border-color .2s, background .2s; border-radius: 2px;
        }
        .adm-inp:focus { border-color: #f97316; background: #141414; }
        .adm-inp::placeholder { color: #2a2a2a; }
        .adm-login-btn {
          width: 100%; background: #f97316; color: #000; border: none; border-radius: 2px;
          padding: 17px; font-size: .72rem; font-weight: 800; letter-spacing: .24em;
          text-transform: uppercase; cursor: pointer; font-family: inherit;
          transition: background .18s, transform .1s;
        }
        .adm-login-btn:hover:not(:disabled) { background: #ea6a0a; }
        .adm-login-btn:active:not(:disabled) { transform: scale(.99); }
        .adm-login-btn:disabled { opacity: .4; cursor: not-allowed; }
        @keyframes adm-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.2;transform:scale(.4)}}
      `}</style>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: '.52rem', letterSpacing: '.4em', textTransform: 'uppercase', color: '#f97316', marginBottom: 16 }}>UNFLTR Studio</p>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#f5f5f5', letterSpacing: '-.05em', lineHeight: 1, marginBottom: 20 }}>Admin Portal</h1>
          <div style={{ height: 2, width: 40, background: '#f97316' }} />
        </div>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input className="adm-inp" type="text" placeholder="Username" autoComplete="username"
            value={creds.username} onChange={e => onChange(p => ({ ...p, username: e.target.value }))} required />
          <input className="adm-inp" type="password" placeholder="Password" autoComplete="current-password"
            value={creds.password} onChange={e => onChange(p => ({ ...p, password: e.target.value }))} required />
          {error && (
            <p style={{ fontSize: '.72rem', color: '#f87171', letterSpacing: '.03em', padding: '10px 14px', background: 'rgba(248,113,113,.07)', border: '1px solid rgba(248,113,113,.18)', borderRadius: 2 }}>
              {error}
            </p>
          )}
          <button className="adm-login-btn" type="submit" disabled={busy}>{busy ? 'Authenticating…' : 'Enter Dashboard →'}</button>
        </form>
        <p style={{ marginTop: 24, fontSize: '.5rem', color: '#1e1e1e', letterSpacing: '.14em', textAlign: 'center' }}>UNFLTR STUDIO INTERNAL SYSTEM</p>
      </div>
    </div>
  );
}

// ─── GLOBAL ADMIN STYLES ──────────────────────────────────────────────────────
const ADM_CSS = `
  @import url('https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro');
  * { box-sizing: border-box; }
  @keyframes adm-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.2;transform:scale(.4)} }
  @keyframes adm-fade-in { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

  /* ── TABLE ── */
  .adm-table { width: 100%; border-collapse: collapse; }
  .adm-table thead tr { background: #0a0a0a; }
  .adm-table th {
    border-bottom: 1px solid #1a1a1a; padding: 14px 24px;
    text-align: left; font-size: .58rem; letter-spacing: .26em;
    text-transform: uppercase; color: #555; font-weight: 700; white-space: nowrap;
  }
  .adm-table td { border-bottom: 1px solid #111; padding: 20px 24px; color: #aaa; vertical-align: middle; font-size: .9rem; }
  .adm-table tbody tr { transition: background .15s; cursor: default; }
  .adm-table tbody tr:hover td { background: rgba(249,115,22,.04); }
  .adm-table tbody tr:last-child td { border-bottom: none; }
  .adm-td-idx  { color: #383838 !important; font-size: .66rem !important; font-weight: 600; letter-spacing: .06em; width: 48px; }
  .adm-td-main { color: #f0f0f0 !important; font-weight: 700; font-size: .98rem !important; }
  .adm-td-sub  { color: #666 !important; font-size: .8rem !important; }

  /* ── TAGS ── */
  .adm-tag  { display: inline-block; padding: 4px 11px; border: 1px solid #222; color: #777; font-size: .52rem; letter-spacing: .16em; text-transform: uppercase; border-radius: 2px; }
  .adm-vtag { display: inline-block; padding: 4px 11px; border: 1px solid rgba(249,115,22,.35); color: #f97316; font-size: .52rem; letter-spacing: .16em; text-transform: uppercase; border-radius: 2px; }

  /* ── BUTTONS ── */
  .adm-act-btn {
    background: none; border: 1px solid #1e1e1e; color: #666; padding: 9px 18px;
    font-size: .58rem; letter-spacing: .12em; text-transform: uppercase; cursor: pointer;
    font-family: inherit; transition: border-color .18s, color .18s, background .18s; white-space: nowrap; border-radius: 2px;
  }
  .adm-act-btn:hover       { border-color: #f97316; color: #f97316; }
  .adm-act-btn.del:hover   { border-color: rgba(248,113,113,.6); color: #f87171; background: rgba(248,113,113,.05); }

  .adm-add-btn {
    background: #f97316; color: #000; border: none; border-radius: 2px; padding: 13px 30px;
    font-size: .66rem; font-weight: 800; letter-spacing: .22em; text-transform: uppercase;
    cursor: pointer; font-family: inherit; transition: background .18s, transform .1s; white-space: nowrap; flex-shrink: 0;
  }
  .adm-add-btn:hover { background: #ea6a0a; }
  .adm-add-btn:active { transform: scale(.99); }

  .adm-tab-btn {
    background: none; border: none; border-bottom: 2px solid transparent;
    color: #444; padding: 16px 28px; font-size: .66rem; font-weight: 700;
    letter-spacing: .22em; text-transform: uppercase; cursor: pointer;
    font-family: inherit; transition: color .18s, border-color .18s;
  }
  .adm-tab-btn.active { color: #f5f5f5; border-bottom-color: #f97316; }
  .adm-tab-btn:hover:not(.active)  { color: #888; }

  .adm-ghost-btn {
    background: none; border: 1px solid #1e1e1e; color: #666; padding: 10px 20px; border-radius: 2px;
    font-size: .58rem; letter-spacing: .16em; text-transform: uppercase;
    cursor: pointer; font-family: inherit; transition: border-color .18s, color .18s;
  }
  .adm-ghost-btn:hover { border-color: #333; color: #999; }

  /* ── THUMBNAIL ── */
  .adm-thumb { width: 88px; height: 56px; object-fit: cover; border: 1px solid #1a1a1a; display: block; background: #0a0a0a; border-radius: 4px; }
  .adm-thumb-empty { background: #0a0a0a; border: 1px dashed #1e1e1e; }

  /* ── MINI STAT CARDS ── */
  .adm-stat-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
  .adm-mini-stat { background: #0c0c0c; border: 1px solid #171717; padding: 20px 28px; flex: 1; min-width: 90px; position: relative; overflow: hidden; }
  .adm-mini-stat::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:#f97316; transform:scaleX(0); transform-origin:left; transition:transform .3s cubic-bezier(.76,0,.24,1); }
  .adm-mini-stat:hover::before { transform:scaleX(1); }
  .adm-mini-stat-val { font-size: 2rem; font-weight: 900; letter-spacing: -.05em; color: #fff; line-height: 1; display: block; }
  .adm-mini-stat-lbl { font-size: .5rem; letter-spacing: .24em; text-transform: uppercase; color: #383838; margin-top: 6px; display: block; }

  /* ── EMPTY STATE ── */
  .adm-empty {
    text-align: center; padding: 80px 24px; color: #444; font-size: .88rem;
    letter-spacing: .06em; line-height: 1.9; border: 1px dashed #1a1a1a; margin-top: 4px; border-radius: 4px;
  }
  .adm-empty-sub { color: #252525; display: block; margin-top: 10px; font-size: .66rem; letter-spacing: .08em; }

  /* ── FORM ── */
  .adm-form-inp {
    width: 100%; background: #0e0e0e; border: 1px solid #1e1e1e; color: #f0f0f0;
    padding: 14px 16px; font-size: .92rem; outline: none; border-radius: 2px;
    font-family: inherit; transition: border-color .18s, background .18s;
  }
  .adm-form-inp:focus { border-color: #f97316; background: #121212; }
  .adm-form-inp::placeholder { color: #222; }
  textarea.adm-form-inp { resize: vertical; min-height: 96px; line-height: 1.65; }
  select.adm-form-inp { cursor: pointer; }

  .adm-label {
    font-size: .56rem; letter-spacing: .22em; text-transform: uppercase;
    color: #777; display: block; margin-bottom: 8px; font-weight: 700;
  }
  .adm-label-hint { color: '#2d2d2d'; text-transform: none; letter-spacing: 0; font-size: .62rem; font-weight: 400; }

  .adm-save-btn {
    background: #f97316; color: #000; border: none; border-radius: 2px; padding: 14px 32px;
    font-size: .68rem; font-weight: 800; letter-spacing: .22em; text-transform: uppercase;
    cursor: pointer; font-family: inherit; transition: background .18s;
  }
  .adm-save-btn:hover { background: #ea6a0a; }

  .adm-cancel-btn {
    background: none; color: #666; border: 1px solid #1e1e1e; padding: 14px 24px; border-radius: 2px;
    font-size: .66rem; letter-spacing: .16em; text-transform: uppercase;
    cursor: pointer; font-family: inherit; transition: border-color .18s, color .18s;
  }
  .adm-cancel-btn:hover { border-color: #333; color: #999; }

  .adm-cols2 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  @media(max-width:560px) { .adm-cols2 { grid-template-columns: 1fr; } }

  /* ── IMG PREVIEW ── */
  .adm-img-preview { width:100%; max-height:130px; object-fit:cover; border-radius:4px; border:1px solid #1e1e1e; margin-top:10px; display:block; }
  .adm-logo-preview { height:60px; object-fit:contain; border-radius:4px; border:1px solid #1e1e1e; margin-top:10px; display:block; background:#111; padding:8px; }

  /* ── SEED / RESTORE BUTTON ── */
  .adm-seed-btn {
    background: none;
    border: 1px solid rgba(239,68,68,.35);
    color: rgba(239,68,68,.65);
    padding: 10px 18px; border-radius: 2px;
    font-size: .58rem; font-weight: 700; letter-spacing: .14em;
    text-transform: uppercase; cursor: pointer;
    font-family: inherit; white-space: nowrap;
    transition: border-color .18s, color .18s, background .18s;
  }
  .adm-seed-btn:hover:not(:disabled) {
    border-color: rgba(239,68,68,.75);
    color: #ef4444;
    background: rgba(239,68,68,.07);
  }
  .adm-seed-btn:disabled { opacity: .35; cursor: not-allowed; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar       { width: 4px; height: 4px; }
  ::-webkit-scrollbar-track { background: #080808; }
  ::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
  ::-webkit-scrollbar-thumb:hover { background: #333; }
`;

// ─── DASHBOARD SHELL ──────────────────────────────────────────────────────────
function Dashboard({ user, tab, setTab, works, clients, loading, onAddWork, onEditWork, onDeleteWork, onAddClient, onEditClient, onDeleteClient, onLogout, onRefresh, onSeed, seedBusy, seedToast, onSaveOrder, children }) {
  return (
    <div style={{ background: '#060606', minHeight: '100vh', color: '#f0f0f0', fontFamily: "'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif" }}>
      <style>{ADM_CSS}</style>

      {/* ── TOP BAR ── */}
      <div style={{ borderBottom: '1px solid #141414', padding: '18px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', background: '#040404', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div>
            <span style={{ fontSize: '.5rem', letterSpacing: '.4em', textTransform: 'uppercase', color: '#f97316', display: 'block', marginBottom: 4 }}>UNFLTR</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-.04em', color: '#f5f5f5' }}>Admin Dashboard</span>
          </div>
          <div style={{ width: 1, height: 36, background: '#161616' }} />
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 13px', fontSize: '.54rem', letterSpacing: '.18em', textTransform: 'uppercase', background: 'rgba(249,115,22,.08)', border: '1px solid rgba(249,115,22,.2)', color: '#f97316', borderRadius: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', display: 'inline-block', animation: 'adm-pulse 2s ease-in-out infinite' }} />
            {user}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ display: 'flex', gap: 24, fontSize: '.62rem', letterSpacing: '.1em' }}>
            <span style={{ color: '#444' }}><span style={{ color: '#fff', fontWeight: 900, fontSize: '1.1rem', display: 'block', lineHeight: 1, letterSpacing: '-.03em' }}>{works.length}</span>Works</span>
            <span style={{ color: '#444' }}><span style={{ color: '#fff', fontWeight: 900, fontSize: '1.1rem', display: 'block', lineHeight: 1, letterSpacing: '-.03em' }}>{clients.length}</span>Clients</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/" className="adm-ghost-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>← Site</Link>
            <button className="adm-ghost-btn" onClick={onRefresh} disabled={loading} title="Re-sync from MongoDB">
              {loading ? '…' : '↺'} Sync
            </button>
            <button
              className="adm-seed-btn"
              onClick={onSeed}
              disabled={seedBusy || loading}
              title="Insert all missing works + clients into MongoDB. Never overwrites existing data."
            >
              {seedBusy ? '⟳ Seeding…' : '⬆ Restore DB'}
            </button>
            <button className="adm-act-btn" onClick={onLogout}>Log Out</button>
          </div>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div style={{ borderBottom: '1px solid #141414', padding: '0 28px', display: 'flex', gap: 0, background: '#040404' }}>
        <button className={`adm-tab-btn${tab === 'works' ? ' active' : ''}`} onClick={() => setTab('works')}>
          Works
          <span style={{ marginLeft: 10, fontSize: '.56rem', color: tab === 'works' ? '#f97316' : '#2a2a2a', fontWeight: 400, letterSpacing: '.1em' }}>{works.length}</span>
        </button>
        <button className={`adm-tab-btn${tab === 'clients' ? ' active' : ''}`} onClick={() => setTab('clients')}>
          Clients
          <span style={{ marginLeft: 10, fontSize: '.56rem', color: tab === 'clients' ? '#f97316' : '#2a2a2a', fontWeight: 400, letterSpacing: '.1em' }}>{clients.length}</span>
        </button>
        <button className={`adm-tab-btn${tab === 'reorder' ? ' active' : ''}`} onClick={() => setTab('reorder')}>
          ⠿ Reorder
        </button>
        <button className={`adm-tab-btn${tab === 'analytics' ? ' active' : ''}`} onClick={() => setTab('analytics')}>
          ◎ Analytics
        </button>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ padding: '36px 36px', maxWidth: 1480 }}>
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, padding: '12px 18px', background: 'rgba(249,115,22,.06)', border: '1px solid rgba(249,115,22,.15)', borderRadius: 2 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f97316', display: 'inline-block', animation: 'adm-pulse 1s ease-in-out infinite' }} />
            <span style={{ fontSize: '.62rem', color: '#f97316', letterSpacing: '.14em', textTransform: 'uppercase' }}>Syncing with MongoDB…</span>
          </div>
        )}
        {tab === 'works'     && <WorksTable   works={works}     onAdd={onAddWork}   onEdit={onEditWork}   onDelete={onDeleteWork} />}
        {tab === 'clients'   && <ClientsTable clients={clients} onAdd={onAddClient} onEdit={onEditClient} onDelete={onDeleteClient} />}
        {tab === 'reorder'   && <ReorderTab   works={works}     clients={clients}   onSaved={onSaveOrder} />}
        {tab === 'analytics' && <AnalyticsTab />}
      </div>

      {children}

      {/* ── SEED RESULT TOAST ── */}
      {seedToast && (
        <div style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
          maxWidth: 400, width: 'calc(100vw - 56px)',
          background: seedToast.ok ? '#061206' : '#120606',
          border: `1px solid ${seedToast.ok ? 'rgba(74,222,128,.28)' : 'rgba(239,68,68,.28)'}`,
          borderRadius: 6, padding: '22px 24px',
          boxShadow: '0 12px 48px rgba(0,0,0,.7)',
          animation: 'adm-fade-in .25s ease',
          fontFamily: "'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif",
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 2 }}>
              {seedToast.ok ? '✅' : '❌'}
            </span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{
                fontSize: '.76rem', fontWeight: 800, letterSpacing: '.06em',
                color: seedToast.ok ? '#4ade80' : '#f87171',
                marginBottom: seedToast.ok ? 14 : 6,
                textTransform: 'uppercase',
              }}>
                {seedToast.ok ? 'Database Restored' : 'Seed Failed'}
              </p>

              {seedToast.ok ? (
                <div style={{ display: 'flex', gap: 20 }}>
                  {[
                    { label: 'Works in DB', total: seedToast.data.works.total, inserted: seedToast.data.works.inserted },
                    { label: 'Clients in DB', total: seedToast.data.clients.total, inserted: seedToast.data.clients.inserted },
                  ].map(({ label, total, inserted }) => (
                    <div key={label}>
                      <span style={{ display: 'block', fontSize: '1.6rem', fontWeight: 900, color: '#fff', letterSpacing: '-.05em', lineHeight: 1 }}>{total}</span>
                      <span style={{ display: 'block', fontSize: '.48rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#383838', marginTop: 4 }}>{label}</span>
                      <span style={{ display: 'block', fontSize: '.62rem', color: inserted > 0 ? '#4ade80' : '#444', marginTop: 4 }}>
                        {inserted > 0 ? `+${inserted} inserted` : 'all existed'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '.78rem', color: '#f87171', lineHeight: 1.5 }}>{seedToast.error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WORKS TABLE ──────────────────────────────────────────────────────────────
function WorksTable({ works, onAdd, onEdit, onDelete }) {
  const videoCount = works.filter(w => w.video).length;
  const imageOnly  = works.filter(w => w.image && !w.video).length;

  return (
    <div style={{ animation: 'adm-fade-in .3s ease' }}>
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-.04em', color: '#f5f5f5', marginBottom: 6 }}>Portfolio Works</h2>
          <p style={{ fontSize: '.62rem', color: '#444', letterSpacing: '.1em', lineHeight: 1.6 }}>
            MongoDB primary — static <code style={{ color: '#333', fontSize: '.58rem' }}>projects.js</code> is the fallback when DB is empty
          </p>
        </div>
        <button className="adm-add-btn" onClick={onAdd}>+ Add Work</button>
      </div>

      {/* Mini stats */}
      <div className="adm-stat-row">
        <div className="adm-mini-stat"><span className="adm-mini-stat-val">{works.length}</span><span className="adm-mini-stat-lbl">Total</span></div>
        <div className="adm-mini-stat"><span className="adm-mini-stat-val">{videoCount}</span><span className="adm-mini-stat-lbl">Video</span></div>
        <div className="adm-mini-stat"><span className="adm-mini-stat-val">{imageOnly}</span><span className="adm-mini-stat-lbl">Image</span></div>
        <div className="adm-mini-stat"><span className="adm-mini-stat-val">{works.filter(w => !w.image && !w.video).length}</span><span className="adm-mini-stat-lbl">No Media</span></div>
      </div>

      {works.length === 0 ? (
        <div className="adm-empty">
          No works in database yet — click <strong style={{ color: '#f97316' }}>+ Add Work</strong> to create your first entry.
          <span className="adm-empty-sub">Click <strong style={{ color: '#ef4444' }}>⬆ Restore DB</strong> in the topbar to seed all 25 works from the static list.</span>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', border: '1px solid #141414', borderRadius: 4 }}>
          <table className="adm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Preview</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Category</th>
                <th>Client</th>
                <th>Type</th>
                <th>Order</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {works.map((w, i) => {
                const thumb = w.image || videoToThumbnail(w.video);
                return (
                  <tr key={w._id}>
                    <td className="adm-td-idx">{String(i + 1).padStart(2, '0')}</td>
                    <td>
                      {thumb
                        ? <img className="adm-thumb" src={thumb} alt="" />
                        : <div className="adm-thumb adm-thumb-empty" />
                      }
                    </td>
                    <td className="adm-td-main">{w.title}</td>
                    <td className="adm-td-sub" style={{ fontFamily: 'monospace', fontSize: '.75rem' }}>/{w.slug}</td>
                    <td><span className="adm-tag">{w.category}</span></td>
                    <td className="adm-td-sub">{w.client || '—'}</td>
                    <td>{w.video ? <span className="adm-vtag">▶ Video</span> : <span className="adm-tag">Image</span>}</td>
                    <td className="adm-td-sub">{w.order ?? 0}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button className="adm-act-btn" onClick={() => onEdit(w)}>Edit</button>
                        <button className="adm-act-btn del" onClick={() => onDelete(w._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── CLIENTS TABLE ────────────────────────────────────────────────────────────
function ClientsTable({ clients, onAdd, onEdit, onDelete }) {
  const featured = clients.filter(c => c.featured).length;

  return (
    <div style={{ animation: 'adm-fade-in .3s ease' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-.04em', color: '#f5f5f5', marginBottom: 6 }}>Clients</h2>
          <p style={{ fontSize: '.62rem', color: '#444', letterSpacing: '.1em', lineHeight: 1.6 }}>
            MongoDB primary — new entries auto-appear in the marquee and /clients page
          </p>
        </div>
        <button className="adm-add-btn" onClick={onAdd}>+ Add Client</button>
      </div>

      <div className="adm-stat-row">
        <div className="adm-mini-stat"><span className="adm-mini-stat-val">{clients.length}</span><span className="adm-mini-stat-lbl">Total</span></div>
        <div className="adm-mini-stat"><span className="adm-mini-stat-val">{featured}</span><span className="adm-mini-stat-lbl">Featured</span></div>
        <div className="adm-mini-stat"><span className="adm-mini-stat-val">{clients.filter(c => c.logo).length}</span><span className="adm-mini-stat-lbl">With Logo</span></div>
        <div className="adm-mini-stat"><span className="adm-mini-stat-val">{clients.filter(c => !c.logo).length}</span><span className="adm-mini-stat-lbl">No Logo</span></div>
      </div>

      {clients.length === 0 ? (
        <div className="adm-empty">
          No clients in database yet — click <strong style={{ color: '#f97316' }}>+ Add Client</strong> to create your first entry.
          <span className="adm-empty-sub">Click <strong style={{ color: '#ef4444' }}>⬆ Restore DB</strong> in the topbar to migrate the full 36-client roster from the static list.</span>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', border: '1px solid #141414', borderRadius: 4 }}>
          <table className="adm-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Logo</th>
                <th>Name</th>
                <th>Subtitle</th>
                <th>Grid Pos</th>
                <th>Featured</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c, i) => (
                <tr key={c._id}>
                  <td className="adm-td-idx">{String(i + 1).padStart(2, '0')}</td>
                  <td>
                    {c.logo
                      ? <img className="adm-thumb" src={c.logo} alt={c.name} style={{ objectFit: 'contain', background: '#111', padding: '6px' }} />
                      : <div className="adm-thumb adm-thumb-empty" />
                    }
                  </td>
                  <td className="adm-td-main">{c.name}</td>
                  <td className="adm-td-sub">{c.subtitle || '—'}</td>
                  <td className="adm-td-sub">{c.gridPosition}</td>
                  <td>{c.featured ? <span className="adm-vtag">★ Yes</span> : <span style={{ color: '#2a2a2a', fontSize: '.8rem' }}>—</span>}</td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button className="adm-act-btn" onClick={() => onEdit(c)}>Edit</button>
                      <button className="adm-act-btn del" onClick={() => onDelete(c._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
function Modal({ children, onClose }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(0,0,0,.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#0c0c0c', border: '1px solid #1e1e1e', width: '100%', maxWidth: 640, maxHeight: '92vh', overflowY: 'auto', borderRadius: 4, animation: 'adm-fade-in .2s ease' }}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// ─── FIELD ────────────────────────────────────────────────────────────────────
function Field({ label, hint, children }) {
  return (
    <div>
      <label className="adm-label">
        {label}{hint && <span style={{ color: '#333', textTransform: 'none', letterSpacing: 0, fontSize: '.62rem', fontWeight: 400 }}> — {hint}</span>}
      </label>
      {children}
    </div>
  );
}

// ─── FORM HEADER ──────────────────────────────────────────────────────────────
function FormHeader({ title, onClose }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, paddingBottom: 22, borderBottom: '1px solid #171717' }}>
      <div>
        <p style={{ fontSize: '.5rem', letterSpacing: '.36em', textTransform: 'uppercase', color: '#f97316', marginBottom: 10 }}>UNFLTR CMS</p>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-.04em', color: '#f5f5f5', lineHeight: 1 }}>{title}</h3>
      </div>
      <button onClick={onClose} style={{ background: 'none', border: '1px solid #1e1e1e', color: '#555', padding: '8px 14px', cursor: 'pointer', fontSize: '.72rem', fontFamily: 'inherit', borderRadius: 2, transition: 'color .18s, border-color .18s' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.borderColor = 'rgba(248,113,113,.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#1e1e1e'; }}>
        ✕
      </button>
    </div>
  );
}

// ─── FORM ACTIONS ─────────────────────────────────────────────────────────────
function FormActions({ onCancel, onSave, saveLabel }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 32, justifyContent: 'flex-end', paddingTop: 22, borderTop: '1px solid #171717' }}>
      <button className="adm-cancel-btn" onClick={onCancel}>Cancel</button>
      <button className="adm-save-btn" onClick={onSave}>{saveLabel} →</button>
    </div>
  );
}

// ─── WORK FORM ────────────────────────────────────────────────────────────────
function WorkForm({ data, onChange, onSave, onCancel }) {
  const set = (k, v) => onChange({ ...data, [k]: v });
  const handleTitle = v => onChange({ ...data, title: v, slug: data._id ? data.slug : toSlug(v) });

  return (
    <div style={{ padding: '36px 36px 28px', fontFamily: "'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif" }}>
      <FormHeader title={data._id ? 'Edit Work' : 'New Work'} onClose={onCancel} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="adm-cols2">
          <Field label="Title" hint="required">
            <input className="adm-form-inp" value={data.title} onChange={e => handleTitle(e.target.value)} placeholder="Project title" />
          </Field>
          <Field label="Slug" hint="auto-generated, editable">
            <input className="adm-form-inp" value={data.slug} onChange={e => set('slug', e.target.value)} placeholder="url-slug" />
          </Field>
        </div>
        <div className="adm-cols2">
          <Field label="Category" hint="required">
            <input className="adm-form-inp" value={data.category} onChange={e => set('category', e.target.value)} placeholder="Event Branding, Concert Deck…" />
          </Field>
          <Field label="Client">
            <input className="adm-form-inp" value={data.client} onChange={e => set('client', e.target.value)} placeholder="Brand or client name" />
          </Field>
        </div>
        <Field label="Description">
          <textarea className="adm-form-inp" value={data.desc} onChange={e => set('desc', e.target.value)} placeholder="Project overview and context…" />
        </Field>
        <Field label="Image URL" hint="leave blank to auto-generate from video">
          <input className="adm-form-inp" value={data.image} onChange={e => set('image', e.target.value)} placeholder="https://res.cloudinary.com/…" />
          {data.image && <img className="adm-img-preview" src={data.image} alt="preview" />}
        </Field>
        <Field label="Video URL" hint="optional — image auto-fills if image is blank">
          <input className="adm-form-inp" value={data.video} onChange={e => {
            const vid = e.target.value;
            const auto = (!data.image && vid) ? videoToThumbnail(vid) : data.image;
            onChange({ ...data, video: vid, image: auto });
          }} placeholder="https://res.cloudinary.com/…" />
        </Field>
        <div className="adm-cols2">
          <Field label="Services" hint="comma-separated">
            <input className="adm-form-inp" value={data.services} onChange={e => set('services', e.target.value)} placeholder="Branding, Motion, Strategy" />
          </Field>
          <Field label="Display Order" hint="lower = earlier">
            <input className="adm-form-inp" type="number" min="0" value={data.order} onChange={e => set('order', Math.max(0, parseInt(e.target.value) || 0))} />
          </Field>
        </div>
      </div>
      <FormActions onCancel={onCancel} onSave={onSave} saveLabel="Save Work" />
    </div>
  );
}

// ─── CLIENT FORM ──────────────────────────────────────────────────────────────
function ClientForm({ data, onChange, onSave, onCancel }) {
  const set = (k, v) => onChange({ ...data, [k]: v });

  return (
    <div style={{ padding: '36px 36px 28px', fontFamily: "'Neue Haas Grotesk Display Pro','Helvetica Neue',Arial,sans-serif" }}>
      <FormHeader title={data._id ? 'Edit Client' : 'New Client'} onClose={onCancel} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div className="adm-cols2">
          <Field label="Name" hint="required">
            <input className="adm-form-inp" value={data.name} onChange={e => set('name', e.target.value)} placeholder="Client or brand name" />
          </Field>
          <Field label="Subtitle">
            <input className="adm-form-inp" value={data.subtitle} onChange={e => set('subtitle', e.target.value)} placeholder="Industry or descriptor" />
          </Field>
        </div>
        <Field label="Logo URL">
          <input className="adm-form-inp" value={data.logo} onChange={e => set('logo', e.target.value)} placeholder="https://res.cloudinary.com/…" />
          {data.logo && <img className="adm-logo-preview" src={data.logo} alt="logo preview" />}
        </Field>
        <div className="adm-cols2">
          <Field label="Grid Position" hint="≥ 0, lower = earlier in list">
            <input className="adm-form-inp" type="number" min="0" value={data.gridPosition}
              onChange={e => set('gridPosition', Math.max(0, parseInt(e.target.value) || 0))} />
          </Field>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <label className="adm-label" style={{ marginBottom: 14 }}>Featured</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={data.featured}
                onChange={e => set('featured', e.target.checked)}
                style={{ accentColor: '#f97316', width: 18, height: 18, cursor: 'pointer' }}
              />
              <span style={{ fontSize: '.82rem', color: '#888', lineHeight: 1.4 }}>Mark as featured client</span>
            </label>
          </div>
        </div>
      </div>
      <FormActions onCancel={onCancel} onSave={onSave} saveLabel="Save Client" />
    </div>
  );
}

// ─── SORTABLE ROW ─────────────────────────────────────────────────────────────
function SortableRow({ item, index, type }) {
  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: item.id });

  const thumb = item.image || videoToThumbnail(item.video || '');

  return (
    <div ref={setNodeRef} style={{ transform: CSS.Transform.toString(transform), transition: transition ?? 'transform 200ms ease', zIndex: isDragging ? 10 : 'auto' }}>
      <div
        {...attributes} {...listeners}
        style={{
          display: 'flex', alignItems: 'center', gap: 14,
          background: isDragging ? '#161616' : '#0c0c0c',
          border: `1px solid ${isDragging ? '#2e2e2e' : '#161616'}`,
          borderRadius: 6, padding: '11px 16px',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'grab', userSelect: 'none',
          transition: 'background .12s, border-color .12s, box-shadow .12s',
          boxShadow: isDragging ? '0 8px 32px rgba(0,0,0,.5)' : 'none',
        }}
      >
        {/* drag handle */}
        <span style={{ color: '#2a2a2a', fontSize: '1.1rem', flexShrink: 0, lineHeight: 1, letterSpacing: '1px', fontFamily: 'monospace' }}>⠿</span>

        {/* row index */}
        <span style={{ color: '#272727', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.08em', width: 24, flexShrink: 0, textAlign: 'right' }}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* thumbnail / logo */}
        {type === 'projects' ? (
          thumb
            ? <img src={thumb} alt="" style={{ width: 68, height: 44, objectFit: 'cover', borderRadius: 4, border: '1px solid #1a1a1a', flexShrink: 0 }} />
            : <div style={{ width: 68, height: 44, background: '#0a0a0a', border: '1px dashed #1e1e1e', borderRadius: 4, flexShrink: 0 }} />
        ) : (
          item.logo
            ? <img src={item.logo} alt="" style={{ width: 52, height: 34, objectFit: 'contain', background: '#111', padding: 4, borderRadius: 4, border: '1px solid #1a1a1a', flexShrink: 0 }} />
            : <div style={{ width: 52, height: 34, background: '#0a0a0a', border: '1px dashed #1e1e1e', borderRadius: 4, flexShrink: 0 }} />
        )}

        {/* label */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '.92rem', fontWeight: 700, color: '#e8e8e8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', lineHeight: 1.3 }}>
            {item.title || item.name}
          </p>
          {(item.category) && (
            <span style={{ fontSize: '.5rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#f97316', marginTop: 4, display: 'block' }}>
              {item.category}
            </span>
          )}
        </div>

        {/* type pill */}
        {item.video && (
          <span style={{ fontSize: '.48rem', letterSpacing: '.16em', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid rgba(249,115,22,.3)', color: 'rgba(249,115,22,.7)', borderRadius: 2, flexShrink: 0 }}>
            ▶ Video
          </span>
        )}

        {/* drag hint */}
        <span style={{ fontSize: '.48rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#1e1e1e', flexShrink: 0 }}>drag</span>
      </div>
    </div>
  );
}

// ─── REORDER TAB ─────────────────────────────────────────────────────────────
function ReorderTab({ works, clients, onSaved }) {
  const [subTab, setSubTab] = useState('projects');
  const [saving, setSaving] = useState(false);
  // items + isDirty + saveMsg in one object → single setState in the effect
  const [ls, setLs] = useState({ items: [], isDirty: false, saveMsg: null });
  const { items, isDirty, saveMsg } = ls;

  useEffect(() => {
    const src = subTab === 'projects' ? works : clients;
    const next = src.map(x => ({ ...x, id: String(x._id) }));
    // Defer to a microtask so setState is not called synchronously in the effect body
    Promise.resolve().then(() =>
      setLs({ items: next, isDirty: false, saveMsg: null })
    );
  }, [subTab, works, clients]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;
    setLs(prev => {
      const oldIdx = prev.items.findIndex(x => x.id === active.id);
      const newIdx = prev.items.findIndex(x => x.id === over.id);
      return { ...prev, items: arrayMove(prev.items, oldIdx, newIdx), isDirty: true, saveMsg: null };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/reorder', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: subTab,
          items: items.map(({ _id, id }, i) => ({ _id: _id ?? id, order: i })),
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setLs(s => ({ ...s, isDirty: false, saveMsg: 'ok' }));
        onSaved?.(subTab, items);
        setTimeout(() => setLs(s => ({ ...s, saveMsg: null })), 4000);
      } else {
        setLs(s => ({ ...s, saveMsg: 'err' }));
      }
    } catch {
      setLs(s => ({ ...s, saveMsg: 'err' }));
    }
    setSaving(false);
  };

  return (
    <div style={{ animation: 'adm-fade-in .3s ease' }}>
      {/* ── header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-.04em', color: '#f5f5f5', marginBottom: 6 }}>
            Drag &amp; Drop Reorder
          </h2>
          <p style={{ fontSize: '.62rem', color: '#444', letterSpacing: '.1em', lineHeight: 1.7 }}>
            Drag rows into the order you want &mdash; click <strong style={{ color: '#f97316' }}>Save Order</strong> to persist
          </p>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          {saveMsg === 'ok' && (
            <span style={{ fontSize: '.62rem', color: '#4ade80', letterSpacing: '.1em' }}>✓ Order saved to MongoDB</span>
          )}
          {saveMsg === 'err' && (
            <span style={{ fontSize: '.62rem', color: '#f87171', letterSpacing: '.1em' }}>✕ Save failed — try again</span>
          )}
          <button
            className="adm-add-btn"
            onClick={handleSave}
            disabled={saving || !isDirty}
            style={{ opacity: isDirty ? 1 : 0.3, cursor: isDirty ? 'pointer' : 'not-allowed' }}
          >
            {saving ? 'Saving…' : 'Save Order →'}
          </button>
        </div>
      </div>

      {/* ── sub-tabs ── */}
      <div style={{ display: 'flex', borderBottom: '1px solid #141414', marginBottom: 20 }}>
        {[
          { key: 'projects', label: 'Projects', count: works.length },
          { key: 'clients',  label: 'Clients',  count: clients.length },
        ].map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setSubTab(key)}
            className={`adm-tab-btn${subTab === key ? ' active' : ''}`}
            style={{ fontSize: '.62rem', padding: '12px 24px' }}
          >
            {label}
            <span style={{ marginLeft: 8, fontSize: '.54rem', color: subTab === key ? '#f97316' : '#2a2a2a', fontWeight: 400 }}>{count}</span>
          </button>
        ))}
      </div>

      {/* ── unsaved banner ── */}
      {isDirty && (
        <div style={{ marginBottom: 14, padding: '9px 16px', background: 'rgba(249,115,22,.06)', border: '1px solid rgba(249,115,22,.18)', borderRadius: 4, fontSize: '.6rem', color: '#f97316', letterSpacing: '.1em' }}>
          ● Unsaved changes — click <strong>Save Order</strong> to persist to MongoDB
        </div>
      )}

      {/* ── sortable list ── */}
      {items.length === 0 ? (
        <div className="adm-empty">
          No {subTab} in MongoDB yet.
          <span className="adm-empty-sub">Use ⬆ Restore DB in the topbar to seed your data first.</span>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map(x => x.id)} strategy={verticalListSortingStrategy}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              {items.map((item, index) => (
                <SortableRow key={item.id} item={item} index={index} type={subTab} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* ── item count footer ── */}
      {items.length > 0 && (
        <p style={{ marginTop: 20, fontSize: '.54rem', color: '#252525', letterSpacing: '.14em', textAlign: 'center', textTransform: 'uppercase' }}>
          {items.length} {subTab} · drag to reorder · save to persist
        </p>
      )}
    </div>
  );
}

// ─── ANALYTICS HELPERS ────────────────────────────────────────────────────────
function SparkLine({ data = [], sessions = [], height = 80 }) {
  if (!data || data.length < 2) return <div style={{ height, background: '#0a0a0a', borderRadius: 2 }} />;
  const W = 1000; const H = height; const PAD = 6;
  const all = [...data.map(d => d.y || 0), ...sessions.map(d => d.y || 0)];
  const max = Math.max(...all, 1);
  const toPath = pts => pts.length < 2 ? '' : pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const pr = pts[i - 1];
    const cx = (pr.x + p.x) / 2;
    return `${acc} C ${cx},${pr.y} ${cx},${p.y} ${p.x},${p.y}`;
  }, '');
  const mkPts = arr => arr.map((d, i) => ({
    x: PAD + (i / (arr.length - 1)) * (W - PAD * 2),
    y: H - PAD - ((d.y || 0) / max) * (H - PAD * 2),
  }));
  const pts1 = mkPts(data);
  const line1 = toPath(pts1);
  const fill1 = `${line1} L ${pts1[pts1.length - 1].x},${H} L ${pts1[0].x},${H} Z`;
  const pts2 = sessions.length >= 2 ? mkPts(sessions) : [];
  const line2 = toPath(pts2);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height, display: 'block' }} preserveAspectRatio="none">
      <defs>
        <linearGradient id="spk-g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fill1} fill="url(#spk-g1)" />
      <path d={line1} fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {line2 && <path d={line2} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" />}
    </svg>
  );
}

function BarList({ items = [], maxVal = 1, color = '#f97316' }) {
  if (!items.length) return <p style={{ padding: '24px 20px', fontSize: '.72rem', color: '#2a2a2a', textAlign: 'center', letterSpacing: '.06em' }}>No data for this period</p>;
  return items.slice(0, 10).map(({ x, y }, idx) => (
    <div key={`${x}-${idx}`} className="anl-row">
      <span className="anl-name" title={x}>{x || 'Direct / Unknown'}</span>
      <div className="anl-bar-wrap">
        <div className="anl-bar" style={{ width: `${((y || 0) / (maxVal || 1)) * 100}%`, background: color }} />
      </div>
      <span className="anl-cnt">{(y || 0).toLocaleString()}</span>
    </div>
  ));
}

// ─── ANALYTICS TAB ───────────────────────────────────────────────────────────
function AnalyticsTab() {
  const [rangeDays, setRangeDays] = useState(30);
  const [showCustom, setShowCustom] = useState(false);
  const [customFrom, setCustomFrom] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 30);
    return d.toISOString().split('T')[0];
  });
  const [customTo, setCustomTo] = useState(() => new Date().toISOString().split('T')[0]);
  const [stats, setStats]       = useState(null);
  const [pvData, setPvData]     = useState(null);
  const [pages, setPages]       = useState([]);
  const [refs, setRefs]         = useState([]);
  const [countries, setCountries] = useState([]);
  const [devices, setDevices]   = useState([]);
  const [browsers, setBrowsers] = useState([]);
  const [osData, setOsData]     = useState([]);
  const [liveCount, setLiveCount] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    let mounted = true;
    // Compute timestamps inside effect — Date.now() is impure, safe only outside render
    let startAt, endAt, pvUnit;
    if (showCustom && customFrom && customTo) {
      startAt = new Date(customFrom + 'T00:00:00').getTime();
      endAt   = new Date(customTo   + 'T23:59:59').getTime();
      pvUnit  = 'day';
    } else {
      endAt   = Date.now();
      startAt = endAt - rangeDays * 24 * 60 * 60 * 1000;
      pvUnit  = rangeDays <= 1 ? 'hour' : 'day';
    }
    const qs   = `startAt=${startAt}&endAt=${endAt}`;
    const pvQs = `startAt=${startAt}&endAt=${endAt}&unit=${pvUnit}`;

    Promise.resolve()
      .then(() => {
        if (!mounted) return null;
        setLoading(true);
        setError(null);
        return Promise.all([
          fetch(`/api/analytics?type=stats&${qs}`,     { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/analytics?type=pageviews&${pvQs}`,{ cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/analytics?type=url&${qs}`,        { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/analytics?type=referrer&${qs}`,   { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/analytics?type=country&${qs}`,    { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/analytics?type=device&${qs}`,     { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/analytics?type=browser&${qs}`,    { cache: 'no-store' }).then(r => r.json()),
          fetch(`/api/analytics?type=os&${qs}`,         { cache: 'no-store' }).then(r => r.json()),
          fetch('/api/analytics?type=active',            { cache: 'no-store' }).then(r => r.json()),
        ]);
      })
      .then(results => {
        if (!results || !mounted) return;
        const [s, pv, p, r, c, d, b, o, act] = results;
        if (s?.error) { setError(s.error); setLoading(false); return; }
        setStats(s || null);
        setPvData(!pv?.error ? pv : null);
        setPages(Array.isArray(p) ? p : []);
        setRefs(Array.isArray(r) ? r : []);
        setCountries(Array.isArray(c) ? c : []);
        setDevices(Array.isArray(d) ? d : []);
        setBrowsers(Array.isArray(b) ? b : []);
        setOsData(Array.isArray(o) ? o : []);
        const lv = Array.isArray(act) ? (act[0]?.y ?? null) : (act?.visitors ?? act?.y ?? null);
        setLiveCount(typeof lv === 'number' ? lv : null);
        setLoading(false);
      })
      .catch(e => { if (mounted) { setError(e.message); setLoading(false); } });

    return () => { mounted = false; };
  }, [rangeDays, showCustom, customFrom, customTo]);

  const ANL_CSS = `
    /* ── STAT GRID ── */
    .anl-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:20px; }
    @media(max-width:1000px){.anl-grid{grid-template-columns:repeat(2,1fr);}}
    @media(max-width:480px){.anl-grid{grid-template-columns:1fr 1fr;}}
    .anl-card { background:#0d0d0d; border:1px solid #1e1e1e; padding:24px 22px; position:relative; overflow:hidden; border-radius:3px; }
    .anl-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--ac,#f97316); transform:scaleX(0); transform-origin:left; transition:transform .35s cubic-bezier(.76,0,.24,1); }
    .anl-card:hover::before { transform:scaleX(1); }
    .anl-card-lbl { font-size:.5rem; letter-spacing:.26em; text-transform:uppercase; color:#666; display:block; margin-bottom:12px; font-weight:600; }
    .anl-card-val { font-size:2.4rem; font-weight:900; letter-spacing:-.05em; color:#ffffff; line-height:1; display:block; animation:anl-val-in .55s cubic-bezier(.16,1,.3,1) both; }
    .anl-card-delta { font-size:.6rem; display:block; margin-top:10px; letter-spacing:.04em; font-weight:600; }
    .anl-card-sub { font-size:.58rem; color:#484848; margin-top:6px; display:block; letter-spacing:.06em; }
    @keyframes anl-val-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

    /* ── CHART ── */
    .anl-chart-box { background:#0d0d0d; border:1px solid #1e1e1e; border-radius:3px; padding:22px 24px; margin-bottom:16px; }
    .anl-chart-hd { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; flex-wrap:wrap; gap:8px; }
    .anl-chart-title { font-size:.56rem; letter-spacing:.24em; text-transform:uppercase; color:#aaa; font-weight:700; }
    .anl-chart-legend { display:flex; gap:16px; }
    .anl-legend-item { display:flex; align-items:center; gap:7px; font-size:.52rem; letter-spacing:.1em; }

    /* ── METRIC COLS ── */
    .anl-cols { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
    @media(max-width:720px){.anl-cols{grid-template-columns:1fr;}}
    .anl-list { background:#0d0d0d; border:1px solid #1e1e1e; border-radius:3px; overflow:hidden; }
    .anl-list-hd { padding:14px 18px; border-bottom:1px solid #1a1a1a; display:flex; align-items:center; justify-content:space-between; }
    .anl-list-title { font-size:.56rem; letter-spacing:.2em; text-transform:uppercase; color:#bbb; font-weight:700; }
    .anl-row { display:flex; align-items:center; gap:12px; padding:11px 18px; border-bottom:1px solid #111; }
    .anl-row:last-child { border-bottom:none; }
    .anl-row:hover { background:rgba(249,115,22,.04); }
    .anl-bar-wrap { flex:1; height:3px; background:#1c1c1c; border-radius:2px; overflow:hidden; }
    .anl-bar { height:100%; border-radius:2px; transition:width .5s cubic-bezier(.76,0,.24,1); }
    .anl-cnt { font-size:.8rem; font-weight:700; color:#e0e0e0; white-space:nowrap; min-width:36px; text-align:right; }
    .anl-name { font-size:.8rem; color:#aaa; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; flex:1; min-width:0; max-width:200px; }

    /* ── RANGE BUTTONS ── */
    .anl-range-btn { background:none; border:1px solid #222; color:#777; padding:7px 14px; font-size:.56rem; letter-spacing:.14em; text-transform:uppercase; cursor:pointer; font-family:inherit; border-radius:2px; transition:border-color .18s,color .18s,background .18s; }
    .anl-range-btn.active { border-color:#f97316; color:#f97316; background:rgba(249,115,22,.07); }
    .anl-range-btn:hover:not(.active) { border-color:#333; color:#999; }

    /* ── LIVE BADGE ── */
    .anl-live { display:inline-flex; align-items:center; gap:6px; padding:4px 12px; background:rgba(74,222,128,.08); border:1px solid rgba(74,222,128,.22); border-radius:2px; font-size:.52rem; letter-spacing:.18em; text-transform:uppercase; color:#4ade80; font-weight:600; }
    .anl-live-dot { width:5px; height:5px; border-radius:50%; background:#4ade80; animation:adm-pulse 1.5s ease-in-out infinite; }

    /* ── DATE INPUTS ── */
    .anl-date { background:#0e0e0e; border:1px solid #222; color:#e0e0e0; padding:8px 12px; font-size:.82rem; font-family:inherit; border-radius:2px; outline:none; transition:border-color .18s; }
    .anl-date:focus { border-color:#f97316; }

    /* ── X-AXIS LABELS ── */
    .anl-x-labels { display:flex; justify-content:space-between; margin-top:8px; }
    .anl-x-lbl { font-size:.46rem; color:#484848; letter-spacing:.08em; }
  `;

  const fmtNum = n => (n != null ? Math.round(n).toLocaleString() : '—');
  const fmtDur = s => {
    if (s == null || isNaN(s)) return '—';
    const m = Math.floor(s / 60); const sec = Math.floor(s % 60);
    return m > 0 ? `${m}m ${String(sec).padStart(2,'0')}s` : `${sec}s`;
  };

  const bounceRate = (stats?.uniques?.value > 0 && stats?.bounces?.value != null)
    ? Math.round((stats.bounces.value / stats.uniques.value) * 100) : null;
  const avgDur = (stats?.uniques?.value > 0 && stats?.totaltime?.value != null)
    ? stats.totaltime.value / stats.uniques.value : null;

  const pctDelta = (cur, prev) => {
    if (prev == null || prev === 0 || cur == null) return null;
    return Math.round(((cur - prev) / prev) * 100);
  };

  const RANGES = [{ label: '24h', days: 1 }, { label: '7d', days: 7 }, { label: '30d', days: 30 }, { label: '90d', days: 90 }];

  // ── LOADING ──
  if (loading) return (
    <div style={{ animation: 'adm-fade-in .3s ease' }}>
      <style>{ANL_CSS}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: 20 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 1 ? '#f97316' : '#1e1e1e', animation: `adm-pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
          ))}
        </div>
        <p style={{ fontSize: '.54rem', color: '#2a2a2a', letterSpacing: '.2em', textTransform: 'uppercase' }}>Fetching Analytics…</p>
      </div>
    </div>
  );

  // ── ERROR ──
  if (error) {
    const isConfig = error.includes('UMAMI_API_TOKEN');
    return (
      <div style={{ animation: 'adm-fade-in .3s ease' }}>
        <style>{ANL_CSS}</style>
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-.04em', color: '#f5f5f5', marginBottom: 6 }}>Analytics</h2>
          <p style={{ fontSize: '.62rem', color: '#444', letterSpacing: '.1em' }}>Powered by Umami · 817bbb5a</p>
        </div>
        <div style={{ border: '1px solid #1a1a1a', borderRadius: 4, padding: '48px 36px', textAlign: 'center', maxWidth: 560 }}>
          <div style={{ fontSize: '2rem', marginBottom: 16 }}>{isConfig ? '🔑' : '⚠️'}</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 900, color: '#f5f5f5', marginBottom: 12, letterSpacing: '-.03em' }}>
            {isConfig ? 'API Token Required' : 'Analytics Error'}
          </p>
          <p style={{ fontSize: '.82rem', color: '#555', lineHeight: 1.75, marginBottom: isConfig ? 24 : 0 }}>
            {isConfig ? 'Add your Umami API token to .env.local to unlock this dashboard:' : error}
          </p>
          {isConfig && (
            <>
              <code style={{ display: 'block', background: '#060606', border: '1px solid #1e1e1e', padding: '14px 18px', borderRadius: 4, fontSize: '.78rem', color: '#f97316', letterSpacing: '.04em', fontFamily: 'monospace', textAlign: 'left', marginBottom: 16 }}>
                UMAMI_API_TOKEN=your_token_here
              </code>
              <p style={{ fontSize: '.58rem', color: '#272727', letterSpacing: '.1em', lineHeight: 1.7 }}>
                Generate at cloud.umami.is → Settings → API Keys
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  const pvList = pvData?.pageviews || [];
  const sesList = pvData?.sessions || [];

  // ── DASHBOARD ──
  return (
    <div style={{ animation: 'adm-fade-in .3s ease' }}>
      <style>{ANL_CSS}</style>

      {/* ── HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-.04em', color: '#f5f5f5', margin: 0 }}>Analytics</h2>
            {liveCount !== null && (
              <span className="anl-live">
                <span className="anl-live-dot" />
                {liveCount} Live Now
              </span>
            )}
          </div>
          <p style={{ fontSize: '.58rem', color: '#383838', letterSpacing: '.1em' }}>
            Umami · 817bbb5a · {showCustom ? `${customFrom} → ${customTo}` : `Last ${rangeDays === 1 ? '24 hours' : `${rangeDays} days`}`}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {RANGES.map(({ label, days }) => (
            <button key={days} className={`anl-range-btn${!showCustom && rangeDays === days ? ' active' : ''}`}
              onClick={() => { setRangeDays(days); setShowCustom(false); }}>{label}
            </button>
          ))}
          <button className={`anl-range-btn${showCustom ? ' active' : ''}`} onClick={() => setShowCustom(s => !s)}>
            Custom
          </button>
        </div>
      </div>

      {/* ── CUSTOM DATE ── */}
      {showCustom && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <input type="date" className="anl-date" value={customFrom} onChange={e => setCustomFrom(e.target.value)} />
          <span style={{ color: '#2a2a2a', fontSize: '.7rem' }}>→</span>
          <input type="date" className="anl-date" value={customTo} onChange={e => setCustomTo(e.target.value)} />
        </div>
      )}

      {/* ── STAT CARDS ── */}
      <div className="anl-grid">
        {[
          {
            label: 'Unique Visitors', icon: '◈', color: '#f97316',
            val: fmtNum(stats?.uniques?.value),
            d: pctDelta(stats?.uniques?.value, stats?.uniques?.prev),
          },
          {
            label: 'Pageviews', icon: '◉', color: '#f97316',
            val: fmtNum(stats?.pageviews?.value),
            d: pctDelta(stats?.pageviews?.value, stats?.pageviews?.prev),
          },
          {
            label: 'Bounce Rate', icon: '◎', color: '#a78bfa',
            val: bounceRate != null ? `${bounceRate}%` : '—',
            d: null,
            sub: 'Single-page visits',
          },
          {
            label: 'Avg. Duration', icon: '◷', color: '#60a5fa',
            val: fmtDur(avgDur),
            d: null,
            sub: 'Per unique visitor',
          },
        ].map(({ label, val, d, sub, color }) => (
          <div key={label} className="anl-card" style={{ '--ac': color }}>
            <span className="anl-card-lbl">{label}</span>
            <span className="anl-card-val" key={`${label}-${val}`}>{val}</span>
            {d !== null && (
              <span className="anl-card-delta" style={{ color: d >= 0 ? '#4ade80' : '#f87171' }}>
                {d >= 0 ? '↑' : '↓'} {Math.abs(d)}% vs prev period
              </span>
            )}
            {sub && <span className="anl-card-sub">{sub}</span>}
          </div>
        ))}
      </div>

      {/* ── TRAFFIC CHART ── */}
      {pvList.length > 1 && (
        <div className="anl-chart-box">
          <div className="anl-chart-hd">
            <span className="anl-chart-title">Traffic Trend</span>
            <div className="anl-chart-legend">
              <span className="anl-legend-item" style={{ color: '#f97316' }}>
                <span style={{ display: 'inline-block', width: 16, height: 2, background: '#f97316', borderRadius: 1 }} />
                Pageviews
              </span>
              <span className="anl-legend-item" style={{ color: '#383838' }}>
                <span style={{ display: 'inline-block', width: 16, height: 0, borderBottom: '2px dashed #383838' }} />
                Sessions
              </span>
            </div>
          </div>
          <SparkLine data={pvList} sessions={sesList} height={88} />
          <div className="anl-x-labels">
            <span className="anl-x-lbl">{pvList[0]?.x || ''}</span>
            {pvList.length > 4 && <span className="anl-x-lbl">{pvList[Math.floor(pvList.length / 2)]?.x || ''}</span>}
            <span className="anl-x-lbl">{pvList[pvList.length - 1]?.x || ''}</span>
          </div>
        </div>
      )}

      {/* ── TOP PAGES + REFERRERS ── */}
      <div className="anl-cols">
        <div className="anl-list">
          <div className="anl-list-hd"><span className="anl-list-title">Top Pages</span><span style={{ fontSize: '.5rem', color: '#272727', letterSpacing: '.1em' }}>{pages.length} urls</span></div>
          <BarList items={pages} maxVal={pages[0]?.y} color="#f97316" />
        </div>
        <div className="anl-list">
          <div className="anl-list-hd"><span className="anl-list-title">Referrers</span><span style={{ fontSize: '.5rem', color: '#272727', letterSpacing: '.1em' }}>{refs.length} sources</span></div>
          <BarList items={refs} maxVal={refs[0]?.y} color="#f97316" />
        </div>
      </div>

      {/* ── COUNTRIES + DEVICES ── */}
      <div className="anl-cols">
        <div className="anl-list">
          <div className="anl-list-hd"><span className="anl-list-title">Countries</span><span style={{ fontSize: '.5rem', color: '#272727', letterSpacing: '.1em' }}>{countries.length} regions</span></div>
          <BarList items={countries} maxVal={countries[0]?.y} color="#a78bfa" />
        </div>
        <div className="anl-list">
          <div className="anl-list-hd"><span className="anl-list-title">Devices</span><span style={{ fontSize: '.5rem', color: '#272727', letterSpacing: '.1em' }}>{devices.length} types</span></div>
          <BarList items={devices} maxVal={devices[0]?.y} color="#60a5fa" />
        </div>
      </div>

      {/* ── BROWSERS + OS ── */}
      <div className="anl-cols">
        <div className="anl-list">
          <div className="anl-list-hd"><span className="anl-list-title">Browsers</span><span style={{ fontSize: '.5rem', color: '#272727', letterSpacing: '.1em' }}>{browsers.length} detected</span></div>
          <BarList items={browsers} maxVal={browsers[0]?.y} color="#34d399" />
        </div>
        <div className="anl-list">
          <div className="anl-list-hd"><span className="anl-list-title">Operating Systems</span><span style={{ fontSize: '.5rem', color: '#272727', letterSpacing: '.1em' }}>{osData.length} detected</span></div>
          <BarList items={osData} maxVal={osData[0]?.y} color="#f472b6" />
        </div>
      </div>
    </div>
  );
}
