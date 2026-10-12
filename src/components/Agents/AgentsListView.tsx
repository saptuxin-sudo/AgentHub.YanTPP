import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AgentApplication } from '../../types';
import { 
  Cpu, 
  KeyRound, 
  Play, 
  Edit3, 
  Trash2, 
  Copy, 
  Check, 
  RefreshCw, 
  Plus, 
  User, 
  Mail, 
  HelpCircle,
  Share2
} from 'lucide-react';
import { CreateAgentModal } from './CreateAgentModal';

export const AgentsListView: React.FC = () => {
  const { 
    agents, 
    apiKeys, 
    deleteAgent, 
    regenerateAgentToken, 
    openRunnerModal, 
    searchQuery,
    userMode,
    showHelpTooltips,
    showToast 
  } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AgentApplication | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredAgents = agents.filter((agent) => {
    const q = searchQuery.toLowerCase();
    return (
      agent.name.toLowerCase().includes(q) ||
      agent.accountOwner.toLowerCase().includes(q) ||
      agent.accountEmail.toLowerCase().includes(q) ||
      agent.model.toLowerCase().includes(q) ||
      agent.category.toLowerCase().includes(q)
    );
  });

  const handleCopyLaunchUrl = (agent: AgentApplication) => {
    navigator.clipboard.writeText(agent.launchUrl);
    setCopiedId(agent.id);
    showToast(`Ссылка для запуска скопирована: ${agent.name}`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEdit = (agent: AgentApplication) => {
    setEditingAgent(agent);
    setIsCreateModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingAgent(null);
    setIsCreateModalOpen(true);
  };

  const getKey = (keyId?: string) => {
    if (!keyId) return null;
    return apiKeys.find((k) => k.id === keyId) || null;
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            Реестр ваших помощников и привязанных аккаунтов
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Здесь наглядно показано, какой аккаунт и какой ключ API закреплен за каждым приложением.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-900/20 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Создать нового помощника</span>
        </button>
      </div>

      {/* Explanatory Help Box for Regular Users */}
      {showHelpTooltips && (
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3 transition-colors">
          <HelpCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <strong className="text-slate-900 dark:text-slate-100 block font-semibold">
              💡 Зачем нужна эта таблица?
            </strong>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Каждому помощнику нужен API ключ для отправки запросов (например, бухгалтерскому помощнику лучше назначить ключ GigaChat от Сбера, 
              а помощнику по созданию сайтов — DeepSeek или Gemini). В этой таблице вы видите, кто является ответственным за приложение 
              и какой ключ расходует токены.
            </p>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Имя помощника & Тема</th>
                <th className="py-3.5 px-4 font-semibold">Используемый аккаунт</th>
                <th className="py-3.5 px-4 font-semibold">Привязанный ключ API</th>
                <th className="py-3.5 px-4 font-semibold">Модель ИИ</th>
                <th className="py-3.5 px-4 font-semibold">Ссылка запуска</th>
                <th className="py-3.5 px-4 font-semibold text-right">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredAgents.map((agent) => {
                const primaryKey = getKey(agent.primaryKeyId);
                const isCopied = copiedId === agent.id;

                return (
                  <tr key={agent.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                    {/* Col 1 */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                        {agent.name}
                      </div>
                      <div className="text-[11px] text-cyan-700 dark:text-cyan-400 mt-0.5">
                        {agent.category}
                      </div>
                    </td>

                    {/* Col 2: Account Owner & Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[160px]">{agent.accountOwner}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400 dark:text-slate-500 shrink-0" />
                        <span className="truncate max-w-[170px]">{agent.accountEmail}</span>
                      </div>
                    </td>

                    {/* Col 3: API Key */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200 font-medium">
                        <KeyRound className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                        <span className="truncate max-w-[160px] text-amber-700 dark:text-amber-300 font-mono">
                          {primaryKey ? primaryKey.name : 'Не назначен'}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono pl-5">
                        {primaryKey ? primaryKey.keyMasked : '---'}
                      </div>
                    </td>

                    {/* Col 4: AI Model */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-xs text-cyan-700 dark:text-cyan-300 font-medium">
                        {agent.model}
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                        <span>Готов к работе</span>
                      </div>
                    </td>

                    {/* Col 5: Launch URL */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className="max-w-[150px] truncate text-slate-600 dark:text-slate-400 font-mono bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded border border-slate-200 dark:border-slate-800 text-[11px]">
                          {agent.launchUrl}
                        </div>
                        <button
                          onClick={() => handleCopyLaunchUrl(agent)}
                          title="Скопировать ссылку для отправки"
                          className="p-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors shrink-0"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                    {/* Col 6: Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openRunnerModal(agent)}
                          title="Запустить помощника прямо сейчас"
                          className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 hover:bg-cyan-100 dark:hover:bg-cyan-900 border border-cyan-200 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300 hover:text-cyan-900 dark:hover:text-white transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          onClick={() => handleEdit(agent)}
                          title="Редактировать настройки"
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteAgent(agent.id)}
                          title="Удалить"
                          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950 hover:text-rose-600 dark:hover:text-rose-400 text-slate-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <CreateAgentModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingAgent(null);
        }}
        editingAgent={editingAgent}
      />
    </div>
  );
};
