import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Upload, Download, Pencil, Eye, X,
  Building2, User, FolderKanban, TrendingUp, Phone, Mail,
  Tag, MapPin, Users, BarChart3, Clock, Briefcase, Calendar,
  ChevronLeft, ChevronRight as ChevronRightIcon, Layers, Target, AlertCircle,
} from 'lucide-react';
import Layout from '@/components/Layout';
import {
  archiveCustomers, archiveEnterprises, archiveProjects,
  archiveStats, recentUpdates, followUpTimeline,
  customerStageConfig, projectStageConfig, kanbanColumns,
  customerDetailTabs, enterpriseDetailTabs,
  type ArchiveCustomer, type ArchiveEnterprise,
  type ArchiveProject, type ProjectStage,
} from '@/data/archiveMockData';

// ============ Animation Variants ============
const cardStagger = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};



// ============ Customer Stage Badge ============
function StageBadge({ stage }: { stage: string }) {
  const config = customerStageConfig[stage] || { color: '#94A3B8', bg: '#F1F5F9' };
  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
      {stage}
    </span>
  );
}

// ============ Customer Tab ============
function CustomerTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStage, setFilterStage] = useState('全部');
  const [selectedCustomer, setSelectedCustomer] = useState<ArchiveCustomer | null>(null);
  const [detailTab, setDetailTab] = useState('基本信息');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const filtered = archiveCustomers.filter(c => {
    const matchSearch = !searchTerm || c.name.includes(searchTerm) || c.company.includes(searchTerm);
    const matchStage = filterStage === '全部' || c.stage === filterStage;
    return matchSearch && matchStage;
  });

  const paged = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  const stages = ['全部', '线索', '初访', '跟进中', '意向', '成交', '流失'];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索客户姓名、公司..."
              className="w-60 h-9 pl-9 pr-3 text-sm border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none bg-white"
            />
          </div>
          <select
            value={filterStage}
            onChange={(e) => setFilterStage(e.target.value)}
            className="h-9 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#0F172A] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none"
          >
            {stages.map(s => <option key={s} value={s}>{s === '全部' ? '全部状态' : s}</option>)}
          </select>
          <select className="h-9 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#0F172A] focus:border-[#1E40AF] outline-none">
            <option>最近更新</option>
            <option>最早更新</option>
            <option>跟进次数</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 h-9 text-sm bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all">
            <Plus className="w-4 h-4" />
            新建客户档案
          </button>
          <button className="flex items-center gap-1.5 px-3 h-9 text-sm border border-[#E2E8F0] text-[#475569] rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <Upload className="w-4 h-4" />
            批量导入
          </button>
          <button className="flex items-center gap-1.5 px-3 h-9 text-sm text-[#475569] hover:bg-[#F1F5F9] rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC]">
                <th className="text-left text-xs font-medium text-[#475569] px-4 py-3 uppercase tracking-wider">客户姓名</th>
                <th className="text-left text-xs font-medium text-[#475569] px-4 py-3 uppercase tracking-wider">所属企业</th>
                <th className="text-left text-xs font-medium text-[#475569] px-4 py-3 uppercase tracking-wider">职位</th>
                <th className="text-left text-xs font-medium text-[#475569] px-4 py-3 uppercase tracking-wider">联系方式</th>
                <th className="text-left text-xs font-medium text-[#475569] px-4 py-3 uppercase tracking-wider">合作阶段</th>
                <th className="text-left text-xs font-medium text-[#475569] px-4 py-3 uppercase tracking-wider">标签</th>
                <th className="text-right text-xs font-medium text-[#475569] px-4 py-3 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((customer, i) => (
                <motion.tr
                  key={customer.id}
                  custom={i}
                  variants={cardStagger}
                  initial="hidden"
                  animate="visible"
                  className="border-t border-[#F1F5F9] hover:bg-[#F8FAFC] transition-colors"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-sm font-semibold">
                        {customer.name[0]}
                      </div>
                      <span className="text-sm font-medium text-[#0F172A]">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span className="text-sm text-[#475569]">{customer.company}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#94A3B8]" />
                      <span className="text-sm text-[#475569]">{customer.position}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-[#475569]">
                        <Phone className="w-3 h-3 text-[#94A3B8]" />
                        {customer.phone}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                        <Mail className="w-3 h-3" />
                        {customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StageBadge stage={customer.stage} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">{tag}</span>
                      ))}
                      {customer.tags.length > 3 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#94A3B8]">+{customer.tags.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-[#1E40AF] hover:bg-[#EFF6FF] transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-[#1E40AF] hover:bg-[#EFF6FF] transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-[#F1F5F9]">
          <span className="text-xs text-[#94A3B8]">共 {filtered.length} 条</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page ? 'bg-[#1E40AF] text-white' : 'text-[#475569] hover:bg-[#F8FAFC]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-[#F8FAFC] disabled:opacity-40 transition-colors"
            >
              <ChevronRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer Detail Drawer */}
      <AnimatePresence>
        {selectedCustomer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedCustomer(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[480px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#F1F5F9]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-2xl font-bold">
                      {selectedCustomer.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#0F172A]">{selectedCustomer.name}</h3>
                      <p className="text-sm text-[#94A3B8] mt-0.5">{selectedCustomer.company} · {selectedCustomer.position}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <StageBadge stage={selectedCustomer.stage} />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedCustomer(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-0 mt-4 border-b border-[#E2E8F0]">
                  {customerDetailTabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                        detailTab === tab
                          ? 'text-[#1E40AF] border-[#1E40AF]'
                          : 'text-[#94A3B8] border-transparent hover:text-[#475569]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drawer Content */}
              <div className="p-6">
                {detailTab === '基本信息' && (
                  <div className="space-y-6">
                    {/* Personal Info */}
                    <div>
                      <h4 className="text-sm font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                        <User className="w-4 h-4 text-[#1E40AF]" />
                        个人信息
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: '姓名', value: selectedCustomer.name },
                          { label: '性别', value: '男' },
                          { label: '职位', value: selectedCustomer.position },
                          { label: '部门', value: '总经办' },
                          { label: '入职时间', value: '2018年' },
                          { label: '联系方式', value: selectedCustomer.phone },
                          { label: '邮箱', value: selectedCustomer.email },
                        ].map(item => (
                          <div key={item.label} className="flex flex-col gap-0.5">
                            <span className="text-xs text-[#94A3B8]">{item.label}</span>
                            <span className="text-sm text-[#0F172A] font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-[#F1F5F9] pt-5">
                      <h4 className="text-sm font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#1E40AF]" />
                        企业信息
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: '公司', value: selectedCustomer.company },
                          { label: '行业', value: '互联网/金融科技' },
                          { label: '规模', value: '500-1000人' },
                          { label: '地区', value: '北京' },
                        ].map(item => (
                          <div key={item.label} className="flex flex-col gap-0.5">
                            <span className="text-xs text-[#94A3B8]">{item.label}</span>
                            <span className="text-sm text-[#0F172A] font-medium">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-[#F1F5F9] pt-5">
                      <h4 className="text-sm font-semibold text-[#0F172A] mb-3 flex items-center gap-2">
                        <Tag className="w-4 h-4 text-[#1E40AF]" />
                        标签
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCustomer.tags.map(tag => (
                          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#475569] font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {detailTab === '跟进记录' && (
                  <div className="space-y-4">
                    {followUpTimeline.map((record, i) => (
                      <div key={record.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]" />
                          {i < followUpTimeline.length - 1 && <div className="w-px flex-1 bg-[#E2E8F0] mt-1" />}
                        </div>
                        <div className="pb-4">
                          <p className="text-xs text-[#94A3B8]">{record.date}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-[#DBEAFE] text-[#1E40AF] font-medium">{record.type}</span>
                          </div>
                          <p className="text-sm text-[#0F172A] mt-1">{record.content}</p>
                          <p className="text-xs text-[#475569] mt-1">{record.result}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {detailTab === '关联分析' && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-32 h-32 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
                      <Target className="w-12 h-12 text-[#1E40AF]" />
                    </div>
                    <p className="text-sm text-[#94A3B8]">关联分析功能开发中...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ Enterprise Tab ============
function EnterpriseTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('全部');
  const [selectedEnterprise, setSelectedEnterprise] = useState<ArchiveEnterprise | null>(null);
  const [detailTab, setDetailTab] = useState('企业概况');

  const industries = ['全部', '互联网/金融科技', '制造业', '软件服务', '金融投资', '城市建设', '云计算/大数据'];

  const filtered = archiveEnterprises.filter(e => {
    const matchSearch = !searchTerm || e.name.includes(searchTerm);
    const matchIndustry = filterIndustry === '全部' || e.industry === filterIndustry;
    return matchSearch && matchIndustry;
  });

  const getStatusStyle = (status: string) => {
    if (status === '合作中') return 'bg-[#F0FDF4] text-[#166534]';
    if (status === '潜在') return 'bg-[#FEF3C7] text-[#92400E]';
    return 'bg-[#FEF2F2] text-[#DC2626]';
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索企业名称..."
              className="w-60 h-9 pl-9 pr-3 text-sm border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none bg-white"
            />
          </div>
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="h-9 px-3 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#0F172A] focus:border-[#1E40AF] outline-none"
          >
            {industries.map(ind => <option key={ind} value={ind}>{ind === '全部' ? '全部行业' : ind}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 h-9 text-sm bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all">
            <Plus className="w-4 h-4" />
            新建企业档案
          </button>
          <button className="flex items-center gap-1.5 px-3 h-9 text-sm border border-[#E2E8F0] text-[#475569] rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <Upload className="w-4 h-4" />
            导入
          </button>
        </div>
      </div>

      {/* Enterprise Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((enterprise, i) => (
          <motion.div
            key={enterprise.id}
            custom={i}
            variants={cardStagger}
            initial="hidden"
            animate="visible"
            className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-6 hover:shadow-card-hover hover:-translate-y-0.5 transition-all cursor-pointer"
            onClick={() => setSelectedEnterprise(enterprise)}
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1E40AF] text-xl font-bold">
                  {enterprise.name[0]}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#0F172A]">{enterprise.name}</h3>
                  <p className="text-xs text-[#94A3B8]">{enterprise.industry}</p>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${getStatusStyle(enterprise.status)}`}>
                {enterprise.status}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="text-xs text-[#475569]">{enterprise.scale}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="text-xs text-[#475569]">{enterprise.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="text-xs text-[#475569]">{enterprise.coreBusiness}</span>
              </div>
              <div className="flex items-center gap-2">
                <FolderKanban className="w-3.5 h-3.5 text-[#94A3B8]" />
                <span className="text-xs text-[#475569]">{enterprise.projectCount}个项目</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {enterprise.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-[#F1F5F9] text-[#475569]">{tag}</span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F1F5F9]">
              <span className="text-xs text-[#1E40AF] font-medium">{enterprise.customerCount}个关联客户</span>
              <span className="flex items-center gap-1 text-xs text-[#1E40AF] font-medium">
                查看详情 <ChevronRightIcon className="w-3 h-3" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Enterprise Detail Drawer */}
      <AnimatePresence>
        {selectedEnterprise && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedEnterprise(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[480px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 border-b border-[#F1F5F9]">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-[#1E40AF] text-2xl font-bold">
                      {selectedEnterprise.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#0F172A]">{selectedEnterprise.name}</h3>
                      <p className="text-sm text-[#94A3B8] mt-0.5">{selectedEnterprise.industry}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEnterprise(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-0 mt-4 border-b border-[#E2E8F0]">
                  {enterpriseDetailTabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                        detailTab === tab
                          ? 'text-[#1E40AF] border-[#1E40AF]'
                          : 'text-[#94A3B8] border-transparent hover:text-[#475569]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6">
                {detailTab === '企业概况' && (
                  <div className="space-y-6">
                    <p className="text-sm text-[#475569] leading-relaxed">{selectedEnterprise.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: '企业名称', value: selectedEnterprise.name },
                        { label: '所属行业', value: selectedEnterprise.industry },
                        { label: '企业规模', value: selectedEnterprise.scale },
                        { label: '所在地区', value: selectedEnterprise.region },
                        { label: '核心业务', value: selectedEnterprise.coreBusiness },
                        { label: '项目数量', value: `${selectedEnterprise.projectCount}个` },
                        { label: '关联客户', value: `${selectedEnterprise.customerCount}人` },
                        { label: '合作状态', value: selectedEnterprise.status },
                      ].map(item => (
                        <div key={item.label} className="flex flex-col gap-0.5">
                          <span className="text-xs text-[#94A3B8]">{item.label}</span>
                          <span className="text-sm text-[#0F172A] font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {(detailTab === '关联客户' || detailTab === '关联项目') && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-24 h-24 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
                      <Users className="w-10 h-10 text-[#1E40AF]" />
                    </div>
                    <p className="text-sm text-[#94A3B8]">{detailTab}数据开发中...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ Project Kanban Tab ============
function ProjectKanbanTab() {
  const [projects, setProjects] = useState<ArchiveProject[]>(archiveProjects);
  const [draggedProject, setDraggedProject] = useState<ArchiveProject | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ArchiveProject | null>(null);
  const [detailTab, setDetailTab] = useState('项目概况');

  const handleDragStart = (project: ArchiveProject) => {
    setDraggedProject(project);
  };

  const handleDragOver = useCallback((e: React.DragEvent, column: string) => {
    e.preventDefault();
    setDragOverColumn(column);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, column: string) => {
    e.preventDefault();
    if (draggedProject && column !== draggedProject.stage) {
      setProjects(prev => prev.map(p =>
        p.id === draggedProject.id ? { ...p, stage: column as ProjectStage } : p
      ));
    }
    setDraggedProject(null);
    setDragOverColumn(null);
  }, [draggedProject]);

  const getColumnCount = (column: string) => projects.filter(p => p.stage === column).length;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="搜索项目名称..."
              className="w-60 h-9 pl-9 pr-3 text-sm border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder:text-[#94A3B8] focus:border-[#1E40AF] focus:ring-2 focus:ring-[#1E40AF]/20 outline-none bg-white"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-4 h-9 text-sm bg-[#1E40AF] text-white rounded-lg hover:bg-[#1D4ED8] active:scale-[0.97] transition-all">
            <Plus className="w-4 h-4" />
            新建项目档案
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {kanbanColumns.map((column) => {
          const colProjects = projects.filter(p => p.stage === column);
          const colConfig = projectStageConfig[column];
          const isDragOver = dragOverColumn === column;

          return (
            <div
              key={column}
              className={`flex-shrink-0 w-[260px] rounded-xl transition-colors ${
                isDragOver ? 'bg-[#EFF6FF]/50 ring-2 ring-[#1E40AF]/20' : ''
              }`}
              onDragOver={(e) => handleDragOver(e, column)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFC] rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colConfig.color }} />
                  <span className="text-sm font-semibold text-[#0F172A]">{column}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: colConfig.bg, color: colConfig.color }}>
                  {getColumnCount(column)}
                </span>
              </div>

              {/* Column Body */}
              <div className="p-2 space-y-2 min-h-[200px] bg-[#F8FAFC]/50 rounded-b-xl">
                <AnimatePresence>
                  {colProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      draggable
                      onDragStart={() => handleDragStart(project)}
                      onClick={() => setSelectedProject(project)}
                      className="bg-white border border-[#E2E8F0] rounded-lg p-3.5 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow group"
                      style={{ opacity: draggedProject?.id === project.id ? 0.6 : 1 }}
                    >
                      {/* Priority */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            project.priority === 'high' ? 'bg-[#EF4444]' :
                            project.priority === 'medium' ? 'bg-[#F59E0B]' : 'bg-[#3B82F6]'
                          }`} />
                          <span className="text-xs text-[#94A3B8]">{project.dueDate}</span>
                        </div>
                      </div>

                      <h4 className="text-sm font-semibold text-[#0F172A] mb-1.5 group-hover:text-[#1E40AF] transition-colors">
                        {project.name}
                      </h4>

                      <p className="text-xs text-[#94A3B8] mb-2">{project.enterprise} · {project.client}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#0F172A]">¥{project.value}万</span>
                        <div className="flex -space-x-1.5">
                          {project.team.slice(0, 3).map((member, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-[10px] font-medium border-2 border-white"
                              title={member}
                            >
                              {member[0]}
                            </div>
                          ))}
                          {project.team.length > 3 && (
                            <div className="w-6 h-6 rounded-full bg-[#F1F5F9] flex items-center justify-center text-[10px] text-[#475569] font-medium border-2 border-white">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-[480px] bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6 border-b border-[#F1F5F9]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0F172A]">{selectedProject.name}</h3>
                    <p className="text-sm text-[#94A3B8] mt-1">{selectedProject.enterprise} · {selectedProject.client}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <StageBadge stage={selectedProject.stage} />
                      <span className="text-sm font-semibold text-[#0F172A]">¥{selectedProject.value}万</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-0 mt-4 border-b border-[#E2E8F0]">
                  {['项目概况', '里程碑', '跟进记录'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                        detailTab === tab
                          ? 'text-[#1E40AF] border-[#1E40AF]'
                          : 'text-[#94A3B8] border-transparent hover:text-[#475569]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-6">
                {detailTab === '项目概况' && (
                  <div className="space-y-6">
                    <p className="text-sm text-[#475569] leading-relaxed">{selectedProject.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: '项目金额', value: `¥${selectedProject.value}万` },
                        { label: '当前阶段', value: selectedProject.stage },
                        { label: '负责人', value: selectedProject.responsible },
                        { label: '截止日期', value: selectedProject.dueDate },
                        { label: '客户', value: selectedProject.client },
                        { label: '企业', value: selectedProject.enterprise },
                      ].map(item => (
                        <div key={item.label} className="flex flex-col gap-0.5">
                          <span className="text-xs text-[#94A3B8]">{item.label}</span>
                          <span className="text-sm text-[#0F172A] font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#F1F5F9] pt-4">
                      <h4 className="text-sm font-semibold text-[#0F172A] mb-2">团队成员</h4>
                      <div className="flex gap-2">
                        {selectedProject.team.map((member, idx) => (
                          <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F8FAFC] border border-[#F1F5F9]">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E40AF] to-[#3B82F6] flex items-center justify-center text-white text-xs font-medium">
                              {member[0]}
                            </div>
                            <span className="text-sm text-[#0F172A]">{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-[#F1F5F9] pt-4">
                      <h4 className="text-sm font-semibold text-[#0F172A] mb-2">风险指标</h4>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-sm text-[#475569]">中等风险 — 需关注预算审批进度</span>
                      </div>
                    </div>
                  </div>
                )}
                {(detailTab === '里程碑' || detailTab === '跟进记录') && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-24 h-24 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
                      <Calendar className="w-10 h-10 text-[#1E40AF]" />
                    </div>
                    <p className="text-sm text-[#94A3B8]">{detailTab}数据开发中...</p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============ Right Panel Content ============
function ArchiveRightPanel() {
  return (
    <div className="space-y-5">
      {/* Stats Cards */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-[#1E40AF]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">档案统计</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '客户档案', value: archiveStats.customerCount, change: `+${archiveStats.customerThisWeek}`, icon: User, color: '#1E40AF' },
            { label: '企业档案', value: archiveStats.enterpriseCount, change: `+${archiveStats.enterpriseThisWeek}`, icon: Building2, color: '#10B981' },
            { label: '项目档案', value: archiveStats.projectCount, change: `+${archiveStats.projectThisWeek}`, icon: FolderKanban, color: '#F59E0B' },
            { label: '完成率', value: `${archiveStats.completionRate}%`, change: `+${archiveStats.completionTrend}%`, icon: TrendingUp, color: '#8B5CF6' },
          ].map(stat => (
            <div key={stat.label} className="p-3 rounded-lg bg-[#F8FAFC]">
              <div className="flex items-center gap-1.5 mb-1.5">
                <stat.icon className="w-3.5 h-3.5" style={{ color: stat.color }} />
                <span className="text-xs text-[#94A3B8]">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-[#0F172A]">{stat.value}</p>
              <p className="text-xs text-[#10B981] font-medium mt-0.5">{stat.change} 本周</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-[#1E40AF]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">最近更新</h4>
        </div>
        <div className="space-y-2.5">
          {recentUpdates.map(update => (
            <div key={update.id} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1E40AF] mt-1.5 shrink-0" />
              <div>
                <p className="text-xs text-[#475569]">{update.text}</p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">{update.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-[#1E40AF]" />
          <h4 className="text-sm font-semibold text-[#0F172A]">快捷操作</h4>
        </div>
        <div className="space-y-2">
          {[
            { label: '新建客户档案', icon: User },
            { label: '新建企业档案', icon: Building2 },
            { label: '新建项目档案', icon: FolderKanban },
          ].map(action => (
            <button
              key={action.label}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-[#475569] hover:bg-[#EFF6FF] hover:text-[#1E40AF] transition-colors"
            >
              <action.icon className="w-4 h-4" />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ Main Archive Page ============
export default function Archive() {
  const [activeTab, setActiveTab] = useState('customer');

  const tabs = [
    { id: 'customer', label: '客户档案', icon: User },
    { id: 'enterprise', label: '企业档案', icon: Building2 },
    { id: 'project', label: '项目档案', icon: FolderKanban },
  ];

  return (
    <Layout title="三档案管理" breadcrumb="三档案管理">
      {/* Internal Pill Tabs */}
      <div className="bg-[#F1F5F9] rounded-full p-1 inline-flex mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full transition-all ${
              activeTab === tab.id
                ? 'bg-[#1E40AF] text-white shadow-sm'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'customer' && <CustomerTab />}
          {activeTab === 'enterprise' && <EnterpriseTab />}
          {activeTab === 'project' && <ProjectKanbanTab />}
        </motion.div>
      </AnimatePresence>

      {/* Right Panel Portal */}
      <div className="fixed right-0 top-14 bottom-0 z-30 bg-white border-l border-[#E2E8F0] shadow-panel overflow-y-auto"
        style={{ width: 320, padding: 16 }}
      >
        <ArchiveRightPanel />
      </div>
    </Layout>
  );
}
