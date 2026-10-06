import React, { useState } from 'react';
import { Mail, Send, Check, Copy, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../common/BrandIcons';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/soundEffects';
import './ContactApp.css';

export default function ContactApp({ user }) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const copyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(user.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    soundManager.playOpen();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h2><Mail size={22} color="var(--win-accent)" /> Outlook Mail • Contact Me</h2>
        <p>Drop a message or reach out across social channels for collaborations and opportunities.</p>
      </div>

      <div className="contact-grid">
        {/* Info panel */}
        <div className="contact-info-panel">
          <div className="info-card">
            <div className="info-icon">
              <Mail size={18} />
            </div>
            <div className="info-texts">
              <h4>Direct Email</h4>
              <p>{user.email}</p>
            </div>
            <button className="copy-btn" onClick={copyEmail}>
              {copied ? <Check size={13} color="#4ade80" /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <div className="info-card">
            <div className="info-icon">
              <MessageSquare size={18} />
            </div>
            <div className="info-texts">
              <h4>Office Location</h4>
              <p>{user.location} (Timezone: {user.timezone})</p>
            </div>
          </div>

          <div className="social-links-row">
            <a href={user.links.github} target="_blank" rel="noreferrer" className="social-pill">
              <GithubIcon size={15} /> GitHub
            </a>
            <a href={user.links.linkedin} target="_blank" rel="noreferrer" className="social-pill">
              <LinkedinIcon size={15} /> LinkedIn
            </a>
            <a href={user.links.twitter} target="_blank" rel="noreferrer" className="social-pill">
              <TwitterIcon size={15} /> Twitter
            </a>
          </div>
        </div>

        {/* Contact Form */}
        {submitted ? (
          <div className="contact-form" style={{ textAlign: 'center', justifyContent: 'center', padding: '40px 20px' }}>
            <div style={{ color: '#4ade80', marginBottom: 12 }}>
              <Check size={42} style={{ margin: '0 auto' }} />
            </div>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>Message Sent Successfully!</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>
              Thank you for reaching out, {formData.name}. I'll get back to your email at {formData.email || 'soon'}!
            </p>
            <button 
              className="send-msg-btn"
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', message: '' });
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Your Name</label>
              <input
                type="text"
                required
                placeholder="Ada Lovelace"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Your Email Address</label>
              <input
                type="email"
                required
                placeholder="ada@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Message Content</label>
              <textarea
                rows="4"
                required
                placeholder="Hey Utku, I loved your portfolio OS and would like to discuss..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button type="submit" className="send-msg-btn">
              <Send size={15} /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
