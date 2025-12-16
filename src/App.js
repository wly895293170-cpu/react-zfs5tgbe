import React, { useState, useEffect, useRef } from 'react';
import {
  Map as MapIcon,
  Scroll,
  Database,
  Crown,
  Sword,
  Leaf,
  Skull,
  Search,
  Plus,
  Save,
  X,
  Globe,
  Image as ImageIcon,
  Upload,
  Feather,
  Clock,
  Calendar as CalendarIcon,
  Compass,
  Lock,
  Eye,
  EyeOff,
  MousePointer2,
  User,
  History,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Trash2,
  Hourglass,
  Edit3,
  Send,
  Building,
  DoorOpen,
  ArrowUpLeft,
  Home,
  MapPin,
  Link as LinkIcon,
  Maximize2,
  FileText,
  Bot,
  GraduationCap,
  Shield,
  Book,
  Heart,
  BedDouble,
  Users,
  Briefcase,
  BookOpen,
  Calculator,
  CalendarDays,
  PlusCircle,
  MinusCircle,
} from 'lucide-react';

// --- 样式常量 ---
const THEME = {
  paper: 'bg-[#f4e4bc]',
  paperDark: 'bg-[#e6d2a0]',
  ink: 'text-[#2b1d0e]',
  inkLight: 'text-[#5c4d3c]',
  gold: 'border-[#b8860b]',
  red: 'text-[#8b0000]',
  green: 'text-[#2e4a26]',
  purple: 'text-[#4c1d95]',
  accent: 'bg-[#8b4513]',
};

// --- 初始数据 ---

const initialCoursesData = [
  {
    id: 'c101',
    year: 1,
    name: '魔法植物学入门',
    professors: '西弗勒斯、阿格兰',
    overview: '学习基础魔法植物的识别、采摘与保存。',
    grading: [
      {
        type: '提交报告',
        weight: '65%',
        desc: '正确采摘的完整魔药样本及报告。',
      },
      { type: '期末论文', weight: '35%', desc: '魔药采集与运用论文。' },
    ],
    mechanics: '1次 自然/生存 检定。DC10(普通) / DC14(良) / DC18(优)。',
  },
  {
    id: 'c102',
    year: 1,
    name: '魔法史概论',
    professors: '宾斯教授 (幽灵)',
    overview: '阿凯维沃大陆的古代战争史与魔法起源。',
    grading: [
      { type: '考古作业', weight: '50%', desc: '提交古代遗物碎片。' },
      { type: '笔试', weight: '50%', desc: '血腥时代论述。' },
    ],
    mechanics: '1次 历史/奥秘 检定。DC12(及格)。',
  },
  {
    id: 'c201',
    year: 2,
    name: '中级墨法学',
    professors: '谢伊莱·黑书',
    overview: '银毫学院进阶课程，学习如何用文字操纵人心。',
    grading: [
      { type: '辩论赛', weight: '100%', desc: '在公开辩论中击败对手。' },
    ],
    mechanics: '3次 威吓/游说 检定，三局两胜。',
  },
];

const initialSchedule = [
  {
    id: 1,
    date: '4569-09-01',
    type: 'event',
    title: '开学典礼',
    desc: '在茂典阁前广场举行。',
  },
  {
    id: 2,
    date: '4569-09-02',
    type: 'class',
    courseId: 'c101',
    title: '第一堂课：尖叫草',
    desc: '需自备耳塞。',
  },
  {
    id: 3,
    date: '4569-09-15',
    type: 'due',
    courseId: 'c101',
    title: '魔药报告截止',
    desc: '关于沉积湿地植物分布。',
  },
  {
    id: 4,
    date: '4569-10-10',
    type: 'exam',
    courseId: 'c102',
    title: '魔法史期中考',
    desc: 'DC12 历史检定。',
  },
];

const initialPins = [
  {
    id: 'landmark-biblioplex',
    month: 9,
    x: 50,
    y: 50,
    map: 'academy',
    type: 'landmark',
    title: '茂典阁',
    desc: '斯翠海文的中心图书馆。',
    status: 'active',
    level: 0,
    subMapImage:
      'https://images.unsplash.com/photo-1507842217153-e21220c52221?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
    subMapId: 'map-biblioplex-interior',
    iconUrl: 'https://img.icons8.com/color/96/library-building.png',
    timeline: [
      { date: '4568/01/01', event: '茂典阁建成五百周年纪念日。' },
      { date: '4569/09/10', event: '因地下室渗水，部分禁书区暂时封闭。' },
    ],
  },
  {
    id: 'landmark-stadium',
    month: 9,
    x: 80,
    y: 30,
    map: 'academy',
    type: 'landmark',
    title: '法师塔球场',
    desc: '热血沸腾的赛场。',
    status: 'closed',
    level: 0,
    timeline: [],
  },
  {
    id: 1,
    month: 10,
    expiryMonth: 12,
    x: 45,
    y: 40,
    map: 'academy',
    type: 'combat',
    title: '操场骚动',
    desc: '有人看到操场下的草皮在蠕动。',
    status: 'active',
    level: 3,
  },
  {
    id: 201,
    month: 10,
    expiryMonth: 11,
    x: 60,
    y: 60,
    map: 'academy',
    type: 'club',
    title: '戏剧社招新',
    desc: '寻找有魅力的主演。',
    status: 'active',
    level: 0,
  },

  // 子地图内容
  {
    id: 101,
    month: 10,
    expiryMonth: 12,
    x: 30,
    y: 40,
    map: 'map-biblioplex-interior',
    type: 'combat',
    title: '书架怪',
    desc: '一本长牙的魔法书。',
    status: 'active',
    level: 2,
  },
  {
    id: 102,
    month: 10,
    expiryMonth: 12,
    x: 70,
    y: 60,
    map: 'map-biblioplex-interior',
    type: 'npc',
    title: '图书管理员',
    desc: '正在寻找丢失的《初级火球术》。',
    status: 'active',
    level: 10,
    iconUrl: 'https://img.icons8.com/color/96/wizard.png',
  },

  // 大世界
  {
    id: 4,
    month: 10,
    expiryMonth: 12,
    x: 60,
    y: 20,
    map: 'arcavios',
    type: 'combat',
    title: '奥里奇边境巡逻',
    desc: '需要护送商队。',
    status: 'active',
    level: 5,
  },
];

const initialWorldLog = [
  { id: 1, month: 9, type: 'environment', text: '秋季开学典礼顺利举行。' },
  {
    id: 2,
    month: 10,
    type: 'npc',
    text: '茂典阁宣布延长开放时间，但严禁在馆内饮食。',
  },
];

