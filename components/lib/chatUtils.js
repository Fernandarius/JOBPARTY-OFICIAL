'use client';

export function upsertChatForJob(job, introMessage) {
  if (typeof window === 'undefined' || !job) return;
  const chats = JSON.parse(window.localStorage.getItem('jp_chats') || '[]');
  const existing = chats.find(chat => chat.jobId === job.id);
  const botMessage = introMessage || 'Hola, recibimos tu interés. Te avisamos pronto.';

  if (existing) {
    if (!existing.messages?.length || existing.messages[existing.messages.length - 1]?.text !== botMessage) {
      existing.messages = [...(existing.messages || []), { from: 'company', text: botMessage }];
    }
    existing.status = existing.status || 'Match';
  } else {
    chats.unshift({
      id: `chat-${Date.now()}`,
      company: job.company || 'Organizador JobParty',
      jobId: job.id,
      jobTitle: job.title,
      jobDate: job.date,
      jobLocation: job.location,
      status: 'Match',
      messages: [
        { from: 'company', text: botMessage }
      ]
    });
  }

  window.localStorage.setItem('jp_chats', JSON.stringify(chats));
}
