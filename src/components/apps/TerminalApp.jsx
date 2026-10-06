import React, { useState, useRef, useEffect } from 'react';
import './TerminalApp.css';

export default function TerminalApp({ user, skills, projects, onClose, onSetTheme }) {
  const [history, setHistory] = useState([
    {
      type: 'banner',
      content: `Windows PowerShell v7.4.2 [Portfolio Edition]
Copyright (c) Utku C. All rights reserved.

Type 'help' to view the list of available commands.
`
    }
  ]);
  const [input, setInput] = useState('');
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [pastCommands, setPastCommands] = useState([]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = input.trim();
      if (!trimmed) {
        setHistory((prev) => [...prev, { cmd: '', output: '' }]);
        return;
      }

      setPastCommands((prev) => [...prev, trimmed]);
      setCmdIndex(-1);
      processCommand(trimmed);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0) {
        const nextIndex = cmdIndex === -1 ? pastCommands.length - 1 : Math.max(0, cmdIndex - 1);
        setCmdIndex(nextIndex);
        setInput(pastCommands[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex !== -1) {
        const nextIndex = cmdIndex + 1;
        if (nextIndex < pastCommands.length) {
          setCmdIndex(nextIndex);
          setInput(pastCommands[nextIndex]);
        } else {
          setCmdIndex(-1);
          setInput('');
        }
      }
    }
  };

  const processCommand = (cmdStr) => {
    const parts = cmdStr.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        output = `Available commands:
  help              Display this assistance menu
  about             Show developer biography and mission
  skills            List technical skills and proficiency
  projects          Display featured applications and repositories
  contact           Get contact email and social profiles
  neofetch          Display system and architecture information
  theme <dark|light> Switch desktop theme
  date              Show current date and time
  whoami            Print current session user
  echo <message>    Print message to console
  cat <filename>    Display file contents (e.g. cat resume.txt)
  clear / cls       Clear terminal window
  exit              Close terminal session`;
        break;

      case 'about':
        output = `${user.fullName || user.name} - ${user.title}\nLocation: ${user.location}\nStatus: ${user.status}\n\n${user.bio}`;
        break;

      case 'skills':
        output = skills
          .map((cat) => `[${cat.category}]\n` + cat.items.map((i) => `  - ${i.name.padEnd(25)} [${i.level}%]`).join('\n'))
          .join('\n\n');
        break;

      case 'projects':
        output = projects
          .map((p, idx) => `${idx + 1}. ${p.title} (${p.category})\n   Tags: ${p.tags.join(', ')}\n   Link: ${p.liveUrl || p.githubUrl}`)
          .join('\n\n');
        break;

      case 'contact':
        output = `Email:    ${user.email}\nGitHub:   ${user.links.github}\nLinkedIn: ${user.links.linkedin}\nTwitter:  ${user.links.twitter}`;
        break;

      case 'neofetch':
        output = `
  ██████╗  ██████╗ ███████╗  User: ${user.fullName || user.name}
  ██╔══██╗██╔═══██╗██╔════╝  OS: Windows 11 Portfolio v24H2
  ██████╔╝██║   ██║███████╗  Kernel: React 19.2 (Vite)
  ██╔═══╝ ██║   ██║╚════██║  Uptime: 99.98%
  ██║     ╚██████╔╝███████║  Shell: PowerShell 7.4.2
  ╚═╝      ╚═════╝ ╚══════╝  Theme: Fluent Acrylic
                             Resolution: 1920x1080 60Hz
                             Memory: 32768MB DDR5
`;
        break;

      case 'theme':
        if (args[0] === 'light' || args[0] === 'dark') {
          onSetTheme(args[0]);
          output = `Switched theme to ${args[0]}.`;
        } else {
          output = `Usage: theme <light|dark>`;
          isError = true;
        }
        break;

      case 'date':
        output = new Date().toString();
        break;

      case 'whoami':
        output = `PORTFOLIO-PC\\${user.name.toLowerCase()}`;
        break;

      case 'echo':
        output = args.join(' ');
        break;

      case 'cat':
        if (!args[0]) {
          output = 'Usage: cat <filename>';
          isError = true;
        } else if (args[0].toLowerCase().includes('resume')) {
          output = `=== ${user.name.toUpperCase()} RESUME ===\nRole: ${user.title}\nExperience: 3+ Years in Full Stack Web Engineering\nSpecialties: React, Node.js, Cloud, TypeScript\nContact: ${user.email}`;
        } else if (args[0].toLowerCase().includes('secret')) {
          output = `ACCESS GRANTED: Coffee is the secret fuel behind every commit. ☕`;
        } else {
          output = `cat: ${args[0]}: No such file or directory. Try: cat resume.txt`;
          isError = true;
        }
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        return;

      case 'sudo':
        output = `Nice try! You are already administrator of this portfolio OS.`;
        break;

      case 'exit':
        onClose();
        return;

      default:
        output = `'${cmd}' is not recognized as an internal or external command. Type 'help' for options.`;
        isError = true;
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        cmd: cmdStr,
        output,
        isError
      }
    ]);
  };

  return (
    <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-history">
        {history.map((entry, idx) => (
          <div key={idx} className="terminal-entry">
            {entry.type === 'banner' ? (
              <div className="terminal-banner">{entry.content}</div>
            ) : (
              <>
                <div className="terminal-prompt-line">
                  <span className="prompt-path">PS C:\Users\{user.name}&gt;</span>
                  <span className="prompt-cmd">{entry.cmd}</span>
                </div>
                {entry.output && (
                  <div className={`terminal-output ${entry.isError ? 'error' : ''}`}>
                    {entry.output}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <div className="terminal-active-line">
        <span className="prompt-path">PS C:\Users\{user.name}&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck="false"
        />
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
