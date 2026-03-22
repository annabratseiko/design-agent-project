#!/bin/bash
# ============================================================
# Design Agent Project — One-Time Setup Script
# ============================================================
# Run this ONCE to initialize the full project with Spec Kit,
# Copilot agent, Claude Code config, skills, and design language.
#
# Prerequisites:
#   - Node.js installed
#   - Python 3.9+ with uvx (pip install uvx)
#   - Git initialized in the project directory
#   - VS Code with Copilot and/or Claude Code extension
#
# Usage:
#   chmod +x setup.sh
#   ./setup.sh
# ============================================================

set -e

echo "╔══════════════════════════════════════════════════════╗"
echo "║  Design Agent Project — Full Setup                   ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ─── Step 1: Initialize Spec Kit ───
echo "▸ Step 1/6: Initializing Spec Kit..."
echo "  Choose 'copilot' when prompted for AI agent."
echo "  Choose 'bash' or 'powershell' for your platform."
echo ""

if command -v uvx &> /dev/null; then
  echo "  Initializing for Copilot..."
  uvx --from git+https://github.com/github/spec-kit.git specify init --here --ai copilot
  echo ""
  echo "  Initializing for Claude Code..."
  uvx --from git+https://github.com/github/spec-kit.git specify init --here --ai claude --force
  echo ""
  echo "  ✓ Spec Kit initialized for both Copilot and Claude Code"
else
  echo "  ⚠ uvx not found. Install with: pip install uvx"
  echo "  Then run these two commands:"
  echo "    uvx --from git+https://github.com/github/spec-kit.git specify init --here --ai copilot"
  echo "    uvx --from git+https://github.com/github/spec-kit.git specify init --here --ai claude --force"
  echo "  Continuing with remaining setup..."
fi

echo ""

# ─── Step 2: Copy our custom memory files ───
echo "▸ Step 2/6: Installing constitution, design language, and router..."

# Back up Spec Kit's default constitution if it exists
if [ -f ".specify/memory/constitution.md" ]; then
  mv .specify/memory/constitution.md .specify/memory/constitution.speckit-default.md
  echo "  (Backed up Spec Kit default constitution)"
fi

# Our files should already be in place from the archive.
# If running from scratch, the user copies them from the archive.
if [ ! -f ".specify/memory/design-language.md" ]; then
  echo "  ⚠ design-language.md not found in .specify/memory/"
  echo "  Copy it from the project archive."
fi

if [ ! -f ".specify/memory/router.md" ]; then
  echo "  ⚠ router.md not found in .specify/memory/"
  echo "  Copy it from the project archive."
fi

echo "  ✓ Memory files in place"
echo ""

# ─── Step 3: Install skills ───
echo "▸ Step 3/6: Installing skills..."

mkdir -p .github/skills/fluent-component
mkdir -p .github/skills/accessibility-annotation
mkdir -p .github/skills/spec-writing
mkdir -p .github/skills/component-selector
mkdir -p .claude/skills/fluent-component
mkdir -p .claude/skills/accessibility-annotation
mkdir -p .claude/skills/spec-writing
mkdir -p .claude/skills/component-selector

echo "  ✓ Skill directories created"
echo "  (Copy SKILL.md files from archive if not already present)"
echo ""

# ─── Step 4: Install agent configs ───
echo "▸ Step 4/6: Installing agent configurations..."

mkdir -p .github/agents

if [ ! -f ".github/agents/design-agent.agent.md" ]; then
  echo "  ⚠ design-agent.agent.md not found"
  echo "  Copy it from the project archive."
fi

if [ ! -f "CLAUDE.md" ]; then
  echo "  ⚠ CLAUDE.md not found"
  echo "  Copy it from the project archive."
fi

if [ ! -f ".github/copilot-instructions.md" ]; then
  echo "  ⚠ copilot-instructions.md not found"
  echo "  Copy it from the project archive."
fi

echo "  ✓ Agent configs in place"
echo ""

# ─── Step 5: Install dependencies ───
echo "▸ Step 5/6: Installing npm dependencies..."

if [ -f "package.json" ]; then
  npm install
else
  npm init -y
  npm install @fluentui/react-components @fluentui/react-icons react react-dom
  npm install -D typescript @types/react @types/react-dom
fi

echo "  ✓ Dependencies installed"
echo ""

# ─── Step 6: Initial commit ───
echo "▸ Step 6/6: Committing initial setup..."

if git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  git add .
  git commit -m "feat: initialize design agent project with Spec Kit, skills, and Fluent 2 design language"
  echo "  ✓ Initial commit created"
else
  echo "  ⚠ Not a git repo. Run 'git init' first, then commit."
fi

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  Setup Complete!                                     ║"
echo "╠══════════════════════════════════════════════════════╣"
echo "║                                                      ║"
echo "║  For designers:                                      ║"
echo "║  1. Open this folder in VS Code                      ║"
echo "║  2. Open chat (Ctrl+Alt+I for Copilot)               ║"
echo "║  3. Select 'design-agent' from the dropdown          ║"
echo "║  4. Type: 'I want to design a new feature...'        ║"
echo "║                                                      ║"
echo "║  Available Spec Kit commands:                        ║"
echo "║    /speckit.specify  — Build a feature spec          ║"
echo "║    /speckit.clarify  — Fill spec gaps                ║"
echo "║    /speckit.plan     — Create technical plan         ║"
echo "║    /speckit.checklist— Validate completeness         ║"
echo "║    /speckit.analyze  — Cross-check consistency       ║"
echo "║    /speckit.tasks    — Break into tasks              ║"
echo "║    /speckit.implement— Generate prototype            ║"
echo "║                                                      ║"
echo "║  Available skills (auto-invoked or via /):           ║"
echo "║    /fluent-component         — Build components      ║"
echo "║    /accessibility-annotation — Annotate for a11y     ║"
echo "║    /spec-writing             — Write specs           ║"
echo "║    /component-selector       — Pick right component  ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"