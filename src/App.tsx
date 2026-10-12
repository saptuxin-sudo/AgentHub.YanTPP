import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LaunchpadView } from './components/Launchpad/LaunchpadView';
import { FreeModelsView } from './components/FreeModels/FreeModelsView';
import { AgentsListView } from './components/Agents/AgentsListView';
import { KeyVaultView } from './components/Vault/KeyVaultView';
import { TokenMonitorView } from './components/TokenMonitor/TokenMonitorView';
import { SharingView } from './components/Sharing/SharingView';
import { PromptArchitectView } from './components/PromptArchitect/PromptArchitectView';
import { GuideView } from './components/Guide/GuideView';
import { AgentRunnerModal } from './components/Launchpad/AgentRunnerModal';
import { CreateAgentModal } from './components/Agents/CreateAgentModal';
import { AddKeyModal } from './components/Vault/AddKeyModal';
import { ToastContainer } from './components/ToastContainer';
import { ProviderType } from './types';

const DashboardContent: React.FC = () => {
  const { activeTab, setActiveTab, userMode } = useApp();
  const [isNewKeyModalOpen, setIsNewKeyModalOpen] = useState(false);
  const [isNewAgentModalOpen, setIsNewAgentModalOpen] = useState(false);
  const [prefilledProvider, setPrefilledProvider] = useState<ProviderType>('google');
  const [prefilledKeyName, setPrefilledKeyName] = useState<string>('');

  const handleOpenAddKeyWithProvider = (provider: ProviderType, name: string) => {
    setPrefilledProvider(provider);
    setPrefilledKeyName(name);
    setIsNewKeyModalOpen(true);
  };

  const handleOpenNewKeyModal = () => {
    setPrefilledProvider('google');
    setPrefilledKeyName('');
    setIsNewKeyModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 transition-colors duration-200">
      {/* Top Navbar with Mode Toggle & Guidance */}
      <Navbar
        onOpenNewKeyModal={handleOpenNewKeyModal}
        onOpenNewAgentModal={() => setIsNewAgentModalOpen(true)}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'launchpad' && <LaunchpadView />}
        {activeTab === 'free_ai' && (
          <FreeModelsView onOpenAddKeyWithProvider={handleOpenAddKeyWithProvider} />
        )}
        {activeTab === 'agents' && <AgentsListView />}
        {activeTab === 'vault' && <KeyVaultView />}
        {activeTab === 'tokens' && <TokenMonitorView />}
        {activeTab === 'sharing' && <SharingView />}
        {activeTab === 'architecture' && <PromptArchitectView />}
        {activeTab === 'guide' && <GuideView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 py-4 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 font-sans">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
            <span className="text-slate-700 dark:text-slate-300">AgentHub РФ: Все ИИ-модели активны и готовы к работе</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => setActiveTab('guide')}
              className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors underline flex items-center gap-1 font-medium"
            >
              📖 Инструкция и справка
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={() => setActiveTab('free_ai')}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Бесплатные нейросети и ключи
            </button>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={() => setActiveTab('architecture')}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              {userMode === 'pro' ? 'Спецификация ТЗ' : 'О платформе'}
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Toasts */}
      <AgentRunnerModal />
      <CreateAgentModal
        isOpen={isNewAgentModalOpen}
        onClose={() => setIsNewAgentModalOpen(false)}
      />
      <AddKeyModal
        isOpen={isNewKeyModalOpen}
        onClose={() => setIsNewKeyModalOpen(false)}
        initialProvider={prefilledProvider}
        initialName={prefilledKeyName}
      />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
