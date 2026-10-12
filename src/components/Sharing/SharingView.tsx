import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Share2, 
  Copy, 
  Check, 
  Code2, 
  ShieldCheck, 
  Plus, 
  Mail, 
  Key, 
  ExternalLink,
  Terminal
} from 'lucide-react';

export const SharingView: React.FC = () => {
  const { 
    agents, 
    teamMembers, 
    addTeamMember, 
    showToast 
  } = useApp();

  const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id || '');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // New member form
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Agent Operator' | 'Viewer'>('Agent Operator');
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(label);
    showToast(`${label} скопирован в буфер`, 'success');
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      showToast('Заполните имя и email', 'error');
      return;
    }

    addTeamMember({
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      assignedAgents: [selectedAgentId]
    });

    setNewMemberName('');
    setNewMemberEmail('');
    setIsInviteOpen(false);
  };

  const curlSnippet = selectedAgent ? `curl -X POST "${selectedAgent.launchUrl}" \\
  -H "Content-Type: application/json" \\
  -H "X-Agent-Auth: Bearer ${selectedAgent.sharedToken}" \\
  -d '{
    "prompt": "Сформируй анализ инцидента за последние 24 часа",
    "stream": true,
    "temperature": 0.3
  }'` : '';

  const embedSnippet = selectedAgent ? `<iframe
  src="${selectedAgent.launchUrl}&mode=embedded"
  width="100%"
  height="600"
  frameborder="0"
  allow="clipboard-write"
></iframe>` : '';

  const pythonSnippet = selectedAgent ? `import requests

url = "${selectedAgent.launchUrl}"
headers = {
    "X-Agent-Auth": "Bearer ${selectedAgent.sharedToken}",
    "Content-Type": "application/json"
}
payload = {
    "prompt": "Ваш входящий запрос к агенту",
    "max_tokens": 2048
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())` : '';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            Совместное использование & Интеграции
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Управление правами доступа команды (RBAC), токенизированные вебхуки и встраиваемые виджеты.
          </p>
        </div>

        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-900/20 transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Пригласить коллегу</span>
        </button>
      </div>

      {/* Grid: Left = Team Members, Right = API / Webhook Integration Snippets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Col 1 & 2: Team Members Matrix */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Команда и матрица ролевого доступа (RBAC)
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{teamMembers.length} участников</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                  <th className="py-2.5 px-3">Сотрудник</th>
                  <th className="py-2.5 px-3">Роль в системе</th>
                  <th className="py-2.5 px-3">Назначенные агенты</th>
                  <th className="py-2.5 px-3 text-right">Активность</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900 dark:text-slate-200">{member.name}</div>
                      <div className="text-[11px] font-mono text-slate-500">{member.email}</div>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-medium ${
                        member.role === 'Owner'
                          ? 'bg-purple-100 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800/60 text-purple-700 dark:text-purple-300'
                          : member.role === 'Admin'
                          ? 'bg-cyan-100 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-800/60 text-cyan-700 dark:text-cyan-300'
                          : member.role === 'Agent Operator'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                      {member.assignedAgents.length > 0 ? (
                        <span className="font-mono text-xs text-slate-800 dark:text-slate-300">
                          {member.assignedAgents.length} приложения
                        </span>
                      ) : (
                        <span className="text-slate-400 dark:text-slate-500">Доступ ко всем</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {member.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Col 3: Role Definitions Quick Legend */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-sm transition-colors">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 mb-2">
              Политика разграничения прав
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Ключи в Vault надежно скрыты. Операторы агентов могут запускать и тестировать агентов, но не видят сырые значения API ключей.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-purple-700 dark:text-purple-300 font-semibold font-mono text-[11px]">👑 Owner / Admin</div>
                <div className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">Полный доступ: добавление ключей, редактирование агентов, финансовый мониторинг.</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-emerald-700 dark:text-emerald-300 font-semibold font-mono text-[11px]">⚡ Agent Operator</div>
                <div className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">Запуск назначенных агентов, получение ссылок и просмотр логов вызова.</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-slate-700 dark:text-slate-400 font-semibold font-mono text-[11px]">👁️ Viewer</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Только просмотр дашборда и статистики расхода токенов.</div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-cyan-700 dark:text-cyan-400 font-mono mt-3">
            Аудит безопасности: Zero-Knowledge Key Storage
          </div>
        </div>

      </div>

      {/* Integration Code Generator Panel */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-2 font-mono">
              <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              Генератор кода интеграции: Запуск через Webhook / API
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Интегрируйте запуск любого агента в сторонний код (Telegram бот, CRM, n8n, Airflow).
            </p>
          </div>

          {/* Select Agent dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-600 dark:text-slate-400 font-medium">Агент:</label>
            <select
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg text-xs text-slate-900 dark:text-cyan-300 font-medium focus:outline-none"
            >
              {agents.map((ag) => (
                <option key={ag.id} value={ag.id}>{ag.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Snippets tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {/* cURL Snippet */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
            <div className="p-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-300 font-medium flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" /> cURL Webhook Request
              </span>
              <button
                onClick={() => handleCopy(curlSnippet, 'cURL')}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                {copiedSnippet === 'cURL' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet === 'cURL' ? 'Скопировано' : 'Копировать'}</span>
              </button>
            </div>
            <pre className="p-3 text-[11px] font-mono text-cyan-300/90 overflow-x-auto whitespace-pre leading-relaxed">
              {curlSnippet}
            </pre>
          </div>

          {/* Python Snippet */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-950 overflow-hidden">
            <div className="p-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-300 font-medium flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" /> Python SDK / Requests
              </span>
              <button
                onClick={() => handleCopy(pythonSnippet, 'Python')}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                {copiedSnippet === 'Python' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSnippet === 'Python' ? 'Скопировано' : 'Копировать'}</span>
              </button>
            </div>
            <pre className="p-3 text-[11px] font-mono text-amber-300/90 overflow-x-auto whitespace-pre leading-relaxed">
              {pythonSnippet}
            </pre>
          </div>
        </div>
      </div>

      {/* Invite Member Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Пригласить сотрудника в команду</h3>
              <button onClick={() => setIsInviteOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">✕</button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Имя и фамилия:</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Михаил Смирнов"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Корпоративный Email:</label>
                <input
                  type="email"
                  required
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="m.smirnov@company.io"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Назначаемая роль:</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-200"
                >
                  <option value="Admin">Admin (Управление агентами и ключами)</option>
                  <option value="Agent Operator">Agent Operator (Запуск и тестирование)</option>
                  <option value="Viewer">Viewer (Только чтение)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-medium"
                >
                  Отправить доступ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