const initialAssets = {
  newspaper: [
    'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  ],
  academyMap:
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
  arcaviosMap:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
};

const initialArchives = {
  students: [
    {
      id: 'S001',
      name: '艾拉·晨星',
      college: '石语堂',
      year: '一年级',
      dorm: '宿舍A-101',
      race: '人类',
      class: '法师',
      level: 1,
      status: '健康',
      photoUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      background: '来自北方山脉的矿工之女。',
      timeline: [{ date: '4569/09/01', event: '入学，被分院帽分配至石语堂。' }],
    },
    {
      id: 'S002',
      name: '奥利奥',
      college: '银毫学院',
      year: '一年级',
      dorm: '宿舍B-202',
      race: '人类',
      class: '牧师',
      level: 1,
      status: '健康',
      photoUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      background: '正如他的名字一样受人欢迎。',
      timeline: [{ date: '4569/09/01', event: '入学，加入了辩论社。' }],
    },
  ],
};

const initialReports = [
  {
    id: 1,
    pl: 'PL_Dave',
    content: '艾拉·晨星在探索图书馆时发现了古代符文。',
    date: '4569/09/15',
    tags: ['艾拉·晨星'],
  },
];

// --- 辅助组件 ---
const Parchment = ({ children, className = '' }) => (
  <div
    className={`relative overflow-hidden ${THEME.paper} ${className}`}
    style={{ boxShadow: 'inset 0 0 60px rgba(0,0,0,0.1)' }}
  >
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    ></div>
    {children}
  </div>
);

const generateNarrative = (status, task) => {
  return `${task.title} 的状态已变更为 ${
    status === 'completed' ? '完成' : '过期'
  }。`;
};

// --- 功能视图组件 ---

// 1. 地图组件
const ImmersiveMap = ({
  pins,
  setPins,
  assets,
  currentMapLayer,
  setCurrentMapLayer,
  isDmMode,
  setIsDmMode,
  showGrid,
  setShowGrid,
  worldDate,
  editingPin,
  setEditingPin,
  onSavePin,
  onDeletePin,
  onUpdatePinStatus,
  worldLog,
  mapStack,
  setMapStack,
}) => {
  const [selectedPin, setSelectedPin] = useState(null);
  const [viewMonth, setViewMonth] = useState(worldDate.month);
  const [imgError, setImgError] = useState(false);
  const [pendingStatus, setPendingStatus] = useState(null);
  const [draftNarrative, setDraftNarrative] = useState('');
  const [newLandmarkEvent, setNewLandmarkEvent] = useState('');
  const [newLandmarkDate, setNewLandmarkDate] = useState('');

  const getCurrentMapImage = () => {
    if (currentMapLayer === 'academy') return assets.academyMap;
    if (currentMapLayer === 'arcavios') return assets.arcaviosMap;
    const parentPin = pins.find((p) => p.subMapId === currentMapLayer);
    return parentPin ? parentPin.subMapImage : null;
  };
  const currentMapImage = getCurrentMapImage();
  const getInternalPins = (landmarkPin) => {
    if (!landmarkPin.subMapId) return [];
    return pins.filter(
      (p) => p.map === landmarkPin.subMapId && p.status === 'active'
    );
  };

  useEffect(() => {
    setViewMonth(worldDate.month);
  }, [worldDate.month]);
  useEffect(() => {
    setImgError(false);
  }, [currentMapLayer, assets]);
  useEffect(() => {
    setPendingStatus(null);
    setDraftNarrative('');
    if (selectedPin)
      setNewLandmarkDate(`${worldDate.year}/${worldDate.month}/xx`);
  }, [selectedPin]);

  const currentPins = pins.filter((p) => {
    const isSameMap = p.map === currentMapLayer;
    if (!isSameMap) return false;
    if (p.type === 'landmark') return p.month <= viewMonth;
    return p.month === viewMonth;
  });
  const currentLogs = worldLog.filter((l) => l.month === viewMonth);
  const isHistoryMode = viewMonth < worldDate.month;

  const handleMapContextMenu = (e) => {
    e.preventDefault();
    if (!isDmMode) return;
    if (isHistoryMode) {
      alert('历史不可更改');
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setEditingPin({
      id: Date.now(),
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      map: currentMapLayer,
      month: viewMonth,
      expiryMonth: viewMonth + 1,
      type: 'combat',
      title: '新标记...',
      desc: '',
      status: 'active',
      level: 1,
      subMapImage: '',
      iconUrl: '',
    });
  };
  const enterSubMap = (pin) => {
    if (pin.subMapId && pin.subMapImage) {
      setMapStack((prev) => [
        ...prev,
        { id: currentMapLayer, name: getMapName(currentMapLayer) },
      ]);
      setCurrentMapLayer(pin.subMapId);
      setSelectedPin(null);
    }
  };
  const goBackMap = () => {
    if (mapStack.length > 0) {
      const prev = mapStack[mapStack.length - 1];
      setMapStack((prevStack) => prevStack.slice(0, -1));
      setCurrentMapLayer(prev.id);
      setSelectedPin(null);
    }
  };
  const getMapName = (layerId) => {
    if (layerId === 'academy') return '学院区';
    if (layerId === 'arcavios') return '大世界';
    const parentPin = pins.find((p) => p.subMapId === layerId);
    return parentPin ? parentPin.title : '未知区域';
  };
  const startNarrative = (status) => {
    setPendingStatus(status);
    setDraftNarrative(generateNarrative(status, selectedPin));
  };
  const confirmNarrative = () => {
    if (selectedPin && pendingStatus) {
      onUpdatePinStatus(selectedPin.id, pendingStatus, draftNarrative);
      setSelectedPin(null);
      setPendingStatus(null);
    }
  };
  const addLandmarkEvent = () => {
    if (!newLandmarkEvent) return;
    const updatedPin = {
      ...selectedPin,
      timeline: [
        ...(selectedPin.timeline || []),
        { date: newLandmarkDate, event: newLandmarkEvent },
      ],
    };
    const updatedPins = pins.map((p) =>
      p.id === selectedPin.id ? updatedPin : p
    );
    setPins(updatedPins);
    setSelectedPin(updatedPin);
    setNewLandmarkEvent('');
    alert('地标大事记已更新');
  };

  return (
    <div className="flex h-full relative overflow-hidden font-serif">
      <div
        className={`flex-1 relative overflow-hidden select-none cursor-crosshair group ${THEME.paper}`}
        onContextMenu={handleMapContextMenu}
      >
        <div
          className={`absolute inset-0 bg-[#2b1d0e] transition-all duration-1000 ${
            isHistoryMode ? 'grayscale sepia-[.5]' : ''
          }`}
        >
          {currentMapImage && !imgError ? (
            <img
              src={currentMapImage}
              className="w-full h-full object-cover opacity-90 contrast-125"
              alt="Map"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[#e6d2a0] bg-[#1a1510] p-12 text-center">
              Map Error
            </div>
          )}
        </div>
        {!imgError && (
          <>
            {showGrid && (
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
                  backgroundSize: '50px 50px',
                }}
              ></div>
            )}
            {currentPins.map((pin) => (
              <button
                key={pin.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPin(pin);
                }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  pin.type === 'landmark'
                    ? 'z-40 hover:scale-110'
                    : 'z-30 hover:scale-125'
                } ${
                  pin.status === 'completed' || pin.status === 'closed'
                    ? 'opacity-80 grayscale'
                    : ''
                } ${
                  pin.status === 'expired'
                    ? 'opacity-50 grayscale contrast-50'
                    : ''
                } ${isHistoryMode ? 'opacity-70' : ''}`}
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              >
                <div
                  className={`rounded-full border-2 shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex items-center justify-center transition-colors overflow-hidden bg-cover bg-center ${
                    pin.type === 'landmark'
                      ? 'w-12 h-12 bg-[#2b1d0e] border-[#b8860b] text-[#b8860b] ring-4 ring-[#2b1d0e]/30'
                      : 'w-6 h-6 bg-gray-800 border-gray-500 text-gray-400'
                  }`}
                >
                  {pin.iconUrl ? (
                    <img
                      src={pin.iconUrl}
                      alt="icon"
                      className="w-full h-full object-cover"
                    />
                  ) : pin.type === 'landmark' ? (
                    <Building size={24} />
                  ) : pin.type === 'club' ? (
                    <Users size={16} />
                  ) : pin.type === 'job' ? (
                    <Briefcase size={16} />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[#2b1d0e] text-[#e6d2a0] text-xs px-2 py-1 rounded border border-[#b8860b] opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none shadow-lg font-bold">
                  {pin.title}
                </div>
              </button>
            ))}
          </>
        )}
        {/* UI Overlays */}
        <div className="absolute top-6 left-6 z-40 flex items-center space-x-2">
          {mapStack.length > 0 && (
            <button
              onClick={goBackMap}
              className="bg-[#2b1d0e] text-[#f4e4bc] p-2 rounded-full border border-[#b8860b] hover:bg-[#3d2b1f] shadow-lg"
            >
              <ArrowUpLeft size={20} />
            </button>
          )}
          <div className="bg-black/60 backdrop-blur-md border border-[#b8860b] px-4 py-2 rounded-full text-[#e6d2a0] shadow-2xl flex items-center text-xs font-bold font-mono">
            <Globe size={14} className="mr-2 text-[#8b4513]" />
            <span>
              {mapStack.length > 0
                ? mapStack[mapStack.length - 1].name
                : 'Root'}{' '}
              / {currentMapLayer}
            </span>
          </div>
        </div>

        {/* DM Mode Switch */}
        <div className="absolute top-6 right-6 z-40">
          <button
            onClick={() => setIsDmMode(!isDmMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold shadow-2xl border-2 transition-all transform hover:scale-105 ${
              isDmMode
                ? 'bg-[#8b0000] text-white border-[#f4e4bc]'
                : 'bg-[#2b1d0e]/80 text-[#e6d2a0] border-[#5c4d3c] backdrop-blur-md'
            }`}
          >
            {isDmMode ? (
              <Eye size={18} className="animate-pulse" />
            ) : (
              <EyeOff size={18} />
            )}
            <span>DM Mode: {isDmMode ? 'ON' : 'OFF'}</span>
          </button>
        </div>

        <div className="absolute bottom-20 left-6 max-w-sm pointer-events-none">
          <div className="space-y-2">
            {currentLogs.slice(-4).map((log) => (
              <div
                key={log.id}
                className="bg-black/60 backdrop-blur text-[#e6d2a0] text-xs p-3 rounded border-l-2 border-[#b8860b] shadow-lg animate-fade-in-up"
              >
                <span className="font-bold uppercase tracking-wider mr-2 text-blue-400">
                  [日志]
                </span>
                {log.text}
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#2b1d0e] p-2 rounded-full border border-[#b8860b] shadow-xl flex items-center space-x-4 z-40">
          <button
            onClick={() => setViewMonth(Math.max(1, viewMonth - 1))}
            disabled={viewMonth <= 1}
            className="p-1 text-[#e6d2a0] hover:text-white disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xl font-black text-[#f4e4bc] font-serif">
            {worldDate.year} DR - {viewMonth}月
          </span>
          <button
            onClick={() => setViewMonth(Math.min(12, viewMonth + 1))}
            disabled={viewMonth >= worldDate.month}
            className="p-1 text-[#e6d2a0] hover:text-white disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Edit Modal */}
        {editingPin && (
          <div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setEditingPin(null)}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              className={`${THEME.paper} p-6 rounded-lg border-4 ${THEME.gold} w-96 shadow-2xl relative max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className={`text-xl font-bold ${THEME.ink} mb-4 flex items-center border-b border-[#b8860b] pb-2`}
              >
                <Feather className="mr-2 w-5 h-5" />{' '}
                {editingPin.type === 'landmark' ? '建设地标' : '发布任务'}
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <select
                    className="w-full bg-[#fdfbf7] border border-[#c4a484] p-2 text-sm"
                    value={editingPin.type}
                    onChange={(e) =>
                      setEditingPin({ ...editingPin, type: e.target.value })
                    }
                  >
                    <option value="combat">⚔️ 战斗委托</option>
                    <option value="gather">🌿 采集研学</option>
                    <option value="ruin">💀 历史遗迹</option>
                    <option value="npc">🧙‍♂️ NPC</option>
                    <option value="club">👥 社团招募</option>
                    <option value="job">📜 用工招募</option>
                    <option value="landmark">🏛️ 地标建筑</option>
                  </select>
                  <input
                    type="number"
                    className="w-full bg-[#fdfbf7] border border-[#c4a484] p-2 text-sm"
                    value={editingPin.level}
                    onChange={(e) =>
                      setEditingPin({
                        ...editingPin,
                        level: parseInt(e.target.value),
                      })
                    }
                    placeholder="等级"
                  />
                </div>
                <input
                  type="text"
                  className="w-full bg-[#fdfbf7] border border-[#c4a484] p-2 text-sm font-serif"
                  value={editingPin.title}
                  onChange={(e) =>
                    setEditingPin({ ...editingPin, title: e.target.value })
                  }
                  placeholder="标题"
                />
                <input
                  type="text"
                  className="w-full bg-[#fdfbf7] border border-[#c4a484] p-2 text-xs font-serif"
                  placeholder="自定义图标 URL..."
                  value={editingPin.iconUrl || ''}
                  onChange={(e) =>
                    setEditingPin({ ...editingPin, iconUrl: e.target.value })
                  }
                />
                {editingPin.type === 'landmark' && (
                  <input
                    type="text"
                    className="w-full bg-[#fdfbf7] border border-[#c4a484] p-2 text-xs font-serif mb-1"
                    placeholder="深层空间地图 URL..."
                    value={editingPin.subMapImage || ''}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      setEditingPin({
                        ...editingPin,
                        subMapImage: newVal,
                        subMapId: newVal
                          ? `map-${editingPin.id || Date.now()}`
                          : null,
                      });
                    }}
                  />
                )}
                <textarea
                  className="w-full h-24 bg-[#fdfbf7] border border-[#c4a484] p-2 text-sm font-serif resize-none"
                  value={editingPin.desc}
                  onChange={(e) =>
                    setEditingPin({ ...editingPin, desc: e.target.value })
                  }
                ></textarea>
                <button
                  onClick={onSavePin}
                  className="w-full px-6 py-2 text-sm font-bold text-[#f4e4bc] bg-[#8b4513] border border-[#5c4d3c] rounded hover:bg-[#5c3a2a] shadow-md"
                >
                  {editingPin.id ? '更新记录' : '铭刻'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Details */}
        {selectedPin && (
          <div
            className={`w-80 ${THEME.paperDark} border-l-4 border-[#5c4d3c] shadow-[ -10px_0_20px_rgba(0,0,0,0.3)] transform transition-transform duration-300 absolute right-0 top-0 bottom-0 z-40`}
          >
            <div className="p-6 h-full flex flex-col relative bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
              <button
                onClick={() => setSelectedPin(null)}
                className="absolute top-4 right-4 text-[#5c4d3c] hover:text-[#8b0000]"
              >
                <X />
              </button>
              <div className="border-b-2 border-[#5c4d3c] pb-2 mb-4 mt-2">
                <span
                  className={`text-xs font-black uppercase tracking-[0.2em] flex items-center ${
                    selectedPin.type === 'landmark'
                      ? 'text-[#8b4513]'
                      : selectedPin.status === 'completed'
                      ? 'text-green-700'
                      : 'text-[#8b0000]'
                  }`}
                >
                  {selectedPin.type === 'landmark' ? (
                    <>
                      <Building size={12} className="mr-1" /> Landmark
                    </>
                  ) : selectedPin.type === 'combat' ? (
                    'Combat Encounter'
                  ) : (
                    'Task'
                  )}
                </span>
                <h2
                  className={`text-2xl font-serif font-bold leading-tight ${THEME.ink} mt-1`}
                >
                  {selectedPin.title}
                </h2>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {selectedPin.iconUrl && (
                  <div className="w-full h-32 mb-4 overflow-hidden border border-[#8b4513] shadow-inner bg-black/10">
                    <img
                      src={selectedPin.iconUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <p
                  className={`font-serif text-lg leading-relaxed ${THEME.inkLight} italic`}
                >
                  “{selectedPin.desc}”
                </p>

                {/* Internal Scan */}
                {selectedPin.type === 'landmark' && selectedPin.subMapId && (
                  <div className="mt-6">
                    <div className="bg-[#fdfbf7]/50 p-3 rounded border border-[#8b4513] mb-3">
                      <h4 className="text-xs font-bold text-[#8b4513] uppercase mb-2 flex items-center">
                        <Search size={12} className="mr-1" /> 深度空间扫描
                      </h4>
                      <ul className="text-xs space-y-1">
                        {getInternalPins(selectedPin).length > 0 ? (
                          getInternalPins(selectedPin).map((p) => (
                            <li
                              key={p.id}
                              className="flex items-center text-[#5c4d3c]"
                            >
                              {p.title}
                            </li>
                          ))
                        ) : (
                          <li className="italic text-gray-500">暂无活跃事件</li>
                        )}
                      </ul>
                    </div>
                    <button
                      onClick={() => enterSubMap(selectedPin)}
                      className="w-full py-2 bg-[#2b1d0e] text-[#f4e4bc] font-bold rounded flex items-center justify-center hover:bg-[#3d2b1f] shadow-lg border border-[#b8860b] group transition-all"
                    >
                      <DoorOpen className="mr-2 group-hover:scale-110 transition-transform" />{' '}
                      进入内部
                    </button>
                  </div>
                )}
                {/* Landmark Timeline */}
                {selectedPin.type === 'landmark' && (
                  <div className="mt-8 border-t border-[#c4a484] pt-4">
                    <h4 className="text-sm font-bold text-[#5c4d3c] mb-3 flex items-center">
                      <History size={14} className="mr-2" /> 场所志
                    </h4>
                    <div className="space-y-3">
                      {selectedPin.timeline &&
                        selectedPin.timeline.map((evt, i) => (
                          <div key={i} className="text-xs">
                            <span className="font-bold text-[#8b4513]">
                              {evt.date}
                            </span>
                            : {evt.event}
                          </div>
                        ))}
                    </div>
                    {isDmMode && (
                      <div className="mt-3 flex gap-2">
                        <input
                          className="w-1/3 text-[10px] p-1 border rounded"
                          placeholder="日期"
                          value={newLandmarkDate}
                          onChange={(e) => setNewLandmarkDate(e.target.value)}
                        />
                        <input
                          className="flex-1 text-[10px] p-1 border rounded"
                          placeholder="发生的大事..."
                          value={newLandmarkEvent}
                          onChange={(e) => setNewLandmarkEvent(e.target.value)}
                        />
                        <button
                          onClick={addLandmarkEvent}
                          className="text-[10px] bg-[#8b4513] text-white px-2 rounded"
                        >
                          记录
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              {isDmMode && !isHistoryMode && (
                <div className="mt-4 p-4 bg-[#2b1d0e]/10 rounded-lg border border-[#8b4513] border-dashed">
                  <div className="text-xs font-bold text-[#8b4513] mb-2 uppercase tracking-widest flex items-center">
                    <Crown size={12} className="mr-1" /> DM 操作面板
                  </div>
                  {selectedPin.type === 'landmark' ? (
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <button
                        onClick={() =>
                          onUpdatePinStatus(
                            selectedPin.id,
                            'closed',
                            `${selectedPin.title} 暂时歇业。`
                          )
                        }
                        className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                      >
                        关门
                      </button>
                      <button
                        onClick={() =>
                          onUpdatePinStatus(
                            selectedPin.id,
                            'active',
                            `${selectedPin.title} 重新开业！`
                          )
                        }
                        className="px-2 py-1 bg-green-700 text-white rounded text-xs hover:bg-green-800"
                      >
                        开业
                      </button>
                    </div>
                  ) : (
                    !pendingStatus &&
                    selectedPin.status === 'active' && (
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <button
                          onClick={() => startNarrative('completed')}
                          className="px-2 py-1 bg-green-700 text-white rounded text-xs"
                        >
                          任务完成
                        </button>
                        <button
                          onClick={() => startNarrative('expired')}
                          className="px-2 py-1 bg-gray-600 text-white rounded text-xs"
                        >
                          宣告过期
                        </button>
                      </div>
                    )
                  )}
                  {pendingStatus && (
                    <div className="mb-2">
                      <textarea
                        className="w-full h-24 p-2 text-xs border rounded"
                        value={draftNarrative}
                        onChange={(e) => setDraftNarrative(e.target.value)}
                      ></textarea>
                      <div className="flex gap-2 mt-1">
                        <button
                          onClick={() => setPendingStatus(null)}
                          className="flex-1 text-xs border rounded"
                        >
                          取消
                        </button>
                        <button
                          onClick={confirmNarrative}
                          className="flex-1 text-xs bg-[#8b4513] text-white rounded"
                        >
                          发布
                        </button>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPin(selectedPin)}
                      className="flex-1 py-1 border border-[#8b4513] text-[#8b4513] text-xs rounded hover:bg-[#e6d2a0]"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => {
                        onDeletePin(selectedPin.id);
                        setSelectedPin(null);
                      }}
                      className="flex-1 py-1 border border-[#8b0000] text-[#8b0000] text-xs rounded hover:bg-[#8b0000] hover:text-white"
                    >
                      删除
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Switch */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-30 pointer-events-none">
        <div className="flex bg-[#2b1d0e] p-1 rounded border border-[#b8860b] shadow-xl pointer-events-auto">
          <button
            onClick={() => {
              setCurrentMapLayer('academy');
              setMapStack([]);
            }}
            className={`px-3 py-1 text-xs font-bold rounded flex items-center ${
              currentMapLayer === 'academy'
                ? 'bg-[#b8860b] text-[#2b1d0e]'
                : 'text-[#e6d2a0] hover:bg-[#3d2b1f]'
            }`}
          >
            学院区
          </button>
          <button
            onClick={() => {
              setCurrentMapLayer('arcavios');
              setMapStack([]);
            }}
            className={`px-3 py-1 text-xs font-bold rounded flex items-center ${
              currentMapLayer === 'arcavios'
                ? 'bg-[#b8860b] text-[#2b1d0e]'
                : 'text-[#e6d2a0] hover:bg-[#3d2b1f]'
            }`}
          >
            大世界
          </button>
        </div>
        <div className="flex bg-[#2b1d0e] p-1 rounded border border-[#b8860b] shadow-xl pointer-events-auto">
          <button
            onClick={() => setShowGrid(!showGrid)}
            title="Toggle Grid"
            className={`p-1.5 rounded text-[#e6d2a0] hover:bg-[#3d2b1f] ${
              showGrid ? 'bg-[#3d2b1f]' : ''
            }`}
          >
            <Globe size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. NewspaperView (保持不变)
const NewspaperView = ({ assets, worldDate, setActiveTab }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const newspaperPages = assets.newspaper;
  const currentPageUrl = newspaperPages[pageIndex];
  const totalPages = newspaperPages.length;
  const nextPage = (e) => {
    e?.stopPropagation();
    setPageIndex((i) => Math.min(totalPages - 1, i + 1));
  };
  const prevPage = (e) => {
    e?.stopPropagation();
    setPageIndex((i) => Math.max(0, i - 1));
  };
  return (
    <Parchment className="h-full flex flex-col items-center justify-center p-8 bg-black/20">
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <div className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer z-[101]">
            <X size={32} />
          </div>
          <img
            src={currentPageUrl}
            className="max-h-[95vh] max-w-[95vw] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                disabled={pageIndex === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white disabled:opacity-30 backdrop-blur-sm"
              >
                <ChevronLeft size={48} />
              </button>
              <button
                onClick={nextPage}
                disabled={pageIndex === totalPages - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white disabled:opacity-30 backdrop-blur-sm"
              >
                <ChevronRight size={48} />
              </button>
            </>
          )}
        </div>
      )}
      <div
        className="relative bg-white shadow-2xl p-0 border border-[#d1d5db] overflow-hidden cursor-zoom-in group"
        style={{
          width: 'min(500px, 90vw)',
          aspectRatio: '210/297',
          transform: 'rotate(-1deg)',
        }}
        onClick={() => setIsFullscreen(true)}
      >
        {currentPageUrl ? (
          <img
            src={currentPageUrl}
            className="w-full h-full object-cover filter grayscale contrast-125 hover:filter-none transition-all duration-500"
            alt={`Newspaper Page ${pageIndex + 1}`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400 font-serif italic p-8 text-center">
            No Paper
          </div>
        )}
        {totalPages > 1 && (
          <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
            <button
              onClick={prevPage}
              disabled={pageIndex === 0}
              className="bg-black/50 text-white p-3 rounded-full hover:bg-black/80 disabled:opacity-30 transition-opacity shadow-lg pointer-events-auto opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextPage}
              disabled={pageIndex === totalPages - 1}
              className="bg-black/50 text-white p-3 rounded-full hover:bg-black/80 disabled:opacity-30 transition-opacity shadow-lg pointer-events-auto opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
      <div className="mt-8 text-[#5c4d3c] font-serif text-sm italic flex items-center bg-[#e6d2a0] px-6 py-2 rounded-full shadow-lg border border-[#b8860b]">
        <span className="mr-4">当前纪年: {worldDate.year} DR</span>
        {totalPages > 0 && (
          <span className="mr-4 font-bold text-[#2b1d0e]">
            页码: {pageIndex + 1} / {totalPages}
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('dm');
          }}
          className="underline text-[#8b4513] hover:text-[#8b0000] font-bold"
        >
          [DM: 前往后台上传]
        </button>
      </div>
    </Parchment>
  );
};

// 3. ArchivesView (修复关闭按钮逻辑 + 增加删除功能)
const ArchivesView = ({ archives, setArchives, isDmMode, worldDate }) => {
  const [filter, setFilter] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [newTimelineEvent, setNewTimelineEvent] = useState('');
  const [newTimelineDate, setNewTimelineDate] = useState('');

  const openDetail = (student) => {
    setSelectedStudent(student);
    setEditForm(student);
    setIsEditing(false);
    setNewTimelineDate(`${worldDate.year}/${worldDate.month}/xx`);
    setNewTimelineEvent('');
  };
  const closeDetail = () => {
    setSelectedStudent(null);
    setEditForm(null);
    setIsEditing(false);
  };

  const saveEdit = () => {
    if (!editForm) return;
    const updatedStudents = archives.students.map((s) =>
      s.id === editForm.id ? editForm : s
    );
    setArchives({ ...archives, students: updatedStudents });
    setSelectedStudent(editForm);
    setIsEditing(false);
    alert('档案已更新。');
  };
  const addNewStudent = () => {
    const newStudent = {
      id: `S${Date.now()}`,
      name: '新学生',
      college: '未分配',
      year: '一年级',
      dorm: '未分配',
      race: '未知',
      class: '平民',
      level: 1,
      status: '健康',
      photoUrl: '',
      background: '...',
      timeline: [],
    };
    const updatedStudents = [...archives.students, newStudent];
    setArchives({ ...archives, students: updatedStudents });
    openDetail(newStudent);
    setIsEditing(true);
  };

  // 新增：删除学生
  const deleteStudent = () => {
    const updatedStudents = archives.students.filter(
      (s) => s.id !== selectedStudent.id
    );
    setArchives({ ...archives, students: updatedStudents });
    closeDetail();
  };

  const addTimelineEvent = () => {
    if (!newTimelineEvent) return;
    const newEvent = { date: newTimelineDate, event: newTimelineEvent };
    const updatedStudent = {
      ...selectedStudent,
      timeline: [...selectedStudent.timeline, newEvent],
    };
    const updatedStudents = archives.students.map((s) =>
      s.id === updatedStudent.id ? updatedStudent : s
    );
    setArchives({ ...archives, students: updatedStudents });
    setSelectedStudent(updatedStudent);
    setEditForm(updatedStudent);
    setNewTimelineEvent('');
  };

  return (
    <Parchment className="h-full p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-2 border-[#b8860b] pb-4">
          <div>
            <h2 className="text-4xl font-serif font-black text-[#2b1d0e] flex items-center">
              <Database className="mr-3 w-8 h-8" /> 斯翠海文年鉴
            </h2>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="检索姓名..."
                className="pl-10 pr-4 py-2 bg-[#fdfbf7] border-2 border-[#b8860b] rounded text-[#2b1d0e]"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-[#b8860b] w-4 h-4" />
            </div>
            {isDmMode && (
              <button
                onClick={addNewStudent}
                className="bg-[#8b4513] text-white px-4 py-2 rounded shadow font-bold flex items-center"
              >
                <Plus size={16} className="mr-1" /> 入学登记
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {archives.students
            .filter((s) => s.name.includes(filter))
            .map((student) => (
              <div
                key={student.id}
                onClick={() => openDetail(student)}
                className="bg-white p-3 shadow-md border border-[#e6d2a0] cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center text-center group"
              >
                <div className="w-full aspect-[3/4] bg-gray-200 mb-3 overflow-hidden border border-gray-100 relative">
                  {student.photoUrl ? (
                    <img
                      src={student.photoUrl}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      <User size={48} />
                    </div>
                  )}
                  {student.status === '发生意外' && (
                    <div className="absolute top-0 right-0 bg-black text-white p-1">
                      <Skull size={16} />
                    </div>
                  )}
                  {student.status === '已毕业' && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white p-1">
                      <GraduationCap size={16} />
                    </div>
                  )}
                  {student.status === '已退学' && (
                    <div className="absolute top-0 right-0 bg-gray-500 text-white p-1">
                      <DoorOpen size={16} />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    查看详细档案
                  </div>
                </div>
                <h3 className="text-lg font-bold font-serif text-[#2b1d0e] mb-1">
                  {student.name}
                </h3>
                <span className="text-xs text-[#8b4513] uppercase tracking-wider font-bold px-2 py-0.5 border border-[#e6d2a0] rounded-full">
                  {student.college}
                </span>
              </div>
            ))}
        </div>
      </div>
      {selectedStudent && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeDetail}
        >
          <div
            className="bg-[#fdfbf7] w-full max-w-4xl h-[85vh] rounded-lg shadow-2xl flex flex-col md:flex-row overflow-hidden border-4 border-[#2b1d0e]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-1/3 bg-[#e6d2a0]/30 p-6 border-r border-[#c4a484] flex flex-col items-center">
              <div className="w-48 h-64 bg-gray-300 shadow-inner border-8 border-white rotate-1 mb-6 overflow-hidden relative">
                {editForm.photoUrl ? (
                  <img
                    src={editForm.photoUrl}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <User size={64} />
                  </div>
                )}
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-2">
                    <input
                      type="text"
                      className="w-full text-xs p-1 rounded"
                      placeholder="输入图片URL..."
                      value={editForm.photoUrl}
                      onChange={(e) =>
                        setEditForm({ ...editForm, photoUrl: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>
              {isEditing ? (
                <div className="w-full space-y-2">
                  <input
                    className="w-full text-2xl font-black text-center bg-white/50 border-b border-black"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="text-xs p-1 bg-white/50"
                      value={editForm.race}
                      onChange={(e) =>
                        setEditForm({ ...editForm, race: e.target.value })
                      }
                      placeholder="种族"
                    />
                    <input
                      className="text-xs p-1 bg-white/50"
                      value={editForm.class}
                      onChange={(e) =>
                        setEditForm({ ...editForm, class: e.target.value })
                      }
                      placeholder="职业"
                    />
                    <input
                      className="text-xs p-1 bg-white/50"
                      value={editForm.college}
                      onChange={(e) =>
                        setEditForm({ ...editForm, college: e.target.value })
                      }
                      placeholder="学院"
                    />
                    <input
                      type="number"
                      className="text-xs p-1 bg-white/50"
                      value={editForm.level}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          level: parseInt(e.target.value),
                        })
                      }
                      placeholder="等级"
                    />
                    <input
                      className="text-xs p-1 bg-white/50"
                      value={editForm.year}
                      onChange={(e) =>
                        setEditForm({ ...editForm, year: e.target.value })
                      }
                      placeholder="年级"
                    />
                    <input
                      className="text-xs p-1 bg-white/50"
                      value={editForm.dorm}
                      onChange={(e) =>
                        setEditForm({ ...editForm, dorm: e.target.value })
                      }
                      placeholder="宿舍"
                    />
                  </div>
                  <div className="col-span-2 pt-2">
                    <label className="block text-[10px] text-[#8b4513] font-bold mb-1">
                      学籍状态
                    </label>
                    <select
                      className="w-full text-xs p-1 bg-white/50 border border-[#c4a484] rounded"
                      value={editForm.status}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                    >
                      <option value="健康">🟢 健康 (Active)</option>
                      <option value="轻伤">🟡 轻伤 (Injured)</option>
                      <option value="重伤">🔴 重伤 (Critical)</option>
                      <option value="已毕业">🎓 已毕业 (Graduated)</option>
                      <option value="已退学">🚪 已退学 (Dropped Out)</option>
                      <option value="发生意外">🪦 发生意外 (Deceased)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="text-center w-full">
                  <h2 className="text-3xl font-black font-serif text-[#2b1d0e] mb-2">
                    {selectedStudent.name}
                  </h2>
                  <div className="flex justify-center space-x-2 text-sm text-[#5c4d3c] font-bold mb-4">
                    <span>{selectedStudent.race}</span>
                    <span>•</span>
                    <span>
                      {selectedStudent.class} Lv.{selectedStudent.level}
                    </span>
                  </div>
                  <div className="inline-block px-4 py-1 bg-[#2b1d0e] text-[#f4e4bc] rounded-full text-sm font-bold shadow-md mb-2">
                    {selectedStudent.college}
                  </div>
                  <div className="w-full flex justify-between px-4 mt-2 text-xs font-bold text-[#8b4513] border-t border-[#c4a484]/50 pt-2">
                    <span className="flex items-center">
                      <GraduationCap size={12} className="mr-1" />{' '}
                      {selectedStudent.year || '未知年级'}
                    </span>
                    <span className="flex items-center">
                      <BedDouble size={12} className="mr-1" />{' '}
                      {selectedStudent.dorm || '走读'}
                    </span>
                  </div>
                  <div className="mt-4 text-xs font-mono text-[#8b4513]/60 w-full flex justify-between items-center border-t border-[#c4a484]/50 pt-2">
                    <span>ID: {selectedStudent.id}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-white font-bold shadow-sm ${
                        selectedStudent.status === '健康'
                          ? 'bg-green-600'
                          : selectedStudent.status === '轻伤'
                          ? 'bg-yellow-500'
                          : selectedStudent.status === '重伤'
                          ? 'bg-red-600'
                          : selectedStudent.status === '已毕业'
                          ? 'bg-blue-600'
                          : selectedStudent.status === '已退学'
                          ? 'bg-gray-500'
                          : 'bg-black'
                      }`}
                    >
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="md:w-2/3 p-8 overflow-y-auto custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold border-b-2 border-[#b8860b] pb-1 inline-block text-[#8b4513]">
                  档案记录
                </h3>
                {isDmMode &&
                  (isEditing ? (
                    <button
                      onClick={saveEdit}
                      className="px-3 py-1 bg-green-700 text-white rounded text-sm flex items-center"
                    >
                      <Save size={14} className="mr-1" /> 保存
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 border border-[#8b4513] text-[#8b4513] rounded text-sm flex items-center hover:bg-[#e6d2a0]"
                      >
                        <Edit3 size={14} className="mr-1" /> 编辑资料
                      </button>
                      <button
                        onClick={deleteStudent}
                        className="px-3 py-1 border border-[#8b0000] text-[#8b0000] rounded text-sm flex items-center hover:bg-[#8b0000] hover:text-white transition-colors"
                      >
                        <Trash2 size={14} className="mr-1" /> 删除档案
                      </button>
                    </div>
                  ))}
              </div>
              <div className="mb-8">
                <h4 className="text-sm font-bold text-[#5c4d3c] mb-2 uppercase flex items-center">
                  <Book size={14} className="mr-2" /> 背景故事
                </h4>
                {isEditing ? (
                  <textarea
                    className="w-full h-32 p-3 bg-white/50 border border-[#c4a484] rounded font-serif text-sm leading-relaxed"
                    value={editForm.background}
                    onChange={(e) =>
                      setEditForm({ ...editForm, background: e.target.value })
                    }
                  />
                ) : (
                  <p className="text-[#2b1d0e] font-serif leading-relaxed text-justify indent-8">
                    {selectedStudent.background}
                  </p>
                )}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#5c4d3c] mb-4 uppercase flex items-center">
                  <History size={14} className="mr-2" /> 履历时间轴
                </h4>
                <div className="border-l-2 border-[#b8860b] ml-2 space-y-6">
                  {selectedStudent.timeline.map((event, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-[#b8860b] rounded-full ring-4 ring-[#f4e4bc]"></div>
                      <div className="text-xs font-bold text-[#8b4513] mb-1">
                        {event.date}
                      </div>
                      <div className="text-sm text-[#2b1d0e] bg-white/40 p-2 rounded border border-[#e6d2a0] shadow-sm whitespace-pre-wrap">
                        {event.event}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {isDmMode && !isEditing && (
                <div className="mt-8 p-4 bg-[#fdfbf7] border border-dashed border-[#8b4513] rounded">
                  <div className="text-xs font-bold text-[#8b4513] mb-2">
                    [DM] 添加履历
                  </div>
                  <div className="flex gap-2 mb-2">
                    <input
                      className="w-1/3 text-xs p-1 border rounded"
                      placeholder="日期"
                      value={newTimelineDate}
                      onChange={(e) => setNewTimelineDate(e.target.value)}
                    />
                    <input
                      className="flex-1 text-xs p-1 border rounded"
                      placeholder="事件内容..."
                      value={newTimelineEvent}
                      onChange={(e) => setNewTimelineEvent(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={addTimelineEvent}
                    className="w-full text-xs bg-[#8b4513] text-white py-1 rounded hover:bg-[#a0522d]"
                  >
                    添加记录
                  </button>
                </div>
              )}
              <div className="mt-12 text-right">
                <button
                  onClick={closeDetail}
                  className="text-[#5c4d3c] hover:text-[#8b0000] underline text-sm"
                >
                  关闭档案 [ESC]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Parchment>
  );
};

// 4. LandmarksView (保持不变)
const LandmarksView = ({
  pins,
  setCurrentMapLayer,
  setMapStack,
  setActiveTab,
}) => {
  const landmarks = pins.filter((p) => p.type === 'landmark');
  const handleJumpToMap = (landmark) => {
    if (landmark.subMapId) {
      setMapStack([
        {
          id: landmark.map,
          name: landmark.map === 'academy' ? '学院区' : '大世界',
        },
      ]);
      setCurrentMapLayer(landmark.subMapId);
      setActiveTab('map');
    } else {
      setCurrentMapLayer(landmark.map);
      setActiveTab('map');
    }
  };
  return (
    <Parchment className="h-full p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-2 border-[#b8860b] pb-4">
          <div>
            <h2 className="text-4xl font-serif font-black text-[#2b1d0e] flex items-center">
              <Building className="mr-3 w-8 h-8" /> 学院地标指南
            </h2>
            <p className="text-[#8b4513] mt-2 italic font-serif">
              记录斯翠海文的永恒建筑...
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landmarks.map((landmark) => (
            <div
              key={landmark.id}
              className="bg-[#fdfbf7] p-5 shadow-[3px_3px_0_#b8860b] border border-[#b8860b] flex flex-col relative group"
            >
              {landmark.iconUrl && (
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full border border-[#b8860b] overflow-hidden shadow-sm bg-white">
                  <img
                    src={landmark.iconUrl}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex justify-between items-start mb-2 pr-6">
                <h3 className="text-lg font-bold font-serif text-[#2b1d0e]">
                  {landmark.title}
                </h3>
              </div>
              <span
                className={`self-start text-[10px] uppercase font-bold px-2 py-0.5 rounded mb-2 ${
                  landmark.status === 'closed'
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {landmark.status === 'closed' ? '歇业中' : 'OPEN'}
              </span>
              <p className="text-sm text-[#5c4d3c] mb-4 flex-1 line-clamp-3">
                {landmark.desc}
              </p>
              <div className="mt-auto flex justify-between items-center pt-3 border-t border-[#e6d2a0]">
                <span className="text-xs text-[#8b4513] flex items-center">
                  <MapPin size={12} className="mr-1" />{' '}
                  {landmark.map === 'academy' ? '学院区' : '大世界'}
                </span>
                {landmark.subMapId ? (
                  <button
                    onClick={() => handleJumpToMap(landmark)}
                    className="text-xs font-bold text-[#2b1d0e] hover:underline flex items-center"
                  >
                    进入内部 <DoorOpen size={12} className="ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleJumpToMap(landmark)}
                    className="text-xs font-bold text-[#5c4d3c] hover:underline"
                  >
                    在地图上查看
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Parchment>
  );
};

// 5. ReportSystem (保持不变)
const ReportSystem = ({
  reports,
  setReports,
  archives,
  setArchives,
  worldDate,
}) => {
  const [newReport, setNewReport] = useState({ pl: '', content: '' });
  const splitSentences = (text) => {
    const parts = text.split(/([。！？.!?\n])/);
    const sentences = [];
    for (let i = 0; i < parts.length; i += 2) {
      const content = parts[i].trim();
      const punctuation = parts[i + 1] || '';
      if (content) sentences.push(content + punctuation);
    }
    return sentences.map((s) => `• ${s}`).join('\n');
  };
  const smartExtract = (fullText, studentName, recorderName) => {
    if (recorderName.includes(studentName)) return splitSentences(fullText);
    const sentences = fullText.split(/[。！？.!?\n]/).filter((s) => s.trim());
    const relevantSentences = sentences.filter((s) => s.includes(studentName));
    if (relevantSentences.length > 0)
      return `[侧写] ${relevantSentences.join(
        '。'
      )}。(记录者: ${recorderName})`;
    return `[同行] 与 ${recorderName} 共同参与了行动。`;
  };
  const handleSubmit = () => {
    if (!newReport.pl || !newReport.content) {
      alert('请填写记录员姓名和战报内容。');
      return;
    }
    const dateStr = `${worldDate.year}/${worldDate.month}`;
    const reportEntry = {
      id: Date.now(),
      pl: newReport.pl,
      content: newReport.content,
      date: dateStr,
      tags: [],
    };
    let identifiedStudents = [];
    const updatedStudents = archives.students.map((student) => {
      const firstName = student.name.split(/[· ]/)[0];
      const isContentMatch =
        newReport.content.includes(student.name) ||
        (firstName.length > 1 && newReport.content.includes(firstName));
      const isRecorderMatch =
        newReport.pl.includes(student.name) ||
        (firstName.length > 1 && newReport.pl.includes(firstName)) ||
        student.name.includes(newReport.pl);
      if (isContentMatch || isRecorderMatch) {
        identifiedStudents.push(student.name);
        const personalizedEvent = smartExtract(
          newReport.content,
          firstName,
          newReport.pl
        );
        return {
          ...student,
          timeline: [
            ...student.timeline,
            { date: dateStr, event: personalizedEvent },
          ],
        };
      }
      return student;
    });
    reportEntry.tags = identifiedStudents;
    setReports([reportEntry, ...reports]);
    if (identifiedStudents.length > 0) {
      setArchives({ ...archives, students: updatedStudents });
      alert(
        `✅ 战报已提交！\n🤖 档案馆精灵：已为 [${identifiedStudents.join(
          ', '
        )}] 生成个性化记录。`
      );
    } else {
      alert('✅ 战报已提交！(未自动匹配到档案库中的学生)');
    }
    setNewReport({ pl: '', content: '' });
  };
  return (
    <Parchment className="h-full flex flex-col p-6">
      <div className="flex justify-between items-end mb-6 border-b-2 border-[#b8860b] pb-4">
        <div>
          <h2 className="text-3xl font-serif font-black text-[#2b1d0e] flex items-center">
            <FileText className="mr-3 w-8 h-8" /> 战地记者终端
          </h2>
          <p className="text-[#8b4513] mt-2 italic font-serif">
            记录历史，或者创造历史...
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 h-full overflow-hidden">
        <div className="lg:w-1/3 flex flex-col gap-4 bg-[#fdfbf7]/50 p-4 rounded border border-[#b8860b]">
          <div className="flex items-center text-[#8b4513] font-bold text-sm mb-2">
            <Edit3 size={16} className="mr-2" /> 新撰写战报
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-[#5c4d3c] mb-1">
              记录员 / 角色名 (PC Name)
            </label>
            <input
              type="text"
              className="w-full bg-[#fdfbf7] border border-[#c4a484] p-2 text-sm font-serif text-[#2b1d0e] placeholder-gray-400"
              placeholder="例如: 奥利奥"
              value={newReport.pl}
              onChange={(e) =>
                setNewReport({ ...newReport, pl: e.target.value })
              }
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="block text-xs font-bold uppercase text-[#5c4d3c] mb-1">
              战况详述
            </label>
            <textarea
              className="w-full flex-1 bg-[#fdfbf7] border border-[#c4a484] p-2 text-sm font-serif text-[#2b1d0e] resize-none placeholder-gray-400"
              placeholder="请详细描述发生了什么..."
              value={newReport.content}
              onChange={(e) =>
                setNewReport({ ...newReport, content: e.target.value })
              }
            ></textarea>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#2b1d0e] text-[#f4e4bc] py-3 font-bold rounded shadow-lg hover:bg-[#3d2b1f] flex items-center justify-center transition-all"
          >
            <Send size={16} className="mr-2" /> 提交并在水晶球广播
          </button>
          <p className="text-[10px] text-[#5c4d3c] text-center flex items-center justify-center">
            <Bot size={12} className="mr-1" /> 自动智能润色已激活
          </p>
        </div>
        <div className="lg:w-2/3 overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white p-5 shadow-sm border border-[#e6d2a0] relative group hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#2b1d0e] text-[#f4e4bc] flex items-center justify-center font-bold mr-3">
                      {report.pl[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#2b1d0e]">
                        {report.pl}
                      </div>
                      <div className="text-xs text-[#8b4513]">
                        {report.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    #{report.id}
                  </div>
                </div>
                <p className="text-[#5c4d3c] text-sm leading-relaxed whitespace-pre-wrap font-serif">
                  {report.content}
                </p>
                {report.tags && report.tags.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-dashed border-gray-200 flex flex-wrap gap-2">
                    {report.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-[#e6d2a0]/50 text-[#8b4513] px-2 py-0.5 rounded-full font-bold flex items-center border border-[#b8860b]/30"
                      >
                        <LinkIcon size={8} className="mr-1" /> {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Parchment>
  );
};

// 6. CurriculumView (保持不变)
const CurriculumView = ({ courses, setCourses, isDmMode }) => {
  const [selectedYear, setSelectedYear] = useState(1);
  const [editingCourse, setEditingCourse] = useState(null);

  const filteredCourses = courses.filter((c) => c.year === selectedYear);
  const handleGradingChange = (index, field, value) => {
    const newGrading = [...editingCourse.grading];
    newGrading[index] = { ...newGrading[index], [field]: value };
    setEditingCourse({ ...editingCourse, grading: newGrading });
  };
  const addGradingItem = () => {
    setEditingCourse({
      ...editingCourse,
      grading: [
        ...(editingCourse.grading || []),
        { type: '', weight: '', desc: '' },
      ],
    });
  };
  const removeGradingItem = (index) => {
    const newGrading = editingCourse.grading.filter((_, i) => i !== index);
    setEditingCourse({ ...editingCourse, grading: newGrading });
  };
  const handleSaveCourse = (e) => {
    e.preventDefault();
    const newCourses = courses.map((c) =>
      c.id === editingCourse.id ? editingCourse : c
    );
    if (!courses.find((c) => c.id === editingCourse.id))
      newCourses.push({ ...editingCourse, id: Date.now() });
    setCourses(newCourses);
    setEditingCourse(null);
  };
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <Parchment className="h-full p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-end mb-8 border-b-2 border-[#b8860b] pb-4">
          <div>
            <h2 className="text-4xl font-serif font-black text-[#2b1d0e] flex items-center">
              <BookOpen className="mr-3 w-8 h-8" /> 斯翠海文教学大纲
            </h2>
            <p className="text-[#8b4513] mt-2 italic font-serif">
              知识就是力量，但别忘了交作业。
            </p>
          </div>
          {isDmMode && (
            <button
              onClick={() =>
                setEditingCourse({
                  id: Date.now(),
                  year: selectedYear,
                  name: '新课程',
                  professors: '',
                  overview: '',
                  grading: [],
                  mechanics: '',
                })
              }
              className="bg-[#8b4513] text-white px-4 py-2 rounded shadow font-bold flex items-center"
            >
              <PlusCircle size={16} className="mr-1" /> 添加课程
            </button>
          )}
        </div>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-6 py-2 font-bold rounded-t-lg transition-colors border-t-2 border-x-2 ${
                selectedYear === year
                  ? 'bg-[#2b1d0e] text-[#f4e4bc] border-[#2b1d0e]'
                  : 'bg-[#e6d2a0] text-[#5c4d3c] border-transparent hover:bg-[#d4c090]'
              }`}
            >
              {year} 年级
            </button>
          ))}
        </div>
        <div className="space-y-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 shadow-md border-l-4 border-[#2b1d0e] relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-black font-serif text-[#2b1d0e]">
                    {course.name}
                  </h3>
                  <p className="text-sm font-bold text-[#8b4513] flex items-center mt-1">
                    <User size={14} className="mr-1" /> 导师:{' '}
                    {course.professors}
                  </p>
                </div>
                <div className="text-xs bg-[#f4e4bc] px-3 py-1 rounded font-mono text-[#5c4d3c]">
                  ID: {course.id}
                </div>
              </div>
              <p className="text-[#5c4d3c] mb-6 italic">{course.overview}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#fdfbf7] p-4 border border-dashed border-[#c4a484] rounded">
                  <h4 className="text-xs font-black uppercase text-[#8b4513] mb-2 flex items-center">
                    <Calculator size={12} className="mr-1" /> 考核标准
                  </h4>
                  <ul className="space-y-2">
                    {course.grading &&
                      course.grading.map((g, i) => (
                        <li
                          key={i}
                          className="text-sm flex justify-between border-b border-gray-100 pb-1"
                        >
                          <span className="font-bold text-[#2b1d0e]">
                            {g.type}
                          </span>
                          <span className="text-[#8b0000]">{g.weight}</span>
                        </li>
                      ))}
                  </ul>
                  <div className="mt-3 text-xs text-[#5c4d3c]">
                    {course.grading &&
                      course.grading.map((g) => g.desc).join(' ')}
                  </div>
                </div>
                <div className="bg-[#fdfbf7] p-4 border border-dashed border-[#c4a484] rounded flex flex-col justify-center">
                  <h4 className="text-xs font-black uppercase text-[#8b4513] mb-2 flex items-center">
                    <Crown size={12} className="mr-1" /> 检定规则
                  </h4>
                  <p className="text-sm font-bold text-[#2b1d0e] bg-[#e6d2a0]/30 p-2 rounded">
                    {course.mechanics}
                  </p>
                </div>
              </div>
              {isDmMode && (
                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingCourse(course)}
                    className="p-1 bg-white border border-[#8b4513] rounded text-[#8b4513] hover:bg-[#e6d2a0]"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-1 bg-white border border-[#8b0000] rounded text-[#8b0000] hover:bg-red-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          ))}
          {filteredCourses.length === 0 && (
            <div className="text-center text-gray-400 py-10 italic">
              本年级暂无课程安排。
            </div>
          )}
        </div>
      </div>

      {editingCourse && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingCourse(null)}
        >
          <div
            className={`${THEME.paper} p-6 rounded-lg border-4 ${THEME.gold} w-[500px] shadow-2xl overflow-y-auto max-h-[90vh]`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-[#2b1d0e] flex items-center">
              <Edit3 className="mr-2" /> 编辑课程
            </h3>
            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#8b4513] mb-1">
                    课程名称
                  </label>
                  <input
                    required
                    className="w-full p-2 text-sm border rounded"
                    value={editingCourse.name}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#8b4513] mb-1">
                    导师
                  </label>
                  <input
                    className="w-full p-2 text-sm border rounded"
                    value={editingCourse.professors}
                    onChange={(e) =>
                      setEditingCourse({
                        ...editingCourse,
                        professors: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#8b4513] mb-1">
                  简介
                </label>
                <textarea
                  className="w-full p-2 text-sm border rounded h-16"
                  value={editingCourse.overview}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      overview: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#8b4513] mb-1">
                  检定规则
                </label>
                <textarea
                  className="w-full p-2 text-sm border rounded h-16"
                  value={editingCourse.mechanics}
                  onChange={(e) =>
                    setEditingCourse({
                      ...editingCourse,
                      mechanics: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div className="bg-[#fdfbf7] border border-[#c4a484] p-3 rounded">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase text-[#8b4513]">
                    考核标准 (Grading)
                  </label>
                  <button
                    type="button"
                    onClick={addGradingItem}
                    className="text-green-600 hover:text-green-800"
                  >
                    <PlusCircle size={16} />
                  </button>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                  {(editingCourse.grading || []).map((g, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1 p-2 bg-black/5 rounded relative group"
                    >
                      <div className="flex gap-1">
                        <input
                          className="w-1/3 p-1 text-xs border rounded"
                          placeholder="类型 (如: 论文)"
                          value={g.type}
                          onChange={(e) =>
                            handleGradingChange(i, 'type', e.target.value)
                          }
                        />
                        <input
                          className="w-1/4 p-1 text-xs border rounded"
                          placeholder="权重 (如: 50%)"
                          value={g.weight}
                          onChange={(e) =>
                            handleGradingChange(i, 'weight', e.target.value)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeGradingItem(i)}
                          className="ml-auto text-red-500 hover:text-red-700"
                        >
                          <MinusCircle size={14} />
                        </button>
                      </div>
                      <input
                        className="w-full p-1 text-xs border rounded"
                        placeholder="描述..."
                        value={g.desc}
                        onChange={(e) =>
                          handleGradingChange(i, 'desc', e.target.value)
                        }
                      />
                    </div>
                  ))}
                  {(editingCourse.grading || []).length === 0 && (
                    <div className="text-xs text-gray-400 text-center py-2">
                      暂无考核标准
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 text-xs border border-[#8b4513] rounded"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs bg-[#8b4513] text-white rounded font-bold"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Parchment>
  );
};

// 7. CalendarScheduleView (保持不变)
const CalendarScheduleView = ({
  schedule,
  setSchedule,
  isDmMode,
  worldDate,
}) => {
  const [viewDate, setViewDate] = useState({
    year: worldDate.year,
    month: worldDate.month,
  });
  const [selectedDay, setSelectedDay] = useState(null);
  const daysInMonth = 30;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const currentEvents = schedule.filter((ev) => {
    const [y, m] = ev.date.split('-').map(Number);
    return y === viewDate.year && m === viewDate.month;
  });
  const getEventsForDay = (day) =>
    currentEvents.filter((ev) => parseInt(ev.date.split('-')[2]) === day);
  const handleDayClick = (day) => {
    if (!isDmMode) return;
    setSelectedDay(day);
  };
  const handleAddEvent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEvent = {
      id: Date.now(),
      date: `${viewDate.year}-${String(viewDate.month).padStart(
        2,
        '0'
      )}-${String(selectedDay).padStart(2, '0')}`,
      type: formData.get('type'),
      title: formData.get('title'),
      desc: formData.get('desc'),
      courseId: formData.get('courseId'),
    };
    setSchedule([...schedule, newEvent]);
    setSelectedDay(null);
  };
  const handleDeleteEvent = (id) => {
    if (window.confirm('确定删除此日程？'))
      setSchedule(schedule.filter((s) => s.id !== id));
  };

  return (
    <Parchment className="h-full p-6 overflow-y-auto flex flex-col">
      <div className="flex justify-between items-end mb-6 border-b-2 border-[#b8860b] pb-4">
        <div>
          <h2 className="text-4xl font-serif font-black text-[#2b1d0e] flex items-center">
            <CalendarDays className="mr-3 w-8 h-8" /> 学院行事历
          </h2>
          <p className="text-[#8b4513] mt-2 italic font-serif">
            合理安排时间，否则退学警告。
          </p>
        </div>
        <div className="flex items-center space-x-4 bg-white/50 px-4 py-2 rounded-lg border border-[#c4a484]">
          <button
            onClick={() =>
              setViewDate((prev) =>
                prev.month > 1 ? { ...prev, month: prev.month - 1 } : prev
              )
            }
            className="p-1 hover:bg-[#e6d2a0] rounded"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-xl font-black font-serif text-[#2b1d0e] w-32 text-center">
            {viewDate.year} DR - {viewDate.month}月
          </span>
          <button
            onClick={() =>
              setViewDate((prev) =>
                prev.month < 12 ? { ...prev, month: prev.month + 1 } : prev
              )
            }
            className="p-1 hover:bg-[#e6d2a0] rounded"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 flex-1 auto-rows-fr">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-bold text-[#8b4513] uppercase tracking-widest py-2 bg-[#e6d2a0]/50 rounded"
          >
            {d}
          </div>
        ))}
        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`min-h-[100px] border border-[#c4a484] rounded p-2 flex flex-col transition-colors relative group ${
                day === worldDate.day && viewDate.month === worldDate.month
                  ? 'bg-[#fff] ring-2 ring-[#b8860b]'
                  : 'bg-[#fdfbf7] hover:bg-white'
              } ${isDmMode ? 'cursor-pointer hover:shadow-md' : ''}`}
            >
              <div className="text-right text-xs font-bold text-[#8b4513]/50 mb-1">
                {day}
              </div>
              <div className="space-y-1 overflow-y-auto custom-scrollbar flex-1">
                {dayEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className={`text-[10px] p-1.5 rounded border-l-4 shadow-sm group/event relative ${
                      ev.type === 'class'
                        ? 'bg-green-100 border-green-600 text-green-900'
                        : ev.type === 'due'
                        ? 'bg-yellow-100 border-yellow-600 text-yellow-900'
                        : ev.type === 'exam'
                        ? 'bg-red-100 border-red-600 text-red-900'
                        : 'bg-blue-100 border-blue-600 text-blue-900'
                    }`}
                  >
                    <div className="font-bold truncate">{ev.title}</div>
                    {isDmMode && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(ev.id);
                        }}
                        className="absolute right-1 top-1 text-red-500 opacity-0 group-hover/event:opacity-100 hover:bg-red-200 rounded"
                      >
                        <X size={10} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isDmMode && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                  <Plus size={24} className="text-[#8b4513]/30" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {selectedDay && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedDay(null)}
        >
          <div
            className={`${THEME.paper} p-6 rounded-lg border-4 ${THEME.gold} w-96 shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4 text-[#2b1d0e] flex items-center">
              <CalendarIcon className="mr-2" /> 安排日程 ({viewDate.month}月
              {selectedDay}日)
            </h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#8b4513] mb-1">
                  事件类型
                </label>
                <select
                  name="type"
                  className="w-full bg-white border border-[#c4a484] p-2 text-sm rounded"
                >
                  <option value="class">🟢 课程 (Class)</option>
                  <option value="due">🟡 作业截止 (Assignment)</option>
                  <option value="exam">🔴 考试/考核 (Exam)</option>
                  <option value="event">🔵 校园活动 (Event)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#8b4513] mb-1">
                  标题
                </label>
                <input
                  name="title"
                  required
                  className="w-full bg-white border border-[#c4a484] p-2 text-sm rounded"
                  placeholder="例如：魔药学第一课"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[#8b4513] mb-1">
                  详情/备注
                </label>
                <textarea
                  name="desc"
                  className="w-full bg-white border border-[#c4a484] p-2 text-sm rounded h-20 resize-none"
                  placeholder="备注..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedDay(null)}
                  className="px-4 py-2 text-xs border border-[#8b4513] text-[#8b4513] rounded hover:bg-[#e6d2a0]"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs bg-[#8b4513] text-white rounded font-bold hover:bg-[#5c3a2a]"
                >
                  确认添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Parchment>
  );
};

// 8. DmDashboard (保持不变)
const DmDashboard = ({
  worldDate,
  advanceTime,
  pins,
  archives,
  currentMapLayer,
  assets,
  setAssets,
  worldLog,
  setWorldLog,
}) => {
  // ... logic unchanged ...
  const [tempAssets, setTempAssets] = useState({
    newspaperUrls: assets.newspaper.join('\n'),
    academyMap: assets.academyMap,
    arcaviosMap: assets.arcaviosMap,
  });
  const [newLog, setNewLog] = useState({ type: 'environment', text: '' });

  useEffect(() => {
    setTempAssets({
      newspaperUrls: assets.newspaper.join('\n'),
      academyMap: assets.academyMap,
      arcaviosMap: assets.arcaviosMap,
    });
  }, [assets]);

  const handleAddLog = () => {
    if (!newLog.text) return;
    setWorldLog((prev) => [
      ...prev,
      {
        id: Date.now(),
        month: worldDate.month,
        type: newLog.type,
        text: newLog.text,
      },
    ]);
    setNewLog({ ...newLog, text: '' });
    alert('世界日志已更新，所有玩家现在都能看到这条消息。');
  };

  const handleUpdateAssets = () => {
    const newNewspaperArray = tempAssets.newspaperUrls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0);
    setAssets({
      newspaper: newNewspaperArray,
      academyMap: tempAssets.academyMap,
      arcaviosMap: tempAssets.arcaviosMap,
    });
    alert('投影已重塑：地图和多页校报链接已更新！');
  };

  return (
    <div className="h-full bg-[#1a1510] text-[#a8a29e] p-8 overflow-y-auto font-serif">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#d6c290] mb-8 flex items-center border-b border-[#443c36] pb-4">
          <Crown className="mr-3" /> 世界主宰控制台 (Dungeon Master)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#241f19] p-6 rounded border border-[#443c36] col-span-2">
            <h3 className="text-[#d6c290] font-bold mb-4 flex items-center">
              <Clock className="mr-2" /> 时间之轮
            </h3>
            <div className="flex items-center justify-between bg-black/30 p-4 rounded mb-4">
              <div className="text-4xl font-black text-[#f4e4bc]">
                {worldDate.year} DR
              </div>
              <div className="text-xl text-[#d6c290]">
                {worldDate.month}月 {worldDate.day}日
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => advanceTime(1)}
                className="px-3 py-1 bg-[#443c36] hover:bg-[#5c524b] text-[#d6c290] rounded"
              >
                +1 天
              </button>
              <button
                onClick={() => advanceTime(7)}
                className="px-3 py-1 bg-[#443c36] hover:bg-[#5c524b] text-[#d6c290] rounded"
              >
                +1 周
              </button>
              <button
                onClick={() => advanceTime(30)}
                className="px-3 py-1 bg-[#443c36] hover:bg-[#5c524b] text-[#d6c290] rounded"
              >
                +1 月
              </button>
            </div>
            <p className="text-xs text-[#5c524b] mt-2">
              *
              推进时间不会删除旧的任务，但会更新“当前时间”，允许你在新月份发布新任务。
            </p>
          </div>
          {/* ... rest of DM dashboard ... */}
          <div className="bg-[#241f19] p-6 rounded border border-[#443c36] row-span-2">
            <h3 className="text-[#d6c290] font-bold mb-4">
              发布世界动态 ({worldDate.month}月)
            </h3>
            <div className="space-y-4">
              <select
                className="w-full bg-black/30 border border-[#443c36] p-2 text-xs text-[#d6c290]"
                value={newLog.type}
                onChange={(e) => setNewLog({ ...newLog, type: e.target.value })}
              >
                <option value="environment">🌍 环境变化</option>
                <option value="npc">🧙‍♂️ NPC 动向</option>
                <option value="rumor">💬 传闻八卦</option>
              </select>
              <textarea
                className="w-full h-32 bg-black/30 border border-[#443c36] p-2 text-xs text-[#d6c290]"
                placeholder="例：湿地水位上涨，或是某位教授被目击离开了学院..."
                value={newLog.text}
                onChange={(e) => setNewLog({ ...newLog, text: e.target.value })}
              ></textarea>
              <button
                onClick={handleAddLog}
                className="w-full bg-[#8b4513] hover:bg-[#a0522d] text-[#f4e4bc] py-2 rounded font-bold"
              >
                发布广播
              </button>
            </div>
          </div>
          <div className="bg-[#241f19] p-6 rounded border border-[#443c36] col-span-2">
            <h3 className="text-[#d6c290] font-bold mb-4 flex items-center">
              <ImageIcon className="mr-2" /> 位面投影 (图片资源)
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs uppercase mb-1">
                  校报链接 (每行一个 URL，支持多页)
                </label>
                <textarea
                  className="w-full h-24 bg-black/30 border border-[#443c36] p-2 text-xs text-[#d6c290] resize-none"
                  value={tempAssets.newspaperUrls}
                  onChange={(e) =>
                    setTempAssets({
                      ...tempAssets,
                      newspaperUrls: e.target.value,
                    })
                  }
                  placeholder="第一页 URL\n第二页 URL\n第三页 URL"
                />
              </div>
              <div>
                <label className="block text-xs uppercase mb-1">
                  学院地图链接
                </label>
                <input
                  type="text"
                  className="w-full bg-black/30 border border-[#443c36] p-2 text-xs text-[#d6c290]"
                  value={tempAssets.academyMap}
                  onChange={(e) =>
                    setTempAssets({ ...tempAssets, academyMap: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs uppercase mb-1">
                  大世界地图链接
                </label>
                <input
                  type="text"
                  className="w-full bg-black/30 border border-[#443c36] p-2 text-xs text-[#d6c290]"
                  value={tempAssets.arcaviosMap}
                  onChange={(e) =>
                    setTempAssets({
                      ...tempAssets,
                      arcaviosMap: e.target.value,
                    })
                  }
                />
              </div>
              <button
                onClick={handleUpdateAssets}
                className="col-span-1 bg-[#443c36] hover:bg-[#5c524b] text-[#d6c290] py-2 rounded font-bold flex justify-center items-center"
              >
                <Upload className="w-4 h-4 mr-2" /> 执行物质交换 (更新所有链接)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- App Component ---
const App = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [pins, setPins] = useState(initialPins);
  const [assets, setAssets] = useState(initialAssets);
  const [archives, setArchives] = useState(initialArchives);
  const [schedule, setSchedule] = useState(initialSchedule);
  const [courses, setCourses] = useState(initialCoursesData); // Lifted courses state
  const [worldLog, setWorldLog] = useState(initialWorldLog);
  const [reports, setReports] = useState(initialReports || []);
  const [worldDate, setWorldDate] = useState({
    year: 4569,
    month: 10,
    day: 15,
  });
  const [currentMapLayer, setCurrentMapLayer] = useState('academy');
  const [mapStack, setMapStack] = useState([]);

  const [isDmMode, setIsDmMode] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [editingPin, setEditingPin] = useState(null);

  const advanceTime = (days) => {
    let d = worldDate.day + days;
    let m = worldDate.month;
    let y = worldDate.year;
    while (d > 30) {
      d -= 30;
      m++;
    }
    while (m > 12) {
      m -= 12;
      y++;
    }

    const newPins = pins.map((pin) => {
      if (
        pin.type !== 'landmark' &&
        pin.status === 'active' &&
        pin.expiryMonth &&
        m >= pin.expiryMonth
      ) {
        const narrative = generateNarrative('expired', pin);
        setWorldLog((prev) => [
          ...prev,
          { id: Date.now(), month: m, type: 'environment', text: narrative },
        ]);
        return { ...pin, status: 'expired' };
      }
      return pin;
    });
    setPins(newPins);
    setWorldDate({ year: y, month: m, day: d });
  };

  const savePin = () => {
    setPins((prev) => {
      const existingIndex = prev.findIndex((p) => p.id === editingPin.id);
      if (existingIndex >= 0) {
        const newPins = [...prev];
        newPins[existingIndex] = editingPin;
        return newPins;
      }
      return [...prev, editingPin];
    });
    setEditingPin(null);
  };

  const deletePin = (id) => {
    setPins((prev) => prev.filter((p) => p.id !== id));
    setEditingPin(null);
  };
  const updatePinStatus = (id, s, n) => {
    if (n)
      setWorldLog((p) => [
        ...p,
        {
          id: Date.now(),
          month: worldDate.month,
          type: s === 'completed' ? 'npc' : 'environment',
          text: n,
        },
      ]);
    setPins((p) => p.map((pi) => (pi.id === id ? { ...pi, status: s } : pi)));
  };

  return (
    <div className="flex h-screen bg-[#1a1510] overflow-hidden">
      <div className="w-20 bg-[#2b1d0e] border-r border-[#443c36] flex flex-col items-center py-6 z-50 shadow-2xl">
        <div className="w-12 h-12 bg-[#8b0000] rounded-lg mb-8 flex items-center justify-center text-[#f4e4bc] font-serif font-black text-2xl border-2 border-[#b8860b] shadow-[0_0_15px_rgba(184,134,11,0.5)]">
          S
        </div>
        <div className="space-y-4 flex flex-col w-full px-2">
          {[
            { id: 'newspaper', icon: Scroll, label: '校报' },
            { id: 'map', icon: MapIcon, label: '地图' },
            { id: 'calendar', icon: CalendarIcon, label: '日历' },
            { id: 'curriculum', icon: BookOpen, label: '课表' },
            { id: 'archives', icon: Database, label: '档案' },
            { id: 'reports', icon: FileText, label: '战报' },
            { id: 'landmarks', icon: Building, label: '地标' },
            { id: 'dm', icon: Crown, label: 'DM' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-[#f4e4bc] text-[#2b1d0e] shadow-[inset_0_2px_5px_rgba(0,0,0,0.2)]'
                  : 'text-[#8b7355] hover:bg-[#443c36] hover:text-[#d6c290]'
              }`}
            >
              <tab.icon size={24} />
              <span className="absolute left-full ml-4 bg-[#f4e4bc] text-[#2b1d0e] text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap shadow-lg border border-[#b8860b] z-50">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
        <div className="mt-auto text-[#5c4d3c] flex flex-col items-center space-y-4">
          <div className="w-px h-12 bg-[#443c36]"></div>
          <Clock size={16} className="text-[#8b7355]" />
        </div>
      </div>

      <div className="flex-1 relative">
        {activeTab === 'map' && (
          <ImmersiveMap
            pins={pins}
            setPins={setPins}
            assets={assets}
            currentMapLayer={currentMapLayer}
            setCurrentMapLayer={setCurrentMapLayer}
            isDmMode={isDmMode}
            setIsDmMode={setIsDmMode}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
            worldDate={worldDate}
            editingPin={editingPin}
            setEditingPin={setEditingPin}
            onSavePin={savePin}
            onDeletePin={deletePin}
            onUpdatePinStatus={updatePinStatus}
            worldLog={worldLog}
            mapStack={mapStack}
            setMapStack={setMapStack}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'calendar' && (
          <CalendarScheduleView
            schedule={schedule}
            setSchedule={setSchedule}
            isDmMode={isDmMode}
            worldDate={worldDate}
          />
        )}
        {activeTab === 'curriculum' && (
          <CurriculumView
            courses={courses}
            setCourses={setCourses}
            isDmMode={isDmMode}
          />
        )}
        {activeTab === 'newspaper' && (
          <NewspaperView
            assets={assets}
            worldDate={worldDate}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'archives' && (
          <ArchivesView
            archives={archives}
            setArchives={setArchives}
            isDmMode={isDmMode}
            worldDate={worldDate}
          />
        )}
        {activeTab === 'reports' && (
          <ReportSystem
            reports={reports}
            setReports={setReports}
            archives={archives}
            setArchives={setArchives}
            worldDate={worldDate}
          />
        )}
        {activeTab === 'landmarks' && (
          <LandmarksView
            pins={pins}
            setCurrentMapLayer={setCurrentMapLayer}
            setMapStack={setMapStack}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'dm' && (
          <DmDashboard
            worldDate={worldDate}
            advanceTime={advanceTime}
            pins={pins}
            archives={archives}
            currentMapLayer={currentMapLayer}
            assets={assets}
            setAssets={setAssets}
            worldLog={worldLog}
            setWorldLog={setWorldLog}
          />
        )}
      </div>
    </div>
  );
};
export default App;
