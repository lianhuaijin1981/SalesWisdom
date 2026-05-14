import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network, Layers, Grid3X3, Route, ZoomIn, ZoomOut, Maximize,
  Shield, Briefcase, Heart, Star, Flag, Users, AlertTriangle, Brain,
  ChevronDown, ChevronUp, Sparkles, X,
} from 'lucide-react';
import Layout from '@/components/Layout';
import {
  personNodes, edges, layerConfigs, stanceColors, stanceLabels,
  edgeTypeConfig, type PersonNode, type LayerType,
  influenceMatrix, attackPath,
} from '@/data/decisionChainMockData';

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const layerColorMap: Record<LayerType, string> = {
  top: '#1E40AF',
  direct: '#3B82F6',
  review: '#38BDF8',
  frontline: '#94A3B8',
  peripheral: '#CBD5E1',
};

const layerBgMap: Record<LayerType, string> = {
  top: '#EFF6FF',
  direct: '#EFF6FF',
  review: '#F0F9FF',
  frontline: '#F8FAFC',
  peripheral: '#F8FAFC',
};

const iconMap: Record<string, React.ElementType> = {
  Network, Layers, Grid3X3, Route,
  Shield, Briefcase, Heart, Star, Flag, Users, AlertTriangle, Brain,
};

// ============ SVG Graph Component ============
function NetworkGraph({
  selectedNode,
  onSelectNode,
  visibleLayers,
}: {
  selectedNode: string | null;
  onSelectNode: (id: string | null) => void;
  visibleLayers: Set<LayerType>;
}) {
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  const width = 800;
  const height = 640;

  // Calculate node positions based on layers
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const nodesByLayer: Record<LayerType, PersonNode[]> = {
      top: [], direct: [], review: [], frontline: [], peripheral: [],
    };
    personNodes.forEach((n) => {
      if (visibleLayers.has(n.layer)) nodesByLayer[n.layer].push(n);
    });

    Object.entries(nodesByLayer).forEach(([layer, nodes]) => {
      const cfg = layerConfigs.find((l) => l.key === layer);
      const y = cfg ? cfg.yPosition : 300;
      const spacing = width / (nodes.length + 1);
      nodes.forEach((node, i) => {
        // Add some offset for visual variety
        const offsetX = nodes.length <= 2 ? 0 : (i % 2 === 0 ? -20 : 20);
        positions[node.id] = {
          x: spacing * (i + 1) + offsetX,
          y: y + (Math.random() * 20 - 10), // Slight randomization for organic feel
        };
      });
    });

    // Fix positions for consistent layout
    const fixedPositions: Record<string, { x: number; y: number }> = {
      p1: { x: 400, y: 80 },
      p2: { x: 250, y: 200 },
      p3: { x: 550, y: 200 },
      p4: { x: 200, y: 320 },
      p5: { x: 400, y: 310 },
      p8: { x: 600, y: 330 },
      p6: { x: 180, y: 440 },
      p7: { x: 380, y: 460 },
      p11: { x: 520, y: 440 },
      p9: { x: 700, y: 440 },
      p10: { x: 300, y: 560 },
      p12: { x: 550, y: 560 },
    };

    Object.keys(fixedPositions).forEach((k) => {
      if (positions[k]) positions[k] = fixedPositions[k];
    });

    return positions;
  }, [visibleLayers]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
  };

  const handleMouseUp = () => setIsPanning(false);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 0.5));
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const hoveredNodeData = personNodes.find((n) => n.id === hoveredNode);
  const connectedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return edges.filter(
      (e) => e.source === selectedNode || e.target === selectedNode
    );
  }, [selectedNode]);

  return (
    <div className="relative bg-white rounded-xl border border-[#E2E8F0] overflow-hidden"
      style={{ height: 640 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* SVG Graph */}
      <svg
        width="100%"
        height="100%"
        viewBox={`${-pan.x / zoom} ${-pan.y / zoom} ${width / zoom} ${height / zoom}`}
        className="relative z-10"
        style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        <defs>
          {Object.entries(edgeTypeConfig).map(([type, cfg]) => (
            <marker
              key={type}
              id={`arrow-${type}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={cfg.stroke} />
            </marker>
          ))}
        </defs>

        {/* Edges */}
        {edges.map((edge) => {
          const src = nodePositions[edge.source];
          const tgt = nodePositions[edge.target];
          if (!src || !tgt) return null;
          const cfg = edgeTypeConfig[edge.type];
          const isHighlighted = selectedNode &&
            (edge.source === selectedNode || edge.target === selectedNode);

          return (
            <line
              key={edge.id}
              x1={src.x}
              y1={src.y}
              x2={tgt.x}
              y2={tgt.y}
              stroke={cfg.stroke}
              strokeWidth={isHighlighted ? 3 : 1.5}
              strokeDasharray={cfg.strokeDasharray || undefined}
              opacity={selectedNode ? (isHighlighted ? 1 : 0.15) : 0.6}
              markerEnd={`url(#arrow-${edge.type})`}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Nodes */}
        {personNodes.filter((n) => visibleLayers.has(n.layer)).map((node) => {
          const pos = nodePositions[node.id];
          if (!pos) return null;
          const isSelected = selectedNode === node.id;
          const isHovered = hoveredNode === node.id;
          const isConnected = selectedNode && connectedEdges.some(
            (e) => e.source === node.id || e.target === node.id
          );
          const color = layerColorMap[node.layer];
          const scale = isHovered ? 1.15 : isSelected ? 1.1 : 1;

          return (
            <g
              key={node.id}
              transform={`translate(${pos.x}, ${pos.y}) scale(${scale})`}
              className="cursor-pointer transition-transform duration-200"
              onMouseEnter={(e) => { setHoveredNode(node.id); e.stopPropagation(); }}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={(e) => {
                e.stopPropagation();
                onSelectNode(isSelected ? null : node.id);
              }}
              style={{
                opacity: selectedNode ? (isSelected || isConnected ? 1 : 0.2) : 1,
              }}
            >
              {/* Glow ring */}
              {(isSelected || isHovered) && (
                <circle r="32" fill="none" stroke={color} strokeWidth="2" opacity="0.3">
                  <animate attributeName="r" values="28;36;28" dur="2s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Stance border */}
              <circle
                r="24"
                fill="white"
                stroke={stanceColors[node.stance]}
                strokeWidth="3"
              />

              {/* Layer fill */}
              <circle
                r="20"
                fill={color}
                opacity="0.15"
              />

              {/* Avatar circle */}
              <circle r="20" fill={color} opacity="0.85" />
              <text textAnchor="middle" dy="5" fill="white" fontSize="14" fontWeight="600">
                {node.name.charAt(0)}
              </text>

              {/* Bottleneck triangle */}
              {node.isBottleneck && (
                <polygon
                  points="-8,-32 0,-42 8,-32"
                  fill="#EF4444"
                  stroke="white"
                  strokeWidth="1.5"
                />
              )}

              {/* Influence stars */}
              {Array.from({ length: node.influence }).map((_, i) => (
                <circle
                  key={i}
                  cx={22 + i * 8}
                  cy={-18}
                  r="3"
                  fill="#F59E0B"
                  stroke="white"
                  strokeWidth="0.5"
                />
              ))}

              {/* Label */}
              <text textAnchor="middle" y="38" fill="#0F172A" fontSize="12" fontWeight="600">
                {node.name}
              </text>
              <text textAnchor="middle" y="52" fill="#94A3B8" fontSize="10">
                {node.position}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hoveredNodeData && !selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute z-30 bg-white rounded-lg shadow-xl border border-[#E2E8F0] p-3 pointer-events-none"
            style={{
              left: (nodePositions[hoveredNodeData.id]?.x || 0) + 20,
              top: (nodePositions[hoveredNodeData.id]?.y || 0) - 40,
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                style={{ backgroundColor: layerColorMap[hoveredNodeData.layer] }}>
                {hoveredNodeData.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]">{hoveredNodeData.name}</p>
                <p className="text-xs text-[#94A3B8]">{hoveredNodeData.position}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ backgroundColor: stanceColors[hoveredNodeData.stance] + '20', color: stanceColors[hoveredNodeData.stance] }}>
                {stanceLabels[hoveredNodeData.stance]}
              </span>
              <span className="text-xs text-[#94A3B8]">
                {'★'.repeat(hoveredNodeData.influence)}
              </span>
              {hoveredNodeData.isBottleneck && (
                <span className="text-xs text-[#EF4444] font-medium">瓶颈</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-1 bg-white rounded-lg shadow-md border border-[#E2E8F0] p-1">
        <button onClick={handleZoomIn} className="p-2 hover:bg-[#F1F5F9] rounded-md transition-colors" title="放大">
          <ZoomIn className="w-4 h-4 text-[#475569]" />
        </button>
        <button onClick={handleZoomOut} className="p-2 hover:bg-[#F1F5F9] rounded-md transition-colors" title="缩小">
          <ZoomOut className="w-4 h-4 text-[#475569]" />
        </button>
        <button onClick={handleReset} className="p-2 hover:bg-[#F1F5F9] rounded-md transition-colors" title="重置">
          <Maximize className="w-4 h-4 text-[#475569]" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-[#E2E8F0] p-3">
        <p className="text-xs font-medium text-[#475569] mb-2">层级</p>
        <div className="space-y-1.5">
          {layerConfigs.map((lc) => (
            <div key={lc.key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lc.color }} />
              <span className="text-xs text-[#475569]">{lc.name}</span>
            </div>
          ))}
        </div>
        <p className="text-xs font-medium text-[#475569] mt-3 mb-2">立场</p>
        <div className="space-y-1.5">
          {Object.entries(stanceLabels).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: stanceColors[key as keyof typeof stanceColors] }} />
              <span className="text-xs text-[#475569]">{label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs font-medium text-[#475569] mt-3 mb-2">关系</p>
        <div className="space-y-1.5">
          {Object.entries(edgeTypeConfig).map(([key, cfg]) => (
            <div key={key} className="flex items-center gap-2">
              <svg width="20" height="4">
                <line x1="0" y1="2" x2="18" y2="2" stroke={cfg.stroke} strokeWidth="2"
                  strokeDasharray={cfg.strokeDasharray} />
              </svg>
              <span className="text-xs text-[#475569]">{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ Layer Analysis Component ============
function LayerAnalysis({ onSelectNode }: { onSelectNode: (id: string) => void }) {
  const [expandedLayer, setExpandedLayer] = useState<LayerType | null>(null);

  const nodesByLayer: Record<LayerType, typeof personNodes> = {
    top: [], direct: [], review: [], frontline: [], peripheral: [],
  };
  personNodes.forEach((n) => nodesByLayer[n.layer].push(n));

  return (
    <div className="space-y-4">
      {/* Layer overview cards */}
      <div className="grid grid-cols-5 gap-3">
        {layerConfigs.map((lc) => {
          const nodes = nodesByLayer[lc.key];
          return (
            <motion.div
              key={lc.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl border border-[#E2E8F0] p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setExpandedLayer(expandedLayer === lc.key ? null : lc.key)}
            >
              <div className="h-1 w-full rounded-full mb-3" style={{ backgroundColor: lc.color }} />
              <span className="text-xs text-[#94A3B8]">{lc.key.toUpperCase()}</span>
              <p className="text-sm font-semibold text-[#0F172A] mt-0.5">{lc.name}</p>
              <p className="text-xl font-bold mt-1" style={{ color: lc.color }}>{nodes.length}人</p>
              <div className="flex -space-x-2 mt-2">
                {nodes.slice(0, 3).map((n) => (
                  <div key={n.id} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-semibold border-2 border-white"
                    style={{ backgroundColor: layerColorMap[n.layer] }}>
                    {n.name.charAt(0)}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Accordion */}
      <div className="space-y-2">
        {layerConfigs.map((lc) => {
          const nodes = nodesByLayer[lc.key];
          const isExpanded = expandedLayer === lc.key;
          return (
            <motion.div
              key={lc.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-4 hover:bg-[#F8FAFC] transition-colors"
                onClick={() => setExpandedLayer(isExpanded ? null : lc.key)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lc.color }} />
                  <span className="text-sm font-semibold text-[#0F172A]">{lc.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">{nodes.length}人</span>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-[#94A3B8]" /> : <ChevronDown className="w-4 h-4 text-[#94A3B8]" />}
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t border-[#E2E8F0]">
                      <div className="grid grid-cols-4 gap-3 mt-3">
                        {nodes.map((node) => (
                          <div
                            key={node.id}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                            onClick={() => onSelectNode(node.id)}
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                              style={{ backgroundColor: layerColorMap[node.layer] }}>
                              {node.name.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-[#0F172A] truncate">{node.name}</p>
                              <p className="text-xs text-[#94A3B8] truncate">{node.position}</p>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                              {'★'.repeat(node.influence)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============ Influence Matrix Component ============
function InfluenceMatrix({ onSelectNode }: { onSelectNode: (id: string) => void }) {
  const nodeList = personNodes;

  const getCellColor = (value: number) => {
    const colors = ['#F8FAFC', '#DBEAFE', '#93C5FD', '#3B82F6', '#1E40AF'];
    return colors[Math.min(value, colors.length - 1)];
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <div className="flex items-center gap-2 mb-6">
        <Grid3X3 className="w-5 h-5 text-[#1E40AF]" />
        <h3 className="text-lg font-semibold text-[#0F172A]">影响力关系矩阵</h3>
        <span className="text-xs text-[#94A3B8] ml-2">颜色越深表示影响力越大</span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header row */}
          <div className="flex items-center">
            <div className="w-16 shrink-0" />
            {nodeList.map((n) => (
              <div key={n.id} className="w-10 text-center">
                <div className="w-6 h-6 rounded-full mx-auto flex items-center justify-center text-white text-[10px] font-semibold"
                  style={{ backgroundColor: layerColorMap[n.layer] }}>
                  {n.name.charAt(0)}
                </div>
                <span className="text-[10px] text-[#94A3B8] truncate block mt-1">{n.name}</span>
              </div>
            ))}
          </div>

          {/* Matrix rows */}
          {nodeList.map((row) => (
            <div key={row.id} className="flex items-center">
              <div className="w-16 shrink-0 flex items-center gap-1 pr-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-semibold shrink-0"
                  style={{ backgroundColor: layerColorMap[row.layer] }}>
                  {row.name.charAt(0)}
                </div>
                <span className="text-xs text-[#475569] truncate">{row.name}</span>
              </div>
              {nodeList.map((col) => {
                const value = influenceMatrix[row.id]?.[col.id] || 0;
                const isSelf = row.id === col.id;
                return (
                  <div
                    key={col.id}
                    className="w-10 h-10 border border-white rounded cursor-pointer hover:ring-2 hover:ring-[#1E40AF] transition-all flex items-center justify-center"
                    style={{
                      backgroundColor: getCellColor(value),
                      opacity: isSelf ? 0.7 : 1,
                    }}
                    onClick={() => onSelectNode(col.id)}
                    title={`${row.name} → ${col.name}: 影响力 ${value}`}
                  >
                    <span className={`text-[10px] font-medium ${value >= 3 ? 'text-white' : 'text-[#475569]'}`}>
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[#E2E8F0]">
        <span className="text-xs text-[#94A3B8]">影响力强度:</span>
        {[0, 1, 2, 3, 4].map((v) => (
          <div key={v} className="flex items-center gap-1">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: getCellColor(v) }} />
            <span className="text-[10px] text-[#94A3B8]">{v === 0 ? '无' : v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ Attack Path Component ============
function AttackPath({ onSelectNode }: { onSelectNode: (id: string) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#F59E0B]" />
        <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">AI推荐</span>
        <span className="text-sm text-[#94A3B8]">基于当前决策链分析，建议按以下顺序推进</span>
      </div>

      <div className="relative">
        {/* Vertical connecting line */}
        <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-[#E2E8F0]" />

        {attackPath.map((step, i) => {
          const person = personNodes.find((n) => n.id === step.personId);
          if (!person) return null;
          const diffColors: Record<string, { bg: string; text: string }> = {
            '易': { bg: '#F0FDF4', text: '#166534' },
            '中': { bg: '#DBEAFE', text: '#1E40AF' },
            '高': { bg: '#FEF3C7', text: '#92400E' },
          };
          const diff = diffColors[step.difficulty] || diffColors['中'];

          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4, ease }}
              className="relative flex items-start gap-4 mb-6 last:mb-0"
            >
              {/* Step number */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-white border-2 border-[#1E40AF] flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-lg font-bold text-[#1E40AF]">{step.step}</span>
              </div>

              {/* Step card */}
              <div className="flex-1 bg-white rounded-xl border border-[#E2E8F0] p-5 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onSelectNode(person.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ backgroundColor: layerColorMap[person.layer] }}>
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#0F172A]">{person.name}
                        <span className="text-sm font-normal text-[#94A3B8] ml-2">{person.position}</span>
                      </p>
                      <p className="text-xs text-[#94A3B8]">{person.department}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ backgroundColor: diff.bg, color: diff.text }}>
                    {step.difficulty}难度
                  </span>
                </div>
                <p className="mt-3 text-sm text-[#475569] leading-relaxed">{step.action}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ============ Right Panel Detail ============
function DetailPanel({ selectedNode, onClear }: { selectedNode: string | null; onClear: () => void }) {
  const node = personNodes.find((n) => n.id === selectedNode);
  if (!node) {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
          <h4 className="text-sm font-semibold text-[#0F172A] mb-3">图谱概览</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-[#F8FAFC] rounded-lg">
              <p className="text-2xl font-bold text-[#1E40AF]">{personNodes.length}</p>
              <p className="text-xs text-[#94A3B8]">联系人</p>
            </div>
            <div className="text-center p-3 bg-[#F8FAFC] rounded-lg">
              <p className="text-2xl font-bold text-[#3B82F6]">{edges.length}</p>
              <p className="text-xs text-[#94A3B8]">关系数</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <h4 className="text-sm font-semibold text-[#0F172A]">AI建议</h4>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg">
              建议重点关注<span className="font-semibold text-[#EF4444]">采购总监赵敏</span>，该联系人是当前最大瓶颈，掌握预算审批第一道关卡。
            </p>
            <p className="text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg">
              <span className="font-semibold text-[#1E40AF]">CTO王磊</span>是关键盟友，可借助其技术影响力推动决策。
            </p>
            <p className="text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg">
              <span className="font-semibold">VP李伟强</span>明确支持项目，可通过其推动商务流程。
            </p>
          </div>
        </div>
      </div>
    );
  }

  const dims = [
    { key: 'identityPower', icon: 'Shield', label: '身份权责' },
    { key: 'businessAppeal', icon: 'Briefcase', label: '业务诉求' },
    { key: 'personalAppeal', icon: 'Heart', label: '个人诉求' },
    { key: 'coreValues', icon: 'Star', label: '核心价值观' },
    { key: 'projectStance', icon: 'Flag', label: '项目立场' },
    { key: 'relationships', icon: 'Users', label: '人际关联' },
    { key: 'bottleneckImpact', icon: 'AlertTriangle', label: '瓶颈影响' },
    { key: 'behaviorPrediction', icon: 'Brain', label: '行为推演' },
  ] as const;

  return (
    <div className="p-4 space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
      {/* Header */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-semibold"
              style={{ backgroundColor: layerColorMap[node.layer] }}>
              {node.name.charAt(0)}
            </div>
            <div>
              <p className="text-base font-semibold text-[#0F172A]">{node.name}</p>
              <p className="text-xs text-[#94A3B8]">{node.position} · {node.department}</p>
            </div>
          </div>
          <button onClick={onClear} className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors">
            <X className="w-4 h-4 text-[#94A3B8]" />
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ backgroundColor: layerBgMap[node.layer], color: layerColorMap[node.layer] }}>
            {node.layerName}
          </span>
          <span className="text-xs px-2 py-1 rounded-full font-medium"
            style={{ backgroundColor: stanceColors[node.stance] + '20', color: stanceColors[node.stance] }}>
            {stanceLabels[node.stance]}
          </span>
          {node.isBottleneck && (
            <span className="text-xs px-2 py-1 rounded-full bg-[#FEF2F2] text-[#EF4444] font-medium">瓶颈人物</span>
          )}
        </div>
      </div>

      {/* 8 Dimensions */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <h4 className="text-sm font-semibold text-[#0F172A] mb-3">八维深度拆解</h4>
        <div className="space-y-3">
          {dims.map((dim, i) => {
            const IconComp = iconMap[dim.icon] || Brain;
            return (
              <motion.div
                key={dim.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#EFF6FF] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <IconComp className="w-3.5 h-3.5 text-[#1E40AF]" />
                  <span className="text-xs font-medium text-[#1E40AF]">{dim.label}</span>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {node.dimensions[dim.key as keyof typeof node.dimensions]}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Connections */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4">
        <h4 className="text-sm font-semibold text-[#0F172A] mb-3">关联关系</h4>
        <div className="space-y-2">
          {edges.filter((e) => e.source === node.id || e.target === node.id).map((edge) => {
            const otherId = edge.source === node.id ? edge.target : edge.source;
            const other = personNodes.find((n) => n.id === otherId);
            if (!other) return null;
            return (
              <div key={edge.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0"
                  style={{ backgroundColor: layerColorMap[other.layer] }}>
                  {other.name.charAt(0)}
                </div>
                <span className="text-xs text-[#0F172A] truncate">{other.name}</span>
                <span className="text-[10px] text-[#94A3B8]">{edge.label}</span>
                <div className="ml-auto">
                  <svg width="20" height="4">
                    <line x1="0" y1="2" x2="16" y2="2" stroke={edgeTypeConfig[edge.type].stroke} strokeWidth="2"
                      strokeDasharray={edgeTypeConfig[edge.type].strokeDasharray} />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ Main Component ============
const tabs = [
  { key: 'graph', label: '关系图谱', icon: Network },
  { key: 'layers', label: '层级分析', icon: Layers },
  { key: 'matrix', label: '影响力矩阵', icon: Grid3X3 },
  { key: 'path', label: '攻坚路径', icon: Route },
] as const;

export default function DecisionChain() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['key']>('graph');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [visibleLayers, setVisibleLayers] = useState<Set<LayerType>>(
    new Set(['top', 'direct', 'review', 'frontline', 'peripheral'])
  );

  const toggleLayer = useCallback((layer: LayerType) => {
    setVisibleLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) {
        if (next.size > 1) next.delete(layer);
      } else {
        next.add(layer);
      }
      return next;
    });
  }, []);

  return (
    <Layout
      title="决策链人际关系图谱"
      breadcrumb="首页 / 决策链关系图谱"
      showRightPanel
    >
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] mb-6">
        <div className="flex border-b border-[#E2E8F0]">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 ${
                  isActive
                    ? 'text-[#1E40AF] border-[#1E40AF] bg-[#EFF6FF]'
                    : 'text-[#94A3B8] border-transparent hover:text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Left: Tab Content */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === 'graph' && (
              <motion.div
                key="graph"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <NetworkGraph
                  selectedNode={selectedNode}
                  onSelectNode={setSelectedNode}
                  visibleLayers={visibleLayers}
                />
                {/* Layer Toggles */}
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-[#94A3B8]">显示层级:</span>
                  {layerConfigs.map((lc) => (
                    <label key={lc.key} className="flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={visibleLayers.has(lc.key)}
                        onChange={() => toggleLayer(lc.key)}
                        className="w-3.5 h-3.5 rounded border-[#E2E8F0] text-[#1E40AF] focus:ring-[#1E40AF]"
                      />
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: lc.color }} />
                      <span className="text-xs text-[#475569]">{lc.name}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'layers' && (
              <motion.div
                key="layers"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <LayerAnalysis onSelectNode={setSelectedNode} />
              </motion.div>
            )}

            {activeTab === 'matrix' && (
              <motion.div
                key="matrix"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <InfluenceMatrix onSelectNode={setSelectedNode} />
              </motion.div>
            )}

            {activeTab === 'path' && (
              <motion.div
                key="path"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3, ease }}
              >
                <AttackPath onSelectNode={setSelectedNode} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Detail Panel */}
        <div className="w-80 shrink-0">
          <div className="bg-white rounded-xl border border-[#E2E8F0] sticky top-4">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E2E8F0]">
              <Brain className="w-4 h-4 text-[#1E40AF]" />
              <h3 className="text-sm font-semibold text-[#0F172A]">
                {selectedNode ? '人物详情' : '智能洞察'}
              </h3>
            </div>
            <DetailPanel selectedNode={selectedNode} onClear={() => setSelectedNode(null)} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
